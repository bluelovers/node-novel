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

	['莉尤|リョウ', '莉尤'],

	['雷恩福雷斯特|レインフォレスト|雷恩弗雷斯特|雷・弗雷斯特|雷恩福雷思特', '雷恩福雷斯特'],
	['蓋因|凱因', '凱因'],
	['艾琳|愛林', '艾琳'],
	['艾倫|艾′倫', '艾倫'],
	['卡丁|科爾丁|カーディーン', '卡丁'],

	['素姫|チーラ|蘇姫|琪菈', '琪菈'],

	// --------

	['克洛德|克勞德', '克勞德'],

	['莉歐娜|リオーネ', '莉歐娜'],
	['米絲緹婭|ミスティア）', '米絲緹婭'],
	['羅娜|ロンネ', '羅娜'],

	// -----------

	['塔古沙克|塔言沙克|タゴサク|塔古之克', '塔古沙克'],
	['亞歷山大', '亞歷山大'],

	['賽奇|セキ|瑟基|塞奇', '賽奇'],
	['利尤奇|リュウキ|琉奇', '利尤奇'],
	['巴修|巴什|馬什', '巴修'],

	['盧比法爾', '盧比法爾'],

	['艾妮耶絲|アニエス', '艾妮耶絲'],

	['嘉菈緹亞', '嘉菈緹亞'],

	// --------

	['達莉婭|達莉亞', '達莉婭'],

	// ---------------

	['卡特麗娜|卡特莉娜|卡特里娜|卡特琳娜|卡緹莉娜|卡特莉特', '卡特麗娜'],
	['古蓮那修克|古恩納西斯|古恩娜希絲|谷安納西斯|古安納西斯', '古蓮那修克'],

	['莎樂美|莎欒美|莎乐美|薩洛梅|サロメ|沙樂美', '莎樂美'],
	['蒙德斯|モンテス', '蒙德斯'],

	['莉茲|利茲', '利茲'],

	// ------------

	['托瑪斯|托馬斯', '托瑪斯'],
	['グローリア|古洛莉婭|古洛莉雅', '古洛莉婭'],

	// ------------

	['梅麗絲|梅莉絲', '梅麗絲'],
	['乔舒亞|橋西亞', '喬舒亞'],

	//-----

	['咕里咕里|グリグリ|古力古力', '咕里咕里'],
	['卡里卡里', '卡里卡里'],

	['精靈', '精靈'],
	['希蘭博魯特', '希蘭博魯特'],

	['商人?爵', '商爵'],

	['蘿莉控|ロリ控', '蘿莉控'],

	['誓約勝利的莉尤|命定胜利的莉尤|約定胜利的莉尤|約束された勝利のリョウ', '約定勝利的莉尤'],

	['誘惑のサロメ|诱惑的莎樂美', '誘惑的莎樂美'],

	//[/一\s-|-\s一|一一/, '──'],

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
