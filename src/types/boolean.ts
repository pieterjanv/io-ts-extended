import { extendProtype } from "../misc.js";
import * as t from 'io-ts';
import { NullableType } from "./nullable.js";
import { intersectionSourceDefaultHandler } from "./intersection.js";
import { unionSourceDefaultHandler } from "./union.js";
import { extensionRegistry } from "../extensionRegistry.js";
import { Ternary } from "../ternary.js";

extendProtype(t.BooleanType, {
	render() { return 'boolean'; },
});

extensionRegistry.register(
	t.BooleanType,
	t.BooleanType,
	() => Ternary.True,
	undefined,
);

extensionRegistry.register(
	t.LiteralType,
	t.BooleanType,
	(
		source,
		target,
		isExtendedBy,
	) => {
		if (source.is(true) || source.is(false)) { return Ternary.True; }
		return Ternary.False;
	},
	undefined,
);

extensionRegistry.register(
	t.ReadonlyType,
	t.BooleanType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	t.RefinementType,
	t.BooleanType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	NullableType,
	t.BooleanType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	t.IntersectionType,
	t.BooleanType,
	intersectionSourceDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.UnionType,
	t.BooleanType,
	unionSourceDefaultHandler,
	undefined,
);
