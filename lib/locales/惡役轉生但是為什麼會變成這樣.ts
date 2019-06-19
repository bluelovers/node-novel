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
 * 然後拉多卡是艾利擇，愛莉絲是愛莉絲
 */
export const words_source: IWords[] = [

	_word_jp1('艾莉莎|艾麗莎|エリザ|愛麗莎|艾利莎|艾利沙', '艾莉莎'),
	_word_jp1('ツァーリ|沙莉|薩莉|塔莉', '莎莉'),

	_word_jp1('卡地亞|カルディア|卡路迪亞|卡迪亞', '卡爾迪亞'),

	[`(?:艾莉莎|歐文)${sp}卡爾迪亞`, `$1・卡爾迪亞`],

	_word_jp1('特雷西亞|特蕾西亞|テレジア|特勞西亞', '特雷西亞'),
	_word_jp1('特雷茲', '特雷茲'),
	_word_jp1('利特爾蓋|リーデルガウ|李德爾加', '利特爾蓋'),
	[`${sp}特雷吉亞${sp}利特爾蓋`, `・特雷吉亞・利特爾蓋`],

	[`安吉爾${sp}伊里謝茲`, `安吉爾・伊里謝茲`],

	[`阿蒙${sp}諾爾`, `阿蒙・諾爾`],



	_word_jp1('ゴールトン', '高爾頓'),

	_word_jp1('ギュンター', '君特'),
	_word_en3('Gunther', '君特'),

	_word_jp1('ラスィウォク|拉斯約庫|拉斯沃庫', '拉斯沃克'),

	_word_jp1('グリュンフェルド|古力恩費爾德', '古尤菲爾德'),

	_word_jp1('カミル|卡米盧', '卡米爾'),
	_word_jp1('メアリ', '瑪麗'),

	_word_jp1('馬來香|マレシャン|馬(?:蕾|雷)莎|馬雷西亞|馬雷西昂', '瑪蕾莎'),

	_word_jp1('アジール|啊吉爾', '阿吉爾'),
	_word_jp1('カルヴァン', '卡爾凡'),

	_word_jp1('ラトカ|拉特卡|拉多卡|拉托卡', '拉多卡'),
	//_word_jp1('エリーゼ|艾麗澤|埃麗斯', '艾麗澤'),
	_word_jp1('愛麗絲|エリーゼ|埃麗澤|艾利澤|艾莉絲|埃莉絲', '艾麗澤'),

	_word_jp1('チェルシュトカ', '齊爾修德卡'),
	_word_jp1('シェルストーク|シュルストーク', '修魯斯托克'),

	[`(?:艾麗澤|埃麗斯)${sp}(?:齊爾修德卡|修魯斯托克)`, `$1・$2`],

	_word_jp1('シュテーデル', '施塔德爾'),


	_word_jp1('マーヤ', '瑪雅'),

	_word_jp1('ボレスワフ|博裡瓦夫|ボスワレフ', '波利斯瓦夫'),

	_word_jp1('ベルワイエ|佩露瓦爾|貝路瓦耶|貝魯瓦耶', '貝爾威耶'),

	_word_jp1('オルテンシオ|歐露頓西奧', '奧爾登西奧'),

	_word_jp1('フェ－ベ', '斐貝'),

	_word_jp1('クラウディア|克勞提亞|克勞迪亞', '克勞緹婭'),
	_word_jp1('ローレンツォレル|羅倫索雷爾', '洛倫索雷爾'),

	[`克勞緹婭${sp}洛倫索雷爾`, `克勞緹婭・洛倫索雷爾`],

	_word_jp1('イサドラ', '伊莎多拉'),

	_word_jp1('エルベティア', '艾爾維耶'),

	/**
	 *
	 */
	_word_jp1('希利魯|西里爾|シリル|西瑞爾|基里爾|希利爾', '希利魯'),

	_word_en3('Paulo', '保羅'),

	/**
	 *
	 */
	_word_jp1('ユグフェナ|優格非那|尤古費納|朱格芬|尤府芬納', '尤古芬納'),

	_word_jp1('エインシュバルク|恩修巴魯克|埃茵斯巴爾|艾恩修巴爾克|艾恩斯巴爾克', '愛因修巴魯克'),

	_word_jp1('エルグナード|艾爾芬納多', '埃爾格納德'),

	[`埃爾格納德${sp}愛因修巴魯克`, `埃爾格納德・愛因修巴魯克`],

	_word_jp1('ウィーグラフ', '維格拉夫'),

	_word_jp1('ヴォルマルフ', '沃爾瑪爾夫'),

	_word_jp1('パランケス', '巴蘭克斯'),

	_word_jp1('斯魯|シル', '西爾'),

	_word_jp1('バンディシア|班迪西亞|班地西亚|范迪西亞|潘蒂西亞', '班迪西亞'),



	/**
	 *
	 */
	_word_jp1('アールクシャ|阿爾庫夏|阿魯\*庫夏', '阿爾庫夏'),

	_word_jp1('アール', '阿爾'),
	_word_jp1('クシャ', '庫夏'),

	[`阿爾${sp}庫夏`, `阿爾・庫夏`],

	_word_jp1('亞克西亞|阿庫西亞|阿克西亞|アークシア', '阿庫希婭'),

	_word_en3('Arxian', '阿庫希婭'),

	[`(?:阿?庫西亞|阿爾庫夏)教`, `阿爾・庫夏教`],

	_word_jp1('クラリア', '庫拉利亞'),

	_word_jp1('ヘンズナッド|漢茲那德', '亨茲納德'),

	_word_jp1('ミソルア', '米索露亞'),
	_word_jp1('アハル', '阿哈魯'),

	_word_jp1('ファリス', '法麗絲'),

	_word_jp1('ガルビアート', '加勒比阿特'),


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

	_word_jp1('ノルドシュテルム|諾爾多斯通?', '諾爾多斯通'),


	_word_jp1('阿蒙諾(德|姆|鲁)?', '阿蒙・諾爾'),

	_word_jp1('アモン・ノール', '阿蒙・諾爾'),

	_word_jp1('メルリアート', '梅麗多'),


	/**
	 * 東方
	 * 即丹澤爾，普拉尼特絲，吉歐葛蘭特、法米格蘭，這四個公国
	 */



	_word_jp1('林達爾?|リンダール', '琳達爾'),
	['聯合公国', '聯合公国'],

	_word_jp1('アルトラス|阿爾特拉斯|阿爾托拉斯', '阿爾圖拉斯'),

	_word_jp1('イニャトリスカ', '依奈特利斯卡'),


	_word_jp1('ルクトフェルド|魯科特菲爾德', '盧克特菲爾德'),
	_word_jp1('フレチェ|弗雷切', '弗雷杰'),

	_word_jp1('デンゼル', '丹澤爾'),

	_word_jp1('ラムザ', 'ラムザ'),

	/**
	 *
	 */
	_word_jp1('ジューナス|朱納斯|杜納斯|修納斯', '朱納斯'),
	_word_jp1('エレノア', '艾連諾亞'),

	/**
	 *
	 */
	_word_jp1('土龍|土蜥蜴|リゾール', '土竜'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/^[　 ]+/gm, ''],

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks['ln_0010'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	...sublib.lazymarks[8],

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
