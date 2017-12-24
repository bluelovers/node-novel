/**
 * Created by user on 2017/12/22/022.
 */

import { JSDOM, VirtualConsole } from 'jsdom';
import * as cheerio from 'cheerio';
import { URL } from 'whatwg-url';
import * as jQuery from 'jquery';
//import * as self from './index';

export interface URL
{
	href,
	origin,
	protocol,
	username,
	password,
	host,
	hostname,
	port,
	pathname,
	search,
	hash,
	searchParams,

	toJSON(),
}

export { JSDOM, VirtualConsole, cheerio }

export interface ICheerioJSDOM
{
	source_url: string,

	jsdom: JSDOM,
	window: Window,
	document: Document,

	virtualConsole: VirtualConsole,
	//$: cheerio,
	$(selector): JQuery<HTMLElement>,
}

export function cheerioJSDOM(url: string, options: any = {}): Promise<ICheerioJSDOM>
{
	options = Object.assign({
		runScripts: "dangerously",
		virtualConsole: new VirtualConsole(),
	}, options);

	return JSDOM
		.fromURL(url, options)
		.then(function (dom: JSDOM)
		{
			return {
				source_url: url,

				jsdom: dom,

				window: dom.window,
				document: dom.document,

				virtualConsole: options.virtualConsole,

				//$: cheerio.load(dom.serialize()),

				// @ts-ignore
				$: jQuery(dom.window),

			};
		})
	;
}

export function fromURL(url: string, options = {})
{
	const parsedURL: URL = new URL(url);

	console.log(parsedURL.hash);
	console.log(parsedURL);
}

export default cheerioJSDOM;
//export default exports;
