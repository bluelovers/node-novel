/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = 'ウォルテニア戦記';

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

	[/(?:异世界召唤|召唤到异世界|召唤到异世界)[的]?[第]?(\d+)[日天]目?/gm, '异世界召唤第$1日'],

	[/(异世界召唤第?\d+[日天]目?|第\d+[日天])([^\n]*)[\[「\{（]([^\]\n]+)[\]」\}）]/gm, '$1$2【$3】'],

	[/(异世界召唤第\d+日[^\n]*)[ ]+(【)/gm, '$1$2'],

	[/(异世界召唤第\d+日[^\n]*)(\:)?\n+/g, function (...m)
	{
		if (m[2])
		{
			m[2] = StrUtil.toFullWidth(m[2]);
		}
		else if (typeof m[2] == 'undefined')
		{
			m[2] = '';
		}

		return `${m[1]}${m[2]}\n\n`;
	}],

	// #25 #26
	['纱雅|咲耶|咲夜', '咲夜'],

	[/\[/g, '「'],
	[/\]/g, '」'],

	[',', '、'],

	[/([…吗么]\?+|\?+[」…])/ug, function (...m)
	{
		return StrUtil.toFullWidth(m[0]);
	}],

	[/[\!\(\):]|\d+[：:]/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0]);
	}],

	[/([\u4E00-\u9FFF])\.(?!\.)/g, '$1。'],

	[/\n+\-+\n+/gm, '\n\n\n'],

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
