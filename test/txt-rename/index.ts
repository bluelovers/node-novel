/**
 * Created by user on 2018/3/7/007.
 */

import globby from 'node-novel-globby/g';
import * as fs from 'fs-extra';
import novelText from 'novel-text';
import path from 'upath2';
import { _word_en3 } from '../../lib/locales/lib/index';
import * as projectConfig from '../../project.config';
import * as Promise from 'bluebird';
import * as StrUtil from 'str-util';
import * as JsDiff from 'diff';
import { i18next, loadLocales, addResourceBundle, locales_def } from '../../lib/i18n';
import * as execall from 'execall';
import * as JSON from 'json5';
import * as iconv from 'iconv-jschardet';
import * as crossSpawn from 'cross-spawn';

import * as zhtext from 'novel-text/zhjp';
import * as locales_lib from '../../lib/locales/lib';
import { trimFilename, regex_str } from '../../lib/func';
import { _word_zh_all, lazymarks } from '../../lib/locales/lib';

import { zhRegExp } from 'regexp-cjk';
import novelFilename from 'cjk-conv/lib/novel/filename';
import { cn2tw_min } from 'cjk-conv/lib/zh/convert/min';
import { console } from 'debug-color2';
import jsdiff = require('diff');

console.enabledColor = true;

let myLocalesID: string;
let pathMain = 'user';
let novelID: string;

novelID = '天才魔法使與原娼婦新娘';
novelID = 'エルフ転生からのチート建国記';

novelID = '再臨勇者の復讐譚　～失望しました、勇者やめて元魔王と組みます～';

novelID = '物語の中の銀の髪';

novelID = '黒の創造召喚師';

novelID = '乙女ゲームの悪（中略）ヒロインが鬼畜女装野郎だったので、助けて下さい';

novelID = 'カルマの塔';

//novelID = '没落予定なので、鍛治職人を目指す';

//novelID = '誰にでもできる影から助ける魔王討伐';

pathMain = 'dmzj';
novelID = '幻想世界的愛麗絲緹露';

novelID = '29歲單身漢在異世界想自由生活卻事與願違！？';

pathMain = 'user';
novelID = '異世界迷宮の最深部を目指そう';

pathMain = 'syosetu';
novelID = 'ロリータ・ガンバレット　～魔弾幼女の異世界戦記～';

pathMain = 'dmzj';
novelID = '吃掉死神的少女';

//pathMain = 'wenku8';
//novelID = '勇者、或いは化物と呼ばれた少女';

let DEBUG_MODE = true
//DEBUG_MODE = false

if (!novelID)
{
	throw new Error();
}

let cwd = path.join(projectConfig.dist_novel_root, pathMain, novelID);
let cwd_out = path.join(projectConfig.dist_novel_root, `${pathMain}_out`, novelID);

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

// @ts-ignore
i18next.changeLanguage(myLocales.lang);
// @ts-ignore
i18next.setDefaultNamespace('i18n');

let _zh_num = '一二三四五六七八九十';
let _full_num = '０-９';
let _space = ' 　\\t \\s';

