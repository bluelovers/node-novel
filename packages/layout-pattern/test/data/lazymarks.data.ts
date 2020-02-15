import lazymarks from '../../lib/core/pattern/index';
import { ITSValueOrArray } from 'ts-type';
import { IWordsAll } from '@node-novel/layout';

export const testLazymarks: {
	title?: string,
	words: IWordsAll[];
	txt: string;
	match: ITSValueOrArray<RegExp>;

	skipCheckDeepEqual?: boolean,
}[] = [

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

];
