/**
 * Created by user on 2019/6/21.
 */

import _ic from 'iconv-jschardet/not-utf8';
import { console } from 'debug-color2';

export function chkUTF8(idfile: string, buf: Buffer | string)
{
	let chk = _ic.notUTF8(buf);

	if (chk)
	{
		console.red(idfile, '此檔案可能不是 UTF8 或無法自動轉換為 UTF8 請檢查編碼或利用 MadEdit 等工具轉換', chk);

		return chk;
	}

	return null;
}

export default chkUTF8
