/**
 * Created by user on 2019/7/13.
 */

import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import { lazymarks } from '@node-novel/layout-pattern/lib/core/pattern/index';

export * from '@node-novel/layout-pattern/lib/rules/demo'

import * as demoRule from '@node-novel/layout-pattern/lib/rules/demo';
import { lang, words_callback, words_maybe } from '@node-novel/layout-pattern/lib/rules/demo';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { EnumLazyMarkKeys } from '@node-novel/layout-pattern/lib/core/pattern-keys';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IPatternRule["words_source"] = [

	//['要取代的字', '取代後的字'],
	//_word_jp1('日文原名專用', '日文原名專用'),
	//_word_en3('英文專用', '英文專用'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	...demoRule.words_layout,

	...lazymarks['zh_cht'],

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
