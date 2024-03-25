import * as t from 'io-ts';
import { extendProtype } from '../misc.js';
import { PromiseType } from './promise.js';
import { IsExtendedBy, extensionRegistry } from '../extensionRegistry.js';
import { Ternary, ternaryEvery, ternarySome } from '../ternary.js';

export function intersectionSourceDefaultHandler(
	source: t.IntersectionType<t.Any[]>,
	target: t.Type<unknown>,
	isExtendedBy: IsExtendedBy,
): Ternary {
	return ternarySome(
		source.types as t.Type<unknown>[],
		(type) => isExtendedBy(target, type),
	);
};

export function intersectionTargetDefaultHandler (
	source: t.Type<unknown>,
	target: t.IntersectionType<t.Any[]>,
	isExtendedBy: IsExtendedBy,
): Ternary {
	return ternaryEvery(
		target.types as t.Type<unknown>[],
		(type) => isExtendedBy(type, source),
	);
};

export function initIntersection() {

	extendProtype(t.IntersectionType, {
		render(isComposed) {
			const result = this.types
				.map(type => `${(type as any).render(true)}`).join(' & ');
			return isComposed ? `(${result})` : result;
		}
	});

	extensionRegistry.register(
		t.AnyArrayType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.AnyDictionaryType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.AnyType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ArrayType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.BigIntType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.BooleanType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.DictionaryType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ExactType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.InterfaceType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.KeyofType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.LiteralType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NeverType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NullType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.NumberType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.PartialType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		PromiseType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyArrayType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.RecursiveType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.StringType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.TupleType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UndefinedType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.IntersectionType,
		(source, target, isExtendedBy) => intersectionTargetDefaultHandler(
			source,
			target,
			isExtendedBy,
		),
		undefined,
	);

	extensionRegistry.register(
		t.UnknownType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.VoidType,
		t.IntersectionType,
		intersectionTargetDefaultHandler,
		undefined,
	);
}
