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

	['陰の実力者|影之实力者', '影之實力者'],

	['クレア|克蕾婭|克蕾雅', '克蕾婭'],
	['卡盖諾|カゲノー', '卡盖諾'],


	['アルファ|阿爾法', '阿爾法'],
	['ベータ|貝塔', '貝塔'],
	['エルフ|精靈', '精靈'],
	['デルタ|德爾塔', '德爾塔'],

	['シャドウガーデン|影守', '影守'],
	['シャドウ|暗影', '暗影'],

	['(シャドウ|暗影)(様|大人)戰記', '暗影大人戰記'],

	['ミドガル|米德嘉爾', '米德嘉爾'],
	['アレクシア|阿蕾克西雅', '阿蕾克西雅'],
	['アイリス|愛麗絲', '愛麗絲'],

	['イプシロン|艾普西隆', '艾普西隆'],

	['シェリー|雪莉', '雪莉'],
	['巴内特|バーネット', '巴内特'],

	['希德|シド', '希德'],
	['加里', '加里'],
	['紐|ニュー', '紐'],

	['ローズ|萝茲', '萝茲'],
	['奧利雅納|オリアナ', '奧利雅納'],


	['ガンマ|伽瑪', '伽瑪'],

	['七陰|七阴', '七陰'],

	['全\\*果', '全裸'],

	[/^　/gm, ''],

	...sublib.lazymarks['class'],

	_word_en(/\d+g/ig, function (...m: string[])
	{
		return m[1] + StrUtil.toFullWidth(m[2].toUpperCase());
	}),

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
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
