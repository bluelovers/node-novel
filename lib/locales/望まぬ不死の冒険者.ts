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

	['羅蕾露|ロレーヌ|羅列納', '羅蕾露'],
	['ヴィヴィエ|維維?耶', '維維耶'],

	[`レント|雷特`, '雷特'],
	[`梵納|ファイナ`, '梵納'],

	[`羅蕾露${sp}維維耶`, '$1・維維耶'],
	[`雷特${sp}梵納`, '雷特・梵納'],
	[`雷特梵納`, '雷特・梵納'],

	/**
	 *
	 */
	[`アカシア|雅卡西亞`, '雅卡西亞'],
	[`雅卡西亞的地圖|アカシアの地図`, '雅卡西亞的地圖'],

	/**
	 * 冒険者公會
	 */
	[`シェイラ|席伊菈`, '席伊菈'],

	[`達利奧|達里奧`, '達利奧'],
	[`達利奧${sp}哥斯塔`, '達利奧・哥斯塔'],

	/**
	 * 馬路特第二孤兒院
	 */
	[`アリゼ|艾莉婕`, '艾莉婕'],

	[`リリアン|莉莉安|利利安`, '莉莉安'],
	[`ジュネ|珍尼|茱妮`, '茱妮'],

	[`エーデル|艾達|艾登|愛德爾`, '艾登'],

	[`ウンベルト|恩貝努`, '恩貝努'],
	[`ノーマン|洛曼`, '洛曼'],

	/**
	 *
	 */
	[`拉圖爾|ラトゥール`, '拉圖爾'],
	[`勞拉`, '勞拉'],

	/**
	 *
	 */
	[`ミュリアス|繆莉亞絲`, '繆莉亞絲'],
	[`ライザ|萊莎`, '萊莎'],

	[`ロベリア|羅貝麗亞`, '羅貝麗亞'],

	[`アルス|亞魯斯`, '亞魯斯'],

	[`ヴァンスルト|范思魯特`, '范思魯特'],

	[`ギーリ|吉利`, '吉利'],
	[`フォロストロア|弗洛斯托洛亞`, '弗洛斯托洛亞'],

	/**
	 *
	 */
	[`マルト|馬路特|馬爾特`, '馬路特'],
	[`ヤーラン|亞蘭`, '亞蘭'],
	[`亞蘭王国|王国亞蘭`, '亞蘭王国'],

	[`オークショナー|奧克納`, '奧克納'],

	/**
	 *
	 */
	[`タラスク|塔拉斯孔|塔拉斯克`, '塔拉斯孔'],

	/**
	 *
	 */
	[`飛行船|飛空艇`, '飛空艇'],
	[`竜血花|龍血花`, '龍血花'],
	[`冒険者公會|冒険者組合(公會)?`, '冒険者公會'],
	[`邪気蓄積症|邪氣蓄積症`, '邪氣蓄積症'],

	[`治癒術師|治療術士`, '治癒術師'],

	[`中級吸血鬼|ミドル・吸血鬼`, '中級吸血鬼'],

	[`解体場`, '解體場'],

	[`哥倫林|哥布林`, '哥布林'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[`解体`, '解體'],

	[/^[　 ]+/gm, ''],

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
