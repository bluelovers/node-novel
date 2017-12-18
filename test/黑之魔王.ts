/**
 * Created by user on 2017/12/8/008.
 */

import * as globby from 'globby';
import * as fs from 'fs-extra';
import path from 'upath2';
import * as projectConfig from '../project.config';
import { zh2num } from '../lib/zhnumber';
import * as Promise from 'bluebird';
import * as StrUtil from 'str-util';
import * as JsDiff from 'diff';
import { i18next, loadLocales, addResourceBundle, locales_def } from '../lib/i18n';
import * as execall from 'execall';

const novelText = require('D:\\Users\\Documents\\The Project\\gm_scripts_repo\\ux-tweak-sc\\lib\\novel\\text')
	.novelText;

let _cache = {
	rename: {},
	block: {},
	eng: {},
};

let novelID = '黑之魔王';
let pathMain = 'user';

//novelID = '黑之魔王_(2367)';
//pathMain = 'dmzj';

novelID = '四度目は嫌な死属性魔術師';

let cwd = path.join(projectConfig.dist_novel_root, pathMain, novelID);
let cwd_out = path.join(projectConfig.dist_novel_root, `${pathMain}_out`, novelID);

	//console.log(i18next.options);

	// 利用 i18next 來達到根據小說切換語言模板

	let myLocales = loadLocales(novelID);

	if (myLocales)
	{
		addResourceBundle(myLocales);
	}

	i18next.changeLanguage(novelID);
	//i18next.language = i18next.options.lng = novelID;

	i18next.setDefaultNamespace('i18n');

	//console.log(i18next);

