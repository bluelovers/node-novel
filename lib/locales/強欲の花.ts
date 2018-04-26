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
export const words: IWords[] = sublib._word_zh_all([

	['拉奥斯提亚|劳斯提亞|ラオスティア', '拉奧斯提亞'],
	['諾斯提亞|ノスティア', '諾斯提亞'],
	['高卢|ガウル', '高卢'],
	[`(?:高卢|瑪丽)${sp}諾斯提亞`, '$1・諾斯提亞'],

	[`(?:诚一|成一)(?:[。・])(?:如月|Kisaragi)`, '诚一・如月'],

	['(?:強欲|貪婪)の(种|芽)', '強欲の$1'],

	['ダン|丹', '丹'],
	['诚一|セイイチ', '诚一'],

	['奥尔特|オルト|Oruto', '奥尔特'],
	['格蘭特|グラント|Guranto', '格蘭特'],

	['異世界を渡し者|異世界穿越者|異世界渡者|異世界过渡者|跨过異世界的人', '異世界渡者'],

	['奧古|奧克|奧加|オーガ', '奧加'],

	['賽丽絲|Serisu|セリス|塞丽絲', '賽丽絲'],

	['跌落品|掉落品', '掉落品'],

	[/lv/ig, 'LV'],

	[/Chimera|奇美拉/ig, '奇美拉'],

	[/水禾魯夫|水沃尔夫/ig, '水沃尔夫'],

	['撒魯洛斯的迷宮|サウロスの迷宮', '撒魯洛斯的迷宮'],

	[/前人未踏|前人未达/ig, '前人未踏'],

	[/\n+(◆[^\n]+)\n+/gm, '\n\n$1\n\n'],

	[/\n+(─+[^\n─]+─+)\n+/gm, '\n\n\n$1\n\n'],
	[/\n+(-+[^\n─]+-+)\n+/gm, function (s, $1)
	{
		return `\n\n\n${$1}\n\n`.replace(/-/g, '─');
	}],

	['異種族間交尾|異种族間交配|异种族交尾巴', '異種族間交尾'],

	...sublib.lazymarks['class'],

	[/^(【[^\n]+)\n+(?=【)/gm, '$1\n'],
	[/^[　 ]+/gm, ''],

	//[/^回复举报[^\n]+\n+[^\n]+\n正式会员\d$/gm, '\n'],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	[/^【([^\n【】 ]+)(\n[^【】]+)】/gm, '「$1$2」'],
	[/^【([^\n【】 ]+[，。！…？][^\n【】]*)(\n[^【】\n]+)】/gm, '「$1$2」'],
	[/^【([^\n【】 ]+[，。！…？][^\n【】]*)】/gm, '「$1」'],

	[/^【([^\n【】]{10,})】/gm, '「$1」'],
	[/^【([^\n【】 ]{9,})】/gm, '「$1」'],

	[/\[/g, '【'],
	[/\]/g, '】'],

	[/\{/g, '《'],
	[/\}/g, '》'],

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
