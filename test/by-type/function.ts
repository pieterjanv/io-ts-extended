import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.any,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.array(t.unknown),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.bigint,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		helpers.myClss,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.boolean,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.record(t.string, t.string),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.fn([['a', t.union([t.string, t.number])]] as const, t.literal(true)),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.fn([['a', t.literal('s')]] as const, t.boolean),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.type({ a: t.string }),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.intersection([t.fn([['a', t.string]] as const, t.boolean), t.fn([['a', t.unknown]] as const, t.boolean)]),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.intersection([t.fn([['a', t.string]] as const, t.boolean), t.fn([['a', t.literal('s')]] as const, t.boolean)]),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.intersection([t.fn([['a', t.number]] as const, t.boolean), t.fn([['a', t.literal('s')]] as const, t.boolean)]),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.literal('a'),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.never,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.null,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.number,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.readonly(t.fn([['a', t.string], ['b', t.number]] as const, t.boolean)),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		helpers.v27,
		t.fn([['a', t.string]] as const, t.boolean),
		false,
	],
	[
		helpers.v27,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		helpers.v27,
		t.fn([['a', t.string], ['b', t.fn([['a', t.string]] as const, t.boolean)]] as const, t.boolean),
		true,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.string,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.undefined,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.union([t.fn([['a', t.string]] as const, t.boolean),
		t.fn([['a', t.unknown]] as const, t.boolean)]), t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		true,
	],
	[
		t.union([t.fn([['a', t.string]] as const, t.boolean),
		t.fn([['a', t.literal(5)]] as const, t.boolean)]), t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.unknown,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.void,
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.nullable(t.fn([['a', t.string], ['b', t.number]] as const, t.boolean)),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
	[
		t.promise(t.fn([['a', t.string], ['b', t.number]] as const, t.boolean)),
		t.fn([['a', t.string], ['b', t.number]] as const, t.boolean),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];