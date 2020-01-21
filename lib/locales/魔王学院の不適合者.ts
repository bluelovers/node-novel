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
 * @deprecated
 */
export const words_source_old: IWords[] = [

	_word_jp1('阿諾斯|アノス|阿斯諾|亞諾斯', '阿諾斯'),
	_word_jp1('沃勒迪戈|ヴォルディゴード|沃爾迪哥德|伏爾迪哥德|伏爾迪歌德|沃尓迪哥徳|沃爾迪斯哥', '沃爾迪哥德'),

	_word_en3('Anos', '阿諾斯'),
	_word_en3('Voldi ?god', '沃爾迪哥德'),

	[`阿諾斯${sp}沃爾迪哥德`, '阿諾斯・沃爾迪哥德'],
	[`阿諾斯沃爾迪哥德`, '阿諾斯・沃爾迪哥德'],

	_word_jp1('アヴォス|阿維斯', '阿維斯'),
	_word_jp1('ディルヘヴィア|迪爾海維亞|迪爾希維亞|迪爾西維亞', '迪爾海維亞'),

	_word_jp1('卡農|カノン|卡隆', '卡農'),

	_word_jp1('レノ|萊諾|雷諾', '萊諾'),

	_word_jp1('ミリティア', 'ミリティア'),

	_word_jp1('デルゾゲード|德格拉德|德魯佐蓋德|德索格德|德索索格德', '德魯佐蓋德'),
	_word_en3('Delfo Gade', '德魯佐蓋德'),

	_word_jp1('ディルヘイド|迪爾海德|迪爾希德', '迪爾海德'),
	_word_en3('Dillheide|Dihaide|Dilheide', '迪爾海德'),

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

	_word_jp1('アハルトヘルン|阿哈特赫恩', '阿哈特赫恩'),
	_word_jp1('リニヨン|利尼翁', '利尼翁'),

	_word_jp1('シン|辛', '辛'),
	_word_jp1('レグリア|雷格里亞', '雷格里亞'),

	_word_jp1('米瑟|ミサ|米薩', '米瑟'),
	_word_jp1('伊利奧羅格|イリオローグ', '伊利奧羅格'),

	_word_jp1('梅魯赫斯|メルヘイス', '梅魯赫斯'),
	_word_jp1('波蘭|ボラン', '波蘭'),

	_word_jp1('レイ|雷', '雷'),
	_word_jp1('グランズドリィ|格蘭斯特里', '格蘭斯特里'),

	[`雷${sp}格蘭斯特里`, '雷・格蘭斯特里'],
	[`雷：格蘭斯特里`, '雷・格蘭斯特里'],

	_word_jp1('蓋奧斯|ガイオス', '蓋奧斯'),
	_word_jp1('伊德魯|イドル', '伊德魯'),

	_word_jp1('格雷塞西恩|グラジェシオン', '格雷塞西恩'),

	_word_jp1('尼爾|ニール', '尼爾'),

];

/**
 * @deprecated
 */
export const words_old: IWords[] = _word_zh_all([
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

	['痕跡（Misuys）', '痕跡'],

	['錬魔', '錬魔'],

	['過去改変イングドゥ', '過去改変'],

	['時神の大鎌|時神創造之大鎌|時神的鐮刀|時間神的鐮刀', '時神の大鎌'],

	['魔力鐘錶|魔力時計', '魔力時計'],

	['(拘束魔鎖|拘留魔鏈)(（ギジェル）)?', '拘束魔鎖'],

	['(時間操作)(機械|機器)?(（Rebal）)?', '時間操作'],

	['(主格交替|主格交代)（デルト）', '主格交替'],

	['(分離融合転生|分離融合輪回)(ディノ・ジクセス|（(ディノ・ジクセス|Deingesier)）)?', '分離融合転生'],

	['魔王軍加易斯|魔王軍（ガイズ）', '魔王軍'],

	['(殲滅監獄火炮|獄炎殲滅砲|殲滅監獄炮|殲滅監獄炎|獄炎殲滅砲)(ジオ・グレイズ|（ジオ・グレイズ）|Geo Gray)?', '獄炎殲滅砲'],

	['(破滅|毀滅)の魔眼', '破滅的魔眼'],

	['(蓮葉|荷葉)氷の(指輪|戒指)', '蓮葉冰的戒指'],
]);

