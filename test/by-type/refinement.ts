import * as t from '#dist';
import * as helpers from '../helpers.js';;

export default [
	[
		new t.AnyArrayType,
		t.brand(new t.AnyArrayType, (x): x is t.Branded<unknown[], helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.brand(new t.AnyDictionaryType, (x): x is t.Branded<Record<string, unknown>, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.any,
		t.brand(t.any, (x): x is t.Branded<any, helpers.Brand> => true, 'Brand'),
		true,
	],
	[
		t.array(t.unknown),
		t.brand(t.array(t.unknown), (x): x is t.Branded<unknown[], helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.bigint,
		t.brand(t.bigint, (x): x is t.Branded<bigint, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.boolean,
		t.brand(t.boolean, (x): x is t.Branded<boolean, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.brand(helpers.myClss, (x): x is t.Branded<{ a: string, b(a: string): boolean, c: boolean }, helpers.Brand> => true, 'Brand'),
		t.brand(helpers.myClss, (x): x is t.Branded<{ a: string, b(a: string): boolean, c: boolean }, helpers.Brand> => true, 'Brand'),
		true,
	],
	[
		helpers.myClss,
		t.brand(t.type({ a: t.string }), (x): x is t.Branded<{ a: string }, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.record(t.string, t.string),
		t.brand(t.record(t.string, t.string), (x): x is t.Branded<Record<string, string>, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.exact(t.type({ a: t.string })),
		t.brand(t.type({ a: t.string }), (x): x is t.Branded<{ a: string }, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.brand(t.fn([['a', t.string]] as const, t.boolean), (x): x is t.Branded<(a: string) => boolean, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.type({ a: t.string }),
		t.brand(t.type({ a: t.string }), (x): x is t.Branded<{ a: string }, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.brand(t.intersection([t.type({ a: t.string }), t.type({ b: t.number })]), (x): x is t.Branded<{ a: string} & { b: number }, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.keyof({ a: null, b: null }),
		t.brand(t.keyof({ a: null, b: null }), (x): x is t.Branded<keyof { a: null, b: null }, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.literal('a'),
		t.brand(t.literal('a'), (x): x is t.Branded<'a', helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.never,
		t.brand(t.never, (x): x is t.Branded<never, helpers.Brand> => true, 'Brand'),
		true,
	],
	[
		t.null,
		t.brand(t.null, (x): x is t.Branded<null, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.number,
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.partial({ a: t.string }),
		t.brand(t.partial({ a: t.string }), (x): x is t.Branded<Partial<{ a: string }>, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.brand(t.readonlyArray(t.string), (x): x is t.Branded<readonly string[], helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.readonly(t.brand(t.readonly(t.type({ a: t.string })), (x): x is t.Branded<Readonly<{ a: string }>, helpers.Brand> => true, 'Brand')),
		t.brand(t.readonly(t.type({ a: t.string })), (x): x is t.Branded<Readonly<{ a: string }>, helpers.Brand> => true, 'Brand'),
		true,
	],
	[
		t.readonly(t.brand(t.readonly(t.tuple([t.string])), (x): x is t.Branded<Readonly<[string]>, helpers.Brand> => true, 'Brand')),
		t.brand(t.readonly(t.tuple([t.string])), (x): x is t.Branded<Readonly<[string]>, helpers.Brand> => true, 'Brand'),
		true,
	],
	[
		t.readonly(t.brand(t.readonly(t.tuple([t.string])), (x): x is t.Branded<Readonly<[string]>, helpers.Brand> => true, 'Brand')),
		t.brand(t.tuple([t.string]), (x): x is t.Branded<[string], helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		helpers.v9,
		t.brand(helpers.v9, (x): x is t.Branded<helpers.T, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => false, 'Brand'),
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		true,
	],
	[
		t.intersection([t.number, t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => false, 'Brand')]),
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		true,
	],
	[
		t.union([t.number, t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => false, 'Brand')]),
		t.brand(t.number, (x): x is t.Branded<number, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.string,
		t.brand(t.string, (x): x is t.Branded<string, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.brand(t.tuple([t.string, t.number]), (x): x is t.Branded<[string, number], helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.undefined,
		t.brand(t.undefined, (x): x is t.Branded<undefined, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.union([t.type({ a: t.string }), t.type({ b: t.number })]),
		t.brand(t.union([t.type({ a: t.string }), t.type({ b: t.number })]), (x): x is t.Branded<{ a: string } | { b: number }, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.unknown,
		t.brand(t.unknown, (x): x is t.Branded<unknown, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.void,
		t.brand(t.void, (x): x is t.Branded<void, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.nullable(t.brand(t.void, (x): x is t.Branded<void, helpers.Brand> => true, 'Brand')),
		t.brand(t.void, (x): x is t.Branded<void, helpers.Brand> => true, 'Brand'),
		false,
	],
	[
		t.promise(t.brand(t.void, (x): x is t.Branded<void, helpers.Brand> => true, 'Brand')),
		t.brand(t.void, (x): x is t.Branded<void, helpers.Brand> => true, 'Brand'),
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];
