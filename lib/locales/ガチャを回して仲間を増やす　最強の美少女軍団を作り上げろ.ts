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

	_word_jp1('ノール|諾魯|諾爾|諾兒', '諾爾'),
	_word_jp1('ファニャ|福亞尼亞|法尼婭|法尼亞|法妮亞', '法尼婭'),

	_word_jp1('ファニャラッシュ', '法尼喵'),

	[`諾爾${sp}法尼婭`, `諾爾・法尼婭`],

	_word_jp1('エステル|艾絲緹爾|艾絲緹亞|艾絲特爾|艾斯特爾|艾斯特蕾|愛絲特爾', '艾絲蒂爾'),

	_word_jp1('艾斯', '艾絲'),

	_word_jp1('モフット', '莫夫特'),



	/**
	 * URシスハ・アルヴィ、URカロン、URクラウソラス、URアトラクター
	 */
	_word_jp1('路娜', '露娜'),

	[`露娜${sp}(?:巴菈多|瓦菈德)`, `露娜・巴菈多`],

	_word_jp1('シスハ|希絲哈|希斯哈|西斯哈', '希絲哈'),
	[`希絲哈${sp}(?:愛爾薇|阿爾維)`, `希絲哈・愛爾薇`],
	[`希絲哈愛爾薇`, `希絲哈・愛爾薇`],


	_word_jp1('カロン|卡隆', '伽瓏'),
	_word_jp1('クラウソラス', '克拉烏索拉斯'),
	_word_jp1('アトラクター', '奧托拉科塔'),

	_word_jp1('フリージア|弗利希亞|芙蕾希雅|弗利吉亞|芙蕾希亞', '芙莉希雅'),

	_word_jp1('クローエ・アウレリア', '克勞埃・奧萊利亞'),

	_word_jp1('ハイディ|海迪|海蒂', '海蒂'),

	_word_jp1('ハイディ・ブリューゲル', '海蒂・布魯格爾'),

	/**
	 *
	 */
	_word_jp1('ラウル', '勞爾'),
	_word_jp1('グリン', '格林'),

	_word_jp1('ブルンネ|布倫那|布倫涅|布萊恩|布倫捏|文萊|布倫湼', '布倫涅'),

	_word_jp1('マーナ|馬納', '瑪娜'),

	_word_jp1('アルミロ|阿爾米諾', '阿爾米洛'),
	_word_jp1('カミッラ', '卡米拉'),

	/**
	 *
	 */
	_word_jp1('シュティング|修汀克|修汀格', '修汀格'),

	_word_jp1('ディウス|狄烏斯|迪斯', '迪烏斯'),

	_word_jp1('ミグル', '米露露'),
	_word_jp1('スミカ', '蘇米卡'),
	_word_jp1('ガウス', '高斯'),

	_word_jp1('ウィッジ', '薇琪'),

	_word_jp1('ガンツ|拉烏爾|赤茲', '綱茨'),
	_word_jp1('ポーラ|寶拉', '寶菈'),

	_word_jp1('クリストフ|克里斯托弗|克里斯托夫|弗里斯托福', '克里斯托弗'),

	/**
	 *
	 */
	_word_jp1('クェレス|克萊斯|克勒斯|克瑞斯|庫勒斯', '奎勒斯'),

	_word_jp1('アーデルベル', '阿德爾貝爾'),
	_word_jp1('アンネリー|安妮莉', '安涅莉'),

	_word_jp1('エゴン', '埃貢'),

	_word_jp1('クリスティア|克里斯提亞', '克里斯蒂亞'),
	_word_jp1('クリス', '克里斯'),

	_word_jp1('イグナルト', '伊格納爾特'),

	_word_jp1('マイラ|麥拉', '麥菈'),

	_word_jp1('リスタリア|利斯塔利亞', '麗斯塔利雅'),

	_word_jp1('ドルフ', '多爾夫'),

	/**
	 *
	 */
	_word_jp1('セヴァリア|塞外利亞', '塞瓦利亞'),

	_word_jp1('洛健|ローケン', '洛健'),

	_word_jp1('特斯托多|テストゥード', '特斯托多'),
	_word_jp1('ファルスス', '錯誤'),

	_word_jp1('イリーナ|伊麗娜', '伊莉娜'),

	_word_jp1('ベンス', '本斯'),

	_word_jp1('カエルムライア', '卡魯爾姆萊亞'),
	_word_jp1('達拉', '達拉'),

	_word_jp1('ラスクーム', '拉斯庫姆'),

	_word_jp1('マース', '馬斯'),

	_word_jp1('グレット', '顧蕾特'),

	_word_jp1('ヴァイル', '巴依魯'),

	_word_jp1('クルーセ', '庫魯色'),

	_word_jp1('アゼリー', '阿潔麗'),

	_word_jp1('リシュナル|利秀納爾', '麗秀納魯'),

	_word_jp1('テスタ', '特斯塔'),

	/**
	 *
	 */
	_word_jp1('アンゴリ|安格里', '安格利'),
	_word_jp1('レムリ|雷穆利', '雷姆利'),

	_word_jp1('ハジノ', 'ハジノ'),

	_word_jp1('ルベルグ', '盧伯格'),
	_word_jp1('ビストロス', '維斯羅斯'),

	_word_jp1('アルデ|阿爾德', '阿魯德'),

	_word_jp1('ルゲン|魯根', '盧根'),

	_word_jp1('サラト', '薩拉特'),

	_word_jp1('シュトガル', '施特加爾'),

	/**
	 *
	 */
	_word_jp1('哥倫林|ゴブリン', '哥布林'),
	_word_jp1('サイクロプス|塞克羅斯|賽克羅斯', '賽克羅斯'),

	_word_jp1('スティンガー', '毒刺蠍'),
	_word_en3('Digger', '毒刺蠍'),

	_word_jp1('米諾陶洛斯|彌諾陶洛斯|米諾塔洛斯|米諾陶諾斯', '米諾陶洛斯'),

	_word_jp1('阿斯忒里俄斯|阿斯特里奧斯|アステリオス|阿斯提利奧斯', '阿斯忒里俄斯'),

	_word_jp1('アウルムスライム|奧爾姆斯萊姆', '黃金史萊姆'),

	_word_jp1('貝希摩斯|ベヒモス|貝斯莫德', '貝希摩斯'),

	_word_jp1('リガスマヌス|蘇瑪努斯', '尼卡娜瑪樂思'),

	_word_jp1('スマイター', '斯邁達'),

	_word_jp1('フラーウム木乃伊', '黃色木乃伊'),

	_word_jp1('サンドワーム', '砂蟲'),

	_word_jp1('ティルプス', '提爾普斯'),

	_word_jp1('グランディス|克拉烏索拉斯|格蘭迪烏斯', '格蘭蒂斯'),

	_word_jp1('トレント', '特倫托'),

	_word_jp1('ディアボルス|劉志迪亞波爾斯', '迪亞波爾斯'),
	_word_jp1('スカウト', '斥候'),
	_word_jp1('アサルト', '強襲型'),
	_word_jp1('メディック', '治癒型型'),

	_word_jp1('ルペスレクス|魯珮斯雷庫斯', '魯佩斯雷庫斯'),

	_word_jp1('タルパ', '塔爾巴'),

	_word_jp1('タイラントスパイダー', '泰蘭特蜘蛛'),

	_word_jp1('颶風鯊|龍卷鯊', '颶風鯊'),

	_word_jp1('ラピス', '拉皮斯'),


	_word_jp1('キャンサー', '巨蟹'),
	_word_jp1('プリモー', '普力莫'),
	_word_jp1('マーフォーク', '人魚族'),

	_word_jp1('シェルフィッシュ', '魚貝'),

	_word_jp1('ドリス', '多里斯'),
	_word_jp1('グランドーリス', '宏偉多里斯'),

	_word_jp1('ウルフ', '烏魯夫'),

	_word_jp1('クロコディルス', '鱷魚怪'),

	_word_jp1('クリオネ', '冰海天使'),
	_word_jp1('シーエンジェル', '海之天使'),


	_word_jp1('マリグナント|馬里古南拓', '馬里古南拓'),
	_word_jp1('アークデーモン', '大惡魔'),

	/**
	 *
	 */
	_word_jp1('エクスカリバー', '聖劍'),
	_word_jp1('エクスカリバール', '物理學聖劍'),
	_word_en3('Excalibur', '物理學聖劍'),

	_word_jp1('バール', '鐵撬'),

	_word_jp1('魔元石', '魔元石'),

	_word_jp1('シュティング', '狩獵場'),

	[`(?:レギ|雷吉|雷姬|雷切|雷吉)${sp}(?:エリトラ|艾莉朵拉|埃里多拉|艾莉多拉|艾麗特拉)`, '雷切・埃里多拉'],

	[`阿爾${sp}拉齊爾`, '阿爾・拉齊爾'],

	[`House${sp}Extension`, 'House・Extension'],
	[`住宅${sp}擴展道具`, '住宅・擴展'],

	// 阿里馬斯
	_word_jp1('あります|阿里馬斯|啊里嘛斯', '啊里嘛斯'),


	_word_jp1('スカルリング', '骨戒'),

	_word_jp1('聖骸布', '聖骸布'),

	_word_jp1('ガチャ', '扭蛋'),

	_word_jp1('プレミアムチケット', '高級呼符'),

	_word_jp1('ニグルド', '尼古蕾德'),

	_word_jp1('センチターブラ|水晶貼|遙控水晶|萊姆貼', '意念水晶'),

	_word_en3('BOX扭蛋', '卡池扭蛋'),

	_word_jp1('ディバインルクス|迪拜因盧庫斯', '迪拜恩盧庫斯'),

	_word_jp1('ブラドブルグ|布蘭德布魯古|的布蘭德布魯克', '布拉德布魯格'),

	_word_jp1('ドレインアーマー', '德雷恩鎧甲'),

	_word_jp1('スパティウム', '超級提姆'),

	_word_jp1('インベルサギッタ|因貝爾垂箭頭', '因貝爾箭頭'),

	_word_jp1('プロミネンスフィンガー', '火炎拳套'),

	_word_jp1('ストリートファ', '公告設'),

	_word_jp1('次元手鐲|空間手鐲', '次元手鐲'),

	_word_jp1('デコイ', '誘餌'),

	_word_jp1('エアーシューズ', '空氣鞋'),

	_word_jp1('マジックペーパー', '魔法紙'),

	_word_jp1('エアーロープ', '空氣繩索'),

	_word_jp1('キャンドル', '蠟燭'),

	_word_jp1('ウエストポーチ', '腰包'),

	_word_jp1('ホールドトラップ', '捕獸陷阱'),

	_word_jp1('リンスー', '護髮素'),

	_word_jp1('ボディソープ', '沐浴露'),

	_word_jp1('イヤープラグ', '耳塞'),

	_word_jp1('發炎筒', '信號彈'),

	_word_jp1('アイマスク', '高級眼罩'),

	_word_jp1('ディメンションホール', '次元洞'),

	_word_jp1('腕カバー', '護手'),

	_word_jp1('ボードゲームセット', '桌游套裝'),

	/**
	 *
	 */
	_word_en3('Sonic Blade', 'Sonic Blade'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [

	[/^[●⚪⚪◯]$/gm, '◆'],

	_word_en3(/(\d+) ?(g|%)/ig, (s, $1, $2, $3) => {
		return StrUtil.toFullWidth(`${$2}${$3}`);
	}),

	_word_en3(/(HP|MP)(\d+)/ig, '$2 $3'),

	_word_en3(/level/ig, '等級'),

	_word_en3(/APP/ig, 'APP'),

	_word_en3(/StepUP/ig, 'Step UP'),

	_word_en3(/HP|MP|R|SR|SSR|UR/ig, (s, $1: string) => {
		return StrUtil.toFullWidth($1.toUpperCase());
	}),

	_word_en3(/COMPLETE/ig, (s, $1: string) => {
		return $1.toUpperCase();
	}),



	[/(?<=\S\n)(固有能力|技能)$/gm, '\n$1'],

	...lazymarks['clear_002'],

	...lazymarks['class'],
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