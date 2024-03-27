import * as t from '#dist';
import { Brand, myClss } from '../helpers.js';

export default [
	[
		new t.AnyArrayType,
		t.type({ a: t.string }),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.type({ a: t.string }),
		false,
	],
	[
		t.any,
		t.type({ a: t.string }),
		false,
	],
	[
		t.array(t.unknown),
		t.type({ a: t.string }),
		false,
	],
	[
		t.bigint,
		t.type({ a: t.string }),
		false,
	],
	[
		t.boolean,
		t.type({ a: t.string }),
		false,
	],
	[
		myClss,
		t.type({ a: t.string }),
		true,
	],
	[
		t.record(t.string, t.string),
		(t.type({})),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.type({ a: t.string }),
		true,
	],
	[
		t.record(t.string, t.string),
		t.type({ a: t.string }),
		false,
	],
	[
		(t.type({ a: t.string })),
		t.type({ a: t.string }),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.type({ a: t.string }),
		false,
	],
	[
		t.type({ a: t.string }),
		(t.type({ a: t.string })),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		(t.type({ a: t.string })),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		(t.type({ a: t.string, b: t.number })),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		(t.type({ a: t.string, b: t.number, c: t.boolean })),
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.partial({ b: t.number })]),
		(t.type({ a: t.string })),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.type({}),
		true,
	],
	[
		t.intersection([t.number, t.literal(1)]),
		t.type({}),
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.type({ a: t.string }),
		false,
	],
	[
		t.literal('a'),
		t.type({ a: t.string }),
		false,
	],
	[
		t.never,
		(t.type({ a: t.string })),
		true,
	],
	[
		t.null,
		t.type({ a: t.string }),
		false,
	],
	[
		t.number,
		t.type({ a: t.string }),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.type({ a: t.string }),
		false,
	],
	[
		t.partial({}),
		(t.type({})),
		true,
	],
	[
		t.readonlyArray(t.string),
		t.type({ a: t.string }),
		false,
	],
	[
		t.readonly(t.type({ a: t.string })),
		(t.type({ a: t.string })),
		true,
	],
	[
		t.recursion('T', (self) => t.type({ a: t.string, b: self })),
		(t.type({ a: t.string })),
		true,
	],
	[
		t.brand(t.type({a: t.string}), (x): x is t.Branded<{a: string}, Brand> => true, 'Brand'),
		(t.type({ a: t.string })),
		true,
	],
	[
		t.string,
		t.type({ a: t.string }),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.type({ a: t.string }),
		false,
	],
	[
		t.undefined,
		t.type({ a: t.string }),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.type({ a: t.string }),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ a: t.number })]),
		(t.type({ a: t.union([t.string, t.number]) })),
		true,
	],
	[
		t.unknown,
		t.type({ a: t.string }),
		false,
	],
	[
		t.void,
		t.type({ a: t.string }),
		false,
	],
	[
		t.nullable(t.type({ a: t.string })),
		t.type({ a: t.string }),
		false,
	],
	[
		t.promise(t.type({ a: t.string })),
		t.type({ a: t.string }),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];