/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, lazymarks } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['ルオン|路恩|盧埃恩', '路恩'],
	['マディン|馬丁', '馬丁'],

	[`路恩${sp}馬丁`, '路恩＝馬丁'],

	/**
	 *
	 */

	[`菲利${sp}阿克雷斯`, '菲利＝阿克雷斯'],
	[`卡蒂${sp}伊蝶特`, '卡蒂＝伊蝶特'],

	/**
	 *
	 */

	['巴魯庫斯|巴魯克斯', '巴魯庫斯'],
	[`艾伊娜${sp}弗古特`, '艾伊娜＝弗古特'],

	[`格拉贊${sp}達丹魯`, '格拉贊＝達丹魯'],
	[`弗歐雷${sp}歐盧拉庫`, '弗歐雷＝歐盧拉庫'],

	['庫洛迪烏斯', '庫洛迪烏斯'],
	['蘇菲莉亞', '蘇菲莉亞'],

	['ナグレイト|拉故雷托', '拉故雷托'],
	['奧達|オーダ', '奧達'],

	['西魯貝特', '西魯貝特'],

	[`蘇菲亞${sp}拉托魯`, '蘇菲亞＝拉托魯'],

	/**
	 *
	 */

	[`基魯巴特${sp}洛克恩克`, '基魯巴特＝洛克恩克'],
	[`阿魯托${sp}姆雷特`, '阿魯托＝姆雷特'],

	['萊茲', '萊茲'],
	['卡蜜拉', '卡蜜拉'],

	[`凱倫${sp}芭菲`, '凱倫＝芭菲'],
	['理察魯', '理察魯'],

	[`斯特拉${sp}姆雷特`, '斯特拉＝姆雷特'],
	[`伊格諾斯${sp}阿魯凡`, '伊格諾斯＝阿魯凡'],

	/**
	 *
	 */
	[`伊蕾${sp}瑪庫魯蒂`, '伊蕾＝瑪庫魯蒂'],
	[`西爾維${sp}艾庫阿斯`, '西爾維＝艾庫阿斯'],
	[`西爾特${sp}艾庫阿斯`, '西爾特＝艾庫阿斯'],

	[`庫札${sp}巴菲特`, '庫札＝巴菲特'],

	/**
	 *
	 */
	[`莉莉莎${sp}娜坦特魯`, '莉莉莎＝娜坦特魯'],
	[`巴魯薩多${sp}阿拉斯托爾`, '巴魯薩多＝阿拉斯托爾'],

	[`艾薩剋|艾薩克`, '艾薩克'],

	/**
	 *
	 */
	[`拉迪${sp}迪亞蒙多`, '拉迪＝迪亞蒙多'],
	[`內斯特${sp}伊巴斯`, '內斯特＝伊巴斯'],

	/**
	 *
	 */
	[`米哈爾`, '米哈爾'],
	[`理察魯${sp}阿迪特`, '理察魯＝阿迪特'],
	[`蕾特${sp}凱菈`, '蕾特＝凱菈'],

	/**
	 *
	 */
	[`迦納庫${sp}巴倫特`, '迦納庫＝巴倫特'],

	/**
	 *
	 */
	[`西路庫${sp}弗洛`, '西路庫＝弗洛'],
	[`赫斯洛${sp}姆拜因`, '赫斯洛＝姆拜因'],
	[`阿提雷${sp}洛丹古`, '阿提雷＝洛丹古'],

	/**
	 *
	 */
	[`馬里恩`, '馬里恩'],
	[`馬里安`, '馬里安'],

	/**
	 *
	 */

	['Nateria|納特利亞', '納特利亞'],
	['聖路奇亞|シェルジア', '聖路奇亞'],

	/**
	 *
	 */

	['奇葩|奇鈀', '奇葩'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	...lazymarks['class'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	//...lazymarks['full_width_002'],

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

/**
 * 其他用途
 *
 * @deprecated
 * @type {{chapter_id: string; chapter_title: string; volume_id: string; volume_title: string}}
 */
export const value = {
	chapter_id: '第{{0}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,

	volume_id: '第{{0}}章',
	volume_title: `$t(chapter_id, [{{0}}])：{{title}}`,
};

export default exports;
