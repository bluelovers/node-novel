/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, lazymarks, _word_jp1, _word_en3 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	_word_jp1('リオン|里昂|利昂', '里昂'),
	_word_jp1('バルトファルト|巴爾特法特|巴魯德菲魯特|巴爾特費爾德|巴爾特法爾特|波羅特弗爾德', '巴爾特費爾德'),

	_word_jp1('バルカス', '巴爾卡斯'),
	_word_jp1('リュース', '琉斯'),

	_word_jp1('ルトアート', '盧特爾特'),
	_word_jp1('メルセ', '梅爾切'),

	_word_jp1('ニックス', '尼克斯'),

	_word_jp1('コリン', '科林'),

	_word_jp1('ゾラ', '索拉'),

	_word_jp1('ジェナ', '珍娜'),

	/**
	 *
	 */
	_word_jp1('拉克森|光子號|ルクシオン|路克西翁|路庫西翁|盧克西昂|勒克西翁|盧克西恩|盧克西翁|路克西翁|勒克錫安|勒克西恩|路西翁|魯庫爾西斯|魯庫西翁|利克西翁', '路克西翁'),
	_word_en3('Luxon', '路克西翁'),

	_word_jp1('ルク', '路庫'),

	_word_jp1('阿洛鋼次|アロガンツ|傲慢號|阿洛甘茨', '阿洛鋼次'),
	_word_en3('Arroganz', '阿洛鋼次'),

	_word_jp1('パルトナー|帕爾特納|帕爾納', '帕爾特納'),

	_word_jp1('シュヴェールト|施韋納特|施韋洛特', '施韋洛特'),

	/**
	 *
	 */
	_word_jp1('ダニエル|達尼艾魯|達尼艾特|丹尼爾', '達尼艾特'),
	_word_jp1('ダーランド', '達朗德'),

	_word_jp1('レイモンド|雷蒙特', '雷蒙德'),
	_word_jp1('アーキン', '弗爾金'),

	_word_jp1('ルクル|魯可爾|魯庫爾|盧克爾?|盧庫爾', '魯庫爾'),

	_word_jp1('ジルク|ジルクア|吉魯庫|吉爾克|吉爾庫|吉魯克', '吉爾克'),
	_word_jp1('マーモリア|蒙莫里阿|馬莫里亞', '馬莫里亞'),

	_word_jp1('アンジェリカ|安杰麗卡|安吉麗卡|安潔麗卡|安潔莉卡|安潔利卡|安吉莉卡|安琪莉卡|安杰里卡', '安潔莉卡'),
	_word_jp1('アンジェ|安吉', '安潔'),

	_word_jp1('レッドグレイブ|雷多格雷夫|雷德古勒普|雷特古睿夫|里德格雷夫', '雷德古勒普'),

	_word_jp1('ヴィンス', '文斯'),
	_word_jp1('ギルバート', '吉爾伯特'),

	_word_jp1('マリエ|瑪麗埃|瑪莉埃|瑪麗艾|瑪莉艾|瑪麗唉|瑪莉唉|瑪莉耶|馬裡埃', '瑪麗艾'),
	_word_jp1('ラーファン', '拉芳'),

	[`瑪麗艾${sp}馮${sp}(?:拉芳|拉迷|拉方)`, '瑪麗艾・馮・拉芳'],

	_word_jp1('リビア|莉維亞|利維亞|利比亞|麗維亞', '莉維亞'),
	_word_jp1('オリヴィア|奧莉維亞|奧利維亞|奧麗維亞', '奧莉維亞'),

	_word_jp1('クリス|庫里斯', '克里斯'),
	_word_jp1('アークライト', '阿克萊特'),

	_word_jp1('グレッグ|古雷庫|格雷古', '格雷格'),
	_word_jp1('セバーグ|賽伯格|塞伯格', '賽伯格'),

	_word_jp1('ブラッド|布拉德', '布萊德'),
	_word_jp1('フィールド|菲爾德|菲魯特', '菲爾德'),



	_word_jp1('ミリー', '米莉'),
	_word_jp1('ジェシカ|杰西卡|潔西卡', '潔西卡'),

	_word_jp1('オマケ', '奧馬凱'),

	_word_jp1('クラリス|克拉里斯|庫拉麗絲|克拉麗斯|庫拉麗斯', '庫拉麗絲'),
	_word_jp1('アトリー|亞特利|阿塔利', '阿塔利'),

	_word_jp1('カーラ', '卡拉'),
	_word_jp1('ウェイン', '韋恩'),
	_word_jp1('コンラッド', '康拉德'),

	/**
	 *
	 */
	_word_jp1('カイル|凱爾|凱伊路|卡伊魯', '凱爾'),
	_word_jp1('ミオル|米奧路|米爾盧', '米爾盧'),


	/**
	 *
	 *
	 */
	_word_jp1('ユリウス|尤利烏斯', '尤里烏斯'),
	_word_jp1('ホルファート', '霍爾法特'),

	_word_jp1('ミレーヌ|米倫|米蓮|米蘭', '米蓮'),

	/**
	 *
	 */
	_word_jp1('ヘルトルーデ|赫爾忒蘭妲|赫爾忒露蒂|貝爾托露蒂', '赫爾忒露蒂'),
	_word_jp1('セラ', '塞拉'),
	_word_jp1('ファンオース', '范奧斯'),

	_word_jp1('ゲラット', '格拉特'),
	_word_en3('Gelatot', '格拉特'),

	_word_jp1('バンデル|班德爾|賓德爾', '班德爾'),
	_word_jp1('ヒム', '希姆'),
	_word_jp1('ゼンデン', '薩登'),

	/**
	 *
	 */

	_word_jp1('レリア|蕾利亞', '蕾利亞'),
	_word_jp1('セルジュ|賽爾吉', '賽爾吉'),

	/**
	 *
	 */

	_word_jp1('パワードスーツ', '強力套裝'),
	_word_en3('Power Suit', ''),

	_word_jp1('フォウ', '馮'),
	[`${sp}(?:佛|沃夫|馮|沃特)${sp}`, '・馮・'],

	_word_jp1('フィア', '費亞'),
	[`${sp}(?:菲亞|菲兒|費亞)${sp}`, '・費亞・'],

	_word_jp1('ラファ', '拉法'),
	[`${sp}(?:拉法|拉菲)${sp}`, '・拉法・'],

	_word_jp1('ディア', '迪亞'),
	_word_jp1('ディル', '迪爾'),

	['特待生', '特待生'],

	_word_jp1('ロストアイテム|失落的?道具|遺失物品', '失落道具'),
	_word_en3('Lost Item', '失落道具'),

	_word_jp1('エアバイク|空中摩托車|空氣摩托', '空中摩托'),

	_word_jp1('さん', '桑'),

	_word_jp1('アダマティアス', '亞當斯'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['麥當娜', '瑪丹娜'],

	['轉世者', '轉生者'],

	['聖女之杖|聖女拐杖', '聖女之杖'],

	['邊境|邊疆', '邊境'],

	_word_jp1('ゲーム?', '遊戲'),
	['少女遊戲', '乙女遊戲'],


	['來復槍', '來福槍'],

	[/^[　 ]+/gm, ''],

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	//...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	...sublib.lazymarks['ln_0010'],

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
