import { lazymarks } from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp } from '@node-novel/layout-pattern/lib/core/const';
import getBaiduTable from '@node-novel/layout-pattern/lib/core/helper/baidu';
import { zhRegExp } from 'regexp-cjk';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import { EnumLazyMarkKeys } from '@node-novel/layout-pattern/lib/core/pattern-keys';
import WORDS_MAYBE from '@node-novel/layout-pattern/lib/core/words/maybe';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '' as const;

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IPatternRule["words_source"] = [

	//['要取代的字', '取代後的字'],

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [
	// BOM
	...lazymarks['c000'],

	...getBaiduTable(),

	...lazymarks['en'],

	...lazymarks['replace_001'],

	...lazymarks['jp1'],

	[/，([”』」])/g, '$1'],

	[/(.)（·）(.)/g, '$1$2'],

	...lazymarks['c050'],

	[/\n[ ]*([^：\n【】]+：[^\n【】]*)\n{2,}([ ]*[^：\n【】]+：[^\n]{0,60}(?=\n|$))/ugm, '\n$1\n$2'],

	[/\n[ ]*([^：\n]+：[^\n]*)\n{2,}([ ]*[^：\n]+\n)/ug, '\n$1\n\n$2'],

	...lazymarks['clear_001'],

	...lazymarks['c100'],

	...lazymarks['ln'],
];

/**
 * 實際使用的取代樣式
 */
export const words: IPatternRule["words"] = _word_zh_all([

	...words_layout,

] as IWords[]);

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: IPatternRule["words_maybe"] = [

	...WORDS_MAYBE,

];

/**
 * 分析取代完成後執行的代碼
 *
 * @param {string} text
 * @returns {string}
 */
export function words_callback(text: string): string
{
	return text;

	/*
	let lightnovel_copy = '(?:图源|扫图|录入|翻译|翻译|作者|原名|插画|校对|日语原名|书名|转自|简介|目录)';

	// @fixme unknow bug
	text = text
		.toString()
		//.replace(new RegExp(`(^|\\n)((?:[ \\t　]*)${lightnovel_copy}：(?:[^\\n]*))\\n+(?!(?:[^\\n]+：|[＝－\=\\-]))`, 'ug'), '$1$2\n\n')
		.replace(new zhRegExp(`(^|\\n)((?:[ \\t　]*)${lightnovel_copy}：(?:[^\\n]*))\\n{2,}(?!(?:[^\\n]+：|[＝－\=\\-─]))`, 'ug'), '$1$2\n\n')

		.replace(new zhRegExp(`((?:[ \\t　]*)?${lightnovel_copy}：(?:[^\\n]*))\\n+(?=[^\\n：]+)`, 'ug'), '$1\n')

		.replace(new zhRegExp(`((?:[ \\t　]*)?${lightnovel_copy}：(?:[^\\n]*))\\n+(?=[＝－\\=\\-─])`, 'g'), '$1\n')

		.replace(new zhRegExp(`\\n([＝－\\=\\-─]+)\\n+((?:[ \\t　]*)?${lightnovel_copy}：)`, 'g'), '\n$1\n$2')
	;

	//text = text.replace(/^(「[^\n」]+)\n*(\n[^\n「」]+)*\n*(\n[^\n「]+」)/gm, '$1$2$3');

	return text;
	 */
}

export default <IPatternRule>{
	lang,
	words_source,
	words_layout,
	words,
	words_maybe,
	words_callback,
}
