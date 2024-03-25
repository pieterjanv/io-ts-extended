import { extendProtype } from "../misc.js";
import * as t from 'io-ts';
import { FunctionType } from "./function.js";
import { IsExtendedBy, extensionRegistry } from "../extensionRegistry.js";
import { Ternary } from "../ternary.js";

export const readonlyTargetDefaultHandler = (
	source: t.Type<unknown>,
	target: t.ReadonlyType<t.Type<unknown>>,
	isExtendedBy: IsExtendedBy,
) => isExtendedBy(target.type, source);

export function initReadonly() {

	extendProtype(t.ReadonlyType, {
		render() { return `readonly ${(this.type as any).render(true)}`; },
	});
	
	extensionRegistry.register(
		t.RefinementType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.ReadonlyType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target.type, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.UnknownType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.AnyArrayType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.AnyDictionaryType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.AnyType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ArrayType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.BigIntType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.BooleanType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.DictionaryType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ExactType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		FunctionType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.InterfaceType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.KeyofType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.LiteralType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NeverType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NullType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NumberType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.PartialType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyArrayType,
		t.ReadonlyType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target.type, t.array(source.type)),
		undefined,
	);

	extensionRegistry.register(
		t.RecursiveType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.StringType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.TupleType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UndefinedType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnknownType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.VoidType,
		t.ReadonlyType,
		readonlyTargetDefaultHandler,
		undefined,
	);
}