(async () =>
{

	let r: RegExp;

	r = new zhRegExp([
		`(?:^)[${_space}]*`,
		`(\\d{4,}[ _])?`,
		//`(?:【渣翻＋直译＋脑补】)?`,
		`(`,
		[
			//`[序终][曲章]`,
			//`(?:第?(?:[${_zh_num}]+|\\d+(?:\.\\d+)?|[${_full_num}]+(?:[\\.．][${_full_num}]+)?)(?:话|集|章))`,
			//`６[${_full_num}]+`,
			//`20`
			//`\\d+[${_space}\\-]`,
//			'\\d{3}',

			`第[${_zh_num}\\d]+话`,
			`第[${_zh_num}\\d]+章`,
			`後記`,
			`尾聲`,
			'最终章',

		].join('|'),
		`)`,
		`[${_space}]*`,
		//`[：~～]*`,
		`([^\\n]*?)`,
		//`[：~～]*`,
		`[${_space}]*`,
		`$`,
	].join(''), 'ig');

	//r = new zhRegExp(`第?\\s*(\\d+)\\s*話\\s*(.+?)?\\s*$`);

//	r = new zhRegExp(`^(\\d{4,}[ _])()(.+)$`);

	//r = new zhRegExp(`^()(\\d{3}) (.+)$`);

	console.log(r);

	if (0)
	{
		let m = r.exec('00960_第87話 奇妙的委託和庭園廣場');

		console.log(m);

		process.exit();
	}

	let ls = await Promise
		.mapSeries(globby([
			'**/*.txt',
			'!**/~*',
			'!**/*.raw.*',
			'!**/*.new.*',
			'!**/out/**/*',
			'!**/raw/**/*',
			'!**/*_out/**/*',
			'!*.raw',
			'!raw',
		], {
			cwd: cwd,
			absolute: true,
		}), async function (file, index, len)
		{
			let ext = '.txt';

			let name = path.basename(file, ext);
			const name_old = name;
			let file_dir = path.dirname(file);

			r.lastIndex = 0;

			let m = r.exec(name);

			//const c = '　';
			//const c = ' ';
			const c = ' ';

			if (0 && m)
			{
				let id_str: string;

				let [src, ido, id, desc] = m;

				desc = novelText.trim(desc || '', {
					//trim: true,
					trim: '；：：~～　 .',
				});

				desc = StrUtil.toFullNumber(desc);

				let idn = id;
				if (typeof idn != 'undefined')
				{
					idn = idn.padStart(3, '0');
				}

				id_str = `${idn}`;

				name = '';

				name = `${id_str}`;
				if (desc)
				{
					name += c + `${desc}`;
				}

				if (typeof ido != 'undefined' && ido !== '')
				{
					name = ido + name;
				}
			}
			else if (0 && m)
			{
				let [src, ido, id, desc] = m;

				id = StrUtil.toFullNumber(id);

				name = `${id}`;

				let c = '　';

				if (desc)
				{
					name += c + `${desc}`;
				}
			}
			else if (0 && m)
			{
				let [src, ido, id, desc] = m;

				//id = StrUtil.toFullNumber(id);

				name = ido + `${id}`;

				//console.log(m);

				let c = '　';

				if (desc)
				{
					name += c + `${desc}`;
				}
			}
			else if (0 && m)
			{
				console.debug(m);
			}

//			name = (index + 2)
//				.toString()
//				.padStart(4, '0')
//				+ '0'
//				+ '_'
//				+ name
//			;

			if (1)
			{
				name = novelFilename.filename(name, {
						skip: '娘志里卷發處說氣圍',
						//safe: false,
					})
					//.replace(/后(記|宮)/g, '後$1')
					.replace(/“/g, '『')
					.replace(/”/g, '』')

					/*

					.replace(/レポート/g, '記事')
					.replace(new zhRegExp('発', 'ig'), '發')
					.replace(new zhRegExp('于', 'ig'), '於')
					.replace(new zhRegExp('気', 'ig'), '氣')
					.replace(new zhRegExp('処', 'ig'), '處')
					.replace(new zhRegExp('獣', 'ig'), '獸')
					.replace(new zhRegExp('団', 'ig'), '團')
					.replace(new zhRegExp('囲', 'ig'), '圍')
					*/

				/*
				.replace(/(\d+)/g, function (...m)
				{
					return StrUtil.toFullNumber(m[1]);
				})
				*/
				;

//				name = name.replace(/^(\d+_)?(.+)$/, function (...args)
//				{
//					return (args[1] || '') + replace_name_list().reduce(function (name, data)
//					{
//						// @ts-ignore
//						return name.replace(...data);
//					}, args[2])
//				})

				name = replace_name_list().reduce(function (name, data)
				{
					// @ts-ignore
					return name.replace(...data);
				}, name)
				;
			}

			name = novelText.trim(name, {
				trim: true,
			});

			name = trimFilename(name);

			name = cn2tw_min(name);

//			console.log(name, m);

			if (name_old != name)
			{
				let name_new = path.join(file_dir, name + ext);

				if (!DEBUG_MODE)
				{
					await crossSpawn.sync('git', [
						'mv',
						'-f',
						'-v',
						file,
						name_new,
					], {
						cwd,
						stdio: 'inherit',
					});

					if (fs.existsSync(name_new) && !fs.existsSync(file))
					{

					}
					else
					{
						await fs.move(file, name_new);
					}
				}

				console.log(`${index}, "${name_old}"`);
				console.log(`=>`, diff_log(name_old, name));
			}
			else
			{
				await console.red(`${index}, skip`, name_old);
			}
		})
	;

})();

let CACHE_REGEXP_LIST = [] as [RegExp, string | ((...argv: string[]) => string)][];

function replace_name_list()
{
	if (!CACHE_REGEXP_LIST.length)
	{
		CACHE_REGEXP_LIST = [
			[/后(記|宮|篇)/g, '後$1'],
			[/(背)后/g, '$1後'],
			[/レポート/g, '記事'],
			[new zhRegExp('発', 'ig'), '發'],
			[/于/g, '於'],
			[new zhRegExp('気', 'ig'), '氣'],
			[new zhRegExp('処', 'ig'), '處'],
			[new zhRegExp('獣', 'ig'), '獸'],
			[new zhRegExp('団', 'ig'), '團'],
			[new zhRegExp('囲', 'ig'), '圍'],
			//[new zhRegExp('気', 'ig'), '氣'],

			[/哪里/g, '哪裡'],

			..._word_zh_all([

				...lazymarks['zh'],
				...lazymarks['zh2'],

				//...lazymarks['c000'],

				[/\uFEFF/g, ''],

				[/[  \xA0]/g, ' '],
				//[/[　\u3000]/g, '　'],
				[/[·‧・···•˙●]/g, '・'],
				[/[．]/g, '・'],
				['[∶:]', ':'],
				[/[：：︰﹕：]/ug, '：'],
				[/[〔［]/g, '［'],
				[/[〕］]/g, '］'],

				['後続', '後續'],
				['(剣|角)闘', '剣闘'],

				['然后', '然後'],

				['丑陋', '醜陋'],

				['応', '應'],

				_word_en3(' *(VS|ｖｓ|ＶＳ) *', 'ＶＳ'),

				...lazymarks['full_width_001'],

				['[,!?]', StrUtil.toFullWidth],

			]).map(function (data)
			{
				if (!(data[0] instanceof RegExp) || (data[0] instanceof zhRegExp))
				{
					data[0] = new zhRegExp(data[0], 'ig');
				}

				return data;
			}) as typeof CACHE_REGEXP_LIST,

		];

		//console.log(CACHE_REGEXP_LIST);
	}

	CACHE_REGEXP_LIST.forEach(data => {

		// @ts-ignore
		if ((data[0] instanceof RegExp) || (data[0] instanceof zhRegExp))
		{
			data[0].lastIndex = 0;
		}
	});

	return CACHE_REGEXP_LIST;
}

function diff_log(src_text: string, new_text: string): string
{
	let diff = jsdiff.diffChars(src_text, new_text);

	let diff_arr = diff
		.reduce(function (a, part)
		{
			let color = part.added ? 'green' :
				part.removed ? 'red' : 'grey';

			let t = console[color].chalk(part.value);

			a.push(t);

			return a;
		}, [])
	;

	return diff_arr.join('');
}
