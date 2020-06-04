/**
 * Created by user on 2018/5/21/021.
 */

import path from 'path';
import gitDiffIDNovelID from '../lib/git';
import ProjectConfig from '../project.config';
import Bluebird from 'bluebird';
import fs from 'fs-extra';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import yargs from 'yargs';
import { console } from 'debug-color2';
import prettyuse from 'prettyuse';
import * as novelGlobby from 'node-novel-globby';
import util from 'util';
import { do_cn2tw_min } from './lib/conv';
import { contextEmpty, loadFileAutoDecode } from '../lib/fs/load';

let cli = yargs
	.option('unsafe', {
		boolean: true,
	})
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
	throw new Error(util.inspect(arr_ids));
}
else if (arr_ids.length == 0 && fs.existsSync(_cache_file))
{
	arr_ids = fs.readJSONSync(_cache_file);
	console.info(`使用上次執行的目錄`, arr_ids);
}

Bluebird
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

		let do_cn2tw_min_options: Parameters<typeof do_cn2tw_min>[1] = {};

		if (cli.unsafe)
		{
			do_cn2tw_min_options.safe = false;
		}

		let ls = await Bluebird
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

					const idfile = currentFile;

					let _t_old: string = await loadFileAutoDecode(file, {
						idfile,
					});

					if (contextEmpty(_t_old))
					{
						_last_empty.push(currentFile);

						//console.gray(currentFile, '此檔案無內容');

						STAT_CACHE.skip++;

						return idfile;
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
					}

					// @ts-ignore
					_t_old = _t_old.toString();

					let _t = _t_old;

					let changed = true;

					if (!_t.replace(/\xa0\s+　/g, ''))
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
