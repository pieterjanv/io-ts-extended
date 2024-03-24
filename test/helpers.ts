import * as t from '../src/index.js';

export const myClss = t.clss(
	'T',
	t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }),
	t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: t.boolean }),
	class extends t.Implementation {
		static a: string = 'foo';
		static b(a: string): boolean { return true; };
		static c: boolean = false;;
		a: string = 'foo';
		b(a: string): boolean { return true; };
		c: boolean = false;
	},
);

export interface Brand {
	readonly Brand: unique symbol;
}

export interface T {
	a: string;
	b: T | number;
}
