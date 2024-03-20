export enum Ternary { True = -1, False = 0, Maybe = 3 };

export const ternarySome = <T extends unknown>(
	items: Iterable<T>,
	predicate: (item: T, index: number) => Ternary
) => {
	let result = Ternary.False;
	let index = 0;
	for (const item of items) {
		result |= predicate(item, index);
		if (result === Ternary.True) {
			return Ternary.True;
		}
		index++;
	}
	return result;
};

export const ternaryEvery = <T extends unknown>(
	items: Iterable<T>,
	predicate: (item: T, index: number) => Ternary
) => {
	let result = Ternary.True;
	let index = 0;
	for (const item of items) {
		result &= predicate(item, index);
		if (result === Ternary.False) {
			return Ternary.False;
		}
		index++;
	}
	return result;
};

export const ternaryNegate = (ternary: Ternary) => {
	switch (ternary) {
		case Ternary.True: return Ternary.False;
		case Ternary.False: return Ternary.True;
		default: return Ternary.Maybe;
	}
}
