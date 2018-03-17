/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
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
export const words: IWords[] = sublib._word_zh_all([

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
	[`威廉${sp}利維乌斯`, '威廉・利維乌斯'],
	[`${sp}冯${sp}泰勒`, '・冯・泰勒'],


	/**
	 *
	 */
	[`恩斯特${sp}达${sp}奧斯特貝尔格`, '恩斯特・达・奧斯特貝尔格'],
	[`阿波罗尼亞${sp}奧普${sp}亞克兰德`, '阿波罗尼亞・奧普・亞克兰德'],
	[`埃尔${sp}席德${sp}坎佩尔多`, '埃尔・席德・坎佩尔多'],

	[`${sp}冯${sp}`, '・冯・'],

	...sublib.lazymarks['class'],

	[/^[ 　　]+/gm, ''],

	[/(\S)\n{1,2}(○)/gm, '$1\n\n\n$2'],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

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
