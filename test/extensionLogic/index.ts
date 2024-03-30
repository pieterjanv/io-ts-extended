import fs from "fs";
import ts from "typescript";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as t from '#dist';

const __dirname = dirname(fileURLToPath(import.meta.url));

type BaseTestCase = {
	fileName: string;
	results: {
		source: string;
		target: string;
		expected: boolean | undefined;
	}[];
}

type TestCase = BaseTestCase & {
	results: {
		groundTruth: boolean,
		passed: boolean,
	}[];
}

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

// create a cartesian product of all typeclasses with itself
const typePairs = typeclasses.flatMap(
	(source) => typeclasses.map((target) => [source, target] as const)
);

fs.mkdirSync(`${__dirname}/../out/extensionLogic`, { recursive: true });

const options: ts.CompilerOptions = {
	target: ts.ScriptTarget.ES2022,
	module: ts.ModuleKind.Node16,
	moduleResolution: ts.ModuleResolutionKind.Node16,
	strict: true,
	strictFunctionTypes: false,
	noImplicitThis: true,  
};

const byTypesDir = `${__dirname}/../by-type`;
const byTypeFileNames = fs.readdirSync(byTypesDir)
	.map(fileName => `${byTypesDir}/${fileName}`);
// evaluateGroundTruth([`${__dirname}/../by-type/readonly.ts`], options);
evaluateGroundTruth(byTypeFileNames, options);

