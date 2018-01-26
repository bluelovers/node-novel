/**
 * Created by user on 2018/1/27/027.
 */

import * as novelGlobby from 'node-novel-globby';
import * as globby from 'globby';
import * as fs from 'fs-extra';
import * as Promise from 'bluebird';
import { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import { crlf, CRLF } from 'crlf-normalize';

let TXT_PATH: string;

TXT_PATH = 'D:\\Users\\Documents\\The Project\\nodejs-test\\node-novel2\\dist_novel\\user_out\\病娇女神の箱庭';

let globby_patterns: string[];
let globby_options: novelGlobby.IOptions = {
	cwd: TXT_PATH,
	useDefaultPatternsExclude: true,
};

{
	let ret = novelGlobby.getOptions(globby_options);
	[globby_patterns, globby_options] = [ret.patterns, ret.options];
}

(async () =>
{

	let meta: IMdconfMeta;

	meta = await novelGlobby.globbyASync([
		'README.md',
	], globby_options)
		.then(novelGlobby.returnGlobList)
		.tap(function (ls)
		{
			console.log(ls);
		})
		.then(async function (ls)
		{
			let data = await fs.readFile(ls[0]);

			return mdconf_parse(data, {
				throw: false,
			});
		})
		.tap(function (ls)
		{
			console.log(ls);
		})
	;

	let hr_len = 15;

	let hr1 = '＝'.repeat(hr_len);
	let hr2 = '－'.repeat(hr_len);

	await novelGlobby.globbyASync(globby_options)
		.tap(function (ls)
		{
			//console.log(ls);
		})
		.then(function (_ls)
		{
			const eol = '\n';

			return Promise
				.mapSeries(Object.keys(_ls), async function (val_dir, index, len)
				{
					let ls: novelGlobby.IReturnRow[] = _ls[val_dir];

					let volume_title = ls[0].volume_title;

					let txt = `${hr1}CHECK\n${volume_title}\n${hr1}\n`;

					let a = await Promise.mapSeries(ls, async function (row: novelGlobby.IReturnRow)
					{
						let data = await fs.readFile(row.path);

						let txt = `${hr2}BEGIN\n${row.chapter_title}\n${hr2}BODY\n\n${data}\n\n${hr2}END\n\n`;

						return txt;
					});

					a.unshift(txt);

					return a.join(eol);
				})
				.then(function (a)
				{
					if (meta && meta.novel)
					{
						let txt = `${meta.novel.title}\n${meta.novel.author}\n${meta.novel.source || ''}\n\n${meta.novel.preface}\n\n`;

						let a2 = [];

						if (Array.isArray(meta.contribute) && meta.contribute.length)
						{
							a2.push(meta.contribute.join('、') + "\n\n");
						}

						if (a2.length)
						{
							a2.unshift(hr2);

							txt += a2.join(CRLF);
						}

						a.unshift(txt);
					}

					let txt = a.join(eol);

					txt = crlf(txt, CRLF);

					return fs.outputFile(`temp/${meta.novel.title || 'temp'}.txt`, txt);;
				})
				.tap(function ()
				{
					console.log('done');
				})
				;
		})
	;

})();
