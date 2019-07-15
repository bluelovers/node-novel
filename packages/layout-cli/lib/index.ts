/**
 * Created by user on 2019/7/13.
 */
import getBuildInRule, { getBuildInRulePath } from '@node-novel/layout-pattern/lib/rules';
import { IRuleListKey } from '@node-novel/layout-pattern/lib/rules-keys';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import novelText from '@node-novel/layout';
import { IMdconfMeta, mdconf_parse } from 'node-novel-info';
import fs from 'fs-iconv';
import * as JsDiff from 'diff';
import { console } from 'debug-color2';
import path from 'upath2';
import FastGlob from '@bluelovers/fast-glob/bluebird';
import * as novelGlobby from 'node-novel-globby/g';
import Bluebird = require('bluebird');
import deepmerge = require('deepmerge-plus');
import prettyuse = require('prettyuse');

export function loadPatternRule<T extends IRuleListKey>(id?: T)
{
	let rule_tpl = getRule(id || 'demo');

	const rule_base = getRule('base-v2');

	return {
		rule_tpl,
		rule_base,
	}
}

export function getRule<T extends IRuleListKey>(id: T)
{
	let rule = getBuildInRule(id);

	return {
		...rule,
		__id: id,
		words_arr: [] as string[],
		__file: getBuildInRulePath(id),
	}
}

export function _my_words(ruleData: ReturnType<typeof loadPatternRule>)
{
	let words = [];
	let arr = [];

	words = words.concat(ruleData.rule_tpl.words || []);
	arr = arr.concat(ruleData.rule_tpl.words_arr || []);

	words = words.concat(ruleData.rule_base.words || []);
	arr = arr.concat(ruleData.rule_base.words_arr || []);

	words = words.concat(ruleData.rule_tpl.words || []);
	arr = arr.concat(ruleData.rule_tpl.words_arr || []);

	words = novelText._words1(arr, words);

	return novelText._words2(words);
}

export function my_words(html: Buffer | string, ruleData: ReturnType<typeof loadPatternRule>)
{
	html = html.toString();

	let words = _my_words(ruleData);

	let ret = novelText.replace_words(html, words);

	html = ret.value;

	return {
		_t: html,
	};
}

export function dummyMeta(): IMdconfMeta
{
	return {
		novel: {},
		options: {
			textlayout: {},
		},
	}
}

export function handleGlob(cwd: string, globby_patterns: string[] = [])
{
	if (globby_patterns.length === 0)
	{
		globby_patterns.push('**/*.txt');
	}

	let globby_options: novelGlobby.IOptions = {
		cwd,
		useDefaultPatternsExclude: true,
		absolute: true,
	};

	([globby_patterns, globby_options] = novelGlobby.getOptions([
		...globby_patterns,
		'!z.raw',
		'!**/z.raw',
	], globby_options));

	cwd = path.resolve(cwd);
	const cwd_out = path.join(cwd, 'z.out');

	let meta: IMdconfMeta;

	try
	{
		meta = getNovelMeta([
			cwd,
		]);
	}
	catch (e)
	{
		console.warn(`README.md 不存在`);

		meta = dummyMeta();

		// @ts-ignore
		globby_options.deep = 0;
		globby_patterns.push('!*/*');
	}

//	console.dir({
//		globby_patterns,
//		globby_options,
//	});

	let ruleData = loadPatternRule();
	let _last_empty: string[] = [];

	console.dir({
		cwd,
		cwd_out,
	});

	return Bluebird.resolve(novelGlobby
		.globby(globby_patterns, globby_options))
		.mapSeries(async (file, index, len) =>
		{
			let name = path.parse(file).name;
			let file_dir = path.relative(cwd, path.dirname(file));

			let currentFile = path.join(file_dir, name);

			const _cache_key_ = path.join(file_dir, name);

			const { _t_old, _cb_ret } = await fsReadFile(file, (_t_old) =>
			{

				if (isEmptyFile(_t_old))
				{
					_last_empty.push(currentFile);

					return true;
				}
				else if (_last_empty.length)
				{
					_last_empty
						.forEach(function (currentFile)
						{
							console.red(currentFile, '此檔案無內容');
						})
					;

					_last_empty = [];
				}

			});

			let changed: boolean = null;

			if (!_cb_ret)
			{
				let _t: string;

				({ _t } = handleContext({
					_t_old,
					meta,
					ruleData,
				}));

				_t = novelText.toStr(_t);

				changed = _t != novelText.toStr(_t_old, {
					allow_nbsp: true,
					allow_bom: true,
				});

				if (_t.replace(/\s+/g, ''))
				{
					await fs.outputFile(path.join(cwd_out, currentFile) + '.txt', novelText.toStr(_t, "\n"));
				}

				console[changed ? 'success' : 'log'](currentFile, printNum(index, len));

				console.debug(prettyuse());
				freeGC();
			}

			return {
				currentFile,
				changed,
			};
		})
		.tap((ls) =>
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

			console.info(`length: ${ls.length}`);
		})
		;
}

export function printNum(index: string | number, len: string | number)
{
	len = len.toString();
	index = ((index as number | 0) + 1).toString();

	return `[${index.padStart(len.length, '0')}/${len}]`;
}

export function handleContext(input: {
	_t_old: Buffer | string,
	meta: IMdconfMeta,
	ruleData: ReturnType<typeof loadPatternRule>
})
{
	let { _t_old, meta, ruleData } = input;

	let _t = novelText.toStr(_t_old);

	if (meta.options.textlayout && !meta.options.textlayout.allow_lf2)
	{
		_t = novelText.reduceLine(_t, meta.options.textlayout || {});
	}

	({ _t } = my_words(_t, ruleData));

	_t = novelText.textlayout(_t, meta.options.textlayout || {});

	({ _t } = my_words(_t, ruleData));

	_t = novelText.replace(_t, {
		words: true,
	});

	_t = novelText.trim(_t);

	return {
		_t_old,
		meta,
		ruleData,
		_t,
	}
}

export async function fsReadFile(file: string, cb?: (_t_old: Buffer) => unknown)
{
	const _t_old = await fs
		.loadFile(file, {
			autoDecode: true,
		})
		.then(v => Buffer.from(v))
	;

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

export function freeGC()
{
	if (isGCMode())
	{
		try
		{
			global.gc();
		}
		catch (e)
		{
			console.error(e);
		}
	}
}

export function isGCMode()
{
	return (global && typeof global.gc === 'function')
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
		if (fs.pathExistsSync(path.join(cwd_out, 'README.md')))
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
