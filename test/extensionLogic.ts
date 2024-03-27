import * as t from '#dist';
import { readdir } from 'fs/promises';

const typeclasses: t.TypeCtor[] = [
	t.AnyType,
	t.AnyArrayType,
	t.AnyDictionaryType,
	t.ArrayType,
	t.BigIntType,
	t.BooleanType,
	t.ClssType,
	t.DictionaryType,
	t.ExactType,
	t.FunctionType,
	t.InterfaceType,
	t.IntersectionType,
	t.KeyofType,
	t.LiteralType,
	t.NeverType,
	t.NullType,
	t.NullableType,
	t.NumberType,
	t.PartialType,
	t.PromiseType,
	t.ReadonlyType,
	t.ReadonlyArrayType,
	t.RecursiveType,
	t.RefinementType,
	t.StringType,
	t.TupleType,
	t.UndefinedType,
	t.UnionType,
	t.UnknownType,
	t.VoidType,
];

// create a cartesian product of all typeclasses
const typePairs = typeclasses.flatMap(
	(source) => typeclasses.map((target) => [source, target] as const)
);

// Read all tests in the test files from the by-type directory, so we don't
// accidentally miss any tests.
const tests: Array<readonly [Array<readonly [t.Type<unknown>, t.Type<unknown>, boolean]>, string]> = await Promise.all(
	(await readdir(`${__dirname}/by-type`))
		.map(async (file) => [
			(await import(`./by-type/${file.replace(/\.ts$/, '.js')}`)).default,
			file.replace(/\.ts$/, '')
		] as const)
);

console.log('Running extension logic tests...\n');

let failures: string[] = [];
for (const [typeBatch, batchName] of tests) {
	console.log(`Running ${typeBatch.length} tests for ${batchName}...`);
	for (const [source, target, expected] of typeBatch) {

		// cross out the type combination from our list of type pairs
		const SourceCtor = Object.getPrototypeOf(source).constructor as t.TypeCtor;
		const TargetCtor = Object.getPrototypeOf(target).constructor as t.TypeCtor;
		const pairIndex = typePairs.findIndex(([s, t]) => s === SourceCtor && t === TargetCtor);
		if (pairIndex !== -1) {
			typePairs.splice(pairIndex, 1);
		}

		// run the test
		if (t.isExtensionOf(source, target) !== expected) {
			failures.push(`Expected ${(source as any).render()} to ${expected ? '' : 'not '}be extension of ${(target as any).render()}.`);
		}
	}
}

if (failures.length) {
	console.error('\nThere were failures in testing the extension logic:\n');
	for (const failure of failures) {
		console.error(failure);
	}
	process.exit(1);
}
else {
	console.log('\nAll extension logic tests passed.');
}

if (typePairs.length) {
	console.error('\nThere were type pairs that were not tested:');
	for (const [source, target] of typePairs) {
		console.error(`- ${source.name} and ${target.name}`);
	}
	process.exit(1);
}
