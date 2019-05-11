/**
 * Created by user on 2018/9/5/005.
 */

import { crlf } from 'crlf-normalize';
import { IGetNovelCallbackData } from '../bin/lib/util';

export function freeGC()
{
	if (isGCMode())
	{
		try
		{
			global.gc();
		}
		catch (e)
		{
			console.error(e);
		}
	}
}

export function isGCMode()
{
	return (global && typeof global.gc === 'function')
}

export function trimTxtLine<T = unknown>(txt: string, rowData?: Partial<IGetNovelCallbackData<T>>)
{
	// @ts-ignore
	rowData = rowData || {};

	let { ext } = rowData;

	txt = crlf(txt)
		.replace(/\uFEFF/g, '')
	;

	if (ext != '.md')
	{
		txt = txt
			.replace(/(?<=^\s*)[\-= \xa0＝－\*　—+]+(?=\n)/g, '')
			.replace(/(?<=\n)[\-= \xa0＝－\*　—+]+(?=\s*$)/g, '')
		;
	}

	txt = txt
		.replace(/^\n+/g, '')
		.replace(/^ (?!\s)/g, '')
		.replace(/\n{2,}$/g, '\n')
		.replace(/^ (?=\S|\n|\s{2,})/, '')
		;

	if (ext == '.md')
	{
		txt = txt
			.replace(/\n+$/g, '\n\n')
		;
	}

	return txt;
}
