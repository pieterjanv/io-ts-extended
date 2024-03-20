import { IsExtendedBy, extensionRegistry } from "../extensionRegistry.js";
import { extendProtype } from "../misc.js";
import * as t from 'io-ts';

extendProtype(t.RecursiveType, {
	render() { return this.name; },
});

const defaultHandler = (
	source: t.Type<unknown>,
	target: t.RecursiveType<t.Type<unknown>>,
	isExtendedBy: IsExtendedBy,
) => {
	return isExtendedBy(target.type, source);
};

extensionRegistry.register(
	t.AnyArrayType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.AnyDictionaryType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.AnyType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ArrayType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.DictionaryType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ExactType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.InterfaceType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.IntersectionType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.PartialType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ReadonlyArrayType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.ReadonlyType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.RecursiveType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.RefinementType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.TupleType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);

extensionRegistry.register(
	t.UnionType,
	t.RecursiveType,
	defaultHandler,
	undefined,
);
