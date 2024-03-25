import * as t from 'io-ts/lib/index.js';
import { extendProtype } from "../misc.js";
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export function initLiteral() {

	extendProtype(t.LiteralType, {
		render() { return typeof this.value === 'string'
			? `"${this.value}"`
			: this.value.toString();
		},
	});

	extensionRegistry.register(
		t.LiteralType,
		t.LiteralType,
		(
			source,
			target,
			isExtendedBy,
		) => source.value === target.value
			? Ternary.True
			: Ternary.False,
		undefined,
	);

	extensionRegistry.register(
		t.KeyofType,
		t.LiteralType,
		(
			source,
			target,
			isExtendedBy,
		) => Object.keys(source.keys).every(key => key === target.value)
			? Ternary.True
			: Ternary.False,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.LiteralType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.LiteralType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.LiteralType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.LiteralType,
		unionSourceDefaultHandler,
		undefined,
	);
}
