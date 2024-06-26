import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.undefined,
		false,
	],
	[
		new t.AnyDictionaryType,
		t.undefined,
		false,
	],
	[
		t.any,
		t.undefined,
		false,
	],
	[
		t.array(t.unknown),
		t.undefined,
		false,
	],
	[
		t.bigint,
		t.undefined,
		false,
	],
	[
		t.boolean,
		t.undefined,
		false,
	],
	[
		helpers.myClss,
		t.undefined,
		false,
	],
	[
		t.record(t.string, t.string),
		t.undefined,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.undefined,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.undefined,
		false,
	],
	[
		t.type({ a: t.string }),
		t.undefined,
		false,
	],
	[
		t.intersection([t.undefined, t.unknown]),
		t.undefined,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.undefined,
		false,
	],
	[
		t.literal('a'),
		t.undefined,
		false,
	],
	[
		t.never,
		t.undefined,
		true,
	],
	[
		t.null,
		t.undefined,
		false,
	],
	[
		t.number,
		t.undefined,
		false,
	],
	[
		t.partial({ a: t.string }),
		t.undefined,
		false,
	],
	[
		t.readonlyArray(t.string),
		t.undefined,
		false,
	],
	[
		t.readonly(t.undefined),
		t.undefined,
		true,
	],
	[
		helpers.v1,
		t.undefined,
		false,
	],
	[
		t.brand(t.undefined, (x): x is t.Branded<undefined, helpers.Brand> => true, 'Brand'),
		t.undefined,
		true,
	],
	[
		t.string,
		t.undefined,
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.undefined,
		false,
	],
	[
		t.undefined,
		t.undefined,
		true,
	],
	[
		t.union([t.never, t.undefined]),
		t.undefined,
		true,
	],
	[
		t.unknown,
		t.undefined,
		false,
	],
	[
		t.void,
		t.undefined,
		false,
	],
	[
		t.nullable(t.undefined),
		t.undefined,
		false,
	],
	[
		t.promise(t.undefined),
		t.undefined,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
