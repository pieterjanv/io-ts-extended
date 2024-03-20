import * as t from 'io-ts';
import { extendProtype } from "../misc.js";
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { ternaryEvery } from '../ternary.js';

extendProtype(t.ReadonlyArrayType, {
	render() { return `readonly ${(this.type as any).render(true)}[]`; },
});

extensionRegistry.register(
	t.AnyArrayType,
	t.ReadonlyArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target.type, t.unknown),
	undefined,
);

extensionRegistry.register(
	t.ArrayType,
	t.ReadonlyArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target.type, source.type),
	undefined,
);

extensionRegistry.register(
	t.ReadonlyArrayType,
	t.ReadonlyArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target.type, source.type),
	undefined,
);

extensionRegistry.register(
	t.TupleType,
	t.ReadonlyArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => ternaryEvery(
		source.types as t.Type<unknown>[],
		(item) => isExtendedBy(target.type, item),
	),
	undefined,
);

extensionRegistry.register(
	t.RecursiveType,
	t.ReadonlyArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	t.ReadonlyType,
	t.ReadonlyArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	t.RefinementType,
	t.ReadonlyArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	t.IntersectionType,
	t.ReadonlyArrayType,
	intersectionSourceDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.UnionType,
	t.ReadonlyArrayType,
	unionSourceDefaultHandler,
	undefined,
);
