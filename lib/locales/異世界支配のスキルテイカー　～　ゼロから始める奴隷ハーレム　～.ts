/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '異世界支配のスキルテイカー　～　ゼロから始める奴隷ハーレム　～';

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

	['近衛', '近衛'],
	['悠鬥', '悠斗'],
	['近衛悠鬥', '近衛悠斗'],

	/**
	 *
	 */
	['スピカ|絲碧卡', '絲碧卡'],
	['ブルーネル|藍妮露', '藍妮露'],
	[`絲碧卡${sp}メサイエティ`, '絲碧卡・藍妮露'],

	/**
	 *
	 */
	['クレイン|軻怜', '軻怜'],
	[`ギルディア${sp}メサイエティ`, 'ギルディア・メサイエティ'],

	/**
	 *
	 */
	['豬頭人|奧加', '豬頭人'],

	/**
	 *
	 */
	['能力略奪|能力掠奪', '能力略奪'],
	['懶惰魔王|怠惰の?魔王', '怠惰の魔王'],

	/**
	 *
	 */
	['德萊意崴德|トライワイド', '德萊意崴德'],
	['エクスペイン|埃克斯佩恩', '埃克斯佩恩'],
	['lordland|ロードランド', 'ロードランド'],

	/**
	 *
	 */
	['瑞亞|リア|利亞', '利亞'],

	[/[ 　]*[＠@]稀有度[ 　]*/g, '＠稀有度　'],

	...lazymarks['class'],

	_word_en(/\d+/g, function (...m)
	{
		if (m[1] == '─')
		{
			//m[1] = '—';
		}

		return m[1] + StrUtil.toFullNumber(m[2]);
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
