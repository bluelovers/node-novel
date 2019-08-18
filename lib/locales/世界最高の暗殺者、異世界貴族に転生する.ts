/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp, sp2 } from '@node-novel/layout-pattern/lib/core/const';
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



	_word_jp1('ルーグ', '羅格'),
	_word_jp1('トウアハーデ', '托瓦哈迪'),

	_word_jp1('キアン?', '基安'),

	_word_jp1('エスリ', '艾莉絲'),



	/**
	 * 女
	 */
	_word_jp1('クローディア|克勞迪亞|克勞迪雅', '克勞迪亞'),
	_word_jp1('迪亞|ディア', '迪雅'),

	_word_jp1('ヴィコーネ', '維科內'),

	_word_jp1('タルト|塔特爾特', '塔爾特'),

	_word_jp1('エポナ', '埃波納'),
	_word_jp1('里安農|リアンノン', '利安諾'),

	_word_jp1('マーハ', '瑪哈'),

	_word_jp1('法利娜|法琳娜|法利納|ファリナ|法莉娜', '法莉娜'),

	_word_jp1('ネヴァン', '娜芳'),

	_word_jp1('ミーナ', '米娜'),

	/**
	 *
	 */

	_word_jp1('ノイシュ', '諾伊斯'),

	_word_jp1('リクラ', '萊克拉'),

	_word_jp1('ローマルング|羅馬格', '羅馬爾格'),

	/**
	 *
	 */
	_word_jp1('レイチェル', '雷切爾'),

	_word_jp1('[托]里', '托里'),

	_word_jp1('ウェヌス', '維納斯'),

	/**
	 *
	 */
	_word_jp1('オルナ|奧露娜|奧爾娜|奧爾納|歐魯娜|歐露娜', '歐露娜'),

	_word_jp1('イルグ|伊爾格', '伊魯古'),
	_word_jp1('バロール', '巴洛爾'),

	/**
	 *
	 */
	_word_jp1('ライオゲ', '萊奧格爾'),

	/**
	 *
	 */

	_word_jp1('艾爾凡|阿爾凡|アルヴァン|阿爾文|巴爾凡', '阿爾凡'),

	_word_jp1('穆爾特', '穆爾特'),

	_word_jp1('ジョンブル|約翰布魯|約翰布爾', '約翰布魯'),

	/**
	 *
	 */
	_word_jp1('スオンゲル', '斯翁格爾'),

	/**
	 *
	 */
	_word_jp1('ディアンケト', '迪安凱特'),

	_word_jp1('成長界限突破|突破增長界限|突破成長界限', '成長界限突破'),

	_word_jp1('ルナンマス|魯南馬斯|盧南鱒魚|盧南馬斯', '盧南鱒魚'),
	_word_jp1('マス|鱒魚', '鱒魚'),

	_word_jp1('奧克西|アカシック', '阿卡西'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	//[/(?<=\S)(\n)(?=[⋯…][^\n]+)/gm, '\n\n'],
	//[/(?<=^[⋯…][^\n]+)(\n)(?=\S)/gm, '\n\n'],

	[/(?<=」)\n{2}(?=「)/g, '\n'],

	[/(?:鑑|鑒)定/g, '鑑定'],

	[/>/g, '＞'],

	...lazymarks['clear_002'],

	...lazymarks['ln_0010'],

	...lazymarks['class'],
	...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['4'],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	//...lazymarks['8'],

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
