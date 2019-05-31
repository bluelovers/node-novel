/**
 * Created by User on 2019/5/31.
 */

// @ts-ignore
/// <reference types="mocha" />
// @ts-ignore
/// <reference types="benchmark" />
// @ts-ignore
/// <reference types="chai" />
// @ts-ignore
/// <reference types="node" />

import { expect, path, relative, SymbolLogOutput } from './_local-dev';
import {
	fixTargetFile,
	ITestTargetNovelFileCaseArray,
	ITestTargetNovelFileCaseReturn,
	testTargetNovelFile,
} from './lib/util';
import { testCaseArray } from './data/layout-check';



// @ts-ignore
describe(relative(__filename), () =>
{
	// @ts-ignore
	let currentTest: Mocha.Test;

	// @ts-ignore
	beforeEach(function ()
	{
		// @ts-ignore
		currentTest = this.currentTest;

		delete currentTest[SymbolLogOutput];

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	afterEach(function ()
	{
		let out = currentTest[SymbolLogOutput];
		let t = typeof out;

		if (t === 'string')
		{
			console.log(`----------`);
			console.dir(out);
			console.log(`----------`);
		}
		else if (t === 'function')
		{
			out(currentTest)
		}
		else if (out != null)
		{
			console.dir(out);
		}

	});

	// @ts-ignore
	describe(`suite`, () =>
	{

		testCaseArray.forEach(testcase => {

			const { pathMain, novelID, cb = () => {} } = testcase;
			const targetFile = fixTargetFile(testcase.pathMain, testcase.novelID, testcase.targetFile);

			// @ts-ignore
			it(testcase.title || path.join(pathMain, novelID, targetFile), async function ()
			{

				await testTargetNovelFile.call(this, pathMain, novelID, targetFile, currentTest)
					.tap(ret => {

						if (testcase.match)
						{
							expect(ret._t).to.match(testcase.match);
						}

					})
					.then(cb)
				;

			});

		});

	});
});



