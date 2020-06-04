/**
 * Created by user on 2018/10/6/006.
 */

import path from 'path';
import gitDiffIDNovelID, {
	gitDiffStaged,
	gitDiffStagedDir,
	gitDiffStagedFile,
	localesPath,
	searchLocalesID,
} from '../lib/git';
import { freeGC, isGCMode } from '../lib/util';
import ProjectConfig from '../project.config';
import Bluebird from 'bluebird';
import fs from 'fs-extra';
import yargs from 'yargs';
import { console } from 'debug-color2';

import { globSegment } from './lib/segment';
import util from 'util';

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

if (arr_ids.length > 2)
{
	throw new Error(util.inspect(arr_ids, {
		colors: true,
	}));
}
else if (arr_ids.length === 1)
{
	fs.outputJSONSync(_cache_file, arr_ids);
}

console.debug(`gc mode:`, isGCMode());

Bluebird
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		let cwd_path = path.join(ProjectConfig.dist_novel_root, pathMain, novelID);

		let files = gitDiffStagedFile(cwd_path)
			.filter(v => path.extname(v) === '.txt')
		;

		console.info(pathMain, novelID);

		return globSegment([
			...files,
			'!**/*.md',
			'!*.md',
		], {
			cwd: cwd_path,
			fixGlob: true,
		});
	})
	;

