import { console } from 'debug-color2';
import * as StrUtil from 'str-util';
import { zhRegExp } from 'regexp-cjk';
import { addResourceBundle, i18next, loadLocales } from '../i18n';
import { _word_zh_all, lazymarks } from '../locales/lib';
import { _word_en3 } from '../locales/lib/index';
import * as JsDiff from 'diff';
import jsdiff = require('diff');

console.enabledColor = true;

console.inspectOptions = console.inspectOptions || {};
console.inspectOptions.colors = true;

export { console }

export let CACHE_REGEXP_LIST = [] as [RegExp, string | ((...argv: string[]) => string)][];

export function replace_name_list()
{
	if (!CACHE_REGEXP_LIST.length)
	{
		CACHE_REGEXP_LIST = [
			[/后(記|宮|篇)/g, '後$1'],
			[/(背)后/g, '$1後'],
			[/レポート/g, '記事'],
			[new zhRegExp('発', 'ig'), '發'],
			[/于/g, '於'],
			[new zhRegExp('気', 'ig'), '氣'],
			[new zhRegExp('処', 'ig'), '處'],
			[new zhRegExp('獣', 'ig'), '獸'],
			[new zhRegExp('団', 'ig'), '團'],
			[new zhRegExp('囲', 'ig'), '圍'],
			//[new zhRegExp('気', 'ig'), '氣'],

			[/哪里/g, '哪裡'],

			..._word_zh_all([

				...lazymarks['zh'],
				...lazymarks['zh2'],

				//...lazymarks['c000'],

				[/\uFEFF/g, ''],

				[/[  \xA0]/g, ' '],
				//[/[　\u3000]/g, '　'],
				[/[·‧・···•˙●]/g, '・'],
				[/[．]/g, '・'],
				['[∶:]', ':'],
				[/[：：︰﹕：]/ug, '：'],
				[/[〔［]/g, '［'],
				[/[〕］]/g, '］'],

				['後続', '後續'],
				['(剣|角)闘', '剣闘'],

				['然后', '然後'],

				['丑陋', '醜陋'],

				['応', '應'],

				['幕后', '幕後'],

				_word_en3(' *(VS|ｖｓ|ＶＳ) *', 'ＶＳ'),


				_word_en3('ELF', 'ELF'),

				...lazymarks['full_width_001'],
				...lazymarks['full_width_002'],
				...lazymarks['en'],

				['[,!?]', StrUtil.toFullWidth],

			]).map(function (data)
			{
				if (!(data[0] instanceof RegExp) || (data[0] instanceof zhRegExp))
				{
					data[0] = new zhRegExp(data[0], 'ig');
				}

				return data;
			}) as typeof CACHE_REGEXP_LIST,

		];

		//console.log(CACHE_REGEXP_LIST);
	}

	CACHE_REGEXP_LIST.forEach(data =>
	{

		// @ts-ignore
		if ((data[0] instanceof RegExp) || (data[0] instanceof zhRegExp))
		{
			data[0].lastIndex = 0;
		}
	});

	return CACHE_REGEXP_LIST;
}

export function diff_log(src_text: string, new_text: string): string
{
	let diff = jsdiff.diffChars(src_text, new_text);

	let diff_arr = diff
		.reduce(function (a, part)
		{
			let color = part.added ? 'green' :
				part.removed ? 'red' : 'grey';

			let t = console[color].chalk(part.value);

			a.push(t);

			return a;
		}, [])
	;

	return diff_arr.join('');
}

export function _getLoadLocales(myLocalesID: string, novelID: string)
{
	myLocalesID = myLocalesID || novelID;

	let myLocales = loadLocales(myLocalesID);
	if (myLocales)
	{
		addResourceBundle(myLocales);
	}
	else
	{
		myLocales = {
			lang: myLocalesID,
		};
	}

// @ts-ignore
	i18next.changeLanguage(myLocales.lang);
// @ts-ignore
	i18next.setDefaultNamespace('i18n');

	return {
		myLocales,
		myLocalesID,
	}
}
