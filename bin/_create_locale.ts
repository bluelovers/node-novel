/**
 * Created by user on 2018/10/6/006.
 */

import * as crossSpawn from 'cross-spawn-extra';
import * as path from 'path';
import gitDiffIDNovelID, { getLocalesPath, localesPath, searchLocalesID } from '../lib/git';
import { freeGC } from '../lib/util';
import ProjectConfig from '../project.config';
import Bluebird = require('bluebird');
import * as fs from 'fs-extra';
import { array_unique } from '../lib/func';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import * as yargs from 'yargs';
import { console } from 'debug-color2';
import prettyuse = require('prettyuse');
import * as novelGlobby from 'node-novel-globby';
import * as iconv from 'iconv-jschardet';
import { tw2cn_min, cn2tw_min, tableCn2TwDebug, tableTw2CnDebug } from 'cjk-conv/lib/zh/convert/min';
import * as util from 'util';
import getBuildInRuleFileContext from '@node-novel/layout-pattern/lib/rules-copy';

let cli = yargs
	.argv
;

let arr_ids = gitDiffIDNovelID(ProjectConfig.dist_novel_root);

let _cache_file = path.join(
	ProjectConfig.temp_root,
	path.basename('_novel_run_git_diff.js') + '.json'
);

if (arr_ids.length == 0 && fs.existsSync(_cache_file))
{
	arr_ids = fs.readJSONSync(_cache_file);
	console.info(`使用上次執行的目錄`, arr_ids);
}

if (arr_ids.length != 1)
{
	throw new Error(util.inspect(arr_ids, {
		colors: true,
	}));
}

Bluebird
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		let cwd_path = path.join(ProjectConfig.dist_novel_root, pathMain, novelID);

		let meta: IMdconfMeta;

		if (fs.existsSync(path.join(cwd_path, 'README.md')))
		{
			meta = await fs.readFile(path.join(cwd_path, 'README.md'))
				.then(mdconf_parse)
		}

		let myLocalesID  = searchLocalesID(novelID, meta);

		if (!myLocalesID)
		{
			let t = path.join(localesPath, novelID + '.ts');

			if (!fs.existsSync(t))
			{
				await fs.outputFile(t, getBuildInRuleFileContext('demo'));

				console.log(`create`, path.basename(t));
			}
			else
			{
				console.warn(`exists`, path.basename(t));
			}

			console.info(t);
		}
		else
		{
			console.warn(`exists`, myLocalesID);
			console.info(getLocalesPath(myLocalesID));
		}
	})
	;

