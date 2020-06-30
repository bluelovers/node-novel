/**
 * Created by user on 2018/9/16/016.
 */

import crossSpawn from 'cross-spawn-extra';
import path from 'path';
import ProjectConfig from '../project.config';
import { array_unique, lazy_unique } from 'array-hyper-unique';
import { defaultSortCallback } from '@node-novel/sort';
import * as fs from 'fs-extra';
import { sortTree } from 'node-novel-globby/lib/glob-sort';
import { console } from 'debug-color2';

export const localesPath = path.join(ProjectConfig.project_root, './lib/locales');

export function gitDiffIDNovelID(git_root: string)
{
	if (!git_root)
	{
		throw new Error();
	}

	return array_unique(gitDiffStagedDir(git_root)
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
				//&& pathMain != 'cm'
				&& pathMain != 'docs'
				&& !pathMain.match(/_out$|^\./))
			{
				if (fs.pathExistsSync(path.join(ProjectConfig.dist_novel_root, pathMain, novelID)))
				{
					return {
						pathMain,
						novelID,
					}
				}
				else
				{
					console.warn(`[資料夾不存在或已刪除]`, pathMain, novelID)
				}
			}
		}))
		.filter(v => v)
}

export function gitDiffStaged(git_root: string): string[]
{
	if (!git_root)
	{
		throw new Error();
	}

	let cp = crossSpawn.sync('git', 'diff --cached --name-only'.split(' '), {
		cwd: git_root,
		stripAnsi: true,
	});

	return cp.stdout.toString()
		.split(/[\n\r]+/)
		.filter(v => v !== '')
		;
}

export function gitDiffStagedDir(git_root: string): string[]
{
	if (!git_root)
	{
		throw new Error();
	}

	let cp = crossSpawn.sync('git',
		'diff --cached --dirstat=files,0'.split(' '),
		{
			cwd: git_root,
			stripAnsi: true,
		}
	);

	let cp2 = crossSpawn.sync('git',
		'diff --dirstat=files,0'.split(' '),
		{
			cwd: ProjectConfig.dist_novel_root,
			stripAnsi: true,
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

export function searchLocalesID(novelID: string, meta)
{
	return _searchLocalesID([
		meta.options && meta.options.novel && meta.options.novel.pattern,

		novelID,

		meta.novel.title,

		meta.novel.title_short,
		meta.novel.title_zh,
		meta.novel.title_jp,

		// @ts-ignore
		meta.novel.title_output,

		/**
		 * 依據系列名稱來自動選擇檔案
		 */
		meta.novel.series && meta.novel.series.name,
		meta.novel.series && meta.novel.series.name_short,

		// @ts-ignore
		meta.novel.title_tw,
		// @ts-ignore
		meta.novel.title_cn,
		// @ts-ignore
		meta.novel.title_other,
		// @ts-ignore
		meta.novel.title_source,

		// @ts-ignore
		meta.novel.title_en,
	]);
}

export function _searchLocalesID(ids: string[])
{
	let myLocalesID: string;

	for (let name of ids)
	{
		if (!name || typeof name !== 'string')
		{
			continue;
		}

		let p = path.join(localesPath, name);

		if (fs.existsSync(p + '.ts'))
		{
			myLocalesID = name;
			break;
		}
	}

	return myLocalesID;
}

export function getLocalesPath(name: string)
{
	return require.resolve(path.join(localesPath, name));
}

export function gitDiffStagedFile(git_root: string): string[]
{
	if (!git_root)
	{
		throw new Error();
	}

	let cp = crossSpawn.sync('git',
		'diff --cached --name-only --relative'.split(' '),
		{
			cwd: git_root,
			stripAnsi: true,
		}
	);

	let cp2 = crossSpawn.sync('git',
		'diff --name-only --relative'.split(' '),
		{
			cwd: git_root,
			stripAnsi: true,
		}
	);

	return sortTree(array_unique([
		cp.stdout.toString(),
		cp2.stdout.toString()
	]
		.join('\n')
		.split(/[\n\r]+/)
		.map(function (v)
		{
			return v;
		})
		.filter(v => v !== '')))
		;
}

export default gitDiffIDNovelID
