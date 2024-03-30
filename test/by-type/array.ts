import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.array(t.string),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.array(t.string),
		false,
	],
	[
		t.any,
		t.array(t.string),
		false,
	],
	[
		t.array(t.unknown),
		t.array(t.string),
		false,
	],
	[
		t.array(t.literal('s')),
		t.array(t.string),
		true,
	],
	[
		t.bigint,
		t.array(t.string),
		false,
	],
	[
		t.boolean,
		t.array(t.string),
		false,
	],
	[
		helpers.myClss,
		t.array(t.string),
		false,
	],
	[
		t.record(t.string, t.string),
		t.array(t.string),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.array(t.string),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.array(t.string),
		false,
	],
	[
		t.type({ a: t.string }),
		t.array(t.string),
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.array(t.string),
		false,
	],
	[
		t.intersection([t.array(t.literal('s')), t.array(t.string)]),
		t.array(t.string),
		true,
	],
	[
		t.intersection([t.array(t.string), t.readonlyArray(t.string)]),
		t.array(t.string),
		true,
	],
	[
		t.intersection([t.array(t.number), t.tuple([t.string])]),
		t.array(t.unknown),
		true,
	],
	[
		t.intersection([t.array(t.number), t.tuple([t.string])]),
		t.array(t.string),
		true,
	],
	[
		t.intersection([t.array(t.number), t.tuple([t.string])]),
		t.array(t.boolean),
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.array(t.string),
		false,
	],
	[
		t.literal('a'),
		t.array(t.string),
		false,
	],
	[
		t.never,
		t.array(t.string),
		true,
	],
	[
		t.null,
		t.array(t.string),
		false,
	],
	[
		t.number,
		t.array(t.string),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.array(t.string),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.array(t.string),
		false,
	],
	[
		t.readonly(t.type({ a: t.string })),
		t.array(t.string),
		false,
	],
	[
		t.readonly(t.array(t.string)),
		t.array(t.string),
		false,
	],
	[
		helpers.v3,
		t.array(t.string),
		false,
	],
	[
		t.brand(t.array(t.string),
		(x): x is t.Branded<string[], helpers.Brand> => true, 'Brand'), t.array(t.string),
		true,
	],
	[
		t.string,
		t.array(t.string),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.array(t.string),
		false,
	],
	[
		t.tuple([t.string]),
		t.array(t.string),
		true,
	],
	[
		t.undefined,
		t.array(t.string),
		false,
	],
	[
		t.union([t.array(t.string), t.array(t.number)]),
		t.array(t.string),
		false,
	],
	[
		t.union([t.array(t.string), t.readonlyArray(t.string)]),
		t.array(t.string),
		false,
	],
	[
		t.unknown,
		t.array(t.string),
		false,
	],
	[
		t.void,
		t.array(t.string),
		false,
	],
	[
		t.nullable(t.array(t.string)),
		t.array(t.string),
		false,
	],
	[
		t.promise(t.array(t.string)),
		t.array(t.string),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];