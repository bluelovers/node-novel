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

	_word_jp1('ゼオリス|澤歐里斯', '澤歐里斯'),

	[`帕拉蘇蒂斯${sp}沐爾斯`, '帕拉蘇蒂斯・沐爾斯'],

	_word_jp1('梅琳娜|メリナ|瑪麗娜', '目里奈'),
	_word_jp1('艾蕾娜|艾莉娜|エレーナ', '艾蕾娜'),

	_word_jp1('ブレイザ|卜雷澤|普雷澤', '布雷澤'),
	_word_jp1('ユベンタ', '幽弁塔'),

	/**
	 *
	 */
	_word_jp1('グスリタス', '格斯利塔斯'),
	_word_jp1('ナーシ', '娜莎'),

	_word_jp1('エドモンド', '埃德蒙頓'),

	/**
	 *
	 */
	_word_jp1('ヴェルラヤ', '貝魯拉雅'),
	_word_jp1('ガールダ', '嘉爾達'),

	_word_jp1('オーマン・レギン', '奧曼・雷根'),
	_word_jp1('リューイ・シェード', '琉伊・賽德'),

	_word_jp1('ムドー', '繆多'),

	_word_jp1('夏爾哈里|夏爾哈利|查爾哈里', '夏爾哈利'),

	/**
	 *
	 */
	_word_jp1('ルーベンフィリオ|雷本菲利奧|魯本法里奧|盧本菲利奧', '盧本菲利奧'),

	_word_jp1('クレイビート', '克萊比特'),
	_word_jp1('サンシャイの丘', '日照山坡'),

	_word_jp1('クオバル', '庫歐瓦爾'),



];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	[/(?<=[」』”])，$/gm, ''],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['ln_0010'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	...lazymarks[8],

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
