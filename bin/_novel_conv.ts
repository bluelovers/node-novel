/**
 * Created by user on 2018/5/21/021.
 */

import * as crossSpawn from 'cross-spawn';
import * as path from 'path';
import gitDiffIDNovelID from '../lib/git';
import { freeGC } from '../lib/util';
import ProjectConfig from '../project.config';
import Promise = require('bluebird');
import * as fs from 'fs-extra';
import { array_unique } from '../lib/func';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import * as yargs from 'yargs';
import { console } from 'debug-color2';
import prettyuse = require('prettyuse');
import * as novelGlobby from 'node-novel-globby';
import * as iconv from 'iconv-jschardet';
import { tw2cn_min, cn2tw_min, tableCn2TwDebug, tableTw2CnDebug } from 'cjk-conv/lib/zh/convert/min';

let cli = yargs
	.argv
;

let arr_ids = gitDiffIDNovelID(ProjectConfig.dist_novel_root);

let _cache_file = path.join(
	ProjectConfig.temp_root,
	path.basename(__filename) + '.json',
);

if (arr_ids.length == 1)
{
	fs.outputJSONSync(_cache_file, arr_ids);
}
else if (1)
{
	throw new Error();
}
else if (arr_ids.length == 0 && fs.existsSync(_cache_file))
{
	arr_ids = fs.readJSONSync(_cache_file);
	console.info(`使用上次執行的目錄`, arr_ids);
}

Promise
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		let cwd_path = path.join(ProjectConfig.dist_novel_root, pathMain, novelID);

		let meta: IMdconfMeta;

		if (fs.existsSync(path.join(cwd_path, 'README.md')))
		{
			meta = await fs.readFile(path.join(cwd_path, 'README.md'))
				.then(mdconf_parse)
		}
		else if (fs.existsSync(path.join(cwd_path, 'meta.md')))
		{
			meta = await fs.readFile(path.join(cwd_path, 'meta.md'))
				.then(mdconf_parse)
		}

		if (!meta)
		{
			throw new Error([pathMain, novelID].join())
		}

		let globby_patterns: string[];
		let globby_options: novelGlobby.IOptions = {
			cwd: cwd_path,
			useDefaultPatternsExclude: true,
			absolute: true,
		};

		{
			[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
		}

		let _last_empty: string[] = [];

		let TIME_LABEL = novelID;

		let STAT_CACHE = {
			all: 0,
			file: 0,
			changed: 0,
			skip: 0,
			error: 0,
		};

		console.info(pathMain, novelID);

		console.time(TIME_LABEL);

		let ls = await Promise
			.mapSeries(novelGlobby
				.globbyASync(globby_patterns, globby_options)
				.tap(async function (ls)
				{

				})
				.then(novelGlobby.returnGlobList)
				, async function (file, index, len)
				{
					let ext = '.txt';

					let name = path.basename(file, ext);
					let file_dir = path.relative(cwd_path, path.dirname(file));

					let currentFile = path.join(file_dir, name);

					let _t_old: string;

					// @ts-ignore
					_t_old = await fs.readFile(file);

					if (_t_old.toString() === '')
					{
						_last_empty.push(currentFile);

						//console.gray(currentFile, '此檔案無內容');

						STAT_CACHE.skip++;

						return currentFile;
					}
					else
					{
						if (_last_empty.length)
						{
							_last_empty
								.forEach(function (currentFile)
								{
									console.red(currentFile, '此檔案無內容');
								})
							;

							_last_empty = [];
						}

						let chk = iconv.detect(_t_old);

						if (chk.encoding != 'UTF-8' && chk.encoding != 'ascii')
						{
							console.red(currentFile, '此檔案可能不是 UTF8 請檢查編碼或利用 MadEdit 等工具轉換', chk);
						}
					}

					// @ts-ignore
					_t_old = _t_old.toString();

					let _t = cn2tw_min(_t_old);

					let changed = _t != _t_old;

					if (!_t.replace(/\s+/g, ''))
					{
						STAT_CACHE.error++;

						console
							.yellow
							.bgRed(currentFile, index, len)
						;

						await fs.outputFile(file, '');
					}
					else if (changed)
					{
						console[changed ? 'log' : 'red'](currentFile, index, len);

						await fs.outputFile(file, _t);
					}
					else
					{
						console[changed ? 'log' : 'red'](currentFile, index, len);
					}

					if (changed)
					{
						STAT_CACHE.changed++;
					}

					return currentFile;
				})
			.then(function (ls)
			{
				if (_last_empty.length)
				{
					_last_empty
						.forEach(function (currentFile)
						{
							console.grey(currentFile, '此檔案無內容');
						})
					;

					_last_empty = [];
				}

				STAT_CACHE.all = ls.length;

				STAT_CACHE.file = STAT_CACHE.all - STAT_CACHE.skip;

				return ls;
			})
			.tap(function ()
			{
				console.debug(prettyuse());
				console.debug(STAT_CACHE);
			})
		;

		console.timeEnd(TIME_LABEL);

		console.success(pathMain, novelID);
	})
;
