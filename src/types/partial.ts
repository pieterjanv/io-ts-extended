import { extendProtype } from "../misc.js";
import * as t from 'io-ts/lib/index.js';
import { unionSourceDefaultHandler } from "./union.js";
import { HasPartiallyExtendingProp, IsExtendedBy, TypeCtor, extensionRegistry } from "../extensionRegistry.js";
import { Ternary, ternaryEvery } from "../ternary.js";

export function initPartial() {

	extendProtype(t.PartialType, {
		render() {
			const nTotal: number = Object.keys(this.props as {[key: string]: t.Any}).length;
			let nAdded = 0;
			const entries: string[] = [];
			for (const k in this.props as {[key: string]: t.Any}) {
				if (nAdded > 4) {
					break;
				}
				entries.push(`${k}?: ${((this.props as {[key: string]: t.Any})[k] as any).render(true)}`)
				nAdded++;
			}
			return `{ ${(entries.join(', '))}${
				nTotal > nAdded
					? ` and ${nTotal - nAdded} more...`
					: ''
			} }`;
		},
	});

	extensionRegistry.register<
		typeof t.AnyDictionaryType,
		typeof t.PartialType<any>
	>(
		t.AnyDictionaryType,
		t.PartialType,
		() => Ternary.True,
		() => Ternary.True,
	);

	extensionRegistry.register<
		typeof t.DictionaryType<t.Any, t.Any>,
		typeof t.PartialType<any>
	>(
		t.DictionaryType,
		t.PartialType,
		() => Ternary.True,
		() => Ternary.True,
	);

	extensionRegistry.register<
		typeof t.InterfaceType<any>,
		typeof t.PartialType<any>
	>(
		t.InterfaceType,
		t.PartialType,
		interfaceOrPartialSourceHandler,
		interfaceOrPartialSourceIntersectionHandler,
	);

	extensionRegistry.register<
		typeof t.PartialType<any>,
		typeof t.PartialType<any>
	>(
		t.PartialType,
		t.PartialType,
		interfaceOrPartialSourceHandler,
		interfaceOrPartialSourceIntersectionHandler,
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.PartialType,
		(
			source,
			target,
			isExtendedBy,
		) => {

			const emptyInterface = t.type({});
			const entries = Object.entries(target.props as Record<string, t.Type<unknown>>);

			if (entries.length === 0) {
				return ternaryEvery(
					source.types as t.Type<unknown>[],
					(type) => isExtendedBy(emptyInterface, type)
				);
			}

			return ternaryEvery(
				Object.entries(target.props as Record<string, t.Type<unknown>>),
				([targetKey, targetType]) => hasPartiallyExtendingProp(source, targetKey, targetType) ?? Ternary.True,
			);

			function hasPartiallyExtendingProp(
				source: t.Type<unknown>,
				targetKey: string | number,
				targetType: t.Type<unknown>,
				expanded: t.Type<unknown>[] = [],
			): Ternary | undefined {
				if (expanded.includes(source)) {
					return Ternary.Maybe;
				}
				expanded.push(source);
				const SourceMemberCtor = Object.getPrototypeOf(source).constructor as TypeCtor;
				const handler = extensionRegistry.getPartialIntersectionHandler(SourceMemberCtor);
				let result: Ternary | undefined = Ternary.False;
				handler && (result = handler(
					source,
					targetKey,
					targetType,
					isExtendedBy,
					(source, targetKey, targetType) => hasPartiallyExtendingProp(
						source,
						targetKey,
						targetType,
						expanded,
					),
				));
				return result;
			}
		},
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasPartiallyExtendingProp,
		) => {
			let result: Ternary | undefined = undefined;
			for (const type of source.types) {
				const r = hasPartiallyExtendingProp(type, targetKey, targetType);
				switch(r) {
					case Ternary.True:
						return Ternary.True;
					case Ternary.False:
					case Ternary.Maybe:
						result ??= Ternary.False;
						result |= r;
						break;
				}
			}
			return result;
		},
	);

	extensionRegistry.register(
		t.UnionType,
		t.PartialType,
		unionSourceDefaultHandler,
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasPartiallyExtendingProp,
		) => {
			let result: Ternary | undefined = undefined;
			for (const type of source.types) {
				const r = hasPartiallyExtendingProp(type, targetKey, targetType);
				switch(r) {
					case Ternary.False:
						return Ternary.False;
					case Ternary.True:
					case Ternary.Maybe:
						result ??= Ternary.True;
						result &= r;
						break;
				}
			}
			return result;
		},
	);

	extensionRegistry.register(
		t.ExactType,
		t.PartialType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			return isExtendedBy(target, source.type);
		},
		defaultIntersectionHandler,
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.PartialType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			return isExtendedBy(target, source.type);
		},
		defaultIntersectionHandler,
	);

	extensionRegistry.register(
		t.RecursiveType,
		t.PartialType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			return isExtendedBy(target, source.type);
		},
		defaultIntersectionHandler,
	)

	extensionRegistry.register(
		t.RefinementType,
		t.PartialType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			return isExtendedBy(target, source.type);
		},
		defaultIntersectionHandler,
	);

	function defaultIntersectionHandler(
		source: t.Type<unknown> & { type: t.Type<unknown> },
		targetKey: string | number,
		targetType: t.Type<unknown>,
		isExtendedBy: IsExtendedBy,
		hasPartiallyExtendingProp: HasPartiallyExtendingProp,
	) {
		return hasPartiallyExtendingProp(source.type, targetKey, targetType);
	}

	function interfaceOrPartialSourceHandler<
		S extends t.InterfaceType<any> | t.PartialType<any>,
		T extends t.PartialType<any>
	>(
		source: S,
		target: T,
		isExtendedBy: IsExtendedBy,
	) {
		let result = Ternary.True;
		for (const key in target.props) {

			if (
				!(key in source.props) ||
				source.props[key] === t.undefined
			) {
				continue;
			}

			result &= isExtendedBy(
				t.union([(target.props as Record<string, t.Type<unknown>>)[key], t.undefined]),
				source.props[key],
			);
			if (result === Ternary.False) {
				return Ternary.False;
			}
		}
		return result;
	}

	function interfaceOrPartialSourceIntersectionHandler(
		source: t.InterfaceType<any> | t.PartialType<any>,
		targetKey: string | number,
		targetType: t.PartialType<any>,
		isExtendedBy: IsExtendedBy,
		hasPartiallyExtendingProp: HasPartiallyExtendingProp,
	) {
		if (targetKey in source.props && source.props[targetKey] !== t.undefined) {
			return isExtendedBy(targetType, source.props[targetKey]);
		}
		return undefined;
	}
}
