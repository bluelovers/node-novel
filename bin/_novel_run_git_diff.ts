/**
 * Created by user on 2018/5/21/021.
 */

import * as crossSpawn from 'cross-spawn-extra';
import * as path from 'path';
import gitDiffIDNovelID from '../lib/git';
import ProjectConfig from '../project.config';
import Bluebird from 'bluebird';
import * as fs from 'fs-extra';
import { IMdconfMeta, mdconf_parse } from 'node-novel-info';
import * as yargs from 'yargs';
import { console } from 'debug-color2';
import { searchLocalesID, searchMyLocalesID } from '../src/core';

let cli = yargs
	.argv
;

let arr_ids = gitDiffIDNovelID(ProjectConfig.dist_novel_root);

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
	console.info(`使用上次執行的目錄`, arr_ids);
}

const localesPath = path.join(ProjectConfig.project_root, './lib/locales');

Bluebird
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		let myLocalesID = '';

		let cwd_path = path.join(ProjectConfig.dist_novel_root, pathMain, novelID);

		if (!await fs.pathExists(cwd_path))
		{
			console.error(`資料夾不存在`, pathMain, novelID);

			return;
		}

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
			if (!myLocalesID)
			{
				myLocalesID = searchMyLocalesID(meta, novelID);

				if (myLocalesID)
				{
					console.debug(`自動將 myLocalesID 設置為 ${myLocalesID}`);
				}
			}
		}

		let cp = crossSpawn.sync('node', [
			'-r',
			'ts-node/register',
			path.join(__dirname, '../src/novel-demo'),
			'-m',
			pathMain || '',
			'-l',
			myLocalesID || '',
			'-n',
			novelID || '',
			'--patternOnly=' + (cli.patternOnly ? 1 : 0).toString(),
			cli.diff && '--diff' || '',
		], {
			stdio: 'inherit',
		});

		console.log(cp.pid, pathMain, novelID,);
		//console.dir(meta);
	})
;

