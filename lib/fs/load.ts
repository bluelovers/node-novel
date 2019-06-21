/**
 * Created by user on 2019/6/21.
 */

import * as fs from 'fs-iconv';
import Bluebird = require('bluebird');
import chkUTF8 from './not-utf8';
import { BufferFrom } from 'iconv-jschardet';
import { ITSRequiredWith, ITSRequireAtLeastOne, ITSOverwrite } from 'ts-type';

interface IOptions
{
	chkEncoding?: boolean,
	idfile?: string,
	returnBuffer?: boolean;
}

export function contextEmpty(buf: Buffer | string)
{
	if (buf && buf.length && buf.toString() !== '')
	{
		return false;

		/*
		buf = buf.toString()
			.replace(/^\s+|\s+$/g, '')
		;

		return buf.length > 0
		 */
	}

	return true;
}

export function loadFileAutoDecode(file: string, options: ITSOverwrite<IOptions, {
	returnBuffer: true,
}>): Bluebird<Buffer>
export function loadFileAutoDecode(file: string, options?: IOptions): Bluebird<string>
export function loadFileAutoDecode(file: string, options: IOptions = {}): Bluebird<string | Buffer>
{
	let { idfile, chkEncoding, returnBuffer } = _options(file, options);

	return fs.loadFile(file, {
		autoDecode: true,
	}).then((buf) => {
		return _core({
			idfile,
			buf,
			chkEncoding,
			returnBuffer,
		});
	})
}

export function loadFileAutoDecodeSync(file: string, options: ITSOverwrite<IOptions, {
	returnBuffer: true,
}>): Buffer
export function loadFileAutoDecodeSync(file: string, options?: IOptions): string
export function loadFileAutoDecodeSync(file: string, options: IOptions = {})
{
	let { idfile, chkEncoding, returnBuffer } = _options(file, options);

	let buf = fs.loadFileSync(file, {
		autoDecode: true,
	});

	return _core({
		idfile,
		buf,
		chkEncoding,
		returnBuffer,
	})
}

function _options(file: string, options: IOptions)
{
	let { idfile = file, chkEncoding = true, returnBuffer } = options || {};

	return {
		idfile,
		chkEncoding,
		returnBuffer,
	}
}

function _core({
	idfile,
	buf,
	chkEncoding,
	returnBuffer,
} : IOptions & {
	buf: Buffer | string
})
{
	if (chkEncoding && buf.length)
	{
		chkUTF8(idfile, buf)
	}

	if (returnBuffer && typeof buf === 'string')
	{
		return Buffer.from(buf)
	}

	return buf;
}
