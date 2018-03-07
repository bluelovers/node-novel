/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '悠久の愚者アズリーの、賢者のすゝめ';

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

	['利德|利多', '利德'],
	['莱昂|莱安', '莱昂'],

	['fall ?town', '法鲁镇', 'ig'],
	['shift magic', 'swift magic', 'g'],

	['悠久の雫', '悠久の雫'],

	['LEVELUP|等級上升|Lv UP', '等級上升', 'ig'],
	['Level|等級', '等級', 'ig'],

	['(復|複)合魔法', '複合魔法'],
	['六角结晶|六角結界', '六角結界'],
	['六芒星の魔術陣', '六芒星的魔術陣'],

	['战魔历|戦魔暦', '战魔暦'],

	...[
		['Airwall', '空气壁'],
		['Elemental Prism', '元素棱镜'],
		['Tension UP', '斗志提升'],
		['FireStamp＆Control', '火焰刻印＆控制'],
		['Little Fire', '小火焰弹'],
		['Torch', '火把'],
		['Title UP', '称号增益'],
		['ClockBack＆Stop', '时間逆转和停止'],
		['GrandNeedle', '地刺'],
		['Recover', '回復'],
		['Low Cure|低級治疗|(?:下|低)級(?:治疗|治癒)', '下級治癒'],
		['Middle Cure|中級(?:治疗|治癒)', '中級治癒'],
		['High Cure|高級(?:治疗|治癒)', '高級治癒'],
		['Store Room', '储物空間'],
		['Dynami──Te|Dynamite', '炸药'],
		['Copy＆Write', '復制＆书写'],
		['Letter Edit', '书信编辑'],
		['Aerial Dancer', '空中舞者'],
	].reduce(function (a, b: string[])
	{
		a.push([b[0] + '|' + b[1], b[1], 'ig']);
		//a.push([b[1], b[1], 'ig']);
		a.push([b[1] + '([！!。])（' + b[1] + '）', b[1] + '$1', 'ig']);

		return a;
	}, [] as IWords[]),

	['xing格', '性格', 'g'],
	['(鑒|鑑)(定|別)', '鑑定'],
	['工会|公会|行会', '公会'],

	[/\d+/ig, function (s)
	{
		return StrUtil.toFullNumber(s);
	}],

	[/Rank ?([sa-f])(?!\w)/ig, 'Rank $1'],

	[/LV|HP|MP|EXP/ig, function (s)
	{
		return StrUtil.toFullEnglish(s.toUpperCase());
	}],

	[/(：[^\?\n]+)\?(?!\?)/g, '$1・'],
	[/(：[^\?\n]+)\?(?!\?)/g, '$1・'],
	[/(：[^\?\n]+)\?(?!\?)/g, '$1・'],

	[/^　+/gm, ''],

	[/^────([^\n]+)────$/gm, function (s)
	{
		return s.replace(/\s/g, '　');
	}],

	[/[［\[]/g, '「'],
	[/[］\]]/g, '」'],

	[/\n+([～])/g, '\n\n\n$1'],

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

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
