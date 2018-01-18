/**
 * Created by user on 2018/1/17/017.
 */

import { trimFilename } from '../../lib/func';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as Promise from 'bluebird';
import * as fetch from 'node-fetch';

export async function download_image(img, options: {
	name?: string,

	dir?: string,
	fromfile?: string,

	prefix?: string,
})
{
	let dirname = options.dir || path.dirname(options.fromfile);

	if (!dirname)
	{
		throw new Error();
	}

	let filename = options.name || path.basename(img);

	if (typeof options.prefix == 'string')
	{
		filename = options.prefix + filename;
	}

	filename = trimFilename(filename);

	await fs.ensureDir(dirname);

	return await fetch(img)
		.then(function(res) {
			let dest = fs.createWriteStream(path.join(dirname, filename));
			res.body.pipe(dest);
		});
}

export default download_image;
//export default exports;
