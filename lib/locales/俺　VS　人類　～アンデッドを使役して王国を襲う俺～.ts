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

	_word_jp1('莉寧|リリン|莉琳|LILIN|ririn', '莉寧'),

	['布里|布利(?=醬)', '布里'],

	_word_jp1('ブリュンヒルデ|布倫希爾德', '布倫希爾德'),

	['阿依達|阿衣達|アイーダ', '阿依達'],

	['夏洛特|夏洛提', '夏洛特'],

	['エリクシル|艾利克西路|埃里克西爾|埃里克西路|埃爾克西路|唉盧克西路', '埃里克西爾'],

	['破納夫|波納雷夫', '波納雷夫'],

	['瓦雷利|瓦列里', '瓦雷利'],

	['暗影牧師|暗影神父', '暗影牧師'],

	['阿里斯', '阿里斯'],

	['伽烈修|咖列休', '伽烈修'],

	['灰恵棲|灰獲守', '灰獲守'],

	_word_jp1('魔人姆卡迪|魔人蜈蚣', '魔人蜈蚣'),

	_word_jp1('ザブン|薩芬|渣不擼', '薩芬'),
	_word_jp1('パンツ|內褲', '內褲'),

	_word_jp1('エリー|繪里', '愛麗'),

	_word_jp1('ミートボーイ|肉食男孩|食肉男孩', '肉食男孩'),

	_word_jp1('ザモール|薩摩魯', '薩摩魯'),

	_word_jp1('伊修塔爾|イシュタル', '伊修塔爾'),

	_word_jp1('マスター|主人', '主人'),

	_word_jp1('モンスター|怪物', '怪物'),

	_word_jp1('パチンコ|柏青哥', '柏青哥'),

	_word_jp1('リーンガーン|玲肯|林剛', '玲肯'),

	_word_jp1('モロドス|摩洛多斯|莫羅多斯', '莫羅多斯'),

	_word_jp1('瑪麗|マリー', '瑪麗'),
	_word_jp1('安托瓦內特|アントワネット', '安托瓦內特'),

	_word_jp1('石像鬼|ガーゴイル', '石像鬼'),



	_word_jp1('瑞克|リック', '瑞克'),

	_word_jp1('シルバークラス', '銀等級'),

	_word_jp1('瓦倫貝克托利亞|ヴァレンバクトリア', '瓦倫貝克托利亞'),

	_word_jp1('瑪爾茲|マーツ|馬爾茲', '瑪爾茲'),

	_word_jp1('リーシャ|麗莎', '麗莎'),

	_word_jp1('雷高里歐', '雷高里歐'),

	_word_jp1('神之抉擇|ゴッドチョイス|神之選擇', '神之抉擇'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['彌諾陶洛斯|米羅陶洛斯', '彌諾陶洛斯'],

	_word_jp1('火球|ファイアボール|ファイアーボール', '火球'),

	_word_jp1('長劍|ロングソード', '長劍'),

	_word_jp1('骸骨守衛|ボーンガード', '骸骨守衛'),

	_word_jp1('コメント', '評語'),

	_word_jp1('ベッド', '床'),

	_word_jp1('アンデッドヴァルキリー', '不死女武神'),

	_word_jp1('バナナ', '香蕉'),

	[/ {2}/g, '　'],
	[/　 /g, '　'],

	[/ ?： ?/g, '：'],

	[/^[　 ]+/gm, ''],

	[/(?<![─]|^─[^\n]*|\n)\n(?=──)/gm, '\n\n\n'],
	[/(?<=^─[^\n]*)\n(?![─]|\n)/gm, '\n\n'],

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
