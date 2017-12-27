/**
 * Created by user on 2017/12/9/009.
 */

import { sp } from '.';
import * as StrUtil from 'str-util';

export const lang = '黑之魔王';

//export const ns = '黑之魔王';

export const value = {
	chapter_id: '第{{0, toFullNumber}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,

	// 實驗性概念自動取代為已有的翻譯
	chapter_title_i18n: `$t({{$t(chapter_id, [{{0}}])　title}})`,

	volume_id: '第{{0, toFullNumber}}章',
};

export const resource = {

	i18n: {
		'リリィ': '莉莉',

		'ディアボロス・エンブレス': '恶魔的拥抱',

		'グリードゴア': '贪婪戈尔',

		'クロノＶＳグリードゴア（２）': '黑乃 VS 贪婪戈尔 （２）',

		'第３５２話　パーティー': '第３５２話　Party（队伍/宴会）',

	},

};

export const words = [

	[
		/猫の\*尾亭|猫尾亭/g,
		'猫の尻尾亭',
	],

	['内尔好象', '妮露好象'],

	['克洛诺', '黑乃'],
	['威尔纳德', '威尔哈鲁特'],

	[/萘尔|妮露/g, '妮露'],
	['夏[露洛]特?', '夏洛特'],
	['西满', '西蒙'],
	['真乃真央', '黑乃真央'],
	['贪婪格尔', '贪婪戈尔'],
	[/元素大师|元素掌控者|元素之主|元素支配者|元素大師/g, '元素支配者'],
	['龙杀手', '屠龍者'],
	['DragonKiller', 'Dragon Killer'],
	[/(?:漆黑|黑色)(?:夢魘|噩梦|惡梦)的狂戰士/g, '漆黑夢魘的狂战士'],

	[/Element\s*master|Elemental\s*Master/ig, 'Elemental Master'],
	[/Haunted\s*grave/ig, 'Haunted Grave'],
	[/翼之君主/g, '君主之翼'],
	[/酋达斯|犹达斯|猶達斯/g, '猶達斯'],
	[/沙利叶|沙利葉/g, '沙利葉'],

	[`米娅${sp}艾璐罗德`, '$1・$2'],

	[`米娅${sp}艾璐罗德`, '$1・$2'],
	[`菲奥娜${sp}索蕾优`, '$1・$2'],
	[`米娅${sp}艾璐罗德`, '$1・$2'],

	[`${sp}托利斯坦${sp}斯巴达`, '$1・$2・$3'],
	[`${sp}弗里德里希${sp}巴尔缇艾尔`, '$1・$2・$3'],
	[`${sp}尤里乌斯${sp}艾璐罗德`, '$1・$2・$3'],
	[`${sp}艾斯特${sp}加尔布雷斯`, '$1・$2・$3'],
	[`${sp}玛雅${sp}海德拉`, '$1・$2・$3'],
	[`瑟莉雅${sp}蘭布爾`, '$1・$2'],
	[`${sp}西利烏斯${sp}巴西費魯`, '$1・$2・$3'],

	['利金|雷金', '雷金'],

	[`アインズ${sp}ブルーム`, 'アインズ・ブルーム'],

	[/(白金|苍月)(?:之)?(月)/g, '$1の$2'],

	['惡梦', '噩梦'],

	['伊斯基斯|伊斯基亚|依斯基斯', '伊斯基亚'],
	['来福枪|来复枪', '来福枪'],
	['嫉妒吉尔|懒惰吉尔|怠惰吉尔', '懒惰吉尔'],
	['懒惰|怠惰', '怠惰'],

	['问[道到]', '问到'],
	['[诅詛]?咒物品?[剑角角][斗鬥]大[会會]', '詛咒物品角鬥大會'],

	[/^(「?[^“”\n]+)([“”])([^“”\n]+)\2/mg, '$1“$3”'],

	[/^”/mg, '“'],
	[/“$/mg, '”'],

	// 阿拉伯字元
	[/^(.+[\u0600-\u06FF\u0750-\u077F].+)$/gm, '\n$1\n'],
	[/\n+(.+[\u0600-\u06FF\u0750-\u077F])/g, '\n\n$1'],
	[/([\u0600-\u06FF\u0750-\u077F])\n+/g, '$1\n\n'],

	[
		/(月的?)(\s*[\d][\d\s]+)([日日])/g, function (...m)
	{
		m[2] = StrUtil.toFullNumber(m[2].replace(/\s/g, '')).trim();

		return m[1] + m[2] + m[3];
	}
	],
	[
		/(第)(\s*[\d][\d\s]+)([话話])/g, function (...m)
	{
		m[2] = StrUtil.toFullNumber(m[2]).trim();

		return m[1] + m[2] + m[3];
	}
	],

	[
		/(等级|等級)([一二三四五])/g, function (...m)
	{
		return m[1] + StrUtil.zh2num(m[2]);
	}
	],

	[
		/([一二三四五])(级|級)/g, function (...m)
	{
		return StrUtil.zh2num(m[1]) + m[2];
	}
	],

	[
		/(等级|等級)(\s*[\d][ ]*)/g, function (...m)
	{
		m[2] = StrUtil.toFullNumber(m[2]).trim();

		return m[1] + m[2];
	}
	],

	[
		/([ ]*[\d][ ]*)(级|級)/g, function (...m)
	{
		m[1] = StrUtil.toFullNumber(m[1]).trim();

		return m[1] + m[2];
	}
	],

	[/[·\?]([一二三四五六七八九十][式年型])/ig, '・$1'],

	[/(第)([\_\t\uFEFF\xA0　 \d０１２３４５６７８９]+)(话|頁|夜|章|集)/g, function ($0, $1, $2, $3)
	{
		$2 = StrUtil.toFullNumber($2, {
			only: {
				number: true,
				space: true,
			},
		});

		let m;
		if (m = $2.match(/^(\D+)?(.+)(\D+)?$/))
		{
			let s = ((m[1] || m[3]) ? ' ' : '');
			let $2 = m[2].replace(/[^\d]+/ig, '');

			if ($2)
			{
				$2 = s + $2 + s;
				return $1 + $2 + $3;
			}
		}

		return $0;
	}],

];

// 需要人工確認的屏蔽字或錯字用語等等
export const words_maybe = [

	// 沒有成功貼上的咒文
	/([^\?]{1,2})?([\? ]+)([^\?]{1,2})?/mg,

	'咒物',

];

import * as self from './黑之魔王';

export default self;
