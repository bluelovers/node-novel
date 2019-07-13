/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { _zh_num2, sp, sp2, _zh_num, _full_num, EN_REGEXP } from '@node-novel/layout-pattern/lib/core/const';
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

	['卡斯塔|卡絲塔', '卡斯塔'],

	_word_jp1('エジンバラ|艾杰巴拉|文杰巴拉', '艾杰巴拉'),

	['諾亞|挪亞', '諾亞'],

	_word_jp1('莉杰|莉潔|ビーチェ|貝琪', '莉潔'),
	_word_jp1('貝亞托莉杰|貝阿朵莉琪', '貝阿朵莉潔'),

	_word_jp1('ユーリ|尤里', '尤里'),

	_word_jp1('アリン|亞林', '亞林'),

	_word_jp1('莉莉|リリ|利利', '莉莉'),

	_word_jp1('ルーク|魯庫|盧克|路克', '魯庫'),
	_word_jp1('ロイ|羅伊', '羅伊'),

	_word_jp1('シャーレ|莎蕾|夏蕾', '莎蕾'),

	_word_jp1('羅德里格斯|羅德里克斯', '羅德里格斯'),

	_word_jp1('レスティケイブ|雷斯迪凱普|雷斯迪洞穴|安息洞窟', '雷斯迪凱普'),

	_word_jp1('西里盧卡|西利路卡|シリルカ|希里盧卡', '西里盧卡'),
	_word_jp1('卡拉布里亞|カラープリア', '卡拉布里亞'),

	_word_jp1('虛空圖表表|虛空圖表|ホロウグラフ|虛圖表?', '虛空圖表'),

	_word_jp1('優梅莉亞', '優梅莉亞'),

	_word_jp1('艾希莉|亞修莉|アシュリー', '艾希莉'),
	_word_jp1('十字（クロス）|クロス|克羅斯|Cross|庫洛斯', '克羅斯'),

	_word_jp1('羅羅納?村|洛洛納村|ロロナ村', '羅羅納村'),



	_word_jp1('ライジングスパーク|狂暴雷光', '狂暴雷光'),
	_word_jp1('フレア|耀斑|Flare', '耀斑'),
	_word_jp1('ヘイスト|加速', '加速'),
	_word_jp1('ファイアバレット|火彈', '火彈'),
	_word_jp1('ファイアランス|烈火長矛', '烈火長矛'),

	_word_jp1('斯貝茨|スペイツ', '斯貝茨'),
	_word_jp1('馮|フォン', '馮'),
	_word_jp1('維魯利亞|ウェルリア', '維魯利亞'),


	_word_jp1('ハーピィー', '哈比'),

	_word_jp1('ウォーターウォール', '瀑布牆'),

	_word_jp1('齋魯珈|リルカ', '齋魯珈'),

	_word_jp1('雷帝斯|レティス|萊蒂斯', '雷帝斯'),
	_word_jp1('格布利亞斯|ガブリアス', '格布利亞斯'),

	_word_jp1('露緹婭|ルーティア|露蒽', '露緹婭'),

	_word_jp1('溫蒂妮之加護|溫蒂的呵護|溫蒂加護', '溫蒂妮之加護'),

	_word_jp1('ヒメリ|姬理', '姬理'),

	_word_jp1('黛米烏斯|提米烏斯|黛米烏絲', '黛米烏斯'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['魔道士|魔導師', '魔導師'],

	['工會|公會|協會', '公會'],



	['公主', '皇女'],

	['幺力女', '幼女'],
	['女昌館', '娼館'],


	[/(?<=金幣[\d０-９]+)張/g, '枚'],

	_word_jp1('地下迷宫|ダンジョン|迷宮|地下城', '地下城'),

	_word_jp1('ヒールポーション|治癒藥水', '治癒藥水'),
	_word_jp1('マジックポーション|魔力回復藥|魔力藥水', '魔力藥水'),

	_word_jp1('スキル', '技能'),
	_word_jp1('ギルド', '公會'),

	_word_jp1('オーダーメイド', '訂製'),
	_word_jp1('ローブ', '法袍'),

	_word_jp1('パーティーメンバー', '隊伍成員'),

	[/^ +/gm, '　'],

	[/^　+/gm, ''],

	[/^【([^\n「」【】]+)】$/gm, '「$1」'],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

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
