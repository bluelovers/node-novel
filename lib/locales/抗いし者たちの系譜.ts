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
export const lang = '抗いし者たちの系譜';

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
export const words: IWords[] = [

	[/[\!\(\):,~]/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

	[/^[ \t　]+/gm, ''],

	[/^([^「」\n【】\[\]［］\{\}]*)[\[［\{]([ ]*[…\u4E00-\u9FFF][^\n【】\[\]］\{\}]*)[\]］\}]/gm, '$1【$2】'],
	[/(「[^「」\n【】\[\]［］]*)[\[［]([ ]*[…\u4E00-\u9FFF][^\n【】\[\]］]*)[\]］]/gm, '$1【$2】'],

	[/^([^\n"“”「」'\[\]]*)["“'\[]([ ]*[…\u4E00-\u9FFF][^\n"“”「」'\[\]]*(?:\n[^\n"“”「」'\[\]]*)?)["”'\]]/gm, '$1「$2」'],
	[/^([^\n"“”『』'‘’]*)["“'‘]([ ]*[…\u4E00-\u9FFF][^\n"“”『』'‘’]*)["”'’]/gm, '$1『$2』'],
	[/^([^\n【】<>]*)[<]([ ]*[…\u4E00-\u9FFF][^\n【】<>]*)[>]/gm, '$1【$2】'],

	[/(『[^『』\n]+』[^\n"“”『』'‘’]*)["“'‘]([ ]*[…\u4E00-\u9FFF][^\n"“”『』'‘’]*)["”'’]/gm, '$1『$2』'],
	[/(「[^「」\n]+」[^\n"“”「」'‘’]*)["“'‘]([ ]*[…\u4E00-\u9FFF][^\n"“”「」'‘’]*)["”'’]/gm, '$1「$2」'],
	[/(【[^【】\n<>\[\]\{\}]+】[^\n【】<>\[\]\{\}]*)[<\[\{]([ ]*[…\u4E00-\u9FFF][^\n【】<>\[\]\{\}]*)[\]\}>]/gm, '$1【$2】'],

	[/\[/g, '「'],
	[/\]/g, '」'],

	[/(「[^」]*)「([^」]*)」/g, '$1『$2』'],

	[/([^】\n])(\n【[^\n]+】\n)/g, '$1\n$2'],
	[/(\n【[^\n]+】\n)([^【\n])/g, '$1\n$2'],

	[/\n[ 　]*\.[ 　]*(?=\n)/g, '\n'],

] as IWords[];

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: vMaybe = [

	//'需要偵測的字',

	'组合',

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
