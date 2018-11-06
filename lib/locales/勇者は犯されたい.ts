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

	_word_jp1('Seshiru|賽希爾|賽貝爾|セシル', '賽希爾'),

	['尤里斯', '尤里斯'],

	['憩劍亭|息劍亭', '憩劍亭'],

	['超擬真|超現實', '超擬真'],

	_word_jp1('リーナ|莉那|莉娜', '莉娜'),

	_word_jp1('ロア', '羅亞'),
	_word_jp1('レグノース', '雷古諾斯'),
	_word_jp1('ラディアン', '拉迪安'),

	_word_jp1('ルシード', '露西特'),

	_word_jp1('ヴィーズ', '維斯'),
	_word_jp1('ガンガル', '加恩加爾'),
	_word_jp1('ミュルグィ', '繆魯古依'),

	_word_jp1('アラサバロン', '阿拉薩巴隆'),

	_word_jp1('ローパー|樹繩妖|羅珀', '樹繩妖'),

	_word_jp1('マイクロビキニアーマー', '迷你比基尼裝甲'),

	_word_jp1('ダンジョン|地下城|地城', '地下城'),

	_word_jp1('ミニマップ|小地圖|迷你地圖', '迷你地圖'),

	_word_jp1('メンバー|成員', '成員'),
	_word_jp1('ダメージ', '傷害'),
	_word_jp1('モンスター', '怪物'),

	_word_jp1('パーティメンバー', '隊伍成員'),
	_word_jp1('パーティ', '隊伍'),

	['イベント', 'Event'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['惡心', '噁心'],
	['醒覺', '覺醒'],
	['発情', '發情'],

	[/^ +/gm, '　'],
	[/^　[　 ]+/gm, '　'],
	[/^　(?=「)/gm, ''],

	...sublib.lazymarks['class'],
	...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	[/[\[【]/g, '「'],
	[/[\]】]/g, '」'],

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
