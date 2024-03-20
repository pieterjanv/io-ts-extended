import * as t from 'io-ts';
import { intersectionTargetDefaultHandler } from "./intersection.js";
import { ClssType } from "./clss.js";
import { FunctionType } from "./function.js";
import { PromiseType } from "./promise.js";
import { IsExtendedBy, extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export type Nullable<T> = T | null | undefined;

export class NullableType<T extends unknown> extends t.Type<T | null | undefined> {

	type: t.Type<T | null | undefined>;
	target: t.Type<T>;

	constructor(
		type: t.Type<T>,
		guard: t.Is<T | null | undefined>,
		validator: t.Validate<unknown, T | null | undefined>,
		encoder: t.Encode<T | undefined, T | null | undefined>,
	) {
		const union = t.union([type, t.null, t.undefined]);
		super(`${type.name}?`, guard, validator, encoder);
		this.type = union;
		this.target = type;
	}

	render(): string {
		return `${((this.type as t.UnionType<any>).types[0] as any).render(true)}?`;
	}
}

export const nullable = <T extends t.Type<unknown>>(type: T): NullableType<t.TypeOf<T>> => new NullableType(
	type,
	(u: unknown): u is NullableType<t.TypeOf<T>> => u === null || u === undefined || type.is(u),
	(i: unknown, ctx: t.Context) => {
		if (i === null || i === undefined) {
			return t.success(i);
		}
		return type.validate(i, ctx);
	},
	(a: NullableType<t.TypeOf<T>>) => a,
)

export const nullSourceDefaultHandler = (
	source: NullableType<unknown>,
	target: t.Type<unknown>,
	isExtendedBy: IsExtendedBy,
) => isExtendedBy(target, source.type);

export const nullTargetDefaultHandler = (
	source: t.Type<unknown>,
	target: NullableType<unknown>,
	isExtendedBy: IsExtendedBy,
) => isExtendedBy(target.type, source);

extensionRegistry.register(
	NullableType,
	t.AnyType,
	() => Ternary.True,
	undefined,
);

extensionRegistry.register(
	NullableType,
	t.IntersectionType,
	intersectionTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	NullableType,
	t.UnionType,
	nullSourceDefaultHandler,
	undefined,
);

extensionRegistry.register(
	NullableType,
	t.ExactType,
	nullSourceDefaultHandler,
	undefined,
);

extensionRegistry.register(
	NullableType,
	t.ReadonlyType,
	nullSourceDefaultHandler,
	undefined,
);

extensionRegistry.register(
	NullableType,
	t.RefinementType,
	nullSourceDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.RefinementType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ReadonlyType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.IntersectionType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.UnionType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	ClssType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	NullableType,
	NullableType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target.type, source.type),
	undefined,
);

extensionRegistry.register(
	NullableType,
	t.UnknownType,
	() => Ternary.True,
	undefined,
);

extensionRegistry.register(
	t.AnyArrayType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.AnyDictionaryType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.AnyType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ArrayType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.BigIntType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.BooleanType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.DictionaryType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ExactType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	FunctionType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.InterfaceType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.IntersectionType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.KeyofType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.LiteralType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.NeverType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.NullType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.NumberType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.PartialType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	PromiseType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ReadonlyArrayType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ReadonlyType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.RecursiveType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.RefinementType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.StringType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.TupleType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.UndefinedType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.UnknownType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.VoidType,
	NullableType,
	nullTargetDefaultHandler,
	undefined,
);

