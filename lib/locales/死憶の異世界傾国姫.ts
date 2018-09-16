/**
 * Created by user on 2017/12/21/021.
 */

import { killBadPx } from '../func';
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

	_word_jp1('ユマ|尤瑪', '尤瑪'),
	_word_jp1('高橋敬一', '高橋敬一'),

	_word_jp1('ゼナ|澤娜|賽納|塞納|塞娜|賽娜', '澤娜'),

	_word_jp1('パルメ|帕魯梅|帕爾梅', '帕魯梅'),
	_word_jp1('パメラ|帕梅拉', '帕梅拉'),

	_word_jp1('ガーシェント|卡西安多', '卡西安多'),
	_word_jp1('エンディアン|安黛因昂', '安黛因昂'),

	_word_jp1('エリプス|艾利普斯', '艾利普斯'),

	_word_jp1('セレナ|瑟蕾娜|塞雷娜', '瑟蕾娜'),
	_word_jp1('ステフ|史蒂芬|斯蒂芬|史蒂夫', '史蒂芬'),

	/**
	 * 演員
	 */
	_word_jp1('セラフィム|薩拉弗', '薩拉弗'),
	_word_jp1('ミューラン|繆拉', '繆拉'),
	_word_jp1('ゼスター|扎斯塔', '扎斯塔'),

	_word_jp1('グラント|格蘭朵', '格蘭朵'),

	_word_jp1('マーロ|馬洛', '馬洛'),

	_word_jp1('バード|巴多魯', '巴多魯'),

	/**
	 *
	 */
	_word_jp1('ピラリス|皮拉莉絲|皮拉裡絲', '皮拉莉絲'),
	_word_jp1('セーラ|瑟拉', '瑟拉'),

	_word_jp1('ゼノビア|扎諾比亞', '扎諾比亞'),

	/**
	 *
	 */
	_word_jp1('スーダ|蘇丹', '蘇丹'),
	_word_jp1('グエラ|古拉', '古拉'),

	/**
	 *
	 */
	_word_jp1('シルフ|希爾福', '希爾福'),
	_word_jp1('パセラル|帕塞拉爾|パラセル|帕拉(?:塞爾)?|西沙', '帕拉塞爾'),

	_word_jp1('ファーモス|法莫斯', '法莫斯'),

	/**
	 * セルギス帝国
	 */
	_word_jp1('セルギス|塞拉契斯|瑟魯基蘇|Serugisu', '瑟魯基蘇'),

	/**
	 * ビルダール王国
	 */
	_word_jp1('ビルダール|碧婁達爾|比爾扎爾|Birudaru', '碧婁達爾'),

	/**
	 *
	 */
	_word_jp1('グレメル|格拉諾姆', '格拉諾姆'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['海因里希', '海因里希'],
	['赤棘毒蛙|紅荊毒青?蛙', '赤棘毒蛙'],
	['大牙豬|Sargir Gor', '大牙豬'],

	['竜籠', '竜籠'],

	['チート|神棍|外掛', '外掛'],

	//['you女', '幼女', 'ig'],

	['王蜘蛛蛇|バウギュリヴァル|Bauguri Val', '王蜘蛛蛇'],

	_word_jp1('エルフ|森精靈?|精靈', '精靈'),

	[/^　/gm, ''],

	[/(?<=\S)\n(?=健康值：)/gm, '\n\n'],
	[/(?<=(?:健康|魔力)值：[^\n]+)\n(?!魔力值：|\n)/gm, '\n\n'],

	[/(?<!\w)[\d０-９]+(?:px|ｐｘ)(?!\w)/ig, function (...m)
	{
		let s = killBadPx(m[0]);

		return StrUtil.toFullWidth(s || m[0]);
	}],

	...sublib.lazymarks['class'],

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
