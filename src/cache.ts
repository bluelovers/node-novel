/**
 * Created by user on 2019/5/31.
 */

import { IMyLocales, stringify } from './core';
import * as novelGlobby from 'node-novel-globby';
import * as Bluebird from 'bluebird';
import path from 'upath2';
import * as fs from 'fs-extra';
import novelInfo, { array_unique } from 'node-novel-info';
import { load_pattern, make_pattern_md } from './pattern_output';

export interface ICache
{
	rename: {},
	block: {},
	block2: {},
	eng: {},
	ja: {},
	ja2: {
		[key: string]: string[],
	},
}

export function make_meta_md(cwd: string, cwd_out: string)
{

	let globby_patterns: string[];
	let globby_options: novelGlobby.IOptions = {
		cwd: cwd,
		useDefaultPatternsExclude: true,
		absolute: true,
	};

	globby_patterns = [
		'**/meta.md',
		'**/README.md',
	];

	{
		[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
	}

	return Bluebird
		.mapSeries(novelGlobby.globby(globby_patterns, globby_options), async function (file: string, index, len)
		{
			let ext = path.extname(file);

			let name = path.basename(file);
			let file_dir = path.relative(cwd, path.dirname(file));

			await fs.copy(file, path.join(cwd_out, file_dir, name));

			return path.join(file_dir, name);
		})
		.then(async function (ls)
		{
			if (!ls.length
				&& !fs.existsSync(path.join(cwd_out, 'meta.md'))
				&& !fs.existsSync(path.join(cwd_out, 'README.md'))
			)
			{

				let globby_patterns: string[];
				let globby_options: novelGlobby.IOptions = {
					cwd: cwd,
					useDefaultPatternsExclude: true,
					absolute: true,
				};

				globby_patterns = [
					'*.json',
				];

				{
					[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
				}

				let ls = await novelGlobby.globby(globby_patterns, globby_options);

				if (!ls.length)
				{
					return;
				}

				//console.log(ls[0], cwd);

				let data = await fs.readJSON(ls[0]);
				data.data = data.data || {};

				//console.log(data);

				let tags = [
					'node-novel',
				];

				if (ls[0].match(/dmzj/))
				{
					tags.push('dmzj');
				}
				if (ls[0].match(/wenku8/))
				{
					tags.push('wenku8');
				}

				if (ls[0].match(/dist_novel\/([^\/]+)(?:_out)?/))
				{
					tags.push(RegExp.$1);
				}

//			let md = await json2md(data, {
//				tags: tags,
//			});

				let md = novelInfo.stringify({}, data, {
					tags: tags,
				});

				await fs.outputFile(path.join(cwd_out, 'README.md'), md);
			}
		})
		;
}

export function cache_output4(_block: ICache["ja2"], title): string
{
	let out = Object.entries(_block)
		.sort(function (a, b)
		{
			// @ts-ignore
			return a[0] - b[0]
		})
		.reduce(function (a, b)
		{
			a.push(`\n## ${b[0]}`);

			a.push('');

			array_unique(b[1])
				.slice(0, 4)
				.forEach(function (s)
				{
					a.push(`- ${stringify(s)}`);
				})
			;

			a.push('');

			return a;
		}, [
			`# ${title}`,
			'',
			'[TOC]',
		])
		.join("\n")
	;

	return out;
}

function cache_output5(_block, title): string
{
	let out = Object.entries(_block)
		.sort(function (a, b)
		{
			// @ts-ignore
			return a[0] - b[0]
		})
		.reduce(function (a, b)
		{
			a.push(`- ${stringify(b[0])}`);

			//a.push('');

			return a;
		}, [
			`# ${title}`,
			'',
			'[TOC]',
		])
		.join("\n")
	;

	return out;
}

export async function create_pattern_md(myLocales: IMyLocales, cwd_out: string)
{
	let id = myLocales.__file;

	let data = await make_pattern_md(id);

	if (data && data.md)
	{
		let data_source = load_pattern(id).words_source;

		let url = `https://github.com/bluelovers/node-novel/blob/master/lib/locales/${encodeURIComponent(data.novelID)}.ts`;

		let md = `---
LocalesID: ${data.novelID}
LocalesURL: ${url}
---
__TOC__\n
[${data.novelID.replace(/[\[\]~\`]/g, '\\$&')}](${url})  
總數：${data.data.length}／${data_source.length}
\n${data.md}\n\n`;

		await fs.outputFile(path.join(cwd_out, '整合樣式.md'), md);
	}
}
