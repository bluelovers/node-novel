/**
 * Created by user on 2018/10/6/006.
 */

import * as crossSpawn from 'cross-spawn-extra';
import * as path from 'path';
import gitDiffIDNovelID, { localesPath, searchLocalesID } from '../lib/git';
import { freeGC } from '../lib/util';
import ProjectConfig from '../project.config';
import Promise = require('bluebird');
import * as fs from 'fs-extra';
import { array_unique } from '../lib/func';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import * as yargs from 'yargs';
import { console } from 'debug-color2';
import prettyuse = require('prettyuse');
import * as novelGlobby from 'node-novel-globby';
import * as iconv from 'iconv-jschardet';
import { tw2cn_min, cn2tw_min, tableCn2TwDebug, tableTw2CnDebug } from 'cjk-conv/lib/zh/convert/min';
import novelEpub from 'novel-epub';
import txtMerge from 'novel-txt-merge';

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
	throw new Error();
}
else if (arr_ids.length === 1)
{
	fs.outputJSONSync(_cache_file, arr_ids);
}

Promise
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		let cwd_path = path.join(ProjectConfig.dist_novel_root, pathMain, novelID);

		let cwd_path2 = path.join(ProjectConfig.dist_novel_root, pathMain + '_out', novelID);

		if (fs.pathExistsSync(cwd_path2))
		{
			cwd_path = cwd_path2;
		}

		let meta: IMdconfMeta;

		console.log(pathMain, novelID);

		const inputPath = cwd_path;
		const outputPath = path.join(ProjectConfig.temp_root, 'epub');

		return novelEpub({
			inputPath,
			outputPath,
			padEndDate: false,
			useTitle: true,
			filenameLocal: novelID,
			noLog: true,
		})
			.tap(async function (ret)
			{
				console.dir(ret.filename, {
					colors: true,
				});

				let txt = await txtMerge(inputPath, outputPath, ret.basename);

				console.dir(txt.filename, {
					colors: true,
				});
			})
		;

		/*
		return crossSpawn.async('npx', [
			'novel-epub',
			'--input', cwd_path,
			'--output', path.join(ProjectConfig.temp_root, 'epub'),

		], {
			cwd: cwd_path,
			stdio: 'inherit',
		})
		*/
	})
	;

