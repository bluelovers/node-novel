/**
 * Created by user on 2018/1/31/031.
 */

import { IWords } from '../index';
import sublib from './';

export const SP_KEY = '#_@_#';
export const SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・。·])';

export const SP_ESCAPE = '（河蟹）';

/**
 * 和諧/河蟹
 *
 * @type {string[][]}
 */
export const table = [
	'噁心',
	'触手',
	'白痴',
	'打倒',
	'固守',
	'貴族',
	'自由',
	'討伐',
	'竊聽',
	'色情',
	'禁止',
	'淫穢',
	'下流',
	'含著',
	'調教',
	'情欲',
	'尸体',
	'凌辱',
	'幹掉',
	'非法',
	'激烈',
	'互毆',
	'求愛',
	'間諜',
	'賭局',
	'下賤',
	'爆炸',
	'呻吟',
	'屁股',
	'笨蛋',
	'蠢货',
	'洗脑',
	'魅惑',
	'狂化',
	'混乱',
	'是非',
	'弱智',
	'死掉',
	'日本',
	'法克',
	'畜生',
	'麻痹',
	'废物',
];

/**
 * 去和諧時會以第一個項目為返回結果
 *
 * @type {string[][]}
 */
export const table2 = [
	['裸体', '果体',],
];

export function escape(text: string, count = 1)
{
	let t = table2
		.reduce(function (a, b)
		{
			if (Array.isArray(b))
			{
				a = a.concat(b);
			}
			else
			{
				a.push(b);
			}

			return a;
		}, [])
		.concat(table)
	;

	do
	{
		t.forEach(function (value: string, index, array)
		{
			let rs = sublib._word_zh(value, value, 'ig')[0];
			let r = new RegExp(rs as string, 'ig');

			text = text.replace(r, value.split('').join(SP_ESCAPE));
		});
	}
	while (--count > 0)

	return text;
}

export function unescape(text: string)
{
	let t = table2
		.reduce(function (a, b)
		{
			if (Array.isArray(b))
			{
				a = a.concat(b);
			}
			else
			{
				a.push(b);
			}

			return a;
		}, [])
		.concat(table)
	;

	t.forEach(function (value: string, index, array)
	{
		let rs = sublib._word_zh(value.split('').join(SP_KEY), value, 'ig')[0] as string;

		let r = new RegExp(rs.split(SP_KEY).join(SP_REGEXP), 'ig');

		//console.log(r);

		text = text.replace(r, value);
	});

	return text;
}

export function getTable(): IWords[]
{
	return table2
		.concat(table)
		.reduce(function (a, b)
		{
			let c;
			c = Array.isArray(b) ? b : [b];

			c.forEach(function (value, index, array)
			{
				let rs: IWords = sublib._word_zh(value.split('').join(SP_KEY), c[0], 'ig');

				a.push(rs);
			});

			return a;
		}, [] as IWords[])
		;
}

/*
let s = escape('废物裸体\', \'果体');
let d = unescape(s);

console.log(s);
console.log(d);

console.log(getTable());
*/

import * as self from './baidu';

export default self;
