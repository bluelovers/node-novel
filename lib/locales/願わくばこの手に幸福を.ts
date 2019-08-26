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
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	//['要取代的字', '取代後的字'],

	_word_jp1('ルーギス|盧吉斯|魯吉斯', '路易斯'),

	_word_jp1('ナインズ', '南音絲'),
	_word_jp1('アリュエノ', '阿琉珥娜'),

	_word_jp1('加莉亞|カリア|卡麗婭|卡莉亞|卡利亞', '卡麗婭'),
	_word_jp1('バードニック|帕多莉可|帕多利克', '帕多利克'),
	_word_jp1('バーベリッジ', '巴別利奇'),

	_word_jp1('芙拉朵|芙垃朵', '芙拉朵'),

	/**
	 *
	 */
	_word_jp1('ヘルト|赫特爾?', '赫爾特'),
	_word_jp1('スタンレー|斯坦(?:利|雷)?', '斯坦利'),

	_word_jp1('セレアル|塞雷亞|塞雷爾|賽雷亞', '塞雷爾'),
	_word_jp1('ウッド', '伍德'),

	_word_jp1('トカゲ', '蜥蜴'),

	_word_jp1('フィアラート', '芙拉朵'),
	_word_jp1('ラ', '娜'),
	_word_jp1('ボルゴグラード|博爾格萊德', '波魯克庫拉特'),

	_word_jp1('ラルグド', '拉爾格'),
	_word_jp1('アン', '安'),

	_word_jp1('マティア|瑪蒂亞', '瑪蒂婭'),

	/**
	 *
	 */
	_word_jp1('ガーライスト', '卡拉伊斯特'),
	_word_jp1('科里登堡', '科里登堡'),

	/**
	 *
	 */
	_word_jp1('ガルーアマリア', '伽羅亞瑪利亞'),

	/**
	 *
	 */
	_word_jp1('ガザリア|卡沙利亚|加薩利亞', '加薩利亞'),
	['空中庭院|空中庭園', '空中庭園'],

	/**
	 *
	 */
	_word_jp1('パーミリスト', '帕米利斯'),

	/**
	 *
	 */
	_word_jp1('アルティウス', '阿爾蒂斯'),
	_word_jp1('オウフル', '奧菲'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['貧民窟|窮民窟', '貧民窟'],

	...lazymarks['clear_002'],

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
