/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';
import * as execall from 'execall';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '雪色エトランゼ';

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
export const words: IWords[] = [

	//['要取代的字', '取代後的字'],

	//['— —', '——'],

	[/雷古鲁斯?利穆威尓|雷格魯斯[・\?]利\??威尔/g, '雷古鲁斯・利穆威尓'],
	['雷古鲁斯|雷格魯斯', '雷古鲁斯'],
	[/利穆威尓|利\??威尔|魯姆威尔/g, '利穆威尓'],

	['カナデちゃん', '伽娜蒂酱'],
	['加娜德|伽娜蒂|伽娜媂|カナデ|賈娜蒂', '伽娜蒂'],
	['brave gear', '勇者裝備'],
	['勇者（braver）', '勇者'],
	['br[ea]ver?|勇者', '勇者'],
	['西滋奈|希兹娜', '希兹娜'],
	['莉莉安娜|利利安娜', '莉莉安娜'],

	['西里斯|西利斯|伊利斯', '西里斯'],
	['梯也尔|迪耶鲁|蒂亚路', '迪耶鲁'],

	['伽雷斯|加雷斯', '伽雷斯'],

	['卡力斯多|卡莉斯托|卡利斯多|卡里斯托', '卡莉斯托'],

	//['伊莉斯', '伊莉斯'],

	// スピラ
	['撕哔菈|Spira|丝碧拉', '絲碧拉'],

	['希巴鲁茨|修巴鲁兹|修巴鲁斯', '希巴鲁茨'],

	['小？姐', '小姐'],
	['正统府|王统府', '王统府'],

	['骑士公主|姬骑士', '姬骑士'],

	['水汽', '水氣'],

	[/^[ \t　]+/gm, ''],
	[/^"([^\"]+)"$/gm, '$1'],

	[/^(?:Act：)?\d+(?:\+\d+)?(?=\n)/ig, ''],

	[/([\u4E00-\u9FFF])\.(?!\.)/g, '$1。'],

	[/[\!\(\):,]/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

	function (_ret: string)
	{
		if (/\S\n{3}\S/.test(_ret) && !/\S\n{2}\S/.test(_ret))
		{
			_ret = _ret.replace(/\n{3}/g, '\n');
		}

		return _ret;
	},

	[/^([^\n"“”「」']*)["“']([^\n"“”「」']*)["”']/gm, '$1「$2」'],
	[/^([^\n"“”『』'‘’]*)["“'‘]([^\n"“”『』'‘’]*)["”'’]/gm, '$1『$2』'],

	[/\n+\-*\d+(完)[。\-]*$/g, ''],

	[/\[/g, '「'],
	[/\]/g, '」'],

] as IWords[];

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: vMaybe = [

	//'需要偵測的字',

	'奏',

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
