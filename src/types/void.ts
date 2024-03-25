import * as t from 'io-ts/lib/index.js';
import { extendProtype } from "../misc.js";
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export function initVoid() {

	extendProtype(t.VoidType, {
		render() { return 'void'; },
	});

	extensionRegistry.register(
		t.VoidType,
		t.VoidType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.UndefinedType,
		t.VoidType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.VoidType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.VoidType,
		unionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.VoidType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.VoidType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);
}
