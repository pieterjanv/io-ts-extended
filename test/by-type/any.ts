import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.any,
		true
	],
	[
		new t.AnyDictionaryType,
		t.any,
		true,
	],
	[
		t.any,
		t.any,
		true,
	],
	[
		t.array(t.unknown),
		t.any,
		true,
	],
	[
		t.bigint,
		t.any,
		true,
	],
	[
		t.boolean,
		t.any,
		true,
	],
	[
		helpers.myClss,
		t.any,
		true,
	],
	[
		t.record(t.string, t.string),
		t.any,
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.any,
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.any,
		true,
	],
	[
		t.type({ a: t.string }),
		t.any,
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.any,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.any,
		true,
	],
	[
		t.literal('a'),
		t.any,
		true,
	],
	[
		t.never,
		t.any,
		true,
	],
	[
		t.null,
		t.any,
		true,
	],
	[
		t.number,
		t.any,
		true,
	],
	[
		t.partial({ a: t.string }),
		t.any,
		true,
	],
	[
		t.readonlyArray(t.string),
		t.any,
		true,
	],
	[
		t.readonly(t.type({ a: t.string })),
		t.any,
		true,
	],
	[
		helpers.v1,
		t.any,
		true,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		t.any,
		true,
	],
	[
		t.string,
		t.any,
		true,
	],
	[
		t.tuple([t.string, t.number]),
		t.any,
		true,
	],
	[
		t.undefined,
		t.any,
		true,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.any,
		true,
	],
	[
		t.unknown,
		t.any,
		true,
	],
	[
		t.void,
		t.any,
		true,
	],
	[
		t.nullable(t.any),
		t.any,
		true,
	],
	[
		t.promise(t.any),
		t.any,
		true,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];