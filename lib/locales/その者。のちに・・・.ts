/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = 'その者。のちに・・・';

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
export const words: IWords[] = _word_zh_all([

	//['要取代的字', '取代後的字'],

	...lazymarks['class'],

	[/(　) ([\wＡ-Ｚ])/g, '$1$2'],


	...lazymarks[4],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	[/(\n　[\wＡ-Ｚ][^\n]+)\n{2,}(?=　[\wＡ-Ｚ])/ig, '$1\n'],

	[/(^[^　\n][^\n]+)\n{1,2}(?=　ＨＰ[：（]|姓名[：（])/igm, '$1\n\n\n'],
	[/^(　?ＡＧＩ[：（][^\n]+)\n{1,2}(?=[^　\n])/igm, '$1\n\n\n'],

	[/(\S)\n(?=─)/igm, '$1\n\n'],
	[/^(─[^\n]+)\n(?=\S)/igm, '$1\n\n'],

	_word_en(/[a-z]+/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	[/(ＡＧＩ（敏捷）)　+/g, '$1　　　　'],

	[/\n+(（插图）)\n+/g, '\n\n\n$1\n\n\n'],

]) as IWords[];

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
