/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en3, lazymarks, _word_jp1 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	//['要取代的字', '取代後的字'],

	_word_jp1('ルーギス', '路易斯'),

	_word_jp1('ナインズ', '南音絲'),
	_word_jp1('アリュエノ', '阿琉珥娜'),

	_word_jp1('加莉亞|カリア|卡麗婭', '卡麗婭'),
	_word_jp1('バードニック|帕多莉可|帕多利克', '帕多利克'),
	_word_jp1('バーベリッジ', '巴別利奇'),

	/**
	 *
	 */
	_word_jp1('ガーライスト', '卡拉伊斯特'),
	_word_jp1('科里登堡', '科里登堡'),

	/**
	 *
	 */
	_word_jp1('ガルーアマリア', '伽羅亞瑪利亞'),

	/**
	 *
	 */
	_word_jp1('パーミリスト', '帕米利斯'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks['ln_0010'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	...sublib.lazymarks[8],

	...lazymarks['clear_002'],

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
