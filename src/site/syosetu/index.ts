/**
 * Created by user on 2017/12/22/022.
 */

import fetch from 'lets-fetch';
import { trimFilename } from '../../../lib/func';
import * as Promise from 'bluebird';
import * as moment from 'moment-timezone';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as projectConfig from '../../../project.config';
import novelInfo, { mdconf_parse, IMdconfMeta } from 'node-novel-info';
import { fromURL, IFromUrlOptions, URL, VirtualConsole } from 'jsdom-extra';

moment.fn.toJSON = function () { return this.format(); }

export const IDKEY = 'syosetu';
export const PATH_NOVEL_MAIN = path.join(projectConfig.dist_novel_root, IDKEY);

export const defaultJSDOMOptions: IFromUrlOptions = {
	virtualConsole: new VirtualConsole,
	runScripts: 'dangerously',
	disableCheerio: true,
};

export async function get_volume_list(url)
{
	{
		let data = parseUrl(url);

		if (!data.novel_id)
		{
			throw new ReferenceError();
		}

		url = makeUrl(data, true);
	}

	return await fromURL(url, defaultJSDOMOptions)
		.then(async function (dom)
		{
			let novel_title = dom.$('.novel_title').text();
			let novel_author = dom.$('.novel_writername a').text();

			let novel_desc = dom.$('#novel_ex').text();

			let novel_publisher = IDKEY;

			let url_data = parseUrl(dom.url.href);

			let volume_list = [];

			let currentVolume;

			let table = dom.$('.index_box').find('> .chapter_title, .novel_sublist2');

			let _cache_dates = [];

			let novel_syosetu_id;

			{
				let $ = dom.$;

				//console.log(dom.serialize());

				//console.log($('#novel_footer'));

				//console.log($('#novel_footer').find('.undernavi a[href*="txtdownload"]'));

				let m;
				let dt = dom.$('#novel_footer .undernavi a[href*="txtdownload"]').attr('href');
				if (m = dt.match(/ncode\/(\d+)/))
				{
					novel_syosetu_id = m[1];
				}
				else
				{
					throw new Error()
				}
			}

			table
				.each(function (index)
				{
					let tr = dom.$(this);

					if (tr.is('.chapter_title'))
					{
						currentVolume = volume_list[volume_list.length] = {
							volume_index: volume_list.length,
							volume_title: tr.text().replace(/^\s+|\s+$/g, ''),
							chapter_list: [],
						};
					}
					else
					{
						if (!currentVolume)
						{
							currentVolume = volume_list[volume_list.length] = {
								volume_index: volume_list.length,
								volume_title: 'null',
								chapter_list: [],
							};
						}

						let a = tr.find('.subtitle a');

						let chapter_date;
						let dd;
						let da = tr.find('.long_update');

						if (da.find('span[title*="/"]').length)
						{
							dd = da.find('span[title*="/"]').attr('title').replace(/改稿|^\s+|\s+$/g, '');
						}

						if (!dd)
						{
							da.find('*').remove();
							dd = da.text().replace(/^\s+|\s+$/g, '');
						}

						if (dd)
						{
							chapter_date = moment(dd, 'YYYY/MM/DD HH:mm').local();
							_cache_dates.push(chapter_date.unix());
						}

						let href = a.prop('href');

						// @ts-ignore
						let data = parseUrl(href);

						if (!data.chapter_id)
						{
							console.log(a);
							console.log(data);
							console.log(href);
							console.log(a.attr('href'));
							console.log(new URL(href, dom.url));

							console.log(dom._options);

							throw new Error()
						}
						else
						{
							data = {
								url: null,
								novel_pid: novel_syosetu_id as string,
								chapter_id: data.chapter_id as string,
							} as any;

							href = makeUrl(data);

							data.url = href;
						}

						currentVolume
							.chapter_list
							.push({
								chapter_index: currentVolume.length,
								chapter_title: a.text().replace(/^\s+|\s+$/g, ''),
								chapter_id: data.chapter_id,
								chapter_url: href,
								chapter_url_data: data,
								chapter_date,
							})
						;
					}
				})
			;

			_cache_dates.sort();

			let novel_date = moment.unix(_cache_dates[_cache_dates.length - 1]).local();

			let a = await fromURL(`https://${url_data.novel_r18 ? 'narou18' : 'narou'}.dip.jp/search.php?text=${url_data.novel_id}&novel=all&genre=all&new_genre=all&length=0&down=0&up=100`, defaultJSDOMOptions)
				.then(function (dom)
				{
					let data: IMdconfMeta = {};

					let h2 = dom.$(`div:has(> h2.search:has(> a[href*="${url_data.novel_id}"]))`).eq(0);

					let search_left = h2.siblings('.search_left').eq(0);
					let search_right = h2.siblings('.search_right').eq(0);

					if (!h2.length)
					{
						return data;
					}

					//console.log(search_left);
					//console.log(search_right);

					data.novel = {};

					data.novel.status = search_left.find('.novel_type').text();
					data.novel.tags = [];

					search_right.find('.keyword a')
						.each(function (index, elem)
						{
							let k = dom.$(elem).text();

							data.novel.tags = data.novel.tags.concat(k.split('/'));
						})
					;

					// @ts-ignore
					data.link = [];
					// @ts-ignore
					data.link.push(`[dip.jp](${dom.source_url}) - 小説家になろう　更新情報検索`);

					//console.log(data);

					return data;
				})
				.catch(function (e)
				{
					console.error(e);
					console.error(`can't download novel extra info`);

					return {};
				})
			;

			return {

				...a,

				url: dom.url.href,
				url_data,

				novel_title,
				novel_author,

				novel_desc,
				novel_date,
				novel_publisher,

				novel_syosetu_id,

				volume_list,

				checkdate: moment().local(),

				imgs: [] as string[],
			};
		})
		;
}

