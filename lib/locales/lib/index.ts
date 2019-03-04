/**
 * Created by user on 2018/1/25/025.
 */

import { IWords } from '../';
import * as StrUtil from 'str-util';
import { regex_str, array_unique, killBadPx, regex_str2 } from '../../func';
import { IRegExpCallback } from 'novel-text';

//import * as regexpCjkLib from 'regexp-cjk/lib/v1';
import * as regexpCjkLib from 'regexp-cjk/lib';
import { isRegExp, zhRegExp } from 'regexp-cjk';

export const _word_zh = regexpCjkLib._word_zh;

import { tagTemplate } from './tag';

export { tagTemplate }

export const lazymarks = {} as IWords[][];

export const EN_REGEXP = /\w\u0100-\u017F\u0400-\u04FF\u00A1-\u00FF/.source;

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

	let word = `！？…⋯－─—\\w０-９ａ-ｚＡ-Ｚ『』·＝\\u4E00-\\u9FFF\\u4E00-\\u9FAF\\u3000-\\u30FF\\u2200-\\u22FF\\u2e80-\\u33ffh`;

	lazymarks[1] = [

		[/^\t+/gm, ''],

		[/ +$/gm, ''],

		[/，(。)$/gm, '$1'],

		[/([』」])。$/gm, '$1'],

		[
			/^("{2,})([^\n"']+)("{2,})$/gm,
			function (...m)
			{
				if (m[1].length == m[3].length)
				{
					return ['「'.repeat(m[1].length),
						m[2],
						'」'.repeat(m[3].length),
					].join('')
				}

				return m[0];
			},
		],

		[
			/("{2,})([^\n"']+)("{2,})/gm,
			function (...m)
			{
				if (m[1].length == m[3].length)
				{
					return ['「'.repeat(m[1].length),
						m[2],
						'」'.repeat(m[3].length),
					].join('')
				}

				return m[0];
			},
		],

		[
			/"([^\n"']*)'([^'"\n]+)'/gm,
			'"$1『$2』',
		],
		[
			/"([^\n"']*)'([^'"\n]+)'/gm,
			'"$1『$2』',
		],

		[/^([“])([^\n"“”‘’「」『』'\[\]［］]+)\1$/gm, '$1$2”'],
		[/^([‘])([^\n"“”‘’「」『』'\[\]［］]+)\1$/gm, '$1$2’'],
		[/^([”])([^\n"“”‘’「」『』'\[\]［］]+)[“”]$/gm, '“$2”'],

		[/^([「])([^\n"“”‘’「」『』'\[\]［］]+)["]$/gm, '「$2」'],

		[
			[
				`^([^\\n"“”「」'\\[\\]［］]*)`,
				`[“\\[［]`,
				[
					'(',
					`[ ]*[${word}][^\\n"“”「」'\\[\\]［］]*`,
					`(?:\\n[^\\n"“”「」'\\[\\]［］]*)?`,
					')',
				].join(''),
				`[”\\]］]`,
			].join(''),

			'$1「$2」',
			'gm',
		],

		[
			[
				`^([^\\n"“”「」'\\[\\]［］]*)`,
				`["“'\\[［]`,
				[
					'(',
					`[ ]*[${word}][^\\n"“”「」'\\[\\]［］]*`,
					')',
				].join(''),
				`["”'\\]］]`,
			].join(''),

			'$1「$2」',
			'gm',
		],

		[
			// 嘗試修正 「杀」『杀』
			`(「[^「」『』\\n]+」(?:[^\\n"“”「」『』'\\[\\]［］]*))["“]([ ]*[${word}][^\\n"“”「」『』'‘’]*)["”]`,
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

		[/^\.$/gm, ''],

		[/(?<=[」』])\n(?=[《【＜〈])/g, '\n\n'],

	];
}

lazymarks[2] = [
	[/[“]/g, '「'],
	[/[”]/g, '」'],

	[/[‘]/g, '『'],
	[`[’](?![a-zＡ-Ｚａ-ｚ${EN_REGEXP}])`, '』'],

	[/\[/g, '「'],
	[/\]/g, '」'],
];

lazymarks[7] = [
	[/[【]/g, '「'],
	[/[】]/g, '」'],
];

lazymarks[8] = [

	[/^【([^\n【】]+)】$/gm, '「$1」'],

	[/^【([^\n【】 ]+)(\n[^【】]+)】/gm, '「$1$2」'],
	[/^【([^\n【】 ]+[，。！…⋯？][^\n【】]*)(\n[^【】\n]+)】/gm, '「$1$2」'],
	[/^【([^\n【】 ]+[，。！…⋯？～][^\n【】]*)】/gm, '「$1」'],

];

lazymarks[33] = [

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
	},
	],

];

lazymarks[3] = [
	/**
	 * 雖然這裡有BUG 但是這個BUG反而可以幫忙發現沒有正確對應的引號
	 */
	[/(「[^」]*)「([^」]*)」/g, '$1『$2』'],

	...lazymarks[33],

];

lazymarks[4] = [

	[/^[。，]$/gm, '\n'],

	[
		/[\!\(\):~∞&%]+/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	},
	],

	[
		/([^\d０-９])(,)(?![\d０-９])/ig, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		});
	},
	],

	/*
	[/([^\d０-９])(,)(?![\d０-９])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		});
	}, 'g', {
		useNativeRegExp: true,
	}],
	*/

	[
		/([\d０-９])([\/\-~\+])([\d０-９])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		}) + m[3];
	},
	],

	[/([\d０-９\u4E00-\u9FFF])([xX])([\d０-９])/g, '$1×$3'],
	[/([\u4E00-\u9FFF\w\d０-９])\*([\d０-９]+)/g, '$1×$2'],

	[
		/([\u4E00-\u9FFF！？…⋯－—])([a-z])(?=[\u4E00-\u9FFF])/ig, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		});
	},
	],

	[
		/\?+(?=[』」\n])/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	},
	],

	[
		/([\u4E00-\u9FFF])(\?+)(?=[』」\n ][^\u4E00-\u9FFF])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2], {
			skip: {
				space: true,
			},
		});
	},
	],

	[/(？) (！)/g, '$1$2'],

	[/([^\.\n])\.$/gm, '$1。'],

	[/([・，。、！？]) (?=\S)/g, '$1'],
	[/(\S) (?=[・，。、！？])/g, '$1'],

	['○', '◯'],

	[
		'([\\u4E00-\\u9FFF])([Oo]+)(?=[\\u4E00-\\u9FFF])', function (...m)
	{
		return m[1] + '◯'.repeat(m[2].length);
	},
	],
];

