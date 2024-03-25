import * as t from 'io-ts';
import { PromiseTypeError } from '../misc.js';
import { isLeft } from 'fp-ts/lib/Either.js';
import { unionSourceDefaultHandler, unionTargetDefaultHandler } from './union.js';
import { intersectionSourceDefaultHandler, intersectionTargetDefaultHandler } from './intersection.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export class PromiseType<T extends unknown> extends t.Type<Promise<T>> {

	type: t.Type<T>;

	constructor(
		type: t.Type<T>,
		guard: t.Is<Promise<T>>,
		validator: t.Validate<unknown, Promise<T>>,
		encoder: t.Encode<Promise<T>, Promise<T>>,
	) {
		super(`Promise<${type.name}>`, guard, validator, encoder);
		this.type = type;
	}

	render(): string {
		return `Promise<${(this.type as any).render(false)}>`;
	}
}

export const promise = <T extends t.Type<unknown>>(type: T): PromiseType<t.TypeOf<T>> => new PromiseType(
	type,
	(u: unknown): u is Promise<t.TypeOf<T>> => u instanceof Promise,
	(i: unknown, ctx: t.Context) => {
		if (i instanceof Promise) {
			return t.success(i.then((value) => {
				if (type.is(value)) {
					return value;
				}
				const decoded = type.decode(value);
				if (isLeft(decoded)) {
					throw new PromiseTypeError(
						`Promise resolved to ${value} which is not of type ${type.name}.`,
						decoded.left,
					);
				}
				else {
					throw new Error(`Promise resolved to ${decoded.right} which is unexpected.`);
				}
			}))
		};
		return t.failure(i, ctx);
	},
	(a: Promise<t.TypeOf<T>>) => a,
)

export function initPromise() {

	extensionRegistry.register(
		t.IntersectionType,
		PromiseType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		PromiseType,
		unionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		PromiseType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		PromiseType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		PromiseType,
		PromiseType,
		(source, target, isExtendedBy) => isExtendedBy(target.type, source.type),
		undefined,
	);

	extensionRegistry.register(
		PromiseType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		PromiseType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		PromiseType,
		t.ReadonlyType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target.type, source),
		undefined,
	);

	extensionRegistry.register(
		PromiseType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);
}
