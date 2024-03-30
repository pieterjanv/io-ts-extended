import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.string,
		false,
	],
	[
		new t.AnyDictionaryType,
		t.string,
		false,
	],
	[
		t.any,
		t.string,
		false,
	],
	[
		t.array(t.unknown),
		t.string,
		false,
	],
	[
		t.bigint,
		t.string,
		false,
	],
	[
		t.boolean,
		t.string,
		false,
	],
	[
		helpers.myClss,
		t.string,
		false,
	],
	[
		t.record(t.string, t.string),
		t.string,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.string,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.string,
		false,
	],
	[
		t.type({ a: t.string }),
		t.string,
		false,
	],
	[
		t.intersection([t.string, t.unknown]),
		t.string,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.string,
		true,
	],
	[
		t.literal('a'),
		t.string,
		true,
	],
	[
		t.never,
		t.string,
		true,
	],
	[
		t.null,
		t.string,
		false,
	],
	[
		t.number,
		t.string,
		false,
	],
	[
		t.partial({ a: t.string }),
		t.string,
		false,
	],
	[
		t.readonlyArray(t.string),
		t.string,
		false,
	],
	[
		t.readonly(t.string),
		t.string,
		true,
	],
	[
		helpers.v1,
		t.string,
		false,
	],
	[
		t.brand(t.string, (x): x is t.Branded<string, helpers.Brand> => true, 'Brand'),
		t.string,
		true,
	],
	[
		t.string,
		t.string,
		true,
	],
	[
		t.tuple([t.string, t.number]),
		t.string,
		false,
	],
	[
		t.undefined,
		t.string,
		false,
	],
	[
		t.union([t.literal('s'), t.string]),
		t.string,
		true,
	],
	[
		t.union([t.literal('s'), t.number]),
		t.string,
		false,
	],
	[
		t.unknown,
		t.string,
		false,
	],
	[
		t.void,
		t.string,
		false,
	],
	[
		t.nullable(t.string),
		t.string,
		false,
	],
	[
		t.promise(t.string),
		t.string,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
