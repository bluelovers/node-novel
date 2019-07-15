/**
 * Created by user on 2017/12/21/021.
 */

import lazymarks from '@node-novel/layout-pattern/lib/core/pattern/index';
import { _word_en, _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp, sp2 } from '@node-novel/layout-pattern/lib/core/const';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = 'ウォルテニア戦記';

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

	//['要取代的字', '取代後的字'],

	//['— —', '——'],

	['御子柴', '御子柴'],
	['亮真', '亮真'],

	['奧爾特梅亞|奧德梅亞|奥特梅亚|奥路托米亚|奥德梅亚|奥德梅亚|オルトメア|奧德美亞|奧多梅亞|奧德梅西亞', '奧德梅亞'],


	['夏蒂娜|夏鲁缇娜|夏迪娜|シャルディナ|夏迪婭|夏爾蒂娜', '夏蒂娜'],
	['艾森海持|艾森海特|アイゼンハイト', '艾森海特'],

	[`夏蒂娜${sp}艾森海特`, '夏蒂娜・艾森海特'],
	[`夏蒂娜${sp2}艾森海特`, '夏蒂娜・艾森海特'],

	_word_jp1('ライオネル', '萊諾'),

	['玛飞锡特|瑪飛錫特|玛非菲锡|玛非锡特|马尔菲斯特|梅尔菲斯|馬爾菲斯特|瑪爾菲斯特|マルフィスト|瑪菲斯特', '瑪菲斯特'],

	// 勞拉 賽拉
	['萨拉|莎拉|サーラ', '莎拉'],
	// 勞拉
	['萝拉|ローラ', '蘿拉'],

	['斉藤', '斉藤'],
	['須藤', '須藤'],

	_word_jp1('盖耶斯|盖亚西|该耶斯|ガイエス|蓋亞西', '蓋耶斯'),
	_word_jp1('瑟里雅|セリア|瑟里亞|西莉亞', '瑟里雅'),
	['渥朗多|ウォークランド', '渥朗多'],


	_word_jp1('沃特尼亞|ウォルテニア|沃爾特尼亞', '沃特尼亞'),

	_word_jp1('ロルフ', '羅爾夫'),

	/**
	 * @todo 第二章
	 */
	// #25 #26
	['纱雅|咲耶|咲夜|佐久夜', '咲夜'],

	_word_jp1('メルティナ|纳尔蒂娜|梅爾緹娜|纳尔迪娜|梅尔蒂娜', '梅爾緹娜'),

	_word_jp1('貝爾格斯通|伯格顿|贝尔古斯通|貝爾古斯通|伯格頓|ベルグストン|貝爾加斯頓|貝爾古斯通|貝爾加斯通', '貝爾古斯通'),

		_word_jp1('フリオ|弗里奧', '弗里奧'),
	['格哈德|格哈特|格魯哈魯特|格哈魯|蓋爾哈特|ゲルハルト', '格魯哈魯特'],


	['平民公主|庶民公主', '庶民公主'],
	['露碧丝|露比丝|露碧絲|ルピス|露碧斯', '露碧絲'],

	_word_jp1('霍城|霍德拉姆|霍洛兰|鼓城|忽多蘭|忽德兰|アーレベルク|霍德拉姆', '霍德拉姆'),

	['大厅鼓?将军', '霍德拉姆將軍'],

	_word_jp1('納迪妮|拉迪娜|ラディーネ|拉蒂尼', '納迪妮'),

	['李尔王国', '羅賽里雅王国'],

	['羅赛里亚努斯|ローゼリアヌス|羅賽里雅努斯', '羅賽里雅努斯'],
	['羅赛里亚|罗泽利亚|羅賽里亞|罗赛里雅|罗萨里亞|ローゼリア|罗萨利亞|羅賽里亞|罗杰里亞|羅塞莉亞|羅賽里雅|羅塞裏雅', '羅賽里雅'],

	['米海爾|米歇尔|米海尔|ミハイル', '米海爾'],
	['邦納|帕納修|那修斯|バナーシュ', '帕納修'],


	_word_jp1('艾蕾娜|埃琳娜|艾莲娜|艾琳娜|エレナ|艾莉娜|艾丽娜|埃里娜', '艾蕾娜'),

	['斯坦納|施泰奈|シュタイナー|施泰納', '斯坦納'],

	[`艾蕾娜${sp}斯坦納`, '艾蕾娜・斯坦納'],

	_word_jp1('比雷埃夫斯|匹雷烏斯|ピレウス|匹勒鳥斯', '匹雷烏斯'),

	// @todo 紅獅子
	// 里昂
	_word_jp1('莉欧奈|黎歐內|麗歐奈|丽欧奈|丽奥奈|リオネ', '莉歐奈'),
	['波尔茨|波爾斯|波爾次|伯罗斯|波爾茲|波爾茨|ボルツ', '波爾茨'],

	['紅獅子', '紅獅子'],

	['嚴翁', '嚴翁'],
	['伊賀崎', '伊賀崎'],
	['竜斎', '竜斎'],

	_word_jp1('ノティス|魯提斯|諾提斯|諾蒂斯|諾第斯', '諾提斯'),

	_word_jp1('グレッグ|格雷戈|格雷格', '格雷戈'),
	_word_jp1('ムーア|摩爾|穆亞|穆爾', '穆亞'),

	//['沃特尼亚'],

	_word_jp1('ザルーダ|賽魯达|查魯達|扎卢达|薩魯達|扎魯达', '查魯達'),

	['佩爾弗尼亞|ペリフェリア|佩里菲利亞|佩裡非亞', '佩里菲利亞'],

	_word_jp1('凱尔|ケイル|凱文', '凱爾'),
	_word_jp1('伊路尼亞|イルーニア|伊爾尼亞', '伊路尼亞'),

	[`凱爾${sp}伊路尼亞`, '凱爾・伊路尼亞'],

	['梅莉莎|梅丽莎', '梅莉莎'],



	/**
	 * @todo 第三章
	 */
	_word_jp1('尤利亚|尤莉娅|尤莉亞|ユリア', '尤莉婭'),

	_word_jp1('扎尔茨贝格|扎尔茨堡|扎茨尔伯格', '扎爾茨堡'),
	['扎尔茨|扎茨尔|萨尔茨', '扎爾茨'],

	_word_jp1('希莫奴|希莫里|シモーヌ', '希莫奴'),
	_word_jp1('克里斯托夫|クリストフ|克理斯托夫|克里斯多福', '克里斯托夫'),

	[`希莫奴${sp}克里斯托夫`, '希莫奴・克里斯托夫'],
	[`希莫奴${sp2}克里斯托夫`, '希莫奴・克里斯托夫'],

	_word_jp1('托瑪斯|トーマス|湯瑪斯|湯馬斯', '托瑪斯'),

	//-------------------


	_word_jp1('ザクス', '薩克斯'),

	['米耶尔斯|密斯托尔|米斯托尔|ミストール', '密斯托爾'],
	['伊庇鲁斯|伊匹洛斯|伊畢洛斯|伊庇罗斯|イピロス|伊比洛斯', '伊匹洛斯'],

	_word_jp1('克里斯|クリス', '克里斯'),

	['梅丽萨|梅丽莎|梅利薩', '梅丽莎'],

	[/([斯娅奴婭])\?(扎爾茨堡|克里斯托夫)/g, '$1・$2'],

	['约书亚|喬書亞|ジョシュア', '約書亞'],
	['佩爾哈雷斯?|贝哈雷斯|配爾哈雷|貝爾哈雷斯|ベルハレス|貝哈勒斯', '佩爾哈雷斯'],
	[`約書亞${sp}佩爾哈雷斯`, '約書亞・佩爾哈雷斯'],
	[`約書亞${sp2}佩爾哈雷斯`, '約書亞・佩爾哈雷斯'],

	/**
	 * @todo 第四章
	 */
	['西里歐斯|セイリオス|西利歐斯', '西里歐斯'],

	['西蒙尼|西蒙娜', '西蒙娜'],

	['ラフィール|拉斯菲魯', '拉斯菲魯'],

	_word_jp1('ミスト|米斯托|米斯特', '米斯托'),

	_word_jp1('ユリアヌス|尤利安(?:努斯)?|朱利叶斯|尤里安(?:努斯)?|尤里努斯?', '尤里亞努斯'),

	/**
	 * 有嚴重BUG 需要人工修正 這三個人名 (推薦在原始檔的部分將名字改成原文名，部分章節會同時出現)
	 *
	 * 格拉德 格拉霍特 古拉哈魯多
	 * グラハルト 格拉德 格拉霍特 古拉哈魯多 戈拉哈點
	 * グリード 古利多 格麗特 格拉德 (男)
	 * ゲルハルト 格拉德
	 */
	_word_jp1('格拉哈特|格拉霍特|グラハルト|格拉德|格拉哈尔特|格拉斯哥|古拉哈魯多|戈拉哈點|戈拉哈特|古蘭哈魯托', '古拉哈魯多'),
	_word_jp1('ヘンシェル|亨舍爾', '亨舍爾'),

	['施?巴茲海姆|什巴茨海姆|シュバルツハイム', '施巴茲海姆'],


	['奧森|オーサン', '奧森'],
	_word_jp1('古利多|グリード|古魯多', '古利多'),
	[`奧森${sp}古利多`, '奧森・古利多'],


	['艾尼斯戈亞|エルネスグーラ|伊特梅斯弗拉|伊雷斯古拉|伊蕾斯古拉|依雷斯古拉', '伊雷斯古拉'],


	['エクレシア|艾絲妮婭|艾克勒西亞|艾克勒希婭', '艾克勒希婭'],
	['マリネール|瑪蓮娜|馬里內爾', '馬里內爾'],

	_word_jp1('メンフィス', '梅茵斯茨達'),

	_word_jp1('アーノルド', '阿諾德'),
	_word_jp1('グリッソン|格里森|格林森', '格里森'),
	[`阿諾德${sp}格里森`, '阿諾德・格里森'],

	_word_jp1('グリンディエナ|戈林蒂爾娜|格林迪愛娜', '格林迪愛娜'),
	_word_jp1('エルネシャール', 'エルネシャール'),

	_word_jp1('ドライゼン', '朵蘭萊森'),

	['北の雌狐|北方の?母狐狸|北方の?女狐狸', '北之雌狐'],
	['雌狐|女狐狸', '雌狐'],

	_word_jp1('烏莎絲|巫沙司|ウシャス', '巫沙司'),


	_word_jp1('リスノルス', '里斯諾爾斯'),

	/**
	 * @todo 第5章
	 */
	_word_jp1('ガレオン船|蓋輪帆船|加利恩帆船', '加利恩帆船'),

	_word_jp1('ジェームス', '詹姆斯'),
	_word_jp1('カーター', '卡特'),

	_word_jp1('キルタンティア|庫威唐堤|基爾坦蒂亞|吉魯丹提亞|基爾蒂亞', '基爾坦蒂亞'),

	[/(<+|≪)Big Eater(>+|≫)/ig, '≪Big Eater≫'],

	_word_jp1('ケビン', '凱爾'),
	_word_jp1('リック', '瑞克'),
	_word_jp1('ナンバーツー', '安娜斯塔西亞'),
	_word_jp1('ドノバン', '多諾班'),
	_word_jp1('ロイド', '羅伊德'),

	_word_jp1('エリオット', '艾略特'),
	_word_jp1('チェンバレン', '錢伯倫'),

	_word_jp1('レクター', '萊克特'),


	_word_jp1('賽魯夫|澤雷夫|ゼレーフ', '澤雷夫'),
	_word_jp1('艾爾南|エルナン', '艾爾南'),


	_word_jp1('アーレベルグ|阿雷貝爾克|阿德盧德', '阿雷貝爾克'),

	_word_jp1('トリストロン|托里斯托隆', '托里斯托隆'),

	_word_jp1('納爾西奧斯|內西歐斯|ネルシオス', '納爾西奧斯'),

	_word_jp1('羅伯特|ロベルト', '羅伯特'),
	_word_jp1('貝爾特蘭|ベルトラン', '貝爾特蘭'),


	_word_jp1('加爾貝拉|ガルベイラ', '加爾貝拉'),

	_word_jp1('希格尼斯|シグニス', '希格尼斯'),

	_word_jp1('艾爾梅達|エルメダ', '艾爾梅達'),

	_word_jp1('ドイル', '道爾'),

	_word_jp1('エリングランド', '艾琳古蘭多'),

	_word_jp1('バエンナ', '巴恩納'),

	_word_jp1('マイク', '麥克'),

	_word_jp1('ウォルス|沃爾斯|威爾斯', '沃爾斯'),
	_word_jp1('フルザード|弗沙德|弗爾扎德', '弗爾扎德'),

	_word_jp1('ミューヘバッハ', '繆赫巴赫'),
	_word_jp1('アステリア', '阿斯特利雅'),

	_word_jp1('イラクリオン|依拉庫裡母|伊拉克裏恩|依拉克里昂|伊利克利翁', '伊拉克里恩'),


	_word_jp1('カール', '卡爾'),
	_word_jp1('アッカーマン', '阿克曼'),

	_word_jp1('マクマスター', '馬克麥斯塔'),
	_word_jp1('ディグル', '迪格魯'),
	_word_jp1('ロゼッタ', '羅塞塔'),
	_word_jp1('グラッド', '格萊德'),

	_word_jp1('エルネスト|朵涅斯特|埃爾內斯特|歐內斯特', '埃爾內斯特'),

	_word_jp1('ブルクハイド', '布魯克海德'),
	_word_jp1('ハインベル', '海因貝爾'),

	_word_jp1('レナード', '雷納德'),
	_word_jp1('オルグレン', '奧爾格倫'),



];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	//-------------------------

	_word_jp1('佩里戈爾', '佩里戈爾'),
	_word_jp1('莫里斯', '莫里斯'),

	[/(<\<+|≪)([^\n]+)(>\>+|≫)/gm, '≪$2≫'],

	['暴風', '暴風'],
	['暗[道巷]理', '暗巷裡'],
	['暗道', '暗巷'],
	['禁衛', '近衛'],

	['無可奈可', '無可奈何'],

	[/被?(?:异世界召唤|召唤到异世界|召唤到异世界|召喚到異世界)後?的?第?(\d+)[日天]目?/gm, '異世界召喚第$1日'],

	[/(异世界召唤第?\d+[日天]目?|第\d+[日天])([^\n]*)[\[「\{（]([^\]\n]+)[\]」\}）]/gm, '$1$2【$3】'],

	[/(异世界召唤第\d+日[^\n]*)[ ]+(【)/gm, '$1$2'],

	[/(异世界召唤第\d+日[^\n]*)(\:)?\n+/g, function (...m)
	{
		if (m[2])
		{
			m[2] = StrUtil.toFullWidth(m[2]);
		}
		else if (typeof m[2] == 'undefined')
		{
			m[2] = '';
		}

		return `${m[1]}${m[2]}\n\n`;
	}],

	['召喚|召換', '召喚'],

	['赤果+', function ($0)
	{
		return $0.replace(/果/g, '裸');
	}],

	['加增', '增加'],
	['選擇肢裡', '選擇裡'],
	['關西(?!方|邊)', '關係'],

	['的媽？', '的吗？'],

	['想到的注意', '想到的主意'],
	['尽然回事', '竟然會是'],
	['尽然', '竟然'],
	['、廉贞', '、亮真'],
	['能上站成', '能上战场'],
	['撤退站', '撤退战'],

	['只道先带', '只到先代'],
	['少侠|少主', '少主'],

	[/強\(女女女\)/g, '強姦'],

	[/\*{2,3}ノ本/, '日ノ本'],

	[/\[/g, '「'],
	[/\]/g, '」'],

	[/(?!<\w)\/\/+(?!\w)/g, ''],

	[/^---$/gm, '－－－'],
	[/\n+\-+\n+/gm, '\n\n\n'],
	[/^　/gm, ''],

	...lazymarks['4'],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],

	...lazymarks['3'],
	...lazymarks['5'],

	[/^([^\n"“”「」]*)["“]([^\n"“”「」]*)["”]/gm, '$1「$2」'],
	[/\{([^\n\{}【】「」]*)\}/gm, '【$1】'],
	[/^([^\n"“”『』]*)["“]([^\n"“”『』]*)["”]/gm, '$1『$2』'],

	[',', '、'],

	[/\d+[：:]/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	}],

	[/([\u4E00-\u9FFF])\.(?!\.)/g, '$1。'],

	[/\n([ ]*[^：\n]+)\n+[ ]*([^：\n]+：[^\n]*)/ug, '\n$1\n\n$2'],
	[/\n[ ]*([^：\n]+：[^\n]*)\n+([ ]*[^：\n]+\n)/ug, '\n$1\n\n$2'],



	[/(\n)[　\u3000　　]{2,}/g, '$1　'],

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

export default exports;
