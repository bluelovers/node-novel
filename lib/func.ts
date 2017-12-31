/**
 * Created by user on 2017/12/7/007.
 */

export function trimFilename(name)
{
	return name.toString()
		.replace(/[\r\n\t  \xA0]+/g, ' ')
		.replace(/[\?\'\"\|\*\:\<\>\/\\]+|^\.+/ig, '')
		.trim()
		.replace(/^[　\s]+/g, '')
		.replace(/[　\s]+$/g, '')
		;
}

export default trimFilename;
