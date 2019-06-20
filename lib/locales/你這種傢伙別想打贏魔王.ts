/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, _word_en3, _word_jp1 } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['芙拉姆|フラム|福拉姆|弗拉姆', '芙拉姆'],
	['亞普利柯特|アプリコット|亞普利科特|亞普里克特|亞普里柯特', '亞普利柯特'],

	['米爾琪特|ミルキット|米尔琪特|米而琪特|米爾棋特', '米爾琪特'],

	_word_jp1('塞拉|薩拉|賽拉|セーラ|塞伊', '塞拉'),
	['安比蓮', '安比蓮'],

	['琪莉露|キリル|琪利露|琪利露', '琪莉露'],
	['斯維奇卡|スウィーチカ|絲維奇卡', '斯維奇卡'],

	['ジーン|吉恩', '吉恩'],
	['インテージ|伊恩特吉', '伊恩特吉'],

	['葉塔娜|エターナ|叶塔娜|艾塔娜|埃塔納', '艾塔娜'],
	['利恩巴烏|リンバウ|莉恩巴烏', '利恩巴烏'],


	['加迪歐|ガディオ|伽迪奧|迦迪歐|伽迪歐', '加迪歐'],
	['拉斯卡特|ラスカット', '拉斯卡特'],
	_word_jp1('ティア|緹婭', '緹婭'),


	['ライナス|萊納斯', '萊納斯'],
	['レディアンツ|雷迪安茲|雷蒂安茲', '雷迪安茲'],

	['マリア|瑪莉亞|瑪利亞|瑪麗亞', '瑪莉亞'],
	['アフェンジェンス|亞菲恩兼斯', '亞菲恩兼斯'],


	['イーラ|伊拉|伊菈', '伊菈'],

	['デイン|迪恩', '迪恩'],
	['菲尼亞斯|フィニアース', '菲尼亞斯'],

	['斯特尤德', '斯特尤德'],

	['エニチーデ|艾尼奇德|艾尼奇得', '艾尼奇德'],

	['塞雷伊德', '塞雷伊德'],
	['涅伊加斯', '涅伊加斯'],
	['西圖姆', '西圖姆'],
	['札伊翁|扎一翁', '札伊翁'],
	['迪扎', '迪扎'],

	[`涅克特・琳凱吉`, '涅克特・琳凱吉'],

	['茵庫|因庫', '茵庫'],
	['利夫庫拉福特', '利夫庫拉福特'],

	_word_jp1('魯克|路克|ルーク|盧克', '盧克'),
	_word_jp1('謬特|穆特|ミュート', '謬特'),

	[`(?:魯克|路克|ルーク|盧克)${sp}(?:福爾普|胡魯普|弗禄普)`, '盧克・福爾普'],

	_word_jp1('麥克|邁克', '麥克'),
	[`(?:麥克|邁克)${sp}(?:史密斯)`, '麥克・史密斯'],

	['緹娜', '緹娜'],

	_word_jp1('ダフィズ|達菲茲', '達菲茲'),
	_word_jp1('シャルマス|夏路瑪斯', '夏路瑪斯'),

	_word_jp1('絲吉|スージィ', '絲吉'),
	_word_jp1('露可|ルコー', '露可'),

	['歐吉斯', '歐吉斯'],
	['庫里亞迪', '庫里亞迪'],

	// -------------

	['薇爾希|ウェルシー|微爾希|維爾希', '薇爾希'],
	_word_jp1('利齊|リーチ|利奇', '利齊'),

	// ----------------

	['薩緹露斯|薩媞露絲|サティルス|薩迪爾斯', '薩媞露絲'],
	['芙蘭索瓦斯|弗蘭索烏茲|フランソワーズ|富朗索瓦茲', '弗蘭索烏茲'],

	['薩媞露絲・弗蘭索烏茲', '薩媞露絲・弗蘭索烏茲'],
	['戴米賽利科・拉迪烏斯', '戴米賽利科・拉迪烏斯'],

	/**
	 *
	 */
	_word_jp1('カロウル|卡羅爾|卡勞爾', '卡羅爾'),
	_word_jp1('ヴァシアス|瓦斯阿斯', '瓦斯阿斯'),
	_word_jp1('狄安', '狄安'),

	_word_jp1('斯勞|スロウ', '斯勞'),

	_word_jp1('凱蕾娜|凱瑞娜', '凱蕾娜'),

	/**
	 *
	 */
	_word_jp1('アンリエット|安麗埃特|亨利埃特', '安麗葉特'),
	_word_jp1('バッセンハイム', '巴森海姆'),

	_word_jp1('オティーリエ|歐緹莉耶|歐堤莉耶|歐緹利耶|歐提莉葉|奧蒂利耶|奧蒂麗埃', '歐緹麗耶'),
	_word_jp1('フォーケルピー|福克爾皮', '福克爾琵'),

	_word_jp1('ハロム|哈羅姆', '哈蘿姆'),

	_word_jp1('パトリア', '巴特利亞'),

	/**
	 *
	 */
	_word_jp1('イリエイス', '伊麗艾斯'),

	/**
	 * 起源教
	 */
	_word_jp1('サトゥーキ|塞?薩託基|賽托基|塞?薩托基|薩圖基', '薩托基'),
	_word_jp1('ラナガルキが|拉那加爾基', '拉那加爾基'),

	// ----------------

	['艾奇德娜|艾奇德那', '艾奇德娜'],

	// ----------------

	['魂喰いのツヴァイハンダー|噬魂双手剑|噬魂的雙手劍', '噬魂的雙手劍'],

	['Status|ステータス', 'Status'],
	['エピック|史詩', '史詩'],

	['螺旋的孩子|螺旋的赤子', '螺旋的赤子'],

	_word_jp1('オリジンコア|起源之?核心?', '起源核'),

	_word_en3('Rotation', '回旋'),

	_word_jp1('奇美拉|キマイラ', '奇美拉'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['[发]', '發'],

	['村姑', '村女'],

	['工會', '公會'],

	['壹|一', '一'],

	[/^ +/gm, ''],
	[/^　(?=「)/gm, ''],

	...sublib.lazymarks['class'],

	/*
	_word_en(/\d+g/ig, function (...m: string[])
	{
		return m[1] + StrUtil.toFullWidth(m[2].toUpperCase());
	}),

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),
	 */

	...sublib.lazymarks['ln_0010'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

] as IWords[]);

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: vMaybe = [

	//'需要偵測的字',

] as vMaybe;

/**
 * 其他用途
 *
 * @type {{chapter_id: string; chapter_title: string; volume_id: string; volume_title: string}}
 */
export const value = {
	chapter_id: '第{{0}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,

	volume_id: '第{{0}}章',
	volume_title: `$t(chapter_id, [{{0}}])：{{title}}`,
};

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

export default exports;
