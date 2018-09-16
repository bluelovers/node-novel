/**
 * Created by user on 2018/9/16/016.
 */

import * as crossSpawn from 'cross-spawn';
import * as path from 'path';
import ProjectConfig from '../project.config';
import { array_unique, lazy_unique } from 'array-hyper-unique';

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
				return {
					pathMain,
					novelID,
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
		cwd: git_root
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

export default gitDiffIDNovelID
