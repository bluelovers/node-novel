import lazymarks from '../../lib/core/pattern/index';
import { ITSValueOrArray } from 'ts-type';
import { IWordsAll } from '@node-novel/layout';

export const testLazymarks: {
	title?: string,
	words: IWordsAll[];
	txt: string;
	match: ITSValueOrArray<RegExp>;
}[] = [

	{
		words: lazymarks.ln_talk,
		txt: `「呀啊，居然能見到比自己還年輕的母親，時空穿梭真是恐怖呀」

「哈，哈……」`,
		match: /[』」]\n[「『]/,
	},

];
