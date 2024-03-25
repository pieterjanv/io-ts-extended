import * as t from 'io-ts';
import { extendProtype } from '../misc.js';
import { Ternary, ternaryEvery, ternarySome } from '../ternary.js';
import { IsExtendedBy, extensionRegistry } from '../extensionRegistry.js';
import { intersectionSourceDefaultHandler } from './intersection.js';

export function unionSourceDefaultHandler (
	source: t.UnionType<t.Any[]>,
	target: t.Type<unknown>,
	isExtendedBy: IsExtendedBy,
) {
	return ternaryEvery(
		source.types as t.Type<unknown>[],
		(type) => isExtendedBy(target, type),
	);
};

export function unionTargetDefaultHandler (
	source: t.Type<unknown>,
	target: t.UnionType<t.Any[]>,
	isExtendedBy: IsExtendedBy,
) {
	return ternarySome(
		target.types as t.Type<unknown>[],
		(type) => isExtendedBy(type, source),
	);
};

export function initUnion() {

	extendProtype(t.UnionType, {
		render(isComposed) {
			const result = this.types
				.map(type => `${(type as any).render(true)}`).join(' | ');
			return isComposed ? `(${result})` : result;
		}
	});
	
	extensionRegistry.register(
		t.AnyArrayType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.AnyDictionaryType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.AnyType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.ArrayType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.BigIntType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.BooleanType,
		t.UnionType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			addBooleans(target);
			return ternarySome(
				target.types as t.Type<unknown>[],
				(type) => isExtendedBy(type, source),
			);
		
		},
		undefined,
	);
	
	extensionRegistry.register(
		t.DictionaryType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.ExactType,
		t.UnionType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
	
	extensionRegistry.register(
		t.InterfaceType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.IntersectionType,
		t.UnionType,
		intersectionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.KeyofType,
		t.UnionType,
		(
			source,
			target,
			isExtendedBy,
		) => ternaryEvery(
			Object.keys(source.keys),
			(key) => unionTargetDefaultHandler(t.literal(key), target, isExtendedBy),
		),
		undefined,
	);
	
	extensionRegistry.register(
		t.LiteralType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.NeverType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.NullType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.NumberType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.PartialType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyArrayType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.RecursiveType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.RefinementType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.StringType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.TupleType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UndefinedType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.UnionType,
		unionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnknownType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.VoidType,
		t.UnionType,
		unionTargetDefaultHandler,
		undefined,
	);
	
	function addBooleans(union: t.UnionType<t.Any[]>): void {
		const booleanLiterals = union.types
			.filter((type) => type instanceof t.LiteralType && typeof type.value === 'boolean')
			.map((type: t.LiteralType<boolean>) => type.value);
		if (booleanLiterals.includes(true) && booleanLiterals.includes(false)) {
			union.types.push(t.boolean);
		}
	}
}
