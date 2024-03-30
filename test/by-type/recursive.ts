import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		helpers.v1,
		false,
	],
	[
		new t.AnyDictionaryType,
		helpers.v1,
		false,
	],
	[
		t.any,
		helpers.v1,
		false,
	],
	[
		t.array(t.string),
		helpers.v3,
		true,
	],
	[
		t.array(t.array(t.array(t.string))),
		helpers.v3,
		true,
	],
	[
		t.array(t.unknown),
		helpers.v3,
		false,
	],
	[
		t.bigint,
		helpers.v1,
		false,
	],
	[
		t.boolean,
		helpers.v1,
		false,
	],
	[
		helpers.myClss,
		helpers.v2,
		false,
	],
	[
		t.record(t.string, t.string),
		helpers.v4,
		true,
	],
	[
		t.record(t.string, t.record(t.string, t.record(t.string, t.string))),
		helpers.v4,
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		helpers.v1,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		helpers.v6,
		true,
	],
	[
		helpers.v6,
		helpers.v6,
		true,
	],
	[
		helpers.v7,
		helpers.v6,
		true,
	],
	[
		t.type({ a: t.string, b: t.type({ a: t.string, b: t.number }) }),
		helpers.v9,
		true,
	],
	[
		t.type({ a: t.string, b: t.type({ a: t.string, b: t.number }) }),
		helpers.v1,
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		helpers.v1,
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		helpers.v9,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		helpers.v1,
		false,
	],
	[
		t.literal('a'),
		helpers.v1,
		false,
	],
	[
		t.never,
		helpers.v1,
		true,
	],
	[
		t.null,
		helpers.v1,
		false,
	],
	[
		t.number,
		helpers.v1,
		false,
	],
	[
		t.partial({ a: t.string }),
		helpers.v10,
		true,
	],
	[
		t.partial({ a: t.string, b: t.type({ a: t.string, b: t.number }) }),
		helpers.v11,
		true,
	],
	[
		t.readonlyArray(t.readonlyArray(t.readonlyArray(t.string))),
		helpers.v12,
		true,
	],
	[
		helpers.v13,
		helpers.v1,
		true,
	],
	[
		helpers.v14,
		helpers.v15,
		false,
	],
	[
		t.readonly(t.type({ a: t.string })),
		helpers.v16,
		false,
	],
	[
		helpers.v1,
		helpers.v1,
		true,
	],
	[
		helpers.v12,
		helpers.v17,
		true,
	],
	[
		helpers.v18,
		helpers.v19,
		true,
	],
	[
		t.brand(t.type({ a: t.string, b: t.type({ a: t.string }) }), (x): x is t.Branded<{ a: string, b: { a: string }}, helpers.Brand> => true, 'Brand'),
		helpers.v16,
		true,
	],
	[
		t.string,
		helpers.v1,
		false,
	],
	[
		t.tuple([t.tuple([t.tuple([t.string, t.string]), t.string]), t.string]),
		helpers.v20,
		true,
	],
	[
		t.tuple([t.tuple([t.tuple([t.string, t.number]), t.string]), t.string]),
		helpers.v20,
		false,
	],
	[
		t.undefined,
		helpers.v1,
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.never]),
		helpers.v21,
		true,
	],
	[
		t.unknown,
		helpers.v1,
		false,
	],
	[
		t.void,
		helpers.v1,
		false,
	],
	[
		helpers.v22,
		helpers.v1,
		false,
	],
	[
		helpers.v23,
		helpers.v1,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
