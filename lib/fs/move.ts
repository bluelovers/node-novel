
import * as fs from 'fs-extra';

export function win32_move(src: string, dest: string, options?: fs.MoveOptions)
{
	return fs.move(src, dest, options)
		.catch(function (e)
		{
			if (process.platform ==='win32')
			{
				if (/dest already exists|Source and destination must not be the same/i.test(e.message))
				{
					if (src.toLowerCase() === dest.toLowerCase())
					{
						return;
					}
				}
			}

			return Promise.reject(e)
		})
	;
}
