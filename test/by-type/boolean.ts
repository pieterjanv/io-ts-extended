import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.boolean,
		false,
	],
	[
		new t.AnyDictionaryType,
		t.boolean,
		false,
	],
	[
		t.any,
		t.boolean,
		false,
	],
	[
		t.array(t.unknown),
		t.boolean,
		false,
	],
	[
		t.bigint,
		t.boolean,
		false,
	],
	[
		t.boolean,
		t.boolean,
		true,
	],
	[
		helpers.myClss,
		t.boolean,
		false,
	],
	[
		t.record(t.string, t.string),
		t.boolean,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.boolean,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.boolean,
		false,
	],
	[
		t.type({ a: t.string }),
		t.boolean,
		false,
	],
	[
		t.intersection([t.boolean, t.literal(false)]),
		t.boolean,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.boolean,
		false,
	],
	[
		t.literal(true),
		t.boolean,
		true,
	],
	[
		t.never,
		t.boolean,
		true,
	],
	[
		t.null,
		t.boolean,
		false,
	],
	[
		t.number,
		t.boolean,
		false,
	],
	[
		t.partial({ a: t.string }),
		t.boolean,
		false,
	],
	[
		t.readonlyArray(t.string),
		t.boolean,
		false,
	],
	[
		t.readonly(t.boolean),
		t.boolean,
		true,
	],
	[
		helpers.v1,
		t.boolean,
		false,
	],
	[
		t.brand(t.boolean, (x): x is t.Branded<boolean, helpers.Brand> => true, 'Brand'),
		t.boolean,
		true,
	],
	[
		t.string,
		t.boolean,
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.boolean,
		false,
	],
	[
		t.undefined,
		t.boolean,
		false,
	],
	[
		t.union([t.boolean, t.literal(false)]),
		t.boolean,
		true,
	],
	[
		t.unknown,
		t.boolean,
		false,
	],
	[
		t.void,
		t.boolean,
		false,
	],
	[
		t.nullable(t.boolean),
		t.boolean,
		false,
	],
	[
		t.promise(t.boolean),
		t.boolean,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];