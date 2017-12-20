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
	[/元素大师|元素掌控者|元素之主|元素支配者/g, '元素掌控者'],
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

	[`アインズ${sp}ブルーム`, 'アインズ・ブルーム'],

	[/(白金|苍月)(?:之)?(月)/g, '$1の$2'],

	['惡梦', '噩梦'],

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
		/(等级)(\s*[\d][ ]*)/g, function (...m)
	{
		m[2] = StrUtil.toFullNumber(m[2]).trim();

		return m[1] + m[2];
	}
	],

	[
		/(等级)([一二三四五])/g, function (...m)
	{
		return m[1] + StrUtil.zh2num(m[2]);
	}
	],

];

// 需要人工確認的屏蔽字或錯字用語等等
export const words_maybe = [];

import * as self from './黑之魔王';

export default self;
