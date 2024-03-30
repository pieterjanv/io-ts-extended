import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.void,
		false,
	],
	[
		new t.AnyDictionaryType,
		t.void,
		false,
	],
	[
		t.any,
		t.void,
		false,
	],
	[
		t.array(t.unknown),
		t.void,
		false,
	],
	[
		t.bigint,
		t.void,
		false,
	],
	[
		t.boolean,
		t.void,
		false,
	],
	[
		helpers.myClss,
		t.void,
		false,
	],
	[
		t.record(t.string, t.string),
		t.void,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.void,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.void,
		false,
	],
	[
		t.type({ a: t.string }),
		t.void,
		false,
	],
	[
		t.intersection([t.unknown, t.void]),
		t.void,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.void,
		false,
	],
	[
		t.literal('a'),
		t.void,
		false,
	],
	[
		t.never,
		t.void,
		true,
	],
	[
		t.null,
		t.void,
		false,
	],
	[
		t.number,
		t.void,
		false,
	],
	[
		t.partial({ a: t.string }),
		t.void,
		false,
	],
	[
		t.readonlyArray(t.string),
		t.void,
		false,
	],
	[
		t.readonly(t.void),
		t.void,
		true,
	],
	[
		helpers.v1,
		t.void,
		false,
	],
	[
		t.brand(t.void, (x): x is t.Branded<void, helpers.Brand> => true, 'Brand'),
		t.void,
		true,
	],
	[
		t.string,
		t.void,
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.void,
		false,
	],
	[
		t.undefined,
		t.void,
		true,
	],
	[
		t.union([t.never, t.void]),
		t.void,
		true,
	],
	[
		t.unknown,
		t.void,
		false,
	],
	[
		t.void, 
		t.void,
		true,
	],
	[
		t.nullable(t.void),
		t.void,
		false,
	],
	[
		t.promise(t.void),
		t.void,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
