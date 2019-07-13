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

	_word_jp1('ユマ|尤瑪', '尤瑪'),
	_word_jp1('高橋敬一', '高橋敬一'),

	_word_jp1('ゼナ|澤娜|賽納|塞納|塞娜|賽娜', '澤娜'),

	_word_jp1('パルメ|帕魯梅|帕爾梅', '帕魯梅'),
	_word_jp1('パメラ|帕梅拉', '帕梅拉'),

	_word_jp1('ガーシェント|卡西安多|加西恩特|Gashento', '加西恩特'),
	_word_jp1('エンディアン|安黛因昂|恩第安', '安黛因昂'),

	_word_jp1('エリプス|艾利普斯|艾利浦斯', '艾利普斯'),

	_word_jp1('セレナ|瑟蕾娜|塞雷娜', '瑟蕾娜'),
	_word_jp1('ステフ|史蒂芬|斯蒂芬|史蒂夫', '史蒂芬'),

	/**
	 * 塔納卡（田中）
	 */
	_word_jp1('タナカ|塔納卡', '塔納卡'),

	/**
	 * 演員
	 */
	_word_jp1('セラフィム|薩拉弗', '薩拉弗'),
	_word_jp1('ミューラン|繆拉', '繆拉'),
	_word_jp1('ゼスター|扎斯塔', '扎斯塔'),

	_word_jp1('グラント|格蘭朵', '格蘭朵'),

	_word_jp1('マーロ|馬洛', '馬洛'),

	_word_jp1('バード|巴多魯', '巴多魯'),

	/**
	 *
	 */
	_word_jp1('ピラリス|皮拉莉絲|皮拉裡絲', '皮拉莉絲'),
	_word_jp1('セーラ|瑟拉', '瑟拉'),

	_word_jp1('ゼノビア|扎諾比亞', '扎諾比亞'),

	/**
	 *
	 */
	_word_jp1('スーダ|蘇丹', '蘇丹'),
	_word_jp1('グエラ|古拉', '古拉'),

	/**
	 *
	 */
	_word_jp1('シルフ|希爾福', '希爾福'),
	_word_jp1('パセラル|帕塞拉爾|パラセル|帕拉(?:塞爾)?|西沙|巴拉塞爾', '帕拉塞爾'),

	_word_jp1('ファーモス|法莫斯', '法莫斯'),

	_word_jp1('レーナ|蕾娜', '蕾娜'),


	/**
	 * セルギス帝国
	 */
	_word_jp1('セルギス|塞拉契斯|瑟魯基蘇|Serugisu', '瑟魯基蘇'),

	/**
	 * ビルダール王国
	 */
	_word_jp1('ビルダール|碧婁達爾|比爾扎爾|比爾達爾|Birudaru', '碧婁達爾'),

	/**
	 *
	 */
	_word_jp1('ガスタール|Gasutaruda', '戈斯達魯達'),
	_word_jp1('ザバ|扎巴|Zaba', '扎巴'),
	_word_jp1('森に棲む者|森林栖息者|栖息於森林的魔物|森林栖者', '森林栖者'),
	_word_jp1('森に住む者|森林居住者|森林的住民|森林住民', '森林住民'),
	_word_jp1('Bija|畢加|ビジャ|維拉', '畢加'),

	_word_jp1('桑德拉|サンドラ|聖德拉', '桑德拉'),
	_word_jp1('ソノアール|索諾阿魯', '索諾阿魯'),

	/**
	 *
	 */
	_word_jp1('スフィール|Sufiru|蘇菲爾|斯普伊羅', '蘇菲爾'),

	/**
	 *
	 */
	_word_jp1('グレメル|格拉諾姆', '格拉諾姆'),

	_word_jp1('アイオーン|AEON|Aion', 'AION', 'ig'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['海因里希', '海因里希'],
	['赤棘毒蛙|紅荊毒青?蛙', '赤棘毒蛙'],
	['大牙豬|Sargir Gor', '大牙豬'],
	['蠍尾獅|Mantikoa', '蠍尾獅'],
	['大岩螳螂|Zarudinefero', '大岩螳螂'],

	['竜籠', '竜籠'],

	['チート|神棍|外掛', '外掛'],

	['黑邊眼鏡|黑框眼鏡', '黑框眼鏡'],

	//['you女', '幼女', 'ig'],

	['王蜘蛛蛇|バウギュリヴァル|Bauguri Val', '王蜘蛛蛇'],

	_word_jp1('エルフ|森精靈?|精靈|Elf', '精靈'),

	['蠑螈|Rong螈', '蠑螈'],

	[/^　/gm, ''],

	[/(?<=\S)\n(?=健康值：)/gm, '\n\n'],
	[/(?<=(?:健康|魔力)值：[^\n]+)\n(?!魔力值：|\n)/gm, '\n\n'],

	...lazymarks['unit'],

	...lazymarks['class'],

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
