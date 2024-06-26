import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.intersection([t.array(t.any), t.array(t.unknown)]),
		true,
	],
	[
		new t.AnyArrayType,
		t.intersection([t.array(t.any), t.array(t.string)]),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.intersection([t.record(t.string, t.unknown), t.record(t.number, t.any)]),
		true,
	],
	[
		new t.AnyDictionaryType,
		t.intersection([t.record(t.string, t.string), t.record(t.number, t.any)]),
		false,
	],
	[
		t.any,
		t.intersection([t.string, t.unknown]),
		false,
	],
	[
		t.array(t.literal(5)),
		t.intersection([t.array(t.number), t.array(t.literal(5))]),
		true,
	],
	[
		t.array(t.literal(5)),
		t.intersection([t.array(t.number), t.array(t.literal('s'))]),
		false,
	],
	[
		t.bigint,
		t.intersection([t.bigint, t.unknown]),
		true,
	],
	[
		t.boolean,
		t.intersection([t.boolean, t.union([t.literal(false), t.literal(true)])]),
		true,
	],
	[
		t.boolean,
		t.intersection([t.boolean, t.literal(false)]),
		false,
	],
	[
		helpers.myClss,
		t.intersection([t.type({ a: t.string }), t.type({ c: t.boolean })]),
		true,
	],
	[
		helpers.myClss,
		t.intersection([t.type({ a: t.string }), t.type({ d: t.boolean })]),
		false,
	],
	[
		t.record(t.string, t.literal('s')),
		t.intersection([t.record(t.string, t.string), t.record(t.string, t.literal('s'))]),
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.intersection([t.type({ a: t.string }), t.type({ a: t.number })]),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.intersection([t.type({ a: t.string }), t.type({ a: t.string })]),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.intersection([t.fn([['a', t.string]] as const, t.boolean), t.fn([['a', t.unknown]] as const, t.boolean)]),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.intersection([t.fn([['a', t.string]] as const, t.boolean), t.fn([['a', t.literal('s')]] as const, t.boolean)]),
		true,
	],
	[
		t.type({ a: t.string }),
		t.intersection([t.type({ a: t.string }), t.type({ a: t.string })]),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number, c: t.boolean })]),
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.intersection([t.literal('a'), t.literal('b')]),
		false,
	],
	[
		t.literal('a'),
		t.intersection([t.string, t.literal('a')]),
		true,
	],
	[
		t.never,
		t.intersection([t.string, t.never]),
		true,
	],
	[
		t.null,
		t.intersection([t.string, t.null]),
		false,
	],
	[
		t.number,
		t.intersection([t.string, t.number]),
		false,
	],
	[
		t.number,
		t.intersection([t.unknown, t.number]),
		true,
	],
	[
		t.partial({ a: t.string }),
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.intersection([t.array(t.string), t.array(t.unknown)]),
		false,
	],
	[
		t.readonly(t.type({ a: t.string, b: t.number })),
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		true,
	],
	[
		helpers.v1,
		t.intersection([t.type({ a: t.string }), t.type({ b: t.type({ a: t.string })})]),
		true,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		t.intersection([t.number, t.unknown]),
		true,
	],
	[
		t.string,
		t.intersection([t.string, t.string]),
		true,
	],
	[
		t.tuple([t.string, t.number]),
		t.intersection([t.tuple([t.string, t.unknown]), t.tuple([t.unknown, t.number])]),
		true,
	],
	[
		t.undefined,
		t.intersection([t.string, t.undefined]),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.intersection([t.type({ a: t.string}), t.type({ b: t.number})]),
		false,
	],
	[
		t.unknown,
		t.intersection([t.string, t.unknown]),
		false,
	],
	[
		t.void,
		t.intersection([t.string, t.void]),
		false,
	],
	[
		t.nullable(t.undefined),
		t.intersection([t.undefined, t.undefined]),
		false,
	],
	[
		t.nullable(t.intersection([t.undefined, t.undefined])),
		t.intersection([t.undefined, t.undefined]),
		false,
	],
	[
		t.promise(t.string),
		t.intersection([t.promise(t.string), t.promise(t.string)]),
		true,
	],
	[
		t.promise(t.intersection([t.undefined, t.undefined])),
		t.intersection([t.undefined, t.undefined]),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
