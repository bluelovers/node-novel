/**
 * Created by user on 2018/1/14/014.
 */

import * as iconvLite from 'iconv-lite';
import * as fs from 'fs-extra';
import path from 'upath2';
import * as Promise from 'bluebird';
import * as jschardet from 'jschardet';

export async function readFile(inputFile: string, options: {
	debug?: boolean,

	to?: string,
} = {})
{
	options = Object.assign({
		to: 'UTF-8',
	}, options);

	return await fs.readFile(inputFile)
		.then(function (data)
		{

				let chk = jschardet.detect(data);

				if (chk.encoding != options.to)
				{
					let _do;

					switch (chk.encoding)
					{
						case 'UTF-16LE':
							_do = true;

							data = iconvLite.encode(iconvLite.decode(data, chk.encoding), options.to);

							break;
					}

					if (!_do)
					{
						console.error(inputFile, '此檔案可能不是 UTF8 請檢查編碼或利用 MadEdit 等工具轉換', chk);
					}
					else if (options.debug)
					{
						console.info(inputFile, `${chk.encoding} => ${options.to}`);
					}
				}


			return data;
		})
	;
}

import * as self from './iconv';
export default self;
