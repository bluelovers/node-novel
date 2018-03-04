/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '転生したら剣でした';

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

	/**
	 *
	 */
	['(格|古|哥)魯迪西亞', '格魯迪西亞'],

	/**
	 *
	 */
	['Berserk(?:er)?', 'Berserker'],
	['Diablos?|Diaborosu', 'Diablo'],
	['Igunisu|Ignis', 'Ignis'],

	['始神劍(阿爾法（Alpha）|Alpha（阿爾法）)', '始神劍阿爾法（Alpha）'],
	['狂神劍(狂暴（Berserker）|Berserker（(英語，狂戰士|霸薩卡：狂戰士)）)', '狂神劍狂暴（Berserker）'],
	['(煌|火)炎劍(伊格尼斯（Ignis）|Ignis(?:（伊格尼斯(?:，火精靈)）)?)(?:（伊格尼斯）)?', '煌炎劍伊格尼斯（Ignis）'],
	['大地劍(Gaia(（希臘神話的地母蓋亞）)?|蓋亞（Gaia）)', '大地劍蓋亞（Gaia）'],
	['魔王?劍(Diablo|迪亞波羅(（Diablo）)?)(?:（Diabolo Su？）)?(（迪亞布羅）)?', '魔王劍迪亞波羅（Diablo）'],

	/**
	 *
	 */

	['(料理|飯菜)王?(比|競)技?賽|料理競賽|料理王競技賽|料理王比賽', '料理競賽'],
	['(料理|飯菜)', '料理'],

	['工会|公会|行会', '公会'],
	['(料理|飯菜)公会', '料理公会'],

	[/(：[^\?\n]+)\?(?!\?)/gm, '$1・'],

	...sublib.lazymarks['class'],

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
