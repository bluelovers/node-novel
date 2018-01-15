/**
 * Created by user on 2018/1/13/013.
 */

import * as execall from 'execall';
import { novelText } from './text';

export function getBlankLine(txt, filter?: boolean, sort?: boolean): number[]
{
	txt = novelText.trim(txt);

	let _ms = execall(/\n+/g, txt);

	if (_ms.length)
	{
		_ms = (_ms as { match: string }[])
			.reduce(function (a, b)
			{
				a.push(b.match.length);

				return a;
			}, [])
		;

		if (filter)
		{
			_ms = _ms.filter(function (v, i, a)
			{
				return a.indexOf(v) == i;
			});
		}

		if (sort)
		{
			_ms.sort();
		}

		return _ms;
	}

	return null;
}

export function chkBlankLine(txt): [number, number, number]
{
	let _ms = getBlankLine(txt, true, true);

	if (!_ms || !_ms.length)
	{
		return [null, null, null];
	}

	let min = _ms[0] || null;
	let max = _ms[_ms.length - 1] || min;

	let mid = _ms[1] || min;

	return [min, mid, max];
}

export default chkBlankLine;
//export default exports;
