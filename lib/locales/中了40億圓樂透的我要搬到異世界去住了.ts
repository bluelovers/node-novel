/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp, sp2 } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	_word_jp1('カズラ|卡茲拉', '一良'),

	/**
	 *
	 */
	['葛利夏', '葛利夏'],

	_word_jp1('薇蕾塔|巴蕾塔|バレッタ|薇雷塔', '薇蕾塔'),

	_word_jp1('巴林|バリン', '巴林'),

	_word_jp1('ミュラ', '繆菈'),

	_word_jp1('ターナ', '塔娜'),

	_word_jp1('妮娜|尼娜|ニィナ', '妮娜'),

	_word_jp1('ロズルー|洛德|羅茲爾', '羅茲爾'),

	_word_jp1('柯爾茲|コルツ', '柯爾茲'),
	_word_jp1('柯涅爾', '柯涅爾'),

	/**
	 *
	 */

	_word_jp1('吉珂妮亞|杰克尼亞|吉珂妮靈|希爾柯妮雅|吉爾柯妮雅|吉爾科尼|吉爾珂妮婭|ジルコニア|吉兒珂尼亞|吉珂尼婭', '吉珂妮亞'),

	//['吉爾', '吉珂'],
	['吉兒|吉爾', '吉兒'],

	_word_jp1('莉婕|利捷|莉茲|リーゼ|莉捷', '莉婕'),

	_word_jp1('艾菈|艾苗|埃拉|艾拉|エイラ', '艾菈'),

	_word_jp1('納爾森|納路森|納魯森|ナルソン', '納爾森'),

	_word_jp1('クレア|克萊爾|克蕾亞|克雷亞', '克蕾亞'),

	['克雷勒茲', '克雷勒茲'],





	_word_jp1('イステリア|伊榭利亞|伊斯特里亞|伊斯特利亞', '伊斯提利亞'),
	_word_jp1('伊斯特爾|伊斯提爾?|伊榭路|イステール', '伊斯提'),

	[`(?:吉珂妮亞)${sp}(?:伊斯提)`, '吉珂妮亞・伊斯提'],

	_word_jp1('マクレガー', '馬克雷伽'),


	/**
	 *
	 */


	/**
	 * 伊格西歐斯．圖倫是艾薩克的父親，麥克格雷達的哥哥。
	 *
	 * イクシオス
	 */
	_word_jp1('シルベストリア|希爾維絲托莉亞|希爾蓓絲托莉婭', '希爾維絲托莉亞'),

	['希亞', '希亞'],



	_word_jp1('アイザック|艾薩克', '艾薩克'),

	_word_jp1('古西奧斯|伊格西歐斯|イクシオス|伊庫希奧斯|伊克西奧斯', '伊格西歐斯'),

	_word_jp1('斯蘭', '斯蘭'),

	[`伊格西歐斯${sp}斯蘭`, '伊格西歐斯・斯蘭'],

	/**
	 * ハベル
	 */
	_word_jp1('哈伯爾?|哈貝爾|ハベル|哈利', '哈貝爾'),

	['瑪麗|瑪莉', '瑪麗'],

	_word_jp1('利維森|路森|ルーソン|利休維', '利維森'),

	_word_jp1('アロンド|奧朗德|奧郎德|埃朗德|奧隆特|阿隆德', '奧朗德'),

	_word_jp1('諾爾|ノール', '諾爾'),

	[`奧朗德${sp}利維森`, '奧朗德・利維森'],

	/**
	 *
	 */
	_word_jp1('斯坦|スラン', '斯坦'),

	/**
	 *
	 */
	_word_jp1('ニーベル|尼貝爾?', '尼貝爾'),
	_word_jp1('古雷葛倫|グレゴルン?|歌蕾果隆|古雷戈倫', '古雷葛倫'),

	_word_jp1('ダイアス', '戴亞斯'),

	/**
	 * 對面３人之中，左右坐著的分別為古雷葛倫領地的領主戴亞斯・古雷葛倫，以及弗萊伊斯領地的領主貝斯爾・弗萊伊斯。
	 */
	_word_jp1('弗萊伊斯|芙蘭蘇|フライス|弗萊斯', '弗萊伊斯'),
	_word_jp1('貝斯爾', '貝斯爾'),

	/**
	 *
	 */

	_word_jp1('アルカディア|阿卡迪亞|阿爾卡迪安|阿魯卡迪亞', '阿爾卡迪亞'),


	_word_en3('Elmyr', '艾米爾'),
	_word_en3('Legros', '勒格羅'),

	_word_jp1('エルミア|艾爾米亞', '艾米爾'),
	_word_jp1('勒格洛', '勒格羅'),

	_word_jp1('蒂娜', '蒂娜'),
	_word_jp1('若緹娜', '若緹娜'),

	/**
	 *
	 */
	_word_jp1('耶爾戴爾|エルタイル|鄂爾泰爾', '鄂爾泰爾'),
	_word_jp1('普羅提亞|プロティア|普洛堤亞', '普洛堤亞'),

	_word_jp1('クレイラッツ|克雷勒茲|克雷萊茲|克雷伊拉茨|克雷拉茲', '克雷勒茲'),

	/**
	 *
	 */
	_word_jp1('バルベール|巴貝爾|巴魯貝爾|巴魯貝魯|巴魯德魯|巴魯培', '巴貝爾'),

	_word_jp1('カイレン', '凱倫'),
	_word_jp1('グリプス', '格利普斯'),

	[`(?:卡廉|凱倫)${sp}(?:克里普斯|格利普斯)`, '凱倫・格利普斯'],

	_word_jp1('ティティス', '媞媞絲'),

	_word_jp1('フィレクシア', '菲蕾庫西婭'),

	/**
	 *
	 */
	_word_jp1('ルルーナ', '若爾娜'),
	_word_jp1('ロローナ', '勒羅娜'),

	/**
	 * 奧瑪西歐爾樣是戰鬥的神，ガイエルシオール樣是買賣的神。
	 */

	_word_jp1('レイシオール|葛雷西歐爾', '葛雷西歐爾'),

	_word_jp1('オルマシオール|奧爾曼歐爾|奧爾馬希歐爾', '奧瑪西歐爾'),
	_word_jp1('ガイエルシオール', '蓋耶爾希歐爾'),

	_word_jp1('哈雷爾王|ハーレル王', '哈雷爾王'),

	['香氛鍊', '香氛鍊'],

	/**
	 *
	 */
	_word_jp1('カフク', '卡胡庫'),

	_word_jp1('ラタ', '拉塔'),

	_word_jp1('エプベル', '艾普貝爾'),

	_word_jp1('ウリボウ', '烏力波'),
	_word_jp1('アルマル', '瑪魯瑪魯'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['ln_0010'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	/**
	 * 無差別將 【】 轉為對話符號
	 */
	//...lazymarks[8],

	...lazymarks['clear_002'],

	/**
	 * 適用於具有大量長段 而只縮減對話之間的空格使用
	 */
	//...lazymarks['ln_talk'],

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