export function makeUrl(urlobj, bool?: boolean)
{
	let subdomain = urlobj.novel_r18 ? 'novel18' : 'ncode';

	if (urlobj.novel_pid && urlobj.chapter_id)
	{
		let cid = (!bool && urlobj.chapter_id) ? '&cid=' + urlobj.chapter_id : '';

		return `https://${subdomain}.syosetu.com/txtdownload/dlstart/ncode/${urlobj.novel_pid}/?no=${urlobj.chapter_id}&hankaku=0&code=utf-8&kaigyo=crlf`;
	}

	let pad = (!bool && urlobj.chapter_id) ? urlobj.chapter_id : '';

	return `http://${subdomain}.syosetu.com/${urlobj.novel_id}/${pad}`;
}

export function parseUrl(url)
{
	let urlobj = {
		url: url,

		novel_pid: null,
		novel_id: null,
		chapter_id: null,

		novel_r18: null,
	};

	url = url.toString();

	let r: RegExp;
	let m;

	r = /(novel18)\.syosetu\.com/;
	if (m = r.exec(url))
	{
		urlobj.novel_r18 = m[1];

		return urlobj;
	}

	r = /txtdownload\/dlstart\/ncode\/(\d+)/;
	if (m = r.exec(url))
	{
		urlobj.novel_pid = m[1];

		return urlobj;
	}

	r = /\.syosetu\.com\/(n\w+)(?:\/?(\d+))?/;
	if (m = r.exec(url))
	{
		urlobj.novel_id = m[1];
		urlobj.chapter_id = m[2];

		return urlobj;
	}

	return urlobj;
}

export async function download(url: string, downloadOptions: {
	/**
	 * 不使用小說家提供的 txt 下載連結
	 */
	disableTxtdownload?: boolean,
	/**
	 * 只產生目錄結構 不下載內容
	 */
	disableDownload?: boolean,
} = {})
{
	{
		let data = parseUrl(url);

		if (!data.novel_id)
		{
			throw new ReferenceError();
		}

		url = makeUrl(data, true);
	}

	let novel = await get_volume_list(url);

	console.log(novel);

	let idx = 0;

	let path_novel = path.join(PATH_NOVEL_MAIN,
		`${trimFilename(novel.novel_title)}_(${novel.url_data.novel_id})`
	);

	fetch.retry((tries) => tries <= 3);

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
					let cid = chapter.chapter_index.toString().padStart(4, '0') + '0';

					let pad = chapter.chapter_date.format('YYYYMMDDHHmm');

					let file = path.join(dirname,
						`${cid}_${trimFilename(chapter.chapter_title)}\.${pad}${ext}`
					);

					if (fs.existsSync(file))
					{
						//console.log(`skip\n${volume.volume_title}\n${chapter.chapter_title}`);
					}
					else
					{
						console.log(`${chapter.chapter_title} ${pad}`);
					}

					let tryc = 0;
					let fn;

					if (downloadOptions.disableDownload)
					{
						fn = async function ()
						{
							return '';
						};
					}
					else if (!downloadOptions.disableTxtdownload)
					{
						fn = async function ()
						{
							tryc++;

							return await fetch.single(chapter.chapter_url, {
									type: 'text',
									method: 'POST',
								})
								.catch(function (e)
								{
									if (tryc > 3)
									{
										return Promise.reject(e);
									}

									console.warn(`wait 25s\n${volume.volume_title}\n${chapter.chapter_title}`);

									return new Promise(function (done)
									{
										setTimeout(done, 25000);
									})
										.then(fn)
										;
								})
								;
						};
					}
					else
					{
						let url = makeUrl({
							chapter_id: chapter.chapter_id,
							novel_id: novel.url_data.novel_id,
						});

						//console.log(url);

						fn = async function ()
						{
							return fromURL(url, defaultJSDOMOptions)
								.then(async function (dom)
								{
									return [
										dom.$('#novel_p').text(),
										dom.$('#novel_honbun').text(),
										dom.$('#novel_a').text(),
									].join('\n\n==================\n\n');
								})
								;
						};
					}

					let text = await fn()
						.then(async function (text)
						{
							fs.outputFile(file, text);

							return text;
						})
					;

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

export default download;
