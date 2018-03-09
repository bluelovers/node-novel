/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = 'エルフ転生からのチート建国記';

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

	['希利路|西利绿|席尔璐|西里尔|西利魯', '希利路'],

	['夏尔|露西尔|露西艾?尔?|ルシエ|璐谢|露希耶|Rushie|路希尔|露希尔', '露西艾'],
	['クウ|庫舞?', '庫'],

	['雷克', '雷克'],
	['修迪', '修迪'],
	['雪乃|雪諾', '雪諾'],

	['尼基|ニージェ', '尼基'],

	['森妖精|森精灵', '森精灵'],
	['艾魯希埃|艾露西艾|艾露西艾', '艾魯希埃'],


	...sublib.lazymarks['class'],

	[/(\d+)/g, function (...m)
	{
		return StrUtil.toFullNumber(m[1]);
	}],

	[/([^\w\u00C0-\u017F\.μ・·?‧•―-])([\w])(?![\w\u00C0-\u017F\.μ・·?‧•―-])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}],

	[/^　/gm, ''],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	[`【`, '「'],
	[`】`, '」'],

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
