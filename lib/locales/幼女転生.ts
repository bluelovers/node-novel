/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en3, lazymarks, _word_jp1 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	_word_jp1('露絲|ローズ', '露絲'),

	/**
	 *
	 */
	_word_jp1('曼努埃莉塔|マヌエリタ', '曼努埃莉塔'),
	_word_jp1('莉塔|リタ', '莉塔'),

	_word_jp1('レオナ|莉安娜|利昂娜', '莉安娜'),

	_word_jp1('ノエリア|洛艾莉婭', '洛艾莉婭'),
	_word_jp1('フィリス|菲莉斯', '菲莉斯'),

	_word_jp1('アウロラ|奧羅拉', '奧羅拉'),

	_word_jp1('パロマ|柏洛瑪', '柏洛瑪'),

	/**
	 *
	 */
	_word_jp1('オールディア|奧爾迪亞', '奧爾迪亞'),
	_word_jp1('セミリア|賽米利亞', '賽米利亞'),

	_word_jp1('マウロ|莫羅', '莫羅'),
	_word_jp1('イーノス|依洛斯', '依洛斯'),

	_word_jp1('ノビオ|諾比安', '諾比安'),
	_word_jp1('カルミネ|加魯美涅', '加魯美涅'),

	/**
	 *
	 */
	_word_jp1('プローン', '普林'),
	_word_jp1('フレイズ', '弗萊斯'),


	_word_jp1('エリアーヌ', '艾莉安奈'),
	_word_jp1('ロック', '洛古'),
	_word_jp1('オーバン', '奧本'),
	_word_jp1('フラヴィ', '芙菈薇'),

	/**
	 *
	 */
	_word_jp1('伊久雷普斯|イクライプス', '伊久雷普斯'),
	_word_jp1('艾依摩爾|エイモル', '艾依摩爾'),

	/**
	 *
	 */
	_word_jp1('琪紗|キシュ', '琪紗'),
	_word_jp1('艾勒西絲|エルシス', '艾勒西絲'),


	/**
	 *
	 */

	_word_jp1('リリオ|里里奧', '里里奧'),

	_word_jp1('艾洛美|エノーメ', '艾洛美'),

	_word_jp1('格凌柏|グレイバ', '格凌柏'),

	_word_jp1('達琳|ダーレン', '達琳'),

	_word_jp1('科里亞', '科里亞'),

	_word_jp1('托里姆', '托里姆'),

	_word_jp1('福利亞|フォリエ', '福利亞'),

	_word_jp1('波迪羅|ポンデーロ', '波迪羅'),

	/**
	 *
	 */
	_word_jp1('艾利|アーレ', '艾利'),


	/**
	 *
	 */

	['竜人', '竜人'],

	/**
	 *
	 */
	_word_jp1('ミリ|毫米', '利迪'),
	_word_jp1('ルス|魯斯', '魯斯'),

	_word_jp1('レンテ|利迪', '利迪'),
	_word_jp1('厘米|センチ', '厘米'),

	_word_jp1('メートル|公尺', '公尺'),
	_word_jp1('里奇斯|リーギス', '里奇斯'),

	_word_jp1('キロ|公斤', '公斤'),
	_word_jp1('梅杜|メト', '梅杜'),

	_word_jp1('グラム', '克'),
	_word_jp1('ゼルン', '賽倫'),

	_word_jp1('リットル', '升'),
	_word_jp1('ラッテン', '雷登'),

	/**
	 *
	 */
	_word_jp1('コップ', '杯子'),
	_word_jp1('アタシ', '我'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([


	...words_source,

	[/^[　 ]+/gm, ''],

	[/(?<=\S)\n{1,2}(?=♀)/gm, '\n\n\n'],


	[/(?<=^[^・\s][^\n]*)\n{1,2}(?=・)/gm, '\n\n\n'],
	[/(?<=^・[^\n]*)\n(?=[^・\s])/gm, '\n\n'],

	[/(?<=\S)\n{1,2}(?=■)/gm, '\n\n\n'],
	[/(?<=^■[^\n]*)\n(?=\S)/gm, '\n\n'],

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

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

export default exports as typeof import('./demo');
