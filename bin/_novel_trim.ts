/**
 * Created by user on 2018/12/31/031.
 */

import { console } from 'debug-color2';
import * as fs from 'fs-extra';
import * as iconv from 'iconv-jschardet';
import * as path from "path";
import * as yargs from 'yargs';
import { replace_name_list } from '../lib/fs/txt-rename';
import gitDiffIDNovelID from '../lib/git';
import { trimTxtLine } from '../lib/util';
import ProjectConfig from '../project.config';
import { _replace_list_001, getNovel, globNovel } from './lib/util';
import Bluebird = require('bluebird');
import novelText from 'novel-text';
import { _word_zh_all, lazymarks } from '../lib/locales/lib/index';
import * as util from 'util';
import * as fsIconv from 'fs-iconv';

let cli = yargs
	.argv
;

let arr_ids = gitDiffIDNovelID(ProjectConfig.dist_novel_root);

let _cache_file = path.join(
	ProjectConfig.temp_root,
	path.basename(__filename) + '.json',
);

if (arr_ids.length == 1)
{
	fs.outputJSONSync(_cache_file, arr_ids);
}
else if (1)
{
	throw new Error(util.inspect(arr_ids, {
		colors: true,
	}));
}
else if (arr_ids.length == 0 && fs.existsSync(_cache_file))
{
	arr_ids = fs.readJSONSync(_cache_file);
	console.info(`使用上次執行的目錄`, arr_ids);
}

Bluebird
	.mapSeries(arr_ids, async function ({
		pathMain,
		novelID,
	})
	{
		return getNovel({
			pathMain,
			novelID,

			patterns: [
				'**/*.txt',
				'**/README.md',
			],

			async callback(rowData)
			{
				let { file, currentFile, _last_empty, STAT_CACHE, len, index, idfile } = rowData;

				let _t_old: string;
				// @ts-ignore
				_t_old = await fsIconv.loadFile(file, {
					autoDecode: true,
				});

				if (_t_old.toString() === '')
				{
					_last_empty.push(currentFile);

					//console.gray(currentFile, '此檔案無內容');

					STAT_CACHE.skip++;

					return idfile;
				}
				else
				{
					if (_last_empty.length)
					{
						_last_empty
							.forEach(function (currentFile)
							{
								console.red(currentFile, '此檔案無內容');
							})
						;

						_last_empty = [];
					}

					let chk = iconv.detect(_t_old);

					if (chk.encoding != 'UTF-8' && chk.encoding != 'ascii')
					{
						console.red(idfile, '此檔案可能不是 UTF8 請檢查編碼或利用 MadEdit 等工具轉換', chk);
					}
				}

				// @ts-ignore
				_t_old = _t_old.toString();

				let _text = novelText.toStr(_t_old);

				let _t = trimTxtLine(_text, rowData);

				let changed = _t != _t_old;

				if (!_t.replace(/\xa0\s+　/g, ''))
				{
					STAT_CACHE.error++;

					console
						.yellow
						.bgRed(currentFile, index, len)
					;

					await fs.outputFile(file, '');
				}
				else if (changed)
				{
					console[changed ? 'log' : 'red'](idfile, index, len);

					await fs.outputFile(file, _t);
				}
				else
				{
					console[changed ? 'log' : 'red'](idfile, index, len);
				}

				if (changed)
				{
					STAT_CACHE.changed++;
				}

				return rowData.idfile;
			},
		})
			.then(globNovel)
	})
;