lazymarks[5] = [
	[/ ?([』」》）】]) ?/g, '$1'],
	[/ ?([【《（「『]) ?/g, '$1'],
];

let ckear_hr = '\n\n======================\n\n';

lazymarks['clear_001'] = [

	[/^(第[^\n]+話[^\n]*)\n+/g, '$1\n\n'],

	[/^[═=]+\n|\n[\.…⋯]+$/g, ''],

	[/\n[──＝=═]+$/g, ''],

	[/\n+[\(（\[_]*(?:完毕?|FIN)[\)）\]]*[。\-_]\s*$/ig, ''],

	[/^\s*[~【《（「『〈<─\-－=＝…⋯\.]*\s*(?:始)\s*[~〉』」》）】>─\-－=＝…\.]*\s*/ig, ''],

	[/\n+\s*[~【《（「『〈<─\-－一=＝…⋯\._]*\s*(?:(?:本|\d+)話.?)?(?:完毕?|fin|END|終わり)\s*[~〉』」》）】>─\-－一=＝…⋯\._]*\s*$/ig, ''],

];

lazymarks['replace_001'] = [

	[/(.+)[「【\<《（\(【]\1[）\)】》\>】」]/g, '$1'],

	[/([「『《](.+)[』」》])[（\(【]\2[）\)】]/g, '$1'],

];

