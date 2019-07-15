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
 * 改成小說名字
 */
export const lang = '異世界迷宮の最深部を目指そう';

/**
 * 其他用途
 *
 * @type {{chapter_id: string; chapter_title: string; volume_id: string; volume_title: string}}
 */
export const value = {
	chapter_id: '{{0}}',
	chapter_title: `$t(chapter_id, [{{0}}]).{{title}}`,

	volume_id: '第{{0}}章',
	volume_title: `$t(chapter_id, [{{0}}])：{{title}}`,
};

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['相川[・、 \\?]*(漩(?:涡|渦)波?浪?|漩?(?:涡|渦)波浪?)', '相川渦波'],
	['漩?(?:涡|渦)波浪?', '渦波'],
	['(陽|阳)滝|阳滝', '陽滝'],
	['涡|渦', '渦'],

	['奇利斯特|キリスト|Cristo|基督|基督', '基督'],
	_word_jp1('ユーラシア', '歐亞'),

	[/基督[・、 \?]*(?:欧|歐)亞/g, '基督・歐亞'],

	[/(?:帕|柏)(?:林|里)[・\?]?(科隆|库洛|克隆)/g, '帕林庫洛'],

	[
		'(?:拉|菈)?(?:丝|絲|斯|师)((?:蒂|緹|提|缇|塔)(?:娅|婭|亚|亞|雅)(?:拉|菈)|(?:蒂|緹|提)(?:拉|菈){2})|拉?斯提娅拉|拉斯提拉亚|菈絲蒂娅菈雅拉|拉斯提|ラスティアラ',
		'拉絲緹娅拉',
	],
	['((?:蒂|緹|提|缇|塔)(?:娅|婭|亚|亞)(?:拉|菈)|(?:蒂|緹|提)(?:拉|菈){2})|提娅拉', '緹婭拉'],
	['(?:拉|菈)・(?:丝|絲|斯|师)・(?:蒂|緹|提|缇|塔)・(?:娅|婭|亚|亞)・(?:拉|菈)', '拉・絲・緹・婭・拉'],
	['(?:蒂|緹|提|缇|塔)・(?:娅|婭|亚|亞)・(?:拉|菈)', '緹・婭・拉'],

	_word_jp1('ディアブロ', '迪亞波羅'),
	_word_jp1('シス', '西斯'),

	['迪亚(?:布|波)罗', '迪亞波羅'],
	['((?:迪|緹|缇)(?:亚|亞)|迪尔|蒂亚|迪娅)(?!(?:布|波|拉|菈))', '緹亞'],
	_word_jp1('ディア', '緹亞'),

	['鬼怪・西斯|暗黑破坏神・顺', '迪亞波羅・西斯'],

	['(?:亚|阿)爾(?:緹|缇|提|堤)|貂卫|亚尔提', '阿爾緹'],
	_word_jp1('アルティ', '阿爾緹'),

	['骐骐|骐达|堤达|(?:骐|緹|缇)達', '緹達'],

	['ヘルヴィルシャイン|贝魯維尔赛因|赫勒比勒夏因?', '赫勒比勒夏因'],
	['フランリューレ|芙兰琉(?:菈|蕾|莱)?', '芙蘭琉萊'],
	['珐琅|芙蘭', '芙蘭'],

	_word_jp1('莱亚|莱纳|ライナー', '萊納'),

	[/(斯诺|雪)[\?・ ]*『?沃克』?/g, '斯諾・沃克'],
	['格连|格伦', '格連'],

	_word_jp1('斯諾|スノウ', '斯諾'),
	_word_jp1('林克尔|ウォーカー', '沃克'),

	['维鲁|威爾', '威爾'],

	['珐妮亚|(?:玛|瑪|瑪)(?:利|莉|麗|丽|利)亞|マリア', '瑪利亞'],
	_word_jp1('迪斯特拉斯|ディストラス', '迪斯特拉斯'),

	['蕾缇|蕾蒂|菈缇', '蕾蒂'],
	[/雷迪安特\-塞拉/g, '塞拉・蕾蒂安忒'],
	['雷迪安特|蕾蒂安忒|雷提安顿|レイディアント|雷迪安特', '蕾蒂安忒'],
	['瑟拉|塞拉|赛菈', '塞拉'],

	['カイクヲラ|卡伊库欧拉', '卡伊庫歐拉'],
	['ラグネ|拉格涅|拉古涅|娜谷奈', '拉古涅'],

	['ハイン', '哈因'],

	['ホープス|(?:霍|候|侯)普(?:思|斯)|候普斯', '霍普思'],
	['ジョークル|乔科尔|久庫路', '喬科爾'],

	['日樱|琳|(?:林|玲|琳)(?=[桑]|小姐|他们)', '日樱'],

	['克罗|乌鸦|克劳', '克羅'],

	['レヴァン|雷安|雷文|莱文', '萊文'],

	_word_jp1('フェーデルト|斐勒卢托|斐勒迪托|菲德魯托', '斐勒盧托'),

	//雷琪
	// 雷鲁·桑库斯

	//艾利巴茨·利拜斯

	['艾鲁米拉德|艾尔米拉德|艾路米納多', '艾爾米拉德'],
	['希塔尔克|希达尔克|西塔卢庫', '希達爾克'],

	//阿尼艾斯·柯鲁娜
	['阿尼艾斯|艾格尼斯', '阿尼艾斯'],

	//海莉·维斯普洛佩
	//西娅・勒伽西

	_word_jp1('ローウェン', '諾文'),
	['莉帕', '莉帕'],

	['洛德|罗德|羅德', '羅德'],
	[/罗德[・、 \?]*緹緹/g, '羅德・緹緹'],
	['蒂蒂', '緹緹'],

	['贝丝|贝斯', '貝絲'],

	/**
	 * 使徒
	 */
	_word_jp1('ディプラクラ|迪普拉庫拉', '迪普拉庫拉'),
	_word_jp1('レガシィ|勒伽希|勒伽西', '勒伽西'),

	/**
	 * @todo
	 */

	[/((維|维|維|纬|維)(?:尔|数|數|度|数|数)|Dimension|dhimennshonn|Ｄｉｍｅｎｓｉｏｎ)(?![\u4E00-\u9FFF])/ig, 'Dimension'],

	_word_jp1('ディメンション', 'Dimension'),

	['Freeze|冻结|冰结|冰洁', '凍結', 'ig'],

	['Connection', '連接', 'ig'],
	['鏈接', '連接'],

	['Fo[ar]m(（泡沫）)?', '形式', 'ig'],

	['利特尔降雪|利特尔斯诺|little snow', '利特爾降雪', 'ig'],

	[/(Fire|Ｆｌａｍｅ|Flame|Flmae)[・ 　]*(arrow|Ａｒｒｏｗ)/ig, '炎之矢'],
	[/Light[・ 　]*Arrow/ig, '光之矢'],
	[/Wind[・ 　]*Arrow/ig, '風之矢'],
	[/Ice[・ 　]*Arrow/ig, '冰之矢'],

	[/Wind[・ 　]*Flame?berge/ig, '風刃劍'],
	[/(Ice|冰)[・ 　]*Flame?berge/ig, '冰結劍'],

	[/Flame[・ 　]*Wolf/ig, '炎狼'],
	[/Jewel[・ 　]*Fish/ig, '寶石魚'],
	[/Ｑｕａｒｔｚ[・ 　]*Ｃａｎｓｅｒ/ig, '石英巨蟹'],
	[/Ｒｉｏ[・ 　]*Ｅａｇｌｅ|Rio[・ 　]*Eagle|リオeagle/ig, '里約鹰'],
	[/Ｆｌａｍｅ/ig, 'Flame'],

	[/Riosheth[・ 　]*Eagle/ig, 'Riosheth Eagle'],
	[/Sky[・ 　]*Runner/ig, 'SkyRunner'],
	[/Living[・ 　]*Legend/ig, 'Living Legend'],
	[/Xiphias[・ 　]*Spear/ig, 'Xiphias Spear'],

	[/Distance[・ 　]*Mute/ig, 'Distance Mute'],

	//Tidal Wave

	['次元[・ ]*雪', '次元・雪'],
	['(次元|維度)・决戦演算', '維度・決戰演算'],

	['次元魔术|次元魔法|魔法次元', '次元魔術'],
	['技能|技艺', '技能'],
	['怪兽|怪物|monster|Ｍｏｎｓｔｅｒ', '怪物', 'ig'],
	['急速箭|赶造箭|(?:冰|冻)结(?:矢|箭)', '冰結矢'],
	['(?:冰|冻)结劍', '冰結劍'],
	['过捕护|过载|过度捕护', '過载'],
	[/([^\w])(mp|ＭＰ)(?![\w])/ig, '$1MP'],
	[/([^\w])(hp|ＨＰ)(?![\w])/ig, '$1HP'],

	['[战戦]演算', '戦演算'],

	['Fly[・ ]*Frame|ファイアフライ|中级火焰腾空|飞火|萤火|fire[・ ]*fly|Ｆｉｒｅ[・ ]*ｆｌｙ', '萤火', 'ig'],
	['火焰?之(箭|剑)', '炎之$1'],
	['フレイムフランベルジュ|Flame[・ ]*(火焰|炎)之?剑|(Flame|Flmae)[・ ]*Flame?berge|(火焰|炎)之?(剑|劍)', '炎之劍', 'ig'],

	['『Flamberge』', '『炎之劍』'],

	['ミドガルズブレイズ|耶梦加得之炎', '耶夢加得之炎'],
	['耶梦加得|Miðgarðsormur', '耶夢加得', 'ig'],

	['ゼーア・?ワインド|The Wind|Zitteruto・Wind|Zeea・Wind', '风卷'],

	['Ice|冰', '冰', 'ig'],

	[/Stat[ue]s|Ｓｔａｔｕｓ/ig, '狀態'],
	[/Skill/ig, '技能'],
	[/Rank|Ｒａｎｋ/ig, '級別'],

	['魔石?线', '魔石線'],
	['(阿(?:雷|瑞)亞?斯|阿瑞斯|那个椅子)家の?(?:宝|寶|直)劍', '阿雷亞斯家的宝劍'],
	['(阿(?:雷|瑞)亞?斯|阿瑞斯)', '阿雷亞斯'],
	_word_jp1('アレイス', '阿雷亞斯'),
	['(激突|撕裂)者?比德尔', '撕裂者比德爾'],

	['新月琉璃((?:的|の|制|之)?(?:直|宝)劍)', '新月琉璃直劍'],

	['Rokh[・ ]*Bringer', '墮落使徒', 'ig'],

	//風之理的盜竊者

	[/(之)?理的(?:盜竊?|竊盜?)(?:者|贼)/g, '$1理的盜竊者'],
	//[/盜(.{1,2})之理/g, '$1之理的盜竊者'],

	[/Crystal[・ ]*Ant|水晶蚁/ig, '水晶蟻'],

	['世界奉還陣', '世界奉還陣'],

	['魔石人类|魔石人间', '魔石人類'],
	['Jewel Cross', '魔石人類'],

	['天上の?七?騎士', '天上的七騎士'],
	_word_jp1('セレスティアル・ナイツ', '天上的七騎士'),

	['艾尔乌纳|阿尔十字', '艾爾烏納'],

	['フューリー|暴怒者|激怒者|弗利', '暴怒者'],

	//['『显示』', '『表示』'],
	//['[『「](携带品|物品|所有物|持ち物)[』」]', '『携带品』'],

	/**
	 * @todo 国
	 */

	['(巨型移动|移动巨型|巨型|此大|巨大)(剧场|演剧)船?|巨大演剧船', '巨型演剧船'],
	['(剧场|演剧)船|演剧船', '演剧船'],

	['一[之ノ]月(?:联|连)(?:盟|合)国(?:综|総)合(?:骑|騎)士(?:团|団)种?舞踏?会', '一之月聯合國綜合騎士團舞會'],
	['ヴアルフウラ|ヴアルフアラ', '瓦爾法拉'],

	['舞(?:斗|闘)(大?)会', '舞闘$1會'],

	['弗茲亚茲|弗祖雅族|弗兹亚兹|(弗|符|拉|莱)(茲|兹|祖|滋|茨|茲)(亚|雅|亞)(茲|兹|族|滋|茨|茲)|フーズヤーズ|弗茨亞茨|弗茲亞茲', '弗茨亞茨'],
	['(連|联|聯)合(国|國)', '聯合國'],
	['ヴァルト|(?:瓦|瓦)爾德|巴鲁多|巴鲁德|法尔特|沃尔特', '瓦爾德'],
	['帕尼亚|发内尔|法尼亞|菲尼亚', '帕尼亞'],

	_word_jp1('ファニア', '帕尼亞'),

	_word_jp1('レギア', '歷基亞'),
	_word_jp1('クウネル', '古奈爾'),

	['古尔亚德|グリアード', '古爾亞德'],

	['劳拉維亞', '勞拉維亞'],

	['ユグラドラシル|世界树聿格拉兜柆希鲁', '世界樹聿格拉兜柆希魯'],

	['河川风罗', '河川法芙拉河'],

	['港前新鲜海鲜亭|新鲜海鲜亭港前|港前新鲜开戦亭', '港前新鮮海鮮亭'],

	_word_jp1('達利爾|ダリル', '達利爾'),

	//埃尔多拉琉
	//佩艾希亚

	_word_jp1('艾爾多拉琉|埃爾多拉琉|エルトラリュー|艾魯多拉(流|琉)?|愛爾多拉(流|琉)|埃爾多拉(流|琉)', '艾爾多拉琉'),
	_word_jp1('アリュー', '艾琉'),

	/**
	 * @todo
	 */

	//['武戏'],

	_word_jp1('ドラヴドラゴン', '黯淡之龍'),

	[/女王・of・福雷斯特/ig, '福雷斯特女王'],

	_word_jp1('ルージュ|露潔', '露潔'),

	[/(?<=北)方?(同盟|聯盟)/ig, '方同盟'],
	[/(?<=南)方?(同盟|聯盟)/ig, '方聯盟'],

	_word_jp1('ヴィアイシア|佩艾希亞', '佩艾希亞'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	_word_jp1('決戰演算|グラディエイト', '決戰演算'),

	['魔石線（Line）', '魔石線'],

	['連接『連接』', '連接'],

	['十一號十字路口?|十一番十字路口?|十一區十字路口', '十一區十字路口'],

	_word_jp1('キャラ', '角色'),
	_word_jp1('イメージ', '形象'),
	_word_jp1('ヒロイン', '主人公'),

	['級别|等級|レベル', '級别'],

	['魔法?石头?', '魔石'],

	['姓名|名字|名称', '名字'],

	['(圣诞|童話|生诞)(节|祭)', '聖誕祭'],
	['祭典|庙会', '祭典'],

	['(冒|探)(险|索)者', '探索者'],

	['(?:米|弥)诺陶(?:洛|诺)斯|牛头人', '米諾陶洛斯'],

	['(赤|红)(色|之)米诺陶洛斯', '赤之米諾陶洛斯'],

	[
		/[『「《（]([^\n『「《（』」》）]{1,20})[』」》）]/g, function (...m)
	{
		let c;

		switch (m[1].toLowerCase())
		{
			case '携带品':
			case '物品':
			case '所有物':
			case '持有物品':
			case '持ち物':
			case '持有物':
			case '攜帶品':
				c = '所有物';
				break;
			case '表示':
			case '显示':
			case '注视':
			case '顯示':
			case '注視':
				c = '表示';
				break;
			case '形式':
			case '形态':
			case '泡沫':
			case '气泡':
			case '形態':
			case '氣泡':
				c = '形式';
				break;
			case '人造品':
			case '制作品':
			case '制造品':
			case '人造物':
				c = '人造物';
				break;
			case '假货':
			case '伪物':
			case '赝品':
			case '假貨':
			case '偽物':
			case '贋品':
				c = '偽物';
				break;
			case '材料':
			case '素体':
				c = '素体';
				break;
			case '眼睛':
			case '目':
			case '锐利的目光':
			case '銳利的目光':
			case '炯眼':
				c = '炯眼';
				break;
			case '连接':
			case '联结':
			case '連接':
			case '聯結':
			case '鏈接':
				c = '連接';
				break;
			case '感应':
			case '感応':
			case '感應':
				c = '感應';
				break;
			case '想起':
			case '想起收束':
				c = m[1];
				break;
			case '新月琉璃直劍':
			case '新月琉璃':
			case '新月琉璃直剑':
				c = m[1];
				break;
			case 'flamberge':
				c = '炎之劍';
				break;
			case 'light':
				c = '光';
				break;
			case 'flame':
				c = '火焰';
				break;
			case 'wind':
				c = '風';
				break;
			case '地图':
			case '技能':
			case '正道':
			case '利特尔降雪':
			case '次元・雪':
			case '維度':
			case '地圖':
			case '利特爾降雪':
			case '维度':
				c = m[1];
				break;
			case 'Dimension':
				c = m[1];

				return `《${c}》`;

				break;
			default:
				break;
		}

		if (c)
		{
			return `『${c}』`;
		}

		return m[0];
	},
	],

	['『形式』（泡沫）', '『形式』'],

	['鵜飼', '鵜飼'],
	['沙樹', '沙樹'],

	['国|國', '国'],

	//['余欲', '餘裕'],
	['借口', '藉口'],
	['检起', '撿起'],
	['体味', '體會'],

	['试听，后面的大剑', '奧里亞大劍'],

	[/军团[\?・]?蝙蝠/g, '軍團・蝙蝠'],

	['等级（レベル）', '級別'],
	['技能（スキル）', '技能'],

	['職業|职业', '職業'],

	['妻身', '妾身'],

	[/((.+)(?:酱|醬)?)(?:（\2）)/g, '$1'],

	[/([^\w])(Solo)(?![\w])/ig, '$1Solo'],

	/**
	 * @todo
	 */

	[/^\d+ 拷贝$/gm, ''],

	//['向后', '向後'],
	//['后天', '後天'],
	//['后', '後'],

	[
		/(.)?(决不)/g, function (...m)
	{
		if ('解坚解堅'.indexOf(m[1]) != -1)
		{
			return m[0];
		}

		if (m[1] == null)
		{
			return '絕不';
		}

		return m[1] + '絕不';
	},
	],

	/**
	 * @todo 格式
	 */

	['名字(相川|迪亚)', '名字 $1'],

	[/((?:先|後|后)天)(?:技能|技艺|スキル)(?:（スキル）)?[　 ：]*(?!的)([\u4E00-\u9FFF])/g, '$1技能：$2'],
	[/(名字)[　 ：]+([\u4E00-\u9FFF])/g, '$1：$2'],

	[
		/([\d０１２３４５６７８９]+(?:\.[\d０１２３４５６７８９]+))(?![a-zＡ-Ｚ人])(.?)/g, function (...m)
	{
		return StrUtil.toHalfNumber(m[1]) + ((m[2] && /[\u4E00-\u9FFF]/.test(m[2])) ? ' ' : '') + m[2];
	},
	],

	[
		/([\d０１２３４５６７８９]+)张/g, function (...m)
	{
		return StrUtil.toFullNumber(m[1]) + '枚';
	},
	],

	[
		/币([\d０１２３４５６７８９]+)个/g, function (...m)
	{
		return '幣' + StrUtil.toFullNumber(m[1]) + '枚';
	},
	],

	[
		/(等級|Rank|級别|水平)[　 ：]*([\d０１２３４５６７８９]+)/ig, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	},
	],

	[
		/([^\d\.\+\-\* ／\/])(\d+)([^\d\.\+\-\* ／\/])/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]) + m[3];
	},
	],

	[/([\d\u4E00-\u9FFF])[　 ]*([HM]P)[　 ：]*(\d+)/g, '$1　$2 $3'],
	[/([HM]P)[　 ：]*(\d+)/g, '$1 $2'],

	[
		/([\d０１２３４５６７８９]+)[　 ]*[\/／][　 ]*([\d０１２３４５６７８９]+)/g, function (...m)
	{
		return StrUtil.toHalfNumber(m[1]) + '／' + StrUtil.toHalfNumber(m[2]);
	},
	],

	[
		/([^\u4E00-\u9FFF])(?:班|class|職業|职业|阶級)[： 　]*(无|剑士|奴隶|骑士|英雄|奴隷|斥候|騎士|斗士|魔法使|(?:冒|探)(?:险|索)者|使徒|修道女|戦士)/ig,
		function (...m)
		{
			if (/\w$/.test(m[1]))
			{
				m[1] += ' ';
			}

			return m[1] + '職業：' + m[2];
		},
	],

	[
		/[\!\(\):,~∶]/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	},
	],

	[/([\u4E00-\u9FFF])([\.])(?!\.)/g, '$1。'],

	[/\*(\d+)/g, '×$1'],
	[/×(\d+)([\u4E00-\u9FFF])/g, '×$1 $2'],
	[
		/×(\d+)(?![\.\d])/g, function (...m)
	{
		return StrUtil.toFullNumber(m[0]);
	},
	],

	...lazymarks['4'],

	[/(\n)[ \t　]+/g, '$1'],
	[/^[ \t　]+/g, ''],

	...lazymarks['0'],
	...lazymarks['1'],

	[/[【]/g, '「'],
	[/[】]/g, '」'],
	...lazymarks['2'],

	[/｛/g, '（'],
	[/｝/g, '）'],

	...lazymarks['3'],

	[/([^】\n])(\n【[^\n]+】\n)/g, '$1\n$2'],
	[/(\n【[^\n]+】\n)([^【\n])/g, '$1\n$2'],

	[/\n[ 　]*\.[ 　]*(?=\n)/g, '\n'],

	[/《/g, '『'],
	[/》/g, '』'],

	[/[《『「]([\?？]{3}|表示|显示)[》』」]/g, '『$1』'],

	[
		/[\?？]{3}/g, function (...m)
	{
		return StrUtil.toFullWidth(m[0], {
			skip: {
				space: true,
			},
		});
	},
	],

	[
		/[\u4E00-\u9FFF「！」][—\-]+|[—\-]+[\u4E00-\u9FFF「！」]|[—\-]{2,}/g, function (...m)
	{
		return m[0].replace(/[—\-]/g, '－');
	},
	],

	[
		/[—\-－](\d)[—\-－]/g, function (...m)
	{
		return '－' + m[1] + '－';
	},
	],

	[/^－{3,}$/gm, '－－－'],
	[/^◆{3,}$/gm, '◆◆◆'],

	[/^[－=]+(明天继续|分割线)[－=]+$/gm, '\n'],

	[
		new RegExp([
			'[『「《（]',
			'(',
			[
				'次元之冬',
				'dimension',
				'distance mute',
				'次元決戰演算「(?:前日|先)譚」',
				'次元決戰演算『(?:前日|先)譚』',
			].join('|'),
			')',
			'[』」》）]',
		].join(''), 'ig'), '《$1》',
	],

]) as IWords[];

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: vMaybe = [

	//'需要偵測的字',

	'水平',

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
