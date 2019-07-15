/**
 * Created by user on 2019/7/13.
 */

import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';

export * from './demo'

import * as demoRule from '@node-novel/layout-pattern/lib/rules/demo';
import { lang, words_callback, words_maybe, words_source } from '@node-novel/layout-pattern/lib/rules/demo';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { EnumLazyMarkKeys } from '@node-novel/layout-pattern/lib/core/pattern-keys';

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	...demoRule.words_layout,

	...lazymarks[EnumLazyMarkKeys.ZH_CHT],

];

export const words: IPatternRule["words"] = _word_zh_all([

	...words_source,

	...words_layout,

] as IWords[]);

export default <IPatternRule>{
	lang,
	words_source,
	words_layout,
	words,
	words_maybe,
	words_callback,
}
