/**
 * Created by user on 2017/12/21/021.
 */
///<reference lib="es2018.regexp"/>

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, lazymarks, _word_jp1 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['緋雪', '緋雪'],

	/**
	 *
	 */
	//['インペリアル|伊帕利亞爾', '伊帕利亞爾'],
	//['古里姆索|クリムゾン', '古里姆索'],

	[`(?:伊帕利亞爾|インペリアル|帝国)${sp}(?:古里姆索|クリムゾン|深紅)`, '真紅帝國', 'ig'],

	['タメゴロー|德米哥羅', '德米哥羅'],

	['壱岐', '壱岐'],
	['双樹', '双樹'],
	['命都', '命都'],
	['周参', '周参'],
	['天涯', '天涯'],
	['刻耀', '刻耀'],
	['空穂', '空穂'],

	_word_jp1('ウィス|維斯', '維斯'),
	['凱陣', '凱陣'],

	/**
	 *
	 */
	_word_jp1('ソフィア|索菲亞', '索菲亞'),

	/**
	 *
	 */
	['ジョーイ|喬伊', '喬伊'],
	['阿蘭特|アランド', '阿蘭特'],

	_word_jp1('アーラ|亞拉', '亞拉'),

	_word_jp1('ミーア|米亞', '米亞'),

	_word_jp1('ガルテ|迦魯迪', '迦魯迪'),
	_word_jp1('バッソ|巴索', '巴索'),

	_word_jp1('コラード|格拿特', '格拿特'),
	_word_jp1('アドルナート|亞特爾拿特', '亞特爾拿特'),

	_word_jp1('フランコ|法蘭格', '法蘭格'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,


	[`喬伊${sp}阿蘭特`, '喬伊・阿蘭特', 'ig'],

	[`迦魯迪${sp}巴索`, '迦魯迪・巴索', 'ig'],
	[`格拿特${sp}亞特爾拿特`, '格拿特・亞特爾拿特', 'ig'],

	/**
	 *
	 */

	[`Naga${sp}Raja`, '黃金龍', 'ig'],
	[`(?:ETERNAL|永恆)${sp}(?:HORIZON|地平線)${sp}ONLINE`, 'ETERNAL・HORIZON・ONLINE', 'ig'],
	[`E${sp}H${sp}O`, 'E・H・O', 'ig'],

	[`Oriana${sp}Palace${sp}Hotel`, 'Oriana・Palace・Hotel', 'ig'],

	[`天嬢典雅|天娘典雅`, '天嬢典雅', 'ig'],
	[`三毛猫の足音`, '三毛猫の足音', 'ig'],

	[`豬骨大王|豚骨大王`, '豚骨大王', 'ig'],
	[`豬骨|豚骨`, '豚骨', 'ig'],

	[`飛竜`, '飛竜', 'ig'],
	[`騎竜`, '騎竜', 'ig'],
	[`真龍`, '真龍', 'ig'],
	[`白龍山脈`, '白龍山脈', 'ig'],

	[`Skill`, '技能', 'ig'],

	/**
	 *
	 */

	[`后話`, '後話', 'ig'],

	[/(?<=MP：[^\n]+|。)\n(?=[\S][^\n]+\n種族：)/igm, '\n\n\n'],

	[/(?<=\S)\n\n(?=種族：)/igm, '\n\n\n'],

	[/(?<=所有：[^\n]+)()(?=HP：)/igm, '\n$1'],

	[/(?<=MP：[^\n]+)(\n)(?![^\s]+：)/igm, '\n\n'],

	[/^[　 ]+/gm, ''],

	...sublib.lazymarks['class'],

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
