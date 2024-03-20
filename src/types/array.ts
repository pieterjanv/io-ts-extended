import * as t from 'io-ts';
import { extendProtype } from "../misc.js";
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { ternaryEvery } from '../ternary.js';

extendProtype(t.ArrayType, {
	render() { return `${(this.type as any).render(true)}[]` },
});

extensionRegistry.register(
	t.AnyArrayType,
	t.ArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target.type, t.unknown),
	undefined,
);

extensionRegistry.register(
	t.ArrayType,
	t.ArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target.type, source.type),
	undefined,
);

extensionRegistry.register(
	t.TupleType,
	t.ArrayType,
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
	t.ArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	t.RefinementType,
	t.ArrayType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	t.IntersectionType,
	t.ArrayType,
	intersectionSourceDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.UnionType,
	t.ArrayType,
	unionSourceDefaultHandler,
	undefined,
);
