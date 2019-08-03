import { lazymarks } from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { _zh_num2, sp, sp2, _zh_num, _full_num, EN_REGEXP } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';
import { _word_zh } from 'regexp-cjk/lib';
import { EnumLazyMarkKeys } from '@node-novel/layout-pattern/lib/core/pattern-keys';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '' as const;

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IPatternRule["words_source"] = [

	//['要取代的字', '取代後的字'],
	//_word_jp1('日文原名專用', '日文原名專用'),
	//_word_en3('英文專用', '英文專用'),

	_word_jp1('トゥリウス|托爾烏茲|托里烏茲|托里烏斯|圖利烏斯|托利烏斯', '托利烏斯'),
	_word_jp1('シュルーナン|修日南|修爾南', '疏日南'),
	_word_jp1('オーブニル|歐布尼爾|奧布尼儒|奧布尼爾|奧布尼如|奧布尼努|歐普尼爾|歐匹尼爾', '歐布尼爾'),

	_word_jp1('萊納斯|萊拉斯', '萊納斯'),
	_word_jp1('斯特萊茵|斯托萊茵', '斯特萊茵'),

	_word_jp1('ユニ|優尼', '優妮'),
	_word_en3('Youni', '優妮'),

	[`托利烏斯${sp}疏日南${sp}歐布尼爾`, '托利烏斯・疏日南・歐布尼爾'],
	[`(?:托利烏斯|萊納斯)${sp}歐布尼爾`, '$1・歐布尼爾'],
	[`(?:萊納斯)${sp}斯特萊茵${sp}歐布尼爾`, '$1・斯特萊茵・歐布尼爾'],

	/**
	 *
	 */
	_word_jp1('ドゥーエ', '杜耶'),
	_word_jp1('シュバルツァー', '舒華澤'),

	[`(?:杜耶)${sp}舒華澤`, '杜耶・舒華澤'],

	_word_jp1('エミリー|艾米莉', '艾蜜莉'),
	_word_jp1('リュック', '琉克'),

	_word_jp1('バルト', '巴爾特'),

	_word_jp1('オーパス', 'オーパス'),

	_word_jp1('ドライ|朵萊依|托萊依|朵菈|多萊', '朵萊依'),
	_word_en3('Ｄｒｅｉ', '朵萊依'),

	_word_jp1('スザンナ', '蘇珊娜'),

	_word_jp1('フェム', '菲姆'),

	_word_jp1('リュシー', '露西'),

	_word_jp1('セイス|瑟伊絲', '塞絲'),

	_word_jp1('ジェット', '杰特'),

	/**
	 *
	 */
	_word_jp1('マルラン|馬爾蘭|瑪爾蘭|馬爾拉昂|馬裡蘭', '瑪爾蘭'),
	_word_jp1('ヴォルダン|沃爾丹|沃爾澹', '沃爾丹'),

	_word_jp1('ルーイル', 'Ruiru'),

	_word_jp1('クラヴィキュール', '庫萊維爾'),

	/**
	 *
	 */

	_word_jp1('ヴィクトル|維克多|維克托爾?', '維克托爾'),
	_word_jp1('ドラクロワ|德拉古洛瓦', '德拉克洛瓦'),

	_word_jp1('ジョルジュ', '喬治'),
	_word_jp1('アンリ', '亨利'),

	_word_jp1('ラヴァレ|華亞|納瓦利|納華利|拉布雷|拉巴雷', '拉瓦萊'),
	_word_en3('Ravare', '拉瓦萊'),

	_word_jp1('ロルジェ', '羅爾傑'),


	_word_jp1('シモーヌ', '希莫娜'),
	_word_jp1('メリエ', '梅莉亞'),

	_word_jp1('ポントーバン', '蓬托邦'),



	_word_jp1('アンナマリ|安娜瑪莉', '安娜瑪麗'),
	_word_jp1('アンリエッタ', '安麗埃塔'),

	_word_jp1('ポーラ', '寶拉'),

	_word_jp1('ピエール', '皮埃爾'),
	_word_jp1('シモン', '西蒙'),
	_word_jp1('カルタン|卡魯坦', '卡爾丹'),

	_word_jp1('ジョゼフィーヌ', '約瑟芬'),

	_word_jp1('メアバン|梅邦|梅亞邦', '梅爾邦'),

	_word_jp1('ランゴーニュ|蘭戈紐|蘭戈妞|朗戈尼', '蘭戈妞'),

	_word_jp1('シャンベリ|顯?貝理|顯布利|香貝里', '顯貝理'),


	_word_jp1('ドルドラン', '多爾多蘭'),

	_word_jp1('アルレズ', '阿爾萊澤'),
	_word_jp1('ノリュオー', '羅妮奧'),

	_word_jp1('ヴイ', '維依'),


	_word_jp1('ノヴィヨン|諾維榮', '諾維諾'),

	_word_jp1('ロシュブール', '羅澤布魯'),

	/**
	 *
	 */
	_word_jp1('エリシャ|艾莉夏', '伊麗莎'),
	_word_jp1('ロズモンド|蘿茲蒙德|蘿茲蒙特', '蘿茲蒙德'),
	_word_jp1('バルバストル|巴爾瓦斯特雷', '巴爾巴斯特'),

	_word_jp1('アルフレッド|阿雷德爾弗|アルフレット', '阿爾弗雷德'),
	_word_jp1('シモン', '西蒙'),
	_word_jp1('プリュデルマシェ|普魯德馬謝爾|皮露德爾瑪斯', '普魯德馬謝爾'),

	_word_jp1('サラリ', 'サラリ'),

	/**
	 *
	 */
	_word_jp1('アルマンド|阿曼德|阿勒曼德|阿勒芒德', '阿勒曼德'),

	/**
	 *
	 */
	_word_jp1('エルピス|艾爾皮斯|厄爾庇斯|厄瑞玻斯', '厄魯皮斯'),
	_word_jp1('ロアーヌ|羅亞努|德阿奴|諾亞魯', '羅亞努'),

	_word_jp1('エルプス|艾爾普斯', '厄魯普斯'),
	_word_jp1('ロートレルゲン|羅德雷根|德特魯伊', '羅德雷根'),


	/**
	 * ジャン 西蒙 約翰
	 */
	_word_jp1('ジャン', '約翰'),
	_word_jp1('ジャック|杰克', '傑克'),
	_word_jp1('ルベール|盧沃特|盧貝爾', '魯貝爾'),
	_word_en3('Ruberu', '魯貝爾'),

	[`(?:西蒙)${sp}杰克${sp}魯貝爾`, '$1・杰克・魯貝爾'],

	_word_jp1('シャール', '夏爾'),
	_word_jp1('フランツ|弗朗茲|弗朗茨', '法蘭茲'),
	_word_jp1('シュミット|施密特', '修密特'),

	/**
	 *
	 */
	_word_jp1('バーチェ', '貝奇'),
	_word_jp1('ウィッテ', '維特'),

	_word_jp1('チャーガ', '恰卡'),

	/**
	 *
	 */
	_word_jp1('レイモン', '雷蒙'),
	_word_jp1('ジョエル', '喬魯'),
	_word_jp1('マリアーノ', '馬里亞諾'),
	_word_jp1('ロザリー', '羅莎莉'),
	_word_jp1('シラン', '希娜'),


	_word_jp1('暗闇の大樹海', '暗闇大樹海'),

	/**
	 *
	 */
	_word_jp1('ジラール', '吉拉爾'),
	_word_jp1('レスアン', '雷斯亞'),

	_word_jp1('ニノン', '妮瓏'),
	_word_jp1('ゴーチェ', '戈蒂耶'),
	_word_jp1('セドリック', '塞德里克'),

	/**
	 *
	 */
	_word_jp1('ガエル', '蓋爾'),

	/**
	 *
	 */
	_word_jp1('ニコラ', '尼古拉'),
	_word_jp1('クロエ', '庫洛艾'),

	_word_jp1('ガストン|加斯東|加斯頓', '加斯冬'),
	_word_jp1('ジュスト|朱斯托', '朱斯特'),

	_word_jp1('ドブ', '哆布'),

	/**
	 *
	 */
	_word_jp1('カナレス', '卡納萊斯'),



	/**
	 *
	 */
	_word_jp1('アルクェール|阿魯庫埃魯|阿爾凱爾|阿爾圭爾|阿爾奎爾|阿爾庫艾魯|阿爾奎兒|阿魯克魯', '阿爾凱爾'),

	_word_jp1('布羅塞穆魯|布洛森奴|ブローセンヌ|布羅瑟努|布洛森尼奧|布洛森努|布諾森努|布洛顯奴|布洛森魯', '布洛森奴'),

	_word_jp1('ピュグマリオン', 'ピュグマリオン'),

	_word_jp1('シャルル', '查爾斯'),

	/**
	 *
	 */
	_word_jp1('聖加侖|ザンクトガ(?:レン)?|聖嘉蘭|聖卡蘭|贊庫特格蓮|贊庫特卡廉|聖加倫', '聖加侖'),
	_word_jp1('ガレリン|卡雷林|加雷寧|加里林|加利恩', '加雷寧'),


	_word_jp1('パウル', '保羅'),
	_word_jp1('エグベルト', '伊格貝特'),
	_word_jp1('グラウマン|古拉曼', '古洛曼'),

	_word_jp1('アカデミー', '學院'),

	_word_jp1('フレデリカ', '芙蕾德莉卡'),
	_word_jp1('ユリアンナ|尤莉安娜|利安娜', '尤莉安娜'),
	_word_jp1('フォン', '馮'),
	_word_jp1('カステルベルン', '卡斯泰露貝倫'),


	_word_jp1('マーガス', '瑪古斯'),


	/**
	 *
	 */
	_word_jp1('ユルゲン', '約爾根'),
	_word_jp1('バウアー', '鮑爾'),

	_word_jp1('バハリア|拜哈里耶|巴哈利亞|巴伐利亞', '拜哈里耶'),

	_word_jp1('グランドンブルク|格蘭德堡', '古蘭敦布魯克'),
	_word_jp1('ハイデルレヒト|海德爾萊特', '海德爾雷福特'),


	_word_jp1('カノーファー', '卡諾福'),
	_word_jp1('バーミン', '巴米恩'),

	/**
	 *
	 */
	_word_jp1('バルデン', '瓦爾登'),
	_word_jp1('ライニ', '萊妮'),

	/**
	 *
	 */
	_word_jp1('オムニア|奧姆利亞|歐穆尼亞|歐姆尼亞|奧姆尼亞', '奧姆利亞'),



	_word_jp1('エミリオ|埃米利奧', '艾米利奧'),
	_word_jp1('ラザッロ|拉撒路', '拉扎克'),
	_word_jp1('カランドラ|卡倫德納|卡蘭多蘭', '卡倫德納'),

	_word_jp1('イルマエッラ|伊露瑪愛菈', '伊露瑪艾拉'),
	_word_jp1('オレリア|奧蕾莉婭|奧蓮理亞', '奧蕾莉婭'),

	_word_jp1('ジャンフランコ|奇安弗蘭科', '杰夫蘭克'),
	_word_jp1('パオロ|保羅|炮羅', '保羅'),
	_word_jp1('ファントーニ|凡頭尼', '馮托尼'),

	_word_jp1('イルマ', '伊露瑪'),

	[`伊露瑪艾拉${sp}奧蕾莉婭${sp}卡倫德納`, `伊露瑪艾拉・奧蕾莉婭・卡倫德納`],
	[`艾米利奧${sp}拉扎克${sp}卡倫德納`, `艾米利奧・拉扎克・卡倫德納`],
	[`杰夫蘭克${sp}保羅${sp}馮托尼`, `杰夫蘭克・保羅・馮托尼`],

	_word_jp1('ユート|紐特', '猶特'),
	_word_jp1('エリミヤ|埃里米亞', '艾利米亞'),

	[`猶特${sp}艾利米亞`, `猶特・艾利米亞`],

	_word_jp1('ドメーニコ', '多梅尼科'),
	_word_jp1('ヴェスブッチ', '韋斯佩特'),

	/**
	 * 瑪爾貝亞（マールベア）
	 * 聖加侖連邦王国 ザンクトガレン
	 *
	 * 以圖色拉大陸
	 *
	 */

	_word_jp1('瑪爾貝亞|マールベア|瑪魯貝亞|瑪維亞|馬魯貝亞', '瑪爾貝亞'),

	_word_jp1('ヘプターク|哈普它庫', '海布塔克'),



	_word_jp1('イトゥセラ|伊托瑟拉|以圖色拉|伊特菲拉|伊特塞拉|伊特賽拉', '伊托瑟拉'),
	_word_en3('itusera', '伊托瑟拉'),

	_word_jp1('メカニズム', '梅卡尼茲穆'),




	/**
	 *
	 */
	_word_jp1('クリエイト・スケルトン', '創造・骸骨'),
	_word_jp1('骨架創造', '創造・骸骨'),


	_word_jp1('ケラヴノス', 'ケラヴノス'),
	_word_jp1('ストリーム', 'ストリーム'),
	_word_jp1('ハイドロ', 'ハイドロ'),

	_word_jp1('エンチャント', 'エンチャント'),
	_word_jp1('テンプテーション', 'テンプテーション'),

	_word_jp1('ジェネレーター', '發動機'),

	[`ヴリル${sp}發動機`, `ヴリル・發動機`],



	_word_jp1('オレイカルコス', 'オレイカルコス'),
	_word_jp1('ブレイン', '腦'),

	[`オレイカルコス${sp}腦`, `オレイカルコス・腦`],

	/**
	 *
	 */
	_word_jp1('ゲイザー', 'Gaither'),
	_word_jp1('リッチ', '巫妖'),
	_word_jp1('ケルピー', 'ケルピー'),

	_word_jp1('レンジャー', '遊俠'),
	_word_jp1('シーフ', '盜賊'),

	_word_jp1('チンチクリ', 'チンチクリ'),

	_word_jp1('ホムンクルス', '霍爾蒙克斯'),

	_word_jp1('トレント', '樹人'),

	/**
	 *
	 */
	_word_jp1('カンナギギンオウ', 'カンナギギンオウ'),
	_word_jp1('ジュストコール', 'ジュストコール'),
	_word_jp1('ヴェスト', 'ヴェスト'),

	_word_jp1('マスケット', '鳥銃'),
	_word_jp1('マッチロック', '火縄銃'),
	_word_jp1('フリントロック', '燧發槍'),

	_word_jp1('オリハルコン|奧利哈剛', '奧里哈鋼'),

	_word_jp1('ポーション', '藥水'),

	_word_jp1('スキットル', '薄燒瓶'),

	_word_jp1('エミュレート', '仿真器'),

	_word_jp1('ルカエスト', 'ルカエスト'),
	_word_jp1('ストラ', '聖帶'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	...lazymarks['clear_002'],

	...lazymarks['class'],
	...lazymarks['class_002'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['ln_0010'],

	...lazymarks['4'],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	/**
	 * 將 【】 轉為對話符號
	 */
	...lazymarks['7'],
	...lazymarks['8'],

	/**
	 * 適用於具有大量長段 而只縮減對話之間的空格使用
	 */
	//...lazymarks['ln_talk'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IPatternRule["words"] = _word_zh_all([

	...words_source,

	...words_layout,

] as IWords[]);

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: IPatternRule["words_maybe"] = [

	//'需要偵測的字',

];

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

export default <IPatternRule>{
	lang,
	words_source,
	words_layout,
	words,
	words_maybe,
	words_callback,
}