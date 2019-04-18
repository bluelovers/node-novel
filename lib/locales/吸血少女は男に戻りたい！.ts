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

	[`露娜${sp}雷斯頓`, '露娜・雷斯頓'],

	/**
	 *
	 */
	_word_jp1('馬林|マリン|馬琳', '馬琳'),
	_word_jp1('ティナ|蒂娜|緹娜', '緹娜'),

	/**
	 *
	 */
	_word_jp1('巴勒西斯|帕雷西烏斯|バレシウス', '帕雷西烏斯'),

	_word_jp1('瑪菲|マフィ', '瑪菲'),

	['愛麗絲', '愛麗絲'],

	/**
	 *
	 */
	_word_jp1('菲利艾露|菲利亞|フェリアル|菲利阿魯|維利亞|菲莉亞', '菲利艾露'),

	_word_jp1('維斯怕|維斯拍|維斯帕|ウィスパー|威士忌', '維斯帕'),

	_word_jp1('威魯|威爾', '威爾'),

	_word_jp1('リン|磷|林志玲', '琳'),

	[`(?:リン|林|琳|磷)${sp}(?:リー|莉|琳|磷)`, '琳・莉'],
	[`(?:リン|林|琳)(?:リー|莉)|林琳|琳琳`, '琳・莉'],

	[`(?:威廉)${sp}(?:布蘭切特)`, '威廉・布蘭切特'],

	/**
	 * ホルンって街
	 */
	_word_jp1('ホルンって|圖號|霍爾頓', '霍爾頓'),
	_word_jp1('費斯特|ファウスト', '費斯特'),

	_word_jp1('サジタリウス', '薩吉塔利烏斯'),
	_word_en3('SAJITALIUS', '薩吉塔利烏斯'),

	_word_jp1('ハーミット|心密特|哈密特', '哈密特'),
	_word_en3('hamito', '哈密特'),

	/**
	 *
	 */


	_word_jp1('ニュクテリス'),


	_word_jp1('庫拉肯|克萊根|クラーケン', '庫拉肯'),

	/**
	 *
	 */
	_word_jp1('コル', '克勒'),
	_word_en3('koru', '克勒'),


];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/^[ 　]+/gm, ''],

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

	...sublib.lazymarks[8],

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
