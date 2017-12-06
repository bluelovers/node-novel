/**
 * Created by user on 2017/12/6/006.
 */

import { trimFilename } from '../../../lib/func';

export { trimFilename };

export function makeUrl(urlobj, page?)
{

	if (!urlobj.chapter_id)
	{
		if (!urlobj.volume_id)
		{
			return `http://q.dmzj.com/${urlobj.novel_id}/index.shtml`;
		}

		return `http://q.dmzj.com/${urlobj.novel_id}/${urlobj.volume_id}/${urlobj.volume_id}.txt`;
	}

	return `http://q.dmzj.com/${urlobj.novel_id}/${urlobj.volume_id}/${urlobj.chapter_id}${page
		? '_' + page
		: ''}.shtml`;
}

/**
 *
 * @param url
 * @returns {{url: string; novel_id: null; volume_id: null; chapter_id: null}}
 */
export function parseUrl(url: string)
{
	let urlobj = {
		url: url,

		novel_id: null,
		volume_id: null,
		chapter_id: null,
	};

	let r = /(?:q\.dmzj\.com\/|^\/)(?:(\d+)\/(?:(\d+)\/(?:(\d+)[\._])?)?)/;

	let m = r.exec(url.toString());

	if (m)
	{
		urlobj.novel_id = m[1];
		urlobj.volume_id = m[2];
		urlobj.chapter_id = m[3];
	}

	return urlobj;
}

export default exports;
