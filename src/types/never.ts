import * as t from 'io-ts';
import { extendProtype } from '../misc.js';
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export function initNever() {

	extendProtype(t.NeverType, {
		render() { return 'never'; },
	});

	extensionRegistry.register(
		t.NeverType,
		t.NeverType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.NeverType,
		(
			source,
			target,
			isExtendedBy,
		) => {

			if (
				isExtendedBy(t.type({}), source) !== Ternary.False ||
				isExtendedBy(t.array(t.unknown), source) !== Ternary.False
			) {
				return Ternary.False;
			}

			const sourceTypes = source.types.slice();
			let sourceType: t.Type<any, any, any> | undefined;
			while (sourceType = sourceTypes.pop()) {
				if (isExtendedBy(target, sourceType)) {
					return Ternary.True;
				} else {
					for (const s of sourceTypes) {
						if (
							!isExtendedBy(s, sourceType) &&
							!isExtendedBy(sourceType, s)
						) {
							return Ternary.True;
						}
					}
				}
			}

			return Ternary.False;
		},
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.NeverType,
		unionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.NeverType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.NeverType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
}
