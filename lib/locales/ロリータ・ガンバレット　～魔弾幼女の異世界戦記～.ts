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



	_word_jp1('米冽莎|ヴィレッサ|米莉絲', '米莉絲'),
	_word_jp1('露比絲|ルヴィス', '露比絲'),

	_word_jp1('シャロン|夏洛', '夏洛'),

	/**
	 *
	 */
	_word_jp1('ウルムス|烏爾勃拉姆斯|拉威爾', '拉威爾'),

	_word_jp1('カミル|加米烈|加密爾|加密尓|卡密爾', '卡密爾'),
	_word_jp1('ピシリ|比希利', '比希利'),
	_word_jp1('テメエ|天涅', '天涅'),

	_word_jp1('ガステン|加斯汀', '加斯汀'),

	/**
	 *
	 */
	_word_jp1('ヴァイマー|馬爾|巴利馬', '巴利馬'),

	_word_jp1('グレイラム|古雷拉姆', '古雷拉姆'),
	_word_jp1('ガラディス|卡拉迪斯', '卡拉迪斯'),

	/**
	 *
	 */
	_word_jp1('ルトラント|巴魯特蘭', '巴魯特蘭'),



	_word_jp1('迪扎哈村|ディザハムラ', '迪扎哈'),

	_word_jp1('基尼路|ジュニール', '基尼路'),
	_word_jp1('蕾米利亞|レミディア', '蕾米利亞'),

	/**
	 *
	 */
	_word_jp1('盧迪菲魯多|ルギフェルド', '盧迪菲魯多'),
	_word_jp1('澤魯・沃爾夫|ゼル・ガラフ', '澤魯・沃爾夫'),
	_word_jp1('歌爾維尼亞|ゴールヴェニア', '歌爾維尼亞'),

	_word_jp1('不滅骸骨鎧|不滅骸鎧', '不滅骸鎧'),

	_word_jp1('クレイグレイブ|庫雷姆雷古|克萊布雷姆', '克萊布雷姆'),

	/**
	 *
	 */
	_word_jp1('羅波多迪亞|モゼルドボディア|摩澤路多・?(波迪拉|波迪亞)', '摩澤路多・波迪亞'),

	_word_jp1('モゼルド|毛則多|摩澤路多', '摩澤路多'),
	_word_jp1('ゼゥ|擇', '擇'),
	_word_jp1('波迪拉|ボディア|波迪亞', '波迪亞'),

	[`(?:モゼルド|毛則多|摩澤路多)${sp}(?:ゼゥ|擇)${sp}(?:ボディア|波迪亞)`, '摩澤路多＝擇＝波迪亞'],

	_word_jp1('エルフィン|精靈', '精靈'),
	_word_jp1('ヒューラル|人類Hyu', '人類Hyu'),

	[`(?:ブルド|烏路亞)${sp}(?:ボア|波亞)`, '烏路亞・波亞'],

	[`ブルド・ボア|布魯多蟒`, '布魯多蟒'],

	[`吉爾馬多芬`, '吉爾馬多・蜂'],
	[`(?:ギガマッド|吉爾馬多)${sp}(?:ビー|蜂)`, '吉爾馬多・蜂'],

	_word_jp1('コロム|庫洛姆', '庫洛姆'),

	/**
	 *
	 */
	[`火焔城壁|火焰城牆|火焰圍牆`, '火焔城壁'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['司祭|神父', '司祭'],



	[/^[ 　]+/gm, ''],

	[/\{/g, '【'],
	[/\}/g, '】'],

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

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
