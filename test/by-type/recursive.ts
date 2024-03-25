import * as t from '#dist';
import { Brand, myClss } from '../helpers.js';

export default [
	[new t.AnyArrayType, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[new t.AnyDictionaryType, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.any, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.array(t.string), t.recursion('T', (self) => t.array(t.union([t.string, self]))), true],
	[t.array(t.array(t.array(t.string))), t.recursion('T', (self) => t.array(t.union([t.string, self]))), true],
	[t.array(t.unknown), t.recursion('T', (self) => t.array(t.union([t.string, self]))), false],
	[t.bigint, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.boolean, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[myClss, t.recursion('U', (self) => t.type({ a: t.string, d: self })), false],
	[t.record(t.string, t.string), t.recursion('T', (self) => t.record(t.string, t.union([self, t.string]))), true],
	[t.record(t.string, t.record(t.string, t.record(t.string, t.string))), t.recursion('T', (self) => t.record(t.string, t.union([self, t.string]))), true],
	[t.exact(t.type({ a: t.string })), t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.recursion('T', (self) => t.fn([['a', t.string], ['b', self]] as const, t.boolean)), t.recursion('U', (self) => t.fn([['a', t.string], ['b', self]] as const, t.boolean)), true],
	[t.recursion('T', (self) => t.fn([['a', t.string]] as const, t.boolean)), t.recursion('V', (self) => t.fn([['a', t.string], ['b', self]] as const, t.boolean)), true],
	[t.recursion('T', (self) => t.fn([['a', t.string], ['b', t.fn([['a', t.string]] as const, t.boolean)]] as const, t.boolean)), t.recursion('W', (self) => t.fn([['a', t.string], ['b', self]] as const, t.boolean)), true],
	[t.type({ a: t.string, b: t.type({ a: t.string, b: t.number }) }), t.recursion('T', (self) => t.type({ a: t.string, b: t.union([self, t.number]) })), true],
	[t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]), t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]), t.recursion('T', (self) => t.type({ a: t.string, b: t.union([self, t.number]) })), true],
	[t.keyof({ a: null, b: null }), t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.literal('a'), t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.never, t.recursion('T', (self) => t.type({ a: t.string, b: self })), true],
	[t.null, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.number, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.partial({ a: t.string }), t.recursion('T', (self) => t.partial({ a: t.string, b: self })), true],
	[t.partial({ a: t.string, b: t.type({ a: t.string, b: t.number }) }), t.recursion('T', (self) => t.partial({ a: t.string, b: t.union([self, t.number]) })), true],
	[t.readonlyArray(t.readonlyArray(t.readonlyArray(t.string))), t.recursion('T', (self) => t.readonlyArray(t.union([t.string, self]))), true],
	[t.readonly(t.recursion('T', (self) => t.type({ a: t.string, b: self }))), t.recursion('T', (self) => t.type({ a: t.string, b: self })), true],
	[t.readonly(t.recursion('T', (self) => t.tuple([t.string, self]))), t.recursion('T', (self) => t.tuple([t.string, self])), false],
	[t.readonly(t.type({ a: t.string })), t.recursion('T', (self) => t.type({ a: t.string, b: t.union([self, t.type({ a: t.string })]) })), false],
	[t.recursion('T', (self) => t.type({ a: t.string, b: self })), t.recursion('T', (self) => t.type({ a: t.string, b: self })), true],
	[t.brand(t.type({ a: t.string, b: t.type({ a: t.string }) }), (x): x is t.Branded<{ a: string, b: { a: string }}, Brand> => true, 'Brand'), t.recursion('T', (self) => t.type({ a: t.string, b: t.union([self, t.type({ a: t.string })]) })), true],
	[t.string, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.tuple([t.tuple([t.tuple([t.string, t.string]), t.string]), t.string]), t.recursion('T', (self) => t.tuple([t.union([self, t.string]), t.string])), true],
	[t.tuple([t.tuple([t.tuple([t.string, t.number]), t.string]), t.string]), t.recursion('T', (self) => t.tuple([t.union([self, t.string]), t.string])), false],
	[t.undefined, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.union([t.type({ a: t.string }), t.never]), t.recursion('T', (self) => t.type({ a: t.string })), true],
	[t.unknown, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.void, t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.nullable(t.recursion('T', (self) => t.type({ a: t.string, b: self }))), t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
	[t.promise(t.recursion('T', (self) => t.type({ a: t.string, b: self }))), t.recursion('T', (self) => t.type({ a: t.string, b: self })), false],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
