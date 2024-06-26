import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.any,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.array(t.unknown),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.bigint,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.boolean,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		helpers.myClss,
		t.exact(t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean })),
		true,
	],
	[
		t.record(t.string, t.string),
		t.exact(t.type(helpers.emptyProps)),
		true,
	],
	[
		t.record(t.string, t.string),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.exact(t.type({ a: t.string })),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.type({ a: t.string }),
		t.exact(t.type({ a: t.string })),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.exact(t.type({ a: t.string })),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.exact(t.type({ a: t.string, b: t.number })),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.literal('a'),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.never,
		t.exact(t.type({ a: t.string })),
		true,
	],
	[
		t.null,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.number,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.partial(helpers.emptyProps),
		t.exact(t.type(helpers.emptyProps)),
		true,
	],
	[
		t.readonlyArray(t.string),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.readonly(t.type({ a: t.string })),
		t.exact(t.type({ a: t.string })),
		true,
	],
	[
		helpers.v1,
		t.exact(t.type({ a: t.string })),
		true,
	],
	[
		t.brand(t.type({a: t.string}), (x): x is t.Branded<{a: string}, helpers.Brand> => true, 'Brand'),
		t.exact(t.type({ a: t.string })),
		true,
	],
	[
		t.string,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.undefined,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ a: t.number })]),
		t.exact(t.type({ a: t.union([t.string, t.number]) })),
		true,
	],
	[
		t.unknown,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.void,
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.nullable(t.exact(t.type({ a: t.string }))),
		t.exact(t.type({ a: t.string })),
		false,
	],
	[
		t.promise(t.exact(t.type({ a: t.string }))),
		t.exact(t.type({ a: t.string })),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];