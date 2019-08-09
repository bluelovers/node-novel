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

	_word_jp1('カズラ|卡茲拉|卡斯拉', '一良'),

	/**
	 *
	 */
	_word_jp1('グリセア|葛利夏|格利夏', '葛利夏'),

	_word_jp1('薇蕾塔|巴蕾塔|バレッタ|薇雷塔|芭蕾塔', '薇蕾塔'),

	_word_jp1('巴林|バリン', '巴林'),

	_word_jp1('ミュラ|妙菈', '繆菈'),

	_word_jp1('ターナ', '塔娜'),

	_word_jp1('妮娜|尼娜|ニィナ', '妮娜'),

	_word_jp1('ロズルー|洛德|羅茲爾', '羅茲爾'),

	_word_jp1('柯爾茲|コルツ|科魯茲', '柯爾茲'),
	_word_jp1('柯涅爾', '柯涅爾'),

	/**
	 *
	 */

	_word_jp1('吉珂妮亞|杰克尼亞|吉珂妮靈|希爾柯妮雅|吉爾柯妮雅|吉爾科尼|吉爾珂妮婭|ジルコニア|吉兒珂尼亞|吉珂尼婭|吉珂爾亞|吉珂尼亞', '吉珂妮亞'),

	//['吉爾', '吉珂'],
	['吉兒|吉爾', '吉兒'],

	_word_jp1('莉婕|利捷|莉茲|リーゼ|莉捷', '莉婕'),

	_word_jp1('艾菈|艾苗|埃拉|艾拉|エイラ', '艾菈'),

	_word_jp1('納爾森|納路森|納魯森|ナルソン|納求森', '納爾森'),

	_word_jp1('クレア|克萊爾|克蕾亞|克雷亞', '克蕾亞'),

	['克雷勒茲', '克雷勒茲'],

	_word_jp1('セレット', '賽露特'),



	_word_jp1('イステリア|伊榭利亞|伊斯特里亞|伊斯特利亞|依斯提利亞', '伊斯提利亞'),
	_word_jp1('依斯提|伊斯特爾|伊斯提(?:爾|魯)?|伊榭路|イステール', '伊斯提'),

	[`(?:吉珂妮亞)${sp}(?:伊斯提)`, '吉珂妮亞・伊斯提'],

	_word_jp1('マクレガー|馬庫雷伽|馬庫雷加|麥格雷加', '馬克雷伽'),


	/**
	 *
	 */


	/**
	 * 伊格西歐斯．圖倫是艾薩克的父親，麥克格雷達的哥哥。
	 *
	 * イクシオス
	 */
	_word_jp1('シルベストリア|希爾維絲托莉亞|希爾蓓絲托莉婭|希爾貝絲托利亞|希爾貝絲托利亞?', '希爾維絲托莉亞'),

	['希亞', '希亞'],

	_word_jp1('プチアイザック', '普契艾薩克'),

	_word_jp1('ルート', '盧特'),

	_word_jp1('アイザック|艾薩克', '艾薩克'),

	_word_jp1('古西奧斯|伊格西歐斯|イクシオス|伊庫希奧斯|伊克西奧斯', '伊格西歐斯'),

	_word_jp1('斯坦|スラン|圖倫|斯蘭', '斯蘭'),

	[`伊格西歐斯${sp}斯蘭`, '伊格西歐斯・斯蘭'],

	/**
	 * ハベル
	 */
	_word_jp1('哈伯爾?|哈貝爾|ハベル|哈利', '哈貝爾'),

	_word_jp1('瑪麗|瑪莉|マリー', '瑪麗'),

	_word_jp1('利維森|路森|ルーソン|利休維', '利維森'),

	_word_jp1('アロンド|奧朗德|奧郎德|埃朗德|奧隆特|阿隆德', '奧朗德'),

	_word_jp1('諾爾|ノール', '諾爾'),

	[`奧朗德${sp}利維森`, '奧朗德・利維森'],

	_word_jp1('ナルソン|馬凱斯', '馬爾凱斯'),
	_word_jp1('イステール', '康斯貝'),

	_word_jp1('グレゴリア', '葛雷高利亞'),



	/**
	 *
	 *
	 */
	_word_jp1('オーティス', '奧蒂斯'),

	_word_jp1('ウッド', '伍德'),
	_word_jp1('ウッドベル', '伍德貝爾'),

	_word_jp1('ユマ', '尤瑪'),

	/**
	 *
	 */
	_word_jp1('ニーベル|尼貝爾?', '尼貝爾'),
	_word_jp1('フェルディナント', '費迪南德'),

	_word_jp1('古雷葛倫|グレゴルン?|歌蕾果隆|古雷戈倫', '古雷葛倫'),

	_word_jp1('ダイアス', '戴亞斯'),

	/**
	 * 對面３人之中，左右坐著的分別為古雷葛倫領地的領主戴亞斯・古雷葛倫，以及弗萊伊斯領地的領主貝斯爾・弗萊伊斯。
	 */
	_word_jp1('弗萊伊斯|芙蘭蘇|フライス|弗萊斯', '弗萊伊斯'),
	_word_jp1('貝斯爾|ヘイシェル|黑歇爾', '貝斯爾'),

	/**
	 *
	 */

	_word_jp1('アルカディア|阿卡迪亞|阿爾卡迪安|阿魯卡迪亞', '阿爾卡迪亞'),


	_word_en3('Elmyr', '艾爾米亞'),
	_word_en3('Legros', '勒格羅'),

	_word_jp1('エルミア|艾爾米亞|艾米爾', '艾爾米亞'),
	_word_jp1('勒格洛|ルグロ|魯格羅|盧格羅|魯古羅', '勒格羅'),

	_word_jp1('蒂娜', '蒂娜'),
	_word_jp1('若緹娜|ルティーナ|露蒂娜', '露蒂娜'),
	_word_jp1('ルティ', '露蒂'),

	_word_jp1('ロン|羅恩|魯恩', '羅恩'),
	_word_jp1('リーネ|琳奈', '莉奈'),

	_word_jp1('ルルーナ|璐璐娜|若爾娜', '璐璐娜'),
	_word_jp1('ロローナ|蘿蘿娜|勒羅娜', '蘿蘿娜'),

	/**
	 *
	 */
	_word_jp1('耶爾戴爾|エルタイル|鄂爾泰爾|埃爾泰爾', '鄂爾泰爾'),
	_word_jp1('普羅提亞|プロティア|普洛堤亞', '普洛堤亞'),

	_word_jp1('克萊伊拉茨|クレイラッツ|克雷勒茲|克雷萊茲|克雷伊拉茨|克雷拉茲', '克雷勒茲'),

	/**
	 *
	 */
	_word_jp1('バルベール|巴貝爾|巴魯貝爾|巴魯貝魯|巴魯德魯|巴魯培|巴爾魯|巴爾貝爾|巴爾爾', '巴貝爾'),

	_word_jp1('カイレン|海倫', '凱倫'),
	_word_jp1('グリプス', '格利普斯'),

	[`(?:卡廉|凱倫)${sp}(?:克里普斯|格利普斯)`, '凱倫・格利普斯'],

	_word_jp1('ティティス|提提斯|提提絲|特提斯', '媞媞絲'),

	_word_jp1('フィレクシア|菲蕾庫西亞', '菲蕾庫西婭'),

	_word_jp1('塞登', '塞登'),

	/**
	 * 奧瑪西歐爾樣是戰鬥的神，ガイエルシオール樣是買賣的神。
	 */

	_word_jp1('レイシオール|葛雷西歐爾|格雷西爾奧|格雷西歐爾|格雷西奧爾|葛雷西歐爾|葛雷希歐爾', '葛雷希歐爾'),

	_word_jp1('オルマシオール|奧爾曼歐爾|奧爾馬希歐爾|奧爾馬西歐爾|奧爾曼西歐爾|奧斯曼西歐爾|奧斯曼西奧爾|奧瑪西歐爾|奧瑪希歐爾', '奧瑪希歐爾'),
	_word_jp1('ガイエルシオール|蓋耶羅西奧爾|蓋耶爾希歐爾|蓋耶爾西歐爾|奎爾西歐爾', '蓋耶爾希歐爾'),

	_word_jp1('スイプシオール|水普西奧爾|席普西歐爾|席普希歐爾|席普西歐爾', '席普希歐爾'),

	_word_jp1('リブラシオール|利布拉西歐爾|利布拉希歐爾', '利布拉希歐爾'),

	_word_jp1('哈雷爾王|ハーレル王', '哈雷爾王'),

	['香氛鍊', '香氛鍊'],

	/**
	 *
	 */
	_word_jp1('カフク|卡夫克', '卡胡庫'),

	_word_jp1('ラタ|拉達', '拉塔'),

	_word_jp1('エプベル', '艾普貝爾'),

	_word_jp1('ミャギ|米加', '咩基'),

	_word_jp1('ウリボウ|烏利波|烏力波', '烏利波'),
	_word_jp1('アルマル|阿魯瑪魯|阿爾瑪', '瑪魯瑪魯'),

	_word_jp1('アル', '亞爾'),

	_word_jp1('根切り鳥', '掘根鳥'),


	/**
	 *
	 */
	_word_jp1('リポＤ', '力保美達'),

	_word_jp1('スコーピオン|蠍式弩', '蠍弩'),
	_word_en3('Scorpion', '蠍弩'),

	_word_en3('ballistic', '床弩'),

	_word_jp1('筆記本電腦', '筆電'),

	_word_jp1('加農炮|卡農炮', '加農炮'),

	// 能量棒
	_word_jp1('エネルギーバー', '營養補充棒'),

	_word_jp1('アロマペンダント', '芳香吊墜'),

	_word_jp1('跳ねつるべ', '吊桶'),

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
	 */
	...lazymarks['7'],
	...lazymarks['8'],

	...lazymarks['clear_002'],

	/**
	 * 適用於具有大量長段 而只縮減對話之間的空格使用
	 */
	...lazymarks['ln_talk'],

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
