/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';

/**
 * 改成小說名字
 */
export const lang = 'ギルドのチートな受付嬢';

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

	//['要取代的字', '取代後的字'],

	//['— —', '——'],

	[/(^|\n)[　\u3000　　]{2,}/g, '$1'],

	[/^([^\n"“”「」]*)["“]([^\n"“”「」]*)["”]/gm, '$1「$2」'],
	[/^([^\n"“”『』]*)["“]([^\n"“”『』]*)["”]/gm, '$1『$2』'],

] as IWords[];

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
