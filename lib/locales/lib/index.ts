/**
 * Created by user on 2018/1/25/025.
 */

import { IWords } from '../';
import * as StrUtil from 'str-util';
import { regex_str, array_unique } from '../../func';
import { cn2tw, tw2cn } from 'chinese_convert';
import { IRegExpCallback } from '../../novel/text';
import { replace_literal, isRegExp } from '../../regexp';

export const lazymarks = {} as IWords[][];

lazymarks[0] = [
	[/([\u4E00-\u9FFF])\[([^\n【】<>\[\]\{\}『』「」“”'"]+)\]/g, '$1【$2】'],
];

lazymarks[1] = [
	[
		/"([^\n"']*)'([^'"\n]+)'/gm,
		'"$1『$2』'
	],
	[
		/"([^\n"']*)'([^'"\n]+)'/gm,
		'"$1『$2』'
	],

	[
		/^([^\n"“”「」'\[\]［］]*)["“'\[［]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ『』\u4E00-\u9FFF][^\n"“”「」'\[\]［］]*(?:\n[^\n"“”「」'\[\]［］]*)?)["”'\]］]/gm,
		'$1「$2」'
	],
	[
		/^([^\n"“”『』'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”『』'‘’]*)["”'’]/gm,
		'$1『$2』'
	],
	[
		/^([^\n【】<>]*)[<]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>]*)[>]/gm,
		'$1【$2】'
	],

	[
		/(『[^『』\n]+』[^\n"“”『』'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”『』'‘’]*)["”'’]/gm,
		'$1『$2』'
	],
	[
		/(「[^「」\n]+」[^\n"“”「」'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”「」'‘’]*)["”'’]/gm,
		'$1「$2」'
	],

	[
		/^([^「」\n【】\[\]［］\{\}]*)[\[［\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】\[\]］\{\}]*)[\]］\}]/gm,
		'$1【$2】'
	],
	[
		/(「[^「」\n【】\[\]［］]*)[\[［]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】\[\]］]*)[\]］]/gm,
		'$1【$2】'
	],

	[
		/(【[^【】\n<>\[\]\{\}]+】[^\n【】<>\[\]\{\}]*)[<\[\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>\[\]\{\}]*)[\]\}>]/gm,
		'$1【$2】'
	],
];

lazymarks[2] = [
	[/[\[“]/g, '「'],
	[/[\]”]/g, '」'],
];

lazymarks[3] = [
	/**
	 * 雖然這裡有BUG 但是這個BUG反而可以幫忙發現沒有正確對應的引號
	 */
	[/(「[^」]*)「([^」]*)」/g, '$1『$2』'],

	[
		/([「『]{2,})([^「『\n』」]+)([』」]{2,})/g, function (...m)
	{
		if (m[1].length == m[3].length)
		{
			//console.log(m[1].length, m[3].length);

			m[1] = m[1]
				.replace(/[「『]/g, '『')
				.replace(/^[「『]/, '「')
			;

			m[3] = m[3]
				.replace(/[』」]/g, '』')
				.replace(/[』」]$/, '」')
			;

			return m[1] + m[2] + m[3];
		}

		return m[0];
	}
	],
];

lazymarks[4] = [
	[
		/[\!\(\):,~]+/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}
	],

	[
		/\?+(?=[』」\n])/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}
	],

	[
		/([\u4E00-\u9FFF])(\?+)(?=[』」\n ][^\u4E00-\u9FFF])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		});
	}
	],

	[/(？) (！)/g, '$1$2'],

	[/([^\.])\.$/gm, '$1。'],
];

lazymarks[5] = [
	[/ ?([』」》）]) ?/g, '$1'],
	[/ ?([《（「『]) ?/g, '$1'],
];

lazymarks['ltrim'] = [
	[/^[ \t　]+/gm, ''],
];

lazymarks['en'] = [

	...[
		'RPG',
		'BOSS',
		'Cosplay',
		'RAID',
		'Fantasy',
		'OK',
		'CG',

		'Golem',
		'Rank',

		'MAX',
		'UP',
		'Lv',

		'My',
		'Lord',

		'Gay',

	].map(function (value)
	{
		return _word_en(value);
	}),

];

lazymarks['zh'] = [
	/**
	 * 難以辨認的簡繁日 字替換
	 */
	['话|話', '話'],
	['絲|丝', '絲'],
	['賈|贾', '賈'],
	['庫|库', '庫'],
	['奥|奧', '奧'],
	['鳞|鱗', '鱗'],
	['爱|愛', '愛'],
	['茲|兹', '茲'],
	['連|连', '連'],
	['蚀|蝕', '蝕'],
	['锻|鍛', '鍛'],
	['铠|鎧', '鎧'],
	['渊|淵', '淵'],
	['鲁|魯', '魯'],
	['温|溫', '溫'],
	['維|维', '維'],
	['残|殘', '殘'],
	['猪|豬', '豬'],
	['复|復', '復'],
	['莲|蓮', '莲'],
	['级|級', '級'],
	['納|纳', '納'],
	['缇|緹', '緹'],
	['盗|盜', '盜'],
	['[剑剣劍劍]', '劍'],
	['[酱醬]', '醬'],
	['[团団]', '団'],
	['[绪緒]', '緒'],
	['[黑黒]', '黑'],
	['[価價]', '價'],
	['[祿禄]', '禄'],
	['[凱凯]', '凱'],

	//['[觉覚覺]', '覺'],

	['[鸠鳩]', '鳩'],

	['[獣獸]', '獸'],

	/*
	['国|國', '国'],
	['围|圍', '圍'],
	['階|阶', '階'],
	['亚|亞', '亞'],
	['薩|萨', '薩'],
	['爾|尔', '爾'],
	['烏|乌', '烏'],
	['贝|貝', '貝'],
	['諾|诺', '諾'],
	['马|馬', '馬'],
	['战|戦', '戦'],
	['创|創', '創'],
	//['炼|錬', '錬'],
	['术|術', '術'],
	*/
];

export let _zh_num = '一二三四五六七八九十';
export let _zh_num2 = '百十';
export let _full_num = '０１２３４５６７８９';

export function _word_en(search: string, ret: string = null, flag = 'ig'): IWords
{
	return [new RegExp(`(^|\\W)(${regex_str(search)})(?!\\w)`, flag), ((ret !== null) ? ret : '$1' + search)];
}

/**
 * 最好只用在全新腳本內
 *
 */
export function _word_zh_all(arr: IWords[])
{
	return arr.slice().map(function (value, index, array)
	{
		if (Array.isArray(value) && ((typeof value[0] == 'string') || isRegExp(value[0])))
		{
			let [s, ...a] = value.slice();

			s = _word_zh(s, null)[0];

			return [s, ...a];
		}

		return value;
	}) as IWords[];
}

export function _word_zh(search: string, ret: string | IRegExpCallback, flag?: string, skip?: string): IWords
export function _word_zh(search: RegExp, ret: string | IRegExpCallback, flag?: string, skip?: string): IWords
export function _word_zh(search, ret: string | IRegExpCallback, flags = 'ig', skip?: string)
{
	let s = replace_literal(search, function (text)
	{
		return _word_zh_core(text, skip);
	});

	// @ts-ignore
	flags = (s instanceof RegExp) ? null : flags;

	return [s, ret, flags] as IWords;
}

export function _word_zh_core(search: string, skip: string)
{
	return search.replace(/[\u4E00-\u9FFFの]/g, function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let jt = StrUtil.jp2zht(char);
		let js = StrUtil.jp2zhs(char);

		let a =[
			char,
			...zhtw_convert.tw(char),
			...zhtw_convert.cn(char),
		];

		if (!skip || skip.indexOf(jt) == -1)
		{
			a = a.concat(...zhtw_convert.cn(jt));
		}
		if (!skip || skip.indexOf(js) == -1)
		{
			a = a.concat(...zhtw_convert.tw(js));
		}

		if (zhtw_convert.table_jp[char])
		{
			a = a.concat(zhtw_convert.table_jp[char]);
		}

		a = array_unique(a);

		a.sort();

		return a.length > 1 ? '[' + a.join('') + ']' : a[0];
	});
}

export namespace zhtw_convert
{
	let _table = {
		'罗': '羅',
	};

	export const table_jp = {
		'の': [
			'之',
			'的',
		],
	};

	let _table_cn = Object.keys(_table)
		.reduce(function (a, b)
		{
			a[_table[b]] = b;

			return a;
		}, {})
	;

	export function tw(char): string[]
	{
		let a = [];

		if (_table[char])
		{
			a.push(_table[char])
		}

		a.push(cn2tw(char));

		return a;
	}

	export function cn(char): string[]
	{
		let a = [];

		if (_table_cn[char])
		{
			a.push(_table_cn[char])
		}

		a.push(tw2cn(char));

		return a;
	}
}

import * as self from './index';

export default self;
//export default exports;
