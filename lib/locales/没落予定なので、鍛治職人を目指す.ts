/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

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
export const words: IWords[] = sublib._word_zh_all([

	['庫魯利', '庫魯利'],

	/**
	 * 玛莉
	 * 莫兰爷爺
	 * 庫里斯・海兰
	 *
	 * 瓏修瀑布
	 * 梧桐湖
	 * 朵塔貝依魯山
	 */
	['愛絲', '愛絲'],
	['多拉利|多拉魯|トラル', '多拉魯'],

	['莫蘭|モラン', '莫蘭'],
	[`海兰|ヘラン`, '海蘭'],
	[`庫里斯|克里斯`, '克里斯'],

	[`${sp}海兰`, '・海蘭'],

	[`登迦|登伽`, '登迦'],
	['莉露|リール', '莉露'],
	['羅茨昂|ロツォン', '羅茨昂'],

	/**
	 * 阿庫?庫丹卡
	 * 庫丹王国
	 */
	['阿庫|アーク|亞克', '亞克'],
	['拉瑟|ラーサー', '拉瑟'],

	['馬雷|マーレー', '馬雷'],

	['庫丹卡?|クダン', '庫丹'],

	[`${sp}庫丹`, '・庫丹'],

	['威魯|レイル', '威魯'],
	['哈蒂|ハーティ', '哈蒂'],

	['麻里婭|瑪利婭|麻里婭|瑪利亞', '瑪利亞'],

	['梅莉梅|メイリメ', '梅莉梅'],

	/**
	 * 艾蕾諾瓦魯学園
	 *
	 * 国王騎士长的儿子，叫瓦因・洛茲托
	 */
	['艾莉莎|エリザ|艾丽莎|愛丽莎', '艾莉莎'],
	['朵威尔|德威魯|多維尔|朵薇尔|ドーヴィル', '德威魯'],
	[`${sp}德威魯`, '・德威魯'],

	['埃里斯|アイリス|愛莉絲|愛里斯|愛丽絲|愛丽斯', '愛莉絲'],
	['帕拉拉|パララ', '帕拉拉'],

	['エレノワール|艾蕾諾瓦魯|艾雷諾瓦魯|愛蕾諾瓦魯', '艾蕾諾瓦魯'],

	[`${sp}帕拉拉`, '・帕拉拉'],

	['法米魯|ファミール', '法米魯'],

	['瓦因|ヴァイン', '瓦因'],
	['洛茲托|ロット', '洛茲托'],

	[`${sp}洛茲托`, '・洛茲托'],

	['米歇爾', '米歇爾'],

	['克洛西|クロッシ|庫罗西', '庫羅西'],

	/**
	 * 塔利司馬
	 *
	 */
	[`拉薩恩|ラザン`, '拉薩恩'],
	[`トータペイルの丘|朵塔貝依魯山`, '朵塔貝依魯山'],
	['阿米拉雷|艾米拉雷', '艾米拉雷'],

	/**
	 *
	 */
	['銀圓|銀币|銀貨', '銀币'],
	['植物|植株', '植物'],
	['名子|名字', '名字'],
	['王国騎士長|国王騎士长', '王国騎士長'],

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

	[/^[　 ]+/gm, ''],

	_word_en(/\d+/g, function (...m)
	{
		if (m[1] == '─')
		{
			//m[1] = '—';
		}

		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	[`｛`, '「'],
	[`｝`, '」'],

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
