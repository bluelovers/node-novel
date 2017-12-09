/**
 * Created by user on 2017/12/8/008.
 */

export const chineseNumber1 = '零壹貳參肆伍陸柒捌玖拾'.split('');
export const chineseNumber2 = '零一二三四五六七八九十'.split('');

export function zh2num(str: string)
{
	let r = new RegExp(`([${chineseNumber2.slice(0, 9).join('')}]+)`, 'gm');
	let m;

	str = str.toString() as string;

	if (m = r.exec(str))
	{
		return (m[1] as string)
			.split('')
			.map(function (value)
		{
			return chineseNumber2.indexOf(value);
		})
			.join('')
		;
	}
}

export default exports;
