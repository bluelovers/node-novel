/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp, sp2 } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = 'カルマの塔';

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
export const words_source: IWords[] = [

	//['要取代的字', '取代後的字'],

	/**
	 * 阿尔卡迪亞王国（アルカディア王国）
	 * 王都阿尔卡斯（アルカス）
	 *
	 * 阿尔蕾特（アルレット）
	 * 卡伊魯（カイル）
	 *
	 * 阿尔蕾特的贵族，弗拉德伯爵（ヴラド伯）
	 *
	 * 卢西塔尼亞（ルシタニア）
	 */
	['卡伊露|卡伊魯', '卡伊魯'],
	[`威廉${sp}利維乌斯`, '威廉・利維烏斯'],
	[`${sp}冯${sp}泰勒`, '・馮・泰勒'],


	/**
	 *
	 */
	[`恩斯特${sp}达${sp}奧斯特貝尔格`, '恩斯特・達・奧斯特貝爾格'],
	[`阿波罗尼亞${sp}奧普${sp}亞克兰德`, '阿波羅尼亞・奧普・亞克蘭德'],
	[`埃尔${sp}席德${sp}坎佩尔多`, '埃爾・席德・坎佩爾多'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	[`${sp}冯${sp}`, '・馮・'],

	...lazymarks['class'],

	[/^[ 　　]+/gm, ''],

	[/(\S)\n{1,2}(○)/gm, '$1\n\n\n$2'],

	...lazymarks[4],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

]);

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
