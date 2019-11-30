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
 */
export const words_source: IWords[] = [



	/**
	 *
	 */
	_word_jp1('カレンディル|卡倫狄魯|卡倫威爾|卡倫迪爾', '卡倫狄魯'),

	_word_jp1('カリュネーラ|卡瑠妮菈|卡琉妮菈', '卡琉妮菈'),
	_word_jp1('ネーラ|妮菈|奈拉', '妮菈'),

	_word_jp1('ゾンターク|崇達克', '宗達克'),

	_word_jp1('佩倫', '佩倫'),
	['里茲', '里茲'],

	_word_jp1('阿爾芬|埃爾芬', '阿爾芬'),

	// 特勒斯科、古羅迪斯、貝魯里翁、十字路城

	_word_jp1('特勒斯科|提依絲高|テレスコ', '特勒斯科'),
	_word_jp1('古羅德思|古羅迪斯|グロウディス', '古羅迪斯'),
	_word_jp1('貝爾利昂|ベルリオン|貝魯里翁', '貝魯里翁'),




	// 杰克
	_word_jp1('梅蓓爾', '梅蓓爾'),

	_word_jp1('修伊', '修伊'),

	_word_jp1('夫拉姆|芙拉姆', '芙拉姆'),


	/**
	 * 十字路城
	 */
	_word_jp1('托瓦寧格', '多瓦寧古'),
	_word_jp1('瓦路茲', '華爾茲'),
	_word_jp1('烏茲', '伍茲'),

	_word_jp1('庫洛斯洛德', '十字路城'),
	_word_jp1('十字路口', '十字路城'),

	_word_jp1('莉妮特', '莉妮特'),

	_word_jp1('皮妞|比雅', '皮妞'),

	_word_jp1('灼熱の?金床亭|灼熱の?鐵砧亭', '灼熱鐵砧亭'),

	_word_jp1('比艾特村|比埃托村', '比埃托村'),

	/**
	 *
	 */
	_word_jp1('甘迪魯|ガンディル', '甘迪魯'),

	_word_jp1('ペネロペ', '佩涅羅佩'),

	/**
	 *
	 */

	_word_jp1('ミスクロニア|米斯克羅尼亞|密斯克洛尼亞|密斯庫洛尼亞|米斯庫羅裡田|米思庫索尼工', '密斯克洛尼亞'),

	['(?:米思庫|米斯庫)(?=王|国)', '密斯克洛尼亞'],

	_word_jp1('ブラン|布朗|布蘭', '布朗'),

	[`${sp}布朗${sp}密斯克洛尼亞`, '布朗・密斯克洛尼亞'],


	_word_jp1('瑪爾瑞爾|瑪莉艾爾|馬爾瑞爾|瑪魯艾爾', '瑪莉艾爾'),
	_word_jp1('馬爾|梅露', '瑪爾'),


	_word_jp1('依露歐妮|イルオーネ', '依露歐妮'),
	_word_jp1('依露|イル|依魯', '依露'),

	_word_jp1('ティナーヴァ|緹娜娃', '緹娜娃'),
	_word_jp1('蒂娜|緹娜', '緹娜'),

	_word_jp1('艾爾文', '艾爾文'),

	_word_jp1('艾伯特|阿魯托|アルバート', '艾伯特'),

	_word_jp1('愛德華|艾德華', '艾德華'),

	[`艾德華${sp}馮${sp}布魯(?:斯拉許)?`, '艾德華・馮・布魯斯拉許'],

	_word_jp1('クロン|庫倫|克郎', '庫倫'),
	_word_jp1('リュメール|蕾米勒|琉梅爾', '琉梅爾'),
	_word_en3('Ryumeru', '琉梅爾'),

	_word_jp1('ジャン', '約恩'),
	_word_jp1('ミニル', '米尼爾'),
	_word_en3('Miniru', '米尼爾'),

	_word_jp1('葛瑞絲|格蕾絲', '葛瑞絲'),

	_word_jp1('ヴィクトール', '維克托'),

	_word_jp1('サイデン', '賽鄧'),

	/**
	 *
	 */
	_word_jp1('馬克思|マルクス', '馬克思'),
	_word_jp1('帕美拉|帕米拉|パメラ', '帕美拉'),
	_word_jp1('勒內庫蘇|レリクス|雷力克斯', '雷力克斯'),
	_word_jp1('布萊克|ブレイク|布雷克', '布雷克'),
	_word_jp1('索恩|ソーン|孫', '孫'),

	_word_jp1('美兒琪娜|梅爾喹|梅魯吉娜|メルキナ', '美兒琪娜'),

	_word_jp1('卡蓮', '卡蓮'),
	_word_jp1('雪莉', '雪莉'),

	_word_jp1('德博拉|黛博拉', '黛博拉'),

	_word_jp1('希坦|希譚|シータン|郗', '希坦'),

	/**
	 *
	 */
	_word_jp1('阿爾肯尼亞絲綢?|阿爾嘉尼亞絲', '阿爾嘉尼亞絲'),

	_word_jp1('阿爾肯尼亞|阿爾嘉尼亞', '阿爾嘉尼亞'),

	_word_jp1('美佳子', '楠葉'),
	_word_jp1('津千', '土見'),

	/**
	 *
	 */
	_word_jp1('安提爾|アンティール|安提魯', '安提魯'),

	_word_jp1('里札多曼|リザードマン', '里札多曼'),
	_word_jp1('アリゲーティアン|阿里葛提安', '阿里葛提安'),

	/**
	 *
	 */
	_word_jp1('ゲッペルス|蓋佩魯思|庫貝魯斯', '戈培爾'),
	_word_jp1('梅魯其斯|梅爾基司', '梅爾基司'),

	_word_jp1('葛里', '葛里'),

	/**
	 *
	 */
	_word_jp1('曼特巴司|瑪昂多巴士|マウントバス', '曼特巴司'),

	_word_jp1('里伊', '里伊'),

	/**
	 *
	 */

	['魔鬥術', '魔鬥術'],

	['艾利亞多', '艾利亞多'],



];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['狀態列', '狀態'],
	['魔鬥術', '魔鬥術'],

	[/^　+/gm, ''],

	[/(?<=\S)\n{1,2}(?=[—－─][☆★☆－—─]+)/gm, '\n\n\n'],

	[/(?<=^【[^\n]+】[^\n]+)\n{2,3}(?=【[^\n]+】)/gm, '\n'],

	[/(?<=」)\n{2}(?=「)/gm, '\n'],

	...lazymarks['clear_002'],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['ln_0010'],

	...lazymarks['4'],

	_word_en3(/\d+(mp|MP)/ig, function (...m)
	{
		return StrUtil.toFullNumber(m[0]);
	}),

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	...lazymarks['ln_talk'],

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
