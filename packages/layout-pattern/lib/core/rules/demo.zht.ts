/**
 * Created by user on 2019/7/13.
 */

import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
export * from './demo'

import demoRule, { lang, words_callback, words_maybe, words_source } from './demo';
import { _word_zh_all } from '../word';

export const words: IPatternRule["words"] = [

	...demoRule.words,

	..._word_zh_all([

		...lazymarks['zh_cht'],

	])

];

export default <IPatternRule>{
	lang,
	words_source,
	words,
	words_maybe,
	words_callback,
}
