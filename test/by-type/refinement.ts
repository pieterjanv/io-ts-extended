import * as t from '#dist';
import { Brand, T, myClss } from '../helpers.js';

export default [
	[
		new t.AnyArrayType,
		t.brand(new t.AnyArrayType, (x): x is t.Branded<unknown[], Brand> => true, 'Brand'),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.brand(new t.AnyDictionaryType, (x): x is t.Branded<Record<string, unknown>, Brand> => true, 'Brand'),
		false,
	],
	[
		t.any,
		t.brand(t.any, (x): x is t.Branded<any, Brand> => true, 'Brand'),
		false,
	],
	[
		t.array(t.unknown),
		t.brand(t.array(t.unknown), (x): x is t.Branded<unknown[], Brand> => true, 'Brand'),
		false,
	],
	[
		t.bigint,
		t.brand(t.bigint, (x): x is t.Branded<bigint, Brand> => true, 'Brand'),
		false,
	],
	[
		t.boolean,
		t.brand(t.boolean, (x): x is t.Branded<boolean, Brand> => true, 'Brand'),
		false,
	],
	[
		t.brand(myClss, (x): x is t.Branded<{ a: string, b(a: string): boolean, c: boolean }, Brand> => true, 'Brand'),
		t.brand(myClss, (x): x is t.Branded<{ a: string, b(a: string): boolean, c: boolean }, Brand> => true, 'Brand'),
		true,
	],
	[
		myClss,
		t.brand(t.type({ a: t.string }), (x): x is t.Branded<{ a: string }, Brand> => true, 'Brand'),
		false,
	],
	[
		t.record(t.string, t.string),
		t.brand(t.record(t.string, t.string), (x): x is t.Branded<Record<string, string>, Brand> => true, 'Brand'),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.brand(t.type({ a: t.string }), (x): x is t.Branded<{ a: string }, Brand> => true, 'Brand'),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.brand(t.fn([['a', t.string]] as const, t.boolean), (x): x is t.Branded<(a: string) => boolean, Brand> => true, 'Brand'),
		false,
	],
	[
		t.type({ a: t.string }),
		t.brand(t.type({ a: t.string }), (x): x is t.Branded<{ a: string }, Brand> => true, 'Brand'),
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.brand(t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]), (x): x is t.Branded<{ a: string} & { b: number }, Brand> => true, 'Brand'),
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.brand(t.keyof({ a: null, b: null }), (x): x is t.Branded<keyof { a: null, b: null }, Brand> => true, 'Brand'),
		false,
	],
	[
		t.literal('a'),
		t.brand(t.literal('a'), (x): x is t.Branded<'a', Brand> => true, 'Brand'),
		false,
	],
	[
		t.never,
		t.brand(t.never, (x): x is t.Branded<never, Brand> => true, 'Brand'),
		true,
	],
	[
		t.null,
		t.brand(t.null, (x): x is t.Branded<null, Brand> => true, 'Brand'),
		false,
	],
	[
		t.number,
		t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand'),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.brand(t.partial({ a: t.string }), (x): x is t.Branded<Partial<{ a: string }>, Brand> => true, 'Brand'),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.brand(t.readonlyArray(t.string), (x): x is t.Branded<readonly string[], Brand> => true, 'Brand'),
		false,
	],
	[
		t.readonly(t.brand(t.readonly(t.type({ a: t.string })), (x): x is t.Branded<Readonly<{ a: string }>, Brand> => true, 'Brand')),
		t.brand(t.readonly(t.type({ a: t.string })), (x): x is t.Branded<Readonly<{ a: string }>, Brand> => true, 'Brand'),
		true,
	],
	[
		t.readonly(t.brand(t.readonly(t.tuple([t.string])), (x): x is t.Branded<Readonly<[string]>, Brand> => true, 'Brand')),
		t.brand(t.readonly(t.tuple([t.string])), (x): x is t.Branded<Readonly<[string]>, Brand> => true, 'Brand'),
		true,
	],
	[
		t.readonly(t.brand(t.readonly(t.tuple([t.string])), (x): x is t.Branded<Readonly<[string]>, Brand> => true, 'Brand')),
		t.brand(t.tuple([t.string]), (x): x is t.Branded<[string], Brand> => true, 'Brand'),
		false,
	],
	[
		t.recursion('T', (self) => t.type({ a: t.string, b: t.union([self, t.number]) })),
		t.brand(t.recursion('T', (self) => t.type({ a: t.string, b: t.union([self, t.number]) })), (x): x is t.Branded<T, Brand> => true, 'Brand'),
		false,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, Brand> => false, 'Brand'),
		t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand'),
		true,
	],
	[
		t.intersection([t.number, t.brand(t.number, (x): x is t.Branded<number, Brand> => false, 'Brand')]),
		t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand'),
		true,
	],
	[
		t.union([t.number, t.brand(t.number, (x): x is t.Branded<number, Brand> => false, 'Brand')]),
		t.brand(t.number, (x): x is t.Branded<number, Brand> => true, 'Brand'),
		false,
	],
	[
		t.string,
		t.brand(t.string, (x): x is t.Branded<string, Brand> => true, 'Brand'),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.brand(t.tuple([t.string, t.number]), (x): x is t.Branded<[string, number], Brand> => true, 'Brand'),
		false,
	],
	[
		t.undefined,
		t.brand(t.undefined, (x): x is t.Branded<undefined, Brand> => true, 'Brand'),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.brand(t.union([t.type({ a: t.string }), t.type({ b: t.number })]), (x): x is t.Branded<{ a: string } | { b: number }, Brand> => true, 'Brand'),
		false,
	],
	[
		t.unknown,
		t.brand(t.unknown, (x): x is t.Branded<unknown, Brand> => true, 'Brand'),
		false,
	],
	[
		t.void,
		t.brand(t.void, (x): x is t.Branded<void, Brand> => true, 'Brand'),
		false,
	],
	[
		t.nullable(t.brand(t.void, (x): x is t.Branded<void, Brand> => true, 'Brand')),
		t.brand(t.void, (x): x is t.Branded<void, Brand> => true, 'Brand'),
		false,
	],
	[
		t.promise(t.brand(t.void, (x): x is t.Branded<void, Brand> => true, 'Brand')),
		t.brand(t.void, (x): x is t.Branded<void, Brand> => true, 'Brand'),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
