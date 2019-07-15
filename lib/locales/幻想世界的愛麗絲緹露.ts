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
export const words_source: IWords[] = [

	['愛麗絲|愛莉斯|艾莉絲|アリス', '愛麗絲'],

	['紫嫣|紫苑|シオン', '紫苑'],

	['尼克魯|ニコル|Nicole', '尼克魯'],
	['阿黛爾|アデル', '阿黛爾'],

	['提露|緹露|緹魯', '緹露'],
	['緹露貝露|ティルベル|緹露貝爾', '緹露貝露'],
	['艾因莎烏拉|エインシャウラ|艾因夏拉|愛因夏烏拉', '艾因莎烏拉'],
	['アセリア|雅瑟莉亞', '雅瑟莉亞'],

	['(艾斯特|伊斯特)(麗雅|里婭|莉亞|莉雅)|エストリア', '艾斯特麗雅'],
	['伊斯特|エスト|艾斯特', '艾斯特'],

	['塞拉|賽菈|Saila|サイラ', '塞拉'],
	['琉忒|リュート', '琉忒'],

	['艾姆|エイム', '艾姆'],
	['拉娜', '拉娜'],

	['伊(莉|利)(亞|雅|婭)?|イリア', '伊莉亞'],

	['艾莉諾亞?|埃莉諾|艾雷諾亞|エレノア|愛蕾諾亞', '愛蕾諾亞'],

	['伯特蘭德|貝魯托朗|ベルトラン|貝奴德蘭|貝魯多朗|貝爾特蘭', '貝魯托朗'],

	['庫蘭瑟絲卡|庫蘭瑟斯卡|クランセスカ|庫蘭潔絲卡', '庫蘭瑟絲卡'],
	['威爾?明頓|威爾敏通|ウィルミントン|威爾敏特', '威爾明頓'],

	['帕魯西烏斯|パルシウス', '帕魯西烏斯'],

	['奧斯提亞|奧斯緹露|オースティア|Austere|歐斯提亞', '奧斯提亞'],

	['ステアード|SuteāDo|史蒂亞徳', '史蒂亞徳'],
	['艾庫雷雅|エクレア|艾庫雷婭|艾克雷亞|艾庫雷亞|艾克蕾亞|艾庫利亞|阿庫利亞|艾克蕾雅', '艾庫雷雅'],

	['阿米納蘇|Aminasu|阿米納斯|アミナス', '阿米納斯'],

	['雷歐尼爾|雷奧尼爾|レオニール|萊奧尼爾', '萊奧尼爾'],
	['薩克拉門托|サクラメント|Sacrament|薩克拉門德|薩庫拉門托|薩克拉門特|撒庫拉門托|薩庫蘭敏特|薩庫蘭敏特|撒庫拉敏特', '薩克拉門托'],

	['亞爾賽特|阿爾賽德|阿魯塞德|亞爾賽德', '阿爾賽德'],
	['アシタカ|阿席達卡|阿西塔卡|アシダカ|阿斯塔卡', '阿席達卡'],

	['(莉|利)布拉|リブラ|立布拉', '莉布拉'],
	['シリウス|西里烏斯|希利烏斯', '希利烏斯'],

	['希朵拉', '希朵拉'],

	['米雷烏斯|ミレウス', '米雷烏斯'],

	['瑪麗亞|瑪利亞|瑪莉亞', '瑪麗亞'],
	['瑪麗安娜|マリアンナ|瑪麗安特', '瑪麗安娜'],
	['休斯頓|ヒューストン|休斯敦', '休斯頓'],

	['林納魯|リンナル|林納爾', '林納魯'],

	['雷伊米婭|レイミア|蕾伊米亞|蕾米婭|拉彌亞|雷米亞|雷伊米亞', '蕾伊米亞'],

	['索爾特|ソルト', '索爾特'],
	['凜|リン', '凜'],

	['克雷因|クレイン|克萊因', '克萊因'],
	['克里斯娜|クリスナ|克莉絲娜?', '克莉絲娜'],

	['芭提|バティ|芭緹|巴蒂', '芭緹'],

	['蘿拉|ラナ', '蘿拉'],

	['庫里弗', '庫里弗'],

	['里克', '里克'],

	['マキナ|瑪琪娜|瑪姫娜', '瑪琪娜'],

	['小九|キュウ', '小九'],

	['歐歐塔卡', '歐歐塔卡'],

	['艾尼希|エニシ', '艾尼希'],
	['米索奇|ミソギ', '米索奇'],

	['蚩戈恩|西格恩|シゲン', '蚩戈恩'],

	['伊邪那歧|伊邪納岐', '伊邪那歧'],

	['シルヴィス?|希爾薇絲?|希爾維斯', '希爾薇絲'],
	['露米娜|露米亞|ルミナ', '露米娜'],

	['斯特拉加爾德', '斯特拉加爾德'],
	['阿爾卡諾亞', '阿爾卡諾亞'],

	['千本櫻從雲|千本櫻叢雲', '千本櫻叢雲'],

	['絲蒂莎|斯蒂西亞|ステーシア', '絲蒂莎'],
	['卡露梅爾|カルメル', '卡露梅爾'],
	['艾莉婕|エリーゼ', '艾莉婕'],

	['芙爾雷蒂', '芙爾雷蒂'],
	['雷蒂', '雷蒂'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['[发]', '發'],

	['髮旋', '髮旋'],

	['Guild|公会|行會', '公會'],

	...lazymarks['class'],

	...lazymarks['4'],

	['」，(?=\n)', '」'],

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

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
