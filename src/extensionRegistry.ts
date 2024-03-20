import * as t from 'io-ts';
import { Ternary } from './ternary.js';
import { isDerivedFrom } from './misc.js';

export type TypeCtor = Omit<typeof t.Type<unknown>, 'constructor'> & {
	new(...args: any[]): t.Type<unknown>
};

export type IsExtendedBy = (
	target: t.Type<unknown>,
	source: t.Type<unknown>,
) => Ternary;

export type TypeExtensionTest = (source: t.Type<unknown>, target: t.Type<unknown>, isExtendedBy: IsExtendedBy) => Ternary;

type SourceResult = (value: Ternary) => void;

type PropsSourceResult = (propExtendsCodomain: (codomain: t.Type<unknown>, key: string) => Ternary) => void;

export type HasExtendingProp = (
	source: t.Type<unknown>,
	targetKey: string | number,
	targetType: t.Type<unknown>,
) => Ternary;

export type HasPartiallyExtendingProp = (
	source: t.Type<unknown>,
	targetKey: string | number,
	targetType: t.Type<unknown>,
) => Ternary | undefined;

type DictionaryIntersectionHandler<S extends TypeCtor, T extends TypeCtor> = (
	source: InstanceType<S>,
	target: InstanceType<T>,
	isExtendedBy: IsExtendedBy,
	dictSourceResult: SourceResult,
	propsSourceResult: PropsSourceResult,
	addIntersectionMember: (type: t.Type<unknown>) => void,
) => void;

type InterfaceIntersectionHandler<S extends TypeCtor, T extends TypeCtor> = (
	source: InstanceType<S>,
	targetKey: string | number,
	targetType: InstanceType<T>,
	isExtendedBy: IsExtendedBy,
	hasExtendingProp: HasExtendingProp,
) => Ternary;

type PartialIntersectionHandler<S extends TypeCtor, T extends TypeCtor> = (
	source: InstanceType<S>,
	targetKey: string | number,
	target: InstanceType<T>,
	isExtendedBy: IsExtendedBy,
	hasPartiallyExtendingProp: HasPartiallyExtendingProp,
) => Ternary | undefined;

export const extensionRegistry = new class ExtensionRegistry {

	readonly _map = new Map<TypeCtor, Map<TypeCtor, TypeExtensionTest>>();

	readonly _dictionaryIntersectionHandlers = new Map<TypeCtor, DictionaryIntersectionHandler<TypeCtor, TypeCtor>>();

	readonly _interfaceIntersectionHandlers = new Map<TypeCtor, InterfaceIntersectionHandler<TypeCtor, TypeCtor>>();

	readonly _partialIntersectionHandlers = new Map<TypeCtor, PartialIntersectionHandler<TypeCtor, TypeCtor>>();

	register<S extends TypeCtor, T extends TypeCtor>(
		source: S,
		target: T,
		test: (source: InstanceType<S>, target: InstanceType<T>, isExtendedBy: IsExtendedBy) => Ternary,
		intersectionHandler: InstanceType<T> extends t.DictionaryType<t.Any, t.Any>
			? DictionaryIntersectionHandler<S, T>
			: InstanceType<T> extends t.InterfaceType<any>
			? InterfaceIntersectionHandler<S, T>
			: InstanceType<T> extends t.PartialType<any>
			? PartialIntersectionHandler<S, T>
			: undefined,
	): void {
		const innerMap = this._map.get(source) ?? new Map();
		innerMap.set(target, test);
		this._map.set(source, innerMap);

		if (!intersectionHandler) {
			return;
		}

		let intersectionHandlerMap: Map<
			TypeCtor,
			| DictionaryIntersectionHandler<TypeCtor, TypeCtor>
			| InterfaceIntersectionHandler<TypeCtor, TypeCtor>
			| PartialIntersectionHandler<TypeCtor, TypeCtor>
		> | undefined = undefined;
		if (isDerivedFrom(target, t.DictionaryType)) {
			intersectionHandlerMap = this._dictionaryIntersectionHandlers;
		}
		else if (isDerivedFrom(target, t.InterfaceType)) {
			intersectionHandlerMap = this._interfaceIntersectionHandlers
		}
		else if (isDerivedFrom(target, t.PartialType)) {
			intersectionHandlerMap = this._partialIntersectionHandlers;
		}

		if (!intersectionHandlerMap) {
			return;
		}

		intersectionHandlerMap.set(source, intersectionHandler);
	}

	getTest<S extends TypeCtor, T extends TypeCtor>(
		source: S,
		target: T,
	): TypeExtensionTest | undefined {
		return this._map.get(source)?.get(target);
	}

	getDictionaryIntersectionHandler(source: TypeCtor) {
		return this._dictionaryIntersectionHandlers.get(source);
	}

	getInterfaceIntersectionHandler(source: TypeCtor) {
		return this._interfaceIntersectionHandlers.get(source);
	}

	getPartialIntersectionHandler(source: TypeCtor) {
		return this._partialIntersectionHandlers.get(source);
	}
}
