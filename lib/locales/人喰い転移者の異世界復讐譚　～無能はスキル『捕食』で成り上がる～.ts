/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '人喰い転移者の異世界復讐譚　～無能はスキル『捕食』で成り上がる～';

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

	//['要取代的字', '取代後的字'],

	['anima(?=\\b|[^\\w\\u00C0-\\u017F])', '阿尼玛', 'ig'],
	['Animus(?=\\b|[^\\w\\u00C0-\\u017F])', '阿尼玛斯', 'ig'],

	['断一头', '断頭'],

	[/([^\w\u00C0-\u017F\.])([\w])(?![\w\u00C0-\u017F\.])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}],

	['^　技能[ 　]+(?![ 　]|$)', '　技能　　', 'gm'],
	[/(　+) (?=\S)/g, '$1　'],

	[/^(　{2,}[^\n]+)\n\n(　{2,}|　[^　\n]+　{2,})/gm, '$1\n$2'],
	[/^(　[^\n　]+　{2,}[^\n]*)\n\n(　{2,}|　[^　\n]+　{2,})/gm, '$1\n$2'],

	[/^[　 ]+([\-◆◇]+)[　 ]*$/gm, '$1'],

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
