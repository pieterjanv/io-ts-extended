import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.any,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.array(t.unknown),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.bigint,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.boolean,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		helpers.myClss,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.record(t.string, t.string),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.type({ a: t.string }),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.keyof({ a: null, b: null }),
		true,
	],
	[
		t.keyof({ a: null }),
		t.keyof({ a: null, b: null }),
		true,
	],
	[
		t.literal('a'),
		t.keyof({ a: null, b: null }),
		true,
	],
	[
		t.literal(1),
		t.keyof({ 1: null, b: null }),
		true,
	],
	[
		t.never,
		t.keyof({ a: null, b: null }),
		true,
	],
	[
		t.null,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.number,
		t.keyof({ 1: 'foo'}),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.readonly(t.literal('a')),
		t.keyof({ a: null, b: null }),
		true,
	],
	[
		helpers.v1,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.brand(t.keyof({ a: null, b: null }), (x): x is t.Branded<keyof { a: null, b: null }, helpers.Brand> => true, 'Brand'),
		t.keyof({ a: null, b: null }),
		true,
	],
	[
		t.string,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.undefined,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.union([t.literal('a'), t.literal('b')]),
		t.keyof({ a: null, b: null }),
		true,
	],
	[
		t.union([t.literal('a'), t.literal('b'), t.literal('c')]),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.unknown,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.void,
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.nullable(t.keyof({ a: null, b: null })),
		t.keyof({ a: null, b: null }),
		false,
	],
	[
		t.promise(t.keyof({ a: null, b: null })),
		t.keyof({ a: null, b: null }),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
