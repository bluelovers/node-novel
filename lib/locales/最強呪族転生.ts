/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

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
export const words: IWords[] = sublib._word_zh_all([


	/**
	 * 馬尔蓮族
	 */
	['亞伯|アベル|亞貝尔|亞貝魯|阿貝爾', '亞貝魯'],
	['貝雷克|ベレーク', '貝雷克'],
	['瑪雷家|ベレーク家', '貝雷克家'],

	['亞貝魯・(馬|瑪)雷', '亞貝魯・貝雷克'],

	['姬澤露|ジゼル|姬塞露|吉赛尔', '姬澤露'],
	['ゼレルート|泽列特|澤列魯特|澤利特', '澤列魯特'],
	['澤列|澤利', '澤列'],

	['マーレン|馬尔蓮?(?!科)|瑪雷|馬雷|瑪爾(?!科)', '瑪雷'],

	['阿德|アーディー|阿迪', '阿迪'],
	['ガリア|加里奧', '加里奧'],
	['シビィ|西碧', '西碧'],

	['菲羅|フィロ', '菲羅'],

	['瑪雷科|カルコ|馬爾科', '馬爾科'],
	['洛茲艾魯|ノズウェル', '洛茲艾魯'],

	['麗葉塔|リエッタ|丽叶特', '麗葉塔'],

	['艾力吉奥|エリジオ', '艾力吉奥'],

	/**
	 *
	 */
	['ロマーヌ|洛馬努', '洛馬努'],

	['メア|梅亞|美亞', '梅亞'],
	['詹姆斯|ジェーム', '詹姆斯'],

	['ドゥーム|多姆', '多姆'],

	/**
	 *
	 */
	['オーテム|歐特魯', '歐特魯'],

	['歐特魯台車|歐特魯卡車', '歐特魯台車'],

	['福特爾|フーテル', '福特爾'],
	['香煙葉|香火因叶', '香煙葉'],
	['香煙草', '香煙草'],
	['火因袋|煙袋', '煙袋'],

	['ベノル銅|貝羅爾銅', '貝羅爾銅'],
	['アコレ銅|奧克利铜', '奧克利銅'],

	/**
	 *
	 */
	['爾古木|ニグム', '爾古木'],
	['イベン|易典', '易典'],
	['博亞|ボア', '博亞'],

	['希姆帕咯特|シムパロット', '希姆帕咯特'],

	// --------------

	[/^　/gm, ''],

	[/【/g, '「'],
	[/】/g, '」'],

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

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

export default exports;
