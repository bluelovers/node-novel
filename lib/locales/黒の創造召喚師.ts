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

	['継那', '継那'],
	[`継那${sp}佐伯`, '継那・佐伯'],

	/**
	 * 西尔維亞.辛利露
	 * 卡里基亞大森林
	 * 莉莉安奴.克里斯托瓦尔
	 *
	 * 琪莉婭貝儿・蓮丽尔
	 */
	[`希尔薇|西尔維|希爾維`, '希尔薇'],
	[`莉莉安|莉莉婭|莉莉亞`, '莉莉安'],
	[`蓮丽尔|辛利露|連丽尔`, '辛利露'],

	[`琪莉婭|奇莉婭|霧亞`, '琪莉婭'],
	[`琪莉婭貝?儿`, '琪莉婭貝儿'],

	[`希尔薇亞${sp}(?:辛利露|蓮丽儿)`, '希尔薇亞・辛利露'],
	[`希尔薇亞=(?:辛利露|蓮丽儿)`, '希尔薇亞・辛利露'],

	[`莉莉安奴${sp}(?:克里斯托瓦尔|克丽絲托瓦尔)`, '莉莉安奴・克丽絲托瓦尔'],
	[`莉莉安奴=(?:克里斯托瓦尔|克丽絲托瓦尔)`, '莉莉安奴・克丽絲托瓦尔'],

	['カリギュア|卡里基亞|卡利久亞|卡利古亞', '卡里基亞'],

	/**
	 * 尤蒂絲・雷伊薇哈丽亞
	 * 琉克・塔庫拉斯
	 * 庫罗斯・阿茲拉尔魯
	 *
	 * 索亞菈・蕾敏顿
	 *
	 * 雷莉丽尔
	 */
	['真实之鈴|利亞貝魯|利貝爾|利亞貝尔', '利亞貝魯'],
	['罗宾威尔', '羅賓威爾'],

	['索亞?菈|索阿拉|索亞?拉', '索亞菈'],
	[`雷敏顿|雷米頓`, '雷米頓'],

	[`索亞菈${sp}(?:雷米頓)`, '索亞菈・雷米頓'],
	[`索亞菈＝(?:雷米頓)`, '索亞菈・雷米頓'],

	['憂緹斯|尤蒂絲|優緹絲|优提斯', '尤蒂絲'],

	['克羅斯|庫罗斯', '庫罗斯'],
	[`庫罗斯${sp}(?:亞茲拉艾尔|阿茲拉尔魯)`, '庫罗斯・亞茲拉艾尔'],

	['琉克|流克', '琉克'],
	[`琉克${sp}(?:塔庫拉斯|道格拉斯)`, '琉克・塔庫拉斯'],

	/**
	 *
	 */
	['伊莉雅絲|伊利亞斯', '伊利亞斯'],
	['海尔魯|海艾尔', '海艾尔'],
	['雷英|雷因|雷恩', '雷因'],
	['丽娜|莉娜', '莉娜'],
	['亞莉亞|亞里亞', '亞里亞'],
	['艾夏|愛莎', '愛莎'],

	[`伊利亞斯${sp}海艾尔`, '伊利亞斯・海艾尔'],
	[`愛莎${sp}海艾尔`, '愛莎・海艾尔'],
	[`雷因${sp}海艾尔`, '雷因・海艾尔'],
	[`莉娜${sp}海艾尔`, '莉娜・海艾尔'],
	[`亞里亞${sp}海艾尔`, '亞里亞・海艾尔'],

	/**
	 * 伊庫利亞大陸
	 * 『優思提利亞王国』、『梅菲斯特巴爾帝国』、『雷邦緹利亞神聖国』
	 */
	['雷邦提利亞|雷斑緹利亞|雷邦緹利亞|レバンティリア|雷曼迪利亞', '雷邦緹利亞'],
	['伊格利亞|伊庫利亞', '伊庫利亞'],

	/**
	 *
	 */
	['迪艾布斯|戴夫斯|ディエヴス', '迪艾布斯'],
	['克蘇魯|克鲁苏', '克蘇魯'],
	['里爾|利尔|里露', '里爾'],

	/**
	 *
	 */
	['異界的鑑定眼', '異界的鑑定眼'],
	['詛咒之子|忌讳之子', '詛咒之子'],

	/**
	 *
	 */
	['創造', '創造'],
	['召喚', '召喚'],
	[`(?:広域|广阔|廣範圍|廣域)${sp}詳細`, '廣域・詳細'],
	[`廣範圍和詳細`, '廣域・詳細'],
	[`言語${sp}文字`, '言語・文字'],
	[`ＨＰ${sp}ＭＰ`, 'ＨＰ・ＭＰ'],
	['工会|公会|行会', '公会'],
	['教堂|教会', '教会'],
	['レベル|等級', '等級'],
	['姓名|名字', '名字'],
	['公会大師|公会会長', '公会会長'],

	...lazymarks['class'],

	[/^一+\n/g, ''],

	[/^- ?(?!\w)/gm, '－'],

	[/^一+$/gm, function (s)
	{
		return '—'.repeat(s.length);
	}],

	[' ?(：) ?', '$1'],

	[/(\S)\n(名字：)/g, '$1\n\n$2'],

	[/^【([^】\n]+)】/gm, '「$1」'],

	[/^\*$/gm, function (s)
	{
		return StrUtil.toFullWidth(s);
	}],

	_word_en(/LV|HP|MP|EXP|[a-z]|\d+|EDCBA|S{1,3}|STR|VIT|AGI|MID|DEX/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2].toUpperCase());
	}),

	...lazymarks[4],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	[/【/g, '「'],
	[/】/g, '」'],

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
	return text;
}

export default exports;
