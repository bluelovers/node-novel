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

Promise
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		let cwd_path = path.join(ProjectConfig.dist_novel_root, pathMain, novelID);

		let meta: IMdconfMeta;

		console.info(pathMain, novelID);

		let _files = await novelGlobby.globbyASync([
			'**/*.txt',
		], {
			cwd: cwd_path,
			//absolute: true,
			useDefaultPatternsExclude: true,
		}).mapSeries(async function (file, index, arrayLength)
		{

			const full_path = path.join(cwd_path, file);

			const old = await fs.readFile(full_path, 'utf8');

			return NovelSegmentCli
				.processText(old)
				.tap(async function (text)
				{
					let msg = `[${index+1}/${arrayLength}] ${file}`;

					if (text.length && old !== text)
					{
						await fs.writeFile(full_path, text);

						console.success(msg);
					}
					else if (text.length)
					{
						console.gray(msg);
					}
					else
					{
						console.red(msg);
					}

					//console.debug(prettyuse());
					//freeGC();
				})
				.thenReturn(file)
			;

		});

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