lazymarks['ln'] = [

	[/^([　 ]*[\-\=＝－─＊◇◆☆◊\*─＝=══－～\-─—\*＊＊↣◇◆★■□☆◊]+[\-\=＝－─＊◇◆☆◊\*─＝=══－\-─—\*＊＊◇◆■□☆◊　 ]*)。$/g, '$1'],

	//['([。”])\n+[,，﹑]\n+', '$1\n\n'],
	[/^[,，﹑]$/gm, ''],

	[/^(「[^\n」]+)\n*((?:\n[^\n「」]+)*)\n*(\n[^\n「]+」)/gm, '$1$2$3'],

	[/([』」》）】])(\n{2})\n+([【《（「『])/g, '$1$2$3'],

	[/(\S)(\n{2})\n+([【《（「『])/g, '$1$2$3'],
	[/([』」》）】])(\n{2})\n+(\S)/g, '$1$2$3'],

	[/([─—])\n([\u4E00-\u9FFF])(?![^\n]*?[─—]|[^\n]*\n\n)/g, '$1\n\n$2'],

	[
		/\n{1,2}([　 ]*[\-\=＝－─＊◇▲◆☆◊\*─＝=══－～\-─—\*＊＊↣◇★◆■□☆◊]+[\-\=＝－─＊◇◆☆◊\*─＝=══－\-─—\*＊＊◇◆■□☆◊　 ]*)\n+/g,
		'\n\n$1\n\n',
	],

	[
		/\n{3,}([　 ]*[\-\=＝－─＊◇▲◆☆◊\*─＝=══－～\-─—\*＊＊↣◇★◆■□☆◊]+[\-\=＝－─＊◇◆☆◊\*─＝=══－\-─—\*＊＊◇◆■□☆◊　 ]*)\n+/g,
		'\n\n\n$1\n\n',
	],

	[/\n+([　 ]*[＊◇◆☆◊\*～\*＊＊↣◇★◆■□☆◊＝＝=══▼]+[＊◇◆☆◊\*～　\*＊＊↣◇★◆■□☆◊＝＝=══▼]*)\n+/g, '\n\n\n$1\n\n'],

	[/(?<=[◆◇■□★▼＊☆◊]\n|^[◆◇■□★▼＊☆◊][^\n]*\n)(?=[^◆◇■□★▼＊☆◊\n])/gm, '\n'],

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

	'SM',

	'FLAG',

	'MMORPG',
	'MMO',

	'UFO',

	'NEET',

	'BGM',

	'SF',

	'NETA',

	'Golem',
	'Rank',

	'MAX',
	'UP',
	'Lv',

	'HP',
	'H',
	'SP',
	'MP',

	'SAN',

	'Ｈ',

	'My',
	'Lord',

	'Gay',

	'cm',
	'km',

	'DVD',

	'SOS',
	'USB',
	'CM',

	'PC',

	'OFF',

	'S',
	'Ｓ',

];

