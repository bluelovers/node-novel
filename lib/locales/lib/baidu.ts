/**
 * Created by user on 2018/1/31/031.
 */

import { IWords } from '../index';
import sublib from './';
import { array_unique } from '../../func';

export const SP_KEY = '#_@_#';
export const SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・。·]|\\*)';

export const SP_ESCAPE = '（河蟹）';

/**
 * 和諧/河蟹
 *
 * @type {string[][]}
 */
export const table = array_unique([
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
	'娼婦',
	'娼妓',
	'男娼',
	'男妓',
	'卖春',
	'流氓',
	'出卖肉体',
	'交合',
	'卖人',
	'強姦',
	'強奸',
	'反法',
	'禁药',
	'合体',
	'乱交会',
	'乱交',
	'贞操',
	'比基尼',
	'邪教',
	'非法',
	'妓院',
	'赌场',
	'治安',
	'警察',
	'口大',
	'政治',
	'逮捕',
	'法律',
	'政敌',
	'合法',
	'措施',
	'毒品',
	'性感',
	'混蛋',
	'胸部',
	'妖艳',
]);

/**
 * 去和諧時會以第一個項目為返回結果
 *
 * @type {string[][]}
 */
export const table2 = array_unique([
	['裸体', '果体',],
]);

export const table3 = array_unique([
	['強姦', '弓虽姦'],
	['強奸', '弓虽女干', '弓虽奸'],
]);

export function escape(text: string, count = 1)
{
	let t = table2
		.concat(table3)
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
		.concat(table3)
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
	return array_unique(table2
		.concat(table3)
		.concat(table)
		.reduce(function (a, b)
		{
			let c;
			c = (Array.isArray(b) ? b : [b]);

			c.reduce(function (array, value)
			{
				let rs: IWords = sublib._word_zh(value.split('').join(SP_KEY), c[0], 'ig');

				array.push(rs);

				return array;
			}, [])
				.forEach(function (value, index, array)
				{
					a.push(value);
				})
			;

			return a;
		}, [] as IWords[]))
		;
}

/*
let s = escape('废物裸体\', \'果体');
let d = unescape(s);

console.log(s);
console.log(d);
*/
//console.log(getTable());


import * as self from './baidu';

export default self;
