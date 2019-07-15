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

	['南雲', '南雲'],

	['雷米亞|蕾米亞|雷米婭|蕾米婭|蕾蜜雅|蕾米雅', '蕾蜜雅'],

	_word_jp1('ミュウ', '繆'),


	['龍太郎', '龍太郎'],

	/**
	 *
	 */
	_word_jp1('ユエ', '月'),
	_word_jp1('ディンリード|丁德里|丁里德|迪恩里德', '丁里德'),

	/**
	 *
	 */
	_word_jp1('奧爾克斯|奧爾庫司|オルクス|奧盧克斯', '奧爾庫司'),
	_word_jp1('哈魯森納|哈魯茲納|哈爾崔那|ハルツィナ|哈爾茲納', '哈爾崔那'),

	_word_jp1('斑多爾|班杜', '班杜'),
	_word_jp1('シュネー|須奈|修尼', '修尼'),
	['冰雪洞穴|冰雪洞窟', '冰雪洞窟'],

	_word_jp1('グリューエン|古魯恩|古盧恩|古琉恩', '古盧恩'),

	_word_jp1('梅魯吉內|梅爾基涅', '梅爾基涅'),

	_word_jp1('密雷迪|米蕾迪', '密雷迪'),

	_word_jp1('琉堤莉絲', '琉堤莉絲'),

	/**
	 *
	 */


	_word_jp1('里曼|黎曼|リーマン|利曼|雷曼', '里曼'),
	_word_jp1('リーさん', '里桑'),

	_word_jp1('イナバ', '因幡'),



	/**
	 *
	 */

	// 艾希特魯裘耶
	_word_jp1('エヒト|埃希德|艾希特', '埃希德'),

	_word_jp1('艾亞絲特?|艾亞斯特?', '艾亞絲'),
	_word_jp1('諾茵德|諾茵特|諾因', '諾因'),

	/**
	 *
	 */
	_word_jp1('布魯克|ブルック', '布魯克'),

	_word_jp1('ソーナ|索娜|蘇娜', '索娜'),
	_word_jp1('馬薩卡|マサカ', '馬薩卡'),

	[`索娜${sp}馬薩卡`, `索娜・馬薩卡`],

	_word_jp1('賈瑟琳|凱瑟琳', '凱薩琳'),

	/**
	 *
	 */
	_word_jp1('福倫|フューレン|斐倫|弗里恩|弗連|弗蓮', '弗連'),

	_word_jp1('伊魯瓦|伊爾瓦', '伊爾瓦'),
	[`伊爾瓦${sp}(?:強恩古|強谷|恰恩格)`, `伊爾瓦・強谷`],

	/**
	 *
	 */
	_word_jp1('エリセン|艾莉森|愛尼森|艾利瑟', '愛尼森'),
	['海上の町', '海上都市'],

	/**
	 *
	 */
	_word_jp1('タエ', 'タエ'),

	//_word_jp1('ナタリア|娜塔莉亞', '娜塔莉亞'),

	_word_jp1('シュラネルナッガー', '修拉尼爾那迦'),

	/**
	 *
	 */
	_word_jp1('提奧|提歐|緹鷗|緹奧|ティオ|緹歐|緹噢', '緹奧'),
	_word_jp1('阿圖爾|アドゥル', '阿圖爾'),

	_word_jp1('庫拉魯斯|克拉魯斯|クラルス', '庫拉魯斯'),

	[`${sp}庫拉魯斯`, `・庫拉魯斯`],

	[`緹奧${sp}克露絲`, `緹奧・庫拉魯斯`],

	_word_jp1('ヴェンリ', '芬莉'),

	/**
	 *
	 */
	_word_jp1('シア|希亞|希婭|希雅', '希雅'),

	_word_jp1('ハウリア|哈烏利亞|郝里亞|哈嗚利亞', '郝里亞'),
	_word_jp1('拉娜|ラナ', '拉娜'),
	_word_jp1('拉娜英菲莉娜|拉娜因費麗娜|拉娜茵菲莉娜|拉娜伊恩菲利亞', '拉娜英菲莉娜'),

	_word_jp1('卡姆邦提斯|卡姆巴恩提斯', '卡姆邦提斯'),
	_word_jp1('カム', '卡姆'),


	_word_jp1('ネアシュッタトルム|涅亞修妲多爾姆|涅雅修塔特爾姆|涅亞修達托姆', '涅雅修塔特爾姆'),
	_word_jp1('ネア|涅亞', '涅雅'),

	_word_jp1('帕魯|パル', '帕魯'),
	_word_jp1('巴魯多費魯多|バルドフェルド|巴魯多菲爾德|巴爾德菲爾特|巴爾特菲爾德', '巴魯多費魯多'),

	_word_jp1('米娜絲德莉亞|美娜斯特莉亞|米娜斯提利亞', '美娜斯特莉亞'),
	_word_jp1('米娜|美娜', '美娜'),

	/**
	 *
	 */
	_word_jp1('菲亞貝爾肯|費雅貝魯根|菲爾卑爾根|費亞貝魯肯', '費雅貝魯根'),

	_word_jp1('艾爾夫雷利克|阿爾弗雷利庫', '艾爾夫雷利克'),

	[`艾爾夫雷利克${sp}(?:哈伊比斯特|海彼斯特)`, `艾爾夫雷利克・海彼斯特`, 'ig'],

	_word_jp1('アルテナ|阿露緹娜|艾爾媞娜', '艾爾媞娜'),

	_word_jp1('ジン', '金'),

	[`烏亞${sp}(?:阿魯托|亞爾特)`, `烏亞・阿魯托`, 'ig'],


	/**
	 *
	 */
	_word_jp1('ヘルシャー|赫爾夏|哈魯西亞', '荷魯夏'),
	_word_jp1('トレイシー', '特蕾西'),

	[`${sp}[DＤ]${sp}荷魯夏`, `・Ｄ・荷魯夏`, 'ig'],

	_word_jp1('伽哈爾德', '加哈路德'),

	/**
	 *
	 */
	_word_jp1('哈爾利希|海利希|ハイリヒ|哈利|哈里希', '海利希'),

	_word_jp1('莉莉亞娜|莉莉安娜|リリアーナ', '莉莉安娜'),
	_word_jp1('莉莉|リリィ', '莉莉'),

	[`${sp}[SＳ]${sp}[BＢ]${sp}海利希`, `・Ｓ・Ｂ・海利希`, 'ig'],
	[`${sp}[SＳ]${sp}[BＢ]海利希`, `・Ｓ・Ｂ・海利希`, 'ig'],

	_word_jp1('ルルアリア|露露亞莉雅|露露雅莉亞', '露露亞莉雅'),

	_word_jp1('埃利西鐸|艾利希德|艾力西德', '艾力西德'),

	[`海利希${sp}(?:志工協會|志工團體)`, `海利希・志工協會`],

	_word_jp1('クゼリー・レイル', '庫潔莉・雷爾'),
	_word_jp1('クゼリー|克榭莉|庫潔莉|課謝麗', '庫潔莉'),

	[`(?:瑟莉|庫潔莉|克榭莉)${sp}(?:雷爾|萊爾)`, `庫潔莉・雷爾`, 'ig'],

	_word_jp1('藍提爾|藍迪爾|ランデル', '蘭迪爾'),

	_word_jp1('荷莉娜|ヘリーナ', '荷莉娜'),

	_word_jp1('フィリム・ザーラー|菲莉姆・澤拉', '菲莉姆・札勒'),
	_word_jp1('デビッド・ザーラー|大衛・澤拉', '大衛・札勒'),

	_word_jp1('桑德拉|サンドラ|桑德菈', '桑德菈'),
	_word_jp1('溫特切斯特|威奇斯塔|ウィンチェスター', '溫特切斯特'),

	_word_jp1('サジェス|桑吉斯', '桑吉斯'),

	_word_jp1('梅爾特|梅爾德', '梅爾德'),
	_word_jp1('洛金斯', '洛金斯'),

	/**
	 *
	 */
	_word_jp1('モットー|莫托', '莫多'),
	_word_jp1('ユンケル|云柯|尤格爾|庸凱爾|容克', '庸凱爾'),
	_word_jp1('薩米亞|サミーア', '薩米亞'),


	_word_jp1('克莉絲塔貝爾|克里斯塔貝爾|クリスタベル', '克莉絲塔貝爾'),

	/**
	 *
	 */
	_word_jp1('アビスゲート卿?|阿庇斯凱特卿?|深淵卿卿?|深淵先生|深淵之門卿|阿比斯肯|深淵之門先生', '深淵卿'),

	_word_en3('AbyssGate卿', '深淵卿'),

	_word_en3('AbyssGate', 'AbyssGate'),

	_word_jp1('艾米莉|艾蜜莉|エミリー|愛米莉|艾米麗', '艾蜜莉'),
	_word_jp1('グラント|格蘭特|古蘭特|(?<!杜.)葛蘭特', '格蘭特'),
	_word_jp1('エミリン', '艾蜜琳'),

	_word_jp1('卡魯|カール', '卡魯'),

	_word_jp1('凡妮莎|ヴァネッサ|帆妮莎|瓦妮莎', '凡妮莎'),
	_word_jp1('帕拉蒂|パラディ|巴拉蒂|帕拉迪絲?', '帕拉蒂'),

	_word_jp1('金伯利|キンバリー', '金伯利'),

	_word_jp1('巴薩克|ベルセルク|貝魯賽魯庫', '巴薩克'),
	['(巴薩克|狂戰士)化', '狂戰士化'],

	_word_jp1('赫德里克|ヘドリック', '赫德里克'),
	_word_jp1('維斯庫|ウェスク', '維斯庫'),

	_word_jp1('里夏|リシー', '里夏'),
	_word_jp1('阿什頓|アシュトン', '阿什頓'),

	_word_jp1('羅德|ロド', '羅德'),
	_word_jp1('赫斯特|ハースト', '赫斯特'),

	_word_jp1('雷金納德|レジナルド|雷納德|雷德納爾德', '雷金納德'),
	_word_jp1('ダウン', '當'),

	_word_jp1('丹尼斯|デニス', '丹尼斯'),
	_word_jp1('李頓|リットン', '李頓'),

	['阿茲海默|阿爾茨海默', '阿茲海默'],

	_word_jp1('謝茜嘉|ジェシカ|傑西卡', '謝茜嘉'),
	_word_jp1('丘比特|キュービットと', '丘比特'),

	_word_jp1('薩姆|サム', '薩姆'),
	_word_jp1('里特曼|レッドマン', '里特曼'),

	_word_jp1('馬洛|マイロ', '馬洛'),
	_word_jp1('伊妮|イェニー', '伊妮'),

	_word_jp1('戴維|デイヴィ', '戴維'),
	_word_jp1('休斯|ヒューズ', '休斯'),

	_word_jp1('阿梅特|アーメッド', '阿梅特'),

	_word_jp1('夏洛|シャロン|夏隆', '夏洛'),
	_word_jp1('瑪古達勒斯|マグダネス|馬格達妮斯|馬達格斯|瑪古達尼斯|瑪格達涅斯|瑪格塔妮絲', '瑪古達勒斯'),

	_word_jp1('派克|パーカー', '派克'),
	_word_jp1('艾倫|アレン', '艾倫'),

	_word_jp1('克萊頓|クライトン', '克萊頓'),
	_word_jp1('穆勒|ミュラー', '穆勒'),

	_word_jp1('狄克松|ディクソン', '狄克松'),
	_word_jp1('拉塞|ラッセル', '拉塞'),

	_word_jp1('蓋斯|ケイシス', '蓋斯'),
	_word_jp1('溫特沃克斯|ウェントワークス', '溫特沃克斯'),

	_word_jp1('伍迪|ウディ|烏迪', '伍迪'),

	_word_jp1('柯爾格雷|歐格雷', '柯爾格雷'),

	/**
	 *
	 */
	_word_jp1('クラウディア|克勞蒂亞', '克勞蒂亞'),
	_word_jp1('クレア|克蕾亞', '克蕾亞'),
	_word_jp1('バレンバーグ|巴倫貝格|巴倫伯格', '巴倫伯格'),

	_word_jp1('歐姆尼布斯|奧姆尼布斯', '歐姆尼布斯'),

	[`聖${sp}(?:伯多祿|彼得)`, `聖・伯多祿`],
	[`聖${sp}(?:保羅)`, `聖・伯多祿`],

	/**
	 *
	 */
	_word_jp1('希格斯|ヒッグズ', '希格斯'),

	_word_jp1('葛瑞格|グレゴール', '葛瑞格'),
	_word_jp1('克魯瑟|クリュゼ', '克魯瑟'),
	_word_jp1('克瓦伊連|クヴァイレン|科瓦伊連', '克瓦伊連'),

	_word_jp1('サイアス|賽勒斯', '賽勒斯'),

	_word_jp1('奧斯汀納特|奧斯提納德', '奧斯提納德'),


	_word_jp1('克懷貝爾|クワイベル|克懷被耳', '克懷貝爾'),
	_word_jp1('ヘルムート|赫爾姆特|赫爾穆特', '赫爾姆特'),

	_word_jp1('羅瑟|ローゼ', '羅瑟'),
	_word_jp1('ファイリス|費爾斯', '費爾斯'),
	_word_jp1('亞溫斯特|アーヴェンスト|亞文斯特', '亞文斯特'),

	[`羅瑟${sp}(?:費爾斯|費里斯)${sp}亞文斯特`, `羅瑟・費爾斯・亞文斯特`, 'ig'],

	_word_jp1('ロゼリア|羅瑟利亞|羅瑟莉亞', '羅瑟莉亞'),

	['葛羅莎４|雜貨店４', '雜貨店４'],

	['空中戰機', '空戰機'],
	['空中船艦', '空母艦'],
	['空中航母', '空母艦'],

	_word_jp1('ドゥルグラント|杜魯格蘭特|杜爾葛蘭特', '杜魯格蘭特'),

	/**
	 *
	 */
	_word_jp1('維斯提莉亞|維斯德利亞|維斯德莉亞|ウィステリア', '維斯德莉亞'),

	/**
	 *
	 */
	_word_jp1('シンクレア|辛克雷亞', '辛克雷亞'),
	_word_jp1('モアナ|莫亞娜', '莫亞娜'),

	[`${sp}(?:迪|ディ)${sp}(?:席爾特|シェルト)${sp}辛克雷亞`, `・迪・席爾特・辛克雷亞`],

	_word_jp1('フォルティーナ|弗爾提娜', '弗爾提娜'),

	_word_jp1('阿妮爾|アニール', '阿妮爾'),
	_word_jp1('史賓瑟|スペンサー', '史賓瑟'),
	_word_jp1('涅森', '涅森'),
	_word_jp1('莉琳|リーリン|莉林', '莉琳'),
	_word_jp1('リンデン', '林登'),
	_word_jp1('ストール', '史托爾'),

	_word_jp1('ニエブラ', '涅布拉'),

	_word_jp1('アロース', '阿洛斯'),

	_word_jp1('ハウム', '哈烏姆'),

	_word_jp1('ラガル', '拉迦爾'),

	_word_jp1('クーネ', '庫涅'),
	_word_jp1('クーネたん', '庫涅炭'),


	_word_jp1('ドーナル＝ソルド', '多納爾＝索爾特'),
	_word_jp1('ドーナル', '多納爾'),
	[`多納爾${sp}索爾特`, `多納爾＝索爾特`],

	_word_jp1('オータル', '奧塔爾'),

	_word_jp1('ブルイット', '布魯特'),
	_word_jp1('キューブ', '裘布'),
	[`布魯特${sp}裘布`, `布魯特＝裘布`],


	_word_jp1('アークエット|艾奎特|亞克耶德', '亞克耶德'),
	_word_jp1('ロスコー|洛斯科|洛斯柯', '洛斯柯'),
	_word_jp1('シーラ', '西菈'),
	_word_jp1('ロンド', '隆德'),


	_word_jp1('スパイク', '史巴克'),
	[`史巴克${sp}海姆`, `史巴克＝海姆`],
	_word_jp1('スパイク＝ハイム', '史巴克＝海姆'),

	_word_jp1('イヴァナ', '伊瓦娜'),
	_word_jp1('ボルジャー', '柏格爾'),

	/**
	 *
	 */



	/**
	 *
	 */





	_word_en3('Tortoise', '托達斯'),
	['多塔斯|托塔斯|拓達斯', '托達斯'],

	['錬成', '錬成'],
	['原子力发電站|原子力発電所', '核電場'],
	['原子發電龍', '核電龍'],

	_word_jp1('貝黑摩斯', '貝西摩斯'),

	/**
	 *
	 */

	/**
	 *
	 */

	['導越(的|之)羅針?盤', '導越之羅針盤'],
	['(羅針盤|羅盤針?|指南針)+', '羅針盤'],
	['水晶鑰匙?|水晶鍵|水晶之鑰匙?', '水晶鑰匙'],



	_word_jp1('多納|ドンナー|咚納', '多納'),
	_word_jp1('修拉庫|シュラーク', '修拉庫'),
	[`(?:多納|咚娜)${sp}修拉庫`, `多納・修拉庫`],
	[`(?:多納|咚娜)修拉庫`, `多納・修拉庫`],
	[`(?:多納|咚娜)＆修拉庫`, `多納＆修拉庫`],

	[`電磁加速式對物狙擊炮|電磁加速式對物狙撃砲|電磁加速式對物來福槍|電磁加速式大口徑狙撃炮|電磁加速式對物步槍|電磁加速式アンチマテリアルライフル`, `電磁加速式對物狙擊砲`],
	_word_jp1('修格爾金|修拉根|シュラーゲン|修拉簡', '修拉簡'),
	[`修拉簡${sp}(?:Ａ|A|阿哈特)${sp}(?:Ａ|A|阿哈特)`, `修拉簡・Ａ・Ａ`, 'ig'],
	[`修拉簡${sp}(?:Ａ|A|阿哈特)(?:Ａ|A|阿哈特)`, `修拉簡・Ａ・Ａ`, 'ig'],
	[`修拉簡(?:Ａ|A|阿哈特)(?:Ａ|A|阿哈特)`, `修拉簡・Ａ・Ａ`, 'ig'],

	_word_jp1('梅杰萊|メツェライ', '梅杰萊'),

	_word_jp1('艾格斯・布雷德|エグズィス・ブレット', '艾格斯・布雷德'),
	[`艾格斯${sp}布雷德`, `艾格斯・布雷德`],

	_word_jp1('艾迪翁|アイディオン|艾提翁', '艾迪翁'),
	_word_en3('ideaon', '艾迪翁'),

	_word_jp1('史克瓦姆・捷爾|スクワーム・シェル', '史克瓦姆・捷爾'),
	[`史克瓦姆${sp}捷爾`, `史克瓦姆・捷爾`],

	_word_jp1('オレステス|奧雷斯迪斯|歐雷斯迪斯|奧利斯提斯|俄瑞斯忒斯|阿魯斯特斯', '俄瑞斯忒斯'),

	[`黒隷鞭`, `黒隷鞭`],

	_word_jp1('パイルバンカー|破壊杭', 'Pile Bunker'),

	[`廻禍の?魔剣`, `廻禍魔劍`],
	_word_jp1('アニマ・エルンテ|亞尼瑪・恩德|厄里瑪・埃倫提', '厄里瑪・埃倫提'),
	[`(?:亞尼瑪|厄里瑪)${sp}(?:埃倫提|恩德)`, `厄里瑪・埃倫提`],

	[`福音の聖剣`, `福音聖劍`],
	_word_jp1('ベル・レクシオン|貝爾・雷克西恩|佰爾・萊克希昂', '貝爾・萊克希昂'),
	[`(?:貝爾|佰爾)${sp}(?:雷克西恩|萊克希昂)`, `貝爾・萊克希昂`],


	_word_jp1('佛爾尼爾|菲爾尼爾', '佛爾尼爾'),

	// 鐳射
	_word_jp1('レーザー', '雷射'),

	[`太陽光集束聚焦型激光發射器|太陽光(?:集束|聚焦)(?:雷射|鐳射)|太陽光束雷射炮|太陽光收束雷射兵器|太陽光聚焦激光炮|太陽光收束雷射|太陽光聚焦型雷射`, `太陽光集束雷射`],

	_word_jp1('バルス・ヒュベリオン', '巴魯斯・琉貝里翁'),
	_word_jp1('バルス', '巴魯斯'),
	_word_jp1('ヒュベリオン|裘貝里翁|琉貝里翁|修貝利昂|裘貝麗翁|修佩理翁|休貝裡恩|裘貝利翁|許珀里翁', '琉貝里翁'),

	[`(?:巴魯斯|巴爾斯)${sp}(?:裘貝里翁|琉貝里翁|修貝利昂|裘貝麗翁|修佩理翁)`, `巴魯斯・琉貝里翁`],
	[`(?:巴魯斯|巴爾斯)(?:裘貝里翁|琉貝里翁|修貝利昂|裘貝麗翁|修佩理翁)`, `巴魯斯・琉貝里翁`],

	_word_jp1('アグニ・オルカン|阿格尼・奧爾岡', '阿格尼・奧爾岡'),
	[`阿格尼${sp}(?:奧爾岡|歐爾鋼|歐魯鋼|奧爾剛)`, `阿格尼・奧爾岡`],

	_word_jp1('ベル・アガルタ', '貝爾・亞加魯達'),
	[`貝爾${sp}(?:亞格塔|亞加魯達|亞加魯德|雅戈泰)`, `貝爾・亞加魯達`],

	_word_jp1('オルニス', '奧爾尼斯'),

	_word_jp1('グラスプ・グローリア', '格拉斯普・葛洛利亞'),
	[`格拉斯普${sp}葛洛利亞`, `格拉斯普・葛洛利亞`],

	_word_jp1('トリアイナ|托利安那|多利安納|托利安納', '托利安納'),
	[`潜水艇`, `潛水艇`],
	[`水空両用型小型潜水艇`, `水空兩用型小型潛水艇`],

	//_word_jp1('ゴム弾', '達姆彈'),
	//_word_jp1('スタン弾', '橡膠彈'),

	_word_jp1('シュタイフ|史黛伏|修泰夫|休鈦弗|休鈇弗', '休鈦弗'),
	[`魔力駆動二輪車?`, `魔力驅動二輪車`],

	_word_jp1('ブリーゼ|布利捷', '布利捷'),

	// 轉輪式空氣散彈槍『阿爾伍斯』。
	_word_jp1('阿爾伍斯', '阿爾伍斯'),

	/**
	 * 克洛斯・威爾德
	 * 十字・領域
	 */
	_word_jp1('鉛筆型|ペンシル', '鉛筆型'),

	_word_jp1('(?<!賽)克洛斯|クロス', '克洛斯'),
	_word_jp1('威爾德|ヴェルト|維爾特|維爾德', '威爾德'),

	[`(?<!賽)克洛斯${sp}(?:威爾德|維魯多)`, `克洛斯・威爾德`],
	[`(?<!賽)克洛斯威爾德`, `克洛斯・威爾德`],

	[`十字${sp}領域`, `十字・領域`],
	[`十字${sp}(?:威爾德|維魯多)`, `十字・威爾德`],

	[`鉛筆型${sp}(?:十字|克洛斯)`, `鉛筆型・$2`],

	[`抱歉兔子`, `殘念兔子`],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	// 喏

	['(因幡|里曼)先生', '$1桑'],

	['沙漠|砂漠', '砂漠'],

	_word_jp1('さん', '桑'),

	_word_en3('ｂ', 'Ｂ'),

	_word_en3('s|b|d', s => StrUtil.toFullWidth(s.toUpperCase())),

	_word_en3('Pile ?bunker', 'Pile Bunker'),

	[`(?:志工協會|志工團體)`, `志工協會`],
	[`竜人`, `竜人`],

	[`魔王先生`, `魔王桑`],
	[`阿剌克涅`, `阿剌克涅`],
	[`鍊成`, `鍊成`],

	[`噴射${sp}子彈`, `噴射・子彈`],

	[/^　+/gm, ''],

	[/(?<=\S)\n?\n(?=──.{1,2}月.{1,2}日)/gm, '\n\n\n'],
	[/(?<=──.{1,2}月.{1,2}日[^\n]*)\n(?=\S)/gm, '\n\n'],

	//['〝', '『'],
	//['〟', '』'],

	[/〝([^\n〟〝]+?)〟/g, '『$1』'],

	...lazymarks['ln_0010'],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	...lazymarks['unit'],

	...lazymarks['4'],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

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

export default exports as typeof import('./demo');
