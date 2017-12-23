/**
 * Created by user on 2017/12/8/008.
 */

import * as globby from 'globby';
import * as fs from 'fs-extra';
import path from 'upath2';
import * as projectConfig from '../project.config';
import * as Promise from 'bluebird';
import * as StrUtil from 'str-util';
import * as JsDiff from 'diff';
import { i18next, loadLocales, addResourceBundle, locales_def } from '../lib/i18n';
import * as execall from 'execall';

import { novelText } from '../lib/novel/text';

let _cache = {
	rename: {},
	block: {},
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
let novelID = '黑之魔王';

//novelID = '黑之魔王_(2367)';
//novelID = '我的怪物眷族_(1984)';
//novelID = '被称为勇者、亦或是怪物的少女（勇者或是被称为怪物的少女）_(2018)';
//novelID = '四度目は嫌な死属性魔術師';
//novelID = '虫虫酱むいむいたん';
//novelID = '那个人，后来_(2272)';

//novelID = '讨厌第四次的死属性魔术师_(2206)';
//myLocalesID = '四度目は嫌な死属性魔術師';

//pathMain = 'wenku8';
//novelID = '加速世界_(381)';
//myLocalesID = '加速世界';

novelID = '野生のラスボスが現れた！';
myLocalesID = '野生のラスボスが現れた！';

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

	let ls = await Promise
		.mapSeries(globby([
			'**/*.txt',
			'!**/*.raw.txt',
			'!**/*.new.txt',
			'!**/out/**/*',
			'!**/raw/**/*',
			'!**/*_out/**/*',
		], {
			cwd: cwd,
			absolute: true,
		}), async function (file, index, len)
		{
			let ext = '.txt';

			let name = path.basename(file, ext);
			let file_dir = path.relative(cwd, path.dirname(file));

			const _cache_key_ = path.join(file_dir, name);

			const _t_old = await fs.readFile(file);

			let _t = _t_old.toString();

			_t = my_words(_t);
			_t = novelText.textlayout(_t);
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

				let _m;
				let v = /(\S{1,2}(?![\?\*]))?(\?{3,}(?:[\s\?]+[\?])?|\S\*S|\*{2,})((?![\?\*])\S{1,2})?/g;
				if ((_m = execall(v, _t)) && _m.length)
				{


					//_cache.block[_cache_key_] = _cache.block[_cache_key_].concat(_m);

					let k = v.toString();
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k] || [];
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k].concat(_m);

					//await console.error(name, _m);
				}

				v = new RegExp(`([^a-z]{1,2})([a-z]+[ 　\\ta-z\'\\d]*[a-z'\\d])([^a-z]{1,2})`, 'ig');
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

			if (_t.toString() != _t_old.toString())
			{
				await fs.outputFile(path.join(cwd_out, file_dir, name) + '.patch', JsDiff.createPatch(name, _t_old.toString()
					.replace(/\r\n|\r(?!\n)/g, "\n"), _t.toString().replace(/\r\n|\r(?!\n)/g, "\n"), {
					newlineIsToken: true
				}));

				_t = _t.replace(/\n/g, "\r\n");

				await fs.outputFile(path.join(cwd_out, file_dir, name) + '.txt', _t);
			}

			if (_cache.block[_cache_key_] && !Object.keys(_cache.block[_cache_key_]).length)
			{
				delete _cache.block[_cache_key_];
			}

			return path.join(file_dir, name);

			//return rename(file, index, len);
		})
		.tap(async function ()
		{
			if (Object.keys(_cache.block).length)
			{
				function stringify(v)
				{
					return JSON.stringify(v).replace(/^"|"$/g, '');
				}

				let md = Object.keys(_cache.block)
					.reduce(function (a, file)
					{
						let values = _cache.block[file];

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
						'# 待確認',
						'',
						'[TOC]',
					])
					.join("\n")
					.replace(/\n{3,}/g, '\n\n\n')
					.replace(/^\n+|\n+$/g, '')
					+ "\n";
				;

				console.log(md);

				await fs.outputFile(path.join(cwd_out, '待確認文字.md'), md);
			}

			if (Object.keys(_cache.eng).length)
			{
				//await console.error(_cache.eng);

				await fs.outputJson(path.join(cwd_out, '英語.txt'), _cache.eng, {
					// @ts-ignore
					spaces: "\t",
				});
			}
		})
	;

	//console.log(ls);

})();

