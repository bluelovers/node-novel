/**
 * Created by user on 2018/5/21/021.
 */

import * as crossSpawn from 'cross-spawn';
import * as path from 'path';
import ProjectConfig from '../project.config';
import * as Promise from 'bluebird';
import * as fs from 'fs-extra';
import { array_unique } from '../lib/func';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';

let arr_ids = array_unique(ditDiffStagedDir()
	.map(function (v)
	{
		let d = v.split(/\//);

		let pathMain = d[0];
		let novelID = d[1];

		if (pathMain.match(/_out$/))
		{
			pathMain = pathMain.replace(/_out$/, '');
		}

		if (d.length >= 3
			&& pathMain != 'cm'
			&& !pathMain.match(/_out$/))
		{
			return {
				pathMain,
				novelID,
			}
		}
	}))
	.filter(v => v)
;

let _cache_file = path.join(
	ProjectConfig.temp_root,
	path.basename(__filename) + '.json'
);

if (arr_ids.length == 1)
{
	fs.outputJSONSync(_cache_file, arr_ids);
}
else if (arr_ids.length == 0 && fs.existsSync(_cache_file))
{
	arr_ids = fs.readJSONSync(_cache_file);
	console.log(`使用上次執行的目錄`, arr_ids);
}

Promise
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		let myLocalesID = '';

		let cwd_path = path.join(ProjectConfig.dist_novel_root, pathMain, novelID);

		let meta: IMdconfMeta;

		if (fs.existsSync(path.join(cwd_path, 'meta.md')))
		{
			meta = await fs.readFile(path.join(cwd_path, 'meta.md'))
			.then(mdconf_parse)
		}
		else if (fs.existsSync(path.join(cwd_path, 'README.md')))
		{
			meta = await fs.readFile(path.join(cwd_path, 'README.md'))
			.then(mdconf_parse)
		}

		if (meta)
		{
			const localesPath = path.join(ProjectConfig.project_root, './lib/locales');

			if (!myLocalesID && meta.novel.series)
			{
				let p: string;

				if (!myLocalesID)
				{
					p = path.join(localesPath, novelID);

					if (fs.existsSync(p + '.ts'))
					{
						myLocalesID = novelID;
					}
				}

				/**
				 * 依據系列名稱來自動選擇檔案
				 */
				if (!myLocalesID && meta.novel.series.name)
				{
					if (!myLocalesID && meta.novel.series.name)
					{
						p = path.join(localesPath, meta.novel.series.name);

						if (fs.existsSync(p + '.ts'))
						{
							myLocalesID = meta.novel.series.name;
						}
					}

					if (!myLocalesID && meta.novel.series.name_short)
					{
						p = path.join(localesPath, meta.novel.series.name_short);

						if (fs.existsSync(p + '.ts'))
						{
							myLocalesID = meta.novel.series.name_short;
						}
					}
				}

				if (myLocalesID)
				{
					console.log(`自動將 myLocalesID 設置為 ${myLocalesID}`);
				}
			}
		}

		let cp = crossSpawn.sync('node', [
			path.join(__dirname, '../src/novel-demo'),
			'-m',
			pathMain || '',
			'-l',
			myLocalesID || '',
			'-n',
			novelID || '',
		], {
			stdio: 'inherit',
		});

		console.log(cp.pid, pathMain, novelID,);
	})
;

function ditDiffStaged(): string[]
{
	let cp = crossSpawn.sync('git', 'diff --cached --name-only'.split(' '), {
		cwd: ProjectConfig.dist_novel_root
	});

	return cp.stdout.toString()
		.split(/[\n\r]+/)
		.filter(v => v !== '')
		;
}

function ditDiffStagedDir(): string[]
{
	let cp = crossSpawn.sync('git',
		'diff --cached --dirstat=files,0'.split(' '),
		{
			cwd: ProjectConfig.dist_novel_root,
		}
	);

	let cp2 = crossSpawn.sync('git',
		'diff --dirstat=files,0'.split(' '),
		{
			cwd: ProjectConfig.dist_novel_root,
		}
	);

	return [
		cp.stdout.toString(),
		cp2.stdout.toString()
	]
		.join('\n')
		.split(/[\n\r]+/)
		.map(function (v)
		{
			return v.replace(/^\s+\d+(\.\d+)%\s+/, '');
		})
		.filter(v => v !== '')
		;
}
