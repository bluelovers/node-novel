/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';
import * as StrUtil from 'str-util';
import { sublib } from './index';
import { _word_en } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '病娇女神の箱庭';

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

	['yuzuki|柚希|柚肴', '柚希'],
	//中央（水瀬）
	['minase|水瀬', '水瀬'],
	['(?:中央)(君)', '水瀬$1'],
	['(?:中央)\(水瀬\)', '水瀬'],

	['尤诺|YUNO|优诺', '尤諾'],

	['[萝蘿][滋茲]|蘿茲', '蘿茲'],
	['(美狄|媒体)姐', '美狄亞姐'],

	['克劳迪娅|克劳迪亚|克勞迪婭', '克劳迪婭'],

	['蘭古', '蘭古'],

	['哥特|哥德', '哥德'],

	[`Fire${sp}(Ball|bolt)`, 'Fire・Ball', 'ig'],
	[`治療${sp}(毒|麻痺)`, '治療・$2', 'ig'],

	//['亚', '亞'],

	[/([^a-z])SP(?![a-z])/ig, '$1SP'],
	[/([^a-z])flag(?![a-z])/ig, '$1Flag'],
	[/([^a-z])([a-z])(?![a-z])/ig, function (...m)
	{
		return m[1] + m[2].toUpperCase();
	}],

	[/([^\w])(\d+(?:[~]\d+)?)(?![\w])/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}],

	[/[\!\(\):,~-]/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

	[/([^\d０１２３４５６７８９])([\d０１２３４５６７８９]+)[，,]([\d０１２３４５６７８９]{3})(?=[^\d])/g, function (...m)
	{
		return m[1] + StrUtil.toHalfNumber(m[2] + ',' + m[3]);
	}],

	[/^[ \t　]+/gm, ''],

	[/"([^\n"']*)'([^'"\n]+)'/gm, '"$1『$2』'],
	[/"([^\n"']*)'([^'"\n]+)'/gm, '"$1『$2』'],

	[/^([^\n"“”「」'\[\]［］]*)["“'\[［]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ『』\u4E00-\u9FFF][^\n"“”「」'\[\]［］]*(?:\n[^\n"“”「」'\[\]［］]*)?)["”'\]］]/gm, '$1「$2」'],
	[/^([^\n"“”『』'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”『』'‘’]*)["”'’]/gm, '$1『$2』'],
	[/^([^\n【】<>]*)[<]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>]*)[>]/gm, '$1【$2】'],

	[/(『[^『』\n]+』[^\n"“”『』'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”『』'‘’]*)["”'’]/gm, '$1『$2』'],
	[/(「[^「」\n]+」[^\n"“”「」'‘’]*)["“'‘]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n"“”「」'‘’]*)["”'’]/gm, '$1「$2」'],

	[/^([^「」\n【】\[\]［］\{\}]*)[\[［\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】\[\]］\{\}]*)[\]］\}]/gm, '$1【$2】'],
	[/(「[^「」\n【】\[\]［］]*)[\[［]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】\[\]］]*)[\]］]/gm, '$1【$2】'],


	[/(【[^【】\n<>\[\]\{\}]+】[^\n【】<>\[\]\{\}]*)[<\[\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>\[\]\{\}]*)[\]\}>]/gm, '$1【$2】'],

	[/[\[【“]/g, '「'],
	[/[\]】”]/g, '」'],

	[/(「[^」]*)「([^」]*)」/g, '$1『$2』'],

	[/([^】\n])(\n【[^\n]+】\n)/g, '$1\n$2'],
	[/(\n【[^\n]+】\n)([^【\n])/g, '$1\n$2'],

	[/\n[ 　]*\.[ 　]*(?=\n)/g, '\n'],

	['([」』])[ ]+（', '$1（'],

	[/\n+[\-~～]+\n*$/g, ''],

	[/^[\-]{3,}$/gm, '\n'],

	_word_en(/[a-z]/g, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

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
