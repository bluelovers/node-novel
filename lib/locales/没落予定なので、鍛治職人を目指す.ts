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
export const lang = '没落予定なので、鍛治職人を目指す';

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
export const words_source: IWords[] = [

	['庫魯利', '庫魯利'],
	_word_jp1('クルリ|克裡利', '庫魯利'),

	/**
	 * 玛莉
	 * 莫兰爷爺
	 * 庫里斯・海兰
	 *
	 * 瓏修瀑布
	 * 梧桐湖
	 * 朵塔貝依魯山
	 *
	 * 哈普・海蘭
	 */
	['愛絲', '愛絲'],
	['多拉利|多拉魯|トラル|特拉魯|托拉爾', '多拉魯'],

	['莫蘭|モラン|莫拉', '莫蘭'],
	[`海兰|ヘラン|黑兰`, '海蘭'],
	[`庫里斯|克里斯`, '克里斯'],

	['庫魯利海蘭', '庫魯利・海蘭'],

	[`${sp}海兰`, '・海蘭'],

	[`登迦|登伽`, '登迦'],
	['莉露|リール', '莉露'],
	['羅茨昂|ロツォン|路羡昂|路茨昂|羅茲昂?|羅拜', '羅茨昂'],

	/**
	 * 阿庫?庫丹卡
	 * 庫丹王国
	 */
	['阿庫|アーク|亞克|亞庫', '亞克'],
	['拉瑟|ラーサー|拉薩', '拉瑟'],

	['馬雷|マーレー', '馬雷'],

	['庫丹卡?|クダン', '庫丹'],

	[`${sp}庫丹`, '・庫丹'],

	['威魯|レイル', '威魯'],
	['哈蒂|ハーティ', '哈蒂'],

	_word_jp1('マリア|麻里婭|瑪利婭|麻里婭|瑪利亞|瑪麗雅', '瑪利亞'),

	['梅莉梅|メイリメ', '梅莉梅'],

	/**
	 * 艾蕾諾瓦魯学園
	 *
	 * 国王騎士长的儿子，叫瓦因・洛茲托
	 *
	 * 艾雅・特維尔
	 *
	 *
	 * 狗    阿爾弗里德
	 * 愛西亞
	 * 媽媽叫做古拉丽莎
	 * 米迦魯
	 */
	['艾莉莎|エリザ|艾丽莎|愛丽莎', '艾莉莎'],
	_word_jp1('艾莉|艾丽|エリー|伊利|艾利', '艾莉'),

	['(艾莉)先生', '艾莉桑'],

	_word_jp1('エヤン|艾楊|艾雅|艾洋', '艾楊'),

	_word_jp1('ツクシ', '蘇庫西'),

	['朵威尔|德威魯|多維尔|朵薇尔|ドーヴィル|特維尔|德貝爾', '德貝爾'],
	[`${sp}(?:德威魯|德貝爾)`, '・德貝爾'],

	['米凱爾|米迦魯', '米迦魯'],
	['愛西亞|阿希亞', '愛西亞'],
	['克拉莉莎|古拉丽莎', '克拉莉莎'],

	['埃里斯|アイリス|愛莉絲|愛里斯|愛丽絲|愛丽斯|艾麗斯|艾莉斯', '愛莉絲'],
	['帕拉拉|パララ', '帕拉拉'],

	['阿爾弗里德', '阿爾弗里德'],

	['エレノワール|艾蕾諾瓦魯|艾雷諾瓦魯?|愛蕾諾瓦魯|艾兰芙魯', '艾蕾諾瓦魯'],

	[`${sp}帕拉拉`, '・帕拉拉'],

	['法米魯|ファミール', '法米魯'],

	['瓦因|ヴァイン', '瓦因'],
	['洛茲托|ロット', '洛茲托'],

	[`${sp}洛茲托`, '・洛茲托'],

	['モーリ|莫里', '莫里'],
	['格亞普|ギャップ|加普', '格亞普'],

	[`${sp}格亞普`, '・格亞普'],

	['トミル|托米卢', '托米卢'],
	['庫恩|ゲイン', '庫恩'],

	[`${sp}庫恩`, '・庫恩'],

	['ライアン|瑞安', '瑞安'],
	['克里斯托法|クリストファー', '克里斯托法'],

	[`${sp}克里斯托法`, '・克里斯托法'],

	['米歇爾', '米歇爾'],

	['克洛西|クロッシ|庫罗西|庫洛西', '庫羅西'],

	['雷魯|雷爾', '雷魯'],

	/**
	 * 卡拉庫・瑪尔
	 * 卡拉科・瑪爾
	 */
	['卡拉古|卡拉庫|卡拉克', '卡拉庫'],
	[`${sp}瑪爾`, '・瑪爾'],

	/**
	 * 塔利司馬
	 *
	 */
	[`拉薩恩|ラザン`, '拉薩恩'],
	[`トータペイルの丘|朵塔貝依魯山`, '朵塔貝依魯山'],
	_word_jp1('アッミラーレ|阿米拉雷|艾米拉雷|艾米拉雷', '艾米拉雷'),

	/**
	 * 萊奧托・諾里斯
	 */

	/**
	 * チューイスト·カラサス 喬伊斯托·卡拉薩斯，卡拉薩斯領領主
	 * パーパネル牧場 帕帕尼爾牧場
	 *
	 * ジャング 強古，犯罪者代表。 ジャング也有廢品、**的意思。
	 *
	 * グラシュー 格拉修，當托兒的工匠青年
	 *
	 * プーベエ 普貝，庫魯利養的幼龍。
	 *
	 * カラサス 卡拉薩斯領，海蘭領西邊接壤的領地。
	 */
	_word_jp1('チューイスト|喬伊斯托', '喬伊斯托'),
	_word_jp1('カラサス|卡拉薩斯', '卡拉薩斯'),

	_word_jp1('パーパネル|帕帕尼爾', '帕帕尼爾'),

	_word_jp1('ジャング|強古', '強古'),

	_word_jp1('ヌーノ|努諾', '努諾'),
	_word_jp1('トリスターナ|崔絲塔納|特里斯塔納', '特里斯塔納'),

	_word_jp1('グラシュー|格拉修', '格拉修'),

	_word_jp1('プーベエ|普貝|普維爾|普貝耶|普貝爾', '普貝'),

	_word_jp1('ライオット|萊奧托', '萊奧托'),
	_word_jp1('諾里斯', '諾里斯'),

	/**
	 *
	 */
	_word_jp1('活力钻|活力鉆|ピチダイ', '活力鑽'),
	_word_jp1('ピチピチダイヤモンド|活力滿滿大鑽石', '活力滿滿大鑽石'),

	_word_jp1('ダータネル|達特尼爾', '達特尼爾'),


	_word_jp1('タロン|塔隆', '塔隆'),
	_word_jp1('プースル|普蘇魯', '普蘇魯'),

	_word_jp1('サンミャー', 'サンミャー'),

	_word_jp1('フォンテーヌ', '福爾德'),
	_word_jp1('アレグラーデン|亞歷史登', '亞歷山大'),


	_word_jp1('ペタル|佩塔爾', '佩塔爾'),

	_word_jp1('ゴウロウ|戈烏羅', '戈烏羅'),

	/**
	 *
	 */


	_word_jp1('サルマン|薩魯曼', '薩魯曼'),





	/**
	 *
	 */
	['銀圓|銀币|銀貨', '銀币'],
	['植物|植株', '植物'],
	['名子|名字', '名字'],
	['王国騎士長|国王騎士长', '王国騎士長'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['据然|竟然', '竟然'],

	...lazymarks['class'],

	...lazymarks['4'],

	[/^[　 ]+/gm, ''],
	[/^\.$/gm, ''],

	[/　(?=」)/g, ''],

	_word_en(/\d+/g, function (...m)
	{
		if (m[1] == '─')
		{
			//m[1] = '—';
		}

		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	[`｛`, '「'],
	[`｝`, '」'],

	[/^【(?!W：)([^\n【】]+(?:\n[^\n【】]+)?)】/gm, '「$1」'],
	[/^【【(?!W：)([^\n【】]+(?:\n[^\n【】]+)?)】】/gm, '「「$1」」'],

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
