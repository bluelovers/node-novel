/**
 * Created by user on 2018/9/5/005.
 */

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

export function trimTxtLine(txt: string)
{
	return txt
		.replace(/(?<=^\s*)[\-= \xa0＝－\*　—+]+(?=\n)/g, '')
		.replace(/(?<=\n)[\-= \xa0＝－\*　—+]+(?=\s*$)/g, '')
		.replace(/^\n+/g, '')
		.replace(/^ (?!\s)/g, '')
		.replace(/\n{2,}$/g, '\n')
		.replace(/^ (?=\S|\n|\s{2,})/, '')
		;
}
