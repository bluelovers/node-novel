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
export const words_source: IWords[] = [

	['ステラ|史黛拉', '史黛拉'],
	['ノードゥス|諾杜斯|諾爾都斯|諾德斯', '諾杜斯'],

	// 鳥
	['クレバー|克萊瓦|克萊維', '克萊瓦'],

	['グレン|格倫|格林', '格倫'],

	['グレッグス|格雷古斯|格雷斯', '格雷古斯'],
	['ジョージア|喬基亞|佐治亞|喬治亞', '喬基亞'],

	['ベック|貝克', '貝克'],
	['メイス|梅斯', '梅斯'],
	['ガルド|伽魯德|蓋魯德', '伽魯德'],

	['マリー|瑪麗|瑪莉', '瑪麗'],
	['ライア|萊亞|萊雅', '萊雅'],
	['ドブ川|多布川', '多布川'],

	// 斯托克商會
	['ストック|斯托克', '斯托克'],
	['(?:存貨|斯托克)商會', '斯托克商會'],

	['ルロイ|路羅伊|羅魯伊|魯洛伊', '路羅伊'],

	['パルプド|帕魯普德|帕爾普德', '帕魯普德'],
	['(帕魯普德|紙漿)(工會|組合)', '帕魯普德工會'],

	_word_jp1('ヴァレル|瓦爾貝爾|瓦萊爾', '瓦萊爾'),
	_word_jp1('アート', '亞特'),

	[`(?:瓦爾貝爾|瓦萊爾)${sp}(?:アート|亞多|亞特)`, '瓦萊爾・亞特'],

	_word_jp1('アポール', '阿波羅'),
	_word_jp1('オーソン', '奧森'),

	/**
	 *
	 */

	['多米尼克', '多米尼克'],
	['星教會|星教堂', '星教會'],
	['盧安娜', '盧安娜'],

	['ロスタム|羅斯特姆', '羅斯特姆'],

	_word_jp1('ムンドノーヴォ', '穆德諾沃'),

	['星屑的淚水|星屑的眼淚', '星屑的眼淚'],

	// 霍爾希德帝国
	['ホルシード|霍爾希德|霍希德', '霍爾希德'],

	// 皮貝利之城 ピーベリーの街
	['ピーベリー|皮貝利|比貝利', '皮貝利'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	[/^　/gm, ''],

	...lazymarks['class'],

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

	...lazymarks['4'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

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
