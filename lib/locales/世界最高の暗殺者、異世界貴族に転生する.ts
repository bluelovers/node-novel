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



	_word_jp1('ルーグ', '羅格'),
	_word_jp1('トウアハーデ', '托瓦哈迪'),

	/**
	 * 女
	 */
	_word_jp1('迪亞|ディア', '迪亞'),
	_word_jp1('ヴィコーネ', '維科內'),

	_word_jp1('タルト', '塔爾特'),

	_word_jp1('エポナ', '埃波納'),
	_word_jp1('里安農|リアンノン', '利安諾'),

	/**
	 *
	 */

	_word_jp1('ノイシュ', '諾伊斯'),

	/**
	 *
	 */
	_word_jp1('レイチェル', '雷切爾'),

	_word_jp1('[托]里', '托里'),

	/**
	 *
	 */

	_word_jp1('艾爾凡|阿爾凡|アルヴァン', '阿爾凡'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	//[/(?<=\S)(\n)(?=[⋯…][^\n]+)/gm, '\n\n'],
	//[/(?<=^[⋯…][^\n]+)(\n)(?=\S)/gm, '\n\n'],

	[/(?<=」)\n{2}(?=「)/g, '\n'],

	...lazymarks['clear_002'],

	...lazymarks['ln_0010'],

	...lazymarks['class'],
	...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['4'],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	//...lazymarks['8'],

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
