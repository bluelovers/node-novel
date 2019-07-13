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

	['塞巴斯汀?|賽巴斯汀?', '賽巴斯汀'],
	['アルト|阿魯多|阿爾特|阿爾德', '阿爾特'],
	['ライル|萊爾', '萊爾'],
	['クリス|克莉絲|克里斯|克麗絲', '克莉絲'],
	['梅諾特|梅諾多|梅洛特|メノト|美諾图', '梅諾特'],

	['雷恩斯|ライネス|萊納斯|萊恩斯', '萊納斯'],

	['伊麗絲|イリス|伊莉絲', '伊麗絲'],
	['伊斯拉斐爾|伊斯蘭菲爾', '伊斯蘭菲爾'],
	['瑪茨|瑪琪|マーチ', '瑪茨'],

	['索普拉諾|ソプラノ', '索普拉諾'],

	['エスト|伊斯特', '伊斯特'],
	['アズラエル|阿茲瑞爾|亞茲勒魯', '阿茲瑞爾'],

	['レイス|蕾絲', '蕾絲'],

	['ロンドベル|隆德貝爾', '隆德貝爾'],
	['維佳', '維佳'],
	['マレット|馬雷特', '馬雷特'],

	['グレン|古蓮', '古蓮'],
	['ランスィ|蘭西', '蘭西'],
	['ミーカル|米迦爾', '米迦爾'],

	['优裡|優里|尤里', '優里'],

	['尼克兹克|尼克斯克|ニクズク|妮可絲可', '尼克兹克'],

	...lazymarks['class'],

	['【', '「'],
	['】', '」'],

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

	...lazymarks[4],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

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
