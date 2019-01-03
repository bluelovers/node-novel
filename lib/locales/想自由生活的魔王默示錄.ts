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

	_word_jp1('ユキ|优纪', '優紀'),

	_word_jp1('レフィシオス|雷菲亚斯', '雷菲亞斯'),
	_word_jp1('イルーナ|依露娜', '依露娜'),
	_word_jp1('レイエス|雷亚斯', '雷亞斯'),

	_word_jp1('ルローレ|露罗菈', '露羅菈'),
	_word_jp1('グリファ|格利法', '格利法'),

	_word_jp1('レイラ|蕾拉', '蕾拉'),

	_word_jp1('リューイン|蕾茵', '蕾茵'),
	_word_jp1('ギロル|吉洛尔', '吉洛爾'),

	[`蕾茵${sp}吉洛爾`, '蕾茵＝吉洛爾'],

	_word_jp1('レイド|雷德', '雷德'),
	_word_jp1('グローリオ|格罗里奥', '格羅里奧'),
	_word_jp1('アーリシア|亚利西亚', '亞利西亞'),

	[`${sp}格羅里奧${sp}亞利西亞`, '＝格羅里奧＝亞利西亞'],

	/**
	 *
	 */

	_word_jp1('蝙蝠|コウモリ', '蝙蝠'),
	_word_jp1('龍|ドラゴン', '龍'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

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
