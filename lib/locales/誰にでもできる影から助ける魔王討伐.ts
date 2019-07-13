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

	_word_jp1('アレス|阿雷斯', '阿雷斯'),
	_word_jp1('クラウン|克朗', '克朗'),

	_word_jp1('アメリア|艾梅莉亞', '艾梅莉亞'),

	_word_jp1('藤堂直継', '藤堂直継'),

	_word_jp1('リミス|莉米絲', '莉米絲'),
	_word_jp1('アル', 'R'),
	_word_jp1('フリーディア|弗利迪亞', '弗利迪亞'),

	_word_jp1('ロイダー|洛伊塔', '洛伊塔'),

	_word_jp1('アリア|亞莉亞', '亞莉亞'),
	_word_jp1('リザース|利扎斯', '利扎斯'),

	_word_jp1('ノートン|諾頓', '諾頓'),

	_word_jp1('グレシャ|格蕾莎', '格蕾莎'),

	_word_jp1('クレイオ|克里歐', '克里歐'),
	_word_jp1('エイメン|阿門', '阿門'),

	_word_jp1('グレゴリオ|格里戈利奧', '格里戈利奧'),

	_word_jp1('トマス|托馬斯', '托馬斯'),
	_word_jp1('グレゴリー|格雷高利', '格雷高利'),

	_word_jp1('グスタフ|古斯塔夫', '古斯塔夫'),

	_word_jp1('ダミアン|達米安', '達米安'),

	_word_jp1('エリック|埃里克', '埃里克'),

	_word_jp1('マリナ|瑪麗娜', '瑪麗娜'),



	/**
	 *
	 */
	_word_jp1('アズ|亞茲', '亞茲'),
	_word_jp1('グリード|古利德', '古利德'),

	_word_jp1('クラノス|庫拉諾斯', '庫拉諾斯'),



	/**
	 *
	 */

	_word_jp1('ルークス|魯克斯', '魯克斯'),

	_word_jp1('ヴェール|維爾', '維爾'),
	_word_jp1('ヴェールの村|維爾村', '維爾村'),

	/**
	 *
	 */
	_word_jp1('プラーミャ|普拉米亞', '普拉米亞'),
	_word_jp1('ミクシリオン|米克希利昂', '米克希利昂'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/^[　 ]+/gm, ''],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	//...lazymarks['full_width_002'],

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
