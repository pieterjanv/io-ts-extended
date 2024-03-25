import * as t from 'io-ts';
import { extendProtype } from '../misc.js';
import { NullableType } from './nullable.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';

export function initUndefined() {

	extendProtype(t.UndefinedType, {
		render() { return 'undefined'; },
	});
	
	extensionRegistry.register(
		t.UndefinedType,
		t.UndefinedType,
		() => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.IntersectionType,
		t.UndefinedType,
		intersectionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.UndefinedType,
		unionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyType,
		t.UndefinedType,
		(source, target, isExtendedBy) => isExtendedBy(target, source.type),
		undefined,
	);
	
	extensionRegistry.register(
		t.RefinementType,
		t.UndefinedType,
		(source, target, isExtendedBy) => isExtendedBy(target, source.type),
		undefined,
	);
	
	extensionRegistry.register(
		NullableType,
		t.UndefinedType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
}
