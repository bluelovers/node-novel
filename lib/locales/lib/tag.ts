/**
 * Created by user on 2018/2/15/015.
 */

export function tagTemplate(strings, ...keys)
{
	return (function (...values)
	{
		let dict = values[values.length - 1] || {};
		let result = [strings[0]];
		keys.forEach(function (key, i)
		{
			let value = Number.isInteger(key) ? values[key] : dict[key];
			result.push(value, strings[i + 1]);
		});
		return result.join('');
	});
}

export default exports as typeof import('./tag');
