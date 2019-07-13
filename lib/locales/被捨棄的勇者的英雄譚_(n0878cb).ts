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
export const words: IWords[] = _word_zh_all([

	['ユージ|由吉|雄二', '由吉'],

	['桂木君|Katsuragi-Kun|Keiki-Kun', '桂木君'],
	['桂木|Katsuragi', '桂木'],

	['浜風|濱風', '浜風'],
	['朱里|朱理|Shuri', '朱里'],
	['浜風朱里|濱風朱里', '浜風朱里'],

	['利多列德|利多利德|利多雷德|利德列德', '利多列德'],
	['阿基娜|阿奎那|アキナ|亞基拉', '阿基娜'],

	/**
	 *
	 */
	['米艾雷|ミアレ|米艾蕾|米艾露|米婭蕾爾爾?|米婭蕾|Miare|Miale|米亞蕾?', '米婭蕾'],
	['米婭蕾(桑|先生)', '米婭蕾桑'],
	['法爾瑪|Falma|弗魯曼|夫魯曼|ファルマ', '弗魯曼'],

	['米西雅|米俄羅斯|ミーシア', '米西雅'],

	['淫夢魔族', '淫夢魔族'],

	['莉利|リリ一|莉莉|麗麗', '莉莉'],
	['尤蘭亥木|シュラハム|修蘭?哈姆|修拉哈姆|修拉哈姆', '修蘭哈姆'],

	['蓋芬庫魯|ガ一ファンクル', '蓋芬庫魯'],
	['魯特娜一多|アルテナイト', '魯特娜一多'],

	['湯葉佑真', '湯葉佑真'],

	/**
	 *
	 */

	['鮫島', '鮫島'],
	['馬原圭斗', '馬原圭斗'],

	['佐島七奈美|佐島木奈美', '佐島七奈美'],
	['七奈美|Nanami|Seven Nami', '七奈美'],
	['佐島|薩西瑪|Sajima|Sasima|Sagoshima|Samejima', '佐島'],

	['亞利安娜|亞利安蕾|艾麗安涅|アリアン|艾麗阿涅', '亞利安蕾'],
	['賽蓮|セレン|雪蓮', '賽蓮'],

	/**
	 *
	 */

	['ガンダロス|钢達羅斯|甘達洛舒|Gandaros|甘達羅斯|岡達洛斯', '鋼達羅斯'],

	['庫蕾亞|庫拉莉雅|クラリア', '庫拉莉雅'],

	['羅素爾|拉塞魯|ラッセル', '羅素爾'],

	['瑞噶魯|利嘎魯|瑞嘎魯', '利嘎魯'],

	['特里亞斯|特里艾斯|テリアス|斯特里', '特里亞斯'],

	['羅沙路極亞|ロスタルジア|羅素塔魯加', '羅素塔魯加'],

	['亞里螞蟻', '亞里螞蟻'],

	['地牢|地下城|迷宮', '迷宮'],

	['行會|公會', '公會'],

	['碧─池', '碧池'],
	['交─尾', '交尾'],

	['接待姑?娘', '接待娘'],

	['灼熱の?処刑場|灼熱處刑場', '灼熱の処刑場'],

	[/^[　  ]+/gm, ''],

	...lazymarks['class'],

	...lazymarks[4],

	_word_en(/\d+g?/ig, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	[/[【]/g, '「'],
	[/[】]/g, '」'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],




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
