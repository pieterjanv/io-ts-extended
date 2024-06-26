import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.bigint,
		false,
	],
	[
		new t.AnyDictionaryType,
		t.bigint,
		false,
	],
	[
		t.any,
		t.bigint,
		false,
	],
	[
		t.array(t.unknown),
		t.bigint,
		false,
	],
	[
		t.array(t.literal('s')),
		t.bigint,
		false,
	],
	[
		t.bigint,
		t.bigint,
		true,
	],
	[
		t.boolean,
		t.bigint,
		false,
	],
	[
		helpers.myClss,
		t.bigint,
		false,
	],
	[
		t.record(t.string, t.string),
		t.bigint,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.bigint,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.bigint,
		false,
	],
	[
		t.type({ a: t.string }),
		t.bigint,
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.bigint,
		false,
	],
	[
		t.intersection([t.bigint, t.never]),
		t.bigint,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.bigint,
		false,
	],
	[
		t.literal('a'),
		t.bigint,
		false,
	],
	[
		t.never,
		t.bigint,
		true,
	],
	[
		t.null,
		t.bigint,
		false,
	],
	[
		t.number,
		t.bigint,
		false,
	],
	[
		t.partial({ a: t.string }),
		t.bigint,
		false,
	],
	[
		t.readonlyArray(t.string),
		t.bigint,
		false,
	],
	[
		t.readonly(t.bigint),
		t.bigint,
		true,
	],
	[
		helpers.v3,
		t.bigint,
		false,
	],
	[
		t.brand(t.bigint, (x): x is t.Branded<bigint, helpers.Brand> => true, 'Brand'),
		t.bigint,
		true,
	],
	[
		t.string,
		t.bigint,
		false,
	],
	[
		t.tuple([t.string,
		t.number]),
		t.bigint, false,
	],
	[
		t.tuple([t.string]),
		t.bigint,
		false,
	],
	[
		t.undefined,
		t.bigint,
		false,
	],
	[
		t.union([t.bigint, t.never]),
		t.bigint,
		true,
	],
	[
		t.unknown,
		t.bigint,
		false,
	],
	[
		t.void,
		t.bigint,
		false,
	],
	[
		t.nullable(t.bigint),
		t.bigint,
		false,
	],
	[
		t.promise(t.bigint),
		t.bigint,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];