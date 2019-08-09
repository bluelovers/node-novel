/**
 * Created by user on 2019/5/29.
 */

// @ts-ignore
/// <reference types="mocha" />
// @ts-ignore
/// <reference types="benchmark" />
// @ts-ignore
/// <reference types="chai" />
// @ts-ignore
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync, SymbolLogOutput } from './_local-dev';
import testCaseList from './data/regexp';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: Mocha.Test;

	beforeEach(function ()
	{
		// @ts-ignore
		currentTest = this.currentTest;

		delete currentTest[SymbolLogOutput];

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	afterEach(function ()
	{
		let out = currentTest[SymbolLogOutput];
		let t = typeof out;

		if (t === 'string')
		{
			console.log(`----------`);
			console.log(out);
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

		testCaseList
			.forEach((testCase) => {

				// @ts-ignore
				it(util.inspect(testCase['0']), function ()
				{
					//console.log('it:inner', currentTest.title);
					//console.log('it:inner', currentTest.fullTitle());

					let actual = testCase['1'].replace(...(testCase[0] as [string, string]));

					let expected = testCase[2];

					currentTest[SymbolLogOutput] = actual;

					if (typeof expected === 'string')
					{
						expect(actual).to.includes(expected);
					}
					else if (typeof expected === 'function')
					{
						expect(expected(actual, testCase)).to.ok;
					}
					else
					{
						expect(actual).to.match(expected);
					}

				});

			})
		;

	});
});
