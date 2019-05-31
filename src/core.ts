/**
 * Created by user on 2019/5/31.
 */

import * as deepmerge from 'deepmerge-plus';
//import * as execall from 'execall';
//import execall = require('execall2');
import * as fs from 'fs-extra';
import * as JSON from 'json5';
import { IMdconfMeta, mdconf_parse } from 'node-novel-info';
//import novelText from 'novel-text';
import path from 'upath2';
import { loadLocales, locales_def } from '../lib/i18n';
import { console } from 'debug-color2';
import * as projectConfig from '../project.config';
import novelText from '@node-novel/layout';
import * as JsDiff from 'diff';
import Bluebird = require('bluebird');

const ProjectConfig = projectConfig;

console.enabledColor = true;

const mapMyLocalesIDCache = new Map<{
	meta: IMdconfMeta,
	novelID: string,
}, string>();

const mapNovelMetaCache = new Map<string[], IMdconfMeta>();

const _localesPath = path.join(ProjectConfig.project_root, './lib/locales');

export type IMyLocales = ReturnType<typeof loadLocales>;

export function getCwdPaths(pathMain: string, novelID: string, _projectConfig: {
	dist_novel_root: string
} = projectConfig)
{
	let cwd = path.join(_projectConfig.dist_novel_root, pathMain, novelID);
	let cwd_out = path.join(_projectConfig.dist_novel_root, `${pathMain}_out`, novelID);

	return {
		cwd,
		cwd_out,
	}
}

export function getNovelMetaCache(paths: string[] | string)
{
	if (!Array.isArray(paths))
	{
		paths = [paths];
	}

	if (mapNovelMetaCache.has(paths))
	{
		return mapNovelMetaCache.get(paths)
	}

	let meta = getNovelMeta(paths);

	mapNovelMetaCache.set(paths, meta);

	return meta;
}

export function getNovelMeta(paths: string[] | string): IMdconfMeta
{
	if (!Array.isArray(paths))
	{
		paths = [paths];
	}

	let meta: IMdconfMeta;

	for (let cwd_out of paths)
	{
		if (fs.pathExistsSync(path.join(cwd_out, 'meta.md')))
		{
			meta = mdconf_parse(fs.readFileSync(path.join(cwd_out, 'meta.md')))
		}
		else if (fs.pathExistsSync(path.join(cwd_out, 'README.md')))
		{
			meta = mdconf_parse(fs.readFileSync(path.join(cwd_out, 'README.md')))
		}

		if (meta)
		{
			break;
		}
	}

	return deepmerge({
		options: {
			textlayout: {},
		},
	}, meta);
}

export function stringify(v)
{
	return JSON.stringify(v).replace(/^"|"$/g, '');
}

export function my_words(html: Buffer | string, myLocales: IMyLocales, inited: boolean)
{
	html = html.toString();

	let sp = locales_def.sp || '#_@_#';

	let words = [];
	let arr = [];

	words = words.concat(myLocales.words || []);
	arr = arr.concat(myLocales.words_arr || []);

	words = words.concat(locales_def.words || []);
	arr = arr.concat(locales_def.words_arr || []);

	if (!inited)
	{
		inited = true;

		/*
		fs.outputJSON(path.join(__dirname, './temp/words.json'), words, {
			spaces: "\t",
		});
		*/

		//console.log(novelText._words_r1);

		fs.outputFile(path.join(projectConfig.project_root, 'test', './temp/words.json'), JSON.stringify(words, function (k,
			v,
		)
		{
			if (v instanceof RegExp)
			{
				//return `/${v.source}/${v.flags}`;
				return v.toString();
			}
			else if (typeof v == 'function')
			{
				return v.toString();
			}

			return v;
		}, '\t'));
	}

	words = words.concat(myLocales.words || []);
	arr = arr.concat(myLocales.words_arr || []);

	words = novelText._words1(arr, words);
	words = novelText._words2(words);

	let ret = novelText.replace_words(html, words);

	html = ret.value;

	return {
		_t: html,
		inited,
	};
}

export function handleContext(input: {
	_t_old: Buffer | string,
	meta: IMdconfMeta,
	inited: boolean,
	myLocales: IMyLocales,
})
{
	let { _t_old, inited, meta, myLocales } = input;

	let _t = novelText.toStr(_t_old);

	if (meta.options.textlayout && !meta.options.textlayout.allow_lf2)
	{
		_t = novelText.reduceLine(_t, meta.options.textlayout || {});
	}

	({ _t, inited } = my_words(_t, myLocales, inited));

	_t = novelText.textlayout(_t, meta.options.textlayout || {});

	({ _t, inited } = my_words(_t, myLocales, inited));

	_t = novelText.replace(_t, {
		words: true,
	});

	_t = novelText.trim(_t);

	return {
		_t_old,
		inited,
		meta,
		myLocales,
		_t,
	}
}

export async function fsReadFile(file: string, cb?: (_t_old: Buffer) => unknown)
{
	const _t_old = await fs.readFile(file);

	let _cb_ret = cb && await cb(_t_old);

	return {
		_t_old,
		_cb_ret,
	}
}

export function isEmptyFile(_t_old: Buffer | string)
{
	return (!_t_old.length || _t_old.toString() === '');
}

export function diffPatch(name: string, _t_old: Buffer | string, _t: string)
{
	return JsDiff.createPatch(name, novelText.toStr(_t_old), _t, null, null, {
		newlineIsToken: true,
	})
}

export function searchMyLocalesID(meta: IMdconfMeta, novelID: string, localesPath: string = _localesPath): string
{
	const _key = {
		meta,
		novelID,
	};

	if (mapMyLocalesIDCache.has(_key))
	{
		return mapMyLocalesIDCache.get(_key)
	}

	let myLocalesID = searchLocalesID([
		meta.options && meta.options.novel && meta.options.novel.pattern,

		novelID,

		meta.novel.title,

		meta.novel.title_short,
		meta.novel.title_zh,
		meta.novel.title_jp,

		// @ts-ignore
		meta.novel.title_output,

		/**
		 * 依據系列名稱來自動選擇檔案
		 */
		meta.novel.series && meta.novel.series.name,
		meta.novel.series && meta.novel.series.name_short,

		// @ts-ignore
		meta.novel.title_tw,
		// @ts-ignore
		meta.novel.title_cn,
		// @ts-ignore
		meta.novel.title_other,
		// @ts-ignore
		meta.novel.title_source,

		// @ts-ignore
		meta.novel.title_en,
	], localesPath);

	mapMyLocalesIDCache.set(_key, myLocalesID);

	return myLocalesID
}

export function searchLocalesID(ids: string[], localesPath: string)
{
	let myLocalesID: string;

	for (let name of ids)
	{
		if (!name || typeof name !== 'string')
		{
			continue;
		}

		let p = path.join(localesPath, name);

		if (fs.existsSync(p + '.ts'))
		{
			myLocalesID = name;
			break;
		}
	}

	return myLocalesID;
}
