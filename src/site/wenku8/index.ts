/**
 * Created by user on 2017/12/22/022.
 */

import { trimFilename } from '../../../lib/func';
import * as Promise from 'bluebird';
import * as moment from 'moment-timezone';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as projectConfig from '../../../project.config';
import { novelText } from '../../../lib/novel/text';
import * as shortid from 'shortid';
import { download_image } from '../image';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import { fromURL, IFromUrlOptions, URL, VirtualConsole } from 'jsdom-extra';

moment.fn.toJSON = function() { return this.format(); }

export const IDKEY = 'wenku8';
export const PATH_NOVEL_MAIN = path.join(projectConfig.dist_novel_root, IDKEY);

export async function get_volume_list(url)
{
	{
		let data = parseUrl(url);

		if (!data.novel_id || (!data.novel_id && data.novel_id !== 0))
		{
			throw new ReferenceError();
		}

		url = makeUrl(data, true);
	}

	return await fromURL(url)
		.then(async function (dom)
		{
			let novel_title = dom.$('body > #title').text();
			let novel_author = dom.$('body > #info').text().replace(/^作者：/, '');

			let url = dom.url.href;
			let url_data = parseUrl(dom.url.href);

			let volume_list = [];

			let currentVolume;

			let table = dom.$('body > #info').siblings('table').eq(0);

			table.find('tr')
				.each(function (index)
				{
					let tr = dom.$(this);

					if (tr.is(':has(.vcss)'))
					{
						currentVolume = volume_list[volume_list.length] = {
							volume_index: volume_list.length,
							volume_title: tr.text().replace(/^\s+|\s+$/g, ''),
							chapter_list: [],
						};
					}
					else
					{
						tr.find('td.ccss a')
							.each(function (index)
							{
								let a = dom.$(this);

								let href = a.prop('href');

								let data = parseUrl(href);

								if (!data.novel_id || !data.chapter_id)
								{
									href.match(/(\d+)\.htm/);

									let chapter_id = RegExp.$1;

									data = Object.assign({}, url_data, {

										chapter_id,
									});

									href = data.url = makeUrl(data);
								}

								currentVolume
									.chapter_list
									.push({
										chapter_index: currentVolume.length,
										chapter_title: a.text().replace(/^\s+|\s+$/g, ''),
										chapter_id: data.chapter_id,
										chapter_url: href,
										chapter_url_data: data,
									})
								;
							})
					}
				})
			;

			let {
				novel_cover,
				novel_desc,
				novel_status,
				novel_date,
				novel_publisher,
			} = await get_meta(url_data);

			//console.log(novel_cover, novel_desc, novel_status);

			return {
				url,
				url_data,

				novel_title,
				novel_author,

				novel_cover,
				novel_desc,
				novel_status,
				novel_date,
				novel_publisher,

				volume_list,

				checkdate: moment().local(),

				imgs: [] as string[],
			};
		})
		;
}

export function makeUrl(urlobj, bool?: boolean)
{
	if (1 || urlobj.novel_pid === null)
	{
		let cid = (!bool && urlobj.chapter_id) ? '&cid=' + urlobj.chapter_id : '';

		return `http://www.wenku8.com/modules/article/reader.php?aid=${urlobj.novel_id}${cid}`;
	}

	let cid = (!bool && urlobj.chapter_id) ? urlobj.chapter_id : 'index';

	return `http://www.wenku8.com/novel/${urlobj.novel_pid}/${urlobj.novel_id}/${cid}.htm`;
}

export function parseUrl(url: string)
{
	let urlobj = {
		url: url,

		novel_pid: null,
		novel_id: null,
		chapter_id: null,
	};

	url = url.toString();

	let r: RegExp;
	let m;

	r = /modules\/article\/articleinfo\.php\?id=(\d+)/;
	if (m = r.exec(url))
	{
		urlobj.novel_id = m[1];

		return urlobj;
	}

	r = /modules\/article\/reader\.php\?aid=(\d+)(?:&cid=(\d+))?/;
	if (m = r.exec(url))
	{
		urlobj.novel_id = m[1];
		urlobj.chapter_id = m[2];

		return urlobj;
	}

	r = /book\/(\d+)\.htm/;
	if (m = r.exec(url))
	{
		urlobj.novel_id = m[1];

		return urlobj;
	}

	r = /novel\/([\d]+)\/([\d]+)\/(?:([\d]+)\.html?)?/;
	if (m = r.exec(url))
	{
		urlobj.novel_pid = m[1];
		urlobj.novel_id = m[2];
		urlobj.chapter_id = m[3];
	}

	return urlobj;
}

/**
 * http://www.wenku8.com/novel/0/381/index.htm
 *
 * @param {string} url
 */
