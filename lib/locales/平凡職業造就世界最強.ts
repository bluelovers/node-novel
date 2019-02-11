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

	['南雲', '南雲'],

	['雷米亞|蕾米亞|雷米婭|蕾米婭|蕾蜜雅|蕾米雅', '蕾蜜雅'],

	['提奧|提歐|緹鷗|緹奧', '緹奧'],
	['希亞|希婭|希雅', '希雅'],

	_word_jp1('ミュウ', '繆'),

	['龍太郎', '龍太郎'],

	/**
	 *
	 */

	_word_jp1('ジン', '金'),
	_word_jp1('エヒト|埃希德', '埃希德'),

	/**
	 *
	 */
	_word_jp1('タエ', 'タエ'),

	//_word_jp1('ナタリア|娜塔莉亞', '娜塔莉亞'),

	/**
	 *
	 */
	_word_jp1('ハウリア|哈烏利亞|郝里亞', '郝里亞'),
	_word_jp1('拉娜|ラナ', '拉娜'),

	_word_jp1('アルテナ|阿露緹娜|艾爾媞娜', '艾爾媞娜'),

	/**
	 *
	 */
	_word_jp1('哈爾利希|海利希|ハイリヒ|哈利', '海利希'),

	_word_jp1('莉莉亞娜|莉莉安娜', '莉莉安娜'),

	/**
	 *
	 */
	_word_jp1('アビスゲート|阿庇斯凱特|深淵卿|深淵先生', '深淵卿'),

	/**
	 *
	 */

	_word_jp1('シュネー|須奈|修尼', '修尼'),
	['冰雪洞穴|冰雪洞窟', '冰雪洞窟'],

	_word_jp1('福倫|フューレン|斐倫|弗里恩|弗連', '弗連'),

	_word_en3('Tortoise', '托達斯'),
	['多塔斯|托塔斯', '托達斯'],

	['錬成', '錬成'],
	['原子力发電站|原子力発電所', '核電場'],
	['原子發電龍', '核電龍'],

	/**
	 *
	 */

	['導越(的|之)羅針?盤', '導越之羅盤'],
	['羅針盤|羅盤針|指南針', '羅盤'],
	['水晶鑰匙|水晶鍵', '水晶鑰匙'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

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
