/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe } from '.';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = 'ウォルテニア戦記';

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

	[/被?(?:异世界召唤|召唤到异世界|召唤到异世界|召喚到異世界)後?[的]?[第]?(\d+)[日天]目?/gm, '异世界召唤第$1日'],

	[/(异世界召唤第?\d+[日天]目?|第\d+[日天])([^\n]*)[\[「\{（]([^\]\n]+)[\]」\}）]/gm, '$1$2【$3】'],

	[/(异世界召唤第\d+日[^\n]*)[ ]+(【)/gm, '$1$2'],

	[/(异世界召唤第\d+日[^\n]*)(\:)?\n+/g, function (...m)
	{
		if (m[2])
		{
			m[2] = StrUtil.toFullWidth(m[2]);
		}
		else if (typeof m[2] == 'undefined')
		{
			m[2] = '';
		}

		return `${m[1]}${m[2]}\n\n`;
	}],

	['玛飞锡特|瑪飛錫特|玛非菲锡|玛非锡特|马尔菲斯特|梅尔菲斯', '瑪非錫特'],
	['萨拉|莎拉', '莎拉'],
	['萝拉', '萝拉'],

	['夏蒂娜|夏鲁缇娜', '夏蒂娜'],

	// #25 #26
	['纱雅|咲耶|咲夜|佐久夜', '咲夜'],
	['纳尔蒂娜|梅爾緹娜|纳尔迪娜', '梅爾緹娜'],
	['貝爾格斯通|伯格顿', '貝爾格斯通'],
	['格哈德|格哈特|格魯哈魯特|格哈魯', '格哈特'],
	['平民公主|庶民公主', '庶民公主'],
	['露碧丝|露比丝|露碧絲', '露碧絲'],
	['霍城|霍德拉姆|霍洛兰|鼓城', '霍德拉姆'],
	['大厅鼓?将军', '霍德拉姆将军'],
	['羅赛里亚王国|李尔王国', '羅赛里亚王国'],
	['羅赛里亚|罗泽利亚', '羅赛里亚'],
	['米海爾|米歇尔|米海尔', '米海爾'],
	['艾蕾娜|埃琳娜', '艾蕾娜'],

	// @todo 紅獅子
	['莉欧奈|黎歐內', '莉欧奈'],
	['波尔茨|波爾斯|波爾次|伯罗斯', '波尔茨'],

	['盖耶斯|盖亚西', '盖亚西'],

	['加增', '增加'],
	['選擇肢裡', '選擇裡'],

	['想到的注意', '想到的主意'],
	['尽然回事', '竟然會是'],
	['尽然', '竟然'],
	['、廉贞', '、亮真'],
	['能上站成', '能上战场'],
	['撤退站', '撤退战'],

	['只道先带', '只到先代'],

	[/\*{2,3}ノ本/, '日ノ本'],

	[/\[/g, '「'],
	[/\]/g, '」'],

	[/^([^\n"]*)"([^\n"]*)"/gm, '$1「$2」'],
	[/\{([^\n\{}【】「」]*)\}/gm, '【$1】'],

	[',', '、'],

	[/([…吗么嗎麼人中聊哦办呢啊]\?+|\?+[」…）！])/ug, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
				//not_default: true,
			},
		});
	}],

	[/[\!\(\):]|\d+[：:]/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
				//not_default: true,
			},
		});
	}],

	[/([\u4E00-\u9FFF])\.(?!\.)/g, '$1。'],

	[/\n([ ]*[^：\n]+)\n+[ ]*([^：\n]+：[^\n]*)/ug, '\n$1\n\n$2'],
	[/\n[ ]*([^：\n]+：[^\n]*)\n+([ ]*[^：\n]+\n)/ug, '\n$1\n\n$2'],

	[/\n+\-+\n+/gm, '\n\n\n'],

] as IWords[];

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
