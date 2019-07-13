
import { toHalfWidth } from 'str-util';

export function killBadPx(str: string): string
{
	let m = toHalfWidth(str).match(/^(\d+)(px)$/i);

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
