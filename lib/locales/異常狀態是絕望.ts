/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en, lazymarks, _word_jp1 } from './lib/index';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['根鷺|跟鷺', '根鷺'],
	['灰斗', '灰斗'],

	/**
	 *
	 */
	_word_jp1('ハヤト', '隼人'),
	_word_jp1('ミナミ', '南'),

	_word_jp1('ルリ', '琉璃'),
	_word_jp1('アンジョウ', '安城'),

	_word_jp1('リサ', '梨紗'),
	_word_jp1('オカモト', '岡本'),

	/**
	 *
	 */
	_word_jp1('娜魯夏爾|ナルシエル|娜露夏爾', '娜露夏爾'),
	_word_jp1('阿梅魯都鐵|アメルドーテ|阿梅爾多特', '阿梅爾多特'),

	_word_jp1('夏爾|シエル', '夏爾'),

	[`娜露夏爾${sp}阿梅爾多特`, '娜露夏爾＝阿梅爾多特'],

	/**
	 *
	 */
	_word_jp1('帕斯蒂爾|パステル', '帕斯蒂爾'),

	/**
	 *
	 */

	_word_jp1('海密力斯|ヘイミリィース', '海密力斯'),



	_word_jp1('剛涅魯|カンネル', '剛涅魯'),
	_word_jp1('強杜魯多|キャンドルッド', '強杜魯多'),
	_word_jp1('芙雷|フーレイ', '芙雷'),
	_word_jp1('米庫|ミク', '米庫'),

	_word_jp1('穆魯希|ムルヒ', '米庫'),
	_word_jp1('伊庫希里亞|イクシリア', '伊庫希里亞'),
	_word_jp1('蘭沙齊|ランサッチ', '蘭沙齊'),


	_word_jp1('塔裡木|タリム', '塔裡木'),



	/**
	 *
	 */
	_word_jp1('畢爾姆魯斯|ピルムルス', '畢爾姆魯斯'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/\n+(＾+)\n+/g, '\n\n\n$1\n\n'],

	[
		/^(ー+)$/gm, function (...m)
	{
		return '─'.repeat(m[1].length)
	},
	],

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	...sublib.lazymarks['unit'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	//...sublib.lazymarks['full_width_002'],

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

export default exports;
