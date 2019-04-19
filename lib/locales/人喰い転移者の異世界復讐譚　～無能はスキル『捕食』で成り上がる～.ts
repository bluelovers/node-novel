/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en3, _word_jp1 } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '人喰い転移者の異世界復讐譚　～無能はスキル『捕食』で成り上がる～';

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

	//['anima(?=\\b|[^\\w\\u00C0-\\u017F])', '阿尼瑪', 'ig'],
	//['(Animus|Animes)(?=\\b|[^\\w\\u00C0-\\u017F])', '阿尼瑪斯', 'ig'],

	_word_jp1('白诘|シロツメ', '白詰'),
	['诘', '詰'],
	_word_jp1('岬|美崎|ミサキ', '岬'),

	/**
	 *
	 */
	_word_jp1('拉比|ラビー', '拉比'),
	_word_jp1('米澤爾|ミジャーラ', '米澤爾'),

	/**
	 *
	 */
	['築城|城筑', '築城'],

	_word_jp1('アカバネ|百合', '百合'),
	_word_jp1('赤羽|ユリ', '赤羽'),

	/**
	 *
	 */
	_word_jp1('アニマ', '阿尼瑪'),
	_word_en3('anima', '阿尼瑪'),

	_word_jp1('アニムス', '阿尼瑪斯'),
	_word_en3('Animus|Animes', '阿尼瑪斯'),

	['希瓦吉|西卜西斯|シヴァージーッ|西瓦基', '希瓦吉'],
	['自由主義|霜巨人|弗里弗姆斯|フリームスルス', '霜巨人'],
	['ヴァニタス|巴尼特斯', '巴尼特斯'],

	['火炎放射槍|火焰放射槍', '火焰放射槍'],

	['親愛なる友|亲愛的朋友|亲密的朋友', '親愛的朋友'],
	['スウィンドラー|溫德勒|Swindler', 'Swindler'],

	['卑劣なる俯瞰者|卑劣的俯瞰者|卑鄙的俯瞰者', '卑劣的俯瞰者'],
	['ライフトーチャー|Life ?Torture', 'Life Torture'],

	['正義の味方|正義的伙伴', '正義的伙伴'],
	['ブレイバー|布萊爾|Braver', 'Braver'],


	['太阳能槍|魔法槍', '魔法槍'],

	['苏萨利槍|魔法槍|ソーサリーガン', '魔法槍'],
	['苏萨利佩带|魔法軍刀|魔法佩帶|ハイソーサリーサーベル', '魔法軍刀'],

	_word_jp1('阿格尼|阿耆尼|アグニ', '阿耆尼'),


	['王之城墙|王の城壁', '王の城壁'],

	['ガーンデーヴァ|甘狄拔|崗德尔', '甘狄拔'],

	['金刚杵|瓦酋拉|瓦朱拉|ヴァジュラ', '金剛杵'],

	['阿勒内亞|阿勒亞亞', '阿勒内亞'],

	['霧に消える悪意|(消失在)?雾中的惡意|消失于雾的惡意', '消失在雾中的惡意'],
	['ソーサリーチャフ|蘇薩利拉夫|Sorcery ?Chaff', 'Sorcery Chaff'],

	['魔弾の射手|魔彈的?射手', '魔彈的射手'],
	['伊利卡斯|イリーガルスナイパー', '伊利卡斯'],

	['馬力提亞|馬里蒂阿|瑪里提亞', '瑪里提亞'],
	['雷斯雷庫提欧|雷斯雷克迪欧', '雷斯雷庫提歐'],
	['伊利加拉斯|伊利卡斯', '伊利卡斯'],

	['ピールピアサー|皮爾皮薩', '皮爾皮薩'],

	['羨望せよ我が領域|羨慕吧，我的領域(?:能力)?', '羨慕吧，我的領域'],

	['殲滅形態(模式)?', '殲滅形態'],
	['狙撃形態(模式)?', '狙撃形態'],

	// ----------

	['乌尔条克|乌尔提欧|乌璐緹欧|ウルティオ', '烏璐緹歐'],



	// --------------

	['伊莉提姆|丽丽特姆|伊丽特姆|伊丽提姆|伊丽特保姆|イリテュム|伊利提姆', '伊莉提姆'],

	_word_jp1('ミセリコルデ|米塞利科爾德', '米塞利科爾德'),
	_word_jp1('ダガーミサイル|達格導彈', '達格導彈'),
	_word_jp1('スカートブレード|裙子刀片', '裙子刀片'),
	_word_jp1('ヴァニタス|巴尼特斯', '巴尼特斯'),
	['独り歩きする嘘|獨走的謊言', '獨走的謊言'],
	['虚像丢弃|虚像破棄', '虚像破棄'],

	// ----------

	_word_jp1('泰尼妮塔斯|テネリタス', '泰尼妮塔斯'),
	_word_jp1('忒圖庫魯斯・萊伊|テンタクルス・レイ', '忒圖庫魯斯・萊伊'),

	_word_jp1('スキュラー|斯凱拉', '斯凱拉'),
	_word_jp1('聖女的微笑|聖女の微笑', '聖女的微笑'),

	// ----------
	_word_jp1('桂', '桂'),
	_word_jp1('イロス', '赫洛斯'),

	_word_jp1('ガラティーン', '卡文汀'),
	_word_en3('Gareltion', '卡文汀'),

	_word_jp1('エクスカリバ', 'Excalibur'),
	_word_en3('Excalibur', 'Excalibur'),

	_word_jp1('クラウソラス', '克勞烏索拉斯'),

	// 三洗
	_word_jp1('薩普提尼塔斯|サブティリタス', '薩普提尼塔斯'),

	/**
	 * @todo 雷古納托利科斯王国
	 */
	['雷古納托利科斯|レグナトリクス|雷格納特克|雷古納多裡古斯|雷格納特里斯', '雷古納托利科斯'],

	_word_jp1('レクス|雷克斯', '雷克斯'),

	['エノープス|埃諾普斯|埃洛普斯', '埃諾普斯'],

	_word_jp1('カプト|卡普拉|卡普托', '卡普托'),

	/**
	 * @todo 騎士團
	 */
	_word_jp1('普拉納斯|普拉娜斯|白白納斯|拉普納斯|普納拉斯|プラナス|普拉娜絲', '普拉娜絲'),
	_word_jp1('艾薇|艾維|アイヴィ', '艾薇'),

	_word_jp1('レイナ|雷娜|雷納', '雷娜'),

	/**
	 * @todo 格拉提亞教
	 */
	_word_jp1('格拉提亞|グラティア|古拉緹雅|Gartier', '古拉緹雅', 'ig'),

	_word_jp1('希德|ギリド', '希德'),
	_word_jp1('米斯路德|ミストルート', '米斯路德'),

	/**
	 * @todo 地名
	 */
	_word_jp1('迪拜|宾登|ディンデ', '賓登'),
	_word_jp1('泰姆|テーム', '泰姆'),

	_word_jp1('托蘭西|トランシー', '托蘭西'),
	_word_jp1('阿爾威斯|アルウェウス', '阿爾威斯'),

	_word_jp1('シノロ|希諾罗', '希諾羅'),

	_word_jp1('希爾瓦|シルヴァ', '希爾瓦'),

	/**
	 * @todo 泰姆
	 */
	_word_jp1('泰姆|テーム', '泰姆'),

	['弗莉莎|芙萊夏菈|佛利莎', '芙萊夏菈'],
	['加姆|加尔姆', '加爾姆'],

	/**
	 * @todo 印古拉圖斯
	 */
	['印地照|印古拉斯|イングラトゥス|印古拉图斯', '印古拉圖斯'],

	['フラウクロック|弗拉克洛斯|克?弗兰克|弗萊克', '弗拉克洛斯'],
	_word_jp1('エルレア|艾尔萊亞|艾露雷亞|艾露維亞|艾米希尔|愛爾萊亞|愛蜜稀土', '艾爾萊亞'),



	['威尔|韦尔|維尔', '威爾'],

	/**
	 * @todo 蒙斯
	 */
	_word_jp1('蒙斯|モンス', '蒙斯'),

	_word_jp1('ソレイユ|索留香|索蕾優|索麗友', '索蕾優'),
	_word_jp1('ヘリアンサス|赫里昂斯|赫里安薩', '赫里安薩'),

	_word_jp1('ウェールス|威爾斯|雷姆斯', '威爾斯'),

	_word_jp1('タヴェルナ|塔威爾納|塔維納', '塔威爾納'),

	['工人|勞動者|労働者', '勞動者'],

	_word_jp1('(労働者|勞動者|工人)公會', '勞動者公會'),

	_word_jp1('福特金?|フォードキン', '福特金'),
	_word_jp1('鑰匙薩斯|キーサリス', '鑰匙薩斯'),

	_word_jp1('拉格薩|ラクサ|拉薩', '拉格薩'),
	_word_jp1('スィダレー', 'スィダレー'),

	_word_jp1('米莉亞|米裡亞|ミーリア', '米莉亞'),
	_word_jp1('薩爾塔|サルタ', '薩爾塔'),

	_word_jp1('普魯姆|プドル', '普魯姆'),

	/**
	 * @todo 奧利涅斯
	 */
	_word_jp1('奧里萊斯|オリネス|奧利涅斯|奧利尼斯', '奧利涅斯'),

	/**
	 * @todo 茵赫利亞
	 */
	_word_jp1('因哈里亞|インヘリア|茵赫利亞|インへリア|茵赫利亞|恩海利亞', '茵赫利亞'),

	['四將', '四將'],

	_word_jp1('基希尼亞|キシニア|凱希尼亞', '基希尼亞'),
	_word_jp1('クロギリソゥ|克萊希里索', '克萊希里索'),

	_word_jp1('キニシア', '基希尼亞'),

	_word_jp1('フランサス|弗蘭薩斯', '弗蘭薩斯'),
	_word_jp1('スペクタヴィリス|塔維利斯|斯克塔維斯', '斯克塔維斯'),

	_word_jp1('フラン|弗蘭|法蘭', '弗蘭'),

	_word_jp1('克里普托|クリプト|克魯普', '克里普托'),
	_word_jp1('扎福尼卡|ザフォニカ', '扎福尼卡'),

	['阿芙蕾提亞|アヴァリティア', '阿芙蕾提亞'],

	_word_jp1('リアトリス|里亞特斯', '里亞特斯'),
	_word_jp1('インペラートル|印佩蘭特', '印佩蘭特'),

	/**
	 *
	 */

	_word_jp1('バシャンテ|巴香堤', '巴香堤'),

	/**
	 *
	 */
	_word_jp1('ゾウブ', '佐夫'),

	/**
	 *
	 */
	['オリハルコン|奧利哈康|奧利哈魯鋼|奧里哈魯鋼', '奧里哈魯鋼'],

	['Plumbum|プルムブム|拉姆布|布魯姆', 'Plumbum', 'ig'],
	['Argentum|アルジェント', 'Argentum', 'ig'],
	['Aurum', 'Aurum', 'ig'],
	['Cuprum', 'Cuprum', 'ig'],

	_word_jp1('ギルド|吉爾德|公會|工會', '公會'),

	_word_jp1('ミスリル|米斯里魯', '秘銀'),


];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['手臂部|腕部', '腕部'],
	['断一头', '斷頭'],

	[
		/([^\w\u00C0-\u017F\.])([\w])(?![\w\u00C0-\u017F\.])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	},
	],

	['^　技能[ 　]+(?![ 　]|$)', '　技能　　', 'gm'],
	[/(　+) (?=\S)/g, '$1　'],

	[/^(　{2,}[^\n]+)\n\n(　{2,}|　[^　\n]+　{2,})/gm, '$1\n$2'],
	[/^(　[^\n　]+　{2,}[^\n]*)\n\n(　{2,}|　[^　\n]+　{2,})/gm, '$1\n$2'],

	[/^[　 ]+([\-◆◇]+)[　 ]*$/gm, '$1'],

	['𪚥', ''],

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

	...sublib.lazymarks['full_width_001'],
	...sublib.lazymarks['full_width_002'],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

]);

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
