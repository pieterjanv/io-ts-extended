import * as t from 'io-ts';
import { extendProtype } from '../misc.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary, ternaryEvery } from '../ternary.js';

extendProtype(t.TupleType, {
	render() { return `[${this.types.map(type => (type as any).render(false)).join(', ')}]` },
});

extensionRegistry.register(
	t.RecursiveType,
	t.TupleType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);

extensionRegistry.register(
	t.TupleType,
	t.TupleType,
	(
		source,
		target,
		isExtendedBy,
	) => target.types.length === source.types.length ? ternaryEvery(
		target.types as t.Type<unknown>[],
		(type) => isExtendedBy(type, source.types[target.types.indexOf(type)]),
	) : Ternary.False,
	undefined,
);

extensionRegistry.register(
	t.IntersectionType,
	t.TupleType,
	(
		source,
		target,
		isExtendedBy,
	) => {
		let result = target.types.map(() => Ternary.False);
		for (const sourceType of source.types) {
			if (sourceType instanceof t.TupleType) {
				if (sourceType.types.length !== target.types.length) {
					return Ternary.False;
				}
				for (const targetType of target.types) {
					const index = target.types.indexOf(targetType);
					result[index] |= isExtendedBy(targetType, sourceType.types[index]);
				}
			}
		}
		return ternaryEvery(result, (value) => value);
	},
	undefined,
);

extensionRegistry.register(
	t.UnionType,
	t.TupleType,
	unionSourceDefaultHandler,
	undefined,
);

extensionRegistry.register(
	t.RefinementType,
	t.TupleType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	undefined,
);
