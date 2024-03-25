import { extensionRegistry } from "../extensionRegistry.js";
import { extendProtype } from "../misc.js";
import * as t from 'io-ts/lib/index.js';
import { Ternary } from "../ternary.js";

export function initUnknown() {

	extendProtype(t.UnknownType, {
		render() { return 'unknown'; },
	});

	extensionRegistry.register(
		t.AnyArrayType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.AnyDictionaryType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.AnyType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.ArrayType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.BigIntType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.BooleanType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.DictionaryType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.ExactType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.InterfaceType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.KeyofType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.LiteralType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.NeverType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.NullType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.NumberType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.PartialType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyArrayType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.RecursiveType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.StringType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.TupleType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.UndefinedType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.UnknownType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.VoidType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);
}
