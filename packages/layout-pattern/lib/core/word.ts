/**
 * Created by user on 2019/7/13.
 */

import { IWordsAll, IWordsArray2, IWordsArray, IWordsUser, IWordsFunction, IWordsRuntime } from '@node-novel/layout';
import { regex_str, regex_str2 } from '../util';
import { EN_REGEXP } from './const';
import { IRegExpCallback } from '@node-novel/layout/lib/types';
import { _word_zh } from 'regexp-cjk/lib';
import { isRegExp, zhRegExp } from 'regexp-cjk';

export type IWords = IWordsAll;

export { IWordsAll, IWordsArray2, IWordsArray, IWordsUser, IWordsFunction, IWordsRuntime }

export type vMaybe = Array<string | RegExp | Function | Array<string | RegExp>>;

/**
 * @deprecated
 */
export function _word_en(search: string | RegExp,
	ret: string | IRegExpCallback = null,
	flag = 'ig',
): [RegExp, string | any]
{
	return [new RegExp(`(^|[^\\w'’])(${regex_str(search)})(?![\\w'’])`, flag), ((ret !== null) ? ret : '$1' + search)];
}

/**
 * @deprecated
 */
export function _word_en2(search: string | RegExp,
	ret: string | IRegExpCallback = null,
	flag = 'ig',
): [RegExp, string | any]
{
	return [
		new RegExp(`(^|[^\\w'’${EN_REGEXP}])(${regex_str(search)})(?![\\w'’${EN_REGEXP}])`, flag),
		((ret !== null) ? ret : '$1' + search),
	];
}

export function _word_en3(search: string | RegExp,
	ret: string | IRegExpCallback = null,
	flag = 'ig',
): [RegExp, string | any]
{
	return [
		new RegExp(`(?<![\\w'’${EN_REGEXP}])(${regex_str2(search)})(?![\\w'’${EN_REGEXP}])`, flag),
		((ret !== null) ? ret : search),
	];
}

export function _word_jp1(search: string | RegExp,
	ret: string | IRegExpCallback = null,
	flag = 'ig',
): [RegExp, string | any]
{
	return [new RegExp(`(?<![ァ-ヴーｱ-ﾝﾞｰ])(${regex_str2(search)})(?![ァ-ヴーｱ-ﾝﾞｰ])`, flag), ((ret !== null) ? ret : search)];
}

/**
 * 最好只用在全新腳本內
 *
 */
export function _word_zh_all(arr: IWords[]): IWords[]
{
	return arr.slice().map(function (value, index, array)
	{
		if (Array.isArray(value) && ((typeof value[0] == 'string') || isRegExp(value[0])))
		{
			let [s, ...a] = value.slice();

			if (0 && a.length > 2)
			{
				// @ts-ignore
				if (a[2].useNativeRegExp)
				{
					return [s, ...a];
				}
			}

			s = _word_zh(s as RegExp, null)[0];

			return [s, ...a];
		}

		return value;
	}) as IWords[];
}

export default _word_zh_all