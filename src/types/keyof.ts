import * as t from 'io-ts/lib/index.js';
import { extendProtype } from '../misc.js';
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export function initKeyof() {

	extendProtype(t.KeyofType, {
		render() {
			const nTotal: number = Object.keys(this.keys).length;
			let nAdded = 0;
			const entries: string[] = [];
			for (const k in this.keys) {
				if (nAdded > 4) {
					break;
				}
				entries.push(typeof k === 'string' ? `"${k}"` : k);
				nAdded++;
			}
			return `{ ${(entries.join(' | '))}${
				nTotal > nAdded
					? ` and ${nTotal - nAdded} more...`
					: ''
			} }`;
		},
	});

	extensionRegistry.register(
		t.LiteralType,
		t.KeyofType,
		(
			source,
			target,
			isExtendedBy,
		) => (
			(typeof source.value === 'string' || typeof source.value === 'number') &&
			Object.hasOwn(target.keys, source.value)
		)? Ternary.True : Ternary.False,
		undefined,
	);

	extensionRegistry.register(
		t.KeyofType,
		t.KeyofType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			const keys = Object.keys(target.keys);
			return Object.keys(source.keys).every((key) => keys.includes(key))
				? Ternary.True
				: Ternary.False;
		},
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.KeyofType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.KeyofType,
		unionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.KeyofType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.KeyofType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
}
