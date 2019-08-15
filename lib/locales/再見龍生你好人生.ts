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

	['尼祿妮西亞', '尼祿妮西婭'],
	//_word_jp1('日文原名專用', '日文原名專用'),
	//_word_en3('英文專用', '英文專用'),

	[`${sp}菲怜${sp}艾奇爾尼亞`, '・菲怜・艾奇爾尼亞'],
		[`${sp}庫麗絲特${sp}狄熙笛亞`, '・庫麗絲特・狄熙笛亞'],
	[`${sp}索蘭${sp}艾奇爾尼亞`, '・索蘭・艾奇爾尼亞'],

	/**
	 *
	 */
	_word_jp1('マリーダ|瑪莉達', '瑪莉伊達'),
	_word_jp1('べくガロア', '佩庫伽洛亞'),

	_word_jp1('ディアドラ', '迪婭多菈'),

	/**
	 * 第四卷
	 */

	_word_jp1('多菈米娜|德拉米娜|ドラミナ', '多菈米娜'),
	_word_jp1('德拉醬', '多菈醬'),

	_word_jp1('古羅斯格利亞|グロースグリア|斯格里亞', '古羅斯格利亞'),

	_word_jp1('ジオール', '基歐爾'),

	/**
	 * 第七卷
	 */
	_word_jp1('ゴルネプ', '科爾涅普'),
	_word_jp1('リリアナ', '莉莉亞娜'),
	_word_jp1('ジャオ', '杰歐'),
	_word_jp1('ネルトナ', '涅魯多納'),

	_word_jp1('オクトウル', '歐庫多烏魯'),

	_word_jp1('ピコ', '皮可'),

	_word_jp1('アルアーナ', '阿魯阿娜'),
	_word_jp1('パラホム', '帕拉霍姆'),
	_word_jp1('クライラ', '庫拉伊拉'),

	_word_jp1('ノーブレン', '諾布倫'),

	_word_jp1('レア', '蕾婭'),

	_word_jp1('カラヴィス', '卡拉維斯'),

	_word_jp1('ガロア', '卡洛亞'),

	_word_jp1('クールドイエ', '庫魯多耶'),

	_word_jp1('ラオシェン', '拉歐謝恩'),

	_word_jp1('クシャウラ', '庫夏烏拉'),

	/**
	 * 第八卷
	 */
	_word_jp1('ライト', '萊多'),

	_word_jp1('レジナ', '蕾杰娜'),

	/**
	 *
	 */
	_word_jp1('パリオン', '帕里歐'),

	/**
	 *
	 */
	_word_jp1('ブルースライム', '藍色史萊姆'),

	_word_jp1('ドラゴ二アン', '龍人'),

	/**
	 *
	 */

	_word_jp1('アイスジャベリン', '冰霜標槍'),

	_word_jp1('クリムゾン・レイ', '深紅之蓮'),
	_word_en3('Crimson Lei', '深紅之蓮'),

	_word_en3('Air Strike', 'Air strike'),

	_word_jp1('ガイアストライク', '蓋亞衝撞'),
	_word_en3('Gaia Strike', '蓋亞衝撞'),

	_word_jp1('アイスクルフレア', '冰粒耀斑'),
	_word_en3('Ice Particle Flare', '冰粒耀斑'),

	_word_jp1('バーニングエッジ', '熾炎之劍'),
	_word_en3('Burning Edge', '熾炎之劍'),

	_word_en3('Ice bolt', '冰霜之箭'),

	_word_jp1('セレスティアルジャベリン|天體標槍', '神聖標槍'),
	_word_en3('Celestial Javelin', '神聖標槍'),

	_word_jp1('エクスプロージヨン', '爆裂'),
	_word_en3('Explosion', '爆裂'),

	_word_jp1('ジオ・グラビオン', '地・超重壓'),
	_word_en3('Geo・Gravion', '地・超重壓'),


	_word_jp1('ジャドゥ—ク', '邪毒噬'),
	_word_jp1('ジャラ－ム', '邪拉姆'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	...lazymarks['clear_002'],

	...lazymarks['class'],
	...lazymarks['class_002'],
	//...lazymarks['zh_cht'],

	['拉米亞', '拉米婭'],

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