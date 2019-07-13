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

	_word_jp1('アマギ|天城', '天城'),
	_word_jp1('ハルト|陽人|春人|晴人', '陽人'),

	['天城陽人|アマギ・?ハルト|ハルト・?アマギ|天城[\\.\\?]陽人', '天城陽人'],

	/**
	 *
	 */
	_word_jp1('トーレス|托雷斯', '托雷斯'),

	_word_jp1('エトナ|厄筒娜|埃特娜|艾特娜|埃特納', '艾特娜'),
	_word_jp1('シャロン|莎朗', '莎朗'),

	_word_jp1('ローリエ|香葉|蘿莉耶|ローリエ|laurier', '香葉', 'ig'),

	_word_jp1('シュタインハルト|斯坦哈特', '斯坦哈特', 'ig'),


	_word_jp1('米娜|ミーナ|曼娜|蜜娜', '米娜', 'ig'),

	// -----------

	_word_jp1('リオン|利昂', '利昂'),
	_word_jp1('バン|帕', '帕'),
	_word_jp1('ローエル|厄魯', '厄魯'),

	_word_jp1('ユニクラム|尤尼克(?:拉姆)', '尤尼克拉姆'),

	_word_jp1('阿渝拉|アウラ|阿烏拉|奧烏拉', '奧烏拉'),
	_word_jp1('ローゼス|羅澤斯', '羅澤斯'),

	_word_jp1('咯若因|キャロイン|卡羅音|卡洛琳', '卡羅音'),

	// -----------

	_word_jp1('庫羅因|クロイツ', '庫羅因'),

	/**
	 * リティナ・ミリシア・グレイシア
	 */
	_word_jp1('(?:十四|ミリス|米莉絲|米里斯|米利斯|米斯利|米利烏斯)王國', '米莉絲王国', 'ig'),
	_word_jp1('米裡城|ミリシャ|米沙', '米沙', 'ig'),

	_word_jp1('莉丹娜|リティナ|莉蒂娜', '莉蒂娜', 'ig'),

	/**
	 * ゲージ砦
	 */
	_word_jp1('戈爾吉|ゲージ', '戈爾吉', 'ig'),
	//_word_jp1('戈爾吉(?:堡壘|城寨|砦|要塞)', '戈爾吉要塞', 'ig'),
	_word_jp1('(?:堡壘|城寨|砦|要塞)', '要塞', 'ig'),

	_word_jp1('デューイ|杜威', '杜威', 'ig'),

	_word_jp1('ゴールバンド|哥魯班特', '哥魯班特', 'ig'),

	/**
	 *
	 */
	_word_jp1('哈魯莫尼亞|ハルモニア|Harmonia', '哈魯莫尼亞', 'ig'),

	/**
	 *
	 */
	_word_jp1('ゼーゼー|澤澤', '澤澤'),

	/**
	 *
	 */
	['アンダルギア|Andarugiya|安達路基亞|Anda RUGIYA|安達路吉亞', '安達路基亞', 'ig'],




	_word_jp1('ミルド|米爾德', '米爾德', 'ig'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['元勇者', '原勇者'],
	['ゴブリン|哥布林', '哥布林'],

	['晴人?君', '陽人君'],

	['工會|公會', '公會'],

	['諸神的?破壊之劍', '諸神的破壊之劍'],
	['SMART.?PHONE|智慧型手機|智能手機', '手機', 'ig'],

	['熾焰彈|Fire[・\\?\\. ]Ball|火炎弾|ファイヤー[・\\?]ボール|火焰彈', '火焰彈', 'ig'],

	['大地的束縛|Earth[・\\?\\. ]*Bind|土之拘束|アース・バインド|土之束縛|Earth[・\\?\\. ]*Bound|土的拘束', '大地的束縛', 'ig'],

	['土牆|土之牆壁|Earth[・\\?\\. ]*Wall', '土之牆壁', 'ig'],

	[/\w+(\?\w+)+/g, function (s)
	{
		return s.replace(/\?/g, '・')
	}, 'ig'],

	['Search|搜索', '搜索'],

	[/(大地的束縛|火焰彈)\1/g, '$1'],

	[/^[　 ]+/gm, ''],

	['托雷斯的街道|托雷斯的?城市|托雷斯之街', '托雷斯之街'],

	_word_jp1('(?:十四|ミリス|米莉絲|米里斯)（(?:十四|ミリス|米莉絲|米里斯)）', '米莉絲', 'ig'),

	...lazymarks['class'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

	...lazymarks[7],

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
