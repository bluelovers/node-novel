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

	_word_jp1('からぼしはるき', '空星晴輝'),

	_word_jp1('ランカー|排行者', '排位者'),

	_word_jp1('セガール|西格爾', '席格'),

	_word_jp1('政次|マサツグ', '正次'),

	_word_jp1('黒咲火蓮', '黒咲火蓮'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

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