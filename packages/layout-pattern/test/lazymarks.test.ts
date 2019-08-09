/**
 * Created by User on 2019/8/9.
 */

// @ts-ignore
/// <reference types="mocha" />
// @ts-ignore
/// <reference types="benchmark" />
// @ts-ignore
/// <reference types="chai" />
// @ts-ignore
/// <reference types="node" />

// @ts-ignore
import { chai, relative, expect, path, assert, util, mochaAsync, SymbolLogOutput } from './_local-dev';

import novelText from '@node-novel/layout';
import lazymarks from '../lib/core/pattern/index';
import { testLazymarks } from './data/lazymarks.data';
import * as NodeUtil from 'util';

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
	describe(`test lazymarks`, () =>
	{

		testLazymarks.forEach(testCase => {

			// @ts-ignore
			it(NodeUtil.inspect(testCase.title || testCase.txt), function ()
			{
				//console.log('it:inner', currentTest.title);
				//console.log('it:inner', currentTest.fullTitle());

				let actual = novelText.replace_words(testCase.txt, novelText._words2(testCase.words)).value;

				currentTest[SymbolLogOutput] = actual;

				expect(actual).to.be.not.deep.equal(testCase.txt);

				if (!Array.isArray(testCase.match))
				{
					testCase.match = [testCase.match];
				}

				testCase.match.forEach(expected => {

					expect(actual).to.match(expected);

				});

			});

		});




	});
});
