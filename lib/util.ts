/**
 * Created by user on 2018/9/5/005.
 */

export function freeGC()
{
	if (global && typeof global.gc === 'function')
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
