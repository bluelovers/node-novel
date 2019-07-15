/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { _zh_num2, sp, sp2, _zh_num, _full_num, EN_REGEXP } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 然後拉多卡是艾利擇，愛莉絲是愛莉絲
 */
export const words_source: IWords[] = [

	_word_jp1('艾莉莎|艾麗莎|エリザ|愛麗莎|艾利莎|艾利沙', '艾莉莎'),
	_word_jp1('ツァーリ|沙莉|薩莉|塔莉', '莎莉'),

	_word_jp1('卡地亞|カルディア|卡路迪亞|卡迪亞', '卡爾迪亞'),

	_word_jp1('エルシア', '艾露西亞'),

	[`(?:艾莉莎|歐文)${sp}卡爾迪亞`, `$1・卡爾迪亞`],

	_word_en3('Earl Terejia|Rarl Terejia', '特雷西亞伯爵'),


	_word_jp1('特雷西亞|特蕾西亞|テレジア|特勞西亞|特雷吉亞', '特雷西亞'),
	_word_jp1('特雷茲', '特雷茲'),
	_word_jp1('利特爾蓋|リーデルガウ|李德爾加', '利特爾蓋'),

	_word_jp1('ジークムント', '基庫蒙德'),

	_word_en3('Oscar', '奧斯卡'),
	_word_jp1('オスカー', '奧斯卡'),

	[`奧斯卡${sp}特雷西亞`, `奧斯卡・特雷西亞`],

	[`${sp}特雷西亞${sp}利特爾蓋`, `・特雷西亞・利特爾蓋`],
	[`基庫蒙德(?:─|-)特雷西亞`, `基庫蒙德・特雷西亞`],

	[`安吉爾${sp}伊里謝茲`, `安吉爾・伊里謝茲`],

	[`阿蒙${sp}諾爾`, `阿蒙・諾爾`],

	_word_jp1('ゴールトン|高頓', '高爾頓'),

	_word_jp1('ギュンター', '君特'),
	_word_en3('Gunther', '君特'),

	_word_jp1('ラスィウォク|拉斯約庫|拉斯沃庫|拉斯我庫', '拉斯沃克'),

	_word_en3('Greenfield', '古尤菲爾德'),
	_word_jp1('グリュンフェルド|古力恩費爾德|格林菲爾德', '古尤菲爾德'),

	_word_jp1('カミル|卡米盧', '卡米爾'),
	_word_jp1('メアリ', '瑪麗'),

	_word_en3('Marshan', '瑪蕾莎'),

	_word_jp1('馬來香|マレシャン|馬(?:蕾|雷)莎|馬雷西亞|馬雷西昂|瑪莎', '瑪蕾莎'),

	_word_jp1('アジール|啊吉爾|雅吉爾', '阿吉爾'),
	_word_jp1('カルヴァン', '卡爾凡'),

	_word_jp1('ラトカ|拉特卡|拉多卡|拉托卡', '拉多卡'),
	//_word_jp1('エリーゼ|艾麗澤|埃麗斯', '艾麗澤'),
	_word_jp1('愛麗絲|エリーゼ|埃麗澤|艾利澤|艾莉絲|埃莉絲|埃麗絲|埃利澤|愛麗斯', '艾麗澤'),

	_word_jp1('チェルシュトカ', '齊爾修德卡'),
	_word_jp1('シェルストーク|シュルストーク', '修魯斯托克'),

	[`(?:艾麗澤|埃麗斯)${sp}(?:齊爾修德卡|修魯斯托克)`, `$1・$2`],

	_word_jp1('シュテーデル', '施塔德爾'),

	_word_jp1('マーヤ', '瑪雅'),

	_word_jp1('ボレスワフ|博裡瓦夫|ボスワレフ|伯斯瓦雷夫', '波利斯瓦夫'),

	_word_en3('Bellway', '貝爾威耶'),
	_word_jp1('ベルワイエ|佩露瓦爾|貝路瓦耶|貝魯瓦耶|貝爾維納?|貝納維耶?', '貝爾威耶'),

	_word_en3('Hortensia', '奧爾登西奧'),

	_word_jp1('オルテンシオ|歐露頓西奧|オルテンシア', '奧爾登西奧'),

	_word_jp1('フェ－ベ', '斐貝'),

	_word_jp1('クラウディア|克勞提亞|克勞迪亞|克羅地亞|克勞蒂亞', '克勞緹婭'),
	_word_en3('Rolentsor|Rolentsors', '洛倫索雷爾'),
	_word_jp1('ローレンツォレル|羅倫索雷爾', '洛倫索雷爾'),

	_word_jp1('ナターナエル', '內森'),

	[`(?:克勞緹婭|內森)${sp}洛倫索雷爾`, `$1・洛倫索雷爾`],

	_word_en3('Isadora', '伊莎朵拉'),
	_word_jp1('イサドラ|伊莎朵拉|伊莎多拉', '伊莎朵拉'),

	_word_en3('Phoebe', '菲佩'),
	_word_jp1('フェーベ', '菲佩'),

	_word_jp1('エルベティア', '艾爾維耶'),

	_word_jp1('テオメル', '提奧梅魯'),
	_word_jp1('テオ|提歐|特奧', '提奧'),

	_word_jp1('イリシェス', '伊利斯'),

	_word_jp1('キラーィ', '基拉伊'),

	_word_jp1('アスラン', '阿斯蘭'),

	_word_jp1('ジューガル', '朱古拉魯'),

	_word_en3('Nathan', '納丹'),
	_word_jp1('娜坦|ナタン', '納丹'),



	/**
	 *
	 */
	_word_jp1('希利魯|西里爾|シリル|西瑞爾|基里爾|希利爾|西麗魯', '希利魯'),

	_word_en3('Paulo', '保羅'),
	_word_jp1('パウロ', '保羅'),

	/**
	 *
	 */
	_word_en3('Nordsturm|Nordstum', '諾爾多斯通'),
	_word_jp1('ノルドシュテルム|諾爾多斯通?', '諾爾多斯通'),

	_word_jp1('レヴァ|列佛|列弗', '列弗'),
	_word_jp1('アルフェナ', '阿爾菲納'),

	_word_jp1('ヴァロン', '瓦隆'),

	_word_jp1('ラミズ', '雷米斯'),

	_word_en3('Diferis', '迪菲麗雅絲'),
	_word_jp1('デイフェリアス|德費裡雅|迪菲麗雅?絲', '迪菲麗雅絲'),

	_word_en3('Garmstead', 'ガルムステッド'),
	_word_jp1('ガルムステッド', 'ガルムステッド'),

	_word_jp1('メルキオール', '梅爾基奧爾'),

	_word_jp1('エヴェートニ', '艾文尼斯'),

	/**
	 *
	 */
	_word_en3('Jugfena', '尤古芬納'),
	_word_jp1('ユグフェナ|優格非那|尤古費納|朱格芬|尤府芬納|尤古芬娜|裕固芬', '尤古芬納'),

	_word_en3('Einsbark', '愛因修巴魯克'),

	_word_jp1('エインシュバルク|恩修巴魯克|埃茵斯巴爾|艾恩修巴爾克|艾恩斯巴爾克', '愛因修巴魯克'),

	_word_jp1('エルグナード|艾爾芬納多', '埃爾格納德'),

	[`(?:埃爾格納德|維格拉夫)${sp}愛因修巴魯克`, `$1・愛因修巴魯克`],

	_word_jp1('ウィーグラフ', '維格拉夫'),

	_word_jp1('ヴォルマルフ|沃爾瑪律夫', '沃爾瑪爾夫'),

	_word_jp1('パランケス', '巴蘭克斯'),

	_word_jp1('斯魯|シル', '西爾'),
	_word_en3('Shiru', '西爾'),

	_word_jp1('バンディシア|班迪西亞|班地西亚|范迪西亞|潘蒂西亞', '班迪西亞'),

	/**
	 *
	 */
	_word_jp1('アールクシャ|阿爾庫夏|阿魯\*庫夏', '阿爾庫夏'),

	_word_jp1('アール', '阿爾'),
	_word_jp1('クシャ', '庫夏'),

	[`阿爾${sp}庫夏`, `阿爾・庫夏`],

	_word_en3('Arxia|Arixa|Arcusia', '阿庫希婭'),

	_word_jp1('亞克西亞|阿庫西亞|阿克西亞|アークシア|阿卡西亞', '阿庫希婭'),

	_word_en3('Arxian', '阿庫希婭'),

	[`(?:阿?庫西亞|阿爾庫夏)教`, `阿爾・庫夏教`],

	_word_jp1('クラリア|庫萊裡亞', '庫拉利亞'),

	_word_jp1('ヘンズナッド|漢茲那德', '亨茲納德'),

	_word_en3('Misorua', '米索露亞'),
	_word_jp1('ミソルア|米所路亞|米路索亞|米索爾', '米索露亞'),
	_word_jp1('アハル', '阿哈魯'),

	_word_jp1('ファリス|法里斯|法利斯', '法麗絲'),

	_word_jp1('ガルビアート', '加勒比阿特'),

	_word_en3('Actoria', '阿雷科托利亞'),
	_word_jp1('アレクトリア', '阿雷科托利亞'),

	_word_jp1('ゼルエルテルツィヴィヒア', '澤爾艾爾特爾茲維西亞'),

	_word_jp1('リリザ', '麗麗莎'),
	_word_jp1('エリーザ', '埃麗莎'),

	_word_jp1('エイジャ', '艾伊嘉'),

	_word_jp1('ダニエラ', '尼艾拉'),
	_word_jp1('フェルヒ', '菲爾西'),
	_word_jp1('ベーレンドルフ', '貝倫多爾夫'),

	_word_jp1('アルツェベルフ', '阿爾杰貝爾福'),

	[`${sp}菲爾西${sp}庫夏`, `・菲爾西・貝倫多爾夫`],

	_word_jp1('ウガリア', '烏蓋里亞'),

	_word_jp1('トレーダー', '特雷塔'),

	_word_jp1('モードン', '莫頓'),

	_word_jp1('阿蒙諾(德|姆|鲁|爾)?', '阿蒙・諾爾'),

	_word_jp1('アモン・ノール', '阿蒙・諾爾'),

	_word_jp1('メルリアート|梅爾利亞|梅麗多|莫里亞多', '梅爾利亞'),

	_word_jp1('ルクタ', '盧庫塔'),

	_word_en3('Carson', '卡爾森'),
	_word_jp1('カールソン', '卡爾森'),

	_word_jp1('カロン', '卡隆'),
	_word_jp1('ネザ|內(?:莎|扎|沙)(?=村)', '內紮'),

	_word_jp1('エイドナー|艾得納', '艾德納'),

	_word_jp1('アルフレッド', '阿爾弗雷德'),
	_word_jp1('アルバート', '阿爾伯特'),

	_word_jp1('テュール', '圖勒'),

	_word_jp1('シャナク|夏娜庫|夏納克', '夏那庫'),

	_word_en3('Ogren', '奧格蘭'),
	_word_jp1('オーグレーン|奧格倫', '奧格蘭'),

	_word_jp1('イェスタ', '伊斯塔'),

	_word_en3('Rogshia|Rogsian', '羅格西亞'),
	_word_jp1('ローグシア|羅格希亞', '羅格西亞'),

	_word_en3('Feria', '芙蕾雅'),

	/**
	 * 東方
	 * 即丹澤爾，普拉尼特絲，吉歐葛蘭特、法米格蘭，這四個公国
	 */



	_word_jp1('林達爾?|リンダール', '琳達爾'),
	['聯合公国', '聯合公国'],

	_word_jp1('エミリア|艾米莉亞', '艾米麗亞'),

	_word_en3('Artolan', '阿爾圖拉斯'),
	_word_jp1('アルトラス|阿爾特拉斯|阿爾托拉斯|阿爾多倫', '阿爾圖拉斯'),

	_word_jp1('イニャトリスカ', '依奈特利斯卡'),

	_word_en3('Ruktoferd', '盧克特菲爾德'),
	_word_jp1('ルクトフェルド|魯科特菲爾德', '盧克特菲爾德'),

	_word_en3('Freche', '弗雷杰'),
	_word_jp1('フレチェ|弗雷切', '弗雷杰'),

	_word_jp1('コルネイユ|科爾內', '克倫內魯'),

	_word_en3('Densel', '丹澤爾'),
	_word_jp1('デンゼル|丹尼爾', '丹澤爾'),

	_word_jp1('ラムザ', 'ラムザ'),

	_word_jp1('ロムール', '羅姆爾'),
	_word_jp1('リングワレーヌ', '林威爾'),

	_word_en3('Planates', '普拉納特斯'),
	_word_jp1('プラナテス|普拉尼特絲|普拉納特斯|普拉那斯特|普拉特拉斯', '普拉納特斯'),

	_word_jp1('ジオグラット|吉歐葛蘭特|吉格拉特', '吉歐葛蘭特'),
	_word_jp1('パーミグラン|法米格蘭|帕米古拉', '法米格蘭'),

	/**
	 *
	 */
	_word_en3('Genas', '朱納斯'),
	_word_jp1('ジューナス|朱納斯|杜納斯|修納斯', '朱納斯'),
	_word_jp1('エレノア', '艾連諾亞'),

	/**
	 *
	 */
	_word_jp1('土龍|土蜥蜴|リゾール', '土竜'),

	_word_en3('Renvia', '倫比亞'),
	_word_jp1('レンビア|蓮比亞', '倫比亞'),

	_word_en3('Arcs', '阿爾克'),
	_word_jp1('アルク', '阿爾克'),

	_word_en3('Siplese', '西普利斯'),
	_word_jp1('シプレーズ', '西普利斯'),

	_word_jp1('綿蝴?蝶', '綿蝶'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	[/^[　 ]+/gm, ''],

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

	...lazymarks['8'],

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
