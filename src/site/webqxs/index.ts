/**
 * Created by user on 2017/12/29/029.
 */

import { trimFilename } from '../../../lib/func';
import cheerioJSDOM, { URL } from '../../../lib/jsdom';
import * as Promise from 'bluebird';
import * as moment from 'moment-timezone';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as projectConfig from '../../../project.config';
import { novelText } from '../../../lib/novel/text';
import * as shortid from 'shortid';

export const IDKEY = 'webqxs';
export const PATH_NOVEL_MAIN = path.join(projectConfig.dist_novel_root, IDKEY);

export function makeUrl(urlobj, bool?: boolean)
{
	let cid = (!bool && urlobj.chapter_id) ? urlobj.chapter_id + '.html' : '';

	return `http://www.webqxs.com/${urlobj.novel_pid}/${urlobj.novel_id}/${cid}`;
}

/**
 * http://www.webqxs.com/0/20/2543.html
 * http://www.webqxs.com/0/20/
 *
 * @param {string} url
 * @returns {{url: string; novel_pid: null; novel_id: null; chapter_id: null}}
 */
export function parseUrl(url: string)
{
	let urlobj = {
		url: url,

		novel_pid: null,
		novel_id: null,
		chapter_id: null,
	};

	let r = /www\.webqxs\.com\/([\d]+)\/([\d]+)\/(?:([\d]+)\.html?)?/;

	let m = r.exec(url.toString());

	if (m)
	{
		urlobj.novel_pid = m[1];
		urlobj.novel_id = m[2];
		urlobj.chapter_id = m[3];
	}

	return urlobj;
}

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
			let _area = dom.$('.main .catalog .catalog1');

			let novel_title = novelText.trim(dom.$('.introduce h1', _area).text());

			let novel_author = novelText.trim(dom.$('.introduce .bq a[href*="authorarticle"]', _area).text());

			let novel_date = novelText.trim(dom.$('.introduce .bq span:eq(0)', _area).text()
				.replace(/更新：/, '')
			);
			novel_date = moment(novel_date).local();

			let novel_status = novelText.trim(dom.$('.introduce .bq span:has(a[href*="authorarticle"]) + span', _area).text()
				.replace(/状态：/, '')
			);

			let novel_desc = novelText.trim(dom.$('.introduce .jj', _area).text());

			let novel_cover = dom.$('.pic img', _area).prop('src');
			novel_cover = new URL(novel_cover, dom.source_url).href;

			let url_data = parseUrl(dom.source_url);

			let volume_list = [];

			let currentVolume;

			let table = dom.$('.ml_content .ml_list ul').eq(0);

			table.children()
				.each(function (index)
				{
					let tr = dom.$(this);

					if (tr.is('div.volume-z'))
					{
						currentVolume = volume_list[volume_list.length] = {
							volume_index: volume_list.length,
							volume_title: novelText.trim(tr.text()),
							chapter_list: [],
						};
					}
					else if (tr.is('li'))
					{
						tr.find('a')
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
										chapter_title: novelText.trim(a.text()),
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
				novel_status,
				novel_cover,

				novel_desc,

				volume_list,

				novel_date,
				checkdate: moment().local(),

				imgs: [] as string[],
			};
		})
		;
}

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

	return Promise
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
					let cid = chapter.chapter_index.toString().padStart(4, '0') + '0';

					let file = path.join(dirname,
						`${cid}_${trimFilename(chapter.chapter_title)}\.${chapter.chapter_id}${ext}`
					);

					let dom = await cheerioJSDOM(chapter.chapter_url);

					dom.$('#contentdp, #contentdp').remove();

					let content = dom.$('#articlecontent');
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
						.replace(/[ \xA0]/g, ' ')
						.replace(/^[  \xA0\t]{4,}/gm, '　　')
						.replace(/^[  \xA0\t]+/gm, '　')
						.replace(/^(　+)[  \xA0\t]+/gm, '$1')
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

			//console.log(ls);

			return fs.outputJSON(file, novel, {
				spaces: "\t",
			});
		})
		;
}

export default download;

//download('http://www.webqxs.com/0/20/');
