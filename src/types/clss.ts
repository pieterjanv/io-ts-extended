import * as t from 'io-ts/lib/index.js';
import { FunctionType, Parameter, nullFunction, stripNullFunctions } from "./function.js";
import { isRight } from "fp-ts/lib/Either.js";
import { unionSourceDefaultHandler, unionTargetDefaultHandler } from "./union.js";
import { intersectionSourceDefaultHandler, intersectionTargetDefaultHandler } from "./intersection.js";
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';
import { trivialTest } from '../misc.js';

export abstract class Implementation {

	public static qualifiedClassName: string;

	public static clssType: AnyClssType;

	constructor(...args: unknown[]) {}

	public static decode<T extends typeof Implementation>(
		this: T,
		input: unknown,
	): t.Validation<InstanceType<T>> {
		const prototype = this.prototype;
		const result = 	(prototype.constructor as typeof Implementation)
			.clssType.type.decode(input);
		if (isRight(result)) {
			stripNullFunctions(result.right);
			Object.setPrototypeOf(result.right, prototype);
		}
		return result as t.Validation<InstanceType<T>>;
	}

	public static encode<T extends typeof Implementation>(
		this: T,
		input: InstanceType<T>,
	): object {
		const type = (this.prototype.constructor as typeof Implementation)
			.clssType
			.type;
		const defaultEncoded = type.encode(input);
		return stripNullFunctions(defaultEncoded);
	}
};

export class ClssType<
	S extends t.Type<object>,
	T extends t.Type<object>,
	Ctor extends typeof Implementation
> extends t.Type<t.TypeOf<T>> {

	static readonly registry = new Map<string, ClssType<t.Type<object>, t.Type<object>, typeof Implementation>>();

	constructor(
		name: string,
		is: t.Is<t.TypeOf<T>>,
		validate: t.Validate<unknown, t.TypeOf<T> & InstanceType<Ctor>>,
		encode: t.Encode<InstanceType<Ctor>, t.TypeOf<T>>,
		public readonly staticType: S,
		public readonly type: T,
		public readonly ctor: Ctor,
	) {
		super(name, is, validate, encode);
		ClssType.registry.set(name ?? type.name, this);

		this.ctor = ctor;
		ctor.clssType = this;
	}

	decode(i: unknown): t.Validation<InstanceType<Ctor>> {
		return this.validate(i, []) as t.Validation<InstanceType<Ctor>>;
	}

	getMethods(instance: boolean = true): [string, FunctionType<readonly Parameter[], t.Type<unknown>>][] {

		const methods: [string, FunctionType<readonly Parameter[], t.Type<unknown>>][] = [];
		filterMethods(instance ? this.type : this.staticType);
		return methods;

		function filterMethods(type: t.Type<unknown>) {
			if (
				type instanceof t.InterfaceType ||
				type instanceof t.PartialType
			) {
				for (const k in type.props) {
					const prop = type.props[k];
					if (
						prop instanceof FunctionType &&
						!k.startsWith('_')
					) {
						methods.push([k, prop]);
					}
				}
			}
			else if (type instanceof t.IntersectionType) {
				for (const subType of type.types) {
					filterMethods(subType);
				}
			}
			else if (
				type instanceof t.RecursiveType ||
				type instanceof t.ReadonlyType ||
				type instanceof t.RefinementType ||
				type instanceof t.ExactType
			) {
				filterMethods(type.type);
			}
		}
	}

	render(): string {
		return this.name;
	};
}

type AnyClssType = ClssType<
	t.Type<object>,
	t.Type<object>,
	typeof Implementation
>;

function flattenInstance (
	instance: Record<string | number, unknown>,
	result: Record<string | number, unknown> = {},
): Record<string | number, unknown> {

	for (const [k, v] of Object.entries(Object.getOwnPropertyDescriptors(instance))) {
		result[k] ??= typeof v.value === 'function'
			? nullFunction
			: v.value;
	}

	const prototype = Object.getPrototypeOf(instance);
	if (prototype && prototype !== Object.prototype) {
		flattenInstance(prototype, result);
	}

	return result;
}

export const clss: <
	S extends t.Type<object>,
	T extends t.Type<object>,
	Ctor extends typeof Implementation,
>(
	name: string,
	staticType: S,
	instanceType: T,
	ctor: Ctor & t.TypeOf<S> & (new (...args: unknown[]) => t.TypeOf<T>),
) => ClssType<t.Type<t.TypeOf<S>>, t.Type<t.TypeOf<T>>, Ctor> = (name, staticType, instanceType, ctor) => {
	ctor.qualifiedClassName = name;
	return new ClssType(
		name,
		(u: unknown): u is typeof instanceType => (
			typeof u === 'object' &&
			instanceType.is(flattenInstance(u as Record<string | number, unknown>))
		),
		(i: unknown, ctx: t.Context) => ctor.decode<typeof ctor>(i),
		(a: InstanceType<typeof ctor>) => ctor.encode(a),
		staticType,
		instanceType,
		ctor,
	);
};

export const extendClss = <
    B extends ClssType<t.Type<object>, t.Type<object>, typeof Implementation>,
	S extends t.Type<object>,
	T extends t.Type<object>,
	Ctor extends B['ctor'],
>(
	name: string,
	base: B,
	staticExtension: S,
	instanceExtension: T,
	ctor: Ctor & t.TypeOf<S> & (new (...args: unknown[]) => t.TypeOf<T>),
): ClssType<t.Type<t.TypeOf<B['staticType'] & S>>, t.Type<t.TypeOf<B['type'] & T>>, Ctor> => {
	return clss(
		name,
		t.intersection([base.staticType, staticExtension]),
		t.intersection([base.type, instanceExtension]),
		ctor,
	);
};

export function initClss() {

	extensionRegistry.register(
		ClssType,
		t.AnyType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		t.AnyDictionaryType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		t.DictionaryType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		(
			source,
			target,
			isExtendedBy,
			setDictSourceResult,
			setPropsSourceResult,
			addIntersectionMember,
		) => {
			addIntersectionMember(source.type);
		},
	);

	extensionRegistry.register<
		typeof ClssType,
		typeof t.InterfaceType<Record<string, t.Type<unknown>>>
	>(
		ClssType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => hasExtendingProp(source.type),
	);

	extensionRegistry.register<
		typeof ClssType,
		typeof t.PartialType<Record<string, t.Type<unknown>>>
	>(
		ClssType,
		t.PartialType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasPartiallyExtendingProp,
		) => hasPartiallyExtendingProp(source.type),
	);

	extensionRegistry.register(
		ClssType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		t.ExactType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		t.ReadonlyType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		t.RefinementType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.ExactType,
		ClssType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		ClssType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		ClssType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.InterfaceType,
		ClssType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target.type, source),
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		ClssType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		ClssType,
		unionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		ClssType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target.type, source.type),
		undefined,
	);
}
