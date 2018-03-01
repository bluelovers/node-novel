/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '奪う者　奪われる者';

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
export const words: IWords[] = sublib._word_zh_all([

	//['要取代的字', '取代後的字'],

	//[`优`, '优'],
	[`(悠+)(?!哉)`, function (...m)
	{
		return '优'.repeat(m[1].length);
	}],
	[`(?:悠|优)${sp}佐藤`, '优・佐藤'],

	['斯特拉|史黛拉', '史黛拉'],

	['妮娜|妮那', '妮娜'],
	[`妮娜${sp}涅瓦`, '妮娜・涅瓦'],

	['蕾娜|莱娜|莉娜', '蕾娜'],
	[`蕾娜${sp}芙亞娜`, '蕾娜・芙亞娜'],

	['玛丽法', '玛丽法'],
	[`玛丽法${sp}娜古苏`, '玛丽法・娜古苏'],

	/**
	 *
	 */
	['耶亞溫|伊恩', '伊恩'],
	['納玛利|納馬利|娜玛丽(?!法)|納玛尼', '納玛利'],
	['特娅', '特娅'],

	['岚|籣', '岚'],
	['可羅|科罗', '科罗'],

	/**
	 *
	 */
	['納玛利|納馬利|(?:娜|納)玛丽(?!法)|納玛尼', '納玛利'],
	['卡姆莉|凯姆莉', '卡姆莉'],
	['玛茲皮|瑪茲皮', '玛茲皮'],
	['婆婆|奶奶', '奶奶'],

	['オトペ|奧陶倍|歐多沛|奧托佩?', '歐多沛'],

	['欧諾德', '欧諾德'],

	['ネポラと|尼多拉', '尼多拉'],


	/**
	 *
	 */
	['卢瓦諾夫|魯瓦諾夫', '卢瓦諾夫'],
	['依毕卡|莉琵卡', '莉琵卡'],
	['芙拉維雅|芙拉維亞|弗拉維娅', '芙拉維亞'],
	['巴娜茉|玛納默|瓦纳', '巴娜茉'],

	['羆|羆|罴', '羆'],

	['梅兰妮|瑪納米', '梅兰妮'],

	['莫尼可|莫尼克|莫妮克|莫妮可', '莫妮可'],

	['亞姆|牙無|雅姆', '亞姆'],
	['亞戈馮|琼脂冯', '亞戈馮'],

	['古拉菲娜|格拉菲拉', '古拉菲娜'],
	['凱瑟琳|埃卡切丽娜', '埃卡切丽娜'],

	['貝魯|机理', '貝魯'],

	['阿丽亞娜|阿莉亞娜', '阿莉亞娜'],

	['狸人|貍人|狸人', '狸人'],
	['朴蔻日|波可莉', '波可莉'],

	['奴隷女仆见习|见习奴隷女仆', '见习奴隷女仆'],

	/**
	 * 利瑟鲁村
	 */
	['雷塞尔|利瑟鲁', '利瑟鲁'],

	/**
	 * 聖国
	 */
	['賈达尔克|贞德塔奴庫|日达尔克', '贞德塔奴庫'],
	['那姆卡|納姆卡', '納姆卡'],

	/**
	 * 自由国家
	 */
	['哈默尔(恩|嗯)|哈莫尔恩|哈梅伦', '哈默尔恩'],
	['基金山脉|奇金山脉', '奇金山脉'],
	['龙巢|竜之?巢', '竜之巢'],
	[`克里斯蒂${sp}沃尔顿`, '克里斯蒂・沃尔顿'],

	/**
	 * 卡莫
	 */

	['乌茲|伍茲', '乌茲'],
	['(乌|伍)，(乌|伍)茲', '乌，乌茲'],

	['卡玛|卡莫|加姆', '卡莫'],
	['卡(?:莫|馬)(?:都市|城市)|(?:都市|城市)卡(?:莫|馬)', '卡莫都市'],

	['慕卡|穆加', '穆加'],
	['拉利德|拉利特|拉力特', '拉利德'],
	['艾卡拉特|艾卡莱特', '艾卡莱特'],

	['(玛尔玛|玛璐玛)(?:(?:之|的)(森林?))', '玛尔玛森林'],

	['(?:利克里斯|利克利斯|匹克莉絲)(?:的?(酒吧))?', '利克利斯$1'],

	[`諾亞${sp}(?:帕茲斯|帕祖祖)`, '諾亞・帕茲斯'],

	[`皮埃特|皮耶特`, '皮耶特'],

	[`风向鸡亭|風向雞亭|風見鶏亭`, '风向鸡亭'],
	[`梅丽莎|梅莉塔`, '梅丽莎'],

	[`埃納尔`, '埃納尔'],

	[`警備会社|警備公司|保全公司|警备公司|保安公司`, '警備公司'],
	[`阿卢寇姆|阿魯寇姆`, '阿卢寇姆'],
	[`阿卢寇姆警備公司|警備公司阿卢寇姆`, '警備公司阿卢寇姆'],

	/**
	 *
	 */
	[`ムッス|穆斯`, '穆斯'],
	[`(?:鹫梓|杰特)${sp}(?:多蓝|波兰)`, '鹫梓・多蓝'],

	[`克劳蒂雅|克劳蒂亞|克劳薇雅|克劳迪亞`, '克劳蒂亞'],
	[`克劳蒂亞${sp}(?:瓦尔伦德|巴尔林格|瓦伦伍德)`, '克劳蒂亞・瓦尔伦德'],

	[`拉拉|菝菝|ララ`, '拉拉'],
	[`拉拉${sp}(?:桐浦亞|登布拉)`, '拉拉・桐浦亞'],

	[`魔劍姫ララ・トンブラー|魔劍姫拉拉・桐浦亞`, '魔劍姫拉拉・桐浦亞'],

	[`普莉妮|プリリ`, '普莉妮'],

	[`ヤークム|亞庫`, '亞庫'],
	[`ローレン|劳伦`, '劳伦'],

	[`ゴンロヤ|恭特亞`, '恭特亞'],

	[`ランポゥ|蓝波`, '蓝波'],
	[`前卫要らずのランポゥ|不需前卫的蓝波`, '不需前卫的蓝波'],

	[`一射一杀のマーダリー|一射一杀的馬达利`, '一射一杀的馬达利'],

	[`约瑟夫${sp}(?:幽魯姆|优魯姆|约魯姆|约尔姆|帕尔姆?)`, '约瑟夫・约魯姆'],

	/**
	 *
	 */
	[`莫非斯|莫菲斯`, '莫菲斯'],
	['阿黛尔', '阿黛尔'],
	['可蕾特|科莱特|柯莱特', '科莱特'],
	['芭尔芭拉|芭芭拉', '芭芭拉'],
	['艾达|埃达', '艾达'],

	['卡尔海因(?:茲|茨)', '卡尔海因茨'],
	[`卡尔海因(?:茲|茨)${sp}(?:昂达慕勒|安格穆勒)`, '卡尔海因茨・安格穆勒'],

	/**
	 * 昂斯加・佛德
	 * 昂斯加・罗特
	 */
	['佛德|罗特', '罗特'],

	/**
	 * 赤色流星
	 */
	['德利特|雷利特', '雷利特'],
	[`雷利特${sp}邦古`, '雷利特・邦古'],
	['红色流星|赤色?流星', '赤色流星'],

	[`(?:德利多|朵洛蒂)${sp}(?:彤|巴格)`, '朵洛蒂・彤'],

	[`索利德|索卢姆`, '索利德'],

	/**
	 *
	 */
	['莫?墨兰', '墨兰'],
	['貝儿|([^莫默])貝尔(?!德)', '$1貝儿'],

	/**
	 * 乌东
	 *
	 * 贵族
	 * 巴流・沃魯伊・諾克斯
	 * 巴流・奧魯・諾克斯
	 */
	['戈鲁巴多|格尔巴德', '格尔巴德'],

	['巴流|巴硫|巴渝', '巴流'],
	['バリュー・ヴォルィ(?:・ノクス)?|(?:巴流・)?沃利・諾克斯', '巴流・奧魯・諾克斯'],
	[`${sp}(?:沃魯伊|奧魯|福克|沃利)${sp}(?:諾克斯)`, '・奧魯・諾克斯'],

	[`弗朗索瓦${sp}(?:阿魯納魯迪|魯迪)`, '弗朗索瓦・阿魯納魯迪'],

	['ウードン|乌东|郎顿', '乌东'],
	['乌东王?国', '乌东王国'],

	['欧雷姆斯|布雷姆斯', '布雷姆斯'],

	['劳伦斯|勞倫斯', '劳伦斯'],

	[`伍德${sp}(?:佩因|佩恩)`, '伍德・佩恩'],
	[`木佩恩`, '伍德・佩恩'],

	[`商行`, '商会'],

	[`(?:維伦|貝魯|貝魯恩|比伦|貝伦|貝隆|貝卢恩|佩魯恩|ベルーン)(?:商会|公司|商行)|佩魯恩公司`, '貝魯商会'],

	[`(多利亞|多莱亞)商会`, '多莱亞商会'],

	[`(蒙佩多|蒙佩特)商会`, '蒙佩特商会'],

	[`特卡西|沛卡西|里卡西|腾卡师`, '沛卡西'],
	[`王都沛卡西|沛卡西王都`, '王都沛卡西'],

	[`卡萨之丘|卡萨山丘?`, '卡萨之丘'],

	[`帕拉姆|帕拉穆镇?|帕?拉穆镇`, '帕拉姆'],
	[`带来絶对的?胜利的?騎士|絶対なる勝利をもたらす騎士|必将带来胜利的?騎士`, '必将带来勝利的騎士'],

	[`四獣の?門`, '四獸之門'],

	/**
	 * 龍の牙
	 */
	[`(?:龍)之牙`, '龍之牙'],
	[`莱納${sp}(?:瓦尔德?|海尔特|瓦?尔德|赫尔德)`, '莱納・瓦尔德'],
	[`莱納(?:瓦尔德?|海尔特|瓦?尔德|赫尔德)`, '莱納・瓦尔德'],
	[`多米尼克`, '多米尼克'],
	[`鲍里斯|波里斯`, '波里斯'],


	/**
	 * 莫达利提教団
	 */
	['(因?莫达利提|不朽|因?莫达利亚|因达莫利提)教団', '不朽教団'],

	['克里亞|克利亞|戈利亞', '克利亞'],
	['多拉贡|多尔姆', '多拉贡'],
	['亞洁洛蒂|亞塞洛蒂|娅赛洛蒂', '亞洁洛蒂'],

	['不死的佣兵団|不死の?佣兵団', '不死的佣兵団'],

	['特佩|沛哲', '特佩'],
	['馬古諾特|馬格諾托', '馬古諾特'],

	['卡?波尔', '波尔'],
	['赛亞|瑟雅', '赛亞'],
	[`赛亞${sp}(?:罗斯|罗伯特)`, '赛亞・罗伯特'],

	/**
	 * 赛特
	 */
	['(泽多|赛特|布景)共和国', '赛特共和国'],

	/**
	 *
	 */
	['莫貝尔|默貝尔', '莫貝尔'],

	/**
	 * 德利姆
	 */
	['德利姆|德轮辋|数据轮辋|不德轮辋|轮辋|德里安', '德利姆'],

	/**
	 * 迷宫
	 */
	['迷宮|迷宫', '迷宮'],
	['腐界(?:之|的)?恩利欧|腐界(?:之|的)?因弥欧', '腐界的因弥欧'],
	['哥尔哥|戈尔多', '戈尔多'],

	['(?:骷髅|戈尔多)(?:之|的)?迷宫|ゴルゴの迷宮', '戈尔多的迷宮'],
	['(?:巴罗特|巴洛特|巴尔乐天)(?:之|的)?庭?(园|院)', '巴罗特庭园'],

	['(?:妖树|樹妖)(?:园|園)(?:之|的)?迷宫|妖园的迷宫|妖樹園の迷宮', '妖树园的迷宮'],

	['夏路朵(?:之|的)?密林|亞旮尔多(?:之|的)?密林', '夏路朵密林'],

	['虚幻之箱|空虚之箱', '空虚之箱'],
	['基路姆|格林姆', '格林姆'],


	/**
	 *
	 */
	['旭雷卡|赛卡', '旭雷卡'],

	['貝宁托斯|貝納图斯|ベナントス', '貝納图斯'],

	['西斯哈的坠饰|西斯哈的项炼', '西斯哈的项炼'],

	[`黑竜${sp}(?:牙|爪|烛)`, '黑竜・$2'],

	//[`竜`, '竜'],
	[`龍`, '龍'],
	[`木竜`, '木龍'],
	[`黑竜`, '黑竜'],

	/**
	 *
	 */

	(function ()
	{
		let jobclass = '(?:魔术师|盗贼|暗杀者|魔女|调教师|虫使)';

		return [`${jobclass}${sp}${jobclass}`, '$1・$2'];
	})(),

	['象是|像是', '像是'],

	['地球之?墙|土墙', '土墙'],
	['時空魔法', '時空魔法'],
	['创草树诞辰|創草樹誕', '創草樹誕'],
	['悪魔の牢獄', '惡魔の牢獄'],
	['龍の息吹', '龍の息吹'],
	['大地割壁', '大地割壁'],
	['暗黒鎧', '暗黒鎧'],
	['真理追究|真理追求', '真理追究'],
	['钢子弹', '钢弹'],


	['工会|公会|行会', '公会'],
	['村姑|村女儿?', '村女'],

	['贫民窟|平民窟|贫民区|贫民街', '贫民窟'],

	['玛多卡|馬卡|馬多卡', '玛多卡'],

	['闘志', '闘志'],
	['階級|級别', '階級'],
	['(斗|闘)技', '闘技'],
	['哥?(哥布尔|哥布林|歌布林|股布林|哥不林)', '哥布林'],
	['黑色?哥布林', '黑色哥布林'],
	['乌东灰熊|奧东灰熊', '乌东灰熊'],
	['妖怪|怪物', '怪物'],

	...([
		'LV',
		'HP',
		'MP',
	].map(function (value)
	{
		return ['([^\\w０-９Ａ-Ｚ])' + value.split('').concat('').join('[ ]?') + '(?![\\w０-９Ａ-Ｚ])', '$1' + StrUtil.toFullEnglish(value), 'ig'];
	})),

	[/([^\w\u00C0-\u017F\.μ・·?‧•―-])([\w])(?![\w\u00C0-\u017F\.μ・·?‧•―-])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}],

	//[/^([^\n\w]{2,3}?：[^\?\n]+)\?(?!\?)/gm, '$1・'],
	[/(：[^\?\n]+)\?(?!\?)/gm, '$1・'],

	[/^[　 ]+/gm, ''],

	[/゛/g, '─'],

	[/[\[【]/g, '「'],
	[/[\]】]/g, '」'],

	[/\d+/g, function (s)
	{
		return StrUtil.toFullNumber(s);
	}],

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

]);

//console.log(words);

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
