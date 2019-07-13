/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '強欲の花';

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

	['拉奥斯提亚|劳斯提亞|ラオスティア|劳苏提亞', '拉奧斯提亞'],
	['諾斯提亞|ノスティア|nosutia|Nosutia|諾眭迪亞|諾斯蒂亞|諾スティア', '諾斯蒂亞', 'ig'],
	['高卢|ガウル', '高卢'],
	[`(?:高卢|瑪丽)${sp}諾斯蒂亞`, '$1・諾斯蒂亞'],

	[`(?:诚一|成一)(?:[。・])(?:如月|Kisaragi)`, '诚一・如月'],

	['(?:強欲|貪婪)の(种|芽)', '強欲の$1'],

	['ダン|丹', '丹'],
	['诚一|セイイチ', '诚一'],

	['奥尔特|オルト|Oruto', '奥尔特'],
	['格蘭特|グラント|Guranto', '格蘭特'],

	['跨过異世界之人|異世界を渡し者|異世界穿越者|異世界渡者|異世界过渡者|跨过異世界的人', '異世界渡者'],

	['奧古|奧克|奧加|オーガ', '奧加'],

	['鐮倉', '鐮倉'],

	['賽丽絲|Serisu|セリス|塞丽絲', '賽丽絲'],

	['貝莉婭|伯里亚', '貝莉婭'],

	['跌落品|掉落品', '掉落品'],

	['強(大的)?新游戏|強化模式', '強化模式'],

	['Jozu(da)?|乔茲', '乔茲'],

	['賽瑞納|Serena|塞丽娜|セレナ', '塞丽娜'],

	[/lv/ig, 'LV'],
	[/水平 ?(\d+)/ig, 'LV$1'],

	[/JēKuru|Jekuru|泽庫魯|ジェークル|杰庫魯/ig, '泽庫魯'],
	[/泽庫魯(城镇|都?市)|(城镇|都市)泽庫魯/ig, '都市泽庫魯'],

	[/Chimera|奇美拉/ig, '奇美拉'],

	[/Gurantia|格蘭蒂亞/ig, '格蘭蒂亞'],

	[/Item ?Box|物品箱|道具箱/ig, '道具箱'],

	[/水禾魯夫|水沃尔夫/ig, '水沃尔夫'],

	[/魔神の加護|魔神的呵護/ig, '魔神的加護'],

	[/哈梅倫|ハーメルン/ig, '哈梅倫'],
	[/ベルク/ig, 'ベルク'],

	[/ノワール|諾瓦尔|诺瓦卢|諾瓦魯/ig, '諾瓦尔'],

	[/几吕博雅火山|龍神火山/ig, '龍神火山'],

	['拿都斯|桑納托斯|タナトス|Tanatosu', '桑納托斯'],
	['撒魯洛斯|サウロス|萨乌罗斯|卡乌魯斯|掃羅斯', '萨乌罗斯'],
	['(撒魯洛斯|サウロス|萨乌罗斯)の迷宮', '萨乌罗斯的迷宮'],

	[/前人未踏|前人未达/ig, '前人未踏'],

	[/史萊姆Eater|史萊姆吞噬者/ig, '史萊姆吞噬者'],

	[/\n+(◆[^\n]+)\n+/gm, '\n\n$1\n\n'],

	[/\n+(─+[^\n─]+─+)\n+/gm, '\n\n\n$1\n\n'],
	[/\n+(-+[^\n─]+-+)\n+/gm, function (s, $1)
	{
		return `\n\n\n${$1}\n\n`.replace(/-/g, '─');
	}],

	['異種族間交尾|異种族間交配|异种族交尾巴', '異種族間交尾'],

	...lazymarks['class'],

	[/^(【[^\n]+)\n+(?=【)/gm, '$1\n'],
	[/^[　 ]+/gm, ''],



	//[/^回复举报[^\n]+\n+[^\n]+\n正式会员\d$/gm, '\n'],

	...lazymarks[4],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	[/^【([^\n【】 ]+)(\n[^【】]+)】/gm, '「$1$2」'],
	[/^【([^\n【】 ]+[，。！…？][^\n【】]*)(\n[^【】\n]+)】/gm, '「$1$2」'],
	[/^【([^\n【】 ]+[，。！…？～][^\n【】]*)】/gm, '「$1」'],

	[/^【([^\n【】]{10,})】/gm, '「$1」'],
	[/^【([^\n【】 ]{9,})】/gm, '「$1」'],

	[/\[/g, '【'],
	[/\]/g, '】'],

	[/\{/g, '《'],
	[/\}/g, '》'],

	[/\n+\*+$/g, ''],

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
