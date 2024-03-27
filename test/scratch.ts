import * as t from '#dist';

const source = t.exact(t.type({ a: t.string }));
const target = t.type({ a: t.string });
const test: t.TypeOf<typeof source> extends t.TypeOf<typeof target> ? true : false = true;
