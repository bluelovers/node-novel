/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en3, lazymarks, _word_jp1 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['美里', '美里'],

	['哈露瓦塔托', '哈露瓦塔托'],

	['瑪尕雷托', '瑪尕雷托'],

	['杰弗雷', '杰弗雷'],
	['愛麗絲', '愛麗絲'],

	['法米利斯', '法米利斯'],
	['拉利提', '拉利提'],

	['旦吉烏', '旦吉烏'],

	['塞維里奧', '塞維里奧'],

	/**
	 *
	 */

	['瑪雷古魯里', '瑪雷古魯里'],
	['亞澤瓦魯多', '亞澤瓦魯多'],

	/**
	 *
	 */

	_word_jp1('麗布蘭斯', '麗布蘭斯'),
	_word_jp1('柯修馬蕾|コショマーレ', '柯修馬蕾'),
	_word_jp1('托蕾露露|トレールール', '托蕾露露'),

	/**
	 *
	 */

	_word_jp1('遊び人', '遊人'),

	['賽斯|塞斯', '賽斯'],

	_word_jp1('ヒューム', '人族'),
	_word_jp1('地精|コボルト', '地精'),

	_word_jp1('猛擊|スラッシュ|袈裟斬', '猛擊'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['発掘品', '發掘品'],
	['主人先生', '主人'],


	[/^ +/gm, ''],

	[/^一一+$/gm, function (s)
	{
		return '-'.repeat(s.length)
	}],

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

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

export default exports as typeof import('./demo');
