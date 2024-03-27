import * as t from '#dist';
import { Brand, myClss } from '../helpers.js';

export default [
	[
		new t.AnyArrayType,
		t.union([t.never, new t.AnyArrayType]),
		true,
	],
	[
		new t.AnyDictionaryType,
		t.union([t.never, new t.AnyDictionaryType]),
		true,
	],
	[
		t.any,
		t.union([t.never, t.any]),
		true,
	],
	[
		t.array(t.unknown),
		t.union([t.never, new t.AnyArrayType]),
		true,
	],
	[
		t.bigint,
		t.union([t.never, t.bigint]),
		true,
	],
	[
		t.boolean,
		t.union([t.never, t.boolean]),
		true,
	],
	[
		myClss,
		t.union([myClss, t.never]),
		true,
	],
	[
		t.record(t.string, t.string),
		t.union([t.never, t.record(t.string, t.string)]),
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.union([t.never, t.type({ a: t.string })]),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.union([t.fn([['a', t.string]] as const, t.boolean), t.fn([['a', t.string]] as const, t.boolean)]),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.union([t.fn([['a', t.string]] as const, t.boolean), t.fn([['a', t.literal('s')]] as const, t.boolean)]),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.union([t.fn([['a', t.string]] as const, t.boolean), t.fn([['a', t.unknown]] as const, t.boolean)]),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.union([t.fn([['a', t.unknown]] as const, t.boolean), t.fn([['a', t.unknown]] as const, t.boolean)]),
		true,
	],
	[
		t.type({ a: t.string, b: t.number }),
		t.union([t.type({ a: t.never, b: t.number }), t.type({ a: t.string, b: t.never })]),
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.union([t.type({ a: t.never, b: t.number }), t.type({ a: t.string, b: t.never })]),
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.union([t.never, t.literal('a'), t.literal('b')]),
		true,
	],
	[
		t.keyof({ a: null, b: null, c: null }),
		t.union([t.never, t.literal('a'), t.literal('b')]),
		false,
	],
	[
		t.literal('a'),
		t.union([t.never, t.literal('a')]),
		true,
	],
	[
		t.never,
		t.union([t.never, t.never]),
		true,
	],
	[
		t.null,
		t.union([t.never, t.null]),
		true,
	],
	[
		t.number,
		t.union([t.never, t.number]),
		true,
	],
	[
		t.partial({ a: t.string }),
		t.union([t.partial({ a: t.never, b: t.number }), t.partial({ a: t.string, b: t.never })]),
		true,
	],
	[
		t.partial({ a: t.string, b: t.boolean }),
		t.union([t.partial({ a: t.never, b: t.number }), t.partial({ a: t.string, b: t.never })]),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.union([t.never, t.readonlyArray(t.string)]),
		true,
	],
	[
		t.readonly(t.type({ a: t.string })),
		t.union([t.never, t.readonly(t.type({ a: t.string }))]),
		true,
	],
	[
		t.recursion('T', (self) => t.type({ a: t.string, b: self })),
		t.union([t.never, t.type({ a: t.string, b: t.type({ a: t.string }) })]),
		true,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand'),
		t.union([t.never, t.number]),
		true,
	],
	[
		t.string,
		t.union([t.never, t.string]),
		true,
	],
	[
		t.tuple([t.string, t.number]),
		t.union([t.tuple([t.never, t.number]), t.tuple([t.string, t.never])]),
		false,
	],
	[
		t.undefined,
		t.union([t.never, t.undefined]),
		true,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		true,
	],
	[
		t.unknown,
		t.union([t.never, t.unknown]),
		true,
	],
	[
		t.void,
		t.union([t.never, t.void]),
		true,
	],
	[
		t.nullable(t.union([t.never, t.string])),
		t.union([t.never, t.string]),
		false,
	],
	[
		t.nullable(t.union([t.never, t.string])),
		t.union([t.never, t.string, t.null, t.undefined]),
		true,
	],
	[
		t.promise(t.union([t.never, t.string])),
		t.union([t.never, t.string]),
		false,
	],
	[
		t.promise(t.string),
		t.union([t.promise(t.string), t.string]),
		true,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
