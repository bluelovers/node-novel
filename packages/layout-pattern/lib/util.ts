
import { isRegExp, zhRegExp } from 'regexp-cjk';

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

export function regex_str2(str: RegExp): string
export function regex_str2(str: string): string
export function regex_str2(str: string | RegExp): string
export function regex_str2(str): string
{
	if (isRegExp(str))
	{
		return str.source;
	}

	return str;
}
