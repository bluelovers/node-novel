/**
 * Created by user on 2017/12/7/007.
 */

export function trimFilename(name)
{
	return name.toString()
		.replace(/[\?\'\"\|\*\:\<\>\/\\]+|^\.+/ig, '')
		;
}

export default exports;
