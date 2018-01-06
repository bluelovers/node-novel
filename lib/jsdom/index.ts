/**
 * Created by user on 2017/12/22/022.
 */

import { JSDOM, VirtualConsole } from 'jsdom';
import * as cheerio from 'cheerio';
import { URL as WURL } from 'whatwg-url';
import * as jQuery from 'jquery';
//import * as self from './index';
import * as deepmerge from 'deepmerge';

class URL extends WURL
{
	href: string;
	origin: string;
	protocol: string;
	username: string;
	password: string;
	host: string;
	hostname: string;
	port: string;
	pathname: string;
	search: string;
	hash: string;
	searchParams: string;

	constructor(href: string, base?)
	constructor(href: URL, base?)
	constructor(href, base?)
	{
		if (href instanceof WURL)
		{
			href = href.href;
		}
		if (base instanceof WURL)
		{
			base = base.href;
		}

		super(href.toString(), base.toString());
	}

	static create(href, base?)
	{
		return new this(href, base);
	}

	toString()
	{
		return this.href;
	}
}

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
