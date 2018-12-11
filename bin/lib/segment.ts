/**
 * Created by user on 2018/12/8/008.
 */

import Bluebird = require('bluebird');
import * as NovelSegmentCli from 'novel-segment-cli';
import * as path from "path";
import * as novelGlobby from 'node-novel-globby/g';
import { IOptionsWithReturnGlobList } from 'node-novel-globby/lib';
import { crlf } from 'crlf-normalize';
import { console } from 'debug-color2';
import * as fs from 'fs-extra';

export function _getSegment()
{
	NovelSegmentCli.enableDebug(true);

	return Bluebird.resolve()
		.tap(async function ()
		{
			await NovelSegmentCli.getSegment({
				ttl: 3600 * 1000,
			})
		})
	;
}

export function globSegment(pattern: string[], options: IOptionsWithReturnGlobList & {
	cwd: string,
})
{
	let cwd_path = options.cwd;

	let cache_states = {
		changed: 0,
		empty: 0,
		skip: 0,
		total: 0,
	};

	_getSegment()
		.tap(async function ()
		{
			let _files = await novelGlobby.globbyASync(pattern, {
					...options,
					cwd: cwd_path,
					//absolute: true,
					useDefaultPatternsExclude: true,
				}).mapSeries(async function (file, index, arrayLength)
				{
					const full_path = path.join(cwd_path, file);

					const old = await NovelSegmentCli.readFile(full_path, {
						disableWarn: true,
					}).then(v => crlf(v.toString()));

					let n = arrayLength.toString().length;

					return NovelSegmentCli
						.processText(old)
						.tap(async function (text)
						{
							let msg = `[${(index+1).toString().padStart(n, '0')}/${arrayLength}] ${file}`;

							if (text.length && old !== text)
							{
								await fs.writeFile(full_path, text);

								cache_states.changed++;

								console.success(msg);
							}
							else if (text.length)
							{
								cache_states.skip++;

								console.gray(msg);
							}
							else
							{
								cache_states.empty++;

								console.red(msg);
							}

							//console.debug(prettyuse());
							//freeGC();
						})
						.thenReturn(file)
						;
				})
				.tap(function (ls)
				{
					cache_states.total = ls.length;

					console.dir(cache_states);
				})
			;
		})

}
