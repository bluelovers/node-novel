/**
 * Created by user on 2018/12/31/031.
 */

import Bluebird = require('bluebird');
import prettyuse = require('prettyuse');
import { console } from 'debug-color2';
import * as fs from 'fs-extra';
import * as novelGlobby from 'node-novel-globby/g';
import { IMdconfMeta, mdconf_parse } from 'node-novel-info';
import * as path from "path";
import { zhRegExp } from '../../../../nodejs-yarn/regexp-workspaces/packages/regexp-cjk';
import { _word_zh_all, lazymarks } from '../../lib/locales/lib/index';
import ProjectConfig from '../../project.config';

console.enabledColor = true;

console.inspectOptions = console.inspectOptions || {};
console.inspectOptions.colors = true;

export interface IGetNovel<T = string>
{
	pathMain: string;
	novelID: string;
	globby_patterns: string[];
	globby_options: any;
	meta: IMdconfMeta;
	cwd_path: string;
	callback: IGetNovelCallback<T>;
}

export interface IGetNovelCallbackData<T>
{
	file: string;
	index: number;
	len: number;
	basename: string;
	ext: string;
	name: string;
	file_dir: string;
	currentFile: string;
	idfile: string;

	inputOptions: IGetNovel<T>,

	_last_empty: ICacheLastEmpty,
	STAT_CACHE: ICacjeStat,
}

export interface IGetNovelCallback<T>
{
	(data: IGetNovelCallbackData<T>): T
}

export interface ICacjeStat
{
	all: number,
	file: number,
	changed: number,
	skip: number,
	error: number,
}

export type ICacheLastEmpty = string[];

export function getNovel<T>(inputOptions: {
	pathMain: string,
	novelID: string,

	patterns?: string[],

	callback: IGetNovelCallback<T>,
})
{
	return Bluebird.resolve()
		.then(async function ()
	{
		let { pathMain, novelID, patterns, callback } = inputOptions;

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

		let globby_patterns: string[] = patterns || undefined;
		let globby_options: novelGlobby.IOptions = {
			cwd: cwd_path,
			useDefaultPatternsExclude: true,
			absolute: true,
		};

		{
			[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
		}

		if (patterns && patterns.length)
		{
			globby_patterns.push(...patterns);
		}

		return {
			pathMain, novelID,

			globby_patterns, globby_options,

			meta,
			cwd_path,

			callback,
		} as IGetNovel<T>
	})
	;
}

export function globNovel<T>(inputOptions: IGetNovel<T>)
{
	let {
		pathMain, novelID,

		globby_patterns, globby_options,

		meta,
		cwd_path,

		callback,
	} = inputOptions;

	console.info(pathMain, novelID);

	let TIME_LABEL = novelID;
	console.time(TIME_LABEL);

	let _last_empty: ICacheLastEmpty = [];

	let STAT_CACHE: ICacjeStat = {
		all: 0,
		file: 0,
		changed: 0,
		skip: 0,
		error: 0,
	};

	//console.log(globby_patterns);

	return Bluebird
		.mapSeries(novelGlobby
			.globbyASync(globby_patterns, globby_options), function (file, index, len)
		{
			let basename = path.basename(file);

			let ext = path.extname(basename);

			let name = path.basename(basename, ext);
			let file_dir = path.relative(cwd_path, path.dirname(file));

			let currentFile = path.join(file_dir, name);

			let idfile = currentFile;

			if (ext != '.txt')
			{
				idfile += ext;
			}

			return callback({
				file, index, len,

				basename,

				ext,
				name,
				file_dir,
				currentFile,

				idfile,

				inputOptions,

				_last_empty,
				STAT_CACHE,
			})
		})
		.tap(function (ls)
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
		.finally(function ()
		{
			console.timeEnd(TIME_LABEL);
		})
		.tap(function ()
		{
			console.success(pathMain, novelID);
		})
}

export let CACHE_REGEXP_LIST_001 = [] as [RegExp, string | ((...argv: string[]) => string)][];

export function _replace_list_001()
{
	if (!CACHE_REGEXP_LIST_001.length)
	{
		CACHE_REGEXP_LIST_001 = [
			..._word_zh_all([

				...lazymarks['c000'],
				...lazymarks['c050'],
				...lazymarks['c100'],

			]).map(function (data)
			{
				if (!(
					(data[0] instanceof RegExp)
						// @ts-ignore
					|| (data[0] instanceof zhRegExp)
				))
				{
					data[0] = new zhRegExp(data[0], 'ig');
				}

				return data;
			}) as typeof CACHE_REGEXP_LIST_001,

		];

		//console.log(CACHE_REGEXP_LIST);
	}

	CACHE_REGEXP_LIST_001.forEach(data =>
	{

		// @ts-ignore
		if ((data[0] instanceof RegExp) || (data[0] instanceof zhRegExp))
		{
			data[0].lastIndex = 0;
		}
	});

	return CACHE_REGEXP_LIST_001;
}
