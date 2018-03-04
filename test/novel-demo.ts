/**
 * Created by user on 2017/12/8/008.
 */

import * as fs from 'fs-extra';
import path from 'upath2';
import * as projectConfig from '../project.config';
import * as Promise from 'bluebird';
import * as StrUtil from 'str-util';
import * as JsDiff from 'diff';
import { i18next, loadLocales, addResourceBundle, locales_def } from '../lib/i18n';
import * as execall from 'execall';
import * as JSON from 'json5';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';

import * as iconv from 'iconv-jschardet';

import novelText from 'novel-text';

import * as novelGlobby from 'node-novel-globby';

const DEBUG = false;

let _cache = {
	rename: {},
	block: {},
	block2: {},
	eng: {},
};

/**
 * 語言模板名稱
 * 對應 lib/locales
 *
 * 沒有設定時等同於 novelID
 *
 * @type {string}
 */
let myLocalesID: string;

/**
 * 資料夾位置
 *
 * user = dist_novel/user
 * dmzj = dist_novel/dmzj
 *
 * @type {string}
 */
let pathMain = 'user';
//pathMain = 'dmzj';

/**
 * 小說資料夾名稱
 *
 * @type {string}
 */
let novelID: string;

novelID = '黑之魔王';

//novelID = '黑之魔王_(2367)';
//novelID = '我的怪物眷族_(1984)';
//novelID = '被称为勇者、亦或是怪物的少女（勇者或是被称为怪物的少女）_(2018)';
novelID = '四度目は嫌な死属性魔術師';
//novelID = '虫虫酱むいむいたん';
//novelID = '那个人，后来_(2272)';

//novelID = '讨厌第四次的死属性魔术师_(2206)';
//myLocalesID = '四度目は嫌な死属性魔術師';

//pathMain = 'wenku8';
//novelID = '加速世界_(381)';
//myLocalesID = '加速世界';

//novelID = '野生のラスボスが現れた！';
//novelID = '野生的最终boss出现了_(2014)';
//myLocalesID = '野生のラスボスが現れた！';

//novelID = '火輪を抱いた少女';

//novelID = 'ウォルテニア戦記';

//pathMain = 'webqxs';
//novelID = '公会的开挂接待小姐_(20)';
//myLocalesID = 'ギルドのチートな受付嬢';

//novelID = '雪色エトランゼ';

//novelID = '自称贤者弟子的贤者';

//novelID = '抗いし者たちの系譜 逆襲の魔王';
//myLocalesID = '抗いし者たちの系譜';

//novelID = '魔拳のデイドリーマー';

//novelID = '異世界迷宮の最深部を目指そう';
//novelID = '暗黒騎士物語　～勇者を倒すために魔王に召喚されました～';

//pathMain = 'wenku8';
//
//novelID = '龙背上的骑兵_(513)';

//novelID = '呼び出された殺戮者';

//novelID = '病娇女神の箱庭';

//novelID = 'よみがえる殺戮者';
//myLocalesID = '呼び出された殺戮者';

//novelID = '回復術士のやり直し～即死魔法とスキルコピーの超越ヒール～';

//novelID = '異世界で魅了チートを使って奴隷ハーレムをつくってみた';
//pathMain = 'epub';

//novelID = 'シャチになりましたオルカナティブ';

//novelID = '自分が異世界に転移するなら';

//novelID = '百魔の主';

novelID = '奪う者　奪われる者';

//novelID = '人喰い転移者の異世界復讐譚　～無能はスキル『捕食』で成り上がる～';

novelID = '帰ってきてもファンタジー！？';

novelID = '魔王様、リトライ！';

novelID = '豚公爵に転生したから、今度は君に好きと言いたい';

novelID = '転生したら剣でした';

if (!novelID)
{
	throw new Error();
}

let cwd = path.join(projectConfig.dist_novel_root, pathMain, novelID);
let cwd_out = path.join(projectConfig.dist_novel_root, `${pathMain}_out`, novelID);

// 利用 i18next 來達到根據小說切換翻譯模板
myLocalesID = myLocalesID || novelID;

let myLocales = loadLocales(myLocalesID);
if (myLocales)
{
	addResourceBundle(myLocales);
}
else
{
	myLocales = {
		lang: myLocalesID,
	};
}
i18next.changeLanguage(myLocales.lang);
i18next.setDefaultNamespace('i18n');

