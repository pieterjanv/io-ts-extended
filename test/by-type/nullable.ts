import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.nullable(new t.AnyArrayType),
		true,
	],
	[
		new t.AnyDictionaryType,
		t.nullable(new t.AnyDictionaryType),
		true,
	],
	[
		t.any,
		t.nullable(t.any),
		true,
	],
	[
		t.array(t.unknown),
		t.nullable(t.array(t.unknown)),
		true,
	],
	[
		t.bigint,
		t.nullable(t.bigint),
		true,
	],
	[
		t.boolean,
		t.nullable(t.boolean),
		true,
	],
	[
		helpers.myClss,
		t.nullable(helpers.myClss),
		true,
	],
	[
		t.record(t.string, t.string),
		t.nullable(t.record(t.string, t.string)),
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.nullable(t.exact(t.type({ a: t.string }))),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.nullable(t.fn([['a', t.string]] as const, t.boolean)),
		true,
	],
	[
		t.type({ a: t.string }),
		t.nullable(t.type({ a: t.string })),
		true,
	],
	[
		t.intersection([t.unknown, t.nullable(t.string)]),
		t.nullable(t.intersection([t.unknown, t.nullable(t.string)])),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.nullable(t.keyof({ a: null, b: null })),
		true,
	],
	[
		t.literal('a'),
		t.nullable(t.literal('a')),
		true,
	],
	[
		t.never,
		t.nullable(t.never),
		true,
	],
	[
		t.null,
		t.nullable(t.null),
		true,
	],
	[
		t.number,
		t.nullable(t.number),
		true,
	],
	[
		t.partial({ a: t.string }),
		t.nullable(t.partial({ a: t.string })),
		true,
	],
	[
		t.readonlyArray(t.string),
		t.nullable(t.readonlyArray(t.string)),
		true,
	],
	[
		t.readonly(t.nullable(t.string)),
		t.nullable(t.string),
		true,
	],
	[
		helpers.v1,
		t.nullable(helpers.v1),
		true,
	],
	[
		t.brand(t.nullable(t.string), (x): x is t.Branded<string, helpers.Brand> => true, 'Brand'),
		t.nullable(t.brand(t.nullable(t.string), (x): x is t.Branded<string, helpers.Brand> => true, 'Brand')),
		true,
	],
	[
		t.string,
		t.nullable(t.string),
		true,
	],
	[
		t.tuple([t.string, t.number]),
		t.nullable(t.tuple([t.string, t.number])),
		true,
	],
	[
		t.undefined,
		t.nullable(t.undefined),
		true,
	],
	[
		t.union([t.never, t.nullable(t.string)]),
		t.nullable(t.union([t.never, t.nullable(t.string)])),
		true,
	],
	[
		t.union([t.string, t.nullable(t.string)]),
		t.nullable(t.nullable(t.string)),
		true,
	],
	[
		t.unknown,
		t.nullable(t.unknown),
		true,
	],
	[
		t.nullable(t.string),
		t.nullable(t.nullable(t.string)),
		true,
	],
	[
		t.promise(t.nullable(t.string)),
		t.nullable(t.promise(t.nullable(t.string))),
		true,
	],
	[
		t.string,
		t.nullable(t.number),
		false,
	],
	[
		t.void,
		t.nullable(t.void),
		true,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
