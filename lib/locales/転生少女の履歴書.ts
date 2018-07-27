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

	['莉尤|リョウち', '莉尤'],

	['蓋因|凱因', '凱因'],

	['塔古沙克|塔言沙克|タゴサク|塔古之克', '塔古沙克'],
	['亞歷山大', '亞歷山大'],

	['賽奇|セキ|瑟基', '賽奇'],
	['利尤奇|リュウキ', '利尤奇'],
	['巴修|巴什', '巴修'],

	['艾妮耶絲|アニエス', '艾妮耶絲'],

	['卡特麗娜|卡特莉娜|卡特里娜', '卡特麗娜'],
	['莎樂美|莎欒美|莎乐美', '莎樂美'],

	['咕里咕里', '咕里咕里'],
	['卡里卡里', '卡里卡里'],

	//[/一\s-|-\s一|一一/, '──'],

	...sublib.lazymarks['class'],

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
