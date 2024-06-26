import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.null,
		false,
	],
	[
		new t.AnyDictionaryType,
		t.null,
		false,
	],
	[
		t.any,
		t.null,
		false,
	],
	[
		t.array(t.unknown),
		t.null,
		false,
	],
	[
		t.bigint,
		t.null,
		false,
	],
	[
		t.boolean,
		t.null,
		false,
	],
	[
		helpers.myClss,
		t.null,
		false,
	],
	[
		t.record(t.string, t.string),
		t.null,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.null,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.null,
		false,
	],
	[
		t.type({ a: t.string }),
		t.null,
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.null,
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.null,
		false,
	],
	[
		t.literal('a'),
		t.null,
		false,
	],
	[
		t.never,
		t.null,
		true,
	],
	[
		t.null,
		t.null,
		true,
	],
	[
		t.number,
		t.null,
		false,
	],
	[
		t.partial({ a: t.string }),
		t.null,
		false,
	],
	[
		t.readonlyArray(t.string),
		t.null,
		false,
	],
	[
		t.readonly(t.null),
		t.null,
		true,
	],
	[
		helpers.v1,
		t.null,
		false,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		t.null,
		false,
	],
	[
		t.string,
		t.null,
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.null,
		false,
	],
	[
		t.undefined,
		t.null,
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.null,
		false,
	],
	[
		t.unknown,
		t.null,
		false,
	],
	[
		t.void,
		t.null,
		false,
	],
	[
		t.nullable(t.null),
		t.null,
		false,
	],
	[
		t.promise(t.null),
		t.null,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
