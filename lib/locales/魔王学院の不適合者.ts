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

	_word_jp1('阿諾斯|アノス|阿斯諾|亞諾斯', '阿諾斯'),
	_word_jp1('沃勒迪戈|ヴォルディゴード|沃爾迪哥德|伏爾迪哥德|伏爾迪歌德|沃尓迪哥徳|沃爾迪斯哥', '沃爾迪哥德'),

	_word_en3('Anos', '阿諾斯'),
	_word_en3('Voldi ?god', '沃爾迪哥德'),

	[`阿諾斯${sp}沃爾迪哥德`, '阿諾斯・沃爾迪哥德'],

	_word_jp1('アヴォス|阿維斯', '阿維斯'),
	_word_jp1('ディルヘヴィア|迪爾海維亞|迪爾希維亞', '迪爾海維亞'),

	_word_jp1('卡農|カノン', '卡農'),

	_word_jp1('レノ|萊諾', '萊諾'),

	_word_jp1('ミリティア', 'ミリティア'),

	_word_jp1('デルゾゲード|德格拉德|德魯佐蓋德|德索格德|德索索格德', '德魯佐蓋德'),
	_word_en3('Delfo Gade', '德魯佐蓋德'),

	_word_jp1('ディルヘイド', 'ディルヘイド'),
	_word_en3('Dillheide|Dihaide|Dilheide', 'ディルヘイド'),

	/**
	 *
	 */
	_word_jp1('イザベラ|伊莎貝拉', '伊莎貝拉'),
	_word_jp1('グスタ|格斯塔|古斯塔', '古斯塔'),

	_word_jp1('ミーシャ|米莎|米沙|美莎|米夏', '米莎'),
	_word_jp1('ネクロン|雷庫隆|尼克朗|內克倫|內克朗|尼克林|尼克恩', '雷庫隆'),
	_word_en3('Necron', '雷庫隆'),

	_word_jp1('サーシャ|莎夏|沙夏|薩莎|薩沙', '莎夏'),

	_word_jp1('アイヴィス|艾維斯|伊維斯', '艾維斯'),

	_word_jp1('ゼペス|則佩斯|澤佩斯|塞佩斯', '澤佩斯'),

	_word_en3('Zepesu|Zepeus|Zepus|Zepes', '澤佩斯'),

	_word_jp1('リオルグ|利奧爾格|利奧爾格斯', '利奧爾格'),

	_word_en3('Riorg?|Riolog|Riorogu?|Liolg|Rioro|Liorg', '利奧爾格'),

	_word_jp1('インドゥ', 'インドゥ'),

	_word_jp1('エミリア|艾米利亞|愛米莉亞|艾米莉亞|埃米莉亞|埃米利亞', '愛米莉亞'),
	_word_jp1('ルードウェル|魯德韋爾', '魯德韋爾'),

	_word_jp1('エウゴ|埃爾', '埃爾'),
	_word_jp1('ラ|拉', '拉'),
	_word_jp1('ラヴィアズ|拉維亞斯', '拉維亞斯'),

	['埃爾拉維亞斯', '埃爾・拉・拉維亞斯'],

	/**
	 *
	 */

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['成長(Kurusuto|（クルスト）)', '成長'],
	['契約(Zekuri|ゼクト|（ゼクト）)', '契約'],
	['蘇生(Ingaru|（インガル）|インガル)', '蘇生'],
	['轉移（ガトム）', '轉移'],
	['飛行フレス', '飛行'],
	['治癒エント', '治癒'],
	['幻影擬態ライネル', '幻影擬態'],
	['分魂分體ディエルガ', '分魂分體'],
	['根源調諧（ゼクシズ）', '根源調諧'],
	['思念領域(（リクノス）|リクノス)', '思念領域'],

	['過去改変イングドゥ', '過去改変'],

	['時神の大鎌|時神創造之大鎌|時神的鐮刀|時間神的鐮刀', '時神の大鎌'],

	['魔力鐘錶|魔力時計', '魔力時計'],

	['(拘束魔鎖|拘留魔鏈)(（ギジェル）)?', '拘束魔鎖'],

	['(時間操作)(機械|機器)?(（Rebal）)?', '時間操作'],

	['(主格交替|主格交代)（デルト）', '主格交替'],

	['(分離融合転生|分離融合輪回)(ディノ・ジクセス|（(ディノ・ジクセス|Deingesier)）)?', '分離融合転生'],

	['魔王軍加易斯|魔王軍（ガイズ）', '魔王軍'],

	['(獄炎殲滅砲|殲滅監獄炮|殲滅監獄炎|獄炎殲滅砲)(ジオ・グレイズ|（ジオ・グレイズ）|Geo Gray)?', '獄炎殲滅砲'],

	['(破滅|毀滅)の魔眼', '破滅的魔眼'],

	[/^[　 ]+/gm, ''],

	['<|＜', '〈'],
	['>|＞', '〉'],

	['▪', '・'],

	_word_jp1('醬|ちゃん', '醬'),

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	//...sublib.lazymarks['full_width_002'],

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
