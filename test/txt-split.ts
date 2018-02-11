/**
 * Created by user on 2017/12/25/025.
 */

import * as globby from 'globby';
import * as fs from 'fs-extra';
import path from 'upath2';
import * as projectConfig from '../project.config';
import * as Promise from 'bluebird';
import * as StrUtil from 'str-util';
import * as execall from 'execall';
import novelText from 'novel-text';
import trimFilename from '../lib/func';

let inputFile = path.join(projectConfig.dist_novel_root,
	'user',
	'自称贤者弟子的贤者',
	'raw/自稱弟子.txt',
);

let dirname = path.dirname(inputFile);

fs.readFile(inputFile)
	.then(function (data)
{
	let txt = novelText.trim(data);

	let _m;

	//_m = execall(/^[ \t　]*(?:第[^\n]+[章話话]|幕间[^\n完]+|[序終终]章[^\n完]?)(?!完)[^\n]*$/mg, txt);

	//_m = execall(/^[ ]*(?:(?:Act：)?\d+(?:[^\n+]*终章)?|第\d+章|\d+\+\d+)[ ]*$/img, txt);

	_m = execall(/^[ ]*(?:\d{3}|百[一-九]十[一-九]|.?百.十.?)[^\n]*[ ]*$/img, txt);

	//console.log(_m);

	let _files = {};
	let idx = 0;

	let m_last;

	let i;

	for (i in _m)
	{
		let m = _m[i];

		if (!m_last && idx == 0 && m.index != 0)
		{
			console.log(m);

			let id = '0'.padStart(5, '0');
			let name = id + '_' + 'unknow';

			_files[name] = txt.slice(idx, m.index);

			idx = m.index;
		}
		else if (m_last)
		{
			let id = i.padStart(4, '0') + '0';
			let name = fix_name(m_last.match);

			name = id + '_' + name;

			console.log([name]);

			//name = `${id}_Act：${StrUtil.toFullWidth(i.padStart(3, '0'))}`;

			_files[name] = txt.slice(idx, m.index);

			idx = m.index;
		}

		m_last = m;
	}

	if (idx < txt.length -1)
	{
		let id = i.padStart(4, '0') + '5';
		let name = fix_name(m_last.match);

		name = id + '_' + name;

		_files[name] = txt.slice(idx);
	}

	for (let name in _files)
	{
		fs.outputFile(path.join(dirname, 'out', trimFilename(name) + '.txt'), _files[name]);
	}

	console.log(_m);
})
;

function fix_name(name)
{
	name = novelText.trim(name).trim()
		//.replace('章', '話')
	;

	if (!/^\d+/.test(name))
	{
		name = StrUtil.zh2num(name).toString();
	}

	name = name
		.replace(/^(\d+)[\-話话\s]*/, '$1　')
		.replace(/[“”]/g, '')
	;

	name = StrUtil.zh2jp(name);

	//console.log([name]);

	return name;
}
