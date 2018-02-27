/**
 * Created by user on 2018/1/25/025.
 */

import { IWords } from '../';
import * as StrUtil from 'str-util';
import { regex_str, array_unique } from '../../func';
import { IRegExpCallback } from 'novel-text';

import * as regexpCjkLib from 'regexp-cjk/lib';
import { replace_literal } from 'regexp-cjk/lib';
import { isRegExp } from 'regexp-cjk';
export const _word_zh = regexpCjkLib._word_zh;

import { tagTemplate } from './tag';
export { tagTemplate }

export const lazymarks = {} as IWords[][];

lazymarks[0] = [
	[/([\u4E00-\u9FFF])\[([^\n【】<>\[\]\{\}『』「」“”'"]+)\]/g, '$1【$2】'],
];

{

	//
// UNICODE RANGE : DESCRIPTION
//
// 3000-303F : punctuation
// 3040-309F : hiragana
// 30A0-30FF : katakana
// FF00-FFEF : Full-width roman + half-width katakana
// 4E00-9FAF : Common and uncommon kanji
//
// Non-Japanese punctuation/formatting characters commonly used in Japanese text
// 2605-2606 : Stars
// 2190-2195 : Arrows
// u203B     : Weird asterisk thing

	//〖号〗

	let word = `！？…－—\\w０-９ａ-ｚＡ-Ｚ『』\\u4E00-\\u9FFF\\u4E00-\\u9FAF\\u3000-\\u30FF`;

	lazymarks[1] = [

		[/ +$/gm, ''],

		[
			/"([^\n"']*)'([^'"\n]+)'/gm,
			'"$1『$2』'
		],
		[
			/"([^\n"']*)'([^'"\n]+)'/gm,
			'"$1『$2』'
		],

		[/^([“])([^\n"“”‘’「」『』'\[\]［］]+)\1$/gm, '$1$2”'],
		[/^([‘])([^\n"“”‘’「」『』'\[\]［］]+)\1$/gm, '$1$2’'],
		[/^([”])([^\n"“”‘’「」『』'\[\]［］]+)“$/gm, '“$2”'],

		[
			`^([^\\n"“”「」'\\[\\]［］]*)["“'\\[［]([ ]*[${word}][^\\n"“”「」'\\[\\]［］]*(?:\\n[^\\n"“”「」'\\[\\]［］]*)?)["”'\\]］]`,
			'$1「$2」',
			'gm',
		],

		[
			// 嘗試修正 「杀」『杀』
			`(「[^「」『』\\n]+」)(?:[^\\n"“”「」『』'\\[\\]［］]*)["“]([ ]*[${word}][^\\n"“”「」『』'‘’]*)["”]`,
			'$1「$2」',
			'gm',
		],

		[
			`^([^\\n"“”『』'‘’]*)["“'‘]([ ]*[${word}][^\\n"“”『』'‘’]*)["”'’]`,
			'$1『$2』',
			'gm',
		],
		[
			`^([^\\n【】<>]*)[<]([ ]*[${word}][^\\n【】<>]*)[>]`,
			'$1【$2】',
			'gm',
		],

		[
			`(『[^『』\\n]+』[^\\n"“”『』'‘’]*)["“'‘]([ ]*[${word}][^\\n"“”『』'‘’]*)["”'’]`,
			'$1『$2』',
			'gm',
		],
		[
			`(「[^「」\\n]+」[^\\n"“”「」'‘’]*)["“'‘]([ ]*[${word}][^\\n"“”「」'‘’]*)["”'’]`,
			'$1「$2」',
			'gm',
		],

		[
			`^([^「」\\n【】\\[\\]［］\\{\\}]*)[\\[［\\{]([ ]*[${word}][^\\n【】\\[\\]］\\{\\}]*)[\\]］\\}]`,
			'$1【$2】',
			'gm',
		],
		[
			`(「[^「」\\n【】\\[\\]［］]*)[\\[［]([ ]*[${word}][^\\n【】\\[\\]］]*)[\\]］]`,
			'$1【$2】',
			'gm',
		],

		[
			`(【[^【】\\n<>\\[\\]\\{\\}]+】[^\\n【】<>\\[\\]\\{\\}]*)[<\\[\\{]([ ]*[${word}][^\\n【】<>\\[\\]\\{\\}]*)[\\]\\}>]`,
			'$1【$2】',
			'gm',
		],
	];
}

lazymarks[2] = [
	[/[\[“]/g, '「'],
	[/[\]”]/g, '」'],
];

lazymarks[3] = [
	/**
	 * 雖然這裡有BUG 但是這個BUG反而可以幫忙發現沒有正確對應的引號
	 */
	[/(「[^」]*)「([^」]*)」/g, '$1『$2』'],

	[
		/([「『]{2,})([^「『\n』」]+)([』」]{2,})/g, function (...m)
	{
		if (m[1].length == m[3].length)
		{
			//console.log(m[1].length, m[3].length);

			m[1] = m[1]
				.replace(/[「『]/g, '『')
				.replace(/^[「『]/, '「')
			;

			m[3] = m[3]
				.replace(/[』」]/g, '』')
				.replace(/[』」]$/, '」')
			;

			return m[1] + m[2] + m[3];
		}

		return m[0];
	}
	],
];

lazymarks[4] = [
	[
		/[\!\(\):,~∞&%]+/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}
	],

	[/([\d０-９])([\/\-~\+])([\d０-９])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		}) + m[3];
	}],

	[/([\d０-９\u4E00-\u9FFF])([xX])([\d０-９])/g, '$1×$3'],
	[/([\u4E00-\u9FFF\w\d０-９])\*([\d０-９]+)/g, '$1×$2'],

	[/([\u4E00-\u9FFF！？…－—])([a-z])(?=[\u4E00-\u9FFF])/ig, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		});
	}],

	[
		/\?+(?=[』」\n])/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}
	],

	[
		/([\u4E00-\u9FFF])(\?+)(?=[』」\n ][^\u4E00-\u9FFF])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		});
	}
	],

	[/(？) (！)/g, '$1$2'],

	[/([^\.])\.$/gm, '$1。'],

	[/([・，。、！？]) (?=\S)/g, '$1'],
	[/(\S) (?=[・，。、！？])/g, '$1'],

	['([\\u4E00-\\u9FFF])([Oo]+)(?=[\\u4E00-\\u9FFF])', function (...m)
	{
		return m[1] + '◯'.repeat(m[2].length);
	}],
];

lazymarks[5] = [
	[/ ?([』」》）】]) ?/g, '$1'],
	[/ ?([【《（「『]) ?/g, '$1'],
];

lazymarks['ln'] = [

	[/^(「[^\n」]+)\n*(\n[^\n「」]+)*\n*(\n[^\n「]+」)/gm, '$1$2$3'],

	[/([』」》）】])(\n{2})\n+([【《（「『])/g, '$1$2$3'],

	[/(\S)(\n{2})\n+([【《（「『])/g, '$1$2$3'],
	[/([』」》）】])(\n{2})\n+(\S)/g, '$1$2$3'],

];

lazymarks['ltrim'] = [
	[/^[ \t　]+/gm, ''],
];

let _en = [
	'RPG',
	'BOSS',
	'Cosplay',
	'RAID',
	'Fantasy',
	'OK',
	'CG',

	'Golem',
	'Rank',

	'MAX',
	'UP',
	'Lv',

	'My',
	'Lord',

	'Gay',

	'cm',
	'km',
];

lazymarks['en'] = [

	_word_en(/[a-z]+/, function (...m)
	{
		if (m[2].match(/([a-z]{2,})(?:\1)|([a-z])\2{2,}/i))
		{
			return m[0];
		}

		return m[1] + m[2].replace(/^[a-z]/, function (s)
		{
			return s.toUpperCase();
		});
	}, 'g'),

	..._en.map(function (value)
	{
		return _word_en(value);
	}),

];

//console.log(lazymarks['en']);

lazymarks['en2'] = [

	_word_en(/[a-z]+/, function (...m)
	{
		if (m[2].match(/([a-z]{2,})(?:\1)/i))
		{
			return m[0];
		}

		return m[1] + m[2].replace(/^[a-z]/, function (s)
		{
			return s.toUpperCase();
		});
	}, 'g'),

	..._en.map(function (value)
	{
		return _word_en(value, /[a-z]/.test(value) ? function (...m)
		{
			if (!/[a-z]/.test(m[2]))
			{
				return m[0];
			}

			return m[1] + value;
		} : null);
	}),

];

lazymarks['zh'] = _word_zh_all([
	/**
	 * 難以辨認的簡繁日 字替換
	 */
	['话|話', '話'],
	['絲|丝', '絲'],
	['賈|贾', '賈'],
	['庫|库', '庫'],
	['奥|奧', '奧'],
	['鳞|鱗', '鱗'],
	['爱|愛', '愛'],
	['茲|兹', '茲'],
	['連|连', '連'],
	['蚀|蝕', '蝕'],
	['锻|鍛', '鍛'],
	['铠|鎧', '鎧'],
	['渊|淵', '淵'],
	['鲁|魯', '魯'],
	['温|溫', '溫'],
	['維|维', '維'],
	['残|殘', '殘'],
	['猪|豬', '豬'],
	['复|復', '復'],
	['莲|蓮', '莲'],
	['级|級', '級'],
	['納|纳', '納'],
	['缇|緹', '緹'],
	['盗|盜', '盜'],
	['[剑剣劍劍]', '劍'],
	['酱|醬', '醬'],
	['团|団', '団'],
	['绪|緒', '緒'],
	['黑|黒', '黑'],
	['価|價', '價'],
	['祿|禄', '禄'],
	['凱|凯', '凱'],

	['談', '談'],

	['聖', '聖'],
	['強', '強'],
	['賢', '賢'],
	['紙', '紙'],
	['馬', '馬'],
	['証', '証'],

	//['[觉覚覺]', '覺'],

	['[鸠鳩]', '鳩'],

	['獣|獸', '獸'],
	['騎', '騎'],

	['亞', '亞'],
	['师|師', '師'],
	['調', '調'],
	['鮮', '鮮'],
	['討', '討'],

	['諾|诺', '諾'],
	['場', '場'],

	['贝|貝', '貝'],
	['国|國', '国'],
	['围|圍', '圍'],
	['階|阶', '階'],

	/*
	['薩|萨', '薩'],
	['爾|尔', '爾'],
	['烏|乌', '烏'],

	['战|戦', '戦'],
	['创|創', '創'],
	//['炼|錬', '錬'],
	['术|術', '術'],
	*/

	['熱', '熱'],
	['諸', '諸'],
	['绝|絶', '絶'],

	['异|異', '異'],
	['謎|谜', '謎'],

	['氷|冰', '冰'],
	['[处]', '処'],
	['義|义', '義'],

	['飾|饰', '飾'],
	['與|与', '與'],
	['虧|亏', '虧'],

	['語', '語'],
	['間', '間'],
	['俢|修', '修'],
	['渉', '渉'],

	['魅', '魅'],
	['陣', '陣'],
	['貪', '貪'],

	['詛|诅', '詛'],

]);

lazymarks['zh2'] = _word_zh_all([

	[/([两一-十])只(手)/g, '$1隻$2'],

	['复合', '複合'],
	['训练', '訓練'],
	['索敵', '索敵'],

	['冒険', '冒険'],

	[/赤果果|赤裸裸/g, '赤裸裸'],

	['鍛冶', '鍛冶'],

	['竞技场|競技場', '競技場'],
	['(闘|斗|鬥)技場', '闘技場'],

	['遺産', '遺産'],

	[/夢魘/g, '夢魘'],
	[/奴隶|奴隷/g, '奴隷'],

	['(凱|凯|鎧)甲', '鎧甲'],

	['進化', '進化'],

	['试炼|試練', '試練'],

	['后続|後續', '後續'],

	['复製|複製', '複製'],

	['遺迹|遺跡', '遺跡'],

	['美丑|美醜', '美醜'],

	['絶頂', '絶頂'],

	['治(愈|癒)', '治癒'],

	['学園', '学園'],

]);

lazymarks['class'] = _word_zh_all([

	['(錬|炼)金術', '錬金術'],
	['術(师|師)', '術師'],
	['賢者', '賢者'],
	['術士', '術士'],
	['剣聖', '剣聖'],
	['勇者', '勇者'],

	['武(斗|闘|鬥)', '武闘'],
	['格(闘|斗|鬥)術', '格闘術'],
	['角(斗|闘|鬥)', '角闘'],

	['魔法陣', '魔法陣'],
	['魔術', '魔術'],

	['術式', '術式'],

]);

lazymarks['c000'] = _word_zh_all([

	[/\uFEFF/g, ''],

	[/[  \xA0]/g, ' '],
	//[/[　\u3000]/g, '　'],
	[/[·‧・···•]/g, '・'],
	[/[．]/g, '・'],
	['[∶:]', ':'],
	[/[：：︰﹕：]/ug, '：'],
	[/[〔［]/g, '［'],
	[/[〕］]/g, '］'],
	[/[―—]/g, '—'],
	['— —', '——'],

]);

lazymarks['c050'] = _word_zh_all([

	[/[\.・。]{3}/g, '…'],
	[/…[\.・。]{1,2}/g, '……'],
	[/[\.・。]{2}/g, '…'],

	[/([…也吗么嗎麼人中聊哦笑办我營恋道害做個族策車蹈具哈对事破嗯辦喲欸著咦船家到呢來啊數阿用何裡吶吧了趣里做诶～！？][\?!]+|[\?!]+[」…）！])/ug, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

]);

lazymarks['c100'] = _word_zh_all([

	// 無間斷的 -
	[/[－\-─—]{2,}|[－\-─—](?=[』」》）])/g, function (...m)
	{
		//return m[0].replace(/[－\-─—]/g, '─');
		return '─'.repeat(m[0].length);
	}],

	[/([─＝=══－\-─—\*＊＊◇◆☆◊▃]){10,}/g, function (...m)
	{
		//return m[0].replace(/[－\-─—]/g, '─');
		return m[1].repeat(20 || 51);
	}],

	// 無間斷的等號
	[/([＝=══]){4,}/g, function (...m)
	{
		//return m[0].replace(/[－\-─—]/g, '─');
		return '═'.repeat(m[0].length);
	}],

	[/([\u4E00-\u9FFF])\-(?![\w\-+])/g, '$1─'],

]);

export function _word_en(search: string | RegExp, ret: string | IRegExpCallback = null, flag = 'ig'): IWords
{
	return [new RegExp(`(^|\\W)(${regex_str(search)})(?!\\w)`, flag), ((ret !== null) ? ret : '$1' + search)];
}

/**
 * 最好只用在全新腳本內
 *
 */
export function _word_zh_all(arr: IWords[])
{
	return arr.slice().map(function (value, index, array)
	{
		if (Array.isArray(value) && ((typeof value[0] == 'string') || isRegExp(value[0])))
		{
			let [s, ...a] = value.slice();

			s = regexpCjkLib._word_zh(s, null)[0];

			return [s, ...a];
		}

		return value;
	}) as IWords[];
}

export let _zh_num = '一二三四五六七八九十';
export let _zh_num2 = '百十';
export let _full_num = '０１２３４５６７８９';

import * as self from './index';

export default self;
//export default exports;
