import { lazymarks } from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { _zh_num2, sp, sp2, _zh_num, _full_num, EN_REGEXP } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';
import { _word_zh } from 'regexp-cjk/lib';
import { EnumLazyMarkKeys } from '@node-novel/layout-pattern/lib/core/pattern-keys';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '' as const;

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IPatternRule["words_source"] = [

	//['要取代的字', '取代後的字'],
	//_word_jp1('日文原名專用', '日文原名專用'),
	//_word_en3('英文專用', '英文專用'),

	_word_jp1('アレン', '亞蓮'),
	_word_jp1('ロードル|洛德爾', '羅德爾'),

	[`亞蓮${sp}羅德爾`, '亞蓮＝羅德爾'],

	/**
	 *
	 */
	_word_jp1('ドドリエル', '多多利艾爾'),
	_word_jp1('バートン', '波頓'),

	_word_jp1('ポーラ|寶拉', '寶菈'),
	_word_jp1('ガレッドザール', '加雷德贊爾'),

	_word_jp1('グラン|古蘭', '格蘭'),

	/**
	 * 千刃
	 *
	 * 蕾雅 莉亞
	 */
	_word_jp1('レイア', '蕾雅'),
	_word_jp1('ラスノート', '拉斯諾特'),

	_word_jp1('ローズ|夢絲', '蘿絲'),
	_word_jp1('バレンシア|羅巴崙西亞', '巴倫西亞'),

	[`蘿絲${sp}巴倫西亞`, '蘿絲＝巴倫西亞'],

	_word_jp1('リア', '莉亞'),
	_word_jp1('ヴェステリア', '維斯特利亞'),

	[`莉亞${sp}維斯特利亞`, '莉亞＝維斯特利亞'],

	/**
	 * 冰王
	 */
	_word_jp1('フェリス', '菲利斯'),
	_word_jp1('ドーラハイン', '多拉海茵'),

	/**
	 *
	 */
	_word_jp1('バブル', '巴布爾'),

	/**
	 * 到故鄉的搞砸村走小路要花十小時以上【發音同搞砸的村子，或者叫哥砸村？】
	 *
	 * 搞砸 吳座
	 */
	_word_jp1('ゴザ', '戈薩'),

	_word_jp1('ダリア', '丹莉亞'),

	/**
	 *
	 */
	_word_jp1('オーレスト|歐利斯特', '歐勒斯特'),

	/**
	 *
	 */
	_word_jp1('ヤイバ', 'YAIBA'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	_word_jp1('八咫烏|八尺烏', '八咫烏'),

	...lazymarks['clear_002'],

	...lazymarks['class'],
	...lazymarks['class_002'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['ln_0010'],

	...lazymarks['4'],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	/**
	 * 無差別將 【】 轉為對話符號
	 * 如果可以盡量不要使用此規則
	 */
	...lazymarks['7'],
	/**
	 * 將可能是對話的 【】 轉為對話符號
	 * 如果可以盡量不要使用此規則
	 */
	//...lazymarks['8'],

	/**
	 * 適用於具有大量長段 而只縮減對話之間的空格使用
	 */
	...lazymarks['ln_talk'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IPatternRule["words"] = _word_zh_all([

	...words_source,

	...words_layout,

] as IWords[]);

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: IPatternRule["words_maybe"] = [

	//'需要偵測的字',

];

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

export default <IPatternRule>{
	lang,
	words_source,
	words_layout,
	words,
	words_maybe,
	words_callback,
}