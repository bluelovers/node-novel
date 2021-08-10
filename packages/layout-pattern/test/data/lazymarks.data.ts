import lazymarks from '../../lib/core/pattern/index';
import { ITSValueOrArray, ITSRequireAtLeastOne } from 'ts-type';
import { IWordsAll } from '@node-novel/layout';

export const testLazymarks: ({
	title?: string,
	words: IWordsAll[];
	txt: string;

	skipCheckDeepEqual?: boolean,
} & ITSRequireAtLeastOne<{
	match: ITSValueOrArray<RegExp>;
	match_not: ITSValueOrArray<RegExp>;
}>)[] = [

	{
		words: lazymarks.ln_talk,
		txt: `「呀啊，居然能見到比自己還年輕的母親，時空穿梭真是恐怖呀」

「哈，哈……」`,
		match: /[』」]\n[「『]/,
	},

	{
		words: lazymarks.replace_001,
		txt: `「【PARALYZE】！【PARALYZE】！」`,
		match: /「【PARALYZE】！【PARALYZE】！」/,
		skipCheckDeepEqual: true,
	},

	{
		words: lazymarks.ln,
		txt: `尽管没有说话，但公主的眼神中除了冷冽的威严，还掺杂了几分看不出是怜悯还是哀伤的情绪。

†††

「求你住手啊！！」`,
		match: /\n\n\n†/,
	},

	{
		words: lazymarks['c100'],
		txt: `我试着将《贫穷者之刃破破》朝向前头那一侧，用魔法确认这个情报。

‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐

种族：《迪因・迪兹玛》

状態：《正常》

Lv：23

VIT（耐力）：75

ATK（攻击）：47

MAG（魔力）：32

AGI（敏捷）:66



称号：

《低级魔兽[D]》《土之素质[F]》



特性：

《高速治愈[E]》《夜视[E]》

《听觉强化・弱[E]》



斗术：

《裂爪[D]》

‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐‐

果然还是不行，不可能敌得过的。`,
		match_not: /‐/,
	},

];
