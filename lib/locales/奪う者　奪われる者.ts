/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '奪う者　奪われる者';

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

	['斯特拉|史黛拉', '史黛拉'],

	['妮娜', '妮娜'],

	['蕾娜|莱娜|莉娜', '蕾娜'],

	['乌茲|伍茲', '乌茲'],
	['(乌|伍)，(乌|伍)茲', '乌，乌茲'],

	/**
	 * 利瑟鲁村
	 */
	['雷塞尔|利瑟鲁', '利瑟鲁'],

	/**
	 * 聖国
	 */
	['賈达尔克|贞德塔奴庫', '贞德塔奴庫'],

	/**
	 * 自由国家
	 */
	['哈默尔(恩|嗯)|哈莫尔恩|哈梅伦', '哈默尔恩'],
	['基金山脉|奇金山脉', '奇金山脉'],
	['龙巢|竜之巢', '竜之巢'],

	/**
	 * 卡莫
	 */
	['卡莫都市|都市卡莫', '卡莫都市'],
	['慕卡|穆加', '穆加'],
	['阿黛尔', '阿黛尔'],
	['可蕾特|科莱特', '科莱特'],
	['拉利德|拉利特', '拉利德'],


	['(?:利克里斯|利克利斯|匹克莉絲)(?:的?(酒吧))?', '利克利斯$1'],

	/**
	 * 赤色流星
	 */
	['德利特|雷利特', '雷利特'],

	/**
	 * 贵族
	 */
	['戈鲁巴多|格尔巴德', '格尔巴德'],

	/**
	 * 莫达利提教団
	 */
	['莫达利提教団|不朽教団', '不朽教団'],
	['克里亞|克利亞', '克利亞'],

	['不死的佣兵団|不死の?佣兵団', '不死的佣兵団'],

	['特佩|沛哲', '特佩'],
	['馬古諾特|馬格諾托', '馬古諾特'],

	['卡?波尔', '波尔'],
	['赛亞|瑟雅', '赛亞'],
	[`赛亞${sp}(?:罗斯|罗伯特)`, '赛亞・罗伯特'],


	/**
	 *
	 */
	['耶亞溫|伊恩', '伊恩'],

	/**
	 * 迷宫
	 */
	['腐界的恩利欧|腐界的因弥欧', '腐界的因弥欧'],
	['哥尔哥|戈尔多', '戈尔多'],

	/**
	 *
	 */
	['旭雷卡|赛卡', '旭雷卡'],

	['貝宁托斯|貝納图斯', '貝納图斯'],

	['西斯哈的坠饰|西斯哈的项炼', '西斯哈的项炼'],

	/**
	 *
	 */

	['(斗|闘)技', '闘技'],
	['哥布尔|哥布林', '哥布林'],

	...([
		'LV',
		'HP',
		'MP',
	].map(function (value)
	{
		return ['([^\\w０-９Ａ-Ｚ])' + value.split('').concat('').join('[ ]?') + '(?![\\w０-９Ａ-Ｚ])', '$1' + StrUtil.toFullEnglish(value), 'ig'];
	})),

	[/([^\w\u00C0-\u017F\.μ・·?‧•―-])([\w])(?![\w\u00C0-\u017F\.μ・·?‧•―-])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}],

	[/\d+/g, function (s)
	{
		return StrUtil.toFullNumber(s);
	}],

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

]);

console.log(words);

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