export const words_source: IWords[] = [

	_word_jp1('波魯迪戈烏多|沃爾迪戈多|ヴォルディゴード|沃爾迪戈德', '波魯迪戈烏多'),



	/**
	 *
	 */
	_word_jp1('艾米利亞|艾蜜莉亞', '艾米莉亞'),
	_word_jp1('迪魯海德|迪爾海德|迪魯黑德', '迪魯海德'),

	_word_jp1('デルゾゲード|德魯佐蓋德|德爾佐格爾|德爾佐格德', '德魯佐蓋多'),

	_word_jp1('アヴォス|阿沃斯', '阿伯斯'),
	_word_jp1('迪爾黑維亞|ディルヘヴィア|迪爾海維亞', '迪魯黑比亞'),


	_word_jp1('尼可朗|尼克朗', '涅庫羅'),

	_word_jp1('維納斯多諾亞', '貝努茲多諾亞'),

	/**
	 * 　ノノ・イノータ。
　シア・ミンシェン。
　ヒムカ・ホウラ。
　カーサ・クルノア。
　シェリア・ニジェム。

	 諾諾·伊諾塔。

希亞·敏仙。

西姆卡·霍拉。

卡莎·庫魯諾亞。

謝莉亞·尼杰姆。

	 梅諾瓦・希斯特里亞

	 愛蓮
	 */

	_word_jp1('伊尼迪歐|伊尼提奧', '伊尼迪歐'),


	_word_jp1('米薩|ミサ', '米莎'),

	_word_jp1('レイ', '雷伊'),
	_word_jp1('格蘭茲多利|格蘭斯多利', '格蘭茲多利'),

	_word_jp1('メルヘイス|梅爾赫斯', '梅魯黑斯'),

	_word_jp1('蓋伊歐斯|蓋奧斯', '蓋伊歐斯'),
	_word_jp1('伊多魯|伊特魯', '伊多魯'),

	_word_jp1('希亞|希雅', '希亞'),
	_word_jp1('西姆卡', '希姆卡'),
	_word_jp1('雪麗亞', '謝莉亞'),

	_word_jp1('雷谷利亞|雷伊格里亞|雷格里亞|格列利亞|列古利亞', '雷谷利亞'),

	_word_jp1('ミッドヘイズ', '米特赫伊斯'),

	_word_jp1('艾里奧|艾里歐|艾利歐', '艾里奧'),
	_word_jp1('盧德威爾|路德威爾', '路德威爾'),

	/**
	 * 愛蕾諾・碧昂卡
	 * 雷特利亞諾・加隆・阿斯欽
	 * 拉歐斯・加隆・吉爾弗歐達
	 * 海涅・加隆・伊奧魯格
	 * 迪亞哥・加隆・伊傑西卡
	 *
	 * 伊凡斯瑪那
	 *
	 * 瑟希婭・加隆・伊傑西卡
	 *
	 */

	_word_jp1('卡農|カノン', '加隆'),

	_word_jp1('アゼシオン|阿西翁|阿瑟席翁|阿賽西翁', '阿瑟席翁'),
	_word_jp1('ガイラディーテ|加拉底(?!特)|蓋拉底', '加拉底特'),

	_word_jp1('ジェルガ', '吉爾加'),

	_word_jp1('アルクランイスカ', '阿爾克蘭斯卡'),

	_word_jp1('(?<!艾)恩哈雷', '艾恩哈雷'),

	_word_jp1('愛蕾諾|艾雷諾', '愛蕾諾'),

	/**
	 *
	 */
	_word_jp1('アハルトヘルン|阿哈魯特海倫|雅哈爾特亨恩', '阿哈魯特海倫'),


	_word_jp1('ノウスガリア', '諾瓦斯加利亞'),


	_word_jp1('掠奪劍|略奪劍', '掠奪劍'),

	_word_jp1('蕾諾|雷諾', '蕾諾'),

	/**
	 *
	 */
	_word_jp1('ミレイヌ', '米雷伊努'),

	_word_jp1('ファンユニオン|粉絲小夥伴', '粉絲社'),

	_word_jp1('威戈・拉維亞茲', '猶格・拉・拉比阿茲'),

	_word_jp1('伊凡斯(瑪|馬)(那|納|那|娜)', '伊凡斯瑪娜'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	[/^[　 ]+/gm, ''],

	['<|＜', '〈'],
	['>|＞', '〉'],

	['▪', '・'],

	//_word_jp1('醬|ちゃん', '醬'),

	...lazymarks['clear_002'],

	//...lazymarks['class'],
	...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['ln_0010'],

	...lazymarks['4'],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	/**
	 * 無差別將 【】 轉為對話符號
	 * 如果可以盡量不要使用此規則
	 */
	//...lazymarks['7'],
	/**
	 * 將可能是對話的 【】 轉為對話符號
	 * 如果可以盡量不要使用此規則
	 */
	//...lazymarks['8'],

	/**
	 * 適用於具有大量長段 而只縮減對話之間的空格使用
	 */
	//...lazymarks['ln_talk'],

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
