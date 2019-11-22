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

	_word_jp1('マリコ|麻里子|麻理子', '麻里子'),

	/**
	 *
	 */
	_word_jp1('アリア', '亞里亞'),
	_word_jp1('カミル|卡密魯|卡米爾', '卡米魯'),

	_word_jp1('サニア|薩妮婭|薩尼婭', '薩妮婭'),
	_word_jp1('タリア|丹妮婭|塔利亞', '塔莉婭'),

	_word_jp1('ハザール|ハザ—ル|卡薩魯', '哈薩爾'),

	_word_jp1('ラシー', '拉茜'),
	_word_jp1('ゲナー', '吉娜'),
	_word_jp1('カノー', '卡農'),

	_word_en3('NAZAR', '納薩爾'),
	_word_jp1('ナザール|納賽爾', '納薩爾'),

	_word_jp1('ミランダ', '米蘭達'),

	_word_jp1('シーナ', '席娜'),
	_word_jp1('ジュリア', '茱莉亞'),
	_word_jp1('マリーン', '瑪琳'),

	_word_jp1('エリー', '伊莉'),

	_word_jp1('プラット', '普拉托'),

	/**
	 *
	 */
	_word_jp1('バルトランド', '巴爾特蘭德'),
	_word_jp1('バルト', '巴爾特'),

	_word_jp1('トルステン', '托爾斯頓'),

	_word_jp1('サンドラ', '珊德拉'),

	_word_jp1('カリーナ', '卡琳'),

	_word_jp1('ミカ', '米卡'),
	_word_jp1('ミカエラ', '米卡埃菈'),

	/**
	 *
	 */
	_word_jp1('ハーウェイ', '哈維伊'),

	/**
	 *
	 */
	_word_jp1('ヤシマ', '矢島'),

	/**
	 *
	 */
	_word_jp1('ハジメ', '哈基米'),
	_word_jp1('ヒューマン', '赫曼'),
	_word_jp1('ツヅキ', '斯茲卡'),

	// ----------

	_word_jp1('野雞虎|雉トラ', '棕色虎斑'),
	_word_jp1('赤トラ|紅色的老虎', '赤虎'),

	_word_jp1('ダンジョン|地宮', '迷宮'),

	_word_jp1('ホワイトアウト', '白化'),
	_word_en3('White Out', '白化'),

	_word_jp1('コリー', '牧羊犬'),
	_word_en3('Collie', '牧羊犬'),



	_word_jp1('フロンティア', '最前線'),

	_word_jp1('アニマ|尼瑪', '獸人'),

	_word_jp1('門の番人', '門之看守者'),

	_word_jp1('パイオニア', '開拓者'),
	_word_jp1('エクスプローラー|探檢者', '探險者'),

	/**
	 * 物品箱（Item Box）
	 * 存物箱（Item Storage）
	 */
	_word_jp1('アイテムボックス', '物品箱'),
	_word_jp1('アイテムストレージ', '存物箱'),

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
