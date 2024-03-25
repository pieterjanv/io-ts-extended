import { extensionRegistry } from "../extensionRegistry.js";
import { extendProtype } from "../misc.js";
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
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.AnyDictionaryType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.AnyType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.ArrayType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.BigIntType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.BooleanType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.DictionaryType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.ExactType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.InterfaceType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.IntersectionType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.KeyofType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.LiteralType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.NeverType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.NullType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.NumberType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.PartialType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyArrayType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.RecursiveType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.RefinementType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.StringType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.TupleType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.UndefinedType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnknownType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.VoidType,
		t.AnyType,
		() => Ternary.True,
		undefined,
	);	
}
