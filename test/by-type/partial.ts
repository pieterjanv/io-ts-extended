import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.any,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.array(t.unknown),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.bigint,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.boolean,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		helpers.myClss,
		t.partial({ a: t.string }),
		true,
	],
	[
		t.record(t.string, t.string),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.exact(t.type({ a: t.string, c: t.boolean })),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.partial({ a: t.string }),
		false,
	],
	[
		t.type(helpers.emptyProps),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.type({ a: t.undefined }),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.type({ a: t.boolean }),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.type({ a: t.string }),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.type({ a: t.string, c: t.boolean }),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.intersection([t.type(helpers.emptyProps), t.type({ b: t.number })]),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.intersection([t.type({ a: t.string, b: t.unknown }), t.type({ b: t.number, c: t.boolean })]),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.intersection([t.type({ a: t.string, b: t.unknown }), t.partial({ b: t.number, c: t.boolean })]),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.intersection([helpers.v1, t.partial({ b: t.string })]),
		t.partial({ a: t.string, b: t.string}),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.literal('a'),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.never,
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.null,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.number,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.partial({ a: t.string, b: t.boolean }),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.partial({ a: t.string, c: t.boolean }),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.readonlyArray(t.string),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.readonly(t.type({ a: t.string })),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		helpers.v1,
		t.partial({ a: t.string, b: t.type({ a: t.string })}),
		true,
	],
	[
		helpers.v28,
		t.partial({ a: t.string, b: t.type({ a: t.string })}),
		true,
	],
	[
		helpers.v29,
		t.partial({ a: t.string, b: t.type({ a: t.string })}),
		false,
	],
	[
		helpers.v28,
		t.partial({ a: t.string }),
		true,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.string,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.undefined,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.partial({ a: t.string, b: t.number}),
		true,
	],
	[
		t.unknown,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.void,
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.nullable(t.partial({ a: t.string, b: t.number})),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
	[
		t.promise(t.partial({ a: t.string, b: t.number})),
		t.partial({ a: t.string, b: t.number}),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
