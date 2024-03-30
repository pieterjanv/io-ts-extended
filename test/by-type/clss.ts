import * as t from '#dist';
import * as helpers from '../helpers.js';;

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
		helpers.myClss,
		helpers.myClss,
		true,
	],
	[
		helpers.myClss, t.clss('U', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }),
		t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), class extends helpers.myClss.ctor {}),
		true,
	],
	[
		t.clss('V', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), class extends helpers.myClss.ctor {}),
		helpers.myClss,
		true,
	],
	[
		t.clss('W', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends helpers.myClss.ctor {}),
		helpers.myClss,
		false,
	],
	[
		t.clss('X', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true; }; static c: false; a: string = 'foo'; b(a: string): boolean { return true; }; c: boolean = false }),
		helpers.myClss,
		true,
	],
	[
		t.extendClss('Y', helpers.myClss, t.type({ d: t.string }), t.type({ d: t.string }), class extends helpers.myClss.ctor { static d: string = 'd'; d: string = 'd' }),
		helpers.myClss,
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
		true,
	],
	[
		t.fn([['a', t.string]] as const, t.boolean),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		true,
	],
	[
		t.type({ a: t.string, b: t.fn([['a', t.number]] as const, t.boolean) }),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		false,
	],
	[
		t.intersection([t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), t.type({ c: t.number })]),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		true,
	],
	[
		t.intersection([helpers.myClss, t.type({ a: t.literal('s') })]),
		helpers.myClss,
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
		true,
	],
	[
		t.readonly(helpers.myClss),
		helpers.myClss,
		true,
	],
	[
		helpers.v25,
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		true,
	],
	[
		helpers.v26,
		helpers.myClss,
		true,
	],
	[
		t.brand(t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), (x): x is t.Branded<{ a: string, b: (a: string) => boolean }, helpers.Brand> => true, 'Brand'),
		t.clss('T', t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean)}), t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean) }), class extends t.Implementation { static a: string = 'foo'; static b(a: string): boolean { return true }; a: string = 'foo'; b(a: string): boolean { return true; }}),
		true,
	],
	[
		t.brand(helpers.myClss, (x): x is t.Branded<t.TypeOf<typeof helpers.myClss>, helpers.Brand> => true, 'Brand'),
		helpers.myClss,
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
		t.union([helpers.myClss, t.extendClss('Z', helpers.myClss, t.type(helpers.emptyProps), t.type({ a: t.literal('s') }), class extends helpers.myClss.ctor { a: 's' = 's' })]),
		helpers.myClss,
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
		t.nullable(helpers.myClss),
		helpers.myClss,
		false,
	],
	[
		t.promise(helpers.myClss),
		helpers.myClss,
		false,
	],
] as readonly [t.Type<unknown>, t.Type<unknown>, boolean][];