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

	[/(?<!薩)莉亞/g, '莉雅'],
	_word_jp1('リア', '莉雅'),

	_word_jp1('レイアナ|蕾安娜|蕾雅娜|雷安娜', '蕾雅娜'),

	_word_jp1('クリストール|庫里素托魯|庫里蘇托魯', '庫里蘇托魯'),

	_word_jp1('アガサ|安卡沙', '安卡莎'),



	/**
	 *
	 */
	_word_jp1('リュクレイアーナ|流庫蕾安娜|流庫蕾雅娜|琉庫蕾雅娜|流庫雷安娜|琉庫雷安娜', '琉庫蕾雅娜'),

	_word_jp1('リュク', '琉庫'),

	_word_jp1('レイテ|雷特|萊特', '蕾特'),
	_word_jp1('アナイア|安奈阿|安奈亞|安娜伊亞', '阿娜亞'),

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
	_word_jp1('ルシェン', '魯謝恩'),

	_word_jp1('フィオーネ', '菲歐娜'),
	_word_jp1('ウラン', '烏蘭'),
	_word_jp1('クリステラ|克利斯特拉|克莉絲泰拉', '克利斯特拉'),

	_word_jp1('フィオ', '菲歐'),



	/**
	 *
	 */
	_word_jp1('ジョニー|囧尼', '強尼'),

	_word_jp1('オルフェ', '奧路菲'),
	_word_jp1('ルドルフ|魯道乎', '魯道夫'),
	_word_jp1('ブライアン', '布萊恩'),
	_word_jp1('マツカゼ', '松風'),

	_word_jp1('ロバ', '羅巴'),



	/**
	 *
	 */
	_word_jp1('サージ', '薩基'),
	_word_jp1('サジタリウス', '薩基塔留斯'),


	_word_jp1('克勞利', '克羅利'),


	/**
	 *
	 */
	_word_jp1('カサリア|卡?薩莉亞|卡薩里安|卡薩利亞|卡薩莉雅', '卡薩莉雅'),
	_word_jp1('アナイアス|安奈伊亞斯|安奈阿蘇|安那伊亞斯|阿娜亞斯|安奈亞斯', '安奈伊亞斯'),


	/**
	 *
	 */
	_word_jp1('シャシミール', '夏斯米盧'),

	_word_jp1('クラウス', '克勞斯'),



	_word_jp1('マール|瑪魯', '瑪露'),

	_word_jp1('ニコ', '尼可'),

	_word_jp1('アタリ', '阿塔莉'),

	/**
	 *
	 */
	_word_jp1('クオルフォス|庫歐魯霍蘇|庫歐盧法斯|庫奧魯佛斯|庫羅佛斯', '庫沃魯佛斯'),

	_word_jp1('アルヴィス', '阿爾維斯'),


	/**
	 *
	 */
	_word_jp1('ギグ', '紀咕'),
	_word_jp1('バルカ', '巴魯卡'),

	_word_jp1('オーガス|奧古斯汀?', '奧古斯'),

	/**
	 *
	 */
	_word_jp1('ガラッハ', '格拉哈'),

	/**
	 *
	 */
	_word_jp1('カラスリ', '卡拉斯里'),

	_word_jp1('アルス', '阿魯斯'),
	_word_jp1('ガーハルト|蓋爾哈特', '葛哈魯特'),

	_word_jp1('アリスガワ', '有栖川'),
	_word_jp1('ハルト', '哈魯特'),

	_word_jp1('ハルト', '哈特'),

	_word_jp1('イストリア', '伊斯特莉雅'),



	_word_jp1('ルアブラ|魯阿布朗', '露亞布拉'),

	/**
	 *
	 */
	_word_jp1('マネーシャ', '瑪內夏'),

	_word_jp1('ギネヴィア|吉尼維爾|吉尼維亞|吉妮維亞|吉妮維雅', '吉妮維亞'),
	_word_jp1('サリオン', '薩利翁'),

	_word_jp1('カーラ', '卡拉'),
	_word_jp1('ラパーバ', '拉芭芭'),
	_word_jp1('ウスラン', '烏斯蘭'),

	_word_jp1('ゴンベエ', '權兵衛'),

	_word_jp1('シンジ', '真嗣'),

	_word_jp1('エクドラ', '艾克多拉'),

	/**
	 *
	 */

	_word_jp1('ラビリンス|菈比林斯|菈比琳斯|拉比林斯', '菈比琳斯'),


	_word_jp1('バルス', '巴魯斯'),

	_word_jp1('クラリス|克拉莉絲', '庫拉利斯'),

	_word_jp1('イリーナ', '伊琳娜'),

	_word_jp1('オーマ', '奧瑪'),

	_word_jp1('テルー|泰露', '瑟魯'),

	_word_jp1('ラナ', '拉娜'),


	/**
	 *
	 */
	_word_jp1('ジェバーグ|傑巴古', '傑巴古'),

	_word_jp1('シズナ', '希茲娜'),

	_word_jp1('バルガス', '巴爾加斯'),

	_word_jp1('ヴィル', '威爾'),

	_word_jp1('ゲイツ', '蓋茲'),

	_word_jp1('シャール', '夏爾'),

	_word_jp1('ゾロ', '佐羅'),

	_word_jp1('ジェイソン', '賈森'),

	_word_jp1('セルフェルミント|賽魯費魯敏特', '賽魯費魯敏特'),
	_word_jp1('セル', '賽魯'),

	_word_jp1('クオルフォス', '古羅爾福斯'),

	/**
	 *
	 */
	_word_jp1('コルドバ|柯爾多瓦|科爾多瓦', '科爾多巴'),
	_word_jp1('マニュー', '馬紐'),

	_word_jp1('コルナダ|科爾那達', '柯爾納達'),

	/**
	 *
	 */
	_word_jp1('キュロス', '賽洛斯'),

	_word_jp1('サラフ', '薩拉夫'),

	_word_jp1('マラダス', '瑪拉達斯'),

	_word_jp1('マーザ', '馬札'),

	/**
	 *
	 */

	_word_jp1('レムドリア|雷姆多麗雅|雷姆多麗亞|雷姆多莉雅', '雷姆多利亞'),

	_word_jp1('ホリン|方琳', '方隣'),

	_word_jp1('ヤマト', '大和'),

	_word_jp1('フェルナ|菲路娜', '菲露娜'),
	_word_jp1('フェルナーサ|菲路娜莎|菲露娜莎', '菲露娜莎'),

	_word_jp1('シオン', '紫苑'),

	_word_jp1('アゼルフォード|亞傑魯福特|阿瑟魯佛特|阿瑟福特|亞瑟魯佛特', '亞傑魯佛特'),

	_word_jp1('アゼル|亞瑟', '亞傑魯'),

	_word_jp1('シャナ', '夏娜'),
	_word_jp1('米爾格里多|米露古莉德', '米露古莉德'),

	_word_jp1('トール', '托爾'),

	_word_jp1('リュクシファーカ|琉庫西法卡|路克西法克', '琉庫西法卡'),

	_word_jp1('シファカ', '西法卡'),

	/**
	 *
	 */
	_word_jp1('ジェミダン', '傑米丹'),

	_word_jp1('クリスティーナ', '克莉絲蒂娜'),
	_word_jp1('クリス|克莉斯', '克莉絲'),

	_word_jp1('コトー', '寇托'),
	_word_jp1('マルケン', '馬坎'),

	_word_jp1('アレクセイ', '阿列克謝'),

	_word_jp1('ラプラス', '拉普拉斯'),

	_word_jp1('ラダム', '拉達姆'),

	/**
	 *
	 */
	_word_jp1('ジーク', '吉庫'),
	_word_jp1('ジークフェッド', '吉庫菲德'),

	/**
	 * 真嗣 雷
	 */
	_word_jp1('レイ', '零'),
	_word_jp1('ブラットフォード', '布拉德佛德'),

	_word_jp1('アスカ|名日香', '明日香'),
	_word_jp1('アウグストリア', '奧古斯都莉雅'),

	_word_jp1('オルド', '奧魯多'),

	_word_jp1('ピノ', '皮諾'),



	/**
	 *
	 */
	_word_jp1('リザードマン|蜥蜴曼', '蜥蜴人'),

	_word_jp1('ヒュドラ|修朵拉|九頭蛇', '九頭蛇'),

	_word_en3('Elf', '精靈'),

	_word_jp1('バイコーン', '雙角獸'),

	_word_jp1('オーガ', '奧加'),

	_word_jp1('ミノタウロス', '牛頭人'),

	_word_jp1('マンティコア', '蠍獅'),



	_word_jp1('サイクロプス', '獨眼巨人'),

	['墮落的神明末裔|墮落神明的末裔|墮落諸神的末裔|墮落的眾神的末裔', '墮落諸神的末裔'],
	_word_jp1('堕ちた神々|墮落的眾神', '墮落諸神'),


	_word_jp1('オーク', '樹妖'),

	_word_en3('Griffon', '獅鷲獸'),
	_word_en3('Wyvern|翼竜', '飛竜'),

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

	_word_jp1('エルフスキー', '喜歡精靈'),

	_word_jp1('歐逆醬', '歐尼醬'),
	_word_jp1('歐內醬', '歐捏醬'),

	_word_en3('gift', '天賦'),

	_word_jp1('エクスカリバ|誓約勝利之劍', 'Excalibur'),
	//_word_en3('Excalibur', '誓約勝利之劍'),

	_word_jp1('ロンギヌス', '朗基努斯'),

	_word_jp1('山銅', '奧里哈鋼'),
	_word_en3('Orichalcum', '奧里哈鋼'),

	_word_jp1('アダマンタイト', '堅鋼礦石'),

	_word_jp1('黑暗迷宮', '暗黑迷宮'),




	_word_jp1('女殺し|少女殺手', '女性殺手'),

	_word_jp1('オルフェーヴル', '奧魯菲魯'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	['長曾彌虎切', '長曽彌虎徹'],

	['竜', '竜'],
	['竜蝦', '龍蝦'],

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