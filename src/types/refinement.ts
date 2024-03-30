import * as t from 'io-ts/lib/index.js';
import { extendProtype } from "../misc.js";
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export function initRefinement() {

	extendProtype(t.RefinementType, {
		render() { return this.name; },
	});

	extensionRegistry.register(
		t.AnyType,
		t.RefinementType,
		() => Ternary.True,
		undefined,
	)
	
	extensionRegistry.register(
		t.RefinementType,
		t.RefinementType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			if (source.name === target.name) {
				return isExtendedBy(target.type, source.type);
			}
			return isExtendedBy(target, source.type);
		},
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyType,
		t.RefinementType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
	
	extensionRegistry.register(
		t.ExactType,
		t.RefinementType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
	
	extensionRegistry.register(
		t.IntersectionType,
		t.RefinementType,
		intersectionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.RefinementType,
		unionSourceDefaultHandler,
		undefined,
	);
}
