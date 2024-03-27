import * as t from 'io-ts/lib/index.js';
import { intersectionTargetDefaultHandler } from "./intersection.js";
import { ClssType } from "./clss.js";
import { FunctionType } from "./function.js";
import { PromiseType } from "./promise.js";
import { IsExtendedBy, extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';
import { trivialTest } from '../misc.js';

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

const nullableSourceDefaultHandler = (
	source: NullableType<unknown>,
	target: t.Type<unknown>,
	isExtendedBy: IsExtendedBy,
): Ternary => isExtendedBy(target, source.type);

const nullableTargetDefaultHandler = (
	source: t.Type<unknown>,
	target: NullableType<unknown>,
	isExtendedBy: IsExtendedBy,
): Ternary => isExtendedBy(target.type, source);

export function initNullable() {

	extensionRegistry.register(
		NullableType,
		t.AnyType,
		trivialTest,
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
		nullableSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		NullableType,
		t.ExactType,
		nullableSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		NullableType,
		t.ReadonlyType,
		nullableSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		NullableType,
		t.RefinementType,
		nullableSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		ClssType,
		NullableType,
		nullableTargetDefaultHandler,
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
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.AnyArrayType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.AnyDictionaryType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.AnyType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ArrayType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.BigIntType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.BooleanType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.DictionaryType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ExactType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		FunctionType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.InterfaceType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.KeyofType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.LiteralType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NeverType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NullType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NumberType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.PartialType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		PromiseType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyArrayType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.RecursiveType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.StringType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.TupleType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UndefinedType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnknownType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.VoidType,
		NullableType,
		nullableTargetDefaultHandler,
		undefined,
	);
}
