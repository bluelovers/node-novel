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

	['劍的城市|劍的都市', '劍的都市'],
	['豬頭人国?王', '豬頭人王'],

	['劍士(?:工|公)会', '劍士公会'],
	['(?:工|公)会', '公会'],

	['鋼劍士|刚劍士', '鋼劍士'],
	['莉莉婭|莉莉安|莉莉亞', '莉莉婭'],

	['阿雷魯|阿勒魯|亞历爾', '阿勒魯'],

	['活体鎧甲|幽魂鎧甲', '幽魂鎧甲'],
	['神附体|神附身', '神附体'],

	['最高級(工作|職業)', '最高級職業'],
	['無職', '無職'],
	['職', '職'],

	[/[〝＂]([^〝〟「」『』＂\n]+)〟/g, '〈$1〉'],

	...sublib.lazymarks['class'],

	[/^ +/gm, ''],
	[/^　(?=[^　])/gm, ''],

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
