/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { lazymarks } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '自分が異世界に転移するなら';

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

	['雷康特布宁', '雷康特布宁'],

	['哥林布|哥布林', '哥布林'],

	['共同语|共通语', '共通語'],

	['贝尔米凯|贝尔麦克|ベルミケ|贝尔米克', '貝尔米凱'],
	['春黑|ハルクロ|赫尔克罗', '赫尔克罗'],
	['基尔萨尔|琪尔萨尔', '琪尔萨尔'],
	['修米米|俢米米', '修米米'],

	[/\//g, function (...m)
	{
		return StrUtil.toFullWidth(m[0]);
	}],

	[/([\d０-９]+P)(?!\w)/g, function (...m)
	{
		return StrUtil.toFullWidth(m[1]);
	}],

	[/(\d+)/g, function (...m)
	{
		return StrUtil.toFullNumber(m[1]);
	}],

	[/^[ \t　]+/gm, ''],
	//[/^[\?]/gm, ''],


	[/(？)[　 ]([\u4E00-\u9FFF])/gm, '$1$2'],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

]);

//console.log(words);

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
