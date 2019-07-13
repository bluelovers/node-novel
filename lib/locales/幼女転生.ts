/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en3, lazymarks, _word_jp1 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	_word_jp1('露絲|ローズ', '露絲'),
	_word_jp1('シャロン', '夏瓏'),

	/**
	 *
	 */
	_word_jp1('曼努埃莉塔|マヌエリタ', '曼努埃莉塔'),
	_word_jp1('莉塔|リタ', '莉塔'),

	_word_jp1('レオナ|莉安娜|利昂娜', '莉安娜'),

	_word_jp1('ノエリア|洛艾莉婭', '洛艾莉婭'),
	_word_jp1('フィリス|菲莉斯', '菲莉斯'),

	_word_jp1('アウロラ|奧羅拉', '奧羅拉'),

	_word_jp1('パロマ|柏洛瑪', '柏洛瑪'),

	/**
	 *
	 */
	_word_jp1('オールディア|奧爾迪亞', '奧爾迪亞'),
	_word_jp1('セミリア|賽米利亞', '賽米利亞'),

	_word_jp1('マウロ|莫羅', '莫羅'),
	_word_jp1('イーノス|依洛斯', '依洛斯'),

	_word_jp1('ノビオ|諾比安', '諾比安'),
	_word_jp1('カルミネ|加魯美涅', '加魯美涅'),

	/**
	 *
	 */
	_word_jp1('プローン', '普林'),
	_word_jp1('フレイズ', '弗萊斯'),


	_word_jp1('エリアーヌ', '艾莉安奈'),
	_word_jp1('ロック', '洛古'),
	_word_jp1('オーバン', '奧本'),
	_word_jp1('フラヴィ', '芙菈薇'),

	/**
	 *
	 */
	_word_jp1('伊久雷普斯|イクライプス', '伊久雷普斯'),
	_word_jp1('艾依摩爾|エイモル', '艾依摩爾'),

	/**
	 *
	 */
	_word_jp1('琪紗|キシュ', '琪紗'),
	_word_jp1('艾勒西絲|エルシス', '艾勒西絲'),

	/**
	 *
	 */
	_word_jp1('イヴ', '伊芙'),

	_word_jp1('ユーハ', '悠赫'),

	_word_jp1('リゼット', '莉塞特'),
	_word_jp1('リーゼッ', '莉澤'),

	_word_jp1('クレア', '克蕾兒'),
	_word_jp1('セイディ|塞蔕|塞蒂|賽蒂', '賽蒂'),
	_word_jp1('チェルシー|切露西|切爾西', '切露西'),

	_word_jp1('黎明の調べ|黎明の調律|黎明の調查', '黎明的調律'),

	_word_jp1('ヘルミーネ', '赫爾美納'),

	_word_jp1('マリリン', '瑪麗蓮'),

	_word_jp1('サラ|薩拉|莎拉', '莎拉'),

	_word_jp1('アルセリア|阿爾塞莉姫|阿爾塞莉婭', '阿爾塞莉婭'),

	_word_jp1('ウルリーカ|烏爾麗卡', '烏爾麗卡'),

	_word_jp1('ウェイン', '韋恩'),

	_word_jp1('漢克|ハンク', '漢克'),

	_word_jp1('安妮特|アネット', '安妮特'),


	/**
	 *
	 */
	_word_jp1('黄昏の調べ|黃昏の調律|黃昏の調查', '黃昏的調律'),

	_word_jp1('エネアス', '艾涅亞斯'),

	/**
	 *
	 */

	_word_jp1('托拜厄斯|トバイアス', '托拜厄斯'),
	_word_jp1('菲利斯|フェレス', '菲利斯'),

	_word_jp1('扎卡里|ザカリー', '扎卡里'),
	_word_jp1('里奧夫|リオヴ', '里奧夫'),

	/**
	 *
	 */
	_word_jp1('アイン', '艾因'),
	_word_en3('Ein', '艾因'),

	_word_jp1('ツヴァイ', 'ツヴァイ'),
	_word_en3('Zwei', 'Zwei'),

	/**
	 *
	 */

	_word_jp1('リリオ|里里奧', '里里奧'),

	_word_jp1('艾洛美|エノーメ', '艾洛美'),

	_word_jp1('格凌柏|グレイバ', '格凌柏'),

	_word_jp1('達琳|ダーレン', '達琳'),

	_word_jp1('科里亞|コライア', '科里亞'),

	_word_jp1('福利亞|フォリエ', '福利亞'),

	_word_jp1('波迪羅|ポンデーロ|普迪羅', '波迪羅'),

	_word_jp1('アルジール', 'Arujiru'),

	_word_jp1('克以穌', '克以穌'),

	_word_jp1('廸卡|ディーカ', '廸卡'),

	_word_jp1('薩奧古|ザオク', '薩奧古'),

	_word_jp1('卡滋艾|カシエ', '卡滋艾'),

	_word_jp1('クロクス|庫洛庫斯', '庫洛庫斯'),
	_word_en3('Kurokusu', '庫洛庫斯'),

	_word_jp1('トリム|托里姆', '托里姆'),
	_word_en3('Torimu', '托里姆'),

	_word_jp1('ラヴル', '拉夫'),

	_word_jp1('克拉杜|克拉德|クラード', '克拉杜'),
	_word_jp1('艾諾米|艾洛美|エノーメ', '艾洛美'),

	/**
	 *
	 */
	_word_jp1('艾利|アーレ', '艾利'),


	/**
	 *
	 */

	['竜人', '竜人'],

	_word_jp1('タイラントボア', '蠻橫巨蟒'),
	_word_en3('Tyrant Boidae', '蠻橫巨蟒'),

	_word_jp1('ランドブル|陸魔?牛', '陸魔牛'),
	_word_en3('Land Bull', '陸魔牛'),

	/**
	 *
	 */
	_word_jp1('ミリ|毫米', '利迪'),
	_word_jp1('ルス|魯斯', '魯斯'),

	_word_jp1('レンテ|利迪', '利迪'),
	_word_jp1('厘米|センチ', '厘米'),

	_word_jp1('メートル|公尺', '公尺'),
	_word_jp1('里奇斯|リーギス', '里奇斯'),

	_word_jp1('キロ|公斤', '公斤'),
	_word_jp1('梅杜|メト', '梅杜'),

	_word_jp1('グラム', '克'),
	_word_jp1('ゼルン', '賽倫'),

	_word_jp1('リットル', '升'),
	_word_jp1('ラッテン', '雷登'),

	/**
	 *
	 */
	_word_jp1('コップ', '杯子'),
	_word_jp1('アタシ', '我'),

	_word_jp1('かくれがり', '狩迷藏'),

	_word_jp1('慰霊祭|祭奠節', '慰靈祭'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([


	...words_source,

	_word_en3('Toilet', '廁所'),
	_word_en3('Breakfast Time', '早餐時間'),
	_word_en3('Process', '過程'),
	_word_en3('Level', '等級'),
	_word_en3('Hair Style', '髮型'),
	_word_en3('Bra', '胸罩'),
	_word_en3('Paradise', '天堂'),
	_word_en3('Loli Body', '幼女身體'),
	_word_en3('蘿莉Body', '蘿莉身體'),
	_word_en3('Menu', '菜單'),
	_word_en3('Cheese', '起司'),
	_word_en3('Knife', '刀'),
	_word_en3('Fork', '叉子'),
	_word_en3('Spoon', '湯匙'),
	_word_en3('Schedule', '日程'),
	_word_en3('Husky Voice', '沙啞聲音'),
	_word_en3('Husky', '沙啞'),
	_word_en3('Voice', '聲音'),
	_word_en3('Time', '時間'),
	_word_en3('Ear', '耳朵'),
	_word_en3('Shock', '震驚'),
	_word_en3('Gap', '反差'),
	_word_en3(' ?Route', '路線'),
	_word_en3('Cost', '費用'),
	_word_en3('竜人Half', '竜人混血'),
	_word_en3('Control', '控制'),
	_word_en3('Rifle', '來福槍'),
	_word_en3('soldier', '士兵'),
	_word_en3('豆腐Mental', '豆腐心'),
	_word_en3('sun glasses', '墨鏡'),
	_word_en3('Beam Sword', '光劍'),
	_word_en3('蘿莉Eyes?', '蘿莉眼'),
	_word_en3('Energy', '能量'),
	_word_en3('Twintail', '雙馬尾'),

	[/[「]((?:黎明|黄昏)的調律)[」]/g, '《$1》'],
	[/[『]((?:黎明|黄昏)的調律)[』]/g, '《$1》'],

	[/^[　 ]+/gm, ''],

	[/(?<=■)[ ]+|[ ]+(?=■)/g, function (s)
	{
		return s
			.replace(/  /g, '　')
			.replace(/ /g, '　')
		;
	}],

	[/(?<=\S)\n{1,2}(?=♀)/gm, '\n\n\n'],
	[/(?<=♀)\n(?=[^\n])/gm, '\n\n'],

	[/(?<=^[^・\s][^\n]*)\n{1,2}(?=・)/gm, '\n\n\n'],
	[/(?<=^・[^\n]*)\n(?=[^・\s])/gm, '\n\n'],

	[/(?<=^・[^\n]*)\n{2}(?=[・])/gm, '\n'],

	[/(?<=\S)\n{1,2}(?=■)/gm, '\n\n\n'],
	[/(?<=^■[^\n]*)\n(?=\S)/gm, '\n\n'],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

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

export default exports as typeof import('./demo');
