import * as t from '#dist';
import { Brand, myClss } from '../helpers.js';

export default [
	[
		new t.AnyArrayType,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.any,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.array(t.union([t.string, t.number])),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.bigint,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.boolean,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		myClss,
		t.tuple([t.string]),
		false,
	],
	[
		t.record(t.string, t.string),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.type({ a: t.string }),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.intersection([t.tuple([t.string, t.unknown]),
		t.tuple([t.unknown, t.number])]), t.tuple([t.string, t.number]),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.literal('a'),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.never,
		t.tuple([t.string, t.number]),
		true,
	],
	[
		t.null,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.number,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.readonlyArray(t.union([t.string, t.number])),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.readonly(t.tuple([t.string, t.number])),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.recursion('T', (self) => t.tuple([t.string, t.union([t.number, self])])),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.brand(t.tuple([t.string, t.number]), (x): x is t.Branded<[string, number], Brand> => true, 'Brand'),
		t.tuple([t.string, t.number]),
		true,
	],
	[
		t.string,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.tuple([t.string, t.number]),
		true,
	],
	[
		t.tuple([t.string, t.number, t.unknown]),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.tuple([t.string]),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.undefined,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.union([t.tuple([t.string, t.number]), t.tuple([t.string, t.number])]),
		t.tuple([t.string, t.number]),
		true,
	],
	[
		t.unknown,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.void,
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.nullable(t.tuple([t.string, t.number])),
		t.tuple([t.string, t.number]),
		false,
	],
	[
		t.promise(t.tuple([t.string, t.number])),
		t.tuple([t.string, t.number]),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
