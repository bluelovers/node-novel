/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, lazymarks } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	[`里${sp}耶斯提傑`, '里・耶斯提傑'],
	[`威賈${sp}拉蔣達拉`, '威賈・拉蔣達拉'],
	[`穆阿${sp}普拉庫夏`, '穆阿・普拉庫夏'],
	[`赫克托維傑斯${sp}阿${sp}拉加拉`, '赫克托維傑斯・阿・拉加拉'],

	[`蛇发人`, '蛇髮人'],

	[`埃里希弦`, '埃里希弦'],
	[`里尤洛`, '里尤洛'],

	[`YGGDRASIL`, 'YGGDRASIL', 'ig'],

	[`（NāGarāJa）|[\[（\(](NāGarāJa|Naga Raja)[\)\]）]`, '', 'ig'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/^\?$/gm, '---'],

	[/[发]/g, '發'],

	[/[<>]/g, function (s)
	{
		return StrUtil.toFullWidth(s)
	}],

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	//...sublib.lazymarks['full_width_002'],

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

/**
 * 其他用途
 *
 * @deprecated
 * @type {{chapter_id: string; chapter_title: string; volume_id: string; volume_title: string}}
 */
export const value = {
	chapter_id: '第{{0}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,

	volume_id: '第{{0}}章',
	volume_title: `$t(chapter_id, [{{0}}])：{{title}}`,
};

export default exports;
