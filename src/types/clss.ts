import * as t from 'io-ts';
import { FunctionType, Parameter } from "./function.js";
import { isRight } from "fp-ts/lib/Either.js";
import { unionSourceDefaultHandler, unionTargetDefaultHandler } from "./union.js";
import { intersectionSourceDefaultHandler, intersectionTargetDefaultHandler } from "./intersection.js";
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export abstract class Implementation {

	public static qualifiedClassName: string;

	public static clssType: AnyClssType;

	constructor(...args: unknown[]) {}

	public get qualifiedClassName(): string {
		return Object.getPrototypeOf(this).constructor.qualifiedClassName;
	}

	public get className(): string {
		return this.qualifiedClassName
			.substring('Work.Pjvisser.Act.'.length);
	}

	public static decode<T extends typeof Implementation>(this: T, input: unknown): t.Validation<InstanceType<T>> {
		const prototype = this.prototype;
		const result = 	(prototype.constructor as typeof Implementation).clssType.type.decode(input);
		if (isRight(result)) {
			Object.setPrototypeOf(result.right, prototype);
		}
		return result as t.Validation<InstanceType<T>>;
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
		is: t.Is<t.TypeOf<T> & InstanceType<Ctor>>,
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

export type AnyClssType = ClssType<
	t.Type<object>,
	t.Type<object>,
	typeof Implementation
>;

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
		(u: unknown): u is InstanceType<typeof ctor> => u instanceof ctor,
		(i: unknown, ctx: t.Context) => ctor.decode<typeof ctor>(i),
		(a: InstanceType<typeof ctor>) => instanceType.encode(a),
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

extensionRegistry.register(
	ClssType,
	t.AnyType,
	() => Ternary.True,
	undefined,
);

extensionRegistry.register(
	ClssType,
	t.AnyDictionaryType,
	() => Ternary.True,
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
		dictSourceResult,
		propsSourceResult,
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
	) => hasExtendingProp(source.type, targetKey, targetType),
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
	) => hasPartiallyExtendingProp(source.type, targetKey, targetType),
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
	) => (
		isExtendedBy(target.type, source.type) &
		isExtendedBy(target.staticType, source.staticType)
	),
	undefined,
);