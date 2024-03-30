import * as t from 'io-ts/lib/index.js';
import { extendProtype } from '../misc.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary, ternaryEvery } from '../ternary.js';
import { intersectionSourceDefaultHandler } from './intersection.js';

export function initTuple() {

	extendProtype(t.TupleType, {
		render() { return `[${this.types.map(type => (type as any).render(false)).join(', ')}]` },
	});
	
	extensionRegistry.register(
		t.RecursiveType,
		t.TupleType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
	
	extensionRegistry.register(
		t.TupleType,
		t.TupleType,
		(
			source,
			target,
			isExtendedBy,
		) => target.types.length === source.types.length ? ternaryEvery(
			target.types as t.Type<unknown>[],
			(type) => isExtendedBy(type, source.types[target.types.indexOf(type)]),
		) : Ternary.False,
		undefined,
	);
	
	extensionRegistry.register(
		t.IntersectionType,
		t.TupleType,
		intersectionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.TupleType,
		unionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.RefinementType,
		t.TupleType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
}
