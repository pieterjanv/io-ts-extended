import * as t from 'io-ts/lib/index.js';
import { extendProtype, trivialTest } from "../misc.js";
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { IsExtendedBy, extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export function initAnyArray() {

	extendProtype(t.AnyArrayType, {
		render() { return `unknown[]` },
	});
	
	extensionRegistry.register(
		t.AnyArrayType,
		t.AnyArrayType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.ArrayType,
		t.AnyArrayType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.TupleType,
		t.AnyArrayType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.RefinementType,
		t.AnyArrayType,
		(
			source,
			target,
			isExtendedBy: IsExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	)
	
	extensionRegistry.register(
		t.IntersectionType,
		t.AnyArrayType,
		intersectionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.AnyArrayType,
		unionSourceDefaultHandler,
		undefined,
	);
}
