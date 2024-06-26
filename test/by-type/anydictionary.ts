import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		new t.AnyDictionaryType,
		false,
	],
	[
		new t.AnyDictionaryType,
		new t.AnyDictionaryType,
		true,
	],
	[
		t.any,
		new t.AnyDictionaryType,
		false,
	],
	[
		t.array(t.unknown),
		new t.AnyDictionaryType,
		false,
	],
	[
		t.bigint,
		new t.AnyDictionaryType,
		false,
	],
	[
		t.boolean,
		new t.AnyDictionaryType,
		false,
	],
	[
		helpers.myClss,
		new t.AnyDictionaryType,
		true,
	],
	[
		t.record(t.string, t.string),
		new t.AnyDictionaryType,
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		new t.AnyDictionaryType,
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		new t.AnyDictionaryType,
		false,
	],
	[
		t.type({ a: t.string }),
		new t.AnyDictionaryType,
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		new t.AnyDictionaryType,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		new t.AnyDictionaryType,
		false,
	],
	[
		t.literal('a'),
		new t.AnyDictionaryType,
		false,
	],
	[
		t.never,
		new t.AnyDictionaryType,
		true,
	],
	[
		t.null,
		new t.AnyDictionaryType,
		false,
	],
	[
		t.number,
		new t.AnyDictionaryType,
		false,
	],
	[
		t.partial({ a: t.string }),
		new t.AnyDictionaryType,
		true,
	],
	[
		t.readonlyArray(t.string),
		new t.AnyDictionaryType,
		false,
	],
	[
		t.readonly(t.type({ a: t.string })),
		new t.AnyDictionaryType,
		true,
	],
	[
		helpers.v1,
		new t.AnyDictionaryType,
		true,
	],
	[
		t.brand(new t.AnyDictionaryType, (x): x is t.Branded<Record<string, unknown>, helpers.Brand> => true, 'Brand'),
		new t.AnyDictionaryType,
		true,
	],
	[
		t.string,
		new t.AnyDictionaryType,
		false,
	],
	[
		t.tuple([t.string, t.number]),
		new t.AnyDictionaryType,
		false,
	],
	[
		t.undefined,
		new t.AnyDictionaryType,
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		new t.AnyDictionaryType,
		true,
	],
	[
		t.unknown,
		new t.AnyDictionaryType,
		false,
	],
	[
		t.void,
		new t.AnyDictionaryType,
		false,
	],
	[
		t.nullable(new t.AnyDictionaryType),
		new t.AnyDictionaryType,
		false,
	],
	[
		t.promise(new t.AnyDictionaryType),
		new t.AnyDictionaryType,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
