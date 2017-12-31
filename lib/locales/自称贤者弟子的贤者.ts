/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';

/**
 * 改成小說名字
 */
export const lang = '自称贤者弟子的贤者';

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

	['(方舟|弧形|弧光)・?(大地|地球|大陆)[　 ]*(online)?', '方舟・大地　ONLINE', 'ig'],

	['米拉|米菈', '米菈'],
	//['バルガ|巴鲁卡|巴尔加', '巴鲁卡'],
	['雪莱|雪莉', '雪莉'],

	//['艾尔达・卢米娜莉亚'],

	['雅阁加农炮|亚格加农炮', '亚格加农炮'],

	['克罗斯|克雷乌斯', '克雷乌斯'],
	['Guraia|古瑞亚', '古瑞亚'],

	[/^[ \t　]+/gm, ''],

	[/\[/g, '「'],
	[/\]/g, '」'],

	[/^([^\n"“”「」']*)["“']([^\n"“”「」']*(?:\n[^\n"“”「」']*)?)["”']/gm, '$1「$2」'],
	[/^([^\n"“”『』'‘’]*)["“'‘]([^\n"“”『』'‘’]*)["”'’]/gm, '$1『$2』'],

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
