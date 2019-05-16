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

	_word_jp1('レティシエル|路威克蒂西亞|路威克蒂夏爾|路威克蒂西|萊蒂夏爾|雷蒂夏爾|雷蒂希爾', '蕾蒂希爾'),

	_word_jp1('ドロッセル|多洛塞爾', '多蘿瑟露'),

	_word_jp1('ルヴィク', '路威克'),

	_word_jp1('クリスタ|克麗斯塔|克麗絲塔|克莉斯塔', '克莉絲塔'),

	_word_jp1('ノア', '諾亞'),
	_word_jp1('フィリアレギス', '菲莉亞雷吉斯'),


	/**
	 *
	 */
	_word_jp1('ミラ|米蘭', '米蘭'),

	_word_jp1('ミランダレット|米蘭德雷特?', '米蘭達雷特'),
	_word_jp1('ルル', '露露'),
	_word_jp1('ウォルド', '沃爾德'),

	[`${sp}(?:盧|璐璐|露露)${sp}沃爾特`, '・露露・沃爾特'],

	_word_jp1('ロシュフォード|羅斯福德', '羅修福德'),


	_word_jp1('ナオ', '納歐'),
	_word_jp1('ジーク|齊克', '吉克'),

	_word_jp1('ヴィオリス|維奧利斯|維奧里斯', '維奧利斯'),

	_word_jp1('カルロス|卡爾?洛斯', '卡爾洛斯'),

	_word_jp1('オードリー|奧德麗', '奧德莉'),
	_word_jp1('カーレンン', '卡倫'),
	_word_jp1('バレンタイン|瓦倫泰因|瓦倫泰恩', '瓦倫泰因'),

	_word_jp1('ヴェロニカ|維羅妮卡', '維蘿妮卡'),
	_word_jp1('エステル', '埃斯特爾'),


	_word_jp1('ヒルメス', '席爾梅斯'),
	_word_jp1('リーフ', '利夫'),
	_word_jp1('グウェール|格維爾|格威爾', '格維爾'),


	/**
	 *
	 */
	_word_jp1('ピッカリ', '禿頭'),
	_word_jp1('ルトラーナ', '巴魯特拉納'),

	_word_jp1('レイヴン|雷溫', '雷文'),

	_word_jp1('ルーカス', '盧卡斯'),
	_word_jp1('ド', '德'),
	_word_jp1('オラシオ', '奧拉西奧'),

	_word_jp1('デイヴィッド', '戴維德'),

	/**
	 *
	 */
	_word_jp1('エリック', '埃里克'),

	/**
	 *
	 */
	_word_jp1('アサレッタ', '阿薩列塔'),
	_word_jp1('エルドラド', '埃爾德拉德'),
	_word_jp1('ブクログ', '布庫洛古'),

	/**
	 *
	 */
	_word_jp1('プラティナ|普拉蒂亞', '普拉蒂納'),

	_word_jp1('ルクレツィア|錄庫雷茨亞', '盧克雷茨亞'),

	_word_jp1('アストレア', '阿斯特雷亞'),

	_word_jp1('イーリス|伊里斯', '伊利斯'),

	_word_jp1('ドランザール', '德蘭薩爾'),

	_word_jp1('セフィロス', '塞飛羅斯'),

	_word_jp1('ワルプルギス', '瓦爾普吉斯'),

	_word_jp1('ヘルトクテル', '赫爾特庫特爾'),

	_word_jp1('フォルナンデ', '福爾南德'),

	_word_jp1('リジェネローゼ', '利潔內羅瑟'),

	_word_jp1('ジェルライド', '杰爾萊德'),

	_word_jp1('ロマルド', '洛馬爾特'),

	_word_jp1('エングロリア', '安格羅里亞'),

	/**
	 *
	 */
	_word_en3('booth', '會場'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks['ln_0010'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	//...sublib.lazymarks[8],

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
