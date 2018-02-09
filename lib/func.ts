/**
 * Created by user on 2017/12/7/007.
 */

import { trimFilename } from 'fs-iconv';
import { isRegExp } from 'regexp-cjk';

export { trimFilename }

export function array_unique(array: any[])
{
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}

export const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

//export function regex_excape(str: string)
export function regex_str(str: RegExp): string
export function regex_str(str: string): string
export function regex_str(str: string | RegExp): string
export function regex_str(str): string
{
	if (isRegExp(str))
	{
		return str.source;
	}

	return str
		.replace(/(\W)/g, '\\$1')
		;
}

export default trimFilename;
