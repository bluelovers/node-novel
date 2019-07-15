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
export const lang = '火輪を抱いた少女';

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

export const words_source: IWords[] = [

	/**
	 * 皇族的姓氏从巴鲁迪卡更正为瓦鲁迪卡、前一节的城市名从洛库贝尔更正为洛库贝鲁城。帝国名从霍尔西德变更为霍鲁西德。寇因布拉变更为寇因布拉州。
	 * （注：阿秘鲁 全名改为 阿米鲁 瓦鲁迪卡 奎英布拉太守为古罗鲁 里斯提赫改为里斯迪比 古罗鲁之子艾露迦改为艾鲁伽 前同，下同。 第九话之后全部使用译名整合里的译名。）
	 */

	['巴爾迪卡|巴鲁迪卡|瓦鲁迪卡|巴路提卡|瓦鲁迪卡|巴鲁提卡', '瓦魯迪卡'],
	['洛库贝尔|洛库贝鲁', '洛庫貝魯'],
	['霍尔西德|霍鲁西德', '霍魯西德'],
	['寇因布拉|寇因布拉', '寇因布拉'],

	['埃德利赫|艾德利希', '艾德利希'],
	['阿秘鲁', '阿米魯'],
	['里斯提赫', '里斯迪比'],
	['艾露迦', '艾魯伽'],

	['阿秘魯', '阿米魯'],
	[`阿米魯${sp}巴魯提卡`, '阿米魯．瓦魯迪卡'],



	['諾(?:埃|耶)爾|諾艾露', '諾艾露'],

	[/([\u4E00-\u9FFF])[\?\.](巴乌|波斯|埃德|瓦鲁|艾德|凯洛|阿莱|巴哈|卢特)/g, '$1・$2'],
	[/(辛西娅)\?(艾)/g, '$1・$2'],

];

export const words: IWords[] = _word_zh_all([

	...words_source,

	[/^(第[^\n+])[章話][ \t　]*([^\n]*)\n+/g, '$1話　$2\n\n'],
	[/(第[^\n+])[章話](完)?/g, '$1話$2'],

	[/^(第[^\n+][章話][^\n]*)\n+[一\—\-]+\n+/g, '$1\n\n'],



	[/^\?([\u4E00-\u9FFF])/gm, '・$1'],

	[/[—-]/g, '—'],

	...lazymarks['class'],
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

	//...lazymarks['8'],

	...lazymarks['clear_002'],

	...lazymarks['ln_talk'],

	[/(?<=[\d０-９]+)(?=\n\S)/ug, '\n'],

	[/(?<=\S)\n{1,2}(?=[\d０-９]+\n)/ug, '\n\n\n'],

	[/(?<=\S)\n{1,2}(?=■)/ug, '\n\n\n'],

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
