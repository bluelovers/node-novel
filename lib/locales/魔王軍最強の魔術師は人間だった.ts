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

	_word_jp1('アイク|艾克', '艾克'),

	_word_jp1('薩蒂|サティ|沙蒂', '薩蒂'),

	_word_jp1('德洛庫|ダイロクテン|達蘿庫汀|Derourokika', '達蘿庫汀'),
	_word_jp1('賽菲羅|セフィーロ|塞菲羅', '賽菲羅'),

	_word_jp1('ロンベルク|朗伯格', '朗伯格'),

	_word_jp1('ジロン|吉隆', '吉隆'),

	_word_jp1('リリス|莉莉(?:絲|斯)?', '莉莉絲'),

	_word_jp1('ベイオ|貝奧', '貝奧'),

	_word_jp1('ジェイス|杰斯', '杰斯'),

	_word_jp1('タロ|泰羅', '泰羅'),

	_word_jp1('斯提昂|バステオ', '斯提昂'),


	/**
	 *
	 */
	_word_jp1('アリステア|阿里斯蒂亞?', '阿里斯蒂亞'),
	_word_jp1('ロッテンマイヤ|羅德邁亞?', '羅德邁亞'),

	/**
	 *
	 */
	_word_jp1('イヴァリース|埃維斯', '埃維斯'),

	_word_jp1('エドワルド|愛德華', '愛德華'),

	// -----------

	['阿塞納?姆|アーセナム', '阿塞納姆'],
	_word_jp1('ドボルベルク|杜瓦爾伯格', '杜瓦爾伯格'),

	_word_jp1('バレンツェレ|Ballerzel|瓦倫汀', '瓦倫汀'),

	_word_jp1('イヴァリース|伊瓦里斯', '伊瓦里斯'),

	_word_jp1('ローザリア|羅薩利亞', '羅薩利亞'),
	_word_jp1('リーザス|利薩斯', '利薩斯'),

	_word_jp1('ロワーレ|洛瓦雷|諾瓦雷', '洛瓦雷'),


	_word_jp1('リッチ|Whitch', 'Whitch'),
	_word_jp1('デュラハン|Dullahan|無頭騎士', '無頭騎士'),
	_word_jp1('オーク|奧克|奧伽', '奧伽'),
	_word_jp1('Kobold|狗頭人', '狗頭人'),
	_word_jp1('滾刀哥布林|ホブゴブリン|Hobogoblin', '滾刀哥布林'),

	_word_jp1('彎刀|シミター', '彎刀'),

	_word_jp1('オリハルコン|奧蘭多', '奧蘭多'),
	_word_jp1('ミスリル|米斯特拉爾', '米斯特拉爾'),
	_word_jp1('ダマスカス|大馬士革', '大馬士革'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['哥布林|哥倫林', '哥布林'],

	['Undead|不死族', '不死族'],

	['Succubus|魅魔', '魅魔'],
	['矮人|Dwarf|ドワーフ', '矮人'],

	['Communism|共產主義', '共產主義'],
	['Capitalism|資本主義', '資本主義'],

	['犭虫裁|獨裁', '獨裁'],

	[/(?<!\n)\n{1,2}(?=†)/gm, '\n\n\n'],
	[/(?<=†)\n(?=\S)/gm, '\n\n'],

	...lazymarks['class'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

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
