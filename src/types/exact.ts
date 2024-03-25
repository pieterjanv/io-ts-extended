import { IsExtendedBy, extensionRegistry } from "../extensionRegistry.js";
import { extendProtype } from "../misc.js";
import * as t from 'io-ts/lib/index.js';

export function initExact() {

	extendProtype(t.ExactType, {
		render() { return `exact ${(this.type as any).render()}` },
	});

	const defaultHandler = (
		source: t.Type<unknown>,
		target: t.ExactType<t.Any>,
		isExtendedBy: IsExtendedBy,
	) => isExtendedBy(target.type, source);

	extensionRegistry.register(
		t.AnyArrayType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.AnyDictionaryType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.AnyType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ArrayType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.BigIntType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.BooleanType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.DictionaryType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ExactType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.InterfaceType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.KeyofType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.LiteralType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NeverType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NullType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NumberType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.PartialType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyArrayType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.RecursiveType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.StringType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.TupleType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UndefinedType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnknownType,
		t.ExactType,
		defaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.VoidType,
		t.ExactType,
		defaultHandler,
		undefined,
	);
}
