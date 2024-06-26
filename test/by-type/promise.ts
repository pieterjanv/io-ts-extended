import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.promise(new t.AnyArrayType),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.promise(new t.AnyDictionaryType),
		false,
	],
	[
		t.any,
		t.promise(t.any),
		false,
	],
	[
		t.array(t.unknown),
		t.promise(t.array(t.unknown)),
		false,
	],
	[
		t.bigint,
		t.promise(t.bigint),
		false,
	],
	[
		t.boolean,
		t.promise(t.boolean),
		false,
	],
	[
		helpers.myClss,
		t.promise(helpers.myClss),
		false,
	],
	[
		t.record(t.string, t.string),
		t.promise(t.record(t.string, t.string)),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.promise(t.exact(t.type({ a: t.string }))),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.promise(t.fn([['a', t.string]] as const, t.boolean)),
		false,
	],
	[
		t.type({ a: t.string }),
		t.promise(t.type({ a: t.string })),
		false,
	],
	[
		t.intersection([t.unknown, t.promise(t.unknown)]),
		t.promise(t.intersection([t.unknown, t.promise(t.unknown)])),
		false,
	],
	[
		t.intersection([t.unknown, t.promise(t.promise(t.unknown))]),
		t.promise(t.intersection([t.unknown, t.promise(t.unknown)])),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.promise(t.keyof({ a: null, b: null })),
		false,
	],
	[
		t.literal('a'),
		t.promise(t.literal('a')),
		false,
	],
	[
		t.never,
		t.promise(t.never),
		true,
	],
	[
		t.null,
		t.promise(t.null),
		false,
	],
	[
		t.number,
		t.promise(t.number),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.promise(t.partial({ a: t.string })),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.promise(t.readonlyArray(t.string)),
		false,
	],
	[
		t.readonly(t.promise(t.string)),
		t.promise(t.readonly(t.promise(t.string))),
		false,
	],
	[
		t.readonly(t.promise(t.promise(t.string))),
		t.promise(t.readonly(t.promise(t.string))),
		true,
	],
	[
		helpers.v1,
		t.promise(helpers.v1),
		false,
	],
	[
		t.brand(t.promise(t.string), (x): x is t.Branded<Promise<string>, helpers.Brand> => true, 'Brand'),
		t.promise(t.brand(t.promise(t.string), (x): x is t.Branded<Promise<string>, helpers.Brand> => true, 'Brand')),
		false,
	],
	[
		t.promise(t.brand(t.promise(t.string), (x): x is t.Branded<Promise<string>, helpers.Brand> => true, 'Brand')),
		t.promise(t.brand(t.promise(t.string), (x): x is t.Branded<Promise<string>, helpers.Brand> => true, 'Brand')),
		true,
	],
	[
		t.string,
		t.promise(t.string),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.promise(t.tuple([t.string, t.number])),
		false,
	],
	[
		t.undefined,
		t.promise(t.undefined),
		false,
	],
	[
		t.union([t.never, t.promise(t.union([t.never, t.string]))]),
		t.promise(t.union([t.never, t.string])),
		true,
	],
	[
		t.union([t.string, t.promise(t.union([t.never, t.string]))]),
		t.promise(t.union([t.never, t.string])),
		false,
	],
	[
		t.unknown,
		t.promise(t.unknown),
		false,
	],
	[
		t.promise(t.string),
		t.promise(t.string),
		true,
	],
	[
		t.void,
		t.promise(t.void),
		false,
	],
	[
		t.nullable(t.promise(t.string)),
		t.promise(t.nullable(t.promise(t.string))),
		false,
	],
	[
		t.promise(t.promise(t.string)),
		t.promise(t.promise(t.promise(t.string))),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
