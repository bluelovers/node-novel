/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, lazymarks, _word_jp1 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	_word_jp1('リオン|里昂|利昂', '里昂'),
	_word_jp1('バルトファルト|巴爾特法特|巴魯德菲魯特|巴爾特費爾德', '巴爾特費爾德'),

	_word_jp1('バルカス', '巴爾卡斯'),
	_word_jp1('リュース', '琉斯'),

	_word_jp1('ルトアート', '盧特爾特'),
	_word_jp1('メルセ', '梅爾切'),

	_word_jp1('ニックス', '尼克斯'),

	_word_jp1('コリン', '科林'),

	_word_jp1('ゾラ', '索拉'),
	_word_jp1('フィア', '菲亞'),

	_word_jp1('ジェナ', '珍娜'),

	/**
	 *
	 */
	_word_jp1('拉克森|光子號|ルクシオン|路克西翁|路庫西翁', '路克西翁'),
	_word_en('Luxon', '路克西翁'),

	/**
	 *
	 */
	_word_jp1('ダニエル|達尼艾魯|達尼艾特', '達尼艾特'),
	_word_jp1('ダーランド', '達朗德'),

	_word_jp1('レイモンド|雷蒙特', '雷蒙德'),
	_word_jp1('アーキン', '弗爾金'),

	_word_jp1('ルクル|魯可爾|魯庫爾', '魯庫爾'),

	_word_jp1('ジルクア', '吉魯庫'),
	_word_jp1('マーモリア|蒙莫里阿', '蒙莫里阿'),

	_word_jp1('アンジェリカ|安杰麗卡|安吉麗卡', '安吉麗卡'),
	_word_jp1('ラファ', '拉菲'),
	_word_jp1('レッドグレイブ', '雷德古勒普'),

	_word_jp1('マリエ', '瑪麗艾'),
	_word_jp1('ラーファン', '拉芳'),

	_word_jp1('オリヴィア', '奧利維亞'),

	/**
	 *
	 */
	_word_jp1('ブラッド', '布萊德'),
	_word_jp1('フィールド', '菲魯特'),

	/**
	 *
	 *
	 */
	_word_jp1('ユリウス', '尤里烏斯'),
	_word_jp1('ラファ', '拉法'),
	_word_jp1('ホルファート', '霍爾法特'),

	/**
	 *
	 */

	_word_jp1('レリア|蕾利亞', '蕾利亞'),
	_word_jp1('セルジュ|賽爾吉', '賽爾吉'),

	/**
	 *
	 */

	_word_jp1('パワードスーツ', 'Power Suit'),

	_word_jp1('フォウ', '馮'),
	[`${sp}佛${sp}`, '・馮・'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/^[　 ]+/gm, ''],

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	//...sublib.lazymarks['full_width_002'],

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
