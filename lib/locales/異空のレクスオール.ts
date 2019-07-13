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

	['カナメ', '要'],
	['アリサ|艾麗莎', '艾麗莎'],

	['修涅依魯|シュネイル', '修涅依魯'],

	['エリーゼ|艾莉婕', '艾莉婕'],
	['レイシェルト|雷谢魯特', '雷謝魯特'],
	['拉茲修魯特|ラズシェルト', '拉茲修魯特'],

	['ハインツ|海因茲', '海因茲'],
	['ハイン|海因', '海因'],

	/**
	 *
	 */
	['無限回廊', '無限回廊'],
	['決壊', '決壊'],
	['執事騎士|バトラーナイト', '執事騎士'],
	['執事|バトラー', '執事'],
	['騎士|ナイト', '騎士'],

	/**
	 *
	 */
	['威拉魯|ヴェラール', '威拉魯'],


	['レクスオールアロー|雷庫斯歐魯之矢', '雷庫斯歐魯之矢'],
	['レクスオール|雷庫斯歐魯|雷庫斯歐陸', '雷庫斯歐魯'],

	['アルハザール|阿魯哈薩魯', '阿魯哈薩魯'],
	['ゼルフェクト|澤魯菲庫特', '澤魯菲庫特'],

	['ルヴェルレヴェル|露維露蕾維露', '露維露蕾維露'],

	/**
	 *
	 */

	['ラナン|拉楠', '拉楠'],

	...lazymarks['class'],

	[/\n+(\S+\n)(?=年齢：)/g, '\n\n\n$1'],
	[/\n+(\n)(?=・)/g, '\n\n$1'],

	_word_en(/SF/ig, function (...m: string[])
	{
		return m[1] + 'SF';
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
