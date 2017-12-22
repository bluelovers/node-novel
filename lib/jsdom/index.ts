/**
 * Created by user on 2017/12/22/022.
 */

import { JSDOM, VirtualConsole } from 'jsdom';
import * as cheerio from 'cheerio';
//import * as self from './index';

export { JSDOM, VirtualConsole, cheerio }

export interface ICheerioJSDOM
{
	source_url: string,

	jsdom: JSDOM,
	window: Window,
	document: Document,

	virtualConsole: VirtualConsole,
	$: cheerio,
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

				$: cheerio.load(dom.serialize()),
			} as ICheerioJSDOM;
		})
	;
}

export default cheerioJSDOM;
//export default exports;