async function rename(file, index?, len?)
{
	_cache.rename = _cache.rename || {};

	let ext = '.txt';

	let name = path.basename(file, ext);
	let file_dir = path.relative(cwd, path.dirname(file));

	name = StrUtil.stripAnsi(name);

	let n;
	let m;
	let s;

	let name2 = StrUtil.toHalfNumber(name);

	if (m = /(?:第\s*)?(\d+)(?:[话話集#\._　\s\t])?/g.exec(name2))
	{
		n = m[1];

		s = name2.slice(m.index + m[0].length);

		//console.log(s);

		if (m = /^(?:[话話集#\._　\s\t]+)?(.+)$/g.exec(s))
		{
			//console.log(m);

			s = m[1];
		}
	}
	else if (!n)
	{
		n = StrUtil.zh2num(name);

		if (m = /[话話集#\._　 \t]+(.+)$/g.exec(name))
		{
			s = m[1];
		}
	}

	if (n)
	{
		s = (s || '').replace(/^[\s　]+|[\s　]+$/g, '');

		let n2 = StrUtil.toFullNumber(n.toString());
		s = StrUtil.toFullNumber(s, {
			only: {
				number: true,
				not_default: true,
			},
			skip: {
				space: true,
				eng: true,
			},
		});

		let name_new = `第${n2}話` + (s ? '　' + s : '');

		let p1 = path.join(file_dir, name) + ext;
		let p2 = path.join(file_dir, path.filterNameEntry(name_new)) + ext;

		_cache.rename[p1] = p2;

		if (p1 != p2)
		{
			console.log(JsDiff.diffChars(name, name_new));

			console.log([name, name_new].join("\n"));
			//console.log(Buffer.from(name_new))
			//console.log(Buffer.from(name));
			//console.log([p1, p2].join("\n"));

			return fs.move(path.join(cwd, p1), path.join(cwd, p2));
		}
		else
		{
			//console.log('skip', p1);
		}
	}
	else
	{
		await console.error(name);
	}
}



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
	return Promise
	.mapSeries(globby([
		'**/meta.md',
		'!**/*.raw.*',
		'!**/*.new.*',
		'!**/out/**/*',
		'!**/raw/**/*',
		'!**/*_out/**/*',
	], {
		cwd: cwd,
		absolute: true,
	}), async function (file, index, len)
	{
		let ext = path.extname(file);

		let name = path.basename(file);
		let file_dir = path.relative(cwd, path.dirname(file));

		await fs.copy(file, path.join(cwd_out, file_dir, name));

		return path.join(file_dir, name);
	})
	.then(async function (ls)
	{
		if (!ls.length && !fs.existsSync(path.join(cwd_out, 'meta.md')))
		{
			let ls = await globby([
					'*.json',
					'!**/*.raw.*',
					'!**/*.new.*',
					'!**/out/**/*',
					'!**/raw/**/*',
					'!**/*_out/**/*',
				], {
					cwd: cwd,
					absolute: true,
				})
			;

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

			if (data.data.type)
			{
				tags = tags.concat(data.data.type);
			}

			let md = `
# novel

- title: ${data.novel_title || data.data.g_lnovel_name}
- author: ${data.novel_author || data.data.author}
- source: ${data.url || ''}
- cover: ${data.data.cover_pic || ''}

## preface

\`\`\`
${(data.data.desc || '').replace(/\`/g, '\\`')}
\`\`\`

## tags

- ${tags.join('\n- ')}

# contribute

`;

			await fs.outputFile(path.join(cwd_out, 'meta.md'), md);
		}
	})
;
}
