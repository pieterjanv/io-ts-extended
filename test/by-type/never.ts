import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.never,
		false,
	],
	[
		new t.AnyDictionaryType,
		t.never,
		false,
	],
	[
		t.any,
		t.never,
		false,
	],
	[
		t.array(t.unknown),
		t.never,
		false,
	],
	[
		t.bigint,
		t.never,
		false,
	],
	[
		helpers.myClss,
		t.never,
		false,
	],
	[
		t.boolean,
		t.never,
		false,
	],
	[
		t.record(t.string, t.string),
		t.never,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.never,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.never,
		false,
	],
	[
		t.type({ a: t.string }),
		t.never,
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.never,
		false,
	],
	[
		t.intersection([t.string, t.number]),
		t.never,
		true,
	],
	[
		t.intersection([t.array(t.string), t.array(t.number)]),
		t.never,
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.union([t.type({a: t.number}), t.type({b: t.string})])]),
		t.never,
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.never,
		false,
	],
	[
		t.literal('a'),
		t.never,
		false,
	],
	[
		t.never,
		t.never,
		true,
	],
	[
		t.null,
		t.never,
		false,
	],
	[
		t.number,
		t.never,
		false,
	],
	[
		t.partial({ a: t.string }),
		t.never,
		false,
	],
	[
		t.readonlyArray(t.string),
		t.never,
		false,
	],
	[
		t.readonly(t.never),
		t.never,
		true,
	],
	[
		helpers.v1,
		t.never,
		false,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		t.never,
		false,
	],
	[
		t.string,
		t.never,
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.never,
		false,
	],
	[
		t.undefined,
		t.never,
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.never,
		false,
	],
	[
		t.union([t.never, t.never]),
		t.never,
		true,
	],
	[
		t.unknown,
		t.never,
		false,
	],
	[
		t.void,
		t.never,
		false,
	],
	[
		t.nullable(t.never),
		t.never,
		false,
	],
	[
		t.promise(t.never),
		t.never,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
