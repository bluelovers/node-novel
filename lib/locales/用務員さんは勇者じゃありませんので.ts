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

	['支部蔵人', '支部蔵人'],
	['蔵人', '蔵人'],

	/**
	 *
	 */
	_word_jp1('アカリ|亞嘉莉|阿卡麗', '阿卡麗'),
	_word_jp1('藤城明里', '藤城明里'),

	_word_jp1('藤城|藤代', '藤城'),
	_word_jp1('フジシロ|弗基希洛', '藤城'),



	// アオイ・ゴウト
	_word_jp1('豪徳寺|高島', '豪徳寺'),
	_word_jp1('葵', '葵'),

	/**
	 *
	 */
	_word_jp1('一原颯人', '一原颯人'),

	_word_jp1('颯人|ハヤト', '颯人'),
	_word_jp1('一原|イチハラ', '一原'),

	// 霧谷繪理香
	_word_jp1('艾莉卡|エリカ', '艾莉卡'),
	_word_jp1('琪坦|キリタニ', '琪坦'),

	_word_jp1('愛麗絲|アリス', '愛麗絲'),
	_word_jp1('金斯頓|キングストン', '金斯頓'),

	_word_jp1('孤|クー', '孤'),
	_word_jp1('煌|フォン', '煌'),
	_word_jp1('楓|カエデ', '楓'),

	/**
	 *
	 */

	_word_jp1('エルロドリアナ|艾魯洛德里亞納', '艾魯洛德里亞納'),
	_word_jp1('マクシーム|馬克西姆', '馬克西姆'),
	_word_jp1('ダール|達爾', '達爾'),

	_word_jp1('薩烏魯|サウル', '薩烏魯'),
	_word_jp1('多米托魯|ドミトール', '多米托魯'),
	_word_jp1('布拉格|ブラゴイ', '布拉格'),

	_word_jp1('アレクセイ|阿列克謝', '阿列克謝'),
	_word_jp1('イヴァール|伊瓦路', '伊瓦路'),

	_word_jp1('羅拉納|ローラナ', '羅拉納'),
	_word_jp1('ドルガン|多魯加爾', '多魯加爾'),
	_word_jp1('布魯沃魯達|ブルオルダ', '布魯沃魯達'),
	_word_jp1('伊恩古特|イングート', '伊恩古特'),
	_word_jp1('亞多|アド', '亞多'),
	_word_jp1('阿拉尼亞|アラニア', '阿拉尼亞'),

	_word_jp1('耶哥夫|ヤコフ|雅哥夫|雅科夫', '耶哥夫'),
	_word_jp1('塞爾格里|セルゲリー|西路格裡', '塞爾格里'),
	_word_jp1('麥塞爾|マイゼール|瑪西魯', '麥塞爾'),

	_word_jp1('イヴァン|伊凡', '伊凡'),
	_word_jp1('ミナエフ|米拉夫', '米拉夫'),

	_word_jp1('伊菈迪|イライダ', '伊菈迪'),
	_word_jp1('伯金|バーギン', '伯金'),

	_word_jp1('ポタペンコ|波塔片科', '波塔片科'),

	_word_jp1('古羅沙|グロッソ', '古羅沙'),
	_word_jp1('舒諾夫|スレイノフ', '舒諾夫'),




	/**
	 *
	 */
	_word_jp1('月之女神的隨從|月の女神の付き人', '月之女神的隨從'),

	_word_jp1('奧菲亞|オーフィア', '奧菲亞'),
	_word_jp1('米婭|マーニャ', '米婭'),

	_word_jp1('提亞絲廸亞|ディアンティア', '提亞絲廸亞'),
	_word_jp1('愛麗|アリー', '愛麗'),

	_word_jp1('ルブナ|露布娜', '露布娜'),
	_word_jp1('アガタ|亞嘉達', '亞嘉達'),
	_word_jp1('古塔露|グアダル', '古塔露'),


	_word_jp1('アン|安', '安'),
	_word_jp1('美廸|メッティ', '美廸'),
	_word_jp1('伊絲|イース', '伊絲'),
	_word_jp1('露莎|ルゥシエ', '露莎'),
	_word_jp1('奧嘉|オルガ', '奧嘉'),

	/**
	 *
	 */
	_word_jp1('伯里斯|ボリス', '伯里斯'),
	_word_jp1('依哥魯|エゴール', '依哥魯'),
	_word_jp1('格林卡|グリンカ', '格林卡'),


	/**
	 *
	 */



	_word_jp1('白幻|白色幻影', '白色幻影'),
	_word_jp1('イルニーク|伊魯尼克|伊露尼克', '伊魯尼克'),

	_word_jp1('アレルドゥリア|亞雷路多利亞|艾魯洛德里亞納', '亞雷路多利亞'),

	_word_jp1('厄利普斯|エリプス|艾利普斯', '艾利普斯'),
	_word_jp1('桑德拉|サンドラ', '桑德拉'),

	_word_jp1('索敵雷達地圖|偵察雷達地圖|索敵レーダーマップ', '索敵雷達地圖'),

	_word_jp1('普羅煥|プロヴン', '普羅煥'),

	_word_jp1('亞羅巴姆|阿巴姆|アルバウム', '亞羅巴姆'),

	_word_jp1('阿羅米利|アロメリ', '阿羅米利'),

	_word_jp1('博克虎|トラボック|杜拉球', '杜拉球'),

	_word_jp1('諾頓|ロド', '諾頓'),
	_word_jp1('西魯瑪|シルマ', '西魯瑪'),

	_word_jp1('西魯波戸|サレハド|薩利赫德', '薩利赫德'),

	_word_jp1('斯利巴里昂|スニバリオール', '斯利巴里昂'),

	_word_jp1('狗牌|ドッグタグ', '狗牌'),

	_word_jp1('約翰|ジョン', '約翰'),
	_word_jp1('海格力斯|ヘラクレス', '海格力斯'),

	_word_jp1('亞特拉巴席庫|アトラバシク', '亞特拉巴席庫'),

	_word_jp1('杜拉摩納|トラモラ', '杜拉摩納'),

	_word_jp1('坦斯古|タンスク', '坦斯古'),

	_word_jp1('庫存委託|積存委託|庫存任務', '積存委託'),

	_word_jp1('普亞吉拉|ヴォギラ', '普亞吉拉'),

	_word_jp1('六瘤水牛|六瘤バッファロー', '六瘤水牛'),

	_word_jp1('伊斯旦卡|インステカ', '伊斯旦卡'),
	_word_jp1('尤利弗朗茲|ユーリフランツ', '尤利弗朗茲'),
	_word_jp1('阿古溫魯|アンクワール', '阿古溫魯'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['(校工|雪白)(先生|桑)', '$1桑'],
	[/^[　 ]+/gm, ''],

	['聯合王國|連合王国', '聯合王國'],

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
