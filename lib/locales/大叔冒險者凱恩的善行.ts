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

	_word_jp1('ケイン', '凱恩'),
	_word_jp1('安娜絲托蕾亞|安娜斯特蕾亞|アナストレア|安娜斯托裏雅|安娜克里雅', '安娜絲托蕾亞'),
	_word_jp1('安魯米利歐|安麓米莉恭|アルミリオン', '安魯米利歐'),

	_word_jp1('塞菲利亞|賽菲莉亞|セフィリア', '賽菲莉亞'),

	_word_jp1('マヤ', '瑪雅'),

	_word_jp1('アルテナ', '阿爾蒂娜'),

	_word_jp1('シルヴィア|希瓦爾|希爾維亞|希爾瓦', '希爾維亞'),

	_word_jp1('ミーヤ', '米雅'),
	_word_jp1('キッド', '基德'),

	_word_jp1('奇莎菈', '綺莎菈'),

	_word_jp1('歐格魯', '克歐魯格'),

	_word_jp1('バルカン|巴爾幹', '巴爾甘'),

	_word_jp1('奧利維亞|奧利維爾', '奧莉維亞'),

	/**
	 *
	 */
	_word_jp1('アウストリア|奧斯托里亞|奧斯托利亞', '奧斯托利亞'),

	/**
	 *
	 */
	_word_jp1('オーディア|歐迪亞|奧迪亞', '歐迪亞'),

	/**
	 *
	 */

	_word_jp1('ソバージュ', '索帕修'),

	_word_jp1('蘇生の実|蘇生の?果實', '蘇生的果實'),

	_word_jp1('ヤマユリ', '山百合'),

	_word_jp1('黑石松|石黑松', '黑石松'),

	_word_jp1('高所に咲く薔薇乙女団|(?:綻放在高處的|高嶺的|開在高處的|高處盛開的|在高處綻放的|盛開的|在高處開的|盛開在高處|高嶺綻放的)薔薇(?:少女|乙女)団', '高嶺綻放的薔薇乙女團'),
	_word_jp1('薔薇(?:少女|乙女)団', '薔薇乙女團'),

	_word_jp1('熊殺しの戦士団|熊殺戮的戰士團|殺熊的?戰士團', '熊殺的戰士團'),

	_word_jp1('薬草狩りの(?:ケイン|凱恩)|薬草狩りのケイン', '草藥狩獵的凱恩'),

	_word_jp1('草藥狩獵|狩獵草藥', '草藥狩獵'),

	_word_jp1('永久鎖縛|永久鎖鏈束縛|永久鎖鏈縛', '永久鎖縛'),

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