(async () =>
{
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
			_t = textlayout(_t);
			_t = my_words(_t);

			_t = novelText.replace(_t, {
				words: true,
			});

			_t = _t
			//.replace(/(\n){3,}/g, "\n\n\n")
			;

			(locales_def.words_maybe || [])
				.concat(myLocales.words_maybe || [])
				.map(function (v)
				{
					if (typeof v == 'string')
					{
						return new RegExp('(.{1,2})?(' + v + ')(.{1,2})?', 'gi');
					}

					return v;
				})
				.forEach(function (v)
				{
					let _m;
					if ((_m = execall(v, _t)) && _m.length)
					{
						_cache.block[_cache_key_] = _m;
					}
				})
			;

			let _m;
			if ((_m = execall(/(\S{1,2}(?![\?\*]))?(\?{3,}(?:[\s\?]+[\?])?|\S\*S|\*{2,})((?![\?\*])\S{1,2})?/g, _t)) && _m.length)
			{
				_cache.block[_cache_key_] = _m;

				//await console.error(name, _m);
			}

			if ((_m = execall(new RegExp(`([^a-z]{1,2})([a-z]+[ 　\\ta-z\'\\d]*[a-z'\\d])([^a-z]{1,2})`, 'ig'), _t)) && _m.length)
			{
				if (_cache.eng[_cache_key_])
				{
					_cache.eng[_cache_key_] = _cache.eng[_cache_key_].concat(_m);
				}
				else
				{
					_cache.eng[_cache_key_] = _m;
				}

			}



			if ((_m = execall(new RegExp(`(\\S{1,2})(@|（·?）|\\\.{2,}|%|￥|#|\\$|（和谐）)(\\S{1,2})`, 'g'), _t)) && _m.length)
			{

				if (_cache.block[_cache_key_])
				{
					_cache.block[_cache_key_] = _cache.block[_cache_key_].concat(_m);
				}
				else
				{
					_cache.block[_cache_key_] = _m;
				}
			}

			if (_t.toString() != _t_old.toString())
			{
				await fs.outputFile(path.join(cwd_out, file_dir, name) + '.patch', JsDiff.createPatch(name, _t_old.toString().replace(/\r\n|\r(?!\n)/g, "\n"), _t.toString().replace(/\r\n|\r(?!\n)/g, "\n"), {
					newlineIsToken: true
				}));

				_t = _t.replace(/\n/g, "\r\n");

				await fs.outputFile(path.join(cwd_out, file_dir, name) + '.txt', _t);
			}

			//return rename(file, index, len);
		})
		.tap(async function ()
		{
			if (Object.keys(_cache.block).length)
			{
				await console.error(_cache.block);

				fs.outputJson(path.join(cwd_out, '待修正屏蔽字.txt'), _cache.block, {
					// @ts-ignore
					spaces: "\t",
				});
			}

			if (Object.keys(_cache.eng).length)
			{
				await console.error(_cache.eng);

				fs.outputJson(path.join(cwd_out, '英語.txt'), _cache.eng, {
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
		n = zh2num(name);

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

function textlayout(html): string
{
	html = html.toString();

	html = html
		.replace(/\r\n|\r(?!\n)/g, "\n")
		.replace(/[ 　\t]+\n/g, "\n")
		.replace(/^[\s]+|[\s　]+$/g, '')
		.replace(/\n{4,}/g, "\n\n\n\n")
	;

	if (!html.match(/[^\n]\n[^\n]/g))
	{
		let len = 1;

		//console.log(html);

		if (/\n\n\n/g.test(html))
		{
			//console.log(777);

			if (/[^\n]\n\n[^\n]/g.test(html))
			{
				//console.log(888);
			}
			else
			{
				//console.log(999);

				html = html
					.replace(/\n{2}/g, "")
				;
			}

			html = html
				.replace(/\n{3,}/g, "\n\n\n")
				.replace(/\n{2}/g, "\n")
			;
		}
		else
		{
			//console.log(666);

			html = html
				.replace(/\n{3,}/g, "\n\n\n")
				.replace(/\n\n/g, "\n")
			;
		}

		//console.log(html);
	}

	html = html
	// for ts
		.toString()
		.replace(/([^\n「」【】《》“”『』（）](?:[！？?!。]*)?)\n((?:[—]+)?[「」“”【】《》（）『』])/ug, "$1\n\n$2")

		.replace(/([「」【】《》“”『』（）―](?:[！？?!。]*)?)\n([^\n「」“”【】《》（）『』])/ug, "$1\n\n$2")
		.replace(/([^\n「」【】《》“”『』（）](?:[！？?!。]*)?)\n((?:[—]+)?[「」“”【】《》（）『』])/ug, "$1\n\n$2")

		.replace(/([「」【】《》“”『』（）―](?:[！？?!。]*)?)\n([^\n「」“”【】《》（）『』])/ug, "$1\n\n$2")

		.replace(/(）(?:[！？?!。]*)?)\n([「」【】《》『』“”])/ug, "$1\n\n$2")

		/**
		 * https://tieba.baidu.com/p/5400503864
		 *
		 * 「第三试炼也，多亏了妮露而通过了吗……」
		 『心神守护的白羽毛』，这个从妮露那里收到的护身符，确实地守护了我的心。

		 */
		.replace(/([「」【】《》“”『』（）―](?:[！？?!。]*)?)\n((?:[「」“”【】《》（）『』])(?:[^\n]+)([^「」【】《》“”『』（）―](?:[！？?!。]*)?)\n)/ug, "$1\n$2\n")

		/**
		 * 住手，住手，我就是我。不是其他的任何人。
		 　表示出要必死地进行抵抗的意志，但是侵入脑内的这个『什么东西』，并不能被阻止。不能被，阻止……
		 */
		.replace(/(\n(?:[^　\n][^\n]+))\n([　])/g, '$1\n\n$2')

		/**
		 * 这样一直在这高兴着

		 。
		 */
		.replace(/([^\n])(\n+)((?:[吧呢]*)?[。！？，、])\n/ug, "$1$3$2")

		.replace(/([^\n])(\n+)(fin|\<完\>)(\n|$)/ig, "$1$2\n$3$4")
	;

	html = html
		.replace(/^\n+|[\s　]+$/g, '')
		.replace(/(\n){4,}/g, "\n\n\n\n")
		.replace(/(\n){3}/g, "\n\n")
	;

	return html;
}

function my_words(html): string
{
	html = html.toString();

	let sp = locales_def.sp || '#_@_#';

	let words = locales_def.words || [];
	let arr = locales_def.words_arr || [];

	words = words.concat(myLocales.words || []);
	arr = arr.concat(myLocales.words_arr || []);

	words = novelText._words1(arr, words);
	words = novelText._words2(words);

	let ret = novelText.replace_words(html, words);

	html = ret.value;

	return html;
}
