/**
 * Created by user on 2018/10/6/006.
 */

import * as crossSpawn from 'cross-spawn-extra';
import * as path from 'path';
import gitDiffIDNovelID, { localesPath, searchLocalesID } from '../lib/git';
import { freeGC } from '../lib/util';
import ProjectConfig from '../project.config';
import Promise = require('bluebird');
import * as fs from 'fs-extra';
import { array_unique } from '../lib/func';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import * as yargs from 'yargs';
import { console } from 'debug-color2';
import prettyuse = require('prettyuse');
import * as novelGlobby from 'node-novel-globby/g';
import * as iconv from 'iconv-jschardet';
import { tw2cn_min, cn2tw_min, tableCn2TwDebug, tableTw2CnDebug } from 'cjk-conv/lib/zh/convert/min';

import * as NovelSegmentCli from 'novel-segment-cli';

let cli = yargs
	.argv
;

let arr_ids = gitDiffIDNovelID(ProjectConfig.dist_novel_root);

let _cache_file = path.join(
	ProjectConfig.temp_root,
	path.basename('_novel_run_git_diff.js') + '.json'
);

if (arr_ids.length == 0 && fs.existsSync(_cache_file))
{
	arr_ids = fs.readJSONSync(_cache_file);
	console.info(`使用上次執行的目錄`, arr_ids);
}

if (arr_ids.length != 1)
{
	throw new Error();
}
else if (arr_ids.length === 1)
{
	fs.outputJSONSync(_cache_file, arr_ids);
}

Promise
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		let cwd_path = path.join(ProjectConfig.dist_novel_root, pathMain, novelID);

		let meta: IMdconfMeta;

		console.info(pathMain, novelID);

		NovelSegmentCli.enableDebug(true);

		await NovelSegmentCli.getSegment({
			ttl: 3600 * 1000,
		});

		//process.exit();

		//await NovelSegmentCli.removeCache();

		let cache_states = {
			changed: 0,
			empty: 0,
			skip: 0,
			total: 0,
		};

		let _files = await novelGlobby.globbyASync([
			'**/*.txt',
		], {
			cwd: cwd_path,
			//absolute: true,
			useDefaultPatternsExclude: true,
		}).mapSeries(async function (file, index, arrayLength)
		{
			const full_path = path.join(cwd_path, file);

			const old = await NovelSegmentCli.readFile(full_path).then(v => v.toString());

			let n = arrayLength.toString().length;

			return NovelSegmentCli
				.processText(old, {
					disableWarn: true,
				})
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

		return _files;

		process.exit();

		return crossSpawn.async('npx', [
			'--expose-gc',
			'--max-old-space-size=2048',
			'novel-segment-cli',
			'--createDir', 'false',
			//'--outDir', cwd_path,
			//'--glob', '**/*.txt',
			//'--glob', '!**/*.raw',
			//'--glob', '!**/*.raw/**',
			_files,
		], {
			cwd: cwd_path,
			stdio: 'inherit',
		})
	})
	;

