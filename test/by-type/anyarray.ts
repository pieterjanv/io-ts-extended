import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		new t.AnyArrayType,
		true,
	],
	[
		new t.AnyDictionaryType,
		new t.AnyArrayType,
		false,
	],
	[
		t.any,
		new t.AnyArrayType,
		false,
	],
	[
		t.array(t.unknown),
		new t.AnyArrayType,
		true,
	],
	[
		t.bigint,
		new t.AnyArrayType,
		false,
	],
	[
		t.boolean,
		new t.AnyArrayType,
		false,
	],
	[
		helpers.myClss,
		new t.AnyArrayType,
		false,
	],
	[
		t.record(t.string, t.string),
		new t.AnyArrayType,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		new t.AnyArrayType,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		new t.AnyArrayType,
		false,
	],
	[
		t.type({ a: t.string }),
		new t.AnyArrayType,
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		new t.AnyArrayType,
		false,
	],
	[
		t.intersection([t.array(t.number), t.tuple([t.string])]),
		new t.AnyArrayType,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		new t.AnyArrayType,
		false,
	],
	[
		t.literal('a'),
		new t.AnyArrayType,
		false,
	],
	[
		t.never,
		new t.AnyArrayType,
		true,
	],
	[
		t.null,
		new t.AnyArrayType,
		false,
	],
	[
		t.number,
		new t.AnyArrayType,
		false,
	],
	[
		t.partial({ a: t.string }),
		new t.AnyArrayType,
		false,
	],
	[
		t.readonlyArray(t.string),
		new t.AnyArrayType,
		false,
	],
	[
		t.readonly(t.tuple([t.string, t.number])),
		new t.AnyArrayType,
		false,
	],
	[
		helpers.v24,
		new t.AnyArrayType,
		true,
	],
	[
		t.brand(new t.AnyArrayType, (x): x is t.Branded<unknown[], helpers.Brand> => true, 'Brand'),
		new t.AnyArrayType,
		true,
	],
	[
		t.string,
		new t.AnyArrayType,
		false,
	],
	[
		t.tuple([t.string, t.number]),
		new t.AnyArrayType,
		true,
	],
	[
		t.undefined,
		new t.AnyArrayType,
		false,
	],
	[
		t.union([t.array(t.string), t.array(t.number)]),
		new t.AnyArrayType,
		true,
	],
	[
		t.unknown,
		new t.AnyArrayType,
		false,
	],
	[
		t.void,
		new t.AnyArrayType,
		false,
	],
	[
		t.nullable(new t.AnyArrayType),
		new t.AnyArrayType,
		false,
	],
	[
		t.promise(new t.AnyArrayType),
		new t.AnyArrayType,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
