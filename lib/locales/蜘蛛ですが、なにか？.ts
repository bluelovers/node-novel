/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, lazymarks, _word_jp1 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	/**
	 * @todo 人偶蜘蛛
	 *
	 * 艾兒、莎兒、莉兒和菲兒
	 */
	['阿艾爾', '艾兒'],
	['利艾爾', '莉兒'],
	['菲艾爾', '菲兒'],
	['薩艾爾', '莎兒'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/^　+(?!：)/gm, ''],

	[/(?<=[^〉\s]\n)(?=〈)/gm, '\n'],
	[/(?<=〉\n)(?=[^〈\s])/gm, '\n'],

	[/(?<=〉\n)\n(?=〈)/gm, ''],
	[/(?<=》\n)\n(?=《)/gm, ''],

	[/(?<=^「[^\n]+」　+「[^\n]+\n)\n(?=「)/gm, ''],

	[/(?<=^「[^\n]+」「[^\n]+」「[^\n]+\n)\n(?=「)/gm, ''],

	[/(?<=^能力值|技能)　+(?=(?:HP|技能點數)：)/gm, '\n'],

	[/(?<=^ＳＰ：[^\n]+\n)\n*(?=：)/gm, '　　'],
	[/(?<=^ＳＰ：[^\n]+\n)\n*(?=　：)/gm, '　'],
	[/(?<=^[^\n]+：[^\n]+\n)\n*(?=：)/gm, '　'],

	[/(?<=^[^\n　]+：[^\n]+\n)\n(?=[^\n]+?：)/gm, ''],

	[/(?<=^(ＳＰ|SP)：[^\n]+\n)(?=[^\n　]+：)/igm, '\n'],

	[/(?<=^　+：[^\n]+\n)(?=[^\n]+：)/gm, '\n'],

	...sublib.lazymarks['class'],
	...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

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
