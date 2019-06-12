/**
 * Created by user on 2019/6/1.
 */

import { fsReadFile, getCwdPaths, getNovelMetaCache, handleContext, searchMyLocalesID } from '../../src/core';
import { expect, path } from '../_local-dev';
import { getLocalesCache } from '../../src/util';
import novelText from '../../../../nodejs-yarn/ws-novel3/packages/layout';
import { ITSRequiredWith, ITSUnpackedPromiseLike } from 'ts-type';
import Bluebird = require('bluebird');
import escapeStringRegexp = require('escape-string-regexp');

const inited = true;

export interface ITestTargetNovelFileCaseReturn<T = unknown>
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
	match?: RegExp | RegExp[],

	cb?: ITestTargetNovelFileCaseReturn,
}

export type ITestTargetNovelFileCaseArray = (ITSRequiredWith<ITestTargetNovelFileCase, 'cb'> | ITSRequiredWith<ITestTargetNovelFileCase, 'match'>)[]

export function testTargetNovelFile(pathMain: string, novelID: string, targetFile: string, currentTest)
{
	return Bluebird.resolve()
		// @ts-ignore
		.bind(this)
		.then(async function ()
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
				.then(ret =>
				{
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

export function fixTargetFile(pathMain: string, novelID: string, targetFile: string)
{
	return targetFile
		.replace(/^dist_novel\//, '')
		.replace(new RegExp(`^${escapeStringRegexp(pathMain)}(?:_out)?\\\/`, 'u'), '')
		.replace(new RegExp(`^${escapeStringRegexp(novelID)}\\\/`, 'u'), '')
		;
}


