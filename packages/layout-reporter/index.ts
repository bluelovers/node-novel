/**
 * Created by user on 2019/7/18.
 */

import { execall, IMatchesRow } from 'execall2';
import { naturalCompare } from "@bluelovers/string-natural-compare";
import { array_unique } from 'array-hyper-unique';
import { ITSOverwrite, ITSPartialWith } from 'ts-type';
import { arrayChunkMap } from 'array-chunk-split';
import { fixJaKey } from './lib/util';

export interface ICacheSource
{
	/**
	 * 待修正屏蔽字
	 */
	block2: Record<string, IMatchesRow[]>,
	/**
	 * ja.md / 含有日文的章節段落
	 */
	ja: Record<string, IMatchesRow[]>,
	/**
	 * ja2.md / 未加入整合的日文 / 待整合的日文
	 */
	ja2: Record<string, string[]>,
}

export interface ICacheOutput
{
	/**
	 * 待修正屏蔽字
	 */
	block2: Record<string, Record<string, string[]>>,
	/**
	 * ja.md / 含有日文的章節段落
	 */
	ja: Record<string, string[]>,
	/**
	 * ja2.md / 未加入整合的日文 / 待整合的日文
	 */
	ja2: Record<string, string[]>,
}

export interface IOptions
{
	input: string,
	_cache: ICacheSource,
	_cache_key_: string,
}

export interface IOptionsOutput extends IOptions
{
	_cache_output: ICacheOutput,
}

const MAX = 5;

export function dummyCache<T extends Partial<ICacheSource>>(data: T): ITSOverwrite<T, ICacheSource>
export function dummyCache(data?): ICacheSource
export function dummyCache<T extends Partial<ICacheSource>>(data?: T)
{
	const ret: ICacheSource = {
		block2: {},
		ja: {},
		ja2: {},
	};

	if (data != null)
	{
		return Object.assign(ret, data)
	}

	return ret;
}

export function analyzeJa001(data: IOptions)
{
	const RE_JA_001 = new RegExp(`^[^\\nぁ-んァ-ヴーｱ-ﾝﾞ]*?([『「]*[ぁ-んァ-ヴーｱ-ﾝﾞｰ]{2,}[」』]*(?:[『「？、…。＋０-９Ａ-Ｚａ-ｚ（）！]*[ぁ-んァ-ヴーｱ-ﾝﾞｰ]*[」』]*)*)[^\\n]*?$`, 'uigm');

	let _m = execall(RE_JA_001, data.input, {
		removeHiddenData: true,
	}) as (IMatchesRow & {
		order?: number
	})[];

	if (_m && _m.length)
	{
		const { _cache_key_, _cache } = data;

		_m = _m
			.filter(function (m)
			{
				return (m.sub[1] != 'の' && m.sub[0].length >= 2);
			})
			.map(function (m, index)
			{
				m.order = index;

				return m;
			})
			.sort(function (a, b)
			{
				return 0 - (a.sub[0].length - b.sub[0].length);
			})
		;

		_m = arrayChunkMap({
			inputArray: _m,
			maxChunkLength: MAX,
		})
			.sort(function (a, b)
			{
				return a.order - b.order;
			})
		;

		if (_m.length)
		{
			if (_cache.ja[_cache_key_])
			{
				_cache.ja[_cache_key_].push(..._m);
			}
			else
			{
				_cache.ja[_cache_key_] = _m;
			}

			return data;
		}
	}
}

export function handleJa001(_data: ICacheSource["ja"]): ICacheOutput["ja"]
{
	return Object.keys(_data)
		.reduce((a, b) =>
		{

			a[b] = a[b] || [];

			for (let m of _data[b])
			{
				a[b].push(m.match);
			}

			return a;
		}, {} as ICacheOutput["ja"])
}

