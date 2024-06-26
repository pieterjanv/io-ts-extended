import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.record(t.string, t.string),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.record(t.string, t.unknown),
		true,
	],
	[
		new t.AnyDictionaryType,
		t.record(t.number, t.unknown),
		true,
	],
	[
		new t.AnyDictionaryType,
		t.record(t.string, t.string),
		false,
	],
	[
		t.any,
		t.record(t.string, t.string),
		false,
	],
	[
		t.array(t.unknown),
		t.record(t.string, t.string),
		false,
	],
	[
		t.bigint,
		t.record(t.string, t.string),
		false,
	],
	[
		t.boolean,
		t.record(t.string, t.string),
		false,
	],
	[
		helpers.myClss,
		t.record(t.string, t.unknown),
		true,
	],
	[
		t.record(t.string, t.string),
		t.record(t.string, t.string),
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.record(t.string, t.string),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.record(t.string, t.string),
		false,
	],
	[
		t.type({ a: t.string }),
		t.record(t.string, t.string),
		true,
	],
	[
		t.type({ a: t.number }),
		t.record(t.string, t.string),
		false,
	],
	[
		t.type({ a : t.string }),
		t.record(t.string, t.union([t.string, t.number])),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.record(t.string, t.string),
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.record(t.string, t.union([t.string, t.number])),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]), 
		t.record(t.string, t.union([t.intersection([t.string, t.union([t.never, t.unknown])]), t.number])),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.record(t.string, t.union([t.intersection([t.string, t.union([t.never, t.boolean])]), t.number])),
		false,
	],
	[
		t.intersection([t.record(t.string, t.string), t.partial({ a: t.string }), t.type({ a: t.literal('s') })]),
		t.record(t.string, t.string),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.record(t.string, t.string),
		false,
	],
	[
		t.literal('a'),
		t.record(t.string, t.string),
		false,
	],
	[
		t.never,
		t.record(t.string, t.string),
		true,
	],
	[
		t.null,
		t.record(t.string, t.string),
		false,
	],
	[
		t.number,
		t.record(t.string, t.string),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.record(t.string, t.string),
		true,
	],
	[
		t.readonlyArray(t.string),
		t.record(t.string, t.string),
		false,
	],
	[
		t.readonly(t.type({ a: t.string })),
		t.record(t.string, t.string),
		true,
	],
	[
		helpers.v1,
		t.record(t.string, t.string),
		false,
	],
	[
		t.brand(t.record(t.string, t.string),
		(x): x is t.Branded<Record<string, string>, helpers.Brand> => true, 'Brand'), t.record(t.string, t.string),
		true,
	],
	[
		t.string,
		t.record(t.string, t.string),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.record(t.string, t.string),
		false,
	],
	[
		t.undefined,
		t.record(t.string, t.string),
		false,
	],
	[
		t.union([t.type({ a: t.string }),
			t.type({ b: t.number })]), t.record(t.string, t.string),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.record(t.string, t.union([t.string, t.number])),
		true,
	],
	[
		t.unknown,
		t.record(t.string, t.string),
		false,
	],
	[
		t.void,
		t.record(t.string, t.string),
		false,
	],
	[
		t.intersection([t.type({ a: t.literal('s') }), t.type({ b: t.literal(5) }), t.union([t.record(t.string, t.literal('s')), t.type({ b: t.number })])]),
		t.record(t.string, t.union([t.literal('s'), t.literal(5)])),
		true,
	],
	[
		t.nullable(t.record(t.string, t.string)),
		t.record(t.string, t.string),
		false,
	],
	[
		t.promise(t.record(t.string, t.string)),
		t.record(t.string, t.string),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];