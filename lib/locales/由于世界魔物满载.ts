/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '由于世界魔物满载';

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

	[/^([^．\n]+．[^\n]*)\n+一+。?\n+/gu, '$1\n\n'],

	[/^([^．\n]+)(．)/gu, function ($0, $1, $2)
	{
		return StrUtil.toFullNumber($1) + $2;
	}],

	[/(ＬＶ|等級)(\d+)/g, function ($0, $1, $2)
	{
		return $1 + StrUtil.toFullNumber($2);
	}],

	[/\n([^　\n≪]+[^\n]*\n　)/gu, '\n　$1'],
	[/([≫？」])[。。]/gum, '$1\n'],
	[/^[ 　]*。[ 　]*$/gum, ''],
	[/\.！$/gum, '！'],

	['!', '！'],
	[/！\?+/g, function ($0)
	{
		return StrUtil.toFullWidth($0);
	}],

	// 飒君CONAN: 合作社改为“商业合作社”
	[/(?:商业)?合作社|商业合作商铺/g, '商业合作社'],
	[/建材市场/g, '百货商店'],
	['莫名也从', '莫莫也从'],

	[/社\*+活/g, '社畜生活'],

] as IWords[];

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: vMaybe = [

	//'需要偵測的字',

	'(?:商业)?合作社',
	'建材市场',
	'百货商店',

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
