import * as t from '#dist';
import { readdir } from 'fs/promises';

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
