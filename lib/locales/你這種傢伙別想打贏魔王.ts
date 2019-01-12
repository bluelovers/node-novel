/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, _word_jp1 } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['芙拉姆|フラム', '芙拉姆'],
	['亞普利柯特|アプリコット|亞普利科特', '亞普利柯特'],

	['米爾琪特|ミルキット|米尔琪特|米而琪特', '米爾琪特'],

	['塞拉|薩拉', '塞拉'],
	['安比蓮', '安比蓮'],

	['琪莉露|キリル', '琪莉露'],
	['斯維奇卡|スウィーチカ', '斯維奇卡'],

	['ジーン|吉恩', '吉恩'],
	['インテージ|伊恩特吉', '伊恩特吉'],

	['葉塔娜|エターナ|叶塔娜|艾塔娜', '艾塔娜'],
	['利恩巴烏|リンバウ', '利恩巴烏'],


	['加迪歐|ガディオ', '加迪歐'],
	['拉斯卡特|ラスカット', '拉斯卡特'],
	_word_jp1('ティア|緹婭', '緹婭'),


	['ライナス|萊納斯', '萊納斯'],
	['レディアンツ|雷迪安茲', '雷迪安茲'],

	['マリア|瑪莉亞', '瑪莉亞'],
	['アフェンジェンス|亞菲恩兼斯', '亞菲恩兼斯'],

	['イーラ|伊拉|伊菈', '伊菈'],

	['デイン|迪恩', '迪恩'],
	['菲尼亞斯|フィニアース', '菲尼亞斯'],

	['斯特尤德', '斯特尤德'],

	['エニチーデ|艾尼奇德|艾尼奇得', '艾尼奇德'],

	['涅伊加斯', '涅伊加斯'],

	['塞雷伊德', '塞雷伊德'],
	['涅伊加斯', '涅伊加斯'],
	['西圖姆', '西圖姆'],
	['札伊翁', '札伊翁'],
	['迪扎', '迪扎'],

	[`涅克特・琳凱吉`, '涅克特・琳凱吉'],

	['茵庫', '茵庫'],
	['利夫庫拉福特', '利夫庫拉福特'],

	['緹娜', '緹娜'],

	_word_jp1('ダフィズ|達菲茲', '達菲茲'),
	_word_jp1('シャルマス|夏路瑪斯', '夏路瑪斯'),

	_word_jp1('絲吉|スージィ', '絲吉'),
	_word_jp1('露可|ルコー', '露可'),

	['歐吉斯', '歐吉斯'],
	['庫里亞迪', '庫里亞迪'],

	// -------------

	['薇爾希|ウェルシー', '薇爾希'],
	_word_jp1('利齊|リーチ', '利齊'),

	// ----------------

	['薩緹露斯|薩媞露絲|サティルス', '薩媞露絲'],
	['芙蘭索瓦斯|弗蘭索烏茲|フランソワーズ', '弗蘭索烏茲'],

	['薩媞露絲・弗蘭索烏茲', '薩媞露絲・弗蘭索烏茲'],
	['戴米賽利科・拉迪烏斯', '戴米賽利科・拉迪烏斯'],

	// ----------------

	['艾奇德娜', '艾奇德娜'],

	// ----------------

	['魂喰いのツヴァイハンダー|噬魂双手剑|噬魂的雙手劍', '噬魂的雙手劍'],

	['Status|ステータス', 'Status'],
	['エピック|史詩', '史詩'],

	['螺旋的孩子|螺旋的赤子', '螺旋的赤子'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['[发]', '發'],

	['壹|一', '一'],

	[/^ /gm, ''],
	[/^　(?=「)/gm, ''],

	...sublib.lazymarks['class'],

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

	...sublib.lazymarks[4],

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
