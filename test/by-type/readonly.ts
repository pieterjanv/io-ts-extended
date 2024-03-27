import * as t from '#dist';
import { Brand, myClss } from '../helpers.js';

export default [
	[
		new t.AnyArrayType,
		t.readonly(new t.AnyArrayType),
		true,
	],
	[
		new t.AnyDictionaryType,
		t.readonly(new t.AnyDictionaryType),
		true,
	],
	[
		t.any,
		t.readonly(t.any),
		true,
	],
	[
		t.array(t.unknown),
		t.readonly(t.array(t.unknown)),
		true,
	],
	[
		t.bigint,
		t.readonly(t.bigint),
		true,
	],
	[
		t.boolean,
		t.readonly(t.boolean),
		true,
	],
	[
		myClss,
		t.readonly(t.type({ a: t.string })),
		true,
	],
	[
		t.record(t.string, t.string),
		t.readonly(t.record(t.string, t.string)),
		true,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.readonly(t.exact(t.type({ a: t.string }))),
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.readonly(t.fn([['a', t.string]] as const, t.boolean)),
		true,
	],
	[
		t.type({ a: t.string }),
		t.readonly(t.type({ a: t.string })),
		true,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.readonly(t.intersection([t.type({ a: t.string }), t.type({ b: t.number })])),
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.readonly(t.keyof({ a: null, b: null })),
		true,
	],
	[
		t.literal('a'),
		t.readonly(t.literal('a')),
		true,
	],
	[
		t.never,
		t.readonly(t.never),
		true,
	],
	[
		t.null,
		t.readonly(t.null),
		true,
	],
	[
		t.number,
		t.readonly(t.number),
		true,
	],
	[
		t.partial({ a: t.string }),
		t.readonly(t.partial({ a: t.string })),
		true,
	],
	[
		t.readonlyArray(t.string),
		t.readonly(t.readonlyArray(t.string)),
		true,
	],
	[
		t.readonly(t.type({ a: t.string })),
		t.readonly(t.type({ a: t.string })),
		true,
	],
	[
		t.recursion('T', (self) => t.type({ a: t.string, b: self })),
		t.readonly(t.recursion('T', (self) => t.type({ a: t.string, b: self }))),
		true,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand'),
		t.readonly(t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand')),
		true,
	],
	[
		t.string,
		t.readonly(t.string),
		true,
	],
	[
		t.tuple([t.string, t.number]),
		t.readonly(t.tuple([t.string, t.number])),
		true,
	],
	[
		t.undefined,
		t.readonly(t.undefined),
		true,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.readonly(t.union([t.type({ a: t.string }), t.type({ b: t.number })])),
		true,
	],
	[
		t.unknown,
		t.readonly(t.unknown),
		true,
	],
	[
		t.void,
		t.readonly(t.void),
		true,
	],
	[
		t.nullable(t.readonly(t.void)),
		t.readonly(t.nullable(t.void)),
		true,
	],
	[
		t.nullable(t.readonly(t.void)),
		t.readonly(t.void),
		false,
	],
	[
		t.promise(t.readonly(t.void)),
		t.readonly(t.promise(t.void)),
		true,
	],
	[
		t.promise(t.readonly(t.void)),
		t.readonly(t.void),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
