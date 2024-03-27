import * as t from '#dist';
import { Brand, myClss } from '../helpers.js';

export default [
	[
		new t.AnyArrayType,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		new t.AnyDictionaryType,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.any,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.array(t.unknown),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.bigint,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.boolean,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		myClss,
		myClss,
		true,
	],
	[
		myClss, t.clss('U', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }),
		t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), class extends myClss.ctor {}),
		true,
	],
	[
		t.clss('V', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), class extends myClss.ctor {}),
		myClss,
		false,
	],
	[
		t.clss('W', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends myClss.ctor {}),
		myClss,
		false,
	],
	[
		t.clss('X', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true; }; static c: false; a: string = 'foo'; b(a: string): boolean { return true; }; c: boolean = false }),
		myClss,
		true,
	],
	[
		t.extendClss('Y', myClss, t.type({ d: t.string }), t.type({ d: t.string }), class extends myClss.ctor { static d: string = 'd'; d: string = 'd' }),
		myClss,
		true,
	],
	[
		t.record(t.string, t.string),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.exact(t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) })),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.type({ a: t.string, b: t.fn([['a', t.number]] as const, t.boolean) }),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.intersection([t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), t.type({ c: t.number })]),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.intersection([myClss, t.type({ a: t.literal('s') })]),
		myClss,
		true,
	],
	[
		t.keyof({ a: null, b: null }),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.literal('a'),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.never,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		true,
	],
	[
		t.null,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.number,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.partial({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.readonlyArray(t.string),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.readonly(t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) })),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.readonly(myClss),
		myClss,
		true,
	],
	[
		t.recursion('T', (self) => t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: self })),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.recursion('T', (self) => t.extendClss('T', myClss, t.type({}), t.type({ d: self }), class extends myClss.ctor { d: this = this })),
		myClss,
		true,
	],
	[
		t.brand(t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), (x): x is t.Branded<{ a: string, b: (a: string) => boolean }, Brand> => true, 'Brand'),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.brand(myClss, (x): x is t.Branded<t.TypeOf<typeof myClss>, Brand> => true, 'Brand'),
		myClss,
		true,
	],
	[
		t.string,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.tuple([t.string, t.number]),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.undefined,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.union([myClss, t.extendClss('Z', myClss, t.type({}), t.type({ a: t.literal('s') }), class extends myClss.ctor { a: 's' = 's' })]),
		myClss,
		true,
	],
	[
		t.unknown,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.void,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.nullable(myClss),
		myClss,
		false,
	],
	[
		t.promise(myClss),
		myClss,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];