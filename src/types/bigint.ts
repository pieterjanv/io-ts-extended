import { extendProtype, trivialTest } from "../misc.js";
import * as t from 'io-ts/lib/index.js';
import { NullableType } from "./nullable.js";
import { intersectionSourceDefaultHandler } from "./intersection.js";
import { unionSourceDefaultHandler } from "./union.js";
import { extensionRegistry } from "../extensionRegistry.js";
import { Ternary } from "../ternary.js";

export function initBigInt() {

	extendProtype(t.BigIntType, {
		render() { return 'bigint'; },
	});

	extensionRegistry.register(
		t.BigIntType,
		t.BigIntType,
		trivialTest,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.BigIntType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.BigIntType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		NullableType,
		t.BigIntType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.BigIntType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.BigIntType,
		unionSourceDefaultHandler,
		undefined,
	);
}
