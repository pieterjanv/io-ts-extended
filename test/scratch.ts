import * as t from '#dist';

const source = t.union([t.type({ a: t.string }), t.type({ b: t.number })]);
const target = t.record(t.string, t.union([t.string, t.number]));
const test: t.TypeOf<typeof source> extends t.TypeOf<typeof target> ? true : false = true;
