/**
 * Created by user on 2017/12/7/007.
 */

import * as StrUtil from 'str-util';
import { trimFilename } from 'fs-iconv';
import { isRegExp } from 'regexp-cjk';
export { array_unique, lazy_unique } from 'array-hyper-unique';

export { trimFilename }

/*
export function array_unique<T>(array: T[]): T[]
{
	return arrUniq(array);

	// @ts-ignore
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}
*/

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

export function killBadPx(str: string): string
{
	str = StrUtil.toHalfWidth(str);

	let m = str.match(/^(\d+)(px)$/i);

	if (m)
	{
		let i = (parseInt(m[1]) / 25);

		if (i > 0)
		{
			return i + 'cm';
		}
	}

	return null;
}
