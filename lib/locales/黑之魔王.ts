/**
 * Created by user on 2017/12/9/009.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { _zh_num2, sp, sp2, _zh_num, _full_num, EN_REGEXP } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';
import { _word_zh } from 'regexp-cjk/lib';

export const lang = '黑之魔王';

//export const ns = '黑之魔王';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	//['[黑黒]', '黑'],

	/**
	 * 菲奥娜•索蕾优 フィオナ・ソレイユ
	 */

	_word_jp1('クロノ', '黑乃'),
	_word_jp1('クロエ|黒奈|克洛伊|克活伊|庫洛爾', '黒奈'),

	['克洛诺', '黑乃'],
	['真乃真央|黒央真乃|黒野真央', '黑乃真央'],

	['菲欧娜|菲奥娜|フィオナ|菲奧納|非奧娜', '菲奧娜'],
	[`菲奥娜${sp}索蕾优`, '菲奧娜・索蕾優'],

	['索雷優|索蕾優|索雷伊|索雷幽|索雷耶', '索蕾優'],

	['莉莉|麗麗|リリィ', '莉莉'],

	/**
	 *
	 */
	_word_jp1('黑艾', '黑艾'),
	_word_jp1('リリエンタール', '麗麗恩塔路'),

	_word_jp1('シャバ', '夏巴'),

	/**
	 *
	 * 艾因，斯拜因，多来因
	 */

	/**
	 * 伊鲁兹村的街道上相遇
	 */
	//['伊尔兹村|伊尔兹村|伊兹村', '伊鲁茲村'],
	_word_jp1('伊尔兹|伊尔兹|伊兹|伊鲁茲|イルズ', '伊魯茲'),

	_word_jp1('ニーノ|尼諾', '尼諾'),
	_word_jp1('ニャレコ|喵尼子|喵子|貓尼子', '喵尼子'),

	_word_jp1('アテン|婭丁|亞丁', '婭丁'),
	_word_jp1('クレイドル|克雷多爾|格雷托爾', '格雷托爾'),

	_word_jp1('ハリー|哈利', '哈利'),

	_word_jp1('イルズ・ブレイダー|伊魯茲·布雷塔|伊魯茲布雷達', '伊魯茲・布雷塔'),

	[`伊魯茲${sp}布雷塔`, '伊魯茲・布雷塔'],

	_word_jp1('ヴァーツ|瓦西', '瓦西'),

	/**
	 *
	 *
	 * 阿尔萨斯要塞/村
	 *
	 * 瓦爾剛
	 * 伏尔甘?帕瓦特
	 * 沃尔夫冈德
	 *
	 * ヴォルフガンド
	 */
	_word_jp1('伏尔甘|瓦爾剛|巴魯坦|巴鲁坦|ヴァルカン|瓦爾幹', '伏爾甘'),

	[`伏尔甘${sp}(?:帕瓦特)`, '伏爾甘・帕瓦特'],

	_word_jp1(`沃爾夫(?:冈德|剛多)|ヴォルフガンド`, '沃爾夫岡德'),

	_word_jp1('阿尔萨斯|阿魯萨斯|アルザス', '阿爾薩斯'),

	//['斯?絲小姐', '斯絲小姐'],

	_word_jp1('スース', '斯絲'),
	_word_jp1('スー', '斯'),

	/**
	 * 冒险者公会
	 *
	 * 艾莉娜
	 * 梦魇玛丽
	 * 我和莉莉共乘一匹，菲奥娜独自乘坐一匹。
	 * 顺便说一下，前者叫梅丽，后者叫玛丽。
	 */
	['艾利娜|艾丽娜|艾莉娜|爱丽娜|艾里娜', '艾莉娜'],

	_word_jp1('エリナ', '艾莉娜'),

	/**
	 * 鍛造
	 *
	 * レギン・ストラトス
	 */
	['利金|雷金|雷因', '雷金'],
	//['斯特拉托斯|斯特斯汀|斯特兰特斯', '斯特拉托斯'],
	['斯特拉托斯|斯特斯汀|斯特兰特斯|斯特拉特|斯托拉托斯', '斯特拉托斯'],

	_word_jp1('レギン', '雷金'),
	_word_jp1('ストラトス', '斯特拉托斯'),

	['莫尔德雷德|莫德雷德特?|摩尔德雷', '莫德雷德'],

	_word_jp1('モルドレット', '莫德雷德'),

	[`${sp}威尔西${sp}莫德雷德`, '$1・$2・$3'],
	[/華因/g, '華因'],

	/**
	 * 黑魔女恩底弥翁
	 * 黒魔女安蒂米欧
	 * 安迪米昂（エンディミオン），侍奉了旧魔王的黑魔女
	 *
	 * 魔王米娅、妖精女王丝，黑魔女安迪米恩
	 */
	['恩底弥翁|安迪米昂|安蒂米欧|安迪米恩|艾迪密恩', '安蒂米歐'],
	['魔女', '魔女'],

	['庫拉莉絲|クラリス', '庫拉莉絲'],
	['伊修朗|イシュラーン', '伊修朗'],
	['阿瑪迪乌斯|アマデウス|阿瑪迪斯', '阿瑪迪斯'],


	['(?<=妖精女王)丝', '伊莉絲'],
	_word_jp1('イリス|伊利斯|伊麗絲|伊利絲|伊莉斯', '伊莉絲'),

	_word_jp1('ハルト', '春人'),

	[`法天神官阿瑪迪斯`, '法天神官・阿瑪迪斯'],

	['aria|亚里亚|アリア|阿麗亞|亞利亞', '亞里亞'],

	['弗利希亞|弗利西亞|フリーシア|弗里西亚|芙莉西亞|茉莉西亞|菲莉西亞', '芙莉西亞'],
	_word_jp1('シア|西亞', '西亞'),

	['阿露蒂娜|阿尔特納|アルテナ', '阿露蒂娜'],

	['伊莉絲|伊麗絲', '伊莉絲'],

	_word_jp1('イヴ|夏娃', '夏娃'),

	['天癒皇女|天愈皇女', '天癒皇女'],

	_word_jp1('ヨミ|黄泉', '黄泉'),

	['冥剣聖ヨミ|冥剣聖黄泉|黒之剣聖 ?若弥', '冥剣聖黄泉'],

	/**
	 *
	 */
	_word_jp1('オリヴァー|奧利瓦', '奧利瓦'),
	_word_jp1('ヘロドトス|海洛德托斯', '海洛德托斯'),

	/**
	 * @todo 代達羅斯
	 *
	 * 戈维纳鲁
	 *
	 * 梅迪亚遗迹
	 */
	['代達羅斯|戴达罗斯|ダイダロス', '代達羅斯'],
	['加辉纳尔|加维纳尔|加挥那尔|戈维纳鲁|加維魯尔', '戈維納魯'],

	/**
	 * @todo 阿瓦隆
	 *
	 * 米娅・艾璐罗德
	 *
	 * 尼禄
	 * 妮露
	 */
	['米亚|米娅', '米婭'],

	_word_jp1('ミア', '米婭'),

	['内尔(好象|公主)', '妮露$1'],
	[/萘尔|妮露/g, '妮露'],

	_word_jp1('尼(禄|祿)|尼洛|ネロ', '尼禄'),

	[/(?:妮露|尼禄)(公主)/g, '妮露$1'],
	_word_jp1('ネル', '妮露'),

	_word_jp1('ユリウス', '尤里烏斯'),

	['尤(利|里)(烏|乌)斯|尤里乌斯|伊琉乌絲|尤里亞斯', '尤里烏斯'],
	['愛蜜艾璐羅德|愛蜜盧德|耶魯艾璐羅德|埃爾艾璐羅德|艾(璐|尔)罗德|埃尔罗德|埃尔路斯|艾尔洛特|艾尔罗德|艾璐罗德|艾路羅德|艾爾洛德|埃爾盧德|耶魯盧德|艾路洛多', '艾璐羅德'],

	_word_jp1('エルロード', '艾璐羅德'),

	[`${sp}尤里乌斯${sp}(?:艾璐罗德|卢德)`, '$1・尤里烏斯・艾璐羅德'],
	[`${sp}艾璐罗德`, '$1・$2'],

	_word_jp1('米里亞德|米利阿魯多|ミリアルド|米利亞多', '米利阿魯多'),

	[`神滅領域阿瓦隆`, '神滅領域・阿瓦隆'],

	['阿瓦隆|アヴァロン', '阿瓦隆'],

	//[`${sp}艾璐罗德`, '$1・$2'],


	['克里斯汀娜|克里斯蒂娜', '克里斯蒂娜'],
	['达米多|戴蒙得|達姆德|達米多', '戴蒙得'],
	['賽亞路翁|苏波拉尔霍|斯巴拉魯洪|賽亞路翁', '蘇波拉爾霍'],

	_word_jp1('クリスティーナ', '克里斯蒂娜'),
	_word_jp1('ダムド', '戴蒙得'),
	_word_jp1('スパイラルホーン', '蘇波拉爾霍'),

	_word_jp1('クリストフ', '克里斯托夫'),

	_word_jp1('セリヌンティウス', '塞利奴提烏斯'),

	_word_jp1('クリス', '克里斯'),

	[`克里斯蒂娜${sp}戴蒙得`, '克里斯蒂娜・戴蒙得'],

	[`克里斯蒂娜${sp}戴蒙得${sp}苏波拉尔霍`, '克里斯蒂娜・戴蒙得・蘇波拉爾霍'],

	_word_jp1('マクシミリアン|瑪庫希米麗安|馬克斯米利安', '瑪庫希米麗安'),

	_word_jp1('ギア|姫婭', '姫婭'),

	_word_jp1('エルシオン|艾路席翁', '艾路席翁'),

	_word_jp1('米麗雅|ミリア', '米麗雅'),


	/**
	 * 巫女
	 */
	['ベルクローゼン|貝露克羅贊', '貝露克羅贊'],
	_word_jp1('ベル|貝露', '貝露'),

	/**
	 * 君主之翼
	 */
	_word_jp1('ウイングロード', '翼之君主'),
	_word_en3('Wing Road', '翼之君主', 'ig'),
	[/翼之君主|君主之翼/g, '翼之君主'],
	[`${sp} *艾斯特${sp} *加爾布雷斯`, '$1・艾斯特・加爾布雷斯'],
	['凱', '凱'],
	_word_jp1('カイ', '凱'),

	_word_jp1('艾斯特|エスト', '艾斯特'),
	['加爾布雷斯|ガルブレイズ', '加爾布雷斯'],

	/**
	 * @todo 海德拉
	 *
	 * 前面的是 萨特，这的是赛义德，然后 海德拉 是 九头蛇
	 * 赛义德·玛雅·九头蛇
	 *
	 * 萨菲
	 */
	['赛义德|萨特|萨義德|萨义德', '薩特'],
	['海德拉|九头蛇|許德拉', '海德拉'],
	//[`${sp}玛雅${sp}海德拉`, '$1・$2・$3'],
	[`${sp}玛雅${sp}海德拉`, '$1・瑪雅・海德拉'],
	[`萨菲(?:尔|亞)?|薩菲爾|薩非爾`, '薩菲'],

	/**
	 * 親衛隊
	 *
	 * 阿瓦隆十二貴族之一的，亞茲拉爾家的長女海倫
	 */
	['貴族', '貴族'],
	['親衛隊', '親衛隊'],

	_word_jp1('アズラエル|阿茲拉爾|亞茲拉爾|阿兹拉瑞尔', '阿茲拉爾'),

	['海倫', '海倫'],

	/**
	 *
	 */
	_word_jp1('ブロッサム', '普羅薩姆'),
	['南三番街', '南三號街'],
	_word_jp1('セントユリア|聖朱麗亞', '聖朱麗亞'),

	_word_jp1('ナンチャラ|南查拉', '南查拉'),

	_word_jp1('エミール|埃米爾', '埃米爾'),

	/**
	 *
	 */
	_word_jp1('威森多魯夫|維森多夫|ヴィッセンドルフ', '威森多魯夫'),

	_word_jp1('雲達梅姆|ウインダム', '雲達梅姆'),



	_word_jp1('アークライト|阿克萊特|阿克拉托', '阿克萊特'),

	_word_jp1('ドラクロワ|德拉克洛瓦', '德拉克洛瓦'),

	_word_jp1('塞利斯|セリス|賽里斯|賽利斯|塞里斯', '賽利斯'),
	_word_jp1('安|アン', '安'),

	_word_jp1('ガクラン|詰襟|學蘭', '學蘭'),

	_word_jp1('ハイネ|海涅', '海涅'),

	_word_jp1('リュート|琉特', '琉特'),
	_word_jp1('エクスヴァリス|埃克斯瓦里斯', '埃克斯瓦里斯'),



	/**
	 * @todo 斯巴达
	 *
	 * 雷欧納德・托利斯坦・斯巴达
	 *
	 * 雷恩哈鲁特国王
	 * 艾森哈鲁特 第一王子
	 * 威尔哈鲁特
	 *
	 * 艾克是愛称。本名是艾森哈鲁特
	 *
	 * 赛利亚|瑟莉雅 兰布尔
	 */
	['威爾納德|威爾(哈鲁?特|哈尔?德)|瓦爾納德|瓦尔哈尔?德', '威爾哈魯特'],
	['威爾|瓦爾(?!基里)', '威爾'],

	['(威爾|瓦爾)(納德|哈鲁?特|哈尔?德)', '威爾哈鲁特'],
	['(雷欧|雷恩|雷奧)(納德|哈鲁?特|哈尔?德)|レオンハルト', '雷恩哈鲁特'],

	_word_jp1('ジークハルト|吉克納德|吉克哈鲁特', '吉克哈鲁特'),
	_word_jp1('エレオノーラ|艾麗奧諾拉', '艾麗奧諾拉'),

	['(艾森|雷恩|威尔|吉克)(納德|哈鲁?特|哈尔?德)', '$1哈鲁特'],

	_word_jp1('シャルロット', '夏洛特'),
	['夏露洛特|夏(露|洛|爾)特|夏洛特?', '夏洛特'],

	_word_jp1('シャル', '夏露'),
	['夏露|夏爾', '夏露'],

	_word_jp1('特里斯坦|托利斯坦|トリスタン', '托利斯坦'),
	//['斯巴德|斯巴[達]|斯特达|斯伯达', '斯巴达'],
	['斯巴德|斯巴達|斯特达|斯伯达|斯巴达|沙巴大|斯帕達', '斯巴達'],
	_word_jp1('スパーダ', '斯巴達'),

	[`${sp}托利斯坦${sp}斯巴達`, '$1・$2・$3'],

	//['赛利亚|瑟莉雅|西利亚|菲莉亞|西莉亞', '赛利亚'],
	['赛利亚|瑟莉雅|西利亚|菲莉亞|西莉亞|瑟利雅|賽利亞|塞莉亞|塞利亞', '賽莉亞'],

	_word_jp1('セリア', '賽莉亞'),

	[`蘭布爾`, '蘭布爾'],
	[`${sp}蘭布爾`, '$1・$2'],

	[`(?:蓋伊|ガイ)`, '蓋伊'],

	/**
	 * 斯巴达女将军，艾梅莉亞・弗里德里希・巴尔緹艾尔
	 *
	 * シモン・フリードリヒ・バルディエル
	 * フリーシア・バルディエル
	 */

	//['弗里西亚', '弗里西亞'],

	_word_jp1('シモン', '西蒙'),
	['西满', '西蒙'],
	['弗里德里希|弗里德希里|弗利—德里希|弗雷德里希|フリードリヒ', '弗里德里希'],
	['巴尔緹艾尔|巴尔迪亚尔|巴尔提艾尔|巴迪艾尔|巴爾迪爾|巴魯蒂埃魯|バルディエル', '巴爾緹艾爾'],

	['莉亞', '莉亞'],
	['艾梅莉亞|艾米莉亞|艾梅利亚|艾蜜莉娅|エメリア|埃梅利亞|艾梅里亞|埃米莉婭|艾蜜莉婭', '艾梅莉亞'],

	//[`${sp}弗里德里希${sp}巴尔缇艾尔`, '$1・$2・$3'],
	[`${sp}弗里德里希$
	{sp}巴尔缇艾尔`, '$1・弗里德里希・巴爾緹艾爾'],

	['雷冥龍', '雷冥龍'],
	_word_jp1('ジオ', '吉奧'),
	_word_jp1('エリザベス', '伊麗莎白'),

	_word_jp1('ドラゴニアン', '德拉戈尼亞'),

	/**
	 * 王立斯巴達學院的學院長索菲亞・希利烏斯・帕西法爾
	 * 索菲亞・西利烏斯・巴西費魯理事長
	 * 索菲亚·天狼星·帕西法璐
	 */

	['索菲亞|苏菲亞?|索非亞|索菲爾', '索菲亞'],
	['希利烏斯|西利(烏|乌)斯', '希利烏斯'],
	['帕西法爾|帕西法璐|巴西費魯|帕西菲爾', '帕西菲爾'],
	//[`${sp}西利[烏乌]斯${sp}巴西費魯`, '$1・$2・$3'],
	[`${sp}(?:希利烏斯|天狼星)${sp}(?:帕西菲爾|特拉法)`, '$1・希利烏斯・帕西菲爾'],
	[`・(?:希利烏斯|天狼星)・(?:帕西菲爾|特拉法)`, '・希利烏斯・帕西菲爾'],

	[`(?:(?:皇家|王(?:立|丽))斯巴达|斯巴达(?:皇家|王(?:立|丽)))神?学+(?:院|校|园)`, '王立斯巴達神學院'],
	[`皇家斯巴的神學院`, '王立斯巴達神學院'],

	[`神学+(?:院|校|园)`, '神學院'],

	/**
	 * 法尔基斯。是剣闘士団『星光斯巴达』
	 */
	['剣闘士|グラディエイター', '剣闘士'],

	_word_jp1('ランペイジ|暴怒', '暴怒'),
	_word_en3('Rampage', '暴怒'),
	_word_jp1('格森布魯?|蓋贊布魯|ゲゼンブール', '格森布'),
	_word_jp1('巴風特|巴弗滅|バフォメット|巴佛米特', '巴風特'),
	_word_jp1('ディアボロス', '迪亞波羅'),

	_word_jp1('エリウッド|埃里伍德|绘里伍德', '埃里伍德'),
	_word_jp1('メイトリクス', '梅德里克斯'),

	[`戈尔丹|噶尔丹`, '戈爾丹'],

	[`法爾基思|法爾基斯|ファルキウス|法魯齊乌斯|法魯迪乌斯|法爾奇斯|法爾齊斯`, '法爾基斯'],

	[`輝劍${sp}維多利加`, '輝劍・維多利加'],

	[`道格拉拉斯|道格拉班|ダグララス`, '道格拉拉斯'],
	_word_jp1('ララ|拉拉', '拉拉'),

	['震角猛牛', '震角猛牛'],
	_word_jp1('ブルブロス|布爾布羅斯|布魯布羅斯', '布魯布羅斯'),

	[`塞多拉`, '塞多拉'],

	[`Valkyr${sp}storm`, '嵐之戰乙女', 'ig'],
	[`嵐之戰乙女|嵐の戦乙女`, '嵐之戰乙女'],

	/**
	 * 利刃連者
	 */
	[`粉色阿羅|粉紅箭|粉紅之弓`, '粉紅之弓'],

	/**
	 * @todo 使徒
	 *
	 * 蓼蓝（第8使徒） 第八使徒愛
	 * 第十二使徒玛丽亚伯
	 * 第三使徒米迦勒
	 * 第十一使徒米莎
	 *
	 * 第二使徒 勇者阿贝尔 阿贝尔
	 *
	 * 基塔斯司教
	 *
	 * 第七使徒是“銀斷”的亞莉艾爾（譯者：アリエル這個沒找到隨便翻的）卿
	 *
	 */

	_word_jp1('アリエル|亞莉艾爾', '亞莉艾爾'),

	[/猶達斯斯?|酋达斯|犹达斯|基塔斯|泽拉斯|ジュダス|泽魯斯/g, '猶達斯'],
	['蓼蓝|愛', '愛'],
	['米萨|米莎|米沙|弥撒', '米莎'],

	_word_jp1('アイ', '愛'),
	_word_jp1('米迦勒|ミカエル|米歇爾', '米迦勒'),

	[/沙利葉希麗茲|沙利叶|沙利葉|萨利叶|沙利业|サリエル|薩利愛蜜|沙利葉蜜|薩利埃爾|莎利葉|莎莉葉|沙拉葉/g, '沙利叶'],

	//百合|ユーリ|優莉|尤莉
	_word_jp1('ユーリ', '百合'),

	_word_jp1('ユダ', '猶大'),
	_word_jp1('ヨハネス', '尤哈涅斯'),

	_word_jp1('琉庫羅姆|リュクロム|留庫羅姆', '琉庫羅姆'),
	_word_jp1('庫諾西姆|ユグノーシス', '庫諾西姆'),

	[`([^丽麗])(亚伯|亚伯|埃布尔|阿贝尔)`, '$1亞伯'],
	_word_jp1('マリアベル|瑪麗亞伯', '瑪麗亞伯'),
	_word_jp1('アベル|亞伯|亞貝魯', '亞伯'),

	[`白の勇者|白色勇者`, '白の勇者'],

	[`白色秘仪|白之秘跡|白の秘跡|白之遗迹|白的聖礼|白之秘忌|白色秘跡`, '白の秘跡'],

	[`司教|主教`, '司教'],

	_word_jp1('カイン', '該隱'),

	/**
	 * @todo 十字军
	 *
	 * 卑尔根伯爵
	 *
	 * 十字军贵族派大将，贝尔古特伯爵
	 * 留库罗姆
	 *
	 * 古雷格留斯司教殿
	 * 梅尔赛迪斯枢机卿
	 *
	 * 諾尔茲祭司长
	 */
	[/神父|祭司|司祭/g, '司祭'],
	_word_jp1(`ノールズ|諾尔茲`, '諾爾茲'),
	[`(西尔|施)維(亞|娅)|希露比婭|シルビア`, '西爾維亞'],
	_word_jp1(`格里高利|格列高利|グレゴリウス|格力高里`, '格里高利'),
	_word_jp1(`アルス|阿尔斯`, '阿爾斯'),
	[`红衣主教|枢机卿`, '枢機卿'],

	_word_jp1(`梅尔赛迪斯|メルセデス|梅賽德斯`, '梅爾賽迪斯'),

	_word_jp1(`多蘿西|ドロシー|多蘿茜`, '多蘿西'),

	_word_jp1(`貝魯曼|ヘルマン|赫爾曼`, '貝魯曼'),

	_word_jp1(`基爾萬`, '奇爾萬'),

	/**
	 * ヘルベチアの聖少女
	 * 貝魯貝奇亞
	 *
	 * リィンフェルト
	 * 琳菲露德
	 *
	 * 琳菲露德・亚里亚・貝魯貝其亞・貝魯昆多
	 * リィンフェルト・アリア・ヘルベチア・ベルグント
	 *
	 *
	 * ビエント・ドミニク・ヘルベチア・ベルグント
	 */

	// 拜魯蒙特
	[`ベルグント|卑尔根|贝尔古特`, '貝爾古特'],

	[`(?:艾露貝齐亞|貝魯貝其亞|ヘルベチア|貝魯貝奇亞|赫魯貝基亞|赫爾維蒂)`, '艾露貝齊亞'],

	[`毕恩德|皮恩德|ビエント`, '皮恩德'],

	[`皮恩德${sp}多米尼克${sp}艾露貝齐亞${sp}貝尔古特`, '皮恩德・多米尼克・艾露貝齊亞・貝爾古特'],

	[`${sp}(?:艾露貝齐亞|貝魯貝其亞|ヘルベチア)${sp}(?:貝尔古特|貝魯昆多|ベルグント)`, '・艾露貝齊亞・貝爾古特'],

	[`爱(裡|里)奥|愛丽奧|埃里歐|愛麗奧`, '愛里奧'],

	[`琳菲露德|リィンフェルト|琳菲爾德`, '琳菲露德'],
	_word_jp1('リン', '琳'),

	[`マシュラム|馬修拉姆`, '馬修拉姆'],
	_word_jp1('ヨシュア|尤西亞', '尤西亞'),

	[`${sp}(?:亞里亞|多米尼克|尤西亞)${sp}(?:艾露貝齐亞|貝魯貝其亞|ヘルベチア)${sp}(?:貝尔古特|貝魯昆多|ベルグント)`, '・$2・艾露貝齊亞・貝爾古特'],

	[`(?:賽|塞)巴斯蒂安`, '塞巴斯蒂安'],
	[`(?:賽|塞)巴斯`, '塞巴斯'],

	/**
	 *
	 */
	[`(完整調试|フルチュ－ン|完全調试)`, '完整調试'],

	[`(完整調试|フルチュ－ン|完全調试|弗盧裘恩)[・ \?](哥雷姆|塔诺斯|タウスル|托魯斯)`, '完整調試・托魯斯'],
	[`塔诺斯|タウスル|托魯斯|金牛座|塔乌魯斯`, '托魯斯'],

	/**
	 * 天馬騎士
	 */
	_word_jp1(`艾絲蒂尔|エステル`, '艾絲蒂爾'),
	[`芙兰|法郎`, '芙蘭'],
	_word_jp1(`路戴爾|ルーデル`, '路戴爾'),

	/**
	 * 悪食魔獣卡欧斯伊塔
	 *
	 * 贪婪戈亚。
	 怠惰吉尔
	 傲慢杰姆
	 暴食欧庫多
	 淫欲罗茲
	 嫉妒雷伊

	 （グリードゴア。
	 スロウスギル。
	 プライドジェム。
	 グラトニーオクト。
	 ラストローズ。
	 エンヴィーレイ。）

	 サンドワーム和マッドモール等，持有着能在地面挖洞的技能的怪物有很多。
	 Rank5的地城『エルグランドキャニオン』的霸者大地龙，仅仅是通过就会制造出直径长达50米的巨大洞窟。
	 */
	['嫉妒吉尔|懒惰吉尔|怠惰吉尔|スロウスギル|懶惰吉爾', '怠惰吉爾'],
	['贪婪格尔|贪婪戈尔|グリードゴア|暴食戈亞|貪婪戈亞', '貪婪戈爾'],

	[`貪婪${sp}戈爾`, '貪婪戈爾'],

	['傲慢杰姆', '傲慢杰姆'],
	['暴食欧库多|暴食章魚|グラトニーオクト', '暴食歐庫多'],

	_word_jp1('エンヴィーレイ|嫉妒雷伊', '嫉妒雷伊'),
	_word_jp1('レイ', '雷伊'),

	_word_jp1('プライドジェム|傲慢杰姆|傲慢吉姆', '傲慢杰姆'),

	['最(后|後)的?玫瑰|终末の玫瑰|淫欲罗茲|ラストローズ|慾望玫瑰|色欲羅斯|終焉玫瑰|色欲玫瑰', '色欲玫瑰'],
	[`l[oau]st${sp}rose`, '色欲玫瑰', 'ig'],

	_word_jp1('カオシックリム|混沌克里姆', '混沌克里姆'),

	['悪食', '悪食'],
	['懒惰|怠惰', '怠惰'],
	['贪婪', '貪婪'],
	['色欲|淫欲', '色欲'],
	['傲慢', '傲慢'],
	['嫉妬', '嫉妬'],
	['暴食', '暴食'],

	['迷宮|地城|地下城|迷宮', '迷宮'],

	_word_jp1('エルグランドキャニオン', '蘭德斯峽谷'),
	_word_jp1('マッドモール', '瑪德莫爾'),
	_word_jp1('サンドワーム', '山多阿姆'),

	/**
	 *
	 */
	['ラースプン|憤怒熊兔', '憤怒熊兔'],
	_word_jp1('混沌熊兔姆?|卡奧西庫里姆|カオシックリム|卡奧西克里姆|混沌兔熊', '混沌熊兔'),

	['哥雷母|哥雷姆|格雷姆', '哥雷姆'],
	['奇美拉', '奇美拉'],

	['ドラグノフ|杜格諾夫', '杜格諾夫'],

	_word_jp1('哥布林|ゴブリン', '哥布林'),

	_word_jp1('猫獣人', '貓獸人'),
	_word_jp1('ラミア|拉米亞|拉米婭', '拉米婭'),
	_word_jp1('リザードマン|蜥蜴人', '蜥蜴人'),
	_word_jp1('ハーピィ|鷹身人', '鷹身人'),

	_word_jp1('多魯托斯(?:坦普)?|ドルトス(?:ダンプ)?|托魯托斯|ドルトス|多爾托斯', '多魯托斯'),

	['米諾陶洛?斯|米諾陶思', '米諾陶洛斯'],

	//['多魯托斯(?:坦普)?|ドルトス(?:ダンプ)?', '多魯托斯'],

	/**
	 * 吸血鬼保镖路多拉
	 * 吸血鬼武士的鲁朵拉
	 */
	['鲁朵拉|路多拉|魯多拉|魯德拉|路德拉', '路多拉'],
	_word_jp1('ルドラ', '路多拉'),

	_word_jp1('ゼルドラス', '塞爾德拉斯'),
	_word_jp1('ヴァン', '梵'),

	// 拜魯蒙特 貝爾古特
	_word_jp1('ベルモント', '拜魯蒙特'),


	_word_jp1('ネヴァーランド', '永無鄉'),

	/**
	 *
	 */
	_word_jp1('キプロス|吉普洛斯|塞浦路斯', '塞浦路斯'),

	/**
	 * 艾斯梅拉山脉
	 * 斯铃村
	 *
	 * lost rose
	 * Last Rose
	 */
	['阿苏贝鲁|艾斯梅拉|阿斯貝尔|阿斯倍魯|アスベル', '艾斯梅拉'],
	['艾斯梅拉山(脉|脈)', '艾斯梅拉山脈'],

	/**
	 * 威斯特法伦
	 * 弗恩
	 * 费伦
	 */
	['威斯特法伦|ファーレン|弗恩', '弗恩'],

	/**
	 * @todo 卢恩
	 *
	 * フィオーラ・テオ・ナナブラスト
	 * 菲奥拉?媞奥?布拉斯特
	 *
	 * 赤羽善一
	 * ゼンイチ・テオ・レッドウイング伯爵
	 *
	 * 善一·西奥·红翼
	 */
	[`${sp}媞奧${sp}布拉斯特`, '$1・$2・$3'],
	[`${sp}西奧${sp}紅翼`, '$1・媞奥・$3'],
	[/西奧・红翼/g, '媞奧・紅翼'],

	['(雷德因克|红翼)', '紅翼'],

	['鲁恩|卢恩', '盧恩'],

	/**
	 * 辛克莱共和国
	 *
	 * 愛麗絲?因?哥德蘭德?辛克莱
	 * アリス・イン・ゴッドランド・シンクレア
	 */
	['辛格雷亚|辛克莱|シンクレア|新克利亞', '辛克莱'],

	[`${sp}因${sp}哥德蘭德${sp}辛克莱`, '・因・哥德蘭德・辛克莱'],

	/**
	 *
	 */
	_word_jp1('クゥアル|庫阿爾', '庫阿爾'),

	/**
	 *
	 */
	['巴魯巴托斯|バルバドス|巴巴多斯|Barbatos|巴巴托斯', '巴魯巴托斯'],
	['伊芙拉姆|イブラーム|伊夫拉姆|Evelahm|伊娃拉姆|イヴラーム', '伊芙拉姆'],

	['埃弗拉哈姆|エイヴラハム', '埃弗拉哈姆'],
	['貝奧沃夫|ベオウルフ|貝奧武夫', '貝奧武夫'],


	_word_jp1('ウル|烏露|烏爾', '烏露'),
	_word_jp1('ウルスラ|烏露斯拉|烏璐斯拉|烏蘇拉|厄秀拉|烏露絲拉', '烏露絲拉'),
	_word_jp1('蕾琪|レキ', '蕾琪'),

	//---

	//_word_jp1('雷琪|レキ', '雷琪'),

	_word_jp1('レキトリウス|雷琪托里烏斯|蕾琪托里烏斯', '雷琪托里烏斯'),

	//_word_jp1('ウル|烏魯', '烏魯'),

	_word_jp1('烏魯斯拉|ウルスレイ|烏魯斯雷|烏露斯雷', '烏魯斯雷'),

	//---

	_word_jp1('ランドルフ|蘭多夫|蘭鐸魯夫', '蘭鐸魯夫'),

	_word_jp1('ライアン|萊安|萊昂(?!哈)|萊恩', '萊安'),
	_word_jp1('克裡夫|クリフ|格里夫|克利夫', '格里夫'),

	_word_jp1('ニコライ|尼古拉', '尼古拉'),

	_word_jp1('泰德|テッド', '泰德'),
	_word_jp1('エヴァ|伊娃', '伊娃'),

	['白夜叉姫', '白夜叉姫'],
	_word_jp1('アナスタシア|Anastacia|阿納斯塔西婭|安娜塔西亞|Anastasia', '安娜塔西亞', 'ig'),

	_word_jp1('デビルフィッシュ|悪魔の魚|戴偉爾魚|惡魔魚', '悪魔の魚'),

	/**
	 *
	 */
	_word_jp1('弗吉尼亞|ヴァージニア', '弗吉尼亞'),

	/**
	 *
	 */
	_word_jp1('アイン', '艾因'),
	_word_jp1('ツヴァイ', '沙瓦伊'),

	_word_jp1('ドライ', '鐸萊'),
	_word_jp1('フィア', '費昂'),

	_word_jp1('ゼクス', '塞克斯'),

	_word_jp1('フェンフ', 'フェンフ'),

	_word_jp1('ジーベン', '吉本'),
	_word_jp1('アハト', '阿哈特'),
	_word_jp1('ノイン', '納尹'),

	_word_jp1('セバスティアーノ', '塞巴斯蒂亞諾'),
	_word_jp1('ロッテンマイヤー', '羅登邁爾'),
	_word_jp1('ロッテ', '羅登'),


	/**
	 * 大闘技場古兰多克洛夏姆
	 *
	 * 阿苏贝鲁山脉从潘多拉大陆的中部到北部，以描绘弧线的形式扩大着。
	 *
	 * 潘多拉大陆的地图，加拉哈德山脉位在大陆中央稍偏东侧，向南北成弧形延伸，
	 * 从那个弧形的中心稍微往东走去就是我们的伊鲁兹村
	 */

	[/猫の\*+尾亭|猫尾亭|猫之尾亭|貓尾巴亭/g, '猫の尻尾亭',],
	//['伊斯基斯|伊斯基亚|依斯基斯', '伊斯基亚'],
	['伊斯基斯|伊斯基亚|依斯基斯|伊斯基亞|伊斯奇亞|伊斯基尔|伊苏齐斯|伊斯塔亞?|イスキア', '伊斯基亞'],
	['伊斯(村|山)', '伊斯基亞$1'],

	['加拉哈多|加拉巴德|加拉哈德|瓦拉哈德|卡拉哈德|ガラハド|加拉多德?|加爾哈德', '加拉哈德'],

	['艾利西昂|艾利希恩|艾丽希昂|艾丽希恩|エリシオン|极乐净土|極?艾麗西昂|耶路撒冷', '艾利西昂'],
	['復活の地下墳墓|復活的愤怒坟墓', '復活の地下墳墓'],

	['魔法学院|魔法学校', '魔法学院'],

	_word_jp1('潘多拉|潘德拉|パンドラ|潘朵拉', '潘多拉'),

	['斗技场|闘技場', '闘技場'],
	['Grand・Coliseum|grand coliseum|古兰多克洛夏姆|grand colosseum', '古蘭多克洛夏姆', 'ig'],

	/**
	 * 克朗（クラン）
	 */

	['跨夏节|夏日祭|夏越祭', '夏越祭'],
	//['[诅詛]?咒物品?[剑角角][斗鬥]大[会會]|詛咒武器競技大賽', '詛咒物品角鬥大會'],
	['詛?咒物品?(?:剑|角|角)闘大會|詛咒武器競技大賽|呪物剣闘大會|詛咒劍闘大會|詛咒角闘大會|詛咒武器角闘大會|詛咒武器剣闘大會', '呪物剣闘大会'],

	['克朗|克兰', '克蘭'],

	/**
	 * 天穹大陆
	 */
	['(天穹|电弧)大陆', '天穹大陸'],

	['(美狄亞|梅迪亞|美迪亞|梅利亞|メディア)遺跡', '梅迪亞遺跡'],

	_word_jp1('ラティフンディア|拉蒂芬迪亞|拉蒂馮提雅|拉蒂夫提亞|拉提馮迪亞', '拉蒂芬迪亞'),

	_word_jp1('ラティ|拉蒂', '拉蒂'),

	_word_jp1('ラケル|拉凱爾', '拉凱爾'),


	/**
	 * title
	 */



	[/(?:漆黒|黒色|黒之)(?:夢魘|噩梦|悪梦)的?狂(?:戰|戦)士|狂戰士·黑之噩夢|狂戰士・黒之噩梦/g, '漆黑夢魘的狂戰士'],
	[/黒色噩梦之狂戰士/g, '漆黑夢魘的狂戰士'],

	[/Element\s*master|Elemental\s*Master/ig, 'Elemental Master'],
	[/エレメントマスター|元素大师|元素掌控者|元素之主|元?素支配者|元素大師|Elemental Master|元素掌握者|元素主宰者?|元素掌握者|元素主人/ig, '元素支配者'],



	['勇敢的心|勇敢之心|ブレイブハート', '勇敢之心'],

	['战塔法罗斯|战塔法魯斯', '戰塔法羅斯'],
	['法罗斯|法魯斯|法洛斯', '法羅斯'],

	['アルターフェイス|Alter ?-? ?Face|阿魯達菲斯|阿鲁达菲斯', 'Alter・Face', 'ig'],

	['赤雷侯', '赤雷侯'],
	['ラインハルト', '萊因哈特'],
	['萊因納德|萊因哈特', '萊因哈特'],

	['漢佐瑪|ハンゾーマ', '漢佐瑪'],


	/**
	 * weapen
	 *
	 * 恶魔的拥抱《diablo's embrace》
	 */
	[/Haunted\s*grave/ig, 'Haunted Grave'],

	['ブ儿ーム|ブルーム', 'ブルーム'],
	[/(Ains|艾因茲|アインズ|ainz|艾因茨|愛因斯|艾英滋)[・\?]?(B[rl]oom|布魯姆|ブルーム|ブ儿ーム|ブ兒ーム)|愛因布魯姆|愛因・布魯姆|艾因・布魯姆|艾因布魯姆/ig, '艾因茲・布魯姆'],

	_word_en3('AINZBLOOM', '艾因茲・布魯姆'),

	_word_jp1(`デュアルイーグル|二元之鷹|雙鷹`, '雙鷹'),

	[/custom ・fireball|改造火球杖/g, '定制・火球杖'],
	[/定制・火焰水晶球/g, '定制・火焰水晶球'],

	[/火焰法杖|スピットファイア/g, '火焰法杖'],

	_word_jp1(`治癒|キュアー`, '治癒'),
	_word_jp1(`回復|ヒール`, '回復'),

	_word_jp1(`クイーン${sp}ベリル`, 'クイーン・ベリル'),

	['惡魔的擁抱|惡魔の抱擁', '惡魔的擁抱'],

	['疾風一閃', '疾風一閃'],
	[`(?:Ale|エール)${sp} ?(?:Slash|スラッシュ)`, 'Ale・Slash'],

	['旋風連刃', '旋風連刃'],
	[`Y?ale Over Blast`, 'Ale・Over Blast', 'ig'],
	[`エール${sp}オーヴァブラスト`, 'Ale・Over Blast', 'ig'],

	_word_jp1('科賽特斯|コキュートス|科塞特斯', '科賽特斯'),
	['科賽特斯的狹間|コキュートスの狭間', '科賽特斯的狹間'],

	_word_jp1('安達里士|アンタレス|安塔雷斯', '安達里士'),
	_word_en3('Antares', '安達里士'),

	[/流星劍『(?:蠍之心|安達里士)』/, '流星劍『安達里士』'],
	[`(?:流星剣)${sp}安達里士`, '流星劍・安達里士'],

	_word_jp1('固有魔法|エクストラ', '固有魔法'),

	['カラーリングアイズ|美瞳眼鏡|幻色眼|彩色眼鏡', '幻色眼'],
	['七色変化の髪留め|七色變化的髮夾', '七色變化的髮夾'],

	_word_jp1('悪魔の存在証明|惡魔存在之證明|惡魔的存在證明', '惡魔的存在證明'),

	_word_jp1('ガルーダ', '迦樓羅'),

	_word_jp1('バジリシク', '巴基瑞斯克'),

	_word_jp1('運命転輪|命運轉輪', '命運轉輪'),
	_word_jp1('フィーネ', '菲涅'),

	/*
	['[『「]咒怨铊[「『]腹裂[』」][』」]', '「咒怨铊『腹裂』」'],

	['獠牙剣(?:[』」》）】]?[《（「『【？?・]+)悪食[』」》）】]?', '牙劍「悪食」'],
	['餓狼之?剣(?:[』」》）】]?[《（「『【？?・]+)悪食[』」》）】]?', '餓狼劍「悪食」'],
	['暴食牙剣(?:[』」》）】]?[《（「『【？?・]+)極悪食[』」》）】]?', '暴食牙剣「極悪食」'],

	['絶怨鉈(?:[』」》）】]?[《（「『【？?・]+)首断[』」》）】]?', '絶怨鉈「首断」'],
	*/



	/**
	 * skill
	 */

	[`(?:the|ザ)${sp}(?:greed|グリード)`, 'THE・GREED', 'ig'],
	[`thegreed`, 'THE・GREED', 'ig'],

	/**
	 *
	 */
	_word_jp1('ジョート|喬丹|喬德|裘特', '喬德'),
	_word_jp1('カレン|卡蓮|卡倫', '卡蓮'),

	_word_jp1('那基姆|ナキム', '那基姆'),

	/**
	 * 法蘭 法連
	 */
	_word_jp1('(威斯特)?法倫|ファーレン|弗恩', '法倫'),

	_word_jp1('ゴルドラン|葛爾德蘭', '葛爾德蘭'),

	_word_jp1('トルキス', '托魯齊斯'),

	_word_jp1('ヒツギ', '小柩'),

	_word_jp1('ツミキ', '積木'),

	_word_jp1('エクス', 'Ｘ'),

	['屍體魂術師|屍霊術士|屍霊術師|屍魂術師', '屍魂術士'],

	['逆十字反?', '逆十字'],
	['ANTICROSS|Anti cross', 'ANTI・CROSS', 'ig'],
	[`Anti${sp}cross`, 'ANTI・CROSS', 'ig'],
	_word_jp1('アンチクロス', 'ANTI・CROSS'),

	['不滅闘士', '不滅闘士'],
	_word_jp1('スヴァルディアス|蘇瓦爾迪亞斯|蘇威爾迪亞斯', '蘇瓦爾迪亞斯'),

	_word_jp1('ジークフリート|吉庫弗里德', '吉庫弗里德'),

	/**
	 *
	 */
	_word_jp1('パルティア|帕爾迪亞|艾爾格蘭德|帕提亞', '帕爾迪亞'),

	_word_jp1('(スラム|斯拉姆)街?', '貧民窟'),

	_word_jp1('ミケーネ|米格涅|邁錫尼', '米格涅'),
	_word_jp1('(ミケーネ|米格涅|邁錫尼)の?遺跡街', '米格涅遺跡街'),

	_word_jp1('リキセイ|瑞克斯|栗齊瑟伊', '瑞克斯'),

	_word_jp1('ヴィヴィ', '薇薇'),
	_word_jp1('ヴィヴィアン', '薇薇安'),

	_word_jp1('ズーラー|祖勒', '茲拉'),

	_word_jp1('プリムヴェール', '普利姆威爾'),

	_word_jp1('ザック', '扎克'),
	_word_jp1('ニャー', '妮亞'),

	_word_jp1('隆達|ゾンダー', '隆達'),
	_word_jp1('索爾達特|ゾルダート', '索爾達特'),

	_word_jp1('塞勒涅|セレーネ|塞雷涅|塞涅內', '塞勒涅'),
	_word_jp1('(塞勒涅|セレーネ)の?(大灯台|巨燈塔)', '塞勒涅的巨燈塔'),

	_word_jp1('レムリア|萊姆利亞|雷姆利亞', '雷姆利亞'),

	_word_jp1('プレデターコート', 'Predeter Coat'),

	_word_jp1('シャングリラ|香格里拉', '香格里拉'),

	_word_jp1('フローレンス', '佛羅倫斯'),

	/**
	 *
	 */
	_word_jp1('バビロニカ', '巴比羅尼卡'),

	_word_jp1('ケイオンタス', '凱恩塔斯'),
	_word_jp1('ケルヌンノス', '凱恩諾斯'),

	_word_jp1('ケイ', '凱'),

	_word_jp1('ハイラム', '海拉姆'),

	_word_jp1('ギャリソン', '加里森'),
	_word_jp1('ライバック', '萊帕克'),

	/**
	 *
	 */
	_word_jp1('スティンガ', 'Stinger'),
	_word_jp1('スレイヤー', '殺手'),

	_word_jp1('妖精殺し', '妖精殺手'),

	/**
	 *
	 */
	_word_jp1('迪士尼|迪斯尼|ディスティニー', '迪士尼'),

	_word_jp1('グラムハイド', '克拉姆海德'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	...lazymarks['clear_002'],

	...lazymarks['unit'],

	...lazymarks['class'],

	_word_en3('loli', '蘿莉'),

	[`一之型${sp}流`, `一之型・流`],

	[`黒杭`, `黒杭`],

	[`竜車`, `竜車`],

	[`風(聯|連)刃`, `風連刃`],

	[`暴君の(鎧|凱)`, `暴君之鎧`],

	//['工会|公会|行会', '公会'],
	['(?:工|公)(会)', '公$1'],

	[`治癒術(士|師)`, `治癒術士`],

	[`[RＲ][XＸ] *[-—] *[６6]{3}`, 'ＲＸ—６６６'],

	['闇凪', '闇凪'],

	['劉海|瀏海', '瀏海'],

	['竜騎士|竜騎兵', '竜騎兵'],

	['緊急離脱用転移魔法|緊急離散用轉移魔法', '緊急離脱用転移魔法'],

	['队伍成员|Party member', '隊伍成員', 'ig'],
	['小隊[（\(]party[\)）]|队伍|Party', '隊伍', 'ig'],

	['廣報志|広報誌', '廣報誌'],

	['電子語言', '電子語'],

	['沙拉曼達|色拉曼達|薩拉曼達', '沙拉曼達'],

	['魔法道具', '魔法具'],

	['避難人民', '避難民眾'],

	['黒髪呪縛|黑髪呪髪', '黒髪呪縛'],
	['黒鎖呪縛|黑鎖咒縛', '黒鎖呪縛'],

	[/^(報酬|期限|緊急委托|任務)[\?？]/gm, '$1・'],
	[/^(依賴主|委托人|委託方)[\?？]/gm, '委託人・'],
	[/^(依賴內容|委托內容)[\?？]/gm, '委託內容・'],

	['魔術士|魔法師|魔法士', '魔術士'],

	['独立遊撃権限?', '独立遊撃権限'],
	['独立行動権限?', '独立行動権限'],

	['鉄鬼団', '鉄鬼団'],

	['龙杀手', '屠龍者'],
	['DragonKiller', 'Dragon Killer'],
	['混沌魔獸混沌', '混沌魔獸'],

	['龍之心|dragon heart', '龍之心', 'ig'],
	_word_jp1('ドラゴンハート', '龍之心'),

	['(剣|角)(斗|闘|鬥)', '剣闘'],
	['漆黒諸神|漆黒众神|黑色眾神|黑之眾神', '漆黒諸神'],

	['来福枪|来复枪', '來福槍'],

	['白王桜|白樱王|「桜花」白王桜?', '白王桜'],
	['霊刀', '霊刀'],

	['霊刀「白王桜」|霊刀白王桜', '霊刀「白王桜」'],

	['起浮游|浮游羽毛', '浮游羽毛'],
	['绝怨鉈', '絶怨鉈'],
	['極悪食', '極悪食'],

	['白翼の天(?:秤|平)', '白翼の天秤'],

	['思考控制装置|思考制御装置|思想制御裝置', '思考制御装置'],
	[/(?<=思考制御装置』*[（“]*[ ]*)(天使之環|Angel Ring|天使環|天使指環)+/ig, '天使之環'],

	['心神守护的白羽《亚里亚 Guard Feather》|心神守护的白羽亚里亚・守护之羽|心神守護の白羽《亚里亚 Guard Feather》', '心神守護の白羽「亞里亞・守護之羽」'],
	['心神守護の白羽根?|心神守护的白羽', '心神守護の白羽'],

	...(function (): IWords[]
	{
		let ret = [

			[['獠?牙剣', '悪食'], '牙劍「悪食」'],
			[['餓狼之?剣', '悪食'], '餓狼劍「悪食」'],
			[['暴食牙剣', '極悪食'], '暴食牙剣「極悪食」'],

			[['咒怨铊', '腹裂'], '咒怨铊「腹裂」'],
			[['絶怨鉈', '首断|斩首'], '絶怨鉈「首断」'],

			[['霊刀', '白王桜'], '霊刀「白王桜」'],

		].reduce(function (a, b)
		{
			let c = [
				`(${b[0][0]})(?:[』」》）】]?[《（「『【？?・]+)(${b[0][1]})[』」》）】]?`,
				b[1] as string,
			];

			// @ts-ignore
			a.push(_word_zh.apply(null, c));

			c = [
				`(${b[0][0]})(${b[0][1]})`,
				b[1] as string,
			];

			// @ts-ignore
			a.push(_word_zh.apply(null, c));

			return a;
		}, [] as IWords[]);

		//console.log(ret);

		return ret;
	})(),

	['雷撃砲', '雷撃砲'],

	['雷撃砲', '雷撃砲'],
	['魔弾', '魔弾'],
	['(鋼)の魔王', '鋼の魔王'],
	['(炎)の魔王', '炎の魔王'],
	['(雷)の魔王', '雷の魔王'],
	['榴弾砲撃', '榴弾砲撃'],
	['蒼炎の守護', '蒼炎の守護'],
	['影空間', '影空間'],

	['加護|加佑', '加護'],
	['星墜', '星墜'],
	['黄金太陽', '黄金太陽'],
	['荷電粒子(竜|龍)砲', '荷電粒子竜砲'],
	['炮|砲', '砲'],
	['雷砲形態', '雷砲形態'],

	['聖堂結界', '聖堂結界'],

	['聖魅术|聖愛魅惑|聖愛魅了', '聖愛魅惑'],
	['肉体補填|肉体填補', '肉体填補'],
	['荷電(粒|离)子(砲|炮)', '荷電粒子砲'],
	['凍結領域', '凍結領域'],
	['精神防護', '精神防護'],
	['生命吸収', '生命吸收'],
	['神兵計画', '神兵計劃'],
	['腕力強化', '腕力強化'],

	_word_en3('GRIM EATER', '黑食白蛇'),

	[
		`[《（「『]\\w+[』」》）]`, function (...m)
	{
		return m[0].replace(/^([^\w]*)([a-z])/, function (...m)
		{
			return m[1] +m[2].toUpperCase();
		});
	}],
	[
		`[《（「『]\\w+${sp}\\w+[』」》）]`, function (...m)
	{
		return m.slice(1, 3).map(function (s)
		{
			return s.replace(/^([^\w]*)([a-z])/, function (...m)
			{
				return m[1] +m[2].toUpperCase();
			});
		}).join('・');
	}],
	[`[《（「『]\\w+(?:'\w+)?${sp}\\w+${sp}\\w+[』」》）]`, function (...m)
	{
		return m.slice(1, 4).map(function (s)
		{
			return s.replace(/^([^\w]*)([a-z])/, function (...m)
			{
				return m[1] +m[2].toUpperCase();
			});
		}).join('・');
	}],

	/**
	 *
	 */

	['([・，』」。、]) ', '$1'],
	[/([\u4E00-\u9FFF])[ ]*([・\?])[ ]*([\u4E00-\u9FFF])/g, '$1$2$3'],

	[`アインズ${sp}ブルーム`, 'アインズ・ブルーム'],

	[`… …`, '……'],

	//[/(白金|苍月|新阳|绿风|清水|远雷|初火)(?:[之の的])?(月)/g, '$1の$2'],
	[/(日珥|红炎)(?:[之の的])?(月)/g, '红炎の$2'],

	['凍土の月', '凍土の月'],

	['冰晶|[氷]晶', '冰晶'],

	['(?<=第.)の?(?:試練|考驗)', '試練'],
	['試練|考驗', '試練'],

	...([
		'凍土',
		'冥暗',
		'初火',
		'远雷',
		'绿风',
		'新阳',
		'苍月',
		'白金',
		'红炎',
		'凍土',
		'遠雷',
		'綠風',
		'新陽',
		'蒼月',
		'紅炎',
		'冻土',
		'冰晶',
		'氷晶',
		'清水',
	].reduce(function (a, b)
	{
		a.push(_word_zh(`${b}の?月`, `${b}の月`));

		return a;
	}, [])),

	//['问[道到]', '问到'],

	['黒', '黒'],

	['惡梦|噩梦', '噩梦'],
	['戰士', '戰士'],
	['競技場', '競技場'],
	[`女妓女`, '妓女'],
	[`闘技場|角斗场|角闘場`, '闘技場'],
	[`新闻报?纸|広報誌`, '新聞報紙'],

	[`(你|我)[两]`, '$1倆'],

	//[`壽絲`, '壽司'],

	[/^(「?[^“”\n]+)([“”])([^“”\n]+)\2/mg, '$1“$3”'],

	[/^”/mg, '“'],
	[/“$/mg, '”'],

	// 阿拉伯字元
	[/^([^\n]+[\u0600-\u06FF\u0750-\u077F][^\n]+)$/gm, '\n$1\n'],
	[/\n+([^\n]+[\u0600-\u06FF\u0750-\u077F])/g, '\n\n$1'],
	[/([\u0600-\u06FF\u0750-\u077F][^\n]+)\n+/g, '$1\n\n'],

	[
		/(月)的?(\s*[\d０-９一二三四五六七八九十][\d\s０-９一二三四五六七八九十]*)([日日号號])/g, function (...m)
	{
		m[2] = StrUtil.zh2num(m[2]).toString();

		m[2] = StrUtil.toFullNumber(m[2].replace(/\s/g, '')).trim();

		return m[1] + m[2] + '日';
	}
	],
	[
		/(第)(\s*[\d][\d\s]+)(話)/g, function (...m)
	{
		m[2] = StrUtil.toFullNumber(m[2]).trim();

		return m[1] + m[2] + m[3];
	}
	],

	[
		/第([\d０-９]+)使徒/g, function (...m)
	{
		let n = StrUtil.num2zh(StrUtil.toHalfNumber(m[1]));

		return `第${n}使徒`;
	}
	],

	[
		/(等级|等級)([一二三四五])/g, function (...m)
	{
		return m[1] + StrUtil.zh2num(m[2]);
	}
	],

	[
		/([二三四五])(级|級)/g, function (...m)
	{
		return StrUtil.zh2num(m[1]) + m[2];
	}
	],

	[/level ?(\d)(?!\w)/ig, '等級$1'],

	[
		/(等级|等級|Rank)([ ]*[\d０-９][ ]*)/ig, function (...m)
	{
		m[2] = StrUtil.toFullNumber(m[2]).trim();

		return '等級' + m[2];
	}
	],

	[
		/([ ]*[\d][ ]*)(级|級)/g, function (...m)
	{
		m[1] = StrUtil.toFullNumber(m[1]).trim();

		return m[1] + m[2];
	}
	],

	['[壹一]', '一'],

	['迸', '進'],

	[/[·\?]([一二三四五六七八九十](?:式|年|型))/ig, '・$1'],

	[
		/(第)([\_\t\uFEFF\xA0　 \d０１２３４５６７８９]+)(话|頁|夜|章|集)/g, function ($0, $1, $2, $3)
	{
		$2 = StrUtil.toFullNumber($2, {
			only: {
				number: true,
				space: true,
			},
		});

		let m;
		if (m = $2.match(/^(\D+)?(.+)(\D+)?$/))
		{
			let s = ((m[1] || m[3]) ? ' ' : '');
			let $2 = m[2].replace(/[^\d]+/ig, '');

			if ($2)
			{
				$2 = s + $2 + s;
				return $1 + $2 + $3;
			}
		}

		return $0;
	}
	],

	[
		/\d+/g, function (...m)
	{
		return StrUtil.toFullNumber(m[0]);
	}
	],

	_word_en(/\w/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}),

	[/\n,\n/g, '\n\n'],

	[/［/g, '「'],
	[/］/g, '」'],

	...lazymarks['4'],

	...lazymarks['ltrim'],

	[/([\u4E00-\u9FFF])\.(?!\.)/g, '$1。'],

	[/"([^\n"']*)'([^'"\n]+)'/gm, '"$1『$2』'],
	[/"([^\n"']*)'([^'"\n]+)'/gm, '"$1『$2』'],

	//[/^【([^【】\n]+)】/gm, '「$1」'],

	...lazymarks['0'],
	...lazymarks['1'],
	[/[【]/g, '「'],
	[/[】]/g, '」'],
	...lazymarks['2'],
	...lazymarks['3'],

	[/([^】\n])(\n【[^\n]+】\n)/g, '$1\n$2'],
	[/(\n【[^\n]+】\n)([^【\n])/g, '$1\n$2'],

	[/\n+#+\n+/gm, '\n\n\n'],

	[/\n+([\u0600-\u06FF\u0750-\u077F])/gm, '\n$1'],
	[/([\u0600-\u06FF\u0750-\u077F])\n+/gm, '$1\n'],

	...lazymarks['5'],

	[[
		`([《（「『【])`,

		`(`,

		`(?:[^《（「『【』」》）】\\n]{1,12})`,

		`(?:`,
		[
			`（\\w）`,
			`\\w`,
		].join('|'),
		`)?`,

		`)`,

		`([』」》）】])`,

	].join(''), function (...m)
	{
		let _skip;

		switch (m[2])
		{
			case '影空間':
			case '混沌魔獸':
			case '逆干渉':
			case '聖愛魅惑':
			case '進化':
			case '肉体填補':
			case '灯火':
			case '炎の魔王':
			case '鋼の魔王':
			case '雷の魔王':
			case '凍結領域':
			case '逆十字':
			case '精神防護':
			case '生命吸収':
			case '神兵計画':
			case '白の秘跡':
			case '腕力強化':
			case '逆干渉':
			//case 'The・Greed':

				m[1] = '『';
				m[3] = '』';

				break;
				/*
			case '元素支配者':
			case '君主之翼':

				m[1] = '『';
				m[3] = '』';

				break;
				*/
			default:
				_skip = true;
				break;
		}

		if (_skip)
		{
			return m[0];
		}

		return m[1] + m[2] + m[3];
	}],

	[[
		`([《（「『【])?`,

		`(?:`,

		`(`,
		[
			'牙劍',
			'餓狼劍',
			'絶怨鉈',
			'暴食牙剣',
			'心神守護の白羽',
		].join('|'),
		`)`,

		`(?:`,
		[
			[
				`(?:[《（「『【])`,

				`([^《（「『【』」》）】\\n]{1,10})`,

				`(?:[』」》）】])`,
			].join(''),

		].join('|'),
		`)`,

		`)`,

		`([』」》）】])?`,

	].join(''), function (...m)
	{
		let _skip;

		switch (m[2])
		{
			case '牙劍':
			case '餓狼劍':
			case '暴食牙剣':
			case '絶怨鉈':
			case '心神守護の白羽':

				m[1] = '『';

				m[3] = `「${m[3]}」`;

				m[4] = '』';

				break;
			default:
				_skip = true;
				break;
		}

		if (_skip)
		{
			return m[0];
		}

		return m[1] + m[2] + m[3] + m[4];
	}],

	...lazymarks['ln_0010'],

	['弾', '彈'],

]);

export const value = {
	chapter_id: '第{{0, toFullNumber}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,

	// 實驗性概念自動取代為已有的翻譯
	chapter_title_i18n: `$t({{$t(chapter_id, [{{0}}])　title}})`,

	volume_id: '第{{0, toFullNumber}}章',
};

export const resource = {

	i18n: {
		'リリィ': '莉莉',

		'ディアボロス・エンブレス': '恶魔的拥抱',

		'グリードゴア': '贪婪戈尔',

		'クロノＶＳグリードゴア（２）': '黑乃 VS 贪婪戈尔 （２）',

		'第３５２話　パーティー': '第３５２話　Party（队伍/宴会）',

	},

};

// 需要人工確認的屏蔽字或錯字用語等等
export const words_maybe = [

	// 沒有成功貼上的咒文
	/([^\n]{1,2})?([\?\—]{3,})([^\n]{1,2})?/mg,

	//'咒物',

];

export function words_callback(text: string): string
{

	text = lazymarks['ln_talk']
		.reduce((text: string, arr: [RegExp, string]) => {
			return text.replace(arr[0], arr[1])
		}, text)
	;

	return text;
}

export default exports as typeof import('./黑之魔王');
