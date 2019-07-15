/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';

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
export const words: IWords[] = _word_zh_all([

	['セシリア|賽系莉亞|(賽|塞)(希|西)莉(亞|婭)', '塞西莉婭'],

	['莉絲|リース', '莉絲'],
	['凱特', '凱特'],
	['霧繪|キリエ', '霧繪'],

	['格蘭|格倫', '格倫'],

	// --------------

	['蓋裡亞', '蓋里亞'],
	['菲亞', '菲亞'],

	// --------------

	['至高主教|最大主教|最高主教', '至高主教'],

	['里札亞', '里札亞'],
	['直截廚|直結廚', '直結廚'],

	['琉米艾爾|盧米埃爾|リュミエ─ル|リュミエール', '琉米艾爾'],

	['埃塞利亞', '埃塞利亞'],
	['里爾法', '里爾法'],
	['里賽亞', '里賽亞'],

	['哥魯特|コルト|柯爾特', '柯爾特'],

	['工會|公會', '公會'],

	['[发]', '發'],

	['[Ｄd]Isperse', 'Disperse', 'ig'],
	['Aqua’s Thrust', 'Aqua\'s Thrust', 'ig'],

	...lazymarks['class'],

	...lazymarks['4'],

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

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
