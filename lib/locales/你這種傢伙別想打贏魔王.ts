/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '';

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
 * 在這裡放此小說專屬的取代樣本
 */
export const words: IWords[] = sublib._word_zh_all([

	['芙拉姆|フラム', '芙拉姆'],
	['亞普利柯特|アプリコット', '亞普利柯特'],

	['米爾琪特|ミルキット|米尔琪特|米而琪特', '米爾琪特'],

	['塞拉|薩拉', '塞拉'],
	['安比蓮', '安比蓮'],

	['琪莉露|キリル', '琪莉露'],
	['斯維奇卡|スウィーチカ', '斯維奇卡'],

	['ジーン|吉恩', '吉恩'],
	['インテージ|伊恩特吉', '伊恩特吉'],

	['葉塔娜|エターナ|叶塔娜', '葉塔娜'],
	['利恩巴烏|リンバウ', '利恩巴烏'],

	['加迪歐|ガディオ', '加迪歐'],
	['拉斯卡特|ラスカット', '拉斯卡特'],

	['ライナス|萊納斯', '萊納斯'],
	['レディアンツ|雷迪安茲', '雷迪安茲'],

	['マリア|瑪莉亞', '瑪莉亞'],
	['アフェンジェンス|亞菲恩兼斯', '亞菲恩兼斯'],

	['イーラ|伊拉', '伊拉'],

	['デイン|迪恩', '迪恩'],
	['菲尼亞斯|フィニアース', '菲尼亞斯'],

	['斯特尤德', '斯特尤德'],

	['艾尼奇得', '艾尼奇得'],

	['涅伊加斯', '涅伊加斯'],

	['利齊', '利齊'],

	['塞雷伊德', '塞雷伊德'],
	['涅伊加斯', '涅伊加斯'],
	['西圖姆', '西圖姆'],
	['札伊翁', '札伊翁'],
	['迪扎', '迪扎'],


	['茵庫', '茵庫'],
	['利夫庫拉福特', '利夫庫拉福特'],

	['緹娜', '緹娜'],

	// ----------------

	['魂喰いのツヴァイハンダー|噬魂双手剑|噬魂的雙手劍', '噬魂的雙手劍'],

	['Status|ステータス', 'Status'],
	['エピック|史詩', '史詩'],

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
