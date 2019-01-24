/**
 * Created by user on 2018/1/7/007.
 */

import * as globby from 'globby';
import * as fs from 'fs-extra';
import path from 'upath2';
import * as StrUtil from 'str-util';
import * as execall from 'execall2';
import novelText from 'novel-text';
//import * as Promise from 'bluebird';
import * as iconv from 'iconv-jschardet';
import fsIconv, { trimFilename } from 'fs-iconv';
import { console } from 'debug-color2';
console.enabledColor = true;

export interface IOptions
{
	file?: string,
	outDir?: string,

	volume?: ISplitOption,
	chapter?: ISplitOption,

	dirname?: string,
	ix?: number,

	readFileAfter?(txt: string): string | void,
}

export interface ISplitOption
{
	r: RegExp,
	cb?: ISplitCB,
}

export function makeOptions(inputFile: string, options: IOptions): IOptions
{
	let cache = Object.assign({
		file: inputFile,
		dirname: null,

		outDir: null,
	}, options);

	cache.dirname = path.dirname(cache.file);

	return cache;
}

export async function autoFile(inputFile: string, options: IOptions)
{
	let ret = await readFile(inputFile, options);

	let ls: string[] = await outputFile(ret);

	return Object.assign(ret, {
		ls,
	});
}

export async function readFile(inputFile: string, options: IOptions)
{
	let cache = makeOptions(inputFile, options);

	let txt: string = await fsIconv.readFile(cache.file)
		.then(function (data)
		{
			{
				let chk = iconv.detect(data);

				if (chk.encoding != 'UTF-8')
				{
					console.error(cache.file, '此檔案可能不是 UTF8 請檢查編碼或利用 MadEdit 等工具轉換', chk);
				}
			}

			return novelText.trim(data);
		})
		.then(async (txt) => {

			if (options.readFileAfter)
			{
				let ret = await options.readFileAfter(txt);

				if (typeof ret === 'string')
				{
					return ret;
				}
			}

			return txt;
		})
	;

	let data = await split_volume(txt, cache);

	//console.log(Object.keys(data));

	//process.exit();

	return {
		options: cache,
		data,
	};
}

export async function outputFile(data, options?: IOptions): Promise<string[]>
{
	if (data.data)
	{
		options = Object.assign({}, data.options, options);
		data = data.data;
	}

	options = makeOptions(options.file, options);

	let path_main = options.outDir || path.join(options.dirname, 'out');

	let ls = [];

	for (let vn in data)
	{
		for (let cn in data[vn])
		{
			let file = path.join(trimFilename(vn), trimFilename(cn) + '.txt');

			await fs.outputFile(path.join(path_main, file), data[vn][cn]);

			ls.push(file);
		}
	}

	return ls;
}

export function fix_name(name: string): string
{
	name = novelText.trim(name, {
		trim: true,
	}).trim()
	//.replace('章', '話')
	;

	if (!/^\d+/.test(name))
	{
		name = StrUtil.zh2num(name).toString();
	}

	name = name
	//.replace(/^(\d+)[\-話话\s]*/, '$1　')
		.replace(/[“”]/g, '')
	;

	name = StrUtil.zh2jp(name);

	//console.log([name]);

	return name;
}

export function split_volume(txt: string, cache: IOptions): {
	[key: string]: {
		[key: string]: string
	};
}
{
	let _vs;

	if (cache.volume)
	{
		let _r = cache.volume.r;

		let _m = execall(_r, txt);

		//console.debug(_r, _m, txt);

		if (!_m || !_m.length)
		{
			throw new Error();
		}

		//console.log(_r, _m, _r.test(txt));

		_vs = split(txt, cache, _m, cache.volume.cb);
	}
	else
	{
		_vs = {};
		_vs['00000_unknow'] = txt;
	}

	let _out = {};

	cache.ix = 0;

	for (let vn in _vs)
	{
		let txt = _vs[vn];

		let _r = cache.chapter.r;
		let _m = execall(_r, txt);

		//console.log(_r, _m, txt);

		//console.log(cache.ix);

		if (!_m || !_m.length)
		{
			let id = (cache.ix++).toString().padStart(4, '0') + '0';

			_out[vn] = {};

			_out[vn][`${id}_unknow`] = txt;

			continue;
		}

		let _cs = split(txt, cache, _m, cache.chapter.cb);

		_out[vn] = {};

		for (let cn in _cs)
		{
			_out[vn][cn] = _cs[cn];
		}
	}

	//console.log(_out);

	return _out;
}

export interface ISplitCB extends Function
{
	({
		i,
		id,
		name,
		m,
		m_last,
		_files,
		ii,
		cache,
		idx,
	}): {
		id,
		name,
		idx,
	};
}

export function split(txt: string, cache: IOptions, _m, cb: ISplitCB): {
	[key: string]: string,
}
{
	let _files = {};
	let idx = 0;

	let m_last;

	let i;
	let ix = cache.ix || 0;
	let ii;

	for (i in _m)
	{
		ii = (parseInt(i) + ix).toString();

		let m = _m[i];

		if (!m_last && idx == 0 && m.index != 0)
		{
			//console.log(m);

			let id = ii.padStart(4, '0') + '0';
			let name = 'unknow';

			if (cb)
			{
				let _ret = cb({
					i,
					id,
					name,
					m,
					m_last,
					_files,
					ii,
					cache,
					idx,
				});

				if (_ret)
				{
					id = _ret.id;
					name = _ret.name;
					idx = _ret.idx;
				}
			}

			name = id + '_' + name;

			let txt_clip = txt.slice(idx, m.index);

			if (txt_clip)
			{
				_files[name] = txt_clip;

				idx = m.index;
			}
		}
		else if (m_last)
		{
			let id = ii.padStart(4, '0') + '0';
			let name = fix_name(m_last.match);

			if (cb)
			{
				let _ret = cb({
					i,
					id,
					name,
					m,
					m_last,
					_files,
					ii,
					cache,
					idx,
				});

				if (_ret)
				{
					id = _ret.id;
					name = _ret.name;
					idx = _ret.idx;
				}
			}

			//console.log(id, name, _ret);

			name = id + '_' + name;

			//console.log([name]);

			//name = `${id}_Act：${StrUtil.toFullWidth(i.padStart(3, '0'))}`;

			let txt_clip = txt.slice(idx, m.index);

			if (txt_clip)
			{
				_files[name] = txt_clip;

				idx = m.index;
			}
		}

		m_last = m;
	}

	if (idx < txt.length - 1)
	{
		ii = (parseInt(i) + ix + 1).toString();

		let id = ii.padStart(4, '0') + '0';
		let name = fix_name(m_last.match);

		if (cb)
		{
			let m;

			let _ret = cb({
				i,
				id,
				name,
				m,
				m_last,
				_files,
				ii,
				cache,
				idx,
			});

			if (_ret)
			{
				id = _ret.id;
				name = _ret.name;
				idx = _ret.idx;
			}
		}

		name = (id !== '' ? id + '_' : '') + name;

		_files[name] = txt.slice(idx);
	}

	cache.ix = parseInt(ii) + 1;

	return _files;
}


export default exports as typeof import('./txt-split');
