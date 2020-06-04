/**
 * Created by user on 2018/5/21/021.
 */

import * as crossSpawn from 'cross-spawn-extra';
import * as path from 'path';
import gitDiffIDNovelID, { gitDiffStagedFile } from '../lib/git';
import { freeGC, trimTxtLine } from '../lib/util';
import ProjectConfig from '../project.config';
import Bluebird = require('bluebird');
import * as fs from 'fs-extra';
import { array_unique } from '../lib/func';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import * as yargs from 'yargs';
import { console } from 'debug-color2';
import prettyuse = require('prettyuse');
import * as novelGlobby from 'node-novel-globby';
import * as iconv from 'iconv-jschardet';
import { tw2cn_min, cn2tw_min, tableCn2TwDebug, tableTw2CnDebug } from 'cjk-conv/lib/zh/convert/min';
import escapeGlob = require('glob-escape');
import { do_cn2tw_min } from './lib/conv';
import novelText from 'novel-text';
import { contextEmpty, loadFileAutoDecode } from '../lib/fs/load';
import { sortTree } from 'node-novel-globby/lib/glob-sort';
import { fixGlobBug, sortTreeUnique } from './lib/util';
import { defaultPatternsExclude } from 'node-novel-globby/lib/options';

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
else if (0)
{
	throw new Error();
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

		let files = gitDiffStagedFile(cwd_path);

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
			throwEmpty: false,
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

		console.log(files);

		globby_options.nonull = true;

		let do_cn2tw_min_options: Parameters<typeof do_cn2tw_min>[1] = {};

		if (cli.unsafe)
		{
			do_cn2tw_min_options.safe = false;
		}

		let ls = await Bluebird
			.mapSeries(novelGlobby
				.globbyASync([
					...escapeGlob(files),
					'!**/*.md',
					'!*.md',
				], globby_options)
				.tap(async function (ls)
				{

				})
				.then(novelGlobby.returnGlobList)
				.then(ls => {
					let ls2 = fixGlobBug(files, {
						cwd: cwd_path,
						exclude: [
							...defaultPatternsExclude,
							'!**/*.md',
							'!*.md',
						]
					})
						.map(v => path.join(globby_options.cwd, v))
					;

					ls = sortTreeUnique([...ls, ...ls2]);

					return ls
				})
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

					let _t = trimTxtLine(do_cn2tw_min(novelText.toStr(_t_old), do_cn2tw_min_options));

					let changed = _t != _t_old;

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
