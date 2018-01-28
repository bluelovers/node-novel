/**
 * Created by user on 2017/12/22/022.
 */

import { JSDOM, VirtualConsole } from 'jsdom';
import * as cheerio from 'cheerio';
import { URL } from 'jsdom-url';
import * as jQuery from 'jquery';
//import * as self from './index';
import * as deepmerge from 'deepmerge';

export { URL }

export { JSDOM, VirtualConsole, cheerio }

export interface ICheerioOptions
{
	userAgent?: string,
	referrer?: string,
	cookieJar?: string,

	requestOptions?;

	runScripts?: boolean;
	virtualConsole?: VirtualConsole,
}

export interface ICheerioJSDOM
{
	source_url: string,

	jsdom: JSDOM,
	window: Window,
	document: Document,

	virtualConsole: VirtualConsole,
	//$: cheerio,
	$(selector, context?): JQuery<HTMLElement>,
}

export function cheerioJSDOM(url: string, options: ICheerioOptions = {}): Promise<ICheerioJSDOM>
{
	options = Object.assign({
		runScripts: 'dangerously',
		virtualConsole: new VirtualConsole(),
	}, options);

	return JSDOM
		.fromURL(url, options)
		.then(function (dom: JSDOM)
		{
			let obj = {
				source_url: url,
				jsdom: dom,

				virtualConsole: options.virtualConsole,

				$: jQuery(dom.window),
			};

			Object.defineProperties(obj, {

				window: {
					get()
					{
						return dom.window;
					},
				},

				document: {
					get()
					{
						return dom.window.document;
					},
				},

			});

			return obj;
		})
	;
}

export default cheerioJSDOM;
//export default exports;
