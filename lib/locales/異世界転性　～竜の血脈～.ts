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

	_word_jp1('リア', '莉雅'),

	_word_jp1('レイアナ|蕾安娜|蕾雅娜', '蕾雅娜'),

	_word_jp1('クリストール|庫里素托魯|庫里蘇托魯', '庫里蘇托魯'),

	_word_jp1('アガサ|安卡沙', '安卡莎'),

	_word_jp1('ネイアス', '內阿蘇'),

	_word_jp1('リュクネイアス', '琉庫內阿蘇'),

	/**
	 *
	 */
	_word_jp1('フェイ|菲里|菲因', '菲'),

	_word_jp1('ルルー', '露露'),

	/**
	 *
	 */
	_word_jp1('ルーファス|魯霍蘇', '盧法斯'),

	// 雷阿蘇
	_word_jp1('ライアス', '萊亞斯'),

	_word_jp1('カルロス', '卡洛斯'),

	/**
	 *
	 */
	_word_jp1('ジョニー', '囧尼'),

	_word_jp1('オルフェ', '奧路菲'),
	_word_jp1('ルドルフ', '魯道夫'),
	_word_jp1('ブライアン', '布萊恩'),
	_word_jp1('マツカゼ', '松風'),

	/**
	 *
	 */
	_word_jp1('サージ', '薩基'),

	/**
	 *
	 */
	_word_jp1('リュクレイアーナ|流庫蕾安娜|流庫蕾雅娜|琉庫蕾雅娜', '琉庫蕾雅娜'),

	_word_jp1('リュク', '琉庫'),

	_word_jp1('レイテ', '蕾特'),
	_word_jp1('アナイア', '安奈阿'),

	/**
	 *
	 */
	_word_jp1('カサリア|卡?薩莉亞|卡薩里安|卡薩利亞', '卡薩莉亞'),
	_word_jp1('アナイアス', '安奈阿蘇'),

	_word_jp1('コルドバ', '科爾多巴'),
	/**
	 *
	 */
	_word_jp1('シャシミール', '夏斯米盧'),

	/**
	 *
	 */
	_word_jp1('クオルフォス', '庫歐魯霍蘇'),

	/**
	 *
	 */
	_word_jp1('ギグ', '紀咕'),

	/**
	 *
	 */
	_word_jp1('カラスリ', '卡拉斯里'),
	_word_jp1('アルス', '阿魯斯'),

	/**
	 *
	 */
	_word_jp1('リザードマン|蜥蜴曼', '蜥蜴人'),

	/**
	 *
	 */
	_word_jp1('ビンディ', '吉祥痣'),

	_word_jp1('竜の血脈', '竜之血脈'),
	_word_jp1('覇王の(?:卵|蛋)', '霸王之卵'),

	_word_jp1('ネクロノミコン', '死靈書'),

	_word_jp1('王の剣', '王の剣'),

	_word_jp1('撲殺リアちゃん', '撲殺的莉雅醬'),
	_word_jp1('竜が踏んでも壊れない|踏滅龍王女', '踏滅龍王女'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	['長曾彌虎切', '長曽彌虎徹'],

	['竜', '竜'],

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
	...lazymarks['8'],

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