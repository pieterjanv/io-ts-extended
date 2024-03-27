import { extensionRegistry } from "../extensionRegistry.js";
import { extendProtype, trivialTest } from "../misc.js";
import * as t from 'io-ts/lib/index.js';
import { Ternary } from "../ternary.js";

export function initAny() {

	extendProtype(t.AnyType, {
		render() {
			return 'unknown';
		}
	});
	
	
	extensionRegistry.register(
		t.AnyArrayType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.AnyDictionaryType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.AnyType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.ArrayType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.BigIntType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.BooleanType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.DictionaryType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.ExactType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.InterfaceType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.IntersectionType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.KeyofType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.LiteralType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.NeverType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.NullType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.NumberType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.PartialType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyArrayType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.RecursiveType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.RefinementType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.StringType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.TupleType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.UndefinedType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnknownType,
		t.AnyType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.VoidType,
		t.AnyType,
		trivialTest,
		undefined,
	);	
}
