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

	['カナメ', '要'],
	['アリサ|艾麗莎', '艾麗莎'],

	['修涅依魯|シュネイル', '修涅依魯'],

	/**
	 *
	 */
	['無限回廊', '無限回廊'],


	['レクスオールアロー|雷庫斯歐魯之矢', '雷庫斯歐魯之矢'],
	['レクスオール|雷庫斯歐魯|雷庫斯歐陸', '雷庫斯歐魯'],

	['アルハザール|阿魯哈薩魯', '阿魯哈薩魯'],
	['ゼルフェクト|澤魯菲庫特', '澤魯菲庫特'],

	['ルヴェルレヴェル|露維露蕾維露', '露維露蕾維露'],

	/**
	 *
	 */

	['ラナン|拉楠', '拉楠'],

	...sublib.lazymarks['class'],

	[/\n+(\S+\n)(?=年齢：)/g, '\n\n\n$1'],
	[/\n+(\n)(?=・)/g, '\n\n$1'],

	_word_en(/SF/ig, function (...m: string[])
	{
		return m[1] + 'SF';
	}),

	...sublib.lazymarks[4],

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
