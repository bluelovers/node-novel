/**
 * Created by user on 2018/1/25/025.
 */

import { IWords } from '../';
import * as StrUtil from 'str-util';
import { regex_str, array_unique } from '../../func';
import { cn2tw, tw2cn } from 'chinese_convert';

export const lazymarks = {} as IWords[][];

lazymarks[0] = [
	[/([\u4E00-\u9FFF])\[([^\n【】<>\[\]\{\}『』「」“”'"]+)\]/g, '$1【$2】'],
];

lazymarks[1] = [
	[/"([^\n"']*)'([^'"\n]+)'/gm, '"$1『$2』'],
	[/"([^\n"']*)'([^'"\n]+)'/gm, '"$1『$2』'],

	[/^([^\n"“”「」'\[\]［］]*)["“'\[［]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ『』\u4E00-\u9FFF][^\n"“”「」'\[\]［］]*(?:\n[^\n"“”「」'\[\]［］]*)?)["”'\]］]/gm, '$1「$2」'],
	[/^([^\n"“”『』'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”『』'‘’]*)["”'’]/gm, '$1『$2』'],
	[/^([^\n【】<>]*)[<]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>]*)[>]/gm, '$1【$2】'],

	[/(『[^『』\n]+』[^\n"“”『』'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”『』'‘’]*)["”'’]/gm, '$1『$2』'],
	[/(「[^「」\n]+」[^\n"“”「」'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”「」'‘’]*)["”'’]/gm, '$1「$2」'],

	[/^([^「」\n【】\[\]［］\{\}]*)[\[［\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】\[\]］\{\}]*)[\]］\}]/gm, '$1【$2】'],
	[/(「[^「」\n【】\[\]［］]*)[\[［]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】\[\]］]*)[\]］]/gm, '$1【$2】'],


	[/(【[^【】\n<>\[\]\{\}]+】[^\n【】<>\[\]\{\}]*)[<\[\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>\[\]\{\}]*)[\]\}>]/gm, '$1【$2】'],
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

	[/([「『]{2,})([^「『\n』」]+)([』」]{2,})/g, function (...m)
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
	}],
];

lazymarks[4] = [
	[/[\!\(\):,~]+/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

	[/\?+(?=[』」\n])/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

	[/([\u4E00-\u9FFF])(\?+)(?=[』」\n ][^\u4E00-\u9FFF])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		});
	}],

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

	].map(function (value)
	{
		return _word_en(value);
	}),

];

export let _zh_num = '一二三四五六七八九十';
export let _zh_num2 = '百十';
export let _full_num = '０１２３４５６７８９';

export function _word_en(search: string, ret: string = null, flag = 'ig')
{
	return [new RegExp(`(^|\\W)(${regex_str(search)})(?!\\w)`, flag), ((ret !== null) ? ret : '$1' + search)];
}

export function _word_zh(search: string, ret, flag = 'ig', skip?: string)
{
	let s = _word_zh_core(search, skip);

	return [s, ret, flag];
}

export function _word_zh_core(search: string, skip: string)
{
	return search.replace(/[\u4E00-\u9FFF]/g, function (char)
	{
		if (skip && skip.indexOf(char) != -1)
		{
			return char;
		}

		let t = zhtw_convert.tw(char);
		let s = zhtw_convert.cn(char);

		let a = array_unique([char, ...t, ...s]);

		return a.length > 1 ? '[' + a.join('') + ']' : a[0];
	});
}

export namespace zhtw_convert
{
	let _table = {
		'罗': '羅',
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
