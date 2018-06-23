/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

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

	['愛玩奴隷|玩赏用?奴隷|玩弄奴隷', '愛玩奴隷'],
	['鋼の女神亭', '鋼之女神亭'],

	['エルマー大陸|艾爾默大陸', '艾爾默大陸'],

	['瑪德蘿拉|瑪德劳拉', '瑪德蘿拉'],
	['俾斯麥德|ビスマイト|俾斯麦得', '俾斯麥德'],
	['布拉德爾|ブラッドール|布拉德諾', '布拉德爾'],
	['孟德爾|メンデル|门德尔', '孟德爾'],

	['刻印|印章', '刻印'],
	['ブランド|铭牌|品牌名?', '品牌'],

	['メンヒルト|蒙希尔特|蒙西尔特', '蒙希爾特'],

	['卡米拉|カミラ', '卡米拉'],

	['シャルル|夏露露', '夏露露'],
	['ドルトン|道尔顿', '道爾頓'],

	['エリー|艾莉', '艾莉'],

	['ディラック|狄拉克', '狄拉克'],
	['イオ|伊諾', '伊諾'],
	['ガレス|加雷斯', '加雷斯'],

	['蓮|レン', '蓮'],

	['リビエラ|理維艾拉', '理維艾拉'],

	['メルク|梅露可|梅可露', '梅露可'],

	['福禄多|ヴルド|布魯多|乌魯特', '福禄多'],

	['ニールス|尼爾森|尼尔斯', '尼爾森'],

	['Vampire|吸血鬼', '吸血鬼'],
	['Monster|怪物', '怪物'],

	['エランド|愛蘭德|艾兰朵', '愛蘭德'],
	['アリシア|艾莉西亞', '艾莉西亞'],
	['アウスレーゼ|奧斯蕾賽', '奧斯蕾賽'],

	['アリシア＝アウスレーゼ＝エランド|艾莉西亞─奧斯蕾賽─(艾兰朵|愛蘭德)', '艾莉西亞＝奧斯蕾賽＝愛蘭德'],

	[/^[　 ]/gm, ''],

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
