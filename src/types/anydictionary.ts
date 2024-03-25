import * as t from 'io-ts/lib/index.js';
import { extendProtype } from "../misc.js";
import { NullableType } from "./nullable.js";
import { intersectionSourceDefaultHandler } from './intersection.js';
import { unionSourceDefaultHandler } from './union.js';
import { extensionRegistry } from '../extensionRegistry.js';
import { Ternary } from '../ternary.js';

export function initAnyDictionary() {

	extendProtype(t.AnyDictionaryType, {
		render() { return `Record<string, unknown>`; },
	});

	extensionRegistry.register(
		t.AnyDictionaryType,
		t.AnyDictionaryType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.DictionaryType,
		t.AnyDictionaryType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.InterfaceType,
		t.AnyDictionaryType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.PartialType,
		t.AnyDictionaryType,
		() => Ternary.True,
		undefined,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.AnyDictionaryType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.ExactType,
		t.AnyDictionaryType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		NullableType,
		t.AnyDictionaryType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	);

	extensionRegistry.register(
		t.RefinementType,
		t.AnyDictionaryType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		undefined,
	)

	extensionRegistry.register(
		t.IntersectionType,
		t.AnyDictionaryType,
		intersectionSourceDefaultHandler,
		undefined,
	);

	extensionRegistry.register(
		t.UnionType,
		t.AnyDictionaryType,
		unionSourceDefaultHandler,
		undefined,
	);
}
