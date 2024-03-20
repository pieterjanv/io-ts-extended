# io-ts-extended


## Description

This package extends the [`io-ts`](https://github.com/gcanti/io-ts) package with
functionality to test if one type extends another, like the `extends` keyword in
TypeScript, alongside a few types and other utilities.

Furthermore, you can extend the extension testing logic with your own types.

I am trying to mature this package sufficiently to justify a release on npm,
so any feedback is greatly appreciated.


## Installation

Since this package is in its infancy, it is not yet available on npm. However,
you can install it directly from GitHub using the following command:

```bash
npm install --save git+https://github.com/pieterjanv/io-ts-extended.git
```


## Usage


### Testing two types:

```typescript
import * as t from 'io-ts-extended';

const type1 = t.type({ a: t.string });
const type2 = t.type({ a: t.string, b: t.number });
const type2ExtendsType1 = t.isExtensionOf(type2, type1); // true
const type1ExtendsType2 = t.isExtensionOf(type1, type2); // false
```


### Extending the extension testing logic:

The signature of the extension registration function is:

```typescript
extensionRegistry.register = <S extends t.TypeCtor, T extends t.TypeCtor>(
	source: S,
	target: T,
	test: (
		source: t.InstanceType<S>,
		target: t.InstanceType<T>,
		isExtendedBy: t.IsExtendedBy
	) => Ternary,
	intersectionHandler: InstanceType<T> extends t.DictionaryType<t.Any, t.Any>
		? t.DictionaryIntersectionHandler<S, T>
		: InstanceType<T> extends t.InterfaceType<any>
		? t.InterfaceIntersectionHandler<S, T>
		: InstanceType<T> extends t.PartialType<any>
		? t.PartialIntersectionHandler<S, T>
		: undefined,
): void;
```

Here `t.TypeCtor` is any type class that extends `t.Type<any, any, any>`. The
parameters are described below.


#### Example:

```typescript
import * as t from 'io-ts-extended';

class MyType extends t.Type<..> { ... }

t.extensionRegistry.register(
	MyType, // source type
	t.UnionType, // target type
	t.unionTargetDefaultHandler,
	undefined,
);

// repeat for every type class that can be extended by MyType as well as any
// type class that can extend MyType
```


#### Parameters


##### `source`

A source type class that can extend the target type class.


##### `target`

A target type class that can be extended by the source type class.


##### `test`

The `test` parameter requires a function that tests if the source type extends
the target type, returning `t.Ternary.True` if it does, `t.Ternary.False` if it
does not and `t.Ternary.Maybe` if it cannot be ruled out nor confirmed (for
recursive types). Its third parameter is a function that can be used to test
if a type extends another type, keeping track of the types that have already
been tested to avoid infinite loops. Note that, in contrast to `isExtensionOf`
it takes the target as the first argument, and the source as the second
argument.


##### `intersectionHandler`

The `intersectionHandler` is required, but `undefined` for most types. It is
defined if the target is a `t.DictionaryType`, `t.InterfaceType`, or
`t.PartialType`. It requires some type-specific logic to handle the case of
testing for an intersection source containing a type of type `source`.


###### `DictionaryIntersectionHandler` (when the target is dictionary-like)

The signature of `t.DictionaryIntersectionHandler` is:

```typescript
type DictionaryIntersectionHandler<S extends TypeCtor, T extends TypeCtor> = (
	source: InstanceType<S>,
	target: InstanceType<T>,
	isExtendedBy: IsExtendedBy,
	dictSourceResult: SourceResult,
	propsSourceResult: PropsSourceResult,
	addIntersectionMember: (type: t.Type<unknown>) => void,
) => void;
```

The first three parameters correspond to that of the `test` function.

The `dictSourceResult` is a function that should be called in case the source
type is a dictionary-like type (i.e. it constrains every possible key to a
specific type). It must be passed the result of testing the source type against
the target type

The `propsSourceResult` is a function that should be called in case the source
type is an interface-like type (i.e. it constraints some but not all keys). It
must be passed a callback with the following signature:

```typescript
(codomain: t.Type<unknown>, key: string) => Ternary;
```

It must return the result of comparing the type at the given key of the source
against the target dictionary's codomain.

The `addIntersectionMember` function can be used to add a type to the source
intersection, in case of a wrapped type like in a `t.ExactType`.


###### `InterfaceIntersectionHandler` (when the target is interface-like)

The signature of `t.InterfaceIntersectionHandler` is:

```typescript
type InterfaceIntersectionHandler<S extends TypeCtor, T extends TypeCtor> = (
	source: InstanceType<S>,
	targetKey: string | number,
	targetType: InstanceType<T>,
	isExtendedBy: IsExtendedBy,
	hasExtendingProp: HasExtendingProp,
) => Ternary;
```

The `source` and `isExtendedBy` parameters correspond to that of the `test`
function.

The `targetKey` parameter is the key of the target interface that is being
tested for compatibility with the source interface, `targetType` is its type.

`hasExtendingProp` is a function with the following signature:

```typescript
(
	source: t.Type<unknown>,
	targetKey: string | number,
	targetType: t.Type<unknown>,
) => Ternary
```

It may be used to test if some source type has a property that extends the
target type at the given key.


###### `PartialIntersectionHandler` (when the target is partial-like)

The signature of `t.PartialIntersectionHandler` is:

```typescript
type PartialIntersectionHandler<S extends TypeCtor, T extends TypeCtor> = (
	source: InstanceType<S>,
	targetKey: string | number,
	target: InstanceType<T>,
	isExtendedBy: IsExtendedBy,
	hasPartiallyExtendingProp: HasPartiallyExtendingProp,
) => Ternary | undefined;
```

It is basically identical to that of the `InterfaceIntersectionHandler`, except
that it must return `undefined` if the source type does not have the property at
the given key.


### Extra types

This package also provides a few extra types that are not present in `io-ts`;
`t.ClssType`, `t.GenericType`, `t.NullableType` and `t.PromiseType`.

I will not go into detail about these types here, but will make a few notes.

`t.ClssType` allows tying a static and instance interface to an implementation,
in order to build a type whose type and implementation can be easily extended.
To extend a `t.ClssType`, you can use the `t.extendClss()` helper.

`t.GenericType` allows defining a type that can be parameterized with other
types. Both the type parameters and return type of the generic type are objects
that wrap a function. The reason is that it allows for complex generics to be
defined while allowing TypeScript to infer most of what's going on. Somewhat
disappointedly it requires some redundent typing to put together a generic
type. If it is recursive in addition, it is far from elegant, but possible
nonetheless.

`t.NullableType` wraps its argument type in a union that includes `null`
and `undefined`.

`t.PromiseType` allows defining promises with some caveats: validation will
succeed for all promises, whereas decoding will always successfully return a
promise, throwing a `t.PromiseTypeError` if the value does not correspond to
the type. The `t.decode()` helper, returning a promise, can be used to decode a
promise, resolving with the decoded value if it is of the correct type, or
rejecting if it is not. By supplying rejection logic decoding of promises can
be handled in a more controlled manner.


### Other utilities


#### `t.render()`

Every type prototype has been extended with a `render` method that returns a
string representation of the type. `t.render()` will call this method on its
argument.


#### `t.ternarySome()` and `t.ternaryEvery()`

These are the ternary counterparts of `Array.prototype.some()` and
`Array.prototype.every()`.