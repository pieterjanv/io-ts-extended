import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.readonlyArray(t.string),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.any,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.array(t.unknown),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.array(t.string),
		t.readonlyArray(t.string),
		true,
	],
	[
		t.bigint,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.boolean,
		t.readonlyArray(t.string),
		false,
	],
	[
		helpers.myClss,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.record(t.string, t.string),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.type({ a: t.string }),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.intersection([t.array(t.unknown), t.array(t.string)]),
		t.readonlyArray(t.string),
		true,
	],
	[
		t.intersection([t.array(t.unknown), t.readonlyArray(t.string)]),
		t.readonlyArray(t.string),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.literal('a'),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.never,
		t.readonlyArray(t.string),
		true,
	],
	[
		t.null,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.number,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.readonlyArray(t.string),
		true,
	],
	[
		t.readonlyArray(t.number),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.readonly(t.array(t.string)),
		t.readonlyArray(t.string),
		true,
	],
	[
		helpers.v1,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.string,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.tuple([t.string, t.string]),
		t.readonlyArray(t.string),
		true,
	],
	[
		t.undefined,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.union([t.array(t.string), t.readonlyArray(t.string), t.tuple([t.string, t.literal('s')])]),
		t.readonlyArray(t.string),
		true,
	],
	[
		t.unknown,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.void,
		t.readonlyArray(t.string),
		false,
	],
	[
		t.nullable(t.readonlyArray(t.string)),
		t.readonlyArray(t.string),
		false,
	],
	[
		t.promise(t.readonlyArray(t.string)),
		t.readonlyArray(t.string),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
