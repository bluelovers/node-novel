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

	_word_jp1('緋雪|ヒユキ|Hiyuki', '緋雪'),

	/**
	 *
	 */
	//['インペリアル|伊帕利亞爾', '伊帕利亞爾'],
	//['古里姆索|クリムゾン', '古里姆索'],

	[`(?:伊帕利亞爾|インペリアル|帝国)${sp}(?:古里姆索|クリムゾン|深紅|緋紅)`, '真紅帝國', 'ig'],

	['タメゴロー|德米哥羅', '德米哥羅'],
	['ラポック|拉帕古|らぽっく|拉伯庫', '拉帕古'],

	['壱岐', '壱岐'],
	['双樹', '双樹'],
	['命都', '命都'],
	['周参', '周参'],
	['天涯', '天涯'],
	['刻耀', '刻耀'],
	['空穂', '空穂'],
	['蔵肆', '蔵肆'],
	['零璃', '零璃'],
	['斑鳩', '斑鳩'],

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

	_word_jp1('ミーア|米亞|米婭', '米婭'),

	_word_jp1('ガルテ|迦魯迪|迦魯德', '迦魯迪'),
	_word_jp1('バッソ|巴索', '巴索'),

	_word_jp1('コラード|格拿特|科拉德', '科拉德'),
	_word_jp1('アドルナート|亞特爾拿特|安德魯納多', '亞特爾拿特'),

	_word_jp1('フランコ|法蘭格', '法蘭格'),

	_word_jp1('フリーパス', 'フリーパス'),

	/**
	 *
	 */
	['カルディア|卡迪亞|卡迪納爾|卡魯迪亞|卡地亞', '卡魯迪亞'],

	_word_jp1('アシル|阿西爾|阿西路', '阿西爾'),
	['クロード|克勞德|庫羅德', '克勞德'],

	['アンジェリカ|安格莉卡|安潔莉卡|安吉莉卡', '安潔莉卡'],
	_word_jp1('イリス|伊里斯|伊利斯', '伊利斯'),

	['阿米提亞|アミティア|阿米替亞', '阿米提亞'],

	_word_jp1('卡魯洛|カルロ', '卡魯洛'),

	_word_jp1('弗盧碧亞|フルビア', '弗盧碧亞'),

	['ジョヴァンニ|喬萬尼', '喬萬尼'],
	['安東尼奧|アントニオ', '安東尼奧'],

	/**
	 *
	 */
	['ケンスルーナ|森斯露娜|森斯路那|肯思魯娜', '森斯露娜'],
	_word_jp1('克萊斯|クレス|克里斯(?!德)', '克萊斯'),

	['法布拉', '法布拉'],

	/**
	 *
	 */
	['グラウィオール|葛洛伊奧爾萊|古拉伊奧─?魯|古拉維奧爾', '古拉維奧爾'],

	/**
	 *
	 */
	['イーオン|伊歐|伊昂|AEON|伊甕', '伊昂'],
	['ファクシミレ|哈克西米爾', '哈克西米爾'],

	/**
	 *
	 */
	['兄丸|兄丸', '兄丸'],


];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,


	[`喬伊${sp}阿蘭特`, '喬伊・阿蘭特', 'ig'],

	[`迦魯迪${sp}巴索`, '迦魯迪・巴索', 'ig'],
	[`格拿特${sp}亞特爾拿特`, '格拿特・亞特爾拿特', 'ig'],
	[`阿西爾${sp}克勞德`, '阿西爾・克勞德', 'ig'],

	[`安潔莉卡${sp}伊利斯${sp}阿米提亞`, '安潔莉卡・伊利斯・阿米提亞', 'ig'],
	[`阿西爾${sp}克勞德${sp}阿米提亞`, '阿西爾・克勞德・阿米提亞', 'ig'],

	[`克萊斯${sp}森斯露娜`, '克萊斯＝森斯露娜', 'ig'],

	/**
	 *
	 */

	[`喪失世紀`, '喪失世紀', 'ig'],

	['蒼き神の塔|蒼神之塔', '蒼神之塔'],

	['薔薇の罪人|薔薇的罪人', '薔薇的罪人'],

	[`Naga${sp}Raja`, '黃金龍', 'ig'],
	[`(?:ETERNAL|永恆)${sp}(?:HORIZON|地平線)${sp}ONLINE`, 'ETERNAL・HORIZON・ONLINE', 'ig'],
	[`E${sp}H${sp}O`, 'E・H・O', 'ig'],

	[`Oriana${sp}Palace${sp}Hotel`, 'Oriana・Palace・Hotel', 'ig'],

	[`天嬢典雅|天娘典雅`, '天嬢典雅', 'ig'],
	[`三毛猫の足音`, '三毛猫の足音', 'ig'],
	[`独壇戦功|獨壇戰功`, '獨壇戰功', 'ig'],

	[`豬骨大王|豚骨大王`, '豚骨大王', 'ig'],
	[`豬骨|豚骨`, '豚骨', 'ig'],

	[`飛竜`, '飛竜', 'ig'],
	[`騎竜`, '騎竜', 'ig'],
	[`真龍`, '真龍', 'ig'],
	[`白龍山脈`, '白龍山脈', 'ig'],

	[`Skill`, '技能', 'ig'],

	[`歐內大人`, '姊姊大人', 'ig'],

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

	[/[\[【]/g, '「'],
	[/[\]】]/g, '」'],

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
