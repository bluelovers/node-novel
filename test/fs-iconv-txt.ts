/**
 * Created by user on 2019/3/17.
 */

//import fs from 'fs-iconv';
import fs = require('fs-iconv');
import Bluebird = require('bluebird');
import globby from 'node-novel-globby/g';
import { EnumEncoding } from 'iconv-jschardet';

import { SymFSLib } from 'fs-iconv/core';

Bluebird.mapSeries(globby.async([
		'*.txt',
	], {
		cwd: 'C:/Home/link/dist_novel/syosetu/悠閑農家與亂碼技能/00000_null',
		absolute: true,
	}), async function (file)
{
	let buf = await fs.loadFile(file);

	return fs.saveFile(file, buf, {
		encoding: EnumEncoding.UTF8
	})
		.tap(function ()
		{
			console.log(file);
		})
})
;
