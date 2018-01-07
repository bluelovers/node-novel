/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';
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
	chapter_id: '{{0}}',
	chapter_title: `$t(chapter_id, [{{0}}]).{{title}}`,

	volume_id: '第{{0}}章',
	volume_title: `$t(chapter_id, [{{0}}])：{{title}}`,
};

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words: IWords[] = [

	['漩?[涡渦]波', '渦波'],

	['帕林・科隆', '帕林・库洛'],
	['奇利斯特', '基督'],

	['试听，后面的大剑', '奧里亞大剑'],
	['向后', '向後'],
	['后天', '後天'],

	['名字相川', '名字 相川'],

	[/([先後后]天技能)(?:（スキル）)?[　 ：]*(?!的)([\u4E00-\u9FFF])/g, '$1：$2'],
	[/(名字)[　 ：]+([\u4E00-\u9FFF])/g, '$1：$2'],

	[/([\d０１２３４５６７８９]+(?:\.[\d０１２３４５６７８９]+))(?![a-zＡ-Ｚ人])(.?)/g, function(...m)
	{
		return StrUtil.toHalfNumber(m[1]) + ((m[2] && /[\u4E00-\u9FFF]/.test(m[2])) ? ' ' : '') + m[2];
	}],

	[/([\d０１２３４５６７８９]+)张/g, function (...m)
	{
		return StrUtil.toFullNumber(m[1]) + '枚';
	}],

	[/币([\d０１２３４５６７８９]+)个/g, function (...m)
	{
		return '币' + StrUtil.toFullNumber(m[1]) + '枚';
	}],

	['級别', '等級'],

	[/(等[級级])[　 ：]*(\d+)/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}],

	[/([^\d\.\+\-\* ／\/])(\d+)([^\d\.\+\-\* ／\/])/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]) + m[3];
	}],

	[/([\d\u4E00-\u9FFF])([HM]P)[　 ：]*(\d+)/g, '$1　$2 $3'],
	[/([HM]P)[　 ：]*(\d+)/g, '$1 $2'],

	[/(\d+)[　 ]*[\/／][　 ]*(\d+)/g, '$1／$2'],

	[/([^\u4E00-\u9FFF])班[： ]*(无|剑士|奴隶)/g, function (...m)
	{
		if (/\w$/.test(m[1]))
		{
			m[1] += ' ';
		}

		return m[1] + '職業：' + m[2];
	}],

	[/[\!\(\):,~]/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

	[/\*(\d+)/g, '×$1'],
	[/×(\d+)([\u4E00-\u9FFF])/g, '×$1 $2'],
	[/×(\d+)(?![\.\d])/g, function (...m)
	{
		return StrUtil.toFullNumber(m[0]);
	}],

	[/(\n)[ \t　]+/g, '$1'],
	[/^[ \t　]+/g, ''],

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

	[/《/g, '『'],
	[/》/g, '』'],

	[/[《『「][\?？]{3}[》』」]/g, '『？？？』'],

	[/[\?？]{3}/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

	[/[\u4E00-\u9FFF「！」][—\-]+|[—\-]+[\u4E00-\u9FFF「！」]|[—\-]{2,}/g, function (...m)
	{
		return m[0].replace(/[—\-]/g, '－');
	}],

	[/^－{3,}$/gm, '－－－'],

	[/^－+明天继续－+$/gm, '\n'],

] as IWords[];

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: vMaybe = [

	//'需要偵測的字',

	/([^\u4E00-\u9FFF])班[： ]*(?!无|剑士|奴隶)/g,

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
