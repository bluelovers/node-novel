/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp, sp2 } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	_word_jp1('カズラ', '一良'),

	/**
	 *
	 */
	['葛利夏', '葛利夏'],

	['薇蕾塔', '薇蕾塔'],
	['妮娜', '妮娜'],

	['巴林', '巴林'],
	['洛德', '洛德'],

	/**
	 *
	 */

	['伊斯提', '伊斯提'],
	['吉珂妮亞|杰克尼亞|吉珂妮靈', '吉珂妮亞'],
	['莉婕', '莉婕'],
	['艾菈|艾苗', '艾菈'],

	['艾薩克', '艾薩克'],


	/**
	 *
	 */
	['哈伯', '哈伯'],
	['瑪麗', '瑪麗'],
	['利維森', '利維森'],

	/**
	 *
	 */
	['伊斯提利亞', '伊斯提利亞'],

	/**
	 *
	 */
	['葛雷西歐爾', '葛雷西歐爾'],

	['香氛鍊', '香氛鍊'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['ln_0010'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	/**
	 * 無差別將 【】 轉為對話符號
	 */
	//...lazymarks[8],

	...lazymarks['clear_002'],

	/**
	 * 適用於具有大量長段 而只縮減對話之間的空格使用
	 */
	//...lazymarks['ln_talk'],

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