function evaluateGroundTruth(
	fileNames: string[],
	options: ts.CompilerOptions,
): void {

	const testsLoaderProgram = ts.createProgram(fileNames, options);
	testsLoaderProgram.getTypeChecker();

	const testCaseFileName = `${__dirname}/../out/extensionLogic/testCase.ts`;
	fs.writeFileSync(`${__dirname}/../out/extensionLogic/tsconfig.json`, JSON.stringify({
		"compilerOptions": {
			"target": "ES2022",
			"module": "Node16",
			"moduleResolution": "Node16",
			"strict": true,
			"strictFunctionTypes": false,
			"sourceMap": true,
			"noImplicitThis": true,
			"paths": {
				"#dist": [`${__dirname}/../../dist/index.d.ts`],
			}
		},
		"include": [testCaseFileName],
	}));

	const defaultImports = `
import * as t from '#dist';
import * as helpers from '${__dirname}/../helpers.js';
`;
	fs.writeFileSync(testCaseFileName, defaultImports);

	let currentTestCase: BaseTestCase | undefined;
	let output: TestCase[] = [];

	const sourceFileNames = (function*() {
		yield* testsLoaderProgram.getRootFileNames();
	})();

	const testCases = (function* () {
		for (const sourceFileName of sourceFileNames) {
			const sourceFile = testsLoaderProgram.getSourceFile(sourceFileName)!;
			for (const statement of sourceFile.statements) {
				if (!ts.isExportAssignment(statement)) {
					continue;
				}
				const asExpression = statement.expression;
				if (!ts.isAsExpression(asExpression)) {
					throw new Error("Expected array literal expression");
				}
				const testsArray = asExpression.expression;
				if (!ts.isArrayLiteralExpression(testsArray)) {
					throw new Error(`Got ${ts.SyntaxKind[testsArray.kind]} instead of array literal`);
				}
				yield [testsArray, sourceFile.fileName] as const;
			}
		}
	})();

	const watch = watchMain(
		() => async (program) => {
			if (currentTestCase) {
				output.push(await evaluateTestCase(program.getProgram()));
			}
			queueTestCase();
		},
		(diagnostic) => {},
	);

	function queueTestCase() {

		const testCase = testCases.next();
		if (testCase.done) {

			watch.close();

			const failed = reportErrors();

			process.exit(failed ? 1 : 0);
		}

		const [nodes, fileName] = testCase.value!;
		console.log(`Evaluating ${fileName}...`);

		writeTestCase(nodes, fileName);
	}

	function reportErrors(): boolean {
		let failed = false;
		for (const testCase of output) {
			for (const result of testCase.results) {
				if (!result.passed) {
					failed = true;
					console.error(`TS says ${result.source} does ${!result.groundTruth ? 'not ' : ''}extend ${result.target}`);
				}
				if (result.expected !== undefined && result.expected !== result.groundTruth) {
					console.error(`Expected ${result.source} to ${result.expected ? '' : 'not '}extend ${result.target}`);
				}
			}
		}
	
		fs.writeFileSync('extensionLogicResults.json', JSON.stringify(output, null, 2));

		if (typePairs.length) {
			console.error('\nThere were type pairs that were not tested:');
			for (const [source, target] of typePairs) {
				console.error(`- ${source.name} and ${target.name}`);
			}
			failed = true;
		}

		return failed;
	}

	function writeTestCase(nodes: ts.ArrayLiteralExpression, fileName: string) {

		if (!ts.isArrayLiteralExpression(nodes)) {
			return;
		}

		const types: (readonly [string, string, boolean | undefined])[] = nodes.elements.map((node) => {

			if (!ts.isArrayLiteralExpression(node)) {
				throw new Error(`Expected array literal expression, got ${ts.SyntaxKind[node.kind]}`);
			}

			if (![2, 3].includes(node.elements.length)) {
				throw new Error(`Expected array of length 3, got ${node.elements.length}`);
			}

			return [
				node.elements[0].getText(),
				node.elements[1].getText(),
				node.elements[2] ? node.elements[2].getText() === 'true' : undefined,
			] as const;
		});

		const testCaseSource = `
${defaultImports}
const sources = [${types.map(([source]) => source).join(', ')}] as const;
const targets = [${types.map(([_, target]) => target).join(', ')}] as const;
type groundTruth = readonly [${types.map((_, index) => (
	`t.TypeOf<typeof sources[${index}]> extends t.TypeOf<typeof targets[${index}]> ? true : false`
)).join(', ')}];
`;

		currentTestCase = {
			fileName,
			results: types.map(([source, target, expected]) => ({
				source: source,
				target: target,
				expected: expected,
			})),
		};

		fs.writeFileSync(testCaseFileName, testCaseSource);
	}

	async function evaluateTestCase(evaluator: ts.Program): Promise<TestCase> {

		const testsJs: [t.Type<unknown>, t.Type<unknown>, boolean][] = (await import(currentTestCase!.fileName)).default;

		const checker = evaluator.getTypeChecker();
		for (const node of evaluator.getSourceFile(testCaseFileName)?.getChildAt(0).getChildren() ?? []) {

			if (!currentTestCase) {
				throw new Error("Expected currentTestCase to be set");
			}

			if (ts.isTypeAliasDeclaration(node)) {

				const typeNode = node.type;
				if (!ts.isTypeOperatorNode(typeNode)) {
					throw new Error("Expected operator type node");
				}

				const tupleType = typeNode.type;
				if (!ts.isTupleTypeNode(tupleType)) {
					throw new Error("Expected tuple type node");
				}

				const evaluated: TestCase = {
					...currentTestCase,
					results: [],
				}
				currentTestCase.results.forEach((result, index) => {

					const [source, target] = testsJs[index];

					// cross out the type combination from our list of type pairs
					const SourceCtor = Object.getPrototypeOf(source).constructor as t.TypeCtor;
					const TargetCtor = Object.getPrototypeOf(target).constructor as t.TypeCtor;
					const pairIndex = typePairs.findIndex(([s, t]) => s === SourceCtor && t === TargetCtor);
					if (pairIndex !== -1) {
						typePairs.splice(pairIndex, 1);
					}

					// get library result
					const libraryResult = t.isExtensionOf(source, target);

					// run the test
					const groundTruthString = checker.typeToString(checker.getTypeFromTypeNode(tupleType.elements[index]));
					const groundTruth = groundTruthString === 'true';
					evaluated.results[index] = {
						...result,
						groundTruth,
						passed: groundTruth === libraryResult || groundTruthString === 'boolean',
					};
				});

				return evaluated;
			}
		};

		throw new Error("Expected type alias declaration in test case source");  }
}

const formatHost: ts.FormatDiagnosticsHost = {
	getCanonicalFileName: path => path,
	getCurrentDirectory: ts.sys.getCurrentDirectory,
	getNewLine: () => ts.sys.newLine
};

function watchMain(
	createPostProgramCreate: (
		origPostProgramCreate: (program: ts.SemanticDiagnosticsBuilderProgram) => void
	) => (program: ts.SemanticDiagnosticsBuilderProgram) => void,
	reportWatchStatusChanged: ts.WatchStatusReporter,
): ts.Watch<ts.SemanticDiagnosticsBuilderProgram> {

	const configPath = ts.findConfigFile(
		/*searchPath*/ "./",
		ts.sys.fileExists,
		`${__dirname}/../out/extensionLogic/tsconfig.json`,
	);
	if (!configPath) {
		throw new Error("Could not find a valid 'tsconfig.json'.");
	}

	const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

	const host = ts.createWatchCompilerHost(
		configPath,
		{},
		ts.sys,
		createProgram,
		reportDiagnostic,
		reportWatchStatusChanged
	);

	const origPostProgramCreate = host.afterProgramCreate;

	host.afterProgramCreate = createPostProgramCreate(origPostProgramCreate!);

	return ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
	console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText( diagnostic.messageText, formatHost.getNewLine()));
}