export function analyzeJa002(data: IOptions)
{
	const RE_JA_002 = new RegExp(/(?<![ァ-ヴーｱ-ﾝﾞｰ])([ァ-ヴーｱ-ﾝﾞｰ]{2,}(?:[・＝=＝]+[ァ-ヴーｱ-ﾝﾞｰ]+)*)(?![ァ-ヴーｱ-ﾝﾞｰ])/iug, 'uig');

	let _m = execall(RE_JA_002, data.input, {
		leftContext: true,
		rightContext: true,
		removeHiddenData: true,
	});

	const LIMIT = MAX * 2;

	if (_m && _m.length)
	{
		const { _cache_key_, _cache } = data;

		const _temp: ICacheSource["ja2"] = {};

		for (let m of _m)
		{
			let k = fixJaKey(m[1]);

			if (!k)
			{
				continue;
			}

			_temp[k] = _temp[k] || [];

			if (_temp[k].length > LIMIT)
			{
				continue;
			}

			let line = [
					m.leftContext
						.split('\n')
						.pop(),
					k,
					m.rightContext
						.split('\n')
						.shift(),
				].join('')
				.replace(/^\s+|\s+$/g, '')
			;

			_temp[k].push(line)
		}

		Object.entries(_temp)
			.forEach(([k, v]) => {

				if (_cache.ja2[k])
				{
					_cache.ja2[k].push(...v);
				}
				else
				{
					_cache.ja2[k] = v;
				}
			})
		;

		return data;
	}
}

export function handleJa002(_data: ICacheSource["ja2"]): ICacheOutput["ja2"]
{
	return Object.entries(_data)
		.sort(function (a, b)
		{
			return naturalCompare(a[0], b[0])
		})
		.reduce((a, b) =>
		{

			let arr = array_unique(b[1]);

			if (arr.length > MAX * 2)
			{
				let c0 = arr.shift();
				let c2 = arr.pop();

				let ret: string[] = [c0];

				let j = Math.floor(arr.length / (MAX));
				let j2 = MAX - 2;

				for (let i = j; i < arr.length; i++)
				{
					ret.push(arr[i]);

					if (--j2 <= 0)
					{
						break;
					}
					else
					{
						i += j;
					}
				}

				ret.push(c2);

				arr = ret;
			}

			a[b[0]] = arrayChunkMap({
				inputArray: arr,
				maxChunkLength: MAX,
			});

			return a;
		}, {} as ICacheOutput["ja2"])
}

export function analyzeBlock002(data: IOptions)
{
	const RE_BLOCK_002 = /([^\n\*]{0,3})?([^\n\*]\*{2,}[^\n\*])([^\n\*]{0,3})?/uig;

	let _m = execall(RE_BLOCK_002, data.input, {
		removeHiddenData: true,
	});

	if (_m && _m.length)
	{
		const { _cache_key_, _cache } = data;

		if (_cache.block2[_cache_key_])
		{
			_cache.block2[_cache_key_].push(..._m);
		}
		else
		{
			_cache.block2[_cache_key_] = _m;
		}

		return data;
	}
}

export function handleBlock002(_data: ICacheSource["block2"]): ICacheOutput["block2"]
{
	_data = Object.keys(_data)
		.reduce(function (a, b)
		{
			let cache_ab = a[b] || {};

			for (let m of _data[b])
			{
				if (!m.match)
				{
					continue;
				}

				let key: string = m.sub[1]
					.replace(/^[ 　・\.\'\"\:\-\+\=]+|[ 　・\.\'\"\:\-\+\=]+$/g, '')
					.toLowerCase()
				;

				if (/^\d+(?:\.\d+)?$|^([a-z])\1+$/i.test(key) || key.length == 1)
				{
					continue;
				}

				cache_ab[key] = cache_ab[key] || [];

				cache_ab[key].push(m.match);
			}

			let bool: boolean;

			for (let m in cache_ab)
			{
				cache_ab[m].sort();
				bool = true;
			}

			if (bool)
			{
				a[b] = cache_ab;
			}

			return a;
		}, {})
	;

	return Object.keys(_data)
		.reduce((a, b) =>
		{

			a[b] = a[b] || {};

			for (let k in _data[b])
			{
				a[b][k] = a[b][k] || [];

				for (let m of _data[b][k])
				{
					a[b][k].push(m);
				}
			}

			return a;
		}, {} as ICacheOutput["block2"])
}

export function lazyAnalyzeAll(data: ITSPartialWith<IOptions, '_cache'> | IOptions)
{
	data._cache = dummyCache(data._cache);

	analyzeJa001(data as IOptions);
	analyzeJa002(data as IOptions);
	analyzeBlock002(data as IOptions);

	return <IOptions>data
}

export function lazyAnalyzeReportAll(data: ITSPartialWith<IOptions, '_cache'> | IOptions)
{
	data = lazyAnalyzeAll(data);

	let _cache_output: ICacheOutput = {
		block2: handleBlock002(data._cache.block2),
		ja: handleJa001(data._cache.ja),
		ja2: handleJa002(data._cache.ja2),
	};

	return <IOptionsOutput>{
		...data,
		_cache_output,
	}
}

export default lazyAnalyzeReportAll
