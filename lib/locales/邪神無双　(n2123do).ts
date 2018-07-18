/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '';

/**
 * 其他用途
 *
 * @type {{chapter_id: string; chapter_title: string; volume_id: string; volume_title: string}}
 */
export const value = {
	chapter_id: '第{{0}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,

	volume_id: '第{{0}}章',
	volume_title: `$t(chapter_id, [{{0}}])：{{title}}`,
};

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words: IWords[] = sublib._word_zh_all([


	['晴艾|晴愛', '晴艾'],
	['蛤蠣|奴隷', '奴隷'],

	...sublib.lazymarks['class'],

	[/\n+(\S)(?=[^\n]*\n種族：)/gm, '\n\n\n$1'],
	[/\n{2,}(?=種族：)/gm, '\n\n\n'],

	[/^(  +)(?=[^\s　])/gm, function (s)
	{
		return s.replace(/  /g, '　');
	}],

	[/^(　+) (?=\S)/gm, '$1　'],

	_word_en(/\d+g/ig, function (...m: string[])
	{
		return m[1] + StrUtil.toFullWidth(m[2].toUpperCase());
	}),

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	[/^(『[^』]+)\n\n(?=　)/gm, '$1\n'],
	[/^(「[^」]+)\n\n(?=　)/gm, '$1\n'],

	[/^(技能：[^\n]*)\n{2,}(?=　)/gm, '$1\n'],
	[/^([^\s]+：[^\n]*)\n{2,}(?=[^\s]+：)/gm, '$1\n'],

	[/^([^\s]+：[^\n]*)\n(?=種族：)/gm, '$1\n\n\n'],

	[/^(　.・[^\n]+)\n{2,}(?=　.・)/gm, '$1\n'],

	[/^([^\s]{2,}：[^\n]*)\n(?=Ｑ：)/gm, '$1\n\n\n'],

	[/^(伶二[^\n]*)\n+(?=種族：)/gm, '$1\n'],

	[/^ +/gm, ''],

	[/(  +)/gm, function (s)
	{
		return s
			.replace(/  /g, '　')
			.replace(/　 (?=\S)/g, '　　')
			;
	}],

	[/： (?=\S)/gm, '：'],

] as IWords[]);

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: vMaybe = [

	//'需要偵測的字',

] as vMaybe;

/**
 * 分析取代完成後執行的代碼
 *
 * @param {string} text
 * @returns {string}
 */
export function words_callback(text: string): string
{
	return text;
}

export default exports;
