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

	_word_jp1('多嶋貴理子', '多嶋貴理子'),
	_word_jp1('タジマ', '多嶋'),

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

	_word_jp1('ロンデルク|洛迪古', '洛迪古'),



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
	_word_jp1('奧斯朗|オスロン', '奧斯朗'),
	_word_jp1('撒烏拉|サウラン', '撒烏拉'),

	_word_jp1('茶|チャイ', '茶'),
	_word_jp1('包|パン', '包'),
	_word_jp1('冠|クン', '冠'),

	_word_jp1('加奧沙伊|カオサイ', '加奧沙伊'),
	_word_jp1('雅拉卡茲那|ヤーラカンチャナ', '雅拉卡茲那'),
	_word_jp1('蘭達娜|ラッタナ', '蘭達娜'),

	_word_jp1('阿古溫魯|アンクワール', '阿古溫魯'),

	_word_jp1('古薇亞|クメジア', '古薇亞'),

	_word_jp1('拉茲撒姆特|ラチャサムット', '拉茲撒姆特'),

	_word_jp1('帕米特|パミット', '帕米特'),

	_word_jp1('克莉絲|グシュティ', '克莉絲'),

	_word_jp1('幽碧|ヨビ', '幽碧'),

	_word_jp1('艾莉露|エーリル', '艾莉露'),
	_word_jp1('戈巴爾德|ゴルバルド', '戈巴爾德'),

	_word_jp1('勒巴|ナバー', '勒巴'),
	_word_jp1('路雲|ルワン', '路雲'),


	_word_jp1('ナクロプ|納古羅普', '納古羅普'),
	_word_jp1('伊古斯廸克|イグシデハーン', '伊古斯廸克'),
	_word_jp1('ノクル|諾古魯', '諾古魯'),

	_word_jp1('シンチャイ|沙千', '沙千'),
	_word_jp1('プラサート|巴塞', '巴塞'),

	_word_jp1('卡西諾|カジノ', '卡西諾'),
	_word_en3('casino', '卡西諾'),

	_word_jp1('嘉魯達|ガルーダ', '嘉魯達'),

	_word_jp1('貝利|ベイリー', '貝利'),
	_word_jp1('古德曼|グッドマン', '古德曼'),

	_word_jp1('美爾|ミル', '美爾'),

	_word_jp1('康妮|コニー', '康妮'),
	_word_jp1('加索|カーゾン', '加索'),

	_word_jp1('達奧|ダーオ', '達奧'),

	_word_jp1('絲古|スック', '絲古'),
	_word_jp1('古德蘭普|クンドラップ', '古德蘭普'),
	_word_jp1('庫魯瑪|クールマ', '庫魯瑪'),

	_word_jp1('塔烏|タウ', '塔烏'),
	_word_jp1('優克|ヨック', '優克'),



	/**
	 *
	 */



	_word_jp1('白幻|白色幻影', '白色幻影'),
	_word_jp1('イルニーク|伊魯尼克|伊露尼克', '伊魯尼克'),

	_word_jp1('アレルドゥリア|亞雷路多利亞', '亞雷路多利亞'),

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


	_word_jp1('美多|ミド', '美多'),

	_word_jp1('廓爾喀刀|ククリ刀', '廓爾喀刀'),
	_word_jp1('星球釘錘|星球メイス', '星球釘錘'),
	_word_jp1('全板塊裝甲|フルプレートアーマー', '全板塊裝甲'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['(校工|雪白)(先生|桑)', '$1桑'],
	[/^[　 ]+/gm, ''],

	['聯合王國|連合王国', '聯合王國'],

	['生命精(?=魔|石)', '命精'],
	['生命精(?!靈)', '命精'],

	[/(?<=\S)\n(?=^─[^\n]*)/gm, '\n\n'],
	[/(?<=^─[^\n]*)\n(?![─]|\n)/gm, '\n\n'],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

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

export default exports;
