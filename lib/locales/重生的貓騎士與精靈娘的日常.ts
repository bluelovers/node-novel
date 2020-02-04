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

	_word_jp1('アリア|亞利亞|艾利亞|亞里亞|阿利亞|艾莉婭|阿莉亞|雅利安|阿麗亞|艾莉亞', '艾麗婭'),
	_word_jp1('タマ|塔摩', '塔瑪'),

	_word_en3('Tama', '塔瑪'),

	_word_jp1('ステラ|斯黛拉', '史黛拉'),

	/**
	 *
	 */
	_word_jp1('カスマン|卡斯曼', '庫斯曼'),

	_word_jp1('アナ', '安娜'),
	_word_jp1('アーナルド|阿納多|阿納多|安娜路德|阿爾納德', '阿納爾德'),
	_word_jp1('ホズィルズネッガー', '霍茲尼格爾'),

	_word_jp1('ヴァルカンズ', '薇兒卡斯'),
	_word_jp1('ヴァルカン|伏爾坎|伏爾甘|維爾干|伏爾干|維爾幹|薇爾卡|瓦爾肯|瓦爾坎|瓦爾乾|瓦爾干', '薇兒卡'),

	_word_jp1('サクラ', '櫻'),

	/**
	 *
	 */
	_word_jp1('レナード|雷納德', '萊納德'),

	_word_jp1('セドリック|塞德里克|塞德克|杰特里克|賽德利克', '塞德里克'),
	_word_jp1('リューイン', '李文'),

	_word_jp1('ダニー|達尼', '丹尼'),
	_word_en3('Danny', '丹尼'),

	_word_jp1('ハワード', '霍華德'),

	_word_jp1('ケニー|肯尼|凱尼', '凱妮'),
	_word_jp1('マリエッタ|瑪麗塔|瑪麗葉塔', '瑪麗埃塔'),

	/**
	 *
	 */
	_word_jp1('ベリル|貝利爾|貝利魯|利貝魯|貝里魯', '貝利爾'),
	_word_jp1('アスタロス', '阿斯塔洛斯'),

	/**
	 *
	 */


	_word_jp1('レイス', '雷伊斯'),

	_word_jp1('グラッドストーン', '格拉德斯通'),

	_word_jp1('リリ', '莉莉'),
	_word_jp1('フェリ', '菲莉'),

	_word_jp1('ジョーイ', '喬伊'),



	/**
	 *
	 */
	_word_jp1('アリーシャ', '艾莉莎'),

	_word_jp1('アウシューラ', '奧修拉'),
	_word_jp1('クラリアル', '克拉利亞爾'),

	_word_jp1('ガイゼル', '蓋澤魯'),
	_word_jp1('アウシューラ', '奧修拉'),

	_word_jp1('ジュリウス|朱莉烏斯', '朱利烏斯'),
	_word_jp1('アウシューラ', '奧修拉'),

	_word_jp1('ベルゼビュート', '貝露澤碧尤特'),

	/**
	 *
	 */
	_word_jp1('ヴァサーゴ', '瓦沙克'),
	_word_jp1('マモン', '瑪門'),

	_word_jp1('レヴィ', '莉維'),

	/**
	 *
	 */
	_word_jp1('ルミルス|魯米納斯|路米爾斯', '魯米納斯'),

	_word_jp1('アルフス', '阿爾法斯'),

	_word_jp1('フィオーネ', '菲奧妮'),
	_word_jp1('レオ', '雷歐'),

	_word_jp1('エルヴン', '埃魯文'),

	_word_jp1('レオナ', '蕾歐娜'),

	_word_jp1('エイラ', '艾菈'),

	/**
	 *
	 */
	_word_jp1('アースドラゴン|地球龍', '地龍'),
	_word_jp1('ドラゴン', '龍'),

	_word_jp1('エルフ', '精靈'),

	_word_jp1('ベヒーモス|貝西摩斯|貝爾摩西|貝希摩斯|貝希莫斯', '貝希摩斯'),

	_word_jp1('エレメンタルキャット', '元素貓'),

	_word_en3('Elart Catt', '元素貓'),

	_word_jp1('米諾陶諾斯|米諾陶洛斯|米諾塔洛斯|米諾塔尼洛斯|彌諾陶洛斯|ミノタウロス', '米諾陶諾斯'),

	_word_jp1('ゴブリン', '哥布林'),
	_word_jp1('ホブゴブリン', '大哥布林'),
	_word_jp1('ゴブリンメイジ|哥布林染井|牛郎化妝', '哥布林法師'),

	_word_jp1('ワーウルフ', '狼人'),

	_word_jp1('トロール', '巨魔'),

	_word_jp1('波茲龍|毒普斯龍', '毒龍'),

	_word_jp1('モンスター', '魔物'),

	_word_jp1('リザードキャリア', '蜥蜴馬'),


	/**
	 * 《屬性咆哮》：《火焰・咆哮》，《水・咆哮》，《以太・咆哮》，《岩石・咆哮》
	 * 《属性咆哮》：《フレイム・ハウリング》、《ウォーター・ハウリング》、《エーテル・ハウリング》、《ロック・ハウリング》
	 *
	 * 《属性剣尾》：《フレイムエッジ》、《ウォーターエッジ》、《エーテルエッジ》、《ロックエッジ》
	 * 《屬性劍尾》：《炎刃》、《水刃》、《空氣刃》、《岩刃》
	 */
	_word_jp1('マナ', '瑪娜'),
	_word_en3('Manna', '瑪娜'),

	_word_en3('Water - Howling', '水・咆哮'),
	_word_jp1('ウォーター・ハウリング', '水・咆哮'),

	[`水${sp}咆哮`, '水・咆哮'],

	_word_en3('Ether-Howling', '以太・咆哮'),
	_word_jp1('エーテルハウリング|空氣─咆哮', '以太・咆哮'),

	_word_jp1('スキル喰奪', '技能喰奪'),

	_word_jp1('ポイズンファング', '劇毒獠牙'),

	_word_jp1('火焰刃|フレイムエッジ|火焰之邊緣|火山口邊緣', '炎刃'),

	_word_jp1('空氣刃', '空刃'),

	_word_jp1('岩石刃', '岩刃'),

	_word_jp1('ランク', '階級'),
	_word_en3('Rank', '階級'),

	_word_jp1('鋼鐵身體|アイアンボディ', '鋼軀'),

	_word_jp1('アイシクルランス|艾西斯斯蘭斯', '冰槍'),

	_word_jp1('エンチャント・フレイム|天使·弗雷姆', '賦予・烈焰'),

	_word_jp1('火焰球|ファイアーボール', '火球'),

	_word_jp1('アクセラレーション', '超加速'),

	_word_jp1('魔神の黃昏', '魔神的黃昏'),
	_word_jp1('ラグナロク|拉格納洛克', '諸神黃昏'),

	_word_jp1('マルチプロテクションウォール', '群體守護之壁'),

	_word_jp1('ドラゴンファング', '龍之牙'),

	_word_jp1('リーンカーネーション', '轉生'),

	_word_jp1('エクスキャリバー', 'Excalibur'),

	/**
	 *
	 */
	_word_jp1('バトルハンマー|戰鬥漢馬|戰鬥錘', '戰錘'),

	_word_jp1('グレートソード', '巨劍'),

	_word_jp1('バスターソード', '巴斯特劍'),

	_word_jp1('真実の雫|真實之滴', '真實之雫'),

	_word_jp1('ヴィブラウム|振金', '涅磐鋼'),

	_word_jp1('奧利哈剛|奧利哈魯鋼|奧利哈爾鋼', '奧利哈魯鋼'),

	_word_jp1('カラドボルグ', '卡拉德波加'),

	_word_jp1('クラウソラス', '光之劍'),

	_word_jp1('デファイヨンリング', '猜疑之戒'),

	_word_jp1('アダマンタイト', '精金'),

	_word_jp1('アーティファクト', '神器'),
	_word_jp1('アーティファクトスミス', '神器鍛造師'),

	_word_jp1('天鵝絨|テンペストブリンガー', '暴風劍'),

	_word_jp1('マナダイト|馬納戴伊合金', '萬應礦'),

	/**
	 *
	 */
	_word_jp1('んにゃ', '喵呀'),

	_word_jp1('むにゅむにゅ', '呣扭'),

	/**
	 *
	 */
	_word_jp1('受付嬢', '受付嬢'),



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
