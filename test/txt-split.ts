/**
 * Created by user on 2017/12/25/025.
 */

import * as globby from 'globby';
import * as fs from 'fs-extra';
import path from 'upath2';
import * as projectConfig from '../project.config';
import * as Promise from 'bluebird';
import * as StrUtil from 'str-util';
import * as jschardet from 'jschardet';
import * as execall from 'execall';
import { novelText } from '../lib/novel/text';

let inputFile = path.join(projectConfig.dist_novel_root,
	'user',
	'火輪を抱いた少女',
	'raw/怀抱太阳的少女.txt',
);

let dirname = path.dirname(inputFile);

fs.readFile(inputFile)
	.then(function (data)
{
	let txt = novelText.toStr(data);

	let _m = execall(/^[ \t　]*(?:第[^\n]+[章話话]|幕间[^\n完]+|[序終终]章[^\n完]?)(?!完)[^\n]*$/mg, txt);

	let _files = {};
	let idx = 0;

	let m_last;

	let i;

	for (i in _m)
	{
		let m = _m[i];

		if (idx == 0 && m.index != 0)
		{
			let id = '0'.padStart(5, '0');
			let name = id + '_' + 'unknow';

			_files[name] = txt.slice(idx, m.index);

			idx = m.index;
		}
		else if (m_last)
		{
			let id = i.padStart(4, '0') + '0';
			let name = id + '_' + m_last.match
				.replace('章', '話')
			;

			_files[name] = txt.slice(idx, m.index);

			idx = m.index;
		}

		m_last = m;
	}

	if (idx < txt.length -1)
	{
		let id = i.padStart(4, '0') + '5';
		let name = id + '_' + m_last.match
			.replace('章', '話')
		;

		_files[name] = txt.slice(idx);
	}

	for (let name in _files)
	{
		fs.outputFile(path.join(dirname, 'out', name + '.txt'), _files[name]);
	}

	console.log(_m);
})
;
