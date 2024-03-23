import { extendProtype } from "../misc.js";
import * as t from 'io-ts';
import { IsExtendedBy, TypeCtor, extensionRegistry } from "../extensionRegistry.js";
import { Ternary, ternaryEvery } from "../ternary.js";
import { unionSourceDefaultHandler } from "./union.js";

extendProtype(t.DictionaryType, {
	render() { return `Record<${(this.domain as any).render()}, ${(this.codomain as any).render()}>`; },
});

extensionRegistry.register(
	t.AnyDictionaryType,
	t.DictionaryType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target.codomain, t.unknown),
	(
		source,
		target,
		isExtendedBy,
		setDictSourceResult,
		setPropsSourceResult,
		addIntersectionMember,
	) => {
		setDictSourceResult(isExtendedBy(target, source));
	},
);

extensionRegistry.register(
	t.DictionaryType,
	t.DictionaryType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target.codomain, source.codomain),
	(
		source,
		target,
		isExtendedBy,
		setDictSourceResult,
		setPropsSourceResult,
		addIntersectionMember,
	) => {
		setDictSourceResult(isExtendedBy(target, source));
	},
);

extensionRegistry.register(
	t.ExactType,
	t.DictionaryType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	(
		source,
		target,
		isExtendedBy,
		setDictSourceResult,
		setPropsSourceResult,
		addIntersectionMember,
	) => {
		addIntersectionMember(source.type);
	},
);

extensionRegistry.register(
	t.ReadonlyType,
	t.DictionaryType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	(
		source,
		target,
		isExtendedBy,
		setDictSourceResult,
		setPropsSourceResult,
		addIntersectionMember,
	) => {
		addIntersectionMember(source.type);
	},
);

extensionRegistry.register(
	t.RefinementType,
	t.DictionaryType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	(
		source,
		target,
		isExtendedBy,
		setDictSourceResult,
		setPropsSourceResult,
		addIntersectionMember,
	) => {
		addIntersectionMember(source.type);
	},
);

const interfaceOrPartialHandler = <T extends t.InterfaceType<any> | t.PartialType<any>>(
	source: T,
	target: t.DictionaryType<t.Any, t.Any>,
	isExtendedBy: IsExtendedBy,
) => ternaryEvery(
	Object.entries(source.props as Record<string, t.Type<unknown>>),
	([key, value]) => {
		if (
			target.domain === t.number && isNaN(Number(key)) ||
			target.domain === t.string && !['string', 'number'].includes(typeof key)
		) {
			return Ternary.False;
		}
		return isExtendedBy(target.codomain, value)
	}
)

extensionRegistry.register<
	typeof t.InterfaceType<Record<string, t.Type<unknown>>>,
	typeof t.DictionaryType<t.Any, t.Any>
>(
	t.InterfaceType,
	t.DictionaryType,
	interfaceOrPartialHandler,
	(
		source,
		target,
		isExtendedBy,
		setDictSourceResult,
		setPropsSourceResult,
		addIntersectionMember,
	) => {
		setPropsSourceResult((codomain, key) => isExtendedBy(codomain, source.props[key]));
	},
);

extensionRegistry.register<
	typeof t.PartialType<Record<string, t.Type<unknown>>>,
	typeof t.DictionaryType<t.Any, t.Any>
>(
	t.PartialType,
	t.DictionaryType,
	interfaceOrPartialHandler,
	(
		source,
		target,
		isExtendedBy,
		setDictSourceResult,
		setPropsSourceResult,
		addIntersectionMember,
	) => {
		setPropsSourceResult((codomain, key) => isExtendedBy(codomain, source.props[key]));
	},
);

extensionRegistry.register(
	t.IntersectionType,
	t.DictionaryType,
	(
		source,
		target,
		isExtendedBy,
	) => {
		const expandedTypes: (t.IntersectionType<t.Type<unknown>[]> | t.UnionType<t.Type<unknown>[]>)[] = [];
		const dictsList: (Ternary|undefined)[] = [undefined];
		const dictsResults: (Ternary|undefined)[] = [];
		const propsList: Record<string, Ternary>[] = [];
		const propsResults: Record<string, Ternary>[] = [];
		const typesList: t.Type<unknown>[][] = [source.types];
		let types: t.Type<unknown>[] | undefined;
		let type: t.Type<unknown> | undefined;
		outer: while (types = typesList.pop()) {
			let dictsResult = dictsList.pop() ?? undefined;
			let propsResult = propsList.pop() ?? {};
			while (type = types.pop()) {

				if (
					type instanceof t.IntersectionType &&
					!expandedTypes.includes(type)
				) {
					types.push(...type.types);
					expandedTypes.push(type);
				}
				else if (
					type instanceof t.UnionType &&
					!expandedTypes.includes(type)
				) {
					for (const unionType of type.types) {
						typesList.push([...types, unionType]);
						dictsList.push(dictsResult);
						propsList.push({...propsResult});
					}
					expandedTypes.push(type);
					continue outer;
				}
				else {
					const SourceMemberCtor = Object.getPrototypeOf(type).constructor as TypeCtor;
					const handler = extensionRegistry.getDictionaryIntersectionHandler(SourceMemberCtor);
					handler && handler(
						type,
						target,
						isExtendedBy,
						(value: Ternary) => {
							dictsResult ??= Ternary.False;
							dictsResult |= value;
						},
						((propExtendsCodomain: (codomain: t.Type<unknown>, prop: string) => Ternary) => {
							for (const propName in (
								type as t.InterfaceType<Record<string, t.Type<unknown>> | t.PartialType<Record<string, t.Type<unknown>>>>
							).props) {
								if (!(propName in propsResult)) {
									propsResult[propName] = Ternary.False;
								}
								propsResult[propName] |= propExtendsCodomain(target.codomain, propName);
							}
						}),
						(type: t.Type<unknown>) => { types?.unshift(type); },
					);
				}
			}
			if (dictsResult === Ternary.False) {
				return Ternary.False;
			}
			if (
				dictsResult === undefined &&
				ternaryEvery(Object.values(propsResult), (result) => result) === Ternary.False
			) {
				return Ternary.False;
			}
			dictsResults.push(dictsResult);
			propsResults.push(propsResult);
		}

		return ternaryEvery(
			dictsResults,
			(dictsResult, index) => dictsResult ?? ternaryEvery(
				Object.values(propsResults[index]),
				(propsResult) => propsResult,
			),
		);
	},
	() => {},
);

extensionRegistry.register(
	t.UnionType,
	t.DictionaryType,
	unionSourceDefaultHandler,
	() => {},
);

extensionRegistry.register(
	t.RecursiveType,
	t.DictionaryType,
	(
		source,
		target,
		isExtendedBy,
	) => isExtendedBy(target, source.type),
	(
		source,
		target,
		isExtendedBy,
		setDictSourceResult,
		setPropsSourceResult,
		addIntersectionMember,
	) => {
		addIntersectionMember(source.type);
	},
);	
