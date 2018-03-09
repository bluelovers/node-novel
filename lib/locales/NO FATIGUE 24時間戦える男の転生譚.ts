/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = 'NO FATIGUE 24時間戦える男の転生譚';

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
	 * 埃德加・彻貝尔
	 */
	['加木智紀|加树智纪|嘉義智紀', '加木智紀'],
	['艾德加|埃德加', '艾德加'],


	/**
	 *
	 */
	['杵崎亨|杵岬亨', '杵崎亨'],

	/**
	 * 阿尔弗雷德・彻貝尔
	 * 母亲：茱莉娅
	 * 貝勒哈特
	 * 彻斯特
	 * 大卫
	 */
	['朱麗葉|茱莉娅', '茱莉娅'],

	/**
	 * 魔神摩卢恩韦苏
	 */

	/**
	 * 圣塔玛那王国
	 */

	/**
	 *
	 */
	['玛瑞克多|瑪爾克多?', '玛瑞克多'],

	/**
	 * 阿巴頓魔法全書
	 */
	['不易不労|不易不劳', '不易不労'],
	['インスタント通訳|即时解读', '即时解读'],
	['善神の加護|善神的祝福', '善神の加護'],
	['炎獄の魔女|炎獄的魔女', '炎獄的魔女'],

	/**
	 *
	 */
	['皇家的?图书馆|王立图书馆|王立図書館', '王立圖書館'],
	['図書館', '圖書館'],

	/**
	 *
	 */

	[/^(?: |(　) )/gm, '$1'],
	[/^　(?!　)/gm, ''],

	[/(\d+)/g, function (...m)
	{
		return StrUtil.toFullNumber(m[1]);
	}],

	[/([^\w\u00C0-\u017F\.μ・·?‧•―-])([a-z])(?![\w\u00C0-\u017F\.μ・·?‧•―-])/ig, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}],

	[/LV|HP|MP|EXP/ig, function (s)
	{
		return StrUtil.toFullEnglish(s.toUpperCase());
	}],

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
