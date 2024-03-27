import * as t from '#dist';
import { Brand, myClss } from '../helpers.js';

export default [
	[
		new t.AnyArrayType,
		t.number,
		false,
	],
	[
		new t.AnyDictionaryType,
		t.number,
		false,
	],
	[
		t.any,
		t.number,
		false,
	],
	[
		t.array(t.unknown),
		t.number,
		false,
	],
	[
		t.bigint,
		t.number,
		false,
	],
	[
		t.boolean,
		t.number,
		false,
	],
	[
		myClss,
		t.number,
		false,
	],
	[
		t.record(t.string, t.string),
		t.number,
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.number,
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.number,
		false,
	],
	[
		t.type({ a: t.string }),
		t.number,
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.number,
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.number,
		false,
	],
	[
		t.keyof({ 1: null }),
		t.number,
		false,
	],
	[
		t.literal(5),
		t.number,
		true,
	],
	[
		t.never,
		t.number,
		true,
	],
	[
		t.null,
		t.number,
		false,
	],
	[
		t.number,
		t.number,
		true,
	],
	[
		t.partial({ a: t.string }),
		t.number,
		false,
	],
	[
		t.readonlyArray(t.string),
		t.number,
		false,
	],
	[
		t.readonly(t.number),
		t.number,
		true,
	],
	[
		t.recursion('T', (self) => t.type({ a: t.string, b: self })),
		t.number,
		false,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand'),
		t.number,
		true,
	],
	[
		t.string,
		t.number,
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.number,
		false,
	],
	[
		t.undefined,
		t.number,
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.number,
		false,
	],
	[
		t.unknown,
		t.number,
		false,
	],
	[
		t.void,
		t.number,
		false,
	],
	[
		t.nullable(t.number),
		t.number,
		false,
	],
	[
		t.promise(t.number),
		t.number,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
