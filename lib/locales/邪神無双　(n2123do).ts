/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, _word_jp1 } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '';

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


	['晴艾|晴愛', '晴艾'],

	['索里雅', '索里雅'],

	['安潔', '安潔'],
	['安潔莉妮|安潔莉娜', '安潔莉妮'],

	['琉乃亞', '琉乃亞'],

	['氏族・(レイジ|伶二|狂怒)', '氏族・伶二'],

	['刹竜劍', '刹竜劍'],
	['威芙爾|ヴィーブル', '威芙爾'],

	/**
	 *
	 */
	['波格尼亞', '波格尼亞'],
	['尼娜|妮娜', '妮娜'],

	/**
	 *
	 */
	['狄安娜', '狄安娜'],

	/**
	 * 孤兒
	 */
	['蕾蓓卡', '蕾蓓卡'],
	['里昂', '里昂'],

	/**
	 *
	 */
	['摩根', '摩根'],
	['布萊格|ブライグ', '布萊格'],
	_word_jp1('羅格|ログ', '羅格'),

	/**
	 * 冒険者
	 */
	['ラミアス|菈米亞絲', '菈米亞絲'],
	['蘭加|ランガ', '蘭加'],

	/**
	 *
	 */
	_word_jp1('アルフレッド|阿爾弗雷德', '阿爾弗雷德'),


	/**
	 *
	 */
	['状态栏|ステータス', '狀態欄'],
	['人族|ヒューマン', '人族'],
	['魚人|マーマン', '魚人'],
	['魔鲨|デビルシャーク', '魔鲨'],
	['氏族|Clan|クラン', '氏族'],
	['蛤蠣|奴隷', '奴隷'],
	['初始之街|初始之鎮', '初始之街'],

	['隼劍|ハヤブサの劍', '隼劍'],
	['秘銀|ミスリル', '秘銀'],
	['人狼族|ウェアウルフ', '人狼族'],

	['暗影沼澤|シャドウスワンプ', '暗影沼澤'],
	['邪神微笑|邪神スマイル', '邪神微笑'],

	['地盘|シマなん', '地盤'],
	['颤抖|ガクガク', '顫抖'],

	_word_jp1('フロア', '階層'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	/**
	 *
	 */
	['笨淡|笨蛋', '笨蛋'],
	['魂淡|混蛋', '混蛋'],

	...lazymarks['class'],

	[/\n+(\S)(?=[^\n]*\n種族：)/gm, '\n\n\n$1'],
	[/\n{2,}(?=種族：)/gm, '\n\n\n'],

	[/^(  +)(?=[^\s　])/gm, function (s)
	{
		return s.replace(/  /g, '　');
	}],

	[/^(　+) (?=\S)/gm, '$1　'],

	_word_en(/\d+g/ig, function (...m: string[])
	{
		return m[1] + StrUtil.toFullWidth(m[2].toUpperCase());
	}),

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	...lazymarks[4],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	[/^(『[^』]+)\n\n(?=　)/gm, '$1\n'],
	[/^(「[^」]+)\n\n(?=　)/gm, '$1\n'],

	[/^(技能(?:上升)?：[^\n]*)\n{2,}(?=　)/gm, '$1\n'],
	[/^([^\s]+：[^\n]*)\n{2,}(?=[^\s]+：)/gm, '$1\n'],

	[/^([^\s]+：[^\n]*)\n(?=種族：)/gm, '$1\n\n\n'],

	[/^(　.・[^\n]+)\n{2,}(?=　.・)/gm, '$1\n'],

	[/^([^\s]{2,}：[^\n]*)\n(?=Ｑ：)/gm, '$1\n\n\n'],

	[/^(伶二[^\n]*|名前：[^\n]+)\n+(?=種族：)/gm, '$1\n'],

	[/^ +/gm, ''],

	[/(  +)/gm, function (s)
	{
		return s
			.replace(/  /g, '　')
			.replace(/　 (?=\S)/g, '　　')
			;
	}],
	[/　 (?=\S)/gm, '　　'],

	[/： (?=\S)/gm, '：'],

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
