/**
 * Created by user on 2017/12/7/007.
 */

import * as sanitize from 'sanitize-filename';

export function trimFilename(name)
{
	let ret = name.toString()
		.replace(/\r\n|\r|\n|　/g, ' ')
		.replace(/[\s\r\n\t  \xA0　]+/g, ' ')
	;

	return sanitize(ret, ' ')
		.trim()
		.replace(/^[　\s]+/g, '')
		.replace(/[　\s]+$/g, '')
		;
}

export function array_unique(array: any[])
{
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}

export const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

//export function regex_excape(str: string)
export function regex_str(str: string)
{
	return str
		.replace(/(\W)/g, '\\$1')
		;
}

export default trimFilename;
