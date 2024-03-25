import * as t from 'io-ts';
import { ToTsType } from '../misc.js';
import { intersectionSourceDefaultHandler, intersectionTargetDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler, unionTargetDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary, ternaryEvery } from '../ternary.js';

export type Parameter = readonly [string, t.Type<unknown>];

type TuplifyParameters<Ps extends readonly Parameter[]> = Ps extends readonly [
	infer P extends Parameter, ...infer R extends readonly Parameter[]
] ? readonly [P[1], ...TuplifyParameters<R>] : readonly [];

type Fn<P extends readonly Parameter[], T extends t.Type<unknown>> = (
	...parameters: ToTsType<TuplifyParameters<P>>
) => t.TypeOf<T>;

export class FunctionType<
	P extends readonly Parameter[],
	T extends t.Type<unknown>,
	B extends Fn<P, T> = Fn<P, T>,
> extends t.Type<B> {

	parameters: P;
	type: T;

	constructor(
		[parameters, type]: [P, T],
		guard: t.Is<B>,
		validator: t.Validate<unknown, B>,
		encoder: t.Encode<B, B>,
	) {
		const render = (isComposed: boolean) => {
			const result = `(${parameters.map((p) => {
				return `${p[0]}: ${(p[1] as any).render(false)}`;
			}).join(', ')}) => ${(type as any).render(false)}`;
			return isComposed ? `(${result})` : result;
		};
		super(render(false), guard, validator, encoder);
		this.parameters = parameters;
		this.type = type;
		this.render = render;
	}

	render: (isComposed: boolean) => string;
}

export const nullFunction = () => {};

export const fn = <P extends readonly Parameter[], T extends t.Type<unknown>>(
	parameters: P,
	type: T,
	implementation?: Fn<P, T>,
): FunctionType<P, T> => new FunctionType(
	[parameters, type],
	(u: unknown): u is Fn<P, T> => u === nullFunction || u === undefined,
	(i: unknown, ctx: t.Context) => t.success(implementation ?? nullFunction),
	() => nullFunction,
)

export const stripNullFunctions = (
	encoded: object,
	processed: object[] = [],
): object => {
	processed.push(encoded);
	for (const key in encoded) {
		const p = (encoded as Record<string | number, unknown>)[key];
		if (!p || typeof p === 'object' && processed.includes(p)) {
			continue;
		}
		if (p === nullFunction) {
			delete (encoded as Record<string | number, unknown>)[key];
		}
		if (typeof p === 'object') {
			stripNullFunctions(p, processed);
		}
	}
	return encoded;
}

export function initFunction() {

	extensionRegistry.register(
		FunctionType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		FunctionType,
		FunctionType,
		(source, target, isExtendedBy) => ternaryEvery(
			source.parameters,
			(parameter: Parameter, index: number) => {
				if (!target.parameters[index]?.[1]) {
					return Ternary.False;
				}
				return (
					(parameter[0] === target.parameters[index]?.[0] ? Ternary.True : Ternary.False) &
					isExtendedBy(parameter[1], target.parameters[index]?.[1] ?? t.never) ||
					isExtendedBy(target.parameters[index]?.[1] ?? t.never, parameter[1])
				);
			}
		) & isExtendedBy(target.type, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		FunctionType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		FunctionType,
		unionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		FunctionType,
		(source, target, isExtendedBy) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		FunctionType,
		(source, target, isExtendedBy) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		FunctionType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		FunctionType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		FunctionType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);
}