export async function download(url: string)
{
	{
		let data = parseUrl(url);

		if (!data.novel_id || (!data.novel_id && data.novel_id !== 0))
		{
			throw new ReferenceError();
		}

		url = makeUrl(data, true);
	}

	let novel = await get_volume_list(url);

	let idx = 0;

	let path_novel = path.join(PATH_NOVEL_MAIN,
		`${trimFilename(novel.novel_title)}_(${novel.url_data.novel_id})`
	);

	let ret = await Promise
		.mapSeries(novel.volume_list, function (volume, vid)
		{
			vid = vid.toString().padStart(4, '0') + '0';

			let dirname = path.join(path_novel,
				`${vid} ${trimFilename(volume.volume_title)}`
				)
			;

			return Promise
				.mapSeries(volume.chapter_list, async function (chapter)
				{
					chapter.chapter_index = (idx++);

					let ext = '.txt';
					let cid = chapter.chapter_index.toString().padStart(4, '0');

					let file = path.join(dirname,
						`${cid}_${trimFilename(chapter.chapter_title)}\.${chapter.chapter_id}${ext}`
					);

					let dom = await fromURL(chapter.chapter_url);

					dom.$('#contentdp, #contentdp').remove();

					let content = dom.$('#content');
					let _img = content.find('img');

					let text: string;
					let _c = {};

					if (_img.length)
					{
						novel.imgs = novel.imgs || [];
						chapter.imgs = chapter.imgs || [];

						_img.each(function(index, elem)
						{
							let _this = dom.$(this);

							if (_this.prop('src'))
							{
								let id = shortid();

								_c[id] = _this.prop('src');
								chapter.imgs.push(_c[id]);
								novel.imgs.push(_c[id]);

								dom.$(`<span>{{@${id}@}}</span>`).insertAfter(this);

								dom.$(this).remove();
							}
						});
					}

					text = novelText.trim(content.text())
						.replace(/ /g, ' ')
						.replace(/^[  \t]{4,}/gm, '　　')
						.replace(/^[  \t]+/gm, '　')
						.replace(/^(　+)[  \t]+/gm, '$1')

						.replace(/^　{2}/gm, '')
						;

					text = novelText.trim(text)
						.replace(/(@\}\})\n*(\{\{@)/g, '$1\n$2')
					;

					let _idx = 0;

					for (let id in _c)
					{
						await download_image(_c[id], {
							fromfile: file,
							prefix: 'img_' + (_idx++).toString().padStart(3, '0') + '_',
						});

						text = text
							.replace(`{{@${id}@}}`, `<img src="${_c[id]}"/>`)
						;
					}

					if (0 && _img.length)
					{
						console.log(777777, file);
						console.log(text);

						process.exit();
					}

					await fs.outputFile(file, text);

					return file;
				})
				;
		})
		.tap(ls =>
		{
			let file = path.join(path_novel,
				`${trimFilename(novel.novel_title)}.${novel.url_data.novel_id}.json`
				)
			;

			//console.log(ls);

			return fs.outputJSON(file, novel, {
				spaces: "\t",
			});
		})
	;

	{
		let options = {};
		options[IDKEY] = {
			txtdownload_id: novel.novel_syosetu_id,
		};

		let md = novelInfo.stringify({
			novel: {
				tags: [
					IDKEY,
				],
			},
			options,
			link: novel.link || [],
		}, novel, {
			options: {
				textlayout: {
					allow_lf2: true,
				}
			},
		});

		let file = path.join(path_novel, `README.md`);
		await fs.outputFile(file, md);
	}

	return novel;
}

async function get_meta(url_data)
{
	let url = `http://www.wenku8.com/modules/article/articleinfo.php?id=${url_data.novel_id}`;

	let dom = await fromURL(url);

	//novel_status
	//novel_cover
	//novel_desc

	let _content = dom.$('#content > div > table:eq(1)');

	let novel_cover = _content.find('img:eq(0)').prop('src');
	let novel_desc = novelText.trim(_content.find('.hottext + br + span:eq(-1)').text() || '', {
		trim: true,
	});

	let novel_status = '';
	let novel_date = null;
	let novel_publisher = null;

	dom.$('#content > div > table:eq(0) tr:eq(-1) > td').each(function (i, elem)
	{
		let t = dom.$(elem).text();

		if (t.match(/(?:状态|狀態)：\s*(.+)/))
		{
			novel_status = novelText.trim(RegExp.$1, {
				trim: true,
			});
		}
		else if (t.match(/(?:更新)：\s*(.+)/))
		{
			novel_date = novelText.trim(RegExp.$1, {
				trim: true,
			});

			novel_date = moment(novel_date).local();
		}
		else if (t.match(/(?:文库分类)：\s*(.+)/))
		{
			novel_publisher = novelText.trim(RegExp.$1, {
				trim: true,
			});
		}

	});

	return {
		novel_cover,
		novel_desc,
		novel_status,
		novel_date,
		novel_publisher,
	};
}

export default download;
//export default exports;
