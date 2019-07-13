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

	['直見', '直見'],
	['真嗣', '真嗣'],
	['直見真嗣', '直見真嗣'],

	// リュシア＝オールドクライン
	['露西婭|リュシア|露西亞', '露西婭'],

	// エリン＝グラスウッド
	['艾琳|エリン', '艾琳'],

	['弗雷諾|芙露诺', '芙露諾'],

	['茜|シー', '茜'],

	/**
	 *
	 */
	['ミラ|米拉', '米拉'],

	/**
	 *
	 */
	['特里塔|トリタ', '特里塔'],

	/**
	 * 冒険者公会的会長多蘭。这傢伙是隨从的舒萊斯
	 */
	['多蘭|ドラン|拉登', '多蘭'],
	['舒萊斯|シュライ', '舒萊斯'],

	/**
	 *
	 */
	['(巴克|バルク)王国', '巴克王国'],

	/**
	 *
	 */

	['卡拉米提|卡拉米蒂', '卡拉米蒂'],

	['奧利哈刚|奧利哈爾鋼|奧利哈钢|奥利哈康', '奧利哈鋼'],

	['エルフ|精靈', '精靈'],

	['登録|注册', '登録'],

	['孤児', '孤兒'],

	[/^ /gm, ''],

	[/【/g, '「'],
	[/】/g, '」'],

	...lazymarks['class'],

	...lazymarks[4],

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

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
