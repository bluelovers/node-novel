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

	['佩里特忒斯', '佩里特忒斯'],
	['庫洛艾', '庫洛艾'],

	['伊雷姆|依綸|伊蕾娜', '伊蕾娜'],

	/**
	 *
	 */
	['古利薩德|グリザード', '古利薩德'],

	['梅露莉菈|メルリダ', '梅露莉菈'],

	['露希爾|ルシル|拉希爾|拉西爾', '露希爾'],

	['斯塔萊特', '斯塔萊特'],
	['拉斯緹斯|拉斯緹拉', '拉斯緹拉'],

	['伽爾巴士|ガルバス', '伽爾巴士'],

	['索尼婭|索妮婭?', '索妮婭'],

	['クリシュナ', 'クリシュナ'],
	['グリエル|格利埃爾', '格利埃爾'],

	['ラドボルグ', 'ラドボルグ'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	[/^　+/gm, ''],

	...lazymarks['class'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	//...lazymarks['full_width_002'],

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

export default exports;
