/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '天才魔法使與原娼婦新娘';

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

	[`艾斯特|艾斯提`, '艾斯特'],
	[`拉尔夫${sp}艾斯特`, '拉尔夫＝艾斯特'],
	[`拉尔夫=艾斯特`, '拉尔夫＝艾斯特'],

	['召還魔法|召回魔法', '召還魔法'],

	['澄華', '澄華'],

	[/([\u4E00-\u9FFF])=([\u4E00-\u9FFF])/, '$1＝$2'],

	[`[＋+]α`, '＋α'],

	[/\n+([★☆])/g, '\n\n\n$1'],

	[/^([★☆][^\n]+)\n(\S)/gm, '$1\n\n$2'],

	[/(\d+)/g, function (...m)
	{
		return StrUtil.toFullNumber(m[1]);
	}],

	[/([^\w\u00C0-\u017F\.μ・·?‧•―-])([\w]|ss)(?![\w\u00C0-\u017F\.μ・·?‧•―-])/ig, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}],

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

]);

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
