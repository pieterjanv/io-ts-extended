import * as t from 'io-ts';
import { extendProtype } from '../misc.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';

export function initNumber() {

	extendProtype(t.NumberType, {
		render() { return 'number'; },
	});

	extensionRegistry.register(
		t.NumberType,
		t.NumberType,
		(
			source,
			target,
			isExtendedBy,
		) => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.LiteralType,
		t.NumberType,
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
		t.NumberType,
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
		t.NumberType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(source.type, target),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.NumberType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(source.type, target),
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.NumberType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.NumberType,
		unionSourceDefaultHandler,
		undefined,
	);
}
