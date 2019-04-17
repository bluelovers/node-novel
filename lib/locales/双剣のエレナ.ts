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

	_word_jp1('エレナ|埃列娜|艾蕾娜|伊莉娜|艾蓮娜', '伊莉娜'),
	_word_jp1('ロゼ|羅斯|羅榭|羅賽|蘿莎|羅澤|蘿澤|羅莎', '羅榭'),

	[`伊莉娜${sp}羅榭`, '伊莉娜・羅榭'],

	_word_jp1('アインス|愛因茲|安因斯|阿尼斯|安因思|安因茲', '愛因茲'),
	_word_jp1('ベルトナー|貝魯托那|貝爾托納', '貝爾托納'),

	[`愛因茲${sp}貝爾托納`, '愛因茲・貝爾托納'],

	_word_jp1('ゾルテ', '佐爾忒'),

	/**
	 *
	 */

	_word_jp1('ビエナート|比耶納德|畢安納多|比耶納德|碧艾納特', '畢安納多'),

	_word_jp1('グイレゴリウス|格雷戈里|古利哥尼斯|圭樂高海龍號', '古利哥尼斯'),

	_word_jp1('エンプレス', '安普納斯'),
	_word_jp1('レガリア', '雷加利亞'),

	_word_jp1('オーギュスト', '奧古斯特'),

	_word_jp1('アウグスト|奧古斯特|奧古斯都', '奧古斯都'),
	_word_jp1('貝魯托尼亞斯|貝爾托利斯|皮特里亞斯|皮特利亞斯|ベルトリアス', '貝魯托尼亞斯'),

	[`(?:奧古斯都)${sp}(?:貝魯托尼亞斯)`, '奧古斯都・貝魯托尼亞斯'],



	[`奧古斯特${sp}澤克爾`, '奧古斯特・澤克爾'],

	/**
	 *托阿魯·洛社
	 */
	_word_jp1('ベナン|貝娜|貝蘭', '貝娜'),

	_word_jp1('ノルト|諾爾多|諾爾托', '諾爾托'),

	_word_jp1('ノルン', '羅倫'),
	_word_jp1('ガラート|加華持|加華特|卡烏托', '加華特'),

	_word_jp1('レイリオ|里依尼奧|里伊尼奧|雷里歐|雷奧|雷尼奧|雷利歐|雷里約', '雷里歐'),

	[`雷里歐${sp}加華特`, '雷里歐・加華特'],


	_word_jp1('セアル|基阿魯', '基阿魯'),

	[`(?:(?<!基)托?阿魯|トアル)${sp}(?:洛社|ロゼ)`, '托阿魯・洛社'],


	_word_jp1('クレスト|克雷斯特|克里斯托', '克里斯托'),

	_word_jp1('ルイーダ', 'ルイーダ'),
	_word_jp1('オルテガ', '奧爾特加'),

	/**
	 *
	 */
	_word_jp1('リドア|里利多阿|利多阿', '利多阿'),

	[`バリトン${sp}ベイ`, '巴里彤・貝'],

	_word_jp1('ラドック|拉多克|朗多夫', '拉多克'),
	_word_jp1('ミローズ|米偌斯|米洛茲|米洛滋', '米洛茲'),
	_word_jp1('カロッソ|加羅桑|卡倫', '加羅'),

	[`加羅${sp}マルティス`, '加羅・マルティス'],

	/**
	 *
	 */
	_word_jp1('瑪露提那|マルテナ|馬魯特納|瑪露提納|瑪魯提那', '瑪露提納'),

	[`ユータス${sp}ヒルト`, 'ユータス・ヒルト'],

	/**
	 *
	 */
	_word_jp1('オーランド|奧蘭多|奧蘭度|奧爾多', '奧蘭多'),
	_word_jp1('華以斯華修|ライズワース|萊斯瓦斯|萊茲沃斯|萊斯沃思', '萊茲沃斯'),
	_word_en3('Raizuwasu', '萊斯瓦斯'),

	_word_jp1('グレイスワール', '格雷斯瓦爾'),
	_word_jp1('ノーデンヒルト', '諾第希爾德'),

	_word_jp1('ロメル|隆梅爾|羅梅爾', '羅梅爾'),
	_word_jp1('アーチ', '亞奇'),

	_word_jp1('ベルノルト|貝爾諾多|別魯若托', '貝爾諾多'),

	_word_jp1('維爾茨堡|ヴュルツブルク', '維爾茨堡'),
	_word_jp1('海德堡|ハイデルベルク', '海德堡'),


	_word_jp1('蘭傑克|ランゼ|蘭茲|蘭滋', '蘭茲'),

	[`(?:蘭傑克|蘭茲)${sp}(?:魯穆多|クルムド)${sp}(?:奧蘭多|オーランド)`, '蘭茲・魯穆多・奧蘭多'],



	/**
	 *
	 */
	_word_jp1('双刻の月', '雙刻之月'),

	_word_jp1('蕾蒂西亞|レティシア|雷蒂希雅|蕾蒂希雅', '蕾蒂希雅'),
	_word_jp1('梅爾菲斯|メルヴィス|メルビィス|梅魯佩斯', '梅爾菲斯'),

	_word_jp1('シェルン|杰爾倫|夏倫|榭倫|夏侖|謝蓮', '夏倫'),
	_word_jp1('卡達托|カダート', '卡達托'),

	[`(?:蕾蒂希雅|夏倫|卡達托)${sp}梅爾菲斯`, '$1・梅爾菲斯'],

	_word_jp1('卡塔莉娜|カタリナ', '卡塔莉娜'),
	_word_jp1('繆斯|ミューズ', '繆斯'),

	[`卡塔莉娜${sp}繆斯`, '卡塔莉娜・繆斯'],

	_word_jp1('エクルートナ|耶庫魯多納|艾克爾托納', '艾克爾托納'),

	_word_jp1('琳|リム', '琳'),
	_word_jp1('艾爾克|アルク', '艾爾克'),
	_word_jp1('萊伊爾|ライエル', '萊伊爾'),


	[`琳${sp}瓦勒斯蒂娜`, '琳・瓦勒斯蒂娜'],
	[`艾爾克${sp}里奇奧`, '艾爾克・里奇奧'],
	[`萊伊爾${sp}索沃思`, '萊伊爾・索沃思'],

	_word_jp1('シトレ|西索爾', '西索爾'),
	_word_jp1('菲力歐|フェリオ', '菲力歐'),

	/**
	 *
	 */
	_word_jp1('砂塵の?大鷲', '砂塵之大鷲'),

	_word_jp1('ヴォルフガング|奧爾夫岡|波爾夫岡|波爾夫剛', '波爾夫岡'),
	_word_jp1('バーナード', '巴納德'),

	/**
	 * 伊文·尤哈斯
	 * 德里克·阿德斯
	 * 阿爾芒·阿魯巴
	 */
	_word_jp1('黄昏の獅子', '黃昏的獅子'),
	[`(?:エドラット|愛德拉托)${sp}(?:モス|摩斯)`, '愛德拉托・摩斯'],

	_word_jp1('アンゼルム', '阿塞爾姆'),
	_word_jp1('アヒム', '奧黑姆'),

	[`阿塞爾姆${sp}奧黑姆`, '阿塞爾姆・奧黑姆'],



	[`(?:哈桑)${sp}(?:塞魯托里歐)`, '哈桑・塞魯托里歐'],


	[`德里克${sp}阿德斯`, '德里克・阿德斯'],


	_word_jp1('伊文|伊萬', '伊文'),
	[`伊文${sp}(?:尤|亞)哈斯`, '伊文・尤哈斯'],

	_word_jp1('阿爾芒|アルマン|阿爾曼', '阿爾曼'),
	_word_jp1('阿爾伯特|アルバート|阿魯巴', '阿爾伯特'),

	[`阿爾曼${sp}阿爾伯特`, '阿爾曼・阿爾伯特'],


	/**
	 * 艾德法魯多·愛克諾斯
	 * 艾德
	 * 阿尼艾絲·阿布尼魯
	 */
	_word_jp1(`アニエス|阿尼艾斯|阿尼艾絲`, '阿尼艾絲'),

	[`阿尼艾絲${sp}阿布尼魯`, '阿尼艾絲・阿布尼魯'],

	_word_jp1(`艾德法魯多`, '艾德法魯多'),

	/**
	 *
	 */
	_word_jp1(`ベニート`, '別尼多'),
	_word_jp1(`アギーレ`, '安吉烈'),

	_word_jp1(`シュレイ|艾修利|艾休利`, '艾休利'),

	[`艾休利${sp}貝托尼`, '艾休利・貝托尼'],
	[`艾特莉${sp}貝托尼`, '艾特莉・貝托尼'],

	/**
	 *
	 */
	[`魯本斯${sp}菲里歐`, '魯本斯・菲里歐'],

	/**
	 *
	 */

	_word_jp1('カルロ|卡洛|卡羅', '卡羅'),

	[`卡羅${sp}(?:巴爾薩尼|瓦爾扎尼)`, '卡羅・巴爾薩尼'],

	_word_jp1('菲利克斯|フェリクス|菲力庫斯|菲麗庫斯|菲力庫絲', '菲利克斯'),

	[`菲利克斯${sp}(?:納扎利魯|ナザリエル)`, '菲利克斯・納扎利魯'],

	_word_jp1('ベルナディス', '伯納士'),
	[`(?:伯納士)${sp}(?:柏遼茲)`, '伯納士・柏遼茲'],

	[`(?:龐德)${sp}(?:卡拉斯)`, '龐德・卡拉斯'],


	_word_jp1('フィーゴ|費戈|菲戈', '菲戈'),
	[`(?:菲戈)${sp}(?:阿雷斯)`, '菲戈・阿雷斯'],

	[`(?:萊培克)${sp}(?:賽克斯)`, '萊培克・賽克斯'],



	[`(?:馬克希斯|マルクセス)${sp}(?:菲利茲|フィリーズ)`, '馬克希斯・菲利茲'],
	[`(?:克魯茲|クルス)${sp}(?:蓋利艾斯|ガリアス)`, '克魯茲・蓋利艾斯'],

	/**
	 *
	 */
	/**
	 *
	 */
	_word_jp1('ダラーシュ', 'ダラーシュ'),

	_word_jp1('ロダック', '洛札斯'),
	_word_jp1('バジルナ|羅勒納?', '羅勒納'),

	_word_jp1('セント', 'セント'),

	[`(?:セント|聖)${sp}(?:羅勒納)`, '聖・羅勒納'],
	[`(?:セント|聖)(?:羅勒納)`, '聖・羅勒納'],

	_word_jp1('ジルベルト', '迪爾帶'),
	_word_jp1('ルーデバッハ|盧德巴赫|路德巴赫|ルーデバッツハ|瑞德巴圖哈', '盧德巴赫'),


	[`(?:迪爾帶)${sp}(?:盧德巴赫|ルーデバッハ)`, '迪爾帶・盧德巴赫'],

	_word_jp1('オルセット', '奧爾瑟多'),
	_word_jp1('ゲルト', '格特'),

	[`(?:路根|ルーゲン)${sp}(?:霍爾斯|ホルス)`, '路根・霍爾斯'],

	[`(?:卡爾文|カルヴィン)${sp}(?:菲爾蘇|フェルス)`, '卡爾文・菲爾蘇'],

	_word_jp1('ソラック', '索拉庫'),

	_word_jp1('バイロン', '拜倫'),
	_word_jp1('クリフトン|克里夫頓?', '克里夫頓'),

	[`(?:拜倫)${sp}(?:克里夫頓)`, '拜倫・克里夫頓'],

	_word_jp1('トルーセン', '托魯森'),

	_word_jp1('アウスクルツ', '阿爾希魯斯'),
	_word_jp1('メデレーナ', '貝德雷納'),

	_word_jp1('ラーゼン', '如岑'),

	_word_jp1('巴爾扎克|バルザック', '巴爾扎克'),
	[`(?:巴爾扎克|亞莉)${sp}(?:ステイフ)`, '$1・ステイフ'],

	_word_jp1('ロボス', '俄伯斯'),

	_word_jp1('レガスガリア', '瓦斯加利亞'),

	_word_jp1('阿希爾|アイシ', '阿希爾'),
	_word_jp1('亞莉|アリア', '亞莉'),

	/**
	 *
	 */
	_word_jp1('ルース', '魯斯'),
	[`(?:魯斯)${sp}(?:ルパード|魯伯特)`, '魯斯・魯伯特'],

	/**
	 *
	 */
	_word_jp1('瓦倫加爾特|ファーレンガルト|法倫加魯托', '瓦倫加爾特'),

	_word_en3('Farengaruto', '瓦倫加爾特'),

	_word_jp1('瓦倫加爾特(聯盟|聯邦)', '瓦倫加爾特聯邦'),

	_word_jp1('サクシャリア', '薩克沙利亞'),
	_word_jp1('布魯梅爾', '布魯梅爾'),
	_word_jp1('多布萊姆', '多布萊姆'),

	_word_jp1('ニールバルナ|尼爾巴魯納|尼爾瓦爾納', '尼爾瓦爾納'),

	_word_jp1('法魯托', '法魯托'),

	[`瓦魯特${sp}伊梅歐`, '瓦魯特・伊梅歐'],


	_word_jp1('費盧杰', '費盧杰'),
	_word_jp1('梅德奧斯', '梅德奧斯'),



	/**
	 *
	 */
	_word_jp1('アドラトルテ|阿德拉托魯特?', '阿德拉托魯特'),

	[`亞斯伯爾${sp}理恩`, '亞斯伯爾・理恩'],
	[`拉威爾${sp}巴奈多`, '拉威爾・巴奈多'],

	[`貝爾納${sp}勒克司`, '貝爾納・勒克司'],
	[`博斯${sp}梅理魯`, '博斯・梅理魯'],

	_word_jp1('ラグス', '拉古蘇'),
	_word_jp1('バラッシュ', '巴拉修'),

	[`拉古蘇${sp}巴(拉|納)修?`, '拉古蘇・巴拉修'],

	[`(?:利魯托|リルト)${sp}(?:利亞姆|リーアム)`, '利魯托・利亞姆'],

	_word_jp1('マルーク', '馬魯克'),
	[`(?:馬魯克)${sp}(?:艾爾梅諾)`, '馬魯克・艾爾梅諾'],

	/**
	 *
	 */
	_word_jp1('羅薩利亞|ロザリア|羅薩莉婭亞?|羅薩莉婭亞', '羅薩利亞'),
	_word_jp1('ブルムデリク', '布魯姆迪利克'),

	[`(?:クレイヴ|克雷烏)${sp}(?:バルタ|巴爾塔)${sp}(?:ローディス|羅迪斯)`, '克雷烏・巴爾塔・羅迪斯'],

	_word_jp1('ヘクター', '赫克托'),
	_word_jp1('奧利維爾|奧莉薇爾|オリヴィエ|奧莉薇亞', '奧莉薇爾'),

	_word_jp1('ハーヴェル', '哈維爾'),

	[`(?:赫克托|奧莉薇爾)${sp}(?:哈維爾)`, '$1・哈維爾'],

	[`(?:亨利|アンリ)${sp}(?:歐梅魯|阿瑪爾|アメレール)`, '亨利・歐梅魯'],


	_word_jp1('アイオリオン|艾俄利昂', '艾俄利昂'),
	[`(?:艾俄利昂)${sp}(?:フレーゼ)`, '艾俄利昂・フレーゼ'],

	_word_jp1('オルサリウス|歐魯薩流斯|歐魯薩留斯|毆魯薩留斯', '歐魯薩流斯'),

	_word_jp1('バーネスト|巴拉梅托', '巴拉梅托'),
	_word_jp1('梅爾托|メルレイン', '梅爾托'),

	/**
	 *
	 */
	_word_jp1('ロンバルダ|倫巴達', '倫巴達'),
	_word_jp1('オルベール|奧爾彩鈴|奧爾貝爾', '奧爾貝爾'),

	_word_jp1('オデルト|奧德魯托', '奧德魯托'),
	_word_jp1('ライヒマン', 'ライヒマン'),

	/**
	 *
	 */
	_word_jp1('瓦爾特|ファルーテ', '瓦爾特'),

	_word_jp1('貝魯斯|ベルチ', '貝魯斯'),

	[`貝魯斯${sp}雷默里奧`, '貝魯斯・雷默里奧'],

	/**
	 *
	 */
	_word_jp1('シュメリア', '蘇梅利爾'),

	_word_jp1('貝爾薩利亞|ベルサリア|貝魯薩利亞', '貝爾薩利亞'),
	_word_jp1('ノートワール', '諾特瓦爾'),





	/**
	 *
	 */
	_word_jp1('カテリーナ|卡特蓮娜|卡特琳娜', '卡特琳娜'),
	_word_jp1('エリーゼ|愛麗絲|艾琳瑟|艾莉瑟|艾莉絲|艾利瑟', '艾琳瑟'),
	_word_jp1('アウストリア|奧斯利亞|奧斯托利婭', '奧斯托利婭'),

	[`(?:艾琳瑟)${sp}(?:奧斯托利婭)`, '艾琳瑟・奧斯托利婭'],

	_word_jp1('ダランテ|達蘭迪|達蘭提', '達蘭提'),

	_word_jp1('アテイル|亞特魯|阿提爾', '阿提爾'),
	_word_jp1('(?:アテイル|阿提爾)の聖杯', '阿提爾的聖杯'),






	['宣託の騎士団', '宣托騎士團'],
	_word_jp1('カインド・オブ・フォーラウンズ', 'カインド・オブ・フォーラウンズ'),


	_word_jp1('ヴェッテーヤ', '貝特利亞'),
	_word_jp1('ライデリン', '萊依澤琳'),

	[`(?:阿魯|アル|阿爾|艾爾)${sp}(?:卡拉(?:米斯)?|カラミス)`, '阿魯・卡拉米斯'],
	_word_jp1(`エルマリュート|愛瑪琉特|艾露瑪露托`, '艾露瑪露托'),

	_word_jp1(`リュミクス`, 'リュミクス'),
	_word_jp1(`歐黑烏斯|オルヘイウス`, '歐黑烏斯'),
	_word_jp1(`歐黑烏斯|オルヘイウス`, '歐黑烏斯'),

	_word_jp1(`ラウルシア`, '拉魯西亞'),

	[`(?:阿格茄子|アグナス)${sp}(?:麥克斯韋|マクスウェル)`, '阿格茄子・麥克斯韋'],

	_word_jp1(`コルネール`, '科爾尼赫魯'),

	/**
	 *
	 */
	_word_jp1('アンダーマン', '安達曼'),
	_word_jp1('艾安里巴', '艾安里巴”'),

	_word_jp1('鉄の蜥蜴', '鐵蜥蜴'),
	_word_jp1('背徳の蠍', '背徳之蠍'),

	_word_jp1('污穢的殉職者|不潔的殉職者|穢之殉教者', '污穢的殉職者'),

	[`アンダーズ${sp}ペイン`, '污穢的殉職者'],

	[`ギガス${sp}バルダ`, '巨人・巴魯達'],
	[`巨人${sp}巴魯達`, '巨人・巴魯達'],

	[`ベイル${sp}スナッチャー`, 'ベイル・スナッチャー'],

	// 纏宿煉獄者
	['煉獄を纏い宿す者', '纏宿煉獄者'],
	_word_jp1('薩哈林ベリア|クリルベリア|庫里魯貝利亞|薩哈林貝利亞', '庫里魯貝利亞'),

	_word_jp1('アラクネヴィア|阿拉喀涅維亞', '阿拉喀涅維亞'),

	[`(?:米哈伊爾|ヘイル)${sp}(?:席羅思|スロース)`, '米哈伊爾・席羅思'],

	[`(?:勞拉)${sp}(?:維努斯)`, '勞拉・維努斯'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	[/^[　 ]+/gm, ''],

	['協會|工會', '公會'],

	['皇家階位|王立階位', '王立階位'],

	...sublib.lazymarks['class'],
	//...sublib.lazymarks['zh_cht'],

	//...sublib.lazymarks['unit'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	...sublib.lazymarks[8],

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
