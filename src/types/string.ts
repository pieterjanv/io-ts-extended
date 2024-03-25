import * as t from 'io-ts';
import { extendProtype } from '../misc.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';
import { unionSourceDefaultHandler } from './union.js';
import { intersectionSourceDefaultHandler } from './intersection.js';

export function initString() {

	extendProtype(t.StringType, {
		render() { return 'string'; },
	});
	
	extensionRegistry.register(
		t.StringType,
		t.StringType,
		(
			source,
			target,
			isExtendedBy,
		) => Ternary.True,
		undefined,
	);
	
	extensionRegistry.register(
		t.LiteralType,
		t.StringType,
		(
			source,
			target,
			isExtendedBy,
		) => target.is(source.value)
			? Ternary.True
			: Ternary.False,
		undefined,
	);
	
	extensionRegistry.register(
		t.KeyofType,
		t.StringType,
		(
			source,
			target,
			isExtendedBy,
		) => Object.keys(source.keys).every(key => target.is(key))
			? Ternary.True
			: Ternary.False,
		undefined,
	);
	
	extensionRegistry.register(
		t.ReadonlyType,
		t.StringType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(source.type, target),
		undefined,
	);
	
	extensionRegistry.register(
		t.RefinementType,
		t.StringType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(source.type, target),
		undefined,
	);
	
	extensionRegistry.register(
		t.IntersectionType,
		t.StringType,
		intersectionSourceDefaultHandler,
		undefined,
	);
	
	extensionRegistry.register(
		t.UnionType,
		t.StringType,
		unionSourceDefaultHandler,
		undefined,
	);
}
