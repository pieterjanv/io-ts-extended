import * as t from '#dist';

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

export type T = {
	a: string;
	b: T | number;
}

export const emptyProps: Record<string, t.Mixed> = {};

export type R1 = {
	a: string;
	b: R1;
}
export type R2 = {
	a: string;
	d: R2;
}
export type R3 = (R3 | string)[];
export type R4 = {
	[key: string]: R4 | string;
}
export type R5 = (a: string, b: R5) => boolean;
export type R6 = {
	a: string;
	b: R6 | number;
}
export type R7 = Partial<{
	a: string;
	b: R7;
}>;
export type R8 = Partial<{
	a: string;
	b: R8 | number;
}>;
export type R9 = readonly (string | R9)[];
export type R10 = [string, R10];
export type R11 = {
	a: string;
	b: { a: string } | R11;
}
export type R12 = readonly (string | number | R12)[];
export type R13 = [string, number | R13];
export type R14 = readonly [string, number | R14 | boolean];
export type R15 = [string | R15, string];
export type R16 = [string, R16];
export type R17 = {
	a: string;
	b: (a: string) => boolean;
	c: R17;
};
class R18 extends myClss.ctor {
	d: R18 = this;
}
export type R19 = (a: string, b: R19) => boolean;
export type R20 = {
	a: string;
	b: R20 | undefined;
};
export type R21 = {
	a: string;
	b: R21 | number;
};

export const v1: t.Type<R1> = t.recursion('T1', (self) => t.type({ a: t.string, b: self }));
export const v2: t.Type<R2> = t.recursion('T2', (self) => t.type({ a: t.string, d: self }));
export const v3: t.Type<R3> = t.recursion('T3', (self) => t.array(t.union([t.string, self])));
export const v4: t.Type<R4> = t.recursion('T4', (self) => t.record(t.string, t.union([self, t.string])));
export const v5: t.Type<object> = t.recursion('T5', () => t.type({}));
export const v6: t.Type<R5> = t.recursion('T6', (self) => t.fn([['a', t.string], ['b', self]] as const, t.boolean));
export const v7: t.Type<(a: string) => boolean> = t.recursion('T7', (self) => t.fn([['a', t.string]] as const, t.boolean));
export const v8: t.Type<(a: string, b: (a: string) => boolean) => boolean> = t.recursion('T8', (self) => t.fn([['a', t.string], ['b', t.fn([['a', t.string]] as const, t.boolean)]] as const, t.boolean));
export const v9: t.Type<R6> = t.recursion('T9', (self) => t.type({ a: t.string, b: t.union([self, t.number]) }));
export const v10: t.Type<R7> = t.recursion('T10', (self) => t.partial({ a: t.string, b: self }));
export const v11: t.Type<R8> = t.recursion('T11', (self) => t.partial({ a: t.string, b: t.union([self, t.number]) }));
export const v12: t.Type<R9> = t.recursion('T12', (self) => t.readonlyArray(t.union([t.string, self])));
export const v13: t.ReadonlyC<t.Type<R1>> = t.readonly(t.recursion('T13', (self) => t.type({ a: t.string, b: self })));
export const v14: t.ReadonlyC<t.Type<R10>> = t.readonly(t.recursion('T14', (self) => t.tuple([t.string, self])));
export const v15: t.Type<R10> = t.recursion('T15', (self) => t.tuple([t.string, self]));
export const v16: t.Type<R11> = t.recursion('T16', (self) => t.type({ a: t.string, b: t.union([self, t.type({ a: t.string })]) }));
export const v17: t.Type<R12> = t.recursion('T17', (self) => t.readonlyArray(t.union([self, t.string, t.number])));
export const v18: t.Type<R13> = t.recursion('T18', (self) => t.tuple([t.string, t.union([t.number, self])]));
export const v19: t.Type<R14> = t.recursion('T19', (self) => t.tuple([t.string, t.union([t.number, self, t.boolean])]));
export const v20: t.Type<R15> = t.recursion('T20', (self) => t.tuple([t.union([self, t.string]), t.string]));
export const v21: t.Type<{ a: string }> = t.recursion('T', (self) => t.type({ a: t.string }));
export const v22: t.Type<R1 | null | undefined> = t.nullable(v1);
export const v23: t.Type<Promise<R1>> = t.promise(v1);
export const v24: t.Type<R16> = t.recursion('T24', (self) => t.tuple([t.string, self]));
export const v25: t.Type<R17> = t.recursion('T25', (self) => t.type({ a: t.string, b: t.fn([['a', t.string]] as const, t.boolean), c: self }));
export const v26: t.Type<R18> = t.recursion('T26', (self) => t.extendClss('T', myClss, t.type({}), t.type({ d: self }), R18));
export const v27: t.Type<R19> = t.recursion('T27', (self) => t.fn([['a', t.string], ['b', self]] as const, t.boolean));
export const v28: t.Type<R20> = t.recursion('T28', (self) => t.type({ a: t.string, b: t.union([self, t.undefined]) }));
export const v29: t.Type<R21> = t.recursion('T29', (self) => t.type({ a: t.string, b: t.union([self, t.number]) }));
