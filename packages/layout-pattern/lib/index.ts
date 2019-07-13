/**
 * Created by user on 2019/7/13.
 */

import { lazymarks } from './core/pattern';
import { killBadPx } from './core/helper';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from './core/word';
import { EN_REGEXP, _full_num, _zh_num, _zh_num2, sp, sp2 } from './core/const';
import { regex_str, regex_str2 } from './util';

import { IWords, vMaybe } from './core/word';

export { IWords, vMaybe }

export {
	EN_REGEXP, _full_num, _zh_num, _zh_num2, sp, sp2,
	lazymarks,
	killBadPx,
	_word_en, _word_en3, _word_jp1, _word_zh_all,
	regex_str, regex_str2,
}
