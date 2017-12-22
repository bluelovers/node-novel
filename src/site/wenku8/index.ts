/**
 * Created by user on 2017/12/22/022.
 */

import { trimFilename } from '../../../lib/func';
import cheerioJSDOM, {} from '../../../lib/jsdom';
import * as Promise from 'bluebird';
import * as self from './index';
import * as moment from 'moment-timezone';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as projectConfig from '../../../project.config';
import { novelText } from '../../../lib/novel/text';
import * as shortid from 'shortid';

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

	return await cheerioJSDOM(url)
		.then(function (dom)
		{
			let novel_title = dom.$('body > #title').text();
			let novel_author = dom.$('body > #info').text().replace(/^作者：/, '');

			let url_data = parseUrl(dom.source_url);

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

			return {
				url: dom.source_url,
				url_data,

				novel_title,
				novel_author,
				volume_list,

				imgs: [] as string[],
			};
		})
		;
}

export function makeUrl(urlobj, bool?: boolean)
{
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

	let r = /novel\/([\d]+)\/([\d]+)\/(?:([\d]+)\.html?)?/;

	let m = r.exec(url.toString());

	if (m)
	{
		urlobj.novel_pid = m[1];
		urlobj.novel_id = m[2];
		urlobj.chapter_id = m[3];
	}

	return urlobj;
}

export async function download_novel(url: string)
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

	let path_novel = path.join(projectConfig.dist_novel_root,
		'wenku8',
		`${trimFilename(novel.novel_title)}_(${novel.url_data.novel_id})`
	);

	Promise
		.mapSeries(novel.volume_list, function (volume, vid)
		{
			vid = vid.toString().padStart(4, '0');

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

					let dom = await cheerioJSDOM(chapter.chapter_url);

					dom.$('#contentdp').remove();

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

							if (_this.attr('src'))
							{
								let id = shortid();

								_c[id] = _this.attr('src');
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
						;

					text = novelText.trim(text)
						.replace(/(@\}\})\n*(\{\{@)/g, '$1\n$2')
					;

					for (let id in _c)
					{
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

			console.log(ls);

			return fs.outputJSON(file, novel, {
				spaces: "\t",
			});
		})
	;
}

export default self;
//export default exports;
