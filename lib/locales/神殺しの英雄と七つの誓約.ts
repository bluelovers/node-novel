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

	//['要取代的字', '取代後的字'],

	_word_jp1('イムネジア|伊姆內伽|伊姆內几亞', '伊姆內几亞'),

	_word_jp1('エルメンヒルデ|艾爾梅因謝爾汀|艾爾梅因謝爾|艾露曼希爾德|艾爾梅恩謝爾汀', '艾露曼希爾德'),

	_word_jp1('エル', '艾露'),

	_word_jp1('フランシェスカ|芙蘭謝絲卡|芙藺榭絲卡|芙蘭謝斯卡', '芙蘭榭絲卡'),
	_word_jp1('バートン|伯頓', '巴頓'),

	_word_jp1('エルフレイム|艾露芙雷姆|艾爾弗雷伊姆|精靈雷伊姆', '艾爾弗雷伊姆'),
	_word_jp1('アーベンエルム|阿貝艾路姆|阿貝艾爾姆', '亞本艾盧姆'),

	_word_jp1('アルバーナ', '阿爾巴納'),


	_word_jp1('亞絲托拉艾拉|アストラエラ|愛思特莉亞|愛絲特莉亞|阿斯托萊拉', '愛絲特莉亞'),

	_word_jp1('菲朧', '菲洛納'),

	_word_jp1('露露姆|姆露露|ムルル', '姆露露'),

	_word_jp1('宇多野|羽多野', '宇多野'),

	_word_jp1('ファフニィル', '法芙娜'),
	_word_jp1('ファフ', '法芙'),

	_word_jp1('ナイト', '騎士'),

	_word_jp1('アナスタシア', '安娜斯塔西婭'),

	_word_jp1('シェルファ|謝露法|希爾琺', '謝露法'),

	_word_jp1('索露內婭', '索露蕾亞'),

	_word_jp1('阿努貝利亞', '阿貝利亞'),

	_word_jp1('雅梅妲|亞瑪露妲', '雅梅妲'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/\*/g, '＊'],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['ln_0010'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	//...lazymarks[8],

	...lazymarks['clear_002'],

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
