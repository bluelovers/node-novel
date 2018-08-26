
import * as path from 'path';
import { zhRegExp } from 'regexp-cjk';
import { parseRegExp } from 'regexp-parser-literal';
import { Disjunction } from 'regexpp2/src/ast';
import * as IDemo from '../lib/locales/demo';
import { project_root } from '../project.config';
import * as mdconf from 'mdconf2';
import { makeCodeBlock } from 'mdconf2/core';

const BASEPATH = path.join(project_root, 'lib/locales');

//let t = make_pattern_md('四度目は嫌な死属性魔術師');
//
//console.log(t.md);

export type IDataRaw = {
	group?: number,

	index: number,

	target: string,
	patterns: string[],
};

export function parse_data(novelID: string, basePath: string = BASEPATH)
{
	let data = load_pattern(novelID, basePath);

	if (data)
	{
		let ret: IDataRaw[] = [];

		data.words_source
			.forEach(function (value, index)
			{
				let label: string;
				let row: IDataRaw;

				if (value && typeof value[1] == 'string')
				{
					let raw = getRawString(value[0]);

					let row = {
						index,
						target: value[1],
						patterns: [],
					} as IDataRaw;

					let r = new zhRegExp(value[0], value[2], {
						allowLocalRangeAutoZh: false,
						disableZh: true,
						on: {

						},
					});

					let p = parseRegExp(r.toString());

					if (
						p.pattern.elements.length == 1
						&& p.pattern.elements[0].type === 'Disjunction'
					)
					{
						let d = p.pattern.elements[0] as Disjunction;

						if (d.alternatives)
						{
							let c = d.alternatives.reduce(function (a, b)
							{
								let c = b.reduce(function (a, b)
								{
									a.push(b.raw);
									return a;
								}, []);

								a.push(c.join(''));

								return a;
							}, [] as string[]);

							if (c.length)
							{
								row.patterns = c;
							}
						}
					}

					if (!row.patterns.length)
					{
						row.patterns.push(typeof raw !== 'undefined' ? raw : r.source);

						//console.log(row);
					}

					ret.push(row);
				}
			})
		;

		return ret;
	}

	return null;
}

export function load_pattern(novelID: string, basePath: string = BASEPATH)
{
	let file = get_path(novelID, basePath);

	if (file)
	{
		try
		{
			let data: typeof IDemo = require(file);

			if (data && data.words_source && data.words_source.length)
			{
				return data;
			}
		}
		catch (e)
		{

		}
	}

	return null;
}

export function get_path(novelID: string, basePath: string = BASEPATH)
{
	let ret: string;

	try
	{
		if (/[\/\\]/.test(novelID))
		{
			ret = require.resolve(novelID);
		}
	}
	catch (e)
	{

	}

	if (typeof ret === 'undefined')
	{
		try
		{
			ret = require.resolve(path.join(basePath, novelID));
		}
		catch (e)
		{

		}
	}

	return ret;
}

export function make_pattern_md(novelID: string, basePath: string = BASEPATH)
{
	let data = parse_data(novelID, basePath);

	if (data && data.length)
	{
		let body = data.reduce(function (a, b)
		{

			let label = stringify(b.target);

			delete b.target;

			b.patterns = b.patterns.map(function (v)
			{
				return '`' +
					stringify(v)
						.replace(/[\[\]`]/g, '\\$&')
					+ '`'
					;
			});

			a[label] = b;

			return a;
		}, {});

		let ret = {
			'Pattern': body,
		};

		let md = mdconf.stringify(ret);

		//console.log(md);
		//process.exit();

		return {
			md,
			ret,
		}
	}

	return null;
}

export function getRawString(raw: string | TemplateStringsArray | any)
{
	try
	{
		return String.raw(raw as any as TemplateStringsArray);
	}
	catch (e)
	{

	}
}

export function stringify(v)
{
	return JSON.stringify(v).replace(/^"|"$/g, '');
}

export function md_string_escape(text: string)
{
	return text.replace(/[\[\]]/g, function (s)
	{
		return '\\' + s;
	})
}
