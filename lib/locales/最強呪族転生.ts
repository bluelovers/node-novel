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


	/**
	 * 馬尔蓮族
	 */
	['亞伯|アベル|亞貝尔|亞貝魯', '亞貝魯'],
	['貝雷克|ベレーク', '貝雷克'],

	['亞貝魯・(馬|瑪)雷', '亞貝魯・貝雷克'],

	['姬澤露|ジゼル', '姬澤露'],
	['ゼレルート|泽列特|澤列魯特|澤利特', '澤列魯特'],
	['澤列|澤利', '澤列'],

	['マーレン|馬尔蓮?|瑪雷|馬雷', '瑪雷'],

	['阿德|アーディー', '阿德'],
	['ガリア|加里奧', '加里奧'],
	['シビィ|西碧', '西碧'],

	['菲羅', '菲羅'],

	/**
	 *
	 */
	['オーテム|歐特魯', '歐特魯'],

	/**
	 *
	 */
	['爾古木|ニグム', '爾古木'],
	['博亞|ボア', '博亞'],
	['希姆帕咯特|シムパロット', '希姆帕咯特'],

	// --------------

	[/^　/gm, ''],

	[/【/g, '「'],
	[/】/g, '」'],

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

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
