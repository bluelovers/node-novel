/**
 * Created by user on 2018/1/25/025.
 */

import * as StrUtil from 'str-util';

export function filename(name: string): string
{
	return jp(name)
		.replace(/·/g, '・')
		;
}

export function word(name: string): string
{
	return jp(name);
}

export function jp(txt: string): string
{
	return zh(StrUtil.zh2jp(txt, {
		skip: '龙竜龍制征里像',
		}))
		.replace(/诅/g, '詛')
		.replace(/复仇/g, '復仇')
		;
}

export function zh(txt: string): string
{
	return txt
		.replace(/与/g, '與')
		.replace(/[亜亚亞]/g, '亞')
		.replace(/価/, '價')
		.replace(/[觉覚覺]/g, '覺')
		.replace(/亏/g, '虧')
		//.replace(/当/g, '當')
		;
}
