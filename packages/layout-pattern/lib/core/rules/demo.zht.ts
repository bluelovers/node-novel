/**
 * Created by user on 2019/7/13.
 */

import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';

export * from './demo'

import * as demoRule from './demo';
import { lang, words_callback, words_maybe, words_source } from './demo';
import { _word_zh_all, IWords } from '../word';

/**
 * @private
 */
export const _words_core: IPatternRule["words"] = [

	...demoRule._words_core,

	...lazymarks['zh_cht'],

];

export const words: IPatternRule["words"] = _word_zh_all([

	...words_source,

	..._words_core,

] as IWords[]);

export default <IPatternRule>{
	lang,
	words_source,
	words,
	words_maybe,
	words_callback,
}
