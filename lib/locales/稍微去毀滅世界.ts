/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { _zh_num2, sp, sp2, _zh_num, _full_num, EN_REGEXP } from '@node-novel/layout-pattern/lib/core/const';
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

	['宵宮', '宵宮'],
	['累斗', '累斗'],

	['(宵宮|よみや)[　 ]?(累斗|るいと)', '宵宮　累斗'],

	['羅潔|羅杰|ロージュ', '羅潔'],

	/**
	 *
	 */
	['迪弗納|ティファナ|緹法納|蒂华纳', '緹法納'],
	['達修緹|ダシュティ', '達修緹'],

	['馬修|マシュー', '馬修'],

	[`(?:モーヴェ|蒙貝)${sp}(?:オプスキュール|奧普斯奇爾)`, '蒙貝＝奧普斯奇爾'],
	[`(?:モーヴェ|蒙貝)`, '蒙貝'],
	[`(?:オプスキュール|奧普斯奇爾)`, '奧普斯奇爾'],

	['卡蓮|カレン|卡倫', '卡蓮'],

	[`(?:ソフィア|索菲亞)${sp}(?:レシアーナと?|雷西亞那托?|雷西亞納)`, '索菲亞＝雷西亞納'],
	[`(?:ソフィア|索菲亞)`, '索菲亞'],
	[`(?:レシアーナと?|雷西亞那托?|雷西亞納)`, '雷西亞納'],

	[`(?:那爾撒斯|ナルサス)${sp}(?:拉巴里埃爾|ラヴァリエール)`, '那爾撒斯＝拉巴里埃爾'],
	[`(?:拉巴里埃爾|ラヴァリエール)`, '拉巴里埃爾'],
	[`(?:那爾撒斯|ナルサス)`, '那爾撒斯'],

	/**
	 *
	 */
	[`亞麗艾斯|婭莉艾絲|アリエス`, '婭莉艾絲'],
	[`弗蘭梅`, '弗蘭梅'],
	[`${sp}安潔朵歐芙`, '＝安潔朵歐芙'],

	[`艾因瓦茲`, '艾因瓦茲'],

	/**
	 *
	 */
	[`薩塔那|サタナ`, '薩塔那'],
	[`伊莉莉艾|イリリュア|依力琉亞`, '依力琉亞'],

	[`セントロ|森特羅`, '森特羅'],

	/**
	 *
	 */
	[`露米艾璐|露米艾爾|ルミエール`, '露米艾璐'],
	[`芙萊伊海托|芙萊黑特|フライヘイト`, '芙萊伊海托'],

	/**
	 *
	 */
	[`隷属紋|奴隷紋`, '隷属紋'],

	[`褐色的誘惑?之?手`, '褐色的誘惑之手'],

	[`單片眼镜|單眼眼镜`, '單片眼镜'],

	[`(?:女佣|女僕)人?`, '女僕'],

	[`工会|公會`, '公會'],

	[`エルフ|精靈`, '精靈'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	[/\n一+$/g, ''],
	[/^　/gm, ''],

	...lazymarks['class'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	//...lazymarks['full_width_002'],

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
