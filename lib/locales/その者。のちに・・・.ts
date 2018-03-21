/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';
import { sublib } from './index';
import { _word_en } from './lib/index';
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
export const words: IWords[] = sublib._word_zh_all([

	//['要取代的字', '取代後的字'],

	...sublib.lazymarks['class'],

	[/(　) ([\wＡ-Ｚ])/g, '$1$2'],


	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

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
