/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, lazymarks, _word_jp1, _word_en3 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['愛麗児', '愛麗兒'],

	/**
	 * @todo 人偶蜘蛛
	 *
	 * 艾兒、莎兒、莉兒和菲兒
	 */
	['阿艾爾', '艾兒'],
	['利艾爾|利艾兒', '莉兒'],
	['菲艾爾', '菲兒'],
	['薩艾爾', '莎兒'],

	/**
	 *
	 */
	['蘇菲雅|蘇菲亞|索菲婭|索菲亞|蘇菲婭', '蘇菲亞'],

	/**
	 * @todo
	 *
	 * 波狄瑪斯
	 * 破提馬斯
	 * 波蒂馬斯
	 * 破提納斯
	 *
	 * 帕菲納斯
	 * 海非納斯
	 *
	 * 不清楚 文庫版與WEB版名字有沒有差異
	 * 但從這些來看的話又看起來像是一樣
	 * 之後 在考慮要不要統一好了
	 */
	['破提馬斯|波蒂馬斯|波狄瑪斯|破提納斯', '波狄瑪斯'],

	_word_jp1('ポティマス', '波狄瑪斯'),
	_word_jp1('ハァイフェナス', '海非納斯'),

	/**
	 * レングザンド
	 */
	['連古贊德|聯古占托|連克山杜', '連克山杜'],
	_word_jp1('レングザンド', '連克山杜'),

	_word_jp1('右果|由古', '由古'),
	[`${sp}(?:邦恩|潘)${sp}連克山杜`, '・邦恩・連克山杜'],

	/**
	 *
	 */
	_word_jp1('沙利艾拉|薩利艾拉', '薩利艾拉'),

	/**
	 *
	 */
	_word_jp1('巴魯多|巴魯托|巴托魯', '巴魯托'),

	_word_jp1('妮婭|尼亞', '妮婭'),

	_word_jp1('艾露洛|艾爾羅', '艾爾羅'),

	_word_jp1('阿古納|亞格納', '亞格納'),

	_word_jp1('薩那托麗阿|薩納托利亞|沙娜多莉|薩(那|納)托(利|麗)(阿|亞)', '沙娜多莉'),

	_word_jp1('庫郭|古豪', '古豪'),

	_word_jp1('西悠|修維', '修維'),

	_word_jp1('瓦克斯|瓦基斯', '瓦基斯'),


	_word_en('gang', '岡'),

	_word_jp1('斐涅斯多|フェネシスト', '斐涅斯多'),
	_word_jp1('斐涅拉修|フェネラッシュ', '斐涅拉修'),
	_word_jp1('斐涅格勒|フェネグラッド', '斐涅格勒'),

	_word_jp1('亞雷烏斯|阿雷烏斯', '亞雷烏斯'),

	_word_jp1('サリエル|莎麗兒|薩麗兒', '莎麗兒'),

	/**
	 *
	 */

	['公會老板', '公會長'],
	['魔闘法', '魔闘法'],
	['地竜', '地竜'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	_word_en3('lv(\\d+)', function (...m)
	{

		return 'Lv' + StrUtil.toFullNumber(m[2])
	}),

	['[炮]', '砲'],

	['[煉炼]成', '錬成'],

	['氣[斗]', '氣鬥'],

	[/n% ?I ?= ?W/gm, 'n%I=W'],

	['工會|公會', '公會'],

	[/^　+(?!：)/gm, ''],

	[/(?<=[^〉\s]\n)(?=〈)/gm, '\n'],
	[/(?<=〉\n)(?=[^〈\s])/gm, '\n'],

	[/(?<=〉\n)\n(?=〈)/gm, ''],
	[/(?<=》\n)\n(?=《)/gm, ''],

	[/(?<=^「[^\n]+」　+「[^\n]+\n)\n(?=「)/gm, ''],

	[/(?<=^「[^\n]+」「[^\n]+」「[^\n]+\n)\n(?=「)/gm, ''],

	[/(?<=^能力值|技能)　+(?=(?:HP|技能點數)：)/gm, '\n'],

	[/(?<=^ＳＰ：[^\n]+\n)\n*(?=：)/gm, '　　'],
	[/(?<=^ＳＰ：[^\n]+\n)\n*(?=　：)/gm, '　'],
	[/(?<=^[^\n]+：[^\n]+\n)\n*(?=：)/gm, '　'],

	[/(?<=^[^\n　]+：[^\n]+\n)\n(?=[^\n]+?：)/gm, ''],

	[/(?<=^(ＳＰ|SP)：[^\n]+\n)(?=[^\n　]+：)/igm, '\n'],

	[/(?<=^　+：[^\n]+\n)(?=[^\n]+：)/gm, '\n'],

	...sublib.lazymarks['class'],
	...sublib.lazymarks['zh_cht'],

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

export default exports;
