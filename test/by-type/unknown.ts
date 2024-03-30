import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.unknown,
		true,
	],
	[
		new t.AnyDictionaryType,
		t.unknown,
		true,
	],
	[
		t.any,
		t.unknown,
		true,
	],
	[
		t.array(t.unknown),
		t.unknown,
		true,
	],
	[
		t.bigint,
		t.unknown,
		true,
	],
	[
		t.boolean,
		t.unknown,
		true,
	],
	[
		helpers.myClss,
		t.unknown,
		true,
	],
	[
		helpers.myClss,
		t.union([helpers.myClss, t.unknown]),
		true,
	],
	[
		t.record(t.string, t.string),
		t.unknown,
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.unknown,
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.unknown,
		true,
	],
	[
		t.type({ a: t.string }),
		t.unknown,
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.unknown,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.unknown,
		true,
	],
	[
		t.literal('a'),
		t.unknown,
		true,
	],
	[
		t.never,
		t.unknown,
		true,
	],
	[
		t.null,
		t.unknown,
		true,
	],
	[
		t.number,
		t.unknown,
		true,
	],
	[
		t.partial({ a: t.string }),
		t.unknown,
		true,
	],
	[
		t.readonlyArray(t.string),
		t.unknown,
		true,
	],
	[
		t.readonly(t.type({ a: t.string })),
		t.unknown,
		true,
	],
	[
		helpers.v1,
		t.unknown,
		true,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		t.unknown,
		true,
	],
	[
		t.string,
		t.unknown,
		true,
	],
	[
		t.tuple([t.string, t.number]),
		t.unknown,
		true,
	],
	[
		t.undefined,
		t.unknown,
		true,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.unknown,
		true,
	],
	[
		t.unknown,
		t.unknown,
		true,
	],
	[
		t.void,
		t.unknown,
		true,
	],
	[
		t.nullable(t.unknown),
		t.unknown,
		true,
	],
	[
		t.promise(t.unknown),
		t.unknown,
		true,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
