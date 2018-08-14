/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '';

/**
 * 其他用途
 *
 * @type {{chapter_id: string; chapter_title: string; volume_id: string; volume_title: string}}
 */
export const value = {
	chapter_id: '第{{0}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,

	volume_id: '第{{0}}章',
	volume_title: `$t(chapter_id, [{{0}}])：{{title}}`,
};

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words: IWords[] = sublib._word_zh_all([

	['愛麗絲', '愛麗絲'],

	['Guild|公会', '公會'],
	['紫嫣|紫苑', '紫苑'],

	['提露|緹露', '緹露'],
	['緹露貝露', '緹露貝露'],

	['(艾斯特|伊斯特)(麗雅|里婭)|エストリア', '伊斯特麗雅'],
	['伊斯特|エスト|艾斯特', '伊斯特'],

	['塞拉|賽菈', '塞拉'],

	['伊(莉|利)(亞|雅)?', '伊莉亞'],

	['艾莉諾亞?|埃莉諾|艾雷諾亞|エレノア|愛蕾諾亞', '愛蕾諾亞'],

	['伯特蘭德|貝魯托朗|ベルトラン|貝奴德蘭', '貝魯托朗'],

	['庫蘭瑟絲卡|庫蘭瑟斯卡', '庫蘭瑟絲卡'],
	['威爾明頓', '威爾明頓'],

	['奧斯提亞|奧斯緹露|オースティア|Austere', '奧斯提亞'],

	['ステアード|SuteāDo|史蒂亞徳', '史蒂亞徳'],
	['艾庫雷雅|エクレア|艾庫雷婭|艾克雷亞|艾庫雷亞', '艾庫雷雅'],

	['阿米納蘇|Aminasu|阿米納斯|アミナス', '阿米納斯'],

	['雷歐尼爾|雷奧尼爾|レオニール|萊奧尼爾', '萊奧尼爾'],
	['薩克拉門托|サクラメント|Sacrament|薩克拉門德', '薩克拉門托'],

	['亞爾賽特|阿爾賽德|阿魯塞德', '阿爾賽德'],
	['アシタカ|阿席達卡|阿西塔卡', '阿席達卡'],

	['(莉|利)布拉|リブラ', '莉布拉'],

	['克雷因|クレイン|克萊因', '克萊因'],
	['克里斯娜|クリスナ|克莉絲娜?', '克莉絲娜'],

	['芭提|バティ|芭緹', '芭緹'],

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

	['」，(?=\n)', '」'],

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

] as IWords[]);

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: vMaybe = [

	//'需要偵測的字',

] as vMaybe;

/**
 * 分析取代完成後執行的代碼
 *
 * @param {string} text
 * @returns {string}
 */
export function words_callback(text: string): string
{
	return text;
}

export default exports;
