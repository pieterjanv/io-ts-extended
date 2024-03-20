import * as t from 'io-ts';
import { FunctionType, Parameter } from "./function.js";
import { ToTsType, isExtensionOf } from '../misc.js';

type ToBasicType<T extends readonly t.Type<unknown>[]> = T extends [
	infer A extends t.Type<unknown>, ...infer R extends readonly t.Type<unknown>[]
]
	? readonly [t.Type<t.TypeOf<A>>, ...ToBasicType<R>]
	: readonly t.Type<unknown>[];

class GenericArg<F extends (...parameters: readonly t.Type<unknown>[]) => t.Type<unknown>> {
	public r: F extends ((
		...parameters: infer P extends readonly t.Type<unknown>[]
	) => infer T extends t.Type<unknown>) ? ((...parameters: ToBasicType<P>) => T) : never;
	constructor(r: F) { this.r = r as any; }
}

export class GenericP<
	F extends (...parameters: readonly t.Type<unknown>[]) => t.Type<unknown>
> extends GenericArg<F> {}

export class GenericR<
	F extends (...parameters: readonly t.Type<unknown>[]) => t.Type<unknown>
> extends GenericArg<F> {}

export type GenericParameter = readonly [string, GenericArg<(...parameters: readonly t.Type<unknown>[]) => t.Type<unknown>>]

type GenericParameters<Ps extends readonly Parameter[]> = Ps extends readonly [
	infer P extends Parameter, ...infer R extends readonly Parameter[]
]
	? readonly [readonly [string, GenericP<(...parameters: readonly t.Type<unknown>[]) => P[1]>], ...GenericParameters<R>]
	: readonly (readonly [string, GenericP<(...parameters: readonly t.Type<unknown>[]) => t.Type<unknown>>])[];

export type ResolveGenericParameters<P extends readonly GenericParameter[]> = P extends readonly [
	infer A extends GenericParameter, ...infer R extends readonly GenericParameter[]
]
	? readonly [ReturnType<A[1]['r']>, ...ResolveGenericParameters<R>]
	: readonly t.Type<unknown>[];

export type GenericReturnType<T extends AnyGenericType> = ReturnType<T['type']['r']>;

export class GenericType<
	T extends FunctionType<readonly Parameter[], t.Type<unknown>>,
	GP extends GenericParameters<T['parameters']>,
	GT extends GenericR<(...parameters: ResolveGenericParameters<GP>) => T['type']>,
> extends t.Type<GT> {

	genericType: T;
	parameters: GP;
	type: GT;

	constructor(
		name: string,
		genericType: T,
		signature: [GP, GT],
		guard: t.Is<GT>,
		validator: t.Validate<unknown, GT>,
		encoder: t.Encode<GT, GT>,
	) {
		const type = signature[1];
		genericType.render = () => `(${genericType.parameters.map((p) => {
			return `${p[0]}: [${(p[1] as any).render(false)}]`;
		}).join(', ')}) => ${genericType.type.name}`;
		super(name, guard, validator, encoder);
		this.parameters = signature[0];
		this.type = type;
		this.genericType = genericType;
	}

	call: GT['r'] = (...args) => {

		const resolved: any = [];
		let idx = 0;
		while (true) {
			const param = this.parameters[idx];
			const arg = args[idx];
			if (!param || !arg) {
				break;
			}

			if (!isExtensionOf(arg, (param[1].r as any)(...resolved))) {
				throw new Error(`Argument ${idx} does not extend parameter ${param[0]}.`);
			}
			resolved.push(arg);
			idx++;
		}

		return this.type.r(...resolved);
	}

	render(): string {
		return `${this.name}<\n\t${
			(this.parameters).map(([name, f]) => `${
				name
		}: ${this.cleanUpFunctionRender(f['r'].toString())}`).join(',\n\t')
		}\n> => ${this.cleanUpFunctionRender(this.type['r'].toString())}`;
	}

	private cleanUpFunctionRender(render: string): string {
		return (
			render.match(/\{\s*?return\s+?(.*?);?\s*?\}/)?.[1] ??
			render.match(/\{\s*?(.*?);?\s*?\}/)?.[1] ??
			render.match(/=>\s*?\{\s*?(.*?);?\s*?\}/)?.[1] ??
			render.match(/=>\s*(.*)/)?.[1] ??
			render
		);
	}
}

export type AnyGenericType = GenericType<
	FunctionType<readonly Parameter[], t.Type<unknown>>,
	readonly GenericParameter[],
	GenericArg<(...parameters: readonly t.Type<unknown>[]) => t.Type<unknown>>
>;

export type AssertGenericParameters<
	Ps extends readonly GenericParameter[],
	Args extends t.Type<unknown>[] = [],
> = Ps extends readonly [
	infer P extends GenericParameter, ...infer R extends GenericParameter[]
]
	? Parameters<P[1]['r']> extends [infer A extends t.Type<unknown>, ...infer S extends readonly t.Type<unknown>[]]
		? ToTsType<Args> extends ToTsType<Parameters<P[1]['r']>>
			? AssertGenericParameters<R, [...Args, ReturnType<P[1]['r']>]>
			: never
		: AssertGenericParameters<R, [...Args, ReturnType<P[1]['r']>]>
	: unknown;

// type AssertGenericType<
// 	P extends readonly GenericParameter[],
// 	T extends GenericArg<(...parameters: ResolveGenericParameters<P>) => t.Type<unknown>>,
// 	Q extends readonly unknown[] = Parameters<T['r']>
// > = P extends readonly [
// 	infer A extends GenericParameter, ...infer R extends readonly GenericParameter[]
// ]
// 	? Q extends [infer B extends t.Type<unknown>, ...infer S extends t.Type<unknown>[]]
// 		? t.TypeOf<ReturnType<A[1]['r']>> extends t.TypeOf<B>
// 			? AssertGenericType<R, T, S>
// 			: never
// 		: unknown
// 	: unknown;

export const generic = <
	T extends FunctionType<readonly Parameter[], t.Type<unknown>>,
	GP extends GenericParameters<T['parameters']>,
	GT extends GenericR<(...parameters: ResolveGenericParameters<GP>) => T['type']>,
>(
	name: string,
	genericType: T,
	parameters: GP & AssertGenericParameters<GP>,
	type: GT /* & AssertGenericType<P, T> */,
): GenericType<T, GP, GT> => new GenericType(
	name,
	genericType,
	[parameters, type],
	(u: unknown): u is GT => false,
	(i: unknown, ctx: t.Context): t.Validation<GT> => t.failure(i, ctx, 'Not implemented'),
	() => undefined as unknown as GT,
);
