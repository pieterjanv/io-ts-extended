import * as t from '#dist';
import { Brand, myClss } from '../helpers.js';

export default [
	[
		new t.AnyArrayType,
		t.literal(5),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.literal(5),
		false,
	],
	[
		t.any,
		t.literal(5),
		false,
	],
	[
		t.array(t.unknown),
		t.literal(5),
		false,
	],
	[
		t.bigint,
		t.literal(5),
		false,
	],
	[
		t.boolean,
		t.literal(5),
		false,
	],
	[
		myClss,
		t.literal(5),
		false,
	],
	[
		t.record(t.string, t.string),
		t.literal(5),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.literal(5),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.literal(5),
		false,
	],
	[
		t.type({ a: t.string }),
		t.literal(5),
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.literal(5),
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.literal(5),
		false,
	],
	[
		t.keyof({ 's': null }),
		t.literal('s'),
		true,
	],
	[
		t.literal(5),
		t.literal(5),
		true,
	],
	[
		t.literal('s'),
		t.literal(5),
		false,
	],
	[
		t.never,
		t.literal(5),
		true,
	],
	[
		t.null,
		t.literal(5),
		false,
	],
	[
		t.number,
		t.literal(5),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.literal(5),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.literal(5),
		false,
	],
	[
		t.readonly(t.literal(5)),
		t.literal(5),
		true,
	],
	[
		t.recursion('T', (self) => t.type({ a: t.string, b: self })),
		t.literal(5),
		false,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand'),
		t.literal(5),
		false,
	],
	[
		t.string,
		t.literal(5),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.literal(5),
		false,
	],
	[
		t.undefined,
		t.literal(5),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.literal(5),
		false,
	],
	[
		t.unknown,
		t.literal(5),
		false,
	],
	[
		t.void,
		t.literal(5),
		false,
	],
	[
		t.nullable(t.literal(5)),
		t.literal(5),
		false,
	],
	[
		t.promise(t.literal(5)),
		t.literal(5),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
