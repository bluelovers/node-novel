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

	['埃里克|エリック|艾里克|艾利克', '埃里克'],

	['拉克|ラック|菈克', '拉克'],
	['蘿克|ロック|羅克|克羅', '羅克'],
	['法蘭森|佛蘭森', '法蘭森'],

	/**
	 *
	 */
	['格蘭|ゴラン|歌蘭|葛蘭', '格蘭'],
	['蒙頓|モートン', '蒙頓'],

	['セルリス|塞露尼斯|塞露妮絲', '塞露妮絲'],

	/**
	 *
	 */
	['魯琪拉', '魯琪拉'],

	/**
	 *
	 */
	_word_jp1('シア|希亞', '希亞'),

	/**
	 * 冒険者
	 */
	['艾歷歐|アリオ', '艾歷歐'],
	['喬希|ジョッシュ', '喬希'],

	/**
	 * 神鶏ゲルベルガ
	 */
	['凱魯貝魯卡|ゲルベルガ', '凱魯貝魯卡'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['([abcedfs])_rank', '$1級', 'ig'],

	['至高魔導士|最高魔導師|至高魔導師', '至高魔導師', 'ig'],

	['刻耳柏洛斯', '刻耳柏洛斯', 'ig'],

	['奧利哈刚', '奧利哈剛', 'ig'],

	['次元的夹缝|次元的?狭間', '次元狭間', 'ig'],
	['昏き者どもの神|昏暗信徒的神', '昏暗信徒的神', 'ig'],

	['(高位|大)哥布林|Hob_?Goblin', '高位哥布林', 'ig'],
	['哥布林法師|Goblin_Magician', '哥布林法師', 'ig'],
	['哥布林王|Goblin_Lord', '哥布林王', 'ig'],

	['吸血鬼領主|Vampier Lord', '吸血鬼領主', 'ig'],

	['哥布林|Goblin', '哥布林', 'ig'],
	['奧克|Orc', '奧克', 'ig'],
	['單刷|Solo', '單刷', 'ig'],

	['火球術|Fire_Ball|ファイアーボール', '火球術', 'ig'],
	['接觸吸取|Drain Touch|ドレインタッチ|能量吸收', '吸能', 'ig'],

	['吸收魔劍|吸能魔劍|Drain Sword', '吸能魔劍', 'ig'],

	['魔物|Monster', '魔物', 'ig'],

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