(async () =>
{
	await make_meta_md();

	let meta: IMdconfMeta;

	if (fs.existsSync(path.join(cwd_out, 'meta.md')))
	{
		meta = await fs.readFile(path.join(cwd_out, 'meta.md'))
			.then(mdconf_parse)
	}
	else if (fs.existsSync(path.join(cwd_out, 'README.md')))
	{
		meta = await fs.readFile(path.join(cwd_out, 'README.md'))
			.then(mdconf_parse)
	}

	meta = Object.assign({
		options: {
			textlayout: {},
		},
	}, meta);

	const TXT_PATH = cwd;

	let globby_patterns: string[];
	let globby_options: novelGlobby.IOptions = {
		cwd: TXT_PATH,
		useDefaultPatternsExclude: true,
		absolute: true,
	};

	{
		[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
	}

	await novelGlobby.globby([
			'cover.*',
		], globby_options)
		.then(ls =>
		{
			if (ls.length)
			{
				return Promise.map(ls, function (file)
				{
					return fs.copy(file, path.join(cwd_out, path.relative(globby_options.cwd, file)));
				})
			}
		})
	;

	let ls = await Promise
		.mapSeries(novelGlobby
			.globbyASync(globby_patterns, globby_options)
			.tap(async function (ls)
			{
				if (DEBUG)
				{
					await fs.writeJSON('./temp/log.1.json', ls, {
						spaces: "\t",
					});
				}
			})
			.then(novelGlobby.returnGlobList)
			.tap(async function (ls)
			{
				//console.log(globby_patterns, globby_options);

				if (DEBUG)
				{
					ls = ls.map(function (p)
					{
						return path.relative(TXT_PATH, p);
					});

					await fs.writeFile('./temp/log.2.txt', ls.join("\n"));

					process.exit();
				}

			}), async function (file, index, len)
		{
			let ext = '.txt';

			let name = path.basename(file, ext);
			let file_dir = path.relative(cwd, path.dirname(file));

			let currentFile = path.join(file_dir, name);

			const _cache_key_ = path.join(file_dir, name);

			const _t_old = await fs.readFile(file);

			{
				let chk = iconv.detect(_t_old);

				if (chk.encoding != 'UTF-8' && chk.encoding != 'ascii')
				{
					console.error(currentFile, '此檔案可能不是 UTF8 請檢查編碼或利用 MadEdit 等工具轉換', chk);
				}
			}

			let _t = novelText.toStr(_t_old);

			_t = my_words(_t);
			_t = novelText.textlayout(_t, meta.options.textlayout || {});
			_t = my_words(_t);

			_t = novelText.replace(_t, {
				words: true,
			});

			_t = novelText.trim(_t);

			{
				/**
				 * 檢測容易產生錯誤的文字
				 */

				_cache.block[_cache_key_] = {};

				/*
				[]
					.concat(myLocales.words_maybe || [])
					.concat(locales_def.words_maybe || [])
					.map(function (v)
					{
						if (typeof v == 'string')
						{
							return new RegExp('(.{1,3})?(' + v + ')(.{1,3})?', 'gi');
						}

						return v;
					})
					.forEach(function (v, index)
					{
						let _m;
						if ((_m = execall(v, _t)) && _m.length)
						{
							//_cache.block[_cache_key_] = _cache.block[_cache_key_].concat(_m);

							_cache.block[_cache_key_][v] = _cache.block[_cache_key_][v] || [];

							_cache.block[_cache_key_][v] = _cache.block[_cache_key_][v].concat(_m);

							//console.log(v);
						}
					})
				;
				*/

				_cache.block[_cache_key_] = chk_words_maybe(_t, []
					.concat(myLocales.words_maybe || [])
					.concat(locales_def.words_maybe || []),
					_cache.block[_cache_key_] = {}
				)
					.cache
				;

				let _m;
				let v;

				/*
				v = /(\S{1,2}(?![\?\*]))?(\?{3,}(?:[\s\?]+[\?])?|\S\*S|\*{2,})((?![\?\*])\S{1,2})?/g;
				if ((_m = execall(v, _t)) && _m.length)
				{


					//_cache.block[_cache_key_] = _cache.block[_cache_key_].concat(_m);

					let k = v.toString();
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k] || [];
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k].concat(_m);

					//await console.error(name, _m);
				}
				*/

				v = /([^\w]{1,3})?((?:\d*[a-z]+\w*)[ 　\w・\.\'\"\:\-\+\=]*)([^\w]{1,3})?/ig;
				if ((_m = execall(v, _t)) && _m.length)
				{
					let k = v.toString();

					if (_cache.eng[_cache_key_])
					{
						_cache.eng[_cache_key_] = _cache.eng[_cache_key_].concat(_m);
					}
					else
					{
						_cache.eng[_cache_key_] = _m;
					}
				}

				v = /([^\n\*]{0,3})?([^\n\*]\*{2,}[^\n\*])([^\n\*]{0,3})?/ig;
				if ((_m = execall(v, _t)) && _m.length)
				{
					let k = v.toString();

					if (_cache.block2[_cache_key_])
					{
						_cache.block2[_cache_key_] = _cache.block2[_cache_key_].concat(_m);
					}
					else
					{
						_cache.block2[_cache_key_] = _m;
					}
				}

				v = new RegExp(`(\\S{1,2})(@|（·?）|\\\.{2,}|%|￥|#|\\$|（和谐）)(\\S{1,2})`, 'g');
				if ((_m = execall(v, _t)) && _m.length)
				{
					let k = v.toString();
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k] || [];
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k].concat(_m);
				}
			}

			if (typeof myLocales.words_callback == 'function')
			{
				_t = myLocales.words_callback(_t);
			}

			if (typeof locales_def.words_callback == 'function')
			{
				_t = locales_def.words_callback(_t);
			}

			_t = novelText.toStr(_t);

			let changed = _t != novelText.toStr(_t_old, {
				allow_nbsp: true,
				allow_bom: true,
			});

			if (changed)
			{
				await fs.outputFile(path.join(cwd_out, currentFile) + '.patch', JsDiff.createPatch(name, novelText.toStr(_t_old), _t, {
					newlineIsToken: true
				}));

				//console.log('save', currentFile);
				await fs.outputFile(path.join(cwd_out, currentFile) + '.txt', novelText.toStr(_t, "\r\n"));
			}

			if (_cache.block[_cache_key_] && !Object.keys(_cache.block[_cache_key_]).length)
			{
				delete _cache.block[_cache_key_];
			}

			console[changed ? 'log' : 'error'](currentFile);

			return currentFile;

			//return rename(file, index, len);
		})
		.tap(async function (ls)
		{
			if (Object.keys(_cache.block).length)
			{
				let md = await cache_output1(_cache.block, '待確認文字');

				await fs.outputFile(path.join(cwd_out, '待確認文字.md'), md);
			}

			if (Object.keys(_cache.eng).length)
			{
				let out = await cache_output2(_cache.eng, 'English');

				await fs.outputFile(path.join(cwd_out, '英語.md'), out);
			}

			if (Object.keys(_cache.block2).length)
			{
				let out = await cache_output2(_cache.block2, '待修正屏蔽字');

				await fs.outputFile(path.join(cwd_out, '待修正屏蔽字.md'), out);
			}
			else
			{
				//await fs.remove(path.join(cwd_out, '待修正屏蔽字.md'));
				await fs.outputFile(path.join(cwd_out, '待修正屏蔽字.md'), '');
			}
		})
	;

	//console.log(ls);

})();

function cache_output1(_block, title): string
{
	let md = Object.keys(_block)
		.reduce(function (a, file)
		{
			let values = _block[file];

			a.push(``);
			a.push(`## ${file}`);
			a.push(``);

			let ret = Object.keys(values)
				.reduce(function (a, r)
				{
					let ms = values[r];

					//console.log(r);

					a.push(`### ${stringify(r)}`);
					a.push(``);

					let ret = ms.reduce(function (a, m)
					{

						a.push(`- ${stringify(m.match)}`);

						return a;
					}, []);

					a = a.concat(ret);

					a.push(``);
					//a.push(``);

					return a;
				}, []);

			a = a.concat(ret);

			a.push(``);
			//a.push(``);

			return a;
		}, [
			`# ${title}`,
			'',
			'[TOC]',
		])
		.join("\n")
		.replace(/\n{3,}/g, '\n\n\n')
		.replace(/^\n+|\n+$/g, '')
		+ "\n";
	;

	return md;
}

function cache_output2(_block, title): string
{
	_block = Object.keys(_block)
		.reduce(function (a, b)
		{
			a[b] = a[b] || {};

			for (let m of _block[b])
			{
				if (!m.match)
				{
					continue;
				}

				let key = m.sub[1]
					.replace(/^[ 　・\.\'\"\:\-\+\=]+|[ 　・\.\'\"\:\-\+\=]+$/g, '')
					.toLowerCase()
				;

				if (/^\d+(?:\.\d+)?$|^([a-z])\1+$/i.test(key) || key.length == 1)
				{
					continue;
				}

				a[b][key] = a[b][key] || [];

				a[b][key].push(m.match);
			}

			for (let m in a[b])
			{
				a[b][m].sort();
			}

			return a;
		}, {})
	;

	let out = Object.keys(_block)
		.reduce(function (a, b)
		{
			a.push(`\n## ${b}`);

			for (let k in _block[b])
			{
				a.push(`\n### ${stringify(k)}\n`);

				for (let m of _block[b][k])
				{
					a.push(`- ${stringify(m)}`);
				}
			}

			a.push('');

			return a;
		}, [
			`# ${title}`,
			'',
			'[TOC]',
		])
		.join("\n")
	;

	return out;
}

function chk_words_maybe(text, list, cache = {})
{
	let ls = []
		.concat(list || [])
		.map(function (v)
		{
			let ret = {
				m: null,
				not: null,
				and: null,
			};

			if (typeof v == 'string')
			{
				ret.m = v;
			}
			else if (v instanceof RegExp)
			{
				ret.m = v;
			}
			else if (Array.isArray(v))
			{
				ret.m = v[0];

				ret.not = v[1];
				ret.and = v[2];

				//console.log(ret);
			}
			else if (v.m)
			{
				Object.assign(ret, v);
			}
			else
			{
				return null;
			}

			if (typeof ret.m == 'string')
			{
				ret.m = new RegExp('(.{1,3})?(' + ret.m + ')(.{1,3})?', 'gi');
			}

			return ret;
		})
		.filter(v => v && v.m)
		.forEach(function (v, index)
		{
			let _m;
			if ((_m = execall(v.m, text)) && _m.length)
			{
				//_cache.block[_cache_key_] = _cache.block[_cache_key_].concat(_m);

				if (v.not || v.and)
				{
					_m = _m.filter(function (m: {
						match: string,
						sub: string[],
						index: number,
					})
					{
						if (v.not && v.not.test(m.match))
						{
							return false;
						}

						if (v.and && !v.and.test(m.match))
						{
							return false;
						}

						return true;
					});
				}

				if (_m.length)
				{
					cache[v.m] = cache[v.m] || [];
					cache[v.m] = cache[v.m].concat(_m);
				}

				//console.log(v);
			}
		})
	;

	return {
		list: ls,
		cache: cache,
	};
}

let inited = false;

function my_words(html): string
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

		fs.outputFile(path.join(__dirname, './temp/words.json'), JSON.stringify(words, function (k, v)
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

	return html;
}

function make_meta_md()
{

	let globby_patterns: string[];
	let globby_options: novelGlobby.IOptions = {
		cwd: cwd,
		useDefaultPatternsExclude: true,
		absolute: true,
	};

	globby_patterns = [
		'**/meta.md',
		'**/README.md',
	];

	{
		[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
	}

	return Promise
		.mapSeries(novelGlobby.globby(globby_patterns, globby_options), async function (file, index, len)
		{
			let ext = path.extname(file);

			let name = path.basename(file);
			let file_dir = path.relative(cwd, path.dirname(file));

			await fs.copy(file, path.join(cwd_out, file_dir, name));

			return path.join(file_dir, name);
		})
		.then(async function (ls)
		{
			if (!ls.length
				&& !fs.existsSync(path.join(cwd_out, 'meta.md'))
				&& !fs.existsSync(path.join(cwd_out, 'README.md'))
			)
			{

				let globby_patterns: string[];
				let globby_options: novelGlobby.IOptions = {
					cwd: cwd,
					useDefaultPatternsExclude: true,
					absolute: true,
				};

				globby_patterns = [
					'*.json',
				];

				{
					[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
				}

				let ls = await novelGlobby.globby(globby_patterns, globby_options);

				if (!ls.length)
				{
					return;
				}

				//console.log(ls[0], cwd);

				let data = await fs.readJSON(ls[0]);
				data.data = data.data || {};

				//console.log(data);

				let tags = [
					'node-novel',
				];

				if (ls[0].match(/dmzj/))
				{
					tags.push('dmzj');
				}
				if (ls[0].match(/wenku8/))
				{
					tags.push('wenku8');
				}

				if (ls[0].match(/dist_novel\/([^\/]+)(?:_out)?/))
				{
					tags.push(RegExp.$1);
				}

//			let md = await json2md(data, {
//				tags: tags,
//			});

				let md = novelInfo.stringify({}, data, {
					tags: tags,
				});

				await fs.outputFile(path.join(cwd_out, 'README.md'), md);
			}
		})
		;
}

function stringify(v)
{
	return JSON.stringify(v).replace(/^"|"$/g, '');
}