lazymarks['en'] = [

	_word_en(/[a-z][a-z']*/, function (...m)
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
	//['[复]', '復'],
	['莲|蓮', '蓮'],
	['级|級', '級'],
	['納|纳', '納'],
	['缇|緹', '緹'],
	['盗|盜', '盜'],
	['剑|剣|劍|劍', '劍'],
	['酱|醬', '醬'],
	['团|団', '團'],
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
	['[证]', '証'],
	['貫|贯', '貫'],

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
	['围|圍|囲', '圍'],
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
	//['[处]', '処'],
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

	['別', '別'],

	['[枪]', '槍'],

	['詛|诅', '詛'],

	['宮|宫', '宮'],
	['赛|賽', '賽'],

	['[恶悪]', '惡'],

	['[龙]', '龍'],

	['兎|兔', '兔'],

	['铃|鈴', '鈴'],

	['岗|崗', '崗'],

	['对|対|對', '對'],

	[`脳|脑`, '腦'],

	[`殻|殼|壳`, '殻'],

	[`骂`, '罵'],
	[`驾`, '駕'],

	[`妈`, '媽'],

	['館', '館'],

	['鳥', '鳥'],

	['備', '備'],

	['領', '領'],

	['約', '約'],

	['銃', '銃'],
	['嬰', '嬰'],
	['貶', '貶'],
	['緋', '緋'],
	['遺', '遺'],

	['説', '說'],
	['視', '視'],

	['薬', '藥'],

	['婭', '婭'],

	['險', '險'],
	['師', '師'],

	['銀', '銀'],

	['紡', '紡'],
	['紗', '紗'],
	['紋', '紋'],

	['[霊]', '靈'],

	['貧', '貧'],
	['軍', '軍'],

	['簒|篡', '簒'],
	['貴', '貴'],

	['萊', '萊'],
	['岡|[冈]', '岡'],

	['書', '書'],

	['螞', '螞'],
	['数|數', '數'],


	['戦', '戰'],

	['魚', '魚'],

	['陸', '陸'],

	['玛', '瑪'],
	['爺', '爺'],

	['長', '長'],
	['鷲', '鷲'],

	//['説', '說'],

	// 岁歲歳
	['歳', '歳'],
	['[泽]', '澤'],

	['爾', '爾'],
	['羅', '羅'],

	['車', '車'],
	['樹', '樹'],
	['麗', '麗'],
	['術', '術'],
	['頓', '頓'],
	['頭', '頭'],
	['風', '風'],

	['監', '監'],
	['獄', '獄'],
	['倫', '倫'],
	['療', '療'],
	['薩', '薩'],
	['歐', '歐'],
	['蘭', '蘭'],
	['謝', '謝'],
	['夢', '夢'],
	['壊|壞', '壊'],
	['紅', '紅'],
	['执|執', '執'],
	['[门]', '門'],
	['姬|姫', '姫'],
	['費|费', '費'],
	['達', '達'],

	['[种]', '種'],
	['[卢]', '盧'],

	['[决]', '決'],

	['[麪麵麺]', '麵'],

	['戰', '戰'],

	['刹|剎', '刹'],

	['実|實', '實'],

	['買', '買'],
	['賣', '賣'],
	['劳', '勞'],
	['结', '結'],
	['[觉]', '覺'],

	['蘿', '蘿'],

	['蓋', '蓋'],
	['願', '願'],
	['独', '獨'],

	['衛', '衛'],
	['[当]', '當'],

	['護', '護'],
	['華', '華'],

	['躶', '裸'],
	['關', '關'],

	['[齐]', '齊'],

	['線|綫', '線'],

	['隨', '隨'],

	['單', '單'],
	['[逊]', '遜'],

	['[莱]', '萊'],

	['[风]', '風'],

	['隶', '隷'],

	['桜', '櫻'],

	['[圏]', '圈'],

	['[图]', '圖'],

	['[优]', '優'],

	['[东]', '東'],
	['[钱]', '錢'],

	['陰', '陰'],
	['陽', '陽'],
	['緣', '緣'],

	['賭', '賭'],

	['[转]', '轉'],
	['[顾]', '顧'],
	['[问]', '問'],
	['[细]', '細'],
	['[乐]', '樂'],
	['[杀]', '殺'],
	['[刚]', '剛'],
	['[见]', '見'],

	['廢|廃', '廢'],
	['気', '氣'],

	['学', '學'],

	['衆|众', '眾'],

	['邊', '邊'],
	['拔|抜', '拔'],

	['鴯', '鴯'],
	['鶓', '鶓'],

	['[爲]', '為'],

	['[祕秘]', '秘'],

	['迸', '進'],

	['弾', '彈'],

	['図', '圖'],

	['満', '滿'],

	['暁', '曉'],

	['霸|覇', '霸'],

	['応', '應'],
	['総', '總'],

	['[発]', '發'],

	['[舎]', '舍'],

	['様', '樣'],

	['専', '專'],

	['涙', '淚'],

	['撃', '擊'],

	['晚', '晚'],

	['[髪]', '髮'],

	['[广]', '廣'],

	['温', '溫'],

	['覚', '覺'],
	['関', '關'],
	['猟', '獵'],
	['営', '營'],
	['圧', '壓'],

	['犧', '犧'],

	['[𫗭]', '餵'],

	['[麽]', '麼'],

	['[徴]', '徵'],

	['稅', '稅'],

	['[倶]', '俱'],

	['粽|糉|糭', '粽'],

	['[繋]', '繫'],

	['[曏]', '嚮'],

	['[児]', '兒'],

	['册', '冊'],

]);

lazymarks['zh_cht'] = _word_zh_all([

	['國', '國'],
	['姫|姬', '姬'],
	['壞', '壞'],
	['學', '學'],
	['險', '險'],
	//['證', '證'],
	['剎', '剎'],
	['絕', '絕'],
	['殼', '殼'],
	['歲', '歲'],
	['隸', '隸'],
	['靈', '靈'],
	['[歴]', '歷'],
	['屬', '屬'],
	['樂', '樂'],

	['[両两]', '兩'],

]);

lazymarks['zh2'] = _word_zh_all([

	[/([两一-十])只(手)/g, '$1隻$2'],

	['娼婦|娼婦', '娼婦'],
	['飯餸|飯餚', '飯餚'],

	['复合', '複合'],
	['复数', '複數'],

	['训练', '訓練'],
	['索敵', '索敵'],

	['冒険', '冒険'],

	['英雄', '英雄'],

	['女僕', '女僕'],

	[/赤果果|赤裸裸/g, '赤裸裸'],

	['鍛冶', '鍛冶'],

	['竞技场|競技場', '競技場'],
	['(闘|斗|鬥)技場', '闘技場'],

	['遺産', '遺産'],

	[/夢魘/g, '夢魘'],
	[/奴隶|奴隷/g, '奴隷'],

	['(凱|凯|鎧)甲', '鎧甲'],

	['進化', '進化'],

	['隷属', '隷属'],

	['试炼|試練', '試練'],

	['后続|後續', '後續'],

	['复製|複製', '複製'],

	['遺迹|遺跡', '遺跡'],

	['美丑|美醜', '美醜'],

	['鍛鍊|鍛煉', '鍛鍊'],

	['女昌妇', '娼婦'],

	['誘拐', '誘拐'],

	['絶頂', '絶頂'],

	['治(愈|癒)', '治癒'],

	['(学)園', '$1園'],

	['冒険者(?:公|工|行)(会)', '冒険者公$1'],

	['思想準備', '心理準備'],

	['宿驛|旅館', '旅館'],

	['煉獄', '煉獄'],

	['鑑定|鉴定|鉴别', '鑑定'],
	['補正', '補正'],

	['加護', '加護'],

	['妖精乡', '妖精郷'],

	['幼馴染', '幼馴染'],

	['職業', '職業'],
	['履歴|履历', '履歴'],
	['降臨', '降臨'],

	['將軍|将軍', '將軍'],

	['図書', '圖書'],
	['恩寵', '恩寵'],

	['(?:粽|糉|糭)(子|葉)', '粽$1'],
	['(肉)(?:粽|糉|糭)', '$1粽'],

	['気圧', '氣壓'],

]);

lazymarks['jp1'] = _word_zh_all([

	_word_jp1('プロローグ|序章', '序章'),

	_word_jp1('パーティ|隊伍', '隊伍'),

	_word_jp1('スキル|技能', '技能'),

	_word_jp1('ステータス|狀態', '狀態'),

	_word_jp1('ギルド', '公會'),

	_word_jp1('ゴブリン|哥布林', '哥布林'),

	_word_jp1('プレイヤー|玩家', '玩家'),
	_word_jp1('ゲーム|遊戲', '遊戲'),

	_word_jp1('レベル|等級', '等級'),
	_word_jp1('任務|クエスト', '任務'),

	_word_jp1('矮人|ドワーフ', '矮人'),

	_word_jp1('キャラクター', '角色'),

	_word_jp1('キャラ', '角色'),

	_word_jp1('ダンジョン', '迷宮'),

	_word_jp1('スライム', '史萊姆'),

	_word_jp1('ヤンデレ', '病嬌'),

	_word_jp1('アーティファクト', '神器'),

]);

lazymarks['class'] = _word_zh_all([

	['(錬|炼)金術', '錬金術'],
	['術(师|師)', '術師'],
	['賢者', '賢者'],
	['術士', '術士'],
	['剣聖', '剣聖'],
	['勇者', '勇者'],

	['魔導', '魔導'],

	['(?:闘技|斗技)大(会)', '闘技大$1'],

	['武(斗|闘|鬥)', '武闘'],
	['格(闘|斗|鬥)術', '格闘術'],
	['角(斗|闘|鬥)', '角闘'],

	['劍斗士', '劍闘士'],

	['魔法陣', '魔法陣'],
	['(魔|禁)術', '$1術'],

	['術式', '術式'],
	['結界', '結界'],

	['樞機卿|枢機卿', '樞機卿'],

]);

lazymarks['c000'] = _word_zh_all([

	[/\uFEFF/g, ''],

	[/[  \xA0]/g, ' '],
	//[/[　\u3000]/g, '　'],
	[/[·‧・···•˙●‧﹒]/g, '・'],
	[/[．]/g, '・'],
	['[∶:]', ':'],
	[/[：：︰﹕：]/ug, '：'],
	[/[〔［]/g, '［'],
	[/[〕］]/g, '］'],

	[/﹖/g, '？'],

	// 單一橫線
	[/[―—]/g, '—'],

	[
		/(?<=[\u4E00-\u9FFF])(ー+)/g, function (...m)
	{
		return '─'.repeat(m[1].length)
	},
	],

	[
		/(?<![ァ-ヴーｱ-ﾝﾞｰ])(ー+)(?=[\u4E00-\u9FFF])/g, function (...m)
	{
		return '─'.repeat(m[1].length)
	},
	],

	[/([^ぁ-んァ-ヴーｱ-ﾝﾞｰ])ー(?=[\u4E00-\u9FFF])/g, '$1─'],

	// 無視線之間的空白
	['— —', '——'],

	//['｜', '｜'],

]);

lazymarks['c050'] = _word_zh_all([

	[/[\.・。]{3}/g, '…'],
	[/(?<=…)[\.・。]{1,2}|[\.・]{1,2}(?=[…⋯])/g, '…'],
	[/[\.・。]{2}/g, '…'],

	['…', '⋯'],

	[
		/([…⋯─師賴法也額吗么近錢只是得嗎處備了題色組激生来本由謊幣币麼思伙人君呵恩呣中嗯樣噢喏个容子嘞跑聊咧話的蛤哦技哎掉喵狂熱要地系勒毒妹誒暑呀萬笑者雄办喔我營恋道心帥變會則女害做個族策車號吧桑後兒王啦拉蹈具哈对事破偶娘令嗯手鼻槍辦喲襲嘛欸著咦船家留貓到能呢來啊冊數阿用喬牲辈何誰國裡忙勢涉好場吶加裏吧了哟趣里做样前桶诶谁物量見醬在係～！？][\?!]+|[\?!]+[」…⋯）！])/ug,
		function (...m)
		{
			return StrUtil.toFullWidth(m[0], {
				skip: {
					space: true,
				},
			});
		},
	],

	[/(?<=[呢吧嗎吗了的握好有此你])\.(?=[ \u4E00-\u9FFF\u{20000}-\u{2FA1F}])/ug, '。'],

	[/(?<=[ \u4E00-\u9FFF\u{20000}-\u{2FA1F}])\.(?=[ ])/ug, '。'],

	[/(?<=[\u4E00-\u9FFF\u{20000}-\u{2FA1F}])([?+])(?=[\u4E00-\u9FFF\u{20000}-\u{2FA1F}])/ug, s => StrUtil.toFullWidth(s)],

	[/(?<=[\u4E00-\u9FFF\u{20000}-\u{2FA1F}])\.(?=[\u4E00-\u9FFF\u{20000}-\u{2FA1F}])/ug, '・'],

	[/[\.．・]([』」》）】])/g, '。$1'],
	[/([』」》）】])[\.．・](?![\.．・])/g, '$1。'],

	[/([^\n．・\.　])[．・]$/gm, '$1。'],

	[/　。$/gm, '。'],

	[/(?<=[\u4E00-\u9FFF])\?(?=\s|$)/g, '？'],

]);

lazymarks['c100'] = _word_zh_all([

	[
		/^[ ]*([─＝═=══－一\-─—\*＊＊◇◆☆◊▃\.…⋯\.─＾]+)(?:(?:原文自帶)?分(?:割|隔)線|這?是?作者的?分隔線|我?是?分(?:隔|割)线|以下正文|場景線|华丽+分割线|分割|華麗+分割線|作者自加的分割線|正文|作者的話)+([──＝═=══－一\-─—\*＊＊◇◆☆◊▃…⋯\.＾]+)[ ]*$/gm,
		'$1$2',
	],

	[
		/^([─＝═=══－\-─—\*＊＊◇◆☆◊▃…＾]+)分([─＝═=══－\-─—\*＊＊◇◆☆◊▃…⋯＾]*)割([─＝═=══－\-─—\*＊＊◇◆☆◊▃…⋯＾]*)线([─＝═=══－\-─—\*＊＊◇◆☆◊▃…⋯＾]*)$/gm,
		'$1$2$3$4',
	],

	// 無間斷的 -
	[
		/[－\-─—–]{2,}|[－\-─—–](?=[』」》）])/g, function (...m)
	{
		//return m[0].replace(/[－\-─—]/g, '─');
		return '─'.repeat(m[0].length);
	},
	],

	[
		/^([_]+)$/gm, function (...m)
	{
		//return m[0].replace(/[－\-─—]/g, '─');
		return '─'.repeat(m[0].length);
	},
	],

	[
		/([─＝=══－\-─—\*＊＊◇◆☆◊▃–＾_＾])\1{9,}/g, function (...m)
	{
		//return m[0].replace(/[－\-─—]/g, '─');
		return m[1].repeat(20 || 51);
	},
	],

	// 無間斷的等號
	[
		/([＝=══]){4,}/g, function (...m)
	{
		//return m[0].replace(/[－\-─—]/g, '─');
		return '═'.repeat(m[0].length);
	},
	],

	[
		/^(\/+)$/gm, function (...m)
	{
		//return m[0].replace(/[－\-─—]/g, '─');
		return '═'.repeat(m[0].length);
	},
	],

	[/([\u4E00-\u9FFF])[－–](?=[！。？\s』」》）】\u4E00-\u9FFF……－，])/g, '$1─'],
	[/([\u4E00-\u9FFF])[—–](?=[！。？』」》）】〉……⋯－，])/g, '$1─'],

	[/([\u4E00-\u9FFF])\-(?![\w\-+])/g, '$1─'],
	[/([ 　])\-([\u4E00-\u9FFF])/g, '$1─$2'],

	[/(?<=[\u4E00-\u9FFF])=(?=[\u4E00-\u9FFF])/g, '＝'],



	[/^\s*(?=[─－\-─—–]+)/, ''],

]);

lazymarks['unit'] = _word_zh_all([

	[
		/(?<!\w)[\d０-９]+(?:px|ｐｘ)(?!\w)/ig, function (...m)
	{
		let s = killBadPx(m[0]);

		return StrUtil.toFullWidth(s || m[0]);
	},
	],

]);

lazymarks['full_width_001'] = _word_zh_all([

	_word_en(/\d+(?:,\d+)*/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

]);

lazymarks['full_width_002'] = _word_zh_all([

	_word_en3(/[a-z]/ig, function (...m)
	{
		return StrUtil.toFullEnglish(m[1]);
	}),

	_word_en3(/(?:s|x){2,3}/ig, function (...m)
	{
		return StrUtil.toFullEnglish(m[1]);
	}),

]);

export function _word_en(search: string | RegExp,
	ret: string | IRegExpCallback = null,
	flag = 'ig',
): [RegExp, string | any]
{
	return [new RegExp(`(^|[^\\w'’])(${regex_str(search)})(?![\\w'’])`, flag), ((ret !== null) ? ret : '$1' + search)];
}

export function _word_en2(search: string | RegExp,
	ret: string | IRegExpCallback = null,
	flag = 'ig',
): [RegExp, string | any]
{
	return [
		new RegExp(`(^|[^\\w'’${EN_REGEXP}])(${regex_str(search)})(?![\\w'’${EN_REGEXP}])`, flag),
		((ret !== null) ? ret : '$1' + search),
	];
}

export function _word_en3(search: string | RegExp,
	ret: string | IRegExpCallback = null,
	flag = 'ig',
): [RegExp, string | any]
{
	return [new RegExp(`(?<![\\w'’${EN_REGEXP}])(${regex_str2(search)})(?![\\w'’${EN_REGEXP}])`, flag), ((ret !== null) ? ret : search)];
}

export function _word_jp1(search: string | RegExp,
	ret: string | IRegExpCallback = null,
	flag = 'ig',
): [RegExp, string | any]
{
	return [new RegExp(`(?<![ァ-ヴーｱ-ﾝﾞｰ])(${regex_str2(search)})(?![ァ-ヴーｱ-ﾝﾞｰ])`, flag), ((ret !== null) ? ret : search)];
}

/**
 * 最好只用在全新腳本內
 *
 */
export function _word_zh_all(arr: IWords[]): IWords[]
{
	return arr.slice().map(function (value, index, array)
	{
		if (Array.isArray(value) && ((typeof value[0] == 'string') || isRegExp(value[0])))
		{
			let [s, ...a] = value.slice();

			if (a.length > 2)
			{
				if (a[2].useNativeRegExp)
				{
					return [s, ...a];
				}
			}

			s = regexpCjkLib._word_zh(s, null)[0];

			return [s, ...a];
		}

		return value;
	}) as IWords[];
}

export let _zh_num = '一二三四五六七八九十';
export let _zh_num2 = '百十';
export let _full_num = '０１２３４５６７８９';

export default exports as typeof import('./index');
