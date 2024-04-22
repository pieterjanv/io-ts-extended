import { extendProtype } from "../misc.js";
import * as t from 'io-ts/lib/index.js';
import { unionSourceDefaultHandler } from "./union.js";
import { FunctionType } from "./function.js";
import { TypeCtor, extensionRegistry } from "../extensionRegistry.js";
import { Ternary, ternaryEvery, ternarySome } from "../ternary.js";

export function initInterface() {

	extendProtype(t.InterfaceType, {
		render() {
			const props: {[key: string]: t.Type<unknown>} = this.props as {[key: string]: t.Type<unknown>};
			const nTotal = Object.keys(props).length;
			let nAdded = 0;
			const entries: string[] = [];
			for (const k in props) {
				if (nAdded > 4) {
					break;
				}
				const prop = props[k];
				entries.push(`${k}: ${prop instanceof FunctionType ? prop.render(true) : prop.name}`)
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
		typeof t.InterfaceType<any>
	>(
		t.AnyDictionaryType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			if (!Object.keys(target.props).length) {
				return Ternary.True;
			}
			return Ternary.False;
		},
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => Ternary.False,
	);

	extensionRegistry.register<
		typeof t.DictionaryType<t.Any, t.Any>,
		typeof t.InterfaceType<any>
	>(
		t.DictionaryType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			if (!Object.keys(target.props).length) {
				return Ternary.True;
			}
			return Ternary.False;
		},
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => Ternary.False,
	);

	extensionRegistry.register<
		typeof t.InterfaceType<any>,
		typeof t.InterfaceType<any>
	>(
		t.InterfaceType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => ternaryEvery(
			Object.entries(target.props as Record<string, t.Type<unknown>>),
			([key, type]) => {
				if (!(key in source.props)) {
					return Ternary.False;
				}
				return isExtendedBy(type, source.props[key]);
			}
		),
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => targetKey in source.props
			? isExtendedBy(targetType, source.props[targetKey])
			: Ternary.False,
	);

	extensionRegistry.register<
		typeof t.PartialType<any>,
		typeof t.InterfaceType<any>
	>(
		t.PartialType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => {
			if (!Object.keys(target.props).length) {
				return Ternary.True;
			}
			return Ternary.False;
		},
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => Ternary.False,
	)

	extensionRegistry.register(
		t.RecursiveType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => hasExtendingProp(source.type),
	);

	extensionRegistry.register(
		t.IntersectionType,
		t.InterfaceType,
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
				entries,
				([targetKey, targetType]) => hasExtendingProp(source, targetKey, targetType)
			);

			function hasExtendingProp(
				source: t.Type<unknown>,
				targetKey: string | number,
				targetType: t.Type<unknown>,
				expanded: t.Type<unknown>[] = [],
			): Ternary {
				if (expanded.includes(source)) {
					return Ternary.Maybe;
				}
				expanded.push(source);
				const SourceCtor = Object.getPrototypeOf(source).constructor as TypeCtor;
				const handler = extensionRegistry.getInterfaceIntersectionHandler(SourceCtor);
				let result: Ternary = Ternary.False;
				handler && (result = handler(
					source,
					targetKey,
					targetType,
					isExtendedBy,
					(s) => hasExtendingProp(
						s,
						targetKey,
						targetType,
						expanded,
					),
				));

				expanded.pop();

				return result;
			}
		},
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => ternarySome(
			source.types as t.Type<unknown>[],
			(s) => hasExtendingProp(s),
		),
	);

	extensionRegistry.register(
		t.UnionType,
		t.InterfaceType,
		unionSourceDefaultHandler,
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => ternaryEvery(
			source.types as t.Type<unknown>[],
			(sourceType) => hasExtendingProp(sourceType)
		),
	);

	extensionRegistry.register(
		t.ExactType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => hasExtendingProp(source.type),
	);

	extensionRegistry.register(
		t.ReadonlyType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => hasExtendingProp(source.type),
	);

	extensionRegistry.register(
		t.RefinementType,
		t.InterfaceType,
		(
			source,
			target,
			isExtendedBy,
		) => isExtendedBy(target, source.type),
		(
			source,
			targetKey,
			targetType,
			isExtendedBy,
			hasExtendingProp,
		) => hasExtendingProp(source.type),
	);
}
