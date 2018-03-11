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

	[`白崎${sp}陸`, '白崎　陸'],
	[`白崎`, '白崎'],
	[`陸`, '陸'],

	/**
	 * 希拉村
	 * 艾吾斯神父
	 */
	[`海納教国|海娜教国`, '海納教国'],
	[`狼之集会|狼群`, '狼之集会'],

	/**
	 * 奧路亞納王国首都亞魯諾
	 * 始祖神鳥在魯布的街
	 * 亞魯涅森林
	 */
	[`萊瓦恩|ライヴァン|萊伊維恩`, '萊伊維恩'],
	[`萊伊維恩(联盟|同盟)`, '萊伊維恩同盟'],

	/**
	 *
	 */
	['フェアリーライト|妖精之光', '妖精之光'],

	/**
	 *
	 */
	['斯摩夫|始祖神鳥', '始祖神鳥'],

	/**
	 *
	 */
	[`Magic${sp}Tail`, 'Magic・Tail', 'ig'],
	['レベル|等級', '等級'],

	/**
	 *
	 */
	...sublib.lazymarks['class'],

	['视(角|点)(变|转)(换|更)|視点変更|视角变更', '視点變更'],

	//[/^(視点変更)[ 　]*([\u4E00-\u9FFF？\d０-９]+)[ 　]*[—→]+[ 　]*/gm, '$1　$2　→　'],
	[/^(視点変更)[ 　]*(.+?)[ 　]*[—→]+[ 　]*/gm, function (...m)
	{
		return m[1] + '　' + StrUtil.trim(m[2]) + '　' + '→' + '　';
	}],
	[/\n+(視点変更[^\n]+)/gm, '\n\n\n$1'],
	[/^(視点変更[^\n]+)\n(?=\S)/gm, '$1\n\n'],
	[/(視点)\n(?=\S)/gm, '$1\n\n'],
	[/視/g, '視'],

	_word_en(/LV|HP|MP|EXP|[a-z]|\d+/g, function (s)
	{
		return StrUtil.toFullWidth(s.toUpperCase());
	}),

	[/^[　 ]+/gm, ''],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

]);

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

	let r = _word_en(/\./g, '$1。');

	//console.log(r);

	text = text.replace(r[0], r[1]);

	return text;
}

export default exports;
