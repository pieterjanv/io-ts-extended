import { extensionRegistry } from "../extensionRegistry.js";
import { extendProtype, trivialTest } from "../misc.js";
import * as t from 'io-ts/lib/index.js';
import { Ternary } from "../ternary.js";

export function initUnknown() {

	extendProtype(t.UnknownType, {
		render() { return 'unknown'; },
	});

	extensionRegistry.register(
		t.AnyArrayType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.AnyDictionaryType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.AnyType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.ArrayType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.BigIntType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.BooleanType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.DictionaryType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.ExactType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.InterfaceType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.KeyofType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.LiteralType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.NeverType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.NullType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.NumberType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.PartialType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyArrayType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.RecursiveType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.StringType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.TupleType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.UndefinedType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.UnknownType,
		t.UnknownType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.VoidType,
		t.UnknownType,
		trivialTest,
		undefined,
	);
}
