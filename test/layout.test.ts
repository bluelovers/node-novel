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

import { chai, relative, expect, path, assert, util, mochaAsync, SymbolLogOutput } from './_local-dev';
import { fsReadFile, getCwdPaths, getNovelMetaCache, handleContext, searchMyLocalesID } from '../src/core';
import { getLocales, getLocalesCache } from '../src/util';
import novelText from '@node-novel/layout';
import Bluebird = require('bluebird');
import escapeStringRegexp = require('escape-string-regexp');
import { ITSUnpackedPromiseLike, ITSRequiredWith } from 'ts-type';

const inited = true;

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

		([

			{
				pathMain: 'syosetu',
				novelID: '乙女ゲー世界はモブに厳しい世界です',
				targetFile: '00040_第五章/00350_幕間　歐尼醬.txt',

				match: /莉維亞：「歐、歐尼醬？」\n安潔：「──歐尼桑嘛」/,

			},

			{
				title: null as string,
				pathMain: 'syosetu',
				novelID: '乙女ゲー世界はモブに厳しい世界です',
				targetFile: '00030_第四章/00010_序章.txt',

				match: /這樣的事件」\n「是特典嗎/,

			},

			{
				title: null as string,
				pathMain: 'syosetu',
				novelID: '乙女ゲー世界はモブに厳しい世界です',
				targetFile: '00040_第五章/00220_爆破.txt',

				match: /那樣子──」\n『勝了會高興嗎/,

			},

		] as ITestTargetNovelFileCaseArray).forEach(testcase => {

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

function fixTargetFile(pathMain: string, novelID: string, targetFile: string)
{
	return targetFile
		.replace(/^dist_novel\//, '')
		.replace(new RegExp(`^${escapeStringRegexp(pathMain)}(?:_out)?\\\/`, 'u'), '')
		.replace(new RegExp(`^${escapeStringRegexp(novelID)}\\\/`, 'u'), '')
		;
}

interface ITestTargetNovelFileCaseReturn<T = unknown>
{
	(ret: ITSUnpackedPromiseLike<ReturnType<typeof testTargetNovelFile>>): PromiseLike<T>
}

interface ITestTargetNovelFileCase<F extends ITestTargetNovelFileCaseReturn = ITestTargetNovelFileCaseReturn>
{
	title?: string,
	pathMain: string,
	novelID: string,
	targetFile: string,

	/**
	 * 簡易配對 如需複雜一點的 請用 cb
	 */
	match?: RegExp,

	cb?: ITestTargetNovelFileCaseReturn,
}

type ITestTargetNovelFileCaseArray = (ITSRequiredWith<ITestTargetNovelFileCase, 'cb'> | ITSRequiredWith<ITestTargetNovelFileCase, 'match'>)[]

function testTargetNovelFile(pathMain: string, novelID: string, targetFile: string, currentTest)
{
	return Bluebird.resolve()
		// @ts-ignore
		.bind(this)
		.then(async function()
		{
			targetFile = fixTargetFile(pathMain, novelID, targetFile);

			if (!pathMain || !novelID || !targetFile)
			{
				throw new TypeError();
			}

			let { cwd_out, cwd } = getCwdPaths(pathMain, novelID);

			const targetCwd = cwd;

			let file = path.join(targetCwd, targetFile);
			let meta = getNovelMetaCache(targetCwd);

			console.log('file:', path.relative(targetCwd, file));

			const { myLocales, myLocalesID } = getLocalesCache(searchMyLocalesID(meta, novelID), novelID);

			const _t_old = await fsReadFile(file)
				.then(ret => {
					return novelText.toStr(ret._t_old.toString())
				})
			;

			let { _t } = handleContext({ _t_old, inited, meta, myLocales });

			return {

				pathMain,
				novelID,
				targetFile,

				cwd_out,
				cwd,
				targetCwd,
				file,
				meta,
				myLocales,
				myLocalesID,

				/**
				 * 排版處理前文字內容
				 */
				_t_old,
				/**
				 * 排版處理後文字內容
				 */
				_t,

				currentTest,
			}
		})
		.tap(function (ret)
		{
			expect(ret._t).to.be.ok;
			expect(ret._t).to.be.not.deep.equal(ret._t_old);
		})
	;
}


