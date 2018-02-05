/**
 * Created by user on 2017/12/6/006.
 */

import * as Promise from 'bluebird';
import { JSDOM, VirtualConsole } from 'jsdom';
import * as cheerio from 'cheerio';
import { IDKEY } from '../wenku8/index';
import { parseUrl, makeUrl, trimFilename } from './';
//import * as moment from 'moment';
import * as moment from 'moment-timezone';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as projectConfig from '../../../project.config';
import { download as downloadChapter } from './chapter';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';

export async function download(data, options?)
{
	let _data = await download_info(data, options);

	let path_main = path.join(projectConfig.dist_novel_root,
		'dmzj',
		trimFilename(`${_data.data.g_lnovel_name}_(${_data.data.g_lnovel_id})`),
	);

	let _file = path.join(path_main, trimFilename(`${_data.data.g_lnovel_name}.${_data.data.g_lnovel_id}.json`));

	fs.outputJson(_file, _data, {
		spaces: "\t",
	});

	let md = novelInfo.stringify({}, _data);
	if (md)
	{
		let file = path.join(path_main, `README.md`);

		await fs.outputFile(file, md);
	}

	let _a = _data.value.reduce(function (a, b)
	{
		return a.concat(b.chapter);

	}, []);

	let _f = await Promise.map(_a, function (a, index, len)
		{

			//let url = makeUrl(a);

			let pad_len = len.toString().length > 4 ? len.toString().length : 4;
			let volume_name = a.volume_name;

			return downloadChapter(a)
				.then(async function (data)
				{
					let _file = path.join(path_main,
						trimFilename(`${a.index_volume.toString()
							.padStart(pad_len, '0')} ${volume_name}_(${data.data.g_volume_id})`),
						trimFilename(`${a.index.toString()
							.padStart(pad_len, '0')}_${data.data.chapter_name}.${data.data.g_chapter_id}`)
					);

					await fs.outputJson(_file + '.json', data, {
						spaces: "\t",
					});



					await fs.outputFile(_file + '.txt', data.value);

					return path.relative(projectConfig.project_root, _file);
				})
				.then(function (file)
				{
					console.log('done', file);

					return file;
				})
				;
		})
		.then(function (ret)
		{
			//console.log('done', ret);

			return ret;
		})
	;

	_data.checkdate = moment().tz(moment.tz.guess());

	_data.files = _f;

	//console.log(_a);

	return _data;
}

/**
 *
 * @param data
 * @param options
 * @returns {Promise<{url: string; data: {}; value: any[]}>}
 */
export async function download_info(data, options?)
{
	let url: string;

	if (typeof data == 'string')
	{
		data = parseUrl(data);
	}

	url = `http://q.dmzj.com/${data.novel_id}/index.shtml`;

	//console.log('download_info', url, data);

	let _data = {

		url: url,

		data: {} as any,

		value: null as any[],

	};

	let virtualConsole = new VirtualConsole();
	let $;

	return await JSDOM
		.fromURL(url, {
			runScripts: "dangerously",
			virtualConsole,
		})
		.then(function (dom)
		{
			let window = dom.window;

			$ = cheerio.load(dom.serialize());

			_data.data.g_lnovel_id = window.g_lnovel_id;
			_data.data.g_lnovel_name = window.g_lnovel_name;

			_data.data.cover_pic = $('#cover_pic').attr('src');

			{
				let _t = $('.main .pic .con').text();

				_data.data.con = _t;

				if (_t.match(/作者：(.+)/))
				{
					_data.data.author = RegExp.$1;
				}
				if (_t.match(/类型：(.+)/))
				{
					_data.data.type = (RegExp.$1).toString().split('/');
				}
				if (_t.match(/状态：(.+)/))
				{
					_data.data.status = RegExp.$1;
				}
				if (_t.match(/更新：(.+)/))
				{
					_data.data.lastupdate = moment.tz(RegExp.$1, 'YYYY-MM-DD HH:mm:ss', 'Asia/Taipei');
				}
			}

			_data.data.desc = $('#detail_block > .ilist:has(> h3) > p').text();

			dom.window.volume_list = dom.window.volume_list.reverse();
			dom.window.chapter_list = dom.window.chapter_list.reverse();

			let list = [];

			for (let v in dom.window.chapter_list)
			{
				let volume_name = $(dom.window.volume_list[v]).find('.chapnamesub').text();

				dom.window.chapter_list[v] = dom.window.chapter_list[v].reverse();

				//let data = parseUrl($(dom.window.chapter_list[v][0]).attr('href'));

				list[v] = {
					index: v,

					novel_id: null,

					volume_name: volume_name,
					volume_id: null,

					chapter: [],
				};

				for (let ci in dom.window.chapter_list[v])
				{
					if (!dom.window.chapter_list[v][ci])
					{
						continue;
					}

					let _a = $(dom.window.chapter_list[v][ci]);

					//console.log(_a);

					let _d = parseUrl(_a.attr('href'));

					if (!list[v].volume_id)
					{
						list[v].novel_id = _d.novel_id;
						list[v].volume_id = _d.volume_id;
					}

					list[v].chapter.push({
						index: ci,
						index_volume: v,

						novel_id: _d.novel_id,

						volume_id: _d.volume_id,
						volume_name: volume_name,

						chapter_name: _a.text(),
						chapter_id: _d.chapter_id,

						url: _a.attr('href'),
					});
				}
			}

			//console.log(777, list[0].chapter);

			_data.value = list;

			//console.log(dom.window.volume_list, dom.window.chapter_list);

			return _data;
		})
		.then(function (_data)
		{
			_data.checkdate = moment().tz(moment.tz.guess());

			return _data;
		})
		;
}

export default exports;
