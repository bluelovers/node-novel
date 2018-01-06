/**
 * Created by user on 2017/12/6/006.
 */

import fetch from 'lets-fetch';
import { JSDOM, VirtualConsole } from 'jsdom';
import * as cheerio from 'cheerio';
import * as shortid from 'shortid';
import { parseUrl, makeUrl } from './';
import * as moment from 'moment-timezone';

export async function download(data, options?)
{
	let url;

	if (typeof data == 'string')
	{
		data = parseUrl(data);
	}
	else if (data)
	{
		data.url = makeUrl(data);
	}

	let _data = {} as any;
	let $ = cheerio.load('');
	let virtualConsole = new VirtualConsole();

	url = data.url;

	//console.log('download', url, data);

	return await JSDOM
		.fromURL(url, {
			runScripts: "dangerously",
			virtualConsole,
		})
		.then(async (dom) =>
		{
			let window = dom.window;

			let chapter_name = window.g_chapter_name
				.replace(/\\/ig, '')
				.replace(/^[\s\uFEFF\xA0　]+|[\s\uFEFF\xA0　]+$/g, '')
			;
			let volume_name = window.document
				.querySelector('#page_contents .tit')
				.innerHTML
				.replace(/\\/ig, '')
				.replace(chapter_name, '')
				.replace(/^[\s\uFEFF\xA0　]+|[\s\uFEFF\xA0　]+$/g, '')
			;

			_data = {

				url: url,

				data: {
					g_lnovel_id: window.g_lnovel_id,
					g_volume_id: window.g_volume_id,
					g_chapter_id: window.g_chapter_id,

					g_lnovel_name: window.g_lnovel_name,
					g_volume_name: volume_name,
					g_chapter_name: chapter_name,

					chapter_name: chapter_name,
					volume_name: volume_name,
				},

				value: null,

			};

			let pa = [];

			pa[0] = dom.window.document.querySelector("#chapter_contents_first").innerHTML;

			if (dom.window.g_chapter_pages_count > 1)
			{
				let ua = (dom.window.g_chapter_pages_url as Array<string>)
					.filter(function (value)
					{
						return value;
					})
					.map(function (value, index, array)
					{
						if (value)
						{
							value = 'http://q.dmzj.com/' + value;
						}

						return value;
					})
				;

				let r = await fetch.many(ua, {
					type: 'text',
				});

				pa = pa.concat(r);
			}

			return pa;
		})
		.then(function (pa)
		{
			_data.imgs = [];

			pa = pa.map(function (value)
			{
				let _c = {};

				//let $ = cheerio.load(value);

				let _a = $(value);

				let _img = _a.find('img');

				//console.log(_img.length);

				if (_img.length)
				{
					_img.each(function(index, elem)
					{
						let _this = $(this);

						if (_this.prop('src'))
						{
							let id = shortid();

							_c[id] = _this.prop('src');
							_data.imgs.push(_c[id]);

							$(`<span>{{@${id}@}}</span>`).insertAfter(this);

							$(this)
								.remove()
							;
						}
					});

					//console.log($.html());
				}

				let _t = _a.text();

				for (let id in _c)
				{
					if (!/^(?:[a-z]\:|\:)?\/\//i.test(_c[id]))
					{
						_c[id] = 'http://q.dmzj.com/' + _c[id];
					}

					_t = _t.replace(`{{@${id}@}}`, `\n\n<img src="${_c[id]}"/>\n\n`);
				}

				return _t;
			});

			return pa.join();
		})
		.then(function (html)
		{
			return html
				.replace(/^\s*(?:<p>)?/i, '')
				.replace(/\s*<(?:\/?p|br\/?)>\s*$/i, '')
				.replace(/\r\n|\r(?!\n)/g, "\n")
				//.replace(/<\/p><p>\n/ig, "\n")
				//.replace(/<p><\/p>/ig, "\n")
				//.replace(/(<\/p>|<p>)\n/ig, "\n")
				.replace(/[\t\uFEFF\xA0　]+(\n|$)/ig, "$1")
				.replace(/(\n)[\t]+/ig, "$1")
				.replace(/\s+$/ig, "")
				.replace(/\n{3,}/ig, "\n\n")
			;
		})
		.then(function (html)
		{
			_data.value = html;
			_data.checkdate = moment().tz(moment.tz.guess());

			return _data;
		})
		;
}

export default exports;
