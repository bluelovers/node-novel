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

	_word_jp1('シオン', '西恩'),
	_word_jp1('アックス', '阿克斯'),

	_word_jp1('ハク', '哈庫'),
	_word_jp1('ハクコ', '哈庫珂'),



	/**
	 *
	 */
	_word_jp1('カルー|カール', '卡魯'),

	_word_jp1('リン|玲', '琳'),
	_word_jp1('マリー', '瑪麗'),

	/**
	 *
	 */
	_word_jp1('オルガン', '波魯加'),

	_word_jp1('ゴールドヘルム', '黃金頭盔'),
	_word_jp1('ドル', '多魯'),
	_word_jp1('ガル', '加魯'),
	_word_jp1('ユーナ', '尤娜'),
	_word_jp1('フェルム', '菲魯姆'),

	_word_jp1('ローネ', '羅尼'),

	_word_jp1('サブラン', '薩布朗'),

	_word_jp1('サツロー', '沙之駱'),

	_word_jp1('ジャン', '丈'),

	_word_jp1('エドバン|愛德班', '艾巴登'),

	_word_jp1('ランディル', '蘭迪魯'),

	_word_jp1('リリー', '莉莉'),

	/**
	 *
	 */
	_word_jp1('ダブルライトニング', '雙重雷光'),

	_word_jp1('三つ蛇', '三頭蛇'),

	_word_jp1('ガウン', 'ガウン'),

	_word_jp1('アルトセイバー', '阿魯多之劍'),

	_word_jp1('バザール', '義賣會'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	['闇(勇者|屬性|分身)', '闇$1'],
	['闇の勇者', '闇之勇者'],

	['異變種', '變異種'],

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
	//...lazymarks['7'],
	/**
	 * 將可能是對話的 【】 轉為對話符號
	 * 如果可以盡量不要使用此規則
	 */
	//...lazymarks['8'],

	/**
	 * 適用於具有大量長段 而只縮減對話之間的空格使用
	 */
	//...lazymarks['ln_talk'],

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
