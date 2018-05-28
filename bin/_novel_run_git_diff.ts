/**
 * Created by user on 2018/5/21/021.
 */

import * as crossSpawn from 'cross-spawn';
import * as path from 'path';
import ProjectConfig from '../project.config';
import * as Promise from 'bluebird';
import { array_unique } from '../lib/func';

Promise
	.mapSeries(array_unique(ditDiffStagedDir()
		.map(function (v)
		{
			let d = v.split(/\//);

			let pathMain = d[0];
			let novelID = d[1];

			if (d.length > 3
				&& pathMain != 'cm'
				&& !pathMain.match(/_out$/))
			{
				return {
					pathMain,
					novelID,
				}
			}
		}))
		.filter(v => v), function ({
		pathMain,
		novelID,
	})
	{
		let myLocalesID = '';

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
		//'diff --cached --dirstat=files,0'.split(' '),
		'diff --dirstat=files,0'.split(' '),
		{
			cwd: ProjectConfig.dist_novel_root,
		}
	);

	return cp.stdout.toString()
		.split(/[\n\r]+/)
		.map(function (v)
		{
			return v.replace(/^\s+\d+(\.\d+)%\s+/, '');
		})
		.filter(v => v !== '')
		;
}
