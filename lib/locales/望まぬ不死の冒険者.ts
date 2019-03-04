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
	_word_jp1('ヴィヴィエ|維維艾|維維?耶', '維維耶'),

	_word_jp1(`レント|雷特|蘭特`, '雷特'),
	_word_jp1(`梵納|ファイナ|法伊納`, '梵納'),

	[`羅蕾露${sp}維維耶`, '$1・維維耶'],
	[`雷特${sp}梵納`, '雷特・梵納'],
	[`雷特梵納`, '雷特・梵納'],

	/**
	 *
	 */
	[`アカシア|雅卡西亞`, '雅卡西亞'],
	[`雅卡西亞的地圖|アカシアの地図`, '雅卡西亞的地圖'],

	/**
	 *
	 */
	_word_jp1(`クロープ|庫洛普|克洛普`, '庫洛普'),
	_word_jp1(`ルカ|露卡`, '露卡'),

	[`三叉戟|三叉の銛|三魚叉`, '三叉戟'],

	/**
	 * 冒険者公會
	 */
	_word_jp1(`シェイラ|席伊菈|謝菈`, '席伊菈'),
	_word_jp1(`イバルス|伊巴魯斯?`, '伊巴魯斯'),

	_word_jp1(`達利奧|達里奧|ダリオ`, '達利奧'),
	[`達利奧${sp}哥斯塔`, '達利奧・哥斯塔'],

	_word_jp1(`烏路夫|ウルフ|沃爾夫`, '沃爾夫'),
	_word_jp1(`黑路曼|ヘルマン|赫爾曼`, '赫爾曼'),

	[`沃爾夫${sp} ?赫爾曼`, '沃爾夫・赫爾曼'],

	/**
	 *
	 */
	_word_jp1(`莉娜|リナ`, '莉娜'),
	_word_jp1(`ローグ|洛古`, '洛古'),

	_word_jp1(`イドレス|伊多雷斯`, '伊多雷斯'),

	_word_jp1(`路巴傑|路巴杰|ルパージュ`, '路巴傑'),

	/**
	 *
	 */

	_word_jp1(`ローラ|蘿拉`, '蘿拉'),
	_word_jp1(`賽蒂|サティ`, '賽蒂'),

	_word_jp1(`萊伊茲|ライズ`, '萊伊茲'),
	_word_jp1(`達納|ダナー`, '達納'),

	/**
	 * 馬路特第二孤兒院
	 */
	_word_jp1(`アリゼ|艾莉婕`, '艾莉婕'),

	_word_jp1(`リリアン|莉莉安|利利安`, '莉莉安'),
	_word_jp1(`ジュネ|珍尼|茱妮`, '茱妮'),

	_word_jp1(`エーデル|艾達|艾登|愛德爾`, '艾登'),

	_word_jp1(`ウンベルト|恩貝努`, '恩貝努'),
	_word_jp1(`ノーマン|洛曼`, '洛曼'),

	/**
	 *
	 */
	[`拉圖爾|ラトゥール`, '拉圖爾'],
	_word_jp1(`勞拉|ラウラ|菈烏菈|勞菈`, '菈烏菈'),

	_word_jp1(`伊扎克|イザーク|伊薩古|伊薩克`, '伊薩古'),

	/**
	 *
	 */

	[`ヴァンスルト|范思魯特`, '范思魯特'],


	[`フォロストロア|弗洛斯托洛亞`, '弗洛斯托洛亞'],

	/**
	 *
	 */
	_word_jp1('沙魯|シャール|查爾', '沙魯'),
	_word_jp1('蘇特諾|ステノ|斯提諾|斯特諾', '蘇特諾'),

	_word_jp1('維塔|ウィータ|維達', '維塔'),

	/**
	 *
	 */
	_word_jp1('ニヴ|尼烏|尼維|尼夫|尼薇|妮姆|妮薇', '妮薇'),
	_word_jp1('マリス|瑪麗斯|馬利斯', '瑪麗斯'),

	_word_jp1('ミュリアス|穆利烏斯|繆莉亞絲|繆莉婭絲|穆里亞斯|穆利亞斯|繆莉婭斯', '繆莉亞絲'),
	_word_jp1('ライザ|麗莎|萊莎', '萊莎'),

	/**
	 *
	 */
	_word_jp1(`阿爾希蒂絲|アルヒルディス|阿爾希迪絲`, '阿爾希蒂絲'),
	_word_jp1(`ヒルデ|希爾蒂`, '希爾蒂'),

	_word_jp1(`トラカ|朵拉卡`, '朵拉卡'),

	/**
	 *
	 */
	_word_jp1('ロベリア|洛貝利亞|羅伯利亞|羅貝莉亞|羅貝麗亞|羅貝利亞', '羅貝莉亞'),

	_word_jp1('アルス|亞魯斯', '亞魯斯'),

	_word_jp1('アールズ|亞魯茲|艾魯茲', '亞魯茲'),
	_word_jp1('米莉雅|ミリア', '米莉雅'),

	_word_jp1(`ギーリ|吉利`, '吉利'),

	/**
	 *
	 */
	_word_jp1(`ハトハラー|哈特哈拉|ハトハラ—|哈特哈萊|哈特哈莱|哈塔哈萊`, '哈特哈拉'),
	_word_jp1(`(ハトハラー|哈特哈拉)の村`, '哈特哈拉村'),




	_word_jp1(`加爾|ジャル`, '加爾'),
	_word_jp1(`多魯|ドル`, '多魯'),
	_word_jp1(`麗麗|リリ`, '麗麗'),
	_word_jp1(`法莉|ファーリ`, '法莉'),

	_word_jp1(`聖アルトの祝祭日|聖阿爾特節|聖阿爾特の祝祭日`, '聖阿爾特節'),
	_word_jp1(`アルト|阿爾特`, '阿爾特'),

	_word_jp1(`無名の?祭典|名もなき祭り`, '無名祭典'),

	_word_jp1(`吉爾達|ジルダ`, '吉爾達'),
	_word_jp1(`伊果|インゴ`, '伊果'),

	_word_jp1(`伽爾布|ガルブ`, '伽爾布'),

	_word_jp1(`ハディード`, '哈迪德'),

	_word_jp1(`洛庫斯塔|ロクスタ`, '洛庫斯塔'),
	_word_jp1(`梅萊莎|メリサ`, '梅萊莎'),
	_word_jp1(`普拉瓦達|プラヴダ|普瓦夫達`, '普拉瓦達'),

	_word_jp1(`金琳|ジンリン|金玲`, '金琳'),

	_word_jp1(`緹露雅|ティルヤ`, '緹露雅'),

	_word_jp1(`薩莉亞花|サリアの?花`, '薩莉亞花'),

	_word_jp1(`阿爾加|アルガ`, '阿爾加'),
	_word_jp1(`穆魯|ムル`, '穆魯'),

	_word_jp1(`威爾弗利特|ヴィルフリート`, '威爾弗利特'),
	_word_jp1(`琉卡|リュッカー`, '琉卡'),

	_word_jp1(`阿澤爾|アゼル`, '阿澤爾'),
	_word_jp1(`歌德|ゴート`, '歌德'),

	_word_jp1(`薇洛蓋特|ヴィロゲト|維羅蓋特`, '薇洛蓋特'),

	_word_jp1(`薇洛|ヴィロ`, '薇洛'),
	_word_jp1(`蓋特|ゲト`, '蓋特'),

	_word_jp1(`卡皮丹|カピタン`, '卡皮丹'),

	/**
	 *
	 */
	_word_jp1(`マルト|馬路特|馬爾特|馬魯特`, '馬路特'),
	_word_jp1(`マルトホオノキ`, 'マルトホオノキ'),


	_word_jp1(`ヤーラン|亞蘭`, '亞蘭'),
	[`亞蘭王国|王国亞蘭`, '亞蘭王国'],

	_word_jp1(`ヴィステルヤ|維斯特露亞`, '維斯特露亞'),

	[`オークショナー|奧克納`, '奧克納'],


	_word_jp1('雷魯門多|レルムッド|雷魯姆特', '雷魯姆特'),

	_word_jp1('阿瓦安|アーヴァン', '阿瓦安'),

	_word_jp1('路格埃拉|ルグエラ', '路格埃拉'),
	_word_jp1('奧拉德拉斯|オラドラス', '奧拉德拉斯'),

	_word_jp1('ハムダン|哈姆丹', '哈姆丹'),
	_word_jp1('(?<=ハムダン|哈姆丹)(礦山|鉱山)', '礦山'),

	[`古貴聖樹国`, '古貴聖樹国'],

	/**
	 *
	 */
	_word_jp1('費魯特|フェルト|菲爾特', '菲爾特'),

	[`費王(費魯特|菲爾特)`, '善王菲爾特'],
	_word_jp1('善王(費魯特|菲爾特|フェルト)の(迷宮|地下)都市', '善王菲爾特的迷宮都市'),

	_word_jp1('阿德涅|アドネー', '阿德涅'),
	_word_jp1('孔拉|コンラー', '孔拉'),

	[`古き虫の迷宮|古虫迷宮`, '古虫迷宮'],

	_word_jp1('雷赫斯蒂爾|レヘスティール', '雷赫斯蒂爾'),

	/**
	 *
	 */
	[`タラスク|塔拉斯孔|塔拉斯克`, '塔拉斯孔'],
	[`哥倫林|哥布林`, '哥布林'],
	[`大地竜`, '大地竜'],

	/**
	 *
	 */
	[`飛行船|飛空艇`, '飛空艇'],
	[`竜血花|龍血花`, '龍血花'],
	[`冒険者公會|冒険者組合(公會)?`, '冒険者公會'],
	[`邪気蓄積症|邪氣蓄積症`, '邪氣蓄積症'],

	[`治癒術師|治療術士`, '治癒術師'],

	[`中級吸血鬼|ミドル・吸血鬼`, '中級吸血鬼'],

	_word_jp1('酥卵煮|ソレスト', '酥卵煮'),
	_word_jp1('炸蛋白|ゲッタンバ', '炸蛋白'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[`解体`, '解體'],

	[`鍛冶夫妻|鍛冶組合|鍛冶夫婦`, '鍛冶組合'],
	[`二重登記|二重登錄|雙重登錄`, '二重登錄'],
	[`解体場`, '解體場'],

	[`殭屍|僵屍`, '僵屍'],

	[/^[　 ]+/gm, ''],

	[/(?<=[①②])(?=\n\S)/gm, '\n'],

	[/(?<=^[─⋯]+[^\n]+)(?=\n\S)/gm, '\n'],
	[/(?<=\S\n)(?=[─⋯]+)/gm, '\n'],

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
