import { fold } from 'fp-ts/lib/Either.js';
import * as t from 'io-ts/lib/index.js';
import { failure } from 'io-ts/lib/PathReporter.js';
import { pipe } from 'fp-ts/lib/function.js';
import { Ternary } from './ternary.js';
import { TypeCtor, extensionRegistry } from './extensionRegistry.js';

interface IoTypePrototypeExtension<T extends new (...args: any[]) => t.Type<unknown>> {
	render(
		this: InstanceType<T> & IoTypePrototypeExtension<T>,
		isComposed: boolean,
	): string;
}

export const extendProtype = <
	Ctor extends new (...args: any[]) => t.Type<unknown>
>(ctor: Ctor, extension: IoTypePrototypeExtension<Ctor>): void => {
	Object.assign(ctor.prototype, extension);
}

export class PromiseTypeError extends Error {
	constructor(message: string, public readonly errors: t.Errors) {
		super(message);
	}
}

const onLeftDefault = (errors: t.Errors) => {
	console.log(failure(errors));
}

export const decode = async <A, O, I>(codec: t.Type<A, O, I>, data: I) => new Promise(
	(resolve: (value: A) => void, reject?: (value: t.Errors) => void) => {
		try {
			pipe(codec.decode(data), fold(reject ?? onLeftDefault, resolve));
		}
		catch (e) {
			if (e instanceof PromiseTypeError) {
				(reject ?? onLeftDefault)(e.errors);
				return;
			}
			throw e;
		}
	}
);

export type ToIoType<Ts extends readonly unknown[]> = Ts extends readonly [
	infer A extends unknown, ...infer R extends readonly unknown[]
] ? readonly [t.Type<A>, ...ToIoType<R>] : readonly [];

export type ToTsType<Ts extends readonly t.Type<unknown>[]> = Ts extends readonly [
	infer A extends t.Type<unknown>, ...infer R extends readonly t.Type<unknown>[]
] ? readonly [t.TypeOf<A>, ...ToTsType<R>] : readonly [];

export const isExtensionOf = <T extends t.Type<unknown>>(source: t.Type<unknown>, target: T): source is T => {

	const maybeIsExtendedBy: string[] = [];

	const result = isExtendedBy(target, source);
	return result !== Ternary.False;

	function isExtendedBy(target: t.Type<unknown>, source: t.Type<unknown>): Ternary {

		target = target instanceof t.RecursiveType ? target.type : target;

		const id = `${target.name},${source.name}`;
		if (maybeIsExtendedBy.includes(id)) {
			return Ternary.Maybe;
		}
		maybeIsExtendedBy.push(id);

		let result: Ternary;
		source = source instanceof t.RecursiveType ? source.type : source;
		if (source === t.never) {
			result = Ternary.True;
		}
		else {
			const SourceCtor = Object.getPrototypeOf(source).constructor as TypeCtor;
			const TargetCtor = Object.getPrototypeOf(target).constructor as TypeCtor;
			const test = extensionRegistry.getTest(SourceCtor, TargetCtor);
			result = test ? test(source, target, isExtendedBy) : Ternary.False;
		}

		maybeIsExtendedBy.pop();

		return result;
	}
};

export const render = (type: t.Type<unknown>) => (type as any).render();

export const isDerivedFrom = <
	S extends Function & { prototype: unknown },
	T extends Function & { prototype: unknown },
>(source: S, target: T): boolean => (
	source as any === target || source.prototype instanceof target
);

export let _brand: keyof t.Brand<unknown>;
