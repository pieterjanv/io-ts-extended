import * as t from 'io-ts/lib/index.js';
import { extendProtype, trivialTest } from '../misc.js';
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { Ternary } from '../ternary.js';
import { extensionRegistry } from '../extensionRegistry.js';

export function initNull() {

	extendProtype(t.NullType, {
		render() { return 'null'; },
	});
	
	extensionRegistry.register(
		t.NullType,
		t.NullType,
		trivialTest,
		undefined,
	);
	
	extensionRegistry.register(
		t.IntersectionType,
		t.NullType,
		intersectionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.NullType,
		unionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyType,
		t.NullType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
	
	extensionRegistry.register(
		t.RefinementType,
		t.NullType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
}
