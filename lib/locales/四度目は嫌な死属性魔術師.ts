/**
 * Created by user on 2017/12/18/018.
 */

import * as StrUtil from 'str-util';

import { sp, IWords } from '.';
import sublib from './lib';
import { _word_en, _word_jp1 } from './lib/index';

export const lang = '四度目は嫌な死属性魔術師';

export function words_callback(text)
{
	return text;
	//return StrUtil.toFullNumber(text);
}

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	//达露西亚 ダルシア
	['(达|達|塔|塔|妲|妲)(爾|尔|露)(希|西|希)亞|ダルシア|達魯西亞|妲露希亞', '達露西亞'],
	[/(範|范|班|泛)(?:達?(爾|魯|貝)|(貝|達)(爾|魯)?)|班達爾|ヴァンダルー|小提琴|班達魯/g, '班達魯'],
	[/(?:範|范|班|泛|班)(大人|身邊|君)/g, '班$1'],
	[/([，。！、【一])(?:範|范|班|泛|班)([一，。！、])/g, '$1班$2'],

	['艾比佩奇亞|艾比貝其亞|エブベジア', '艾比佩奇亞'],

	// @todo 女僕
	_word_jp1('(沙|莎|薩)(利|莉)(娅|雅|亞)|萨里亚|沙利婭|サリア', '沙利婭'),
	_word_jp1('(麗|利|莉)(塔|薩)|リタ', '麗塔'),
	_word_jp1('薩姆|サム', '薩姆'),

	// @todo 食屍鬼/古尔
	['薩(緹|蒂|提|缇)莉(絲|斯)|萨蒂亚斯|ザディリス|萨迪斯|蕯蒂利斯|萨蒂利斯|萨蒂利亞', '薩蒂莉斯'],
	['(巴|帕)(絲|斯)(緹|提|蒂)(亞|雅)|巴斯提雅|巴斯迪亞|巴士蒂亞|バスディア|帕斯蒂安', '巴斯蒂亞'],
	['維(格|賈|贾)羅|彼伽洛|彼伽罗|彼伽羅|維卡洛|維加羅|ヴィガロ|維嘉羅', '維格羅'],

	_word_jp1('(塔|达|塔)(利|蕾|雷|莉)亞|塔利亞|タレア|塔利婭', '塔利亞'),

	_word_jp1('卡(奇|契)亞|卡西亞|カチア', '卡奇亞'),

	//ビルデ_(協助研究食屍鬼少子化的女食屍鬼_食屍鬼)
	_word_jp1('ビルデ|毕露媞|妣耳跌|彼魯帖', '畢露媞'),

	/**
	 * @todo 新生
	 * #37 #99
	 *
	 * ブラガ 布拉格 BLACK GOBLIN(黑哥布林)
	 *
	 * 則曼多 ゼメド 泽米多 ANUBIS(阿努比斯) 哥
	 * メメディガ 媚媚蒂嘉 梅美迪嘉 ANUBIS(阿努比斯) 妹
	 *
	 * 伯格 ANUBIS(阿努比斯)
	 *
	 * ゴーバ 戈巴 ORCUS(奥库斯)
	 *
	 * #49
	 *
	 * 嘉妲露|佳妲爾 ジャダル 食屍鬼
	 *
	 * #42
	 *
	 * パウヴィナ (活死人偽轉生_高貴豬頭人混血) 帕烏維納 帕碧娜 法奥碧娜 宝琳娜 女
	 */
	_word_jp1('布拉卡|布拉格|布拉伽|布拉加|ブラガ', '布拉格'),
	_word_jp1('果巴|戈巴|锅巴|贡巴|ゴーバ|哥巴', '戈巴'),
	['梅玫迪伽|媚媚蒂嘉|梅美迪嘉|メメディガ', '梅美迪嘉'],
	_word_jp1('泽梅多|則曼多|泽米多|ゼメド', '澤米多'),

	['(嘉|佳|伽|伽)(妲|妲|達|达|达)(露|爾|尔|尔)|賈达魯|ジャダル|嘉妲露', '嘉妲露'],

	['帕(?:碧|(?:烏|乌)維)(娜|納|奈|娜|娜|那)|法奧碧(?:娜|納|奈|娜|娜|那)|帕(?:烏|乌)维(?:娜|納|奈|娜|娜|那)|帕烏維納|哈帕碧|パウヴィナ', '帕碧娜'],

	['BLACK GOBLIN', 'BLACK GOBLIN'],
	['暗?黑哥布林|ブラックゴブリン|黑色哥布林', '暗黒哥布林'],
	['黒小鬼', '黒小鬼'],

	['ANUBIS', 'ANUBIS'],
	['アヌビス|阿努比斯', '阿努比斯'],
	['冥犬鬼', '冥犬鬼'],

	['黒豚鬼', '黒豚鬼'],
	['暗黑歐克|奧庫斯|オーカス', '暗黑歐克'],
	['ORCUS', 'ORCUS'],

	//
	//拉批艾薩裘和亞瑪妲

	/**
	 * 骸骨要塞 骨人 酷诺翰
	 * 維比(ヴァービ)
	 * 拉比艾薩裘(ラピエサージュ) 菈比艾莎舒 女 #54 #59
	 *
	 * 雷慕鲁斯
	 *
	 * 八俣是拥有着九个脑袋的多头蛇 蒂尼西亞用最高级个体的尸体做出来的亡灵
	 */
	['(?:拉|菈)(?:批|比|彼)(?:艾|伊)(?:薩|萨|莎)(?:裘|舒|久)?|拉彼伊萨久|菈比艾薩裘|ラピエサージュ|拉披艾薩久|菈比艾莎舒', '菈比艾薩裘'],
	['(酷|庫|克)(諾)(翰|漢|亨)|庫諾瀚|クノッヘン', '庫諾漢'],
	_word_jp1('維比|范彼|ヴァービ', '維比'),
	_word_jp1('八俣|雅玛塔|ヤマタ|亞瑪妲|雅瑪塔|雅瑪达', '雅瑪塔'),

	['骸骨要塞|ボーンフォート', '骸骨要塞'],
	['伯恩大堡垒|ボーングランドフォート|骸骨大要塞', '骸骨大要塞'],

	/**
	 * @todo 蟲
	 *
	 * 比多|皮特
	 * 培因
	 *
	 * 奎因 ['克萊尔|クイン|庫恩', '克萊尔'],
	 */
	_word_jp1('比多|皮特|彼多|皮托|彼特|ピート', '皮特'),
	_word_jp1('培因|佩恩|潘恩|ペイン', '培因'),

	_word_jp1('クイン|奎因', '奎因'),

	['杰赫納女王蜂?|格丽娜女王蜂?|ゲヘナクイーンビー|格麗娜女王蜜?蜂|格赫納女王蜜?蜂', '格赫納女王蜂'],

	['傑赫納蜜蜂|格赫納蜂蜜蜂|ゲヘナビー|傑赫納蜜?蜂|格赫納蜜?蜂|傑赫納蜜?蜂|傑赫納比?|格拉娜比|地獄蜂', '格赫納蜂'],

	['セメタリービー|墓园蜜蜂|墓园蜂|塞尔塔利比|墓園蜂|塞米塔利比|墓地蜜?蜂|CEMETERY BEE', '墓地蜂', 'ig'],

	/**
	 * 不死树魔
	 */
	['艾赞|艾善|蓝染|爱赞', '艾贊'],

	// 史萊姆
	['奇尤魯|可爾|[庫库][鲁魯]|キュール|逑鲁', '可爾'],

	// 肉块
	['雷吉欧|雷奇奧|雷吉安|レギオン|雷里欧|雷吉恩|欧吉恩|蕾吉歐|萊吉恩', '雷吉歐'],

	/**
	 * @todo 巨人
	 *
	 * ザンディア_(巨人族英雄《小小天才》_第二王女_全屬性適應_殭屍) 桑提亞
	 * ジーナ_(巨人族英雄《聖女》_原祭司長_殭屍) 吉娜
	 * ダタラ_(巨人族鍛造師_殭屍) 達塔拉
	 * ズラン_(巨人族斥侯轉忍者_殭屍) 茲蘭
	 */
	['波庫斯|博克斯|沃爾克斯|奥克斯|ボークス|ボーグス|博古斯|沃克斯', '波庫斯'],
	['(波庫斯|沃爾克斯|波克斯)亞龍草原', '波庫斯亞龍草原'],

	['努阿扎|(努|奴)阿薩|[诺努](阿|亞)(莎|扎)|努阿薩', '努阿扎'],

	_word_jp1('(蕾|雷)(比|碧)(亞|雅)|利维亞|利維亞|蕾比雅|レビア|雷維亞', '蕾比雅'),
	['第一王女|大公主', '第一王女'],

	['小小的天才|小小天才|小さき天才', '小小天才'],

	['ザンディア|桑提赞亞|(萨|莎)(提|蒂)亞|桑提亞|赞蒂亚|莎蒂亞|蕯蒂亞|薩蒂亞', '莎蒂亞'],

	['治癒的?聖女|癒しの聖女', '治癒的聖女'],
	_word_jp1('ジーナ|吉娜', '吉娜'),
	_word_jp1('ダタラ|鞑塔拉|達塔拉|达塔拉', '達塔拉'),

	// #83 沃尔克斯的女儿戈法
	_word_jp1('贡法|歌法|戈法|歌法|ゴーファ', '歌法'),

	_word_jp1('ズラン|(茲|兹)楠|(茲|兹)蘭|兹楠|祖伦', '祖倫'),

	// @todo 人
	['(路|鲁)(切|其|奇)里亞諾|路切里阿久|路西里亚诺|路奇利亞多|ルチリアーノ|魯奇阿諾|魯奇亞諾|魯奇里阿諾|魯奇阿里諾|魯奇裡亞諾|魯奇利亞諾?|路基里亞諾', '魯奇里亞諾'],

	_word_jp1('卢沙|贝萨|ベッサー', '貝薩'),

	['汉娜|汉萨', '漢娜'],

	['萊利|ライリー|拉里', '萊利'],

	['金伯利|キンバリー|金巴利', '金伯利'],

	/**
	 * 女精灵僵屍，曾被稱為『雙盾姬』的英雄僵屍的歌爾達
	 */
	['双盾姫', '雙盾姫'],
	_word_jp1('歌爾達|ゲルダ', '歌爾達'),

	// @todo 吸血鬼
	['(特|蒂)(涅|尼)西亞|テーネシア|蒂妮西婭|蒂尼茜亞', '蒂尼西亞'],
	['(爱|愛|艾)蓮', '愛蓮'],
	['愛莲奧諾拉?|エレオノーラ|愛蜜奧諾拉', '愛蓮奧諾拉'],

	['(?:比|彼)(?:爾|尔|鲁|魯)(?:凱|凯|凯)(?:因|恩)|比尔凯恩|ビルカイン', '比爾凱恩'],
	['古巴蒙|谷巴蒙|古巴蒙|グーバモン', '谷巴蒙'],
	['(蓓|贝|貝)爾蒙(多|德)|ベルモンド', '貝爾蒙德'],

	['賽路庫林多|賽尔庫仁特|セルクレント', '賽路庫林多'],

	['馬伊魯兹|マイルズ', '馬伊魯茲'],
	['馬伊魯茲・(?:魯修|路朱|ルージュ)', '馬伊魯茲・魯修'],

	_word_jp1('埃兰|艾拉|アイラ', '艾拉'),

	['ゾッド|澤多|索德|佐德', '佐德'],
	['澤爾哥多里昂|ゾルコドリオ|索尔科多里奧|佐爾哥迪奧|佐爾科多裡奧', '澤爾哥多里昂'],

	['莫爾托爾', '莫爾托爾'],

	_word_jp1('埃爾佩爾|エルペル', '埃爾佩爾'),

	_word_jp1('積根|ドラガン', '積根'),
	_word_jp1('ジゼル|吉澤爾', '吉澤爾'),

	// 這兩個翻譯也太怪了吧 搞不懂翻成這樣的用意
	['菲迪利香|フェディリカ', '菲迪利香'],
	['ボルトゥーナ|菲荻莉卡', '菲荻莉卡'],

	_word_jp1('グオン|古翁', '古翁'),

	/**
	 * @todo 神
	 *
	 * 紀錄之神?裘拉托斯（記録の神　キュラトス）
	 *
	 * 詹達庫（ザンターク）
	 * 炎與破壞的戰神・詹達庫
	 *
	 * 《大地与匠的母神》博蒂所选召的勇者，希爾維洛
	 *
	 *
	 */
	['羅多(可爾特|特鲁特)|羅多可爾特|罗多可尔特|罗德科尔特|罗德科尔德|罗德科尔司|羅多刻魯特|羅德科特|羅德克魯特|羅克特魯特|羅德克魯特|ロドコルテ|羅德哥爾特|羅德葛爾特|羅多可魯帖', '羅多刻魯特'],
	['阿爾达|阿魯達|阿納达|阿納達|アルダ|阿达尔', '阿爾達'],

	[`邪神${sp}巴魯魯夏培`, '邪神・巴魯魯夏培'],

	//魔王古杜兰斯
	['古督拉尼斯|古杜兰斯|古敦拉尼斯|グドゥラニス|格德拉尼斯|格拉尼斯|尼古拉尼斯|古杜蘭尼斯', '古杜蘭斯'],

	// フィトゥン => fitun => 菲頓
	['电场|场电|菲頓|fitun|费图恩|フィトゥン|菲尔伦', '菲頓'],
	['雷电之神|雷雲の神', '雷雲の神'],

	['アーティファクト|阿蒂法特', '阿蒂法特'],

_word_jp1('維(妲|达|塔|達)|維達|ヴィダ', '維達'),
	['维达新種(?!族)|ヴィダの新種族|維達の?新種?族', '維達的新種族'],
	['ヴィダの?御子|維達的?御子|维达的?皇子|维达御子', '維達的御子'],

	['維達の加護|維達的保佑', '維達の加護'],

	['愛と生命の女神|愛與生命的女神|生命與愛的女神|生命與愛之女神|生命と愛の女神', '愛與生命的女神'],

	['維達的睡所|ヴィダの寝所|維達之睡所|維達的寢所|維達的卧室', '維達的寢所'],

	['赞塔庫|詹達庫|赞塔克|桑塔克|ザンターク|桑德克|扎德克|扎塔克|扎克塔|贊塔克|贊塔庫', '詹達庫'],
	['堕ちた戦神|堕落的战神', '堕落的战神'],

	['火焰與破坏的战神|炎と破壊の戦神|火焰和破坏的战神|破坏與火焰之战神|火焰和破壊之戰神|火和破壊的战神', '炎と破壊の戦神'],

	//『冰之神』尤配翁
	['尤佩昂|尤配翁|尤培因', '尤佩昂'],

	['希薩利翁|西萨利翁|西扎里昂|シザリオン', '希薩利翁'],

	['ゴドウィン|戈德溫|哥德文|哥德尔文|哥德溫', '戈德溫'],

	// 大地と匠の母神
	['大地と匠の母神|大地与匠的母神|大地和匠的母亲神', '大地與匠之母神'],
	['ボティン|博坦|博蒂|博汀|博提', '博坦'],
	// 水と知識の女神
	['ペリア|佩利亞|沛莉雅|比利亞', '沛莉雅'],

	['水與知识的女神|水と知識の女神', '水與知識的女神'],

	['海之神|海の神', '海之神'],
	['特里斯坦|特立斯林|トリスタン', '特里斯坦'],

	['苏培因|苏佩恩|ユペオン', '苏佩恩'],

	// 巨人神ゼーノ
	_word_jp1('芝諾|ゼーノ', '芝諾'),

	['月之巨人|月の巨人', '月之巨人'],
	['ディアナ|迪安娜', '迪安娜'],

	// 獣神ガンパプリオ
	['干帕普利奧?|剛帕普莉歐|ガンパプリオ', '干帕普利奧'],

	//时间和法术之神
	['時と術の魔神|时與術之魔?神|时間與術式?の魔神', '時與術之魔神'],

	['理刻[連连]多|利[庫库]伦|リクレント|利庫轮|利庫連多|利庫论|里庫連特', '理刻連多'],
	//创造和空间之神
	['(茲|兹|兹|祖)鲁(旺|温|温)|茲魯溫|ズルワーン', '祖魯旺'],

	// 『地図の女神』ワーンライザ
	['ワーンライザ|瓦恩萊萨|瓦恩萊萨', '瓦恩萊萨'],



	// 英雄神
	['法卯|ファーマウン|法馬斯|法斯特|法芒恩', '法卯'],
	_word_jp1('戈尔德|ゴルド', '戈爾德'),
	[`(?:法卯|ファーマウン|法馬斯|法西斯)${sp}(?:戈尔德|ゴルド|哥德)`, '法卯・戈爾德'],

	['戰旗之神|戰旗の神', '戰旗之神'],
	['泽露库斯|泽尔克斯|ゼルクス|塞尔克斯|泽魯克斯|賽尔克斯', '澤露庫斯'],

	['狩猎之神|狩?猟の神', '狩猎之神'],
	['リシャーレ|里夏丽|利纱尔|里的裡夏丽|裡夏丽|利沙雷|利夏勒', '利紗爾'],

	['ヘルプミー|赫普米', '赫普米'],

	// 『晶角龍神』リオエン
	['リオエン|里約恩|里約尔|里歐恩|里約達|里歐艾恩', '里約恩'],

	// 『迷宮の邪神』グファドガーン
	['グファドガーン|格法多加恩|格法德加恩|格拉德加恩|古芙朵戞|古法德岡', '格法多加恩'],

	['魔塵の邪神', '魔塵の邪神'],
	['邪闇の悪神', '邪闇の悪神'],

	['眠りの神|睡眠女神|睡眠の神', '睡眠の神'],

	['迷宮的邪神|迷宮の邪神', '迷宮的邪神'],
	['格法多加恩|グファドガーン|古法德纲', '格法多加恩'],

	['ヂュガリオン|吉加利昂', '吉加利昂'],
	['八水龍神', '八水龍神'],

	['黒き巨神|黑巨神', '黒巨神'],
	['ディアクメル|迪亞梅尔', '迪亞梅爾'],
	['白き巨神', '白巨神'],
	['阿拉萨|アラザン', '阿拉薩'],

	['地球の冥神の加護|地球的?冥神的加護', '地球的冥神的加護'],

	['記録の神', '記録之神'],
	['キュラトス|裘拉托斯', '裘拉托斯'],

	['断罪の神', '断罪之神'],
	['ニルターク|赫尼特克|尼魯塔庫', '尼魯塔庫'],

	_word_jp1('ミル(?!グ)|米露', '米露'),

	['竈の女神|灶之女神', '灶之女神'],
	['戴爾波拉|デルボラ', '戴爾波拉'],

	['競争の神|竞争之神', '競争之神'],
	//['リーヴ', 'リーヴ'],

	['鳥之?獣王', '鳥之獸王'],
	['拉法斯|拉法茲|ラファズ', '拉法茲'],

	['雨雲の女神', '雨雲的女神'],
	_word_jp1('バシャス|巴夏絲', '巴夏絲'),

	_word_jp1('ゼルゼリア|潔露潔莉亞', '潔露潔莉亞'),
	_word_jp1('ハムル|哈姆爾', '哈姆爾'),




	/**
	 *
	 */
	['愛蜜佩爾|エルペル', '愛蜜佩爾'],

	/**
	 * 『暗海の邪神』ギュバルゾー
	 * ギュハ
	 圭夏 韓国の政治家
	 ギュハ => Kyu-ha => 九波
	 西班牙語 ルゾー => Ruzo => 魯索
	 合起來音譯的話 我覺得聽起來像 基瓦魯索 吉瓦魯索 之類

	 千萬別選 杰巴路德
	 */
	//['杰巴路德|ギュバルゾー|Gyubaruzo', 'ギュバルゾー'],

	['暗海的邪神|暗海の邪神', '暗海的邪神'],
	['杰巴路德|古特索索+特|ギュバルゾー|基瓦魯索', '基瓦魯索'],

	['狂災的惡神|狂災の悪神', '狂災的惡神'],
	['達爾格索特|ダルグゾボン', '達爾格索特'],

	['共食的邪神|共食いの邪神', '共食的邪神'],
	_word_jp1('ゼーゾレギン|杰佐雷金', '杰佐雷金'),

	_word_jp1('佛魯札吉巴路|フォルザジバル', '佛魯札吉巴路'),

	/**
	 *
	 */
	['菲爾(麗|莉)塔|フィルリエッタ', '菲爾莉塔'],

	/**
	 * @todo 勇者
	 *
	 * 奈茵絡德（ナインロード）：
	 * 勇者・奈茵絡德，風與藝術之神・希薩利翁所召喚的勇者，本名九道陽菜
	 *
	 * ザッカートの試練
	 * 寨卡特
	 *
	 * 而她选择了打算在市镇小工厂上吊自杀的青年坂户启介。也就是之后的寨卡特。
	 */

	['薩卡特|寨卡特?|劄坎托|扎卡特|ザッカート|札卡特', '寨卡特'],
	_word_jp1('米(亥|海)爾|米海耶爾|ミハエル', '米亥爾'),


	['(寨卡特|ザッカート)の試練|寨卡特的?考验|寨卡特的試錬|寨卡特的考驗|紮卡的試錬', '寨卡特的試練'],

	['試練の攻略者|考验的攻略者', '試練の攻略者'],

	['生命体の根源|生命體的根源', '生命體的根源'],

	['希爾維洛|ヒルウィロウ|希尔維罗|席尔維尔罗', '希爾維洛'],

	_word_jp1('娑爾妲|ソルダ|索尔达|苏格达|娑尔坦', '娑爾妲'),

	/**
	 * 阿克 亞克
	 * ['弧光|アーク|阿珂', '阿珂'],
	 */
	_word_jp1('アーク|阿珂|婭克|婭珂', '婭珂'),
	['阿久津', '阿久津'],
	['春香', '春香'],

	/**
	 * @todo 五色の刃
	 */

	['海茵茲|海因茨|海恩兹|海因茲|海[因茵恩][茲茨]|海恩滋|ハインツ', '海因茨'],

	['蒼炎剣', '蒼炎劍'],

	['戴安娜', '戴安娜'],

	['ジェニファー|珍妮佛|珍妮弗|詹妮弗|杰尼弗|珍尼弗', '珍妮佛'],
	//['德拉(伊莎)?|デライザ|德蕾莎|蒂蕾莎', '蒂蕾莎'],
	['德拉(伊莎)|デライザ|德蕾莎|蒂蕾莎', '蒂蕾莎'],

	['五色の刃|五色之刃', '五色之刃'],

	_word_jp1('塞伦|セレン|希儿|塞蓮', '塞蓮'),

	['考验的探索者|試練の探索者', '試練的探索者'],

	['エドガー|埃德加|愛德格', '埃德加'],

	_word_jp1('瑪蒂娜?|マルティーナ', '瑪蒂娜'),

	/**
	 * @todo 龍
	 *
	 * 五惡龍神?菲提魯古（五悪龍神フィディルグ）與暴邪龍神?魯維茲馮爾
	 * 龍皇神?瑪爾敦庫
	 * 暴邪龍神・魯維茲馮爾
	 */
	['弗迪爾克|菲提魯古|菲的卢戈|菲迪魯克斯?|フィディルグ|菲尔格|菲迪尔', '菲迪魯克'],

	['瑪爾敦庫|馬路杜庫|マルドゥーク|瑪德卢庫', '瑪爾敦庫'],

	['魯維茲馮爾|ルヴェズフォル|卢維斯福', '魯維茲馮爾'],

	//原《鳞王》
	_word_jp1('里昂|力歐|里約(?!恩)|リオー', '里昂'),

	//卢卡斯

	_word_jp1('卡爾康|卡爾坎|カールカン', '卡爾坎'),
	// フロト|布羅特|弗洛托
	_word_jp1('フロト|弗洛托', '弗洛托'),

	['塞巴斯|賽巴斯', '塞巴斯'],

	// @todo 卡西姆
	_word_jp1('卡希姆|卡西姆|カシム|凱西姆', '卡西姆'),
	['(費|费|菲)(施|斯)(塔|特)|菲斯塔|フェスター', '費施特'],
	_word_jp1('傑諾|泽诺|杰諾|ゼノ', '澤諾'),
	_word_jp1('(莉|丽)(奈|娜|那)|麗娜|リナ', '麗娜'),
	['丽(─+)娜', '麗$1娜'],

	/**
	 *
	 */
	//米爾古盾國
	['(?:米爾|米[鲁魯])(古|固)盾国|米魯庫盾国|米尔格盾国|ミルグ盾国', '米魯固盾国'],

	['兰斯顿|レッグストン|雷夠斯顿|雷格斯顿?|雷古斯托|雷酷斯德|雷庫斯德|雷斯顿|雷克斯頓|雷古斯頓|列古斯頓', '雷古斯頓'],

	['阿尔萨德|アルサード', '阿爾薩德'],

	_word_jp1('薩爾亞|サルア', '薩爾亞'),

	_word_jp1('セシル|塞西爾', '塞西爾'),

	['切(札|萨|薩)(列|雷)|切扎爾|切蕯雷|チェザーレ', '切薩雷'],
	_word_jp1('庫爾(特|德)|クルト|可爾德|庫魯德', '庫爾特'),

	/**
	 * 将军 / 宰相
	 *
	 * 哥 切薩雷 切萨雷 切札列
	 * 弟 庫爾特・雷酷斯德  雷庫斯德
	 *
	 * 托马斯・帕尔帕库 托马斯・帕鲁巴佩克
	 */

	['托馬斯|多瑪斯|汤瑪斯|トーマス', '托馬斯'],
	['帕尔帕库|帕魯巴佩克|帕爾帕貝庫|帕魯巴佩克|パルパペック|帕尔帕克|帕尔巴克|帕尔馬|戈巴尔馬|帕尔帕佩克|帕魯帕佩克', '帕爾巴佩克'],

	['阿萊斯|阿萊伊|アーライフ', '阿萊斯'],

	['戈尔单|高尔丹|ゴルダン|高爾单|戈爾丹', '戈爾丹'],



	['塔罗斯海姆|塔洛斯海姆|塔洛海姆斯|塔洛斯赫姆|海洛斯海姆|タロスヘイム|塔罗斯(?:海姆)?|达洛斯海姆', '塔洛斯海姆'],

	_word_jp1('タロス|塔洛斯', '塔洛斯'),
	['太陽の巨人', '太陽の巨人'],

	/**
	 * @todo 薩烏隆公爵領
	 */
	['绍恩|萨乌(隆|罗)|索伦|薩烏羅|サウロン|索龍', '薩烏隆'],
	['(薩烏隆|沙龙)解放戦線', '薩烏隆解放戰線'],

	_word_jp1('伊莉絲|伊莉斯|伊利斯|イリス|伊丽斯丝?|伊丽絲|伊莉絲', '伊莉絲'),
	['貝亞哈(魯德)?|貝阿哈魯特|贝尔哈魯德|貝亞哈特里?|ベアハルト|貝阿哈魯德', '貝爾哈魯德'],
	[/\?(貝爾哈魯德)/ig, '・$1'],

	['喬治|ジョージ', '喬治'],

	_word_jp1(/馬尔梅|馬梅米|マルメ|馬爾默|馬米|麦梅|瑪魯梅/ig, '瑪魯梅'),

	['エイリーク|艾回|埃里克|艾麗克|艾莉克', '埃里克'],

	[/解放的姬騎士|解放之姬騎士|解放の?(公主|姫)騎士/ig, '解放の姫騎士'],

	['(拉古修|拉拉斯|ラグジュ|拉斯林|拉古久)', '拉古修'],
	['(?:庫歐克|克里科斯|クオーコ)・(拉古修|拉拉斯|ラグジュ|拉斯林)', '克里科斯・拉古修'],
	['(?:庫歐克|克里科斯|クオーコ)|克理科斯|克里夫斯', '克里科斯'],

	['鉄錆兵団|铁锈兵団|鐵鏽兵団', '鐵鏽兵団'],

	//['キューバス|队列葩士', '队列葩士'],

	_word_jp1('デビス|戴維斯', '戴維斯'),
	_word_jp1('ハッジ|帕吉', '帕吉'),

	[
		[
			`([《（「『【])`,
			`(?:`,
			[
				'真なる|真正|真正的',
			].join(''),
			`)`,
			`([』」》）】])`,
		].join(''),
		'$1真正$2',
	],

	['ランドルフ|兰多夫|蘭多魯夫|兰道魯夫', '蘭多魯夫'],

	[
		[
			`([《（「『【])`,
			`(?:`,
			[
				'真的',
			].join(''),
			`)`,
			`([』」》）】])`,
			'(蘭多魯夫)',
		].join(''),
		'$1真正$2$3',
	],

	['ルデル|魯德尔|盧德爾', '盧德爾'],

	['法萨里尔特|法萨里克|ファザリック', '法薩里克'],
	['德魯馬多|ドルマド', '德魯馬多'],

	/**
	 * 力克・帕利斯（リック・パリス）
	 * 雷盟多・帕利斯（レイモンド・パリス）
	 */
	_word_jp1('力克|利克|リック', '利克'),
	_word_jp1('雷盟多|雷蒙德|雷蒙得|レイモンド', '雷蒙德'),
	_word_jp1('帕利斯|帕里斯|帕裏斯|巴里斯|パリス', '帕里斯'),

	// ---------------------

	/**
	 *
	 */
	//哈托納公爵領
	['哈(德|托)納|哈多那|哈多那|哈托納|哈托拉|哈特納|ハートナー|哈德那', '哈托納'],
	_word_jp1('貝爾頓|ベルトン', '貝爾頓'),
	_word_jp1('ルーカス|盧卡斯', '盧卡斯'),

	_word_jp1('巴勃羅|パブロ|巴布羅', '巴勃羅'),
	_word_jp1('マートン|默頓', '默頓'),

	/**
	 *
	 */

	//尼阿奇鎮（ニアーキの町）：哈托納公爵領，遇到海茵茲的城鎮，dead907閣下翻作"米納其"
	_word_jp1('尼阿奇|米納(其|奇)|米納其|尼亞吉|尼亞基|ニアーキ', '尼亞吉'),
	['尼亞吉鎮|尼亞吉の町', '尼亞吉鎮'],

	// 勇者
	['萊茵蘭度|萊茵蘭多|ナインロード|奈茵絡德|納恩卢德|奈茵絡德|奈洛特|奈茵絡德', '奈茵絡德'],
	// 公爵
	['拉伊蘭度|ナインランド|拉伊蘭度|奈茵蘭多|奈茵蘭杜', '奈茵蘭杜'],

	//巴爾切布魯古


	/**
	 * @todo バルチェブルグ
	 */
	_word_jp1('巴爾切伯格|バルチェブルグ|巴爾切伯格|巴爾切布魯古', '巴爾切伯格'),
	_word_jp1('巴爾切斯|バルチェス', '巴爾切斯'),

	/**
	 * @todo 選王国
	 */
	// 選王國
	['歐爾巴烏姆|欧鲍姆|奥卢邦|奧尔巴|オルバウム|奧邦盧', '奧盧邦'],
	['選王国', '選王国'],

	['法林公爵|法森公爵|ファゾン公爵|法踪公爵|法鐘公爵', '法森公爵'],
	_word_jp1('ファゾン', '法森'),

	// 海国
	['卡拉哈多|加拉哈德|カラハッド|海卡拉哈德', '加拉哈德'],
	['海国卡拉(哈多|哈德)?', '海国加拉哈德'],

	/**
	 * 巴恩蓋亞大陸南部
	 */
	['邦盖亞|(巴|伯)恩(蓋|盖)亞|柏凱恩|巴恩加亞|巴恩加伊?|バーンガイア', '巴恩蓋亞'],

	/**
	 * 山铜（古希腊语：Ὀρείχαλκος， 英语：Orichalcum，又译奧利哈鋼、俄瑞卡尔科斯、奥里哈鲁根、奧利哈康或王者金屬)
	 */
	['(奥|歐)(里|理|利)哈(爾|鲁)?(鋼|鋼|康|根)|山铜|奧里哈鋼|奧利哈刚', '奧里哈鋼'],

	/**
	 * DUN #36
	 *
	 * 加朗之谷、多伦水宴洞、沃尔克斯亚龙草原、巴利肯减命山
	 *
	 * 扎納爾帕多娜地下的通稱為《避難所》的場所，其正式名稱為《無殼的曠野》
	 */
	['巴里根减少的生命山|巴里根减命山|巴利肯减命山|巴里肯滅命山|バリゲン減命山', '巴利肯减命山'],
	['杜蘭水宴洞|多伦水宴洞', '多伦水宴洞'],
	['加蘭之谷|加朗之谷', '加朗之谷'],

	['(鳞|鱗)王(巢穴|之巢)', '鱗王之巢'],

	// 双斧槍
	['巴利肯|バリゲン', '巴利肯'],

	['オーガーの巣|歐克的巢穴?|奧格的巢|歐克之巢|奧加的巢', '奧加的巢'],

	['地獄の宮殿|地獄的宮殿|地獄之宮殿', '地獄の宮殿'],

	// オリジン

	['オリジン|Origin|Origan', 'ORIGIN', 'ig'],
	['Lambda', 'LAMBDA', 'ig'],

	_word_jp1('(亞斯|EARTH)\\(アース\\)|EARTH|アース|亞斯', 'EARTH', 'ig'),

	['拉姆达|拉姆妲|拉姆達|拉姆达|拉姆妲|ラムダ', 'LAMBDA'],
	['[奥奧]利俊|歐力金|欧力金|起源之地|欧利金|奧利丁|歐利俊', 'ORIGIN'],

	['《东方》', '《ORIGIN》'],

	/**
	 * 墮醉之邪神・珠莉咱娜妣（堕酔の邪神　ヂュリザーナピ）轉生體的莉莎娜
	 * 「暴虐之嵐」之中的澤多（ゾッド）……其實是原種吸血鬼澤爾哥多力歐（ゾルコドリオ）
	 *
	 * 《迅雷》修奈達
	 * 女矮人族梅爾汀
	 * 多爾頓
	 */
	['莉莎娜|莉莎娜|リサーナ|丽塔娜', '莉莎娜'],
	['堕酔の邪神|醉醉的邪神|落醉的邪神', '堕酔の邪神'],

	['珠莉咱娜妣|ヂュリザーナピ|朱莉詹娜皮斯|珠莉札娜琵佩|萩莉軋娜琵佩', '朱莉詹娜皮斯'],

	['堕酔の邪神・朱莉詹娜皮斯（堕酔の邪神　朱莉詹娜皮斯）', '堕酔の邪神・朱莉詹娜皮斯'],

	['暴虐之嵐', '暴虐之嵐'],
	['施耐德|修奈達|施奈德|シュナイダー', '修奈達'],

	['梅爾汀|メルディン|梅蒂', '梅蒂'],
	['多爾頓|道爾頓|ドルトン', '多爾頓'],

	['山妃龍神', '山妃龍神'],
	['ティアマト|(提|緹)(亞|雅)瑪特', '緹雅瑪特'],

	['悦命の邪神|悦命的邪神', '悦命的邪神'],
	['非非流修咯咯|ヒヒリュシュカカ|西?西里酥卡卡|非非流修卡卡', '西西里酥卡卡'],

	/**
	 * @todo 貝武多
	 *
	 * 阿密多帝國
	 * 馬修庫札爾・馮・貝爾烏德・阿密多
	 * マシュクザール・フォン・ベルウッド・アミッド
	 *
	 * 邪砕十五剑！？拯救过初代皇帝巴鲁修米特
	 * 初代皇帝巴尔施米特
	 */
	['[亚亞阿]密[特多]|阿米多|阿米德|アミッド|阿密德', '阿密特'],
	['艾德帝国|阿密特帝国|阿德帝国|吉德帝国', '阿密特帝国'],

	['・艾德', '・阿密特'],

	_word_jp1('冯|馮|フォン', '馮'),

	['[貝贝]武多|[貝贝][爾尔][烏乌]德|貝爾烏多|貝爾烏托|威伍德|ベルウッド|贝舞多|貝武夫|佩德木|伯德木|貝爾伍德|貝爾德', '貝武多'],
	['マシュクザール|馬修庫札爾|玛修克札[鲁魯]|玛仕库扎[尔爾]|玛修克札[鲁魯]|馬修庫紮魯|馬其克萨尔|馬其萨尔|馬其施扎尔|馬其克塞尔', '馬修庫札爾'],

	['鈴木正平', '鈴木正平'],

	// 馬修庫札爾の息子ジーク
	_word_jp1('吉克|ジーク', '吉克'),

	['瑞吉儿|レイチェル', '瑞吉兒'],

	['巴尔施米特|巴鲁修米特', '巴鲁修米特'],

	['勇者貝魯特', '勇者貝武多'],

	/**
	 * 邪碎十五劍
	 *
	 */

	['邪砕十五?劍', '邪砕十五劍'],

	// 聖剣ネメシスベル
	['ネメシスベル|尼科斯貝尔|尼維斯貝尔|内梅西斯貝尔|涅墨西斯貝爾', '涅墨西斯貝爾'],

	['里尔特|裡尔特|里克和尚|里克爾特|リッケルト', '里克爾特'],
	[`・(?:阿德)`, '・阿密特'],
	[`(?:里尔特|里克爾特)${sp}阿密特`, '里克爾特・阿密特'],
	[`(?:里尔特|里克爾特)。阿密特`, '里克爾特・阿密特'],

	[`エルヴィーン|愛蜜維恩|愛爾維恩`, '愛爾維恩'],
	[`五头蛇|五頭蛇`, '五頭蛇'],

	[`リッキー|裡奇`, '里奇'],
	[`里奇坊|リッキー坊|里奇小子`, '里奇小子'],

	[`ベベケット|貝貝卡尔|貝貝卡特`, '貝貝卡特'],
	[`スレイガー|斯萊格|斯雷格`, '斯萊格'],

	[`[『「《](柄|花样)[》』」]`, '『柄』'],

	/**
	 * 穀物国家影島
	 */
	[`ヨンド|影島`, '影島'],
	[`マイン|馬恩`, '馬恩'],
	[`アンディ|安迪`, '安迪'],

	[`兵之神|兵の神`, '兵之神'],
	[`ザレス|札雷斯`, '札雷斯'],

	[`鉄の国`, '鉄之国'],
	[`マルムーク`, '馬穆魯克'],

	/**
	 * @todo 豬頭人
	 *
	 * 神拉伯彼法多
	 *
	 * 布波比奥
	 *
	 * 布塔里昂皇子
	 *
	 * 高贵歐克天穹王，布奇帝
	 *
	 * 布奇塔斯
	 *
	 * 馬爾默公爵 皇帝馬修庫紮魯的堂兄弟
	 *
	 * 庫奧克・拉古修 库奥克是被美味食材所吸引的抵抗组织《萨乌罗解放战线》的内奸
	 *
	 * 肉婦好像就是指《墮肥的惡神》慕噗噗傑戈用自己的肉片創造出來給予豬人和高貴豬人的魔物
	 * 『堕肥的邪神』姆布布姜戈
	 */

	_word_jp1('布格甘|噗咯剛|普果刚|布格甘|普果剛|ブゴガン', '布格甘'),

	['ノーブルオークアビスキング|貴族歐克深淵王', '貴族歐克深淵王'],

	['豬頭?人|(奥|奧|歐)克|豬人|オーク', '歐克'],
	['高貴歐克|崇尚歐克|高贵歐克|贵族歐克|ノーブル歐克|ノーブルオーク', '貴族歐克'],

	['布塔力歐|布塔里昂|布塔裏昂|ブダリオン|布达利翁|布塔里欧|布达里昂|布达里恩', '布塔里昂'],

	['拉波比法(多|特|德)?|拉伯彼法多|拉波彼法多|拉多彼法多|拉波比法特|拉波比法德|ラヴォヴィファード|拉沃维德|拉沃比法多|拉布比法多|拉沃彼法多|拉渦維法多', '拉波彼法多'],

	['姆布布姜戈|慕噗噗傑戈|姆布布杰戈|姆布布傑戈|穆噗噗简格|ムブブジェンゲ|穆璐璐简格|穆布布斯(基德)?|姆布布简戈|穆布布佩斯', '姆布布姜戈'],
	['墮肥的惡神|堕肥悪神|堕肥的邪神|落肥的惡神|堕肥の悪神', '堕肥の悪神'],

	['布奇塔斯|ブギータス|布吉斯塔|布吉塔斯|布基尼达|布基尼德?', '布奇塔斯'],

	['ブゴバー|Bugoba', 'ブゴバー', 'ig'],
	['ブキャップ|bugyappu|布咯普', '布咯普', 'ig'],
	['Gerazoog|ゲラゾーグ|格拉佐格|格拉ゾーグ|格拉索古|格拉索斯|格拉索格斯', '格拉佐格', 'ig'],

	['Boumgan|ブモーガン|布莫干', '布莫干', 'ig'],
	['布扎斯|布扎泽斯|ブザゼオス|布扎泽欧斯', '布扎泽斯', 'ig'],

	//['布弗迪恩', '布弗迪恩'],
	['布迪魯特|布迪爾德|布迪魯多|ブディルード', '布迪魯特'],

	/**
	 * @todo 狗头人
	 *
	 * 《猎之神》利沙雷
	 */
	['伽爾亞|伽爾奇|ガルギャ|加路基亞|加尔吉尔', '伽爾亞'],

	['ハイコボルト|高等狗头人|海克特', '高等狗头人'],
	['柯伏特|狗头人', '狗头人'],

	['露露亞|ルルゥ|亞露露|露露瓦', '露露亞'],

	//哥魯檔大祭司

	['wan san|ワンさん', 'ワンさん', 'ig'],

	['吉多|gyido', '吉多'],
	['エレシュキガル|艾露西奇卡爾', '艾露西奇卡爾'],

	[`^　　+`, '　', 'mg'],

	/**
	 * @todo 食尸鬼
	 *
	 * 《佐佐冈提大森林》
	 * 守护着大陆南部食尸鬼们的神明，《暗与森的邪神》佐佐冈提
	 */
	['古尔|食尸鬼|食人鬼', '食屍鬼'],
	['屍食鬼', '屍食鬼'],
	['屍食鬼(古尔|食屍鬼)', '屍食鬼古尔'],
	['GHOUL', 'GHOUL'],

	['食屍鬼高等魔導公主|食屍鬼ウィザードハイプリンセス|グールウィザードハイプリンセス', '食屍鬼高等魔導公主'],

	['天穹暴君食屍鬼|食屍鬼阿珂タイラント|グールアークタイラント', '天穹暴君食屍鬼'],

	['アークタイラント|阿珂タイラント', '天穹暴君'],

	['佐佐岡提|佐佐冈提|ゾゾガンテ|佐佐甘特|索索格德|苏格兰|苏索格德|佐佐岡提|佐佐冈提', '佐佐岡提'],
	['闇の森の邪神|暗与森的邪神|闇森林的邪神|黑?暗の森林?の邪神|黑暗的森林的邪神', '闇の森の邪神'],

	['ガンテ餅|钢饼', '岡提餅'],
	['ガンテ|甘特|冈提', '岡提'],

	/**
	 * @todo SCYLLA 斯库拉
	 *
	 * LAMIA(拉米亚：蛇女)、SCYLLA(锡拉：章鱼女)、ARACHNE(阿拉克尼：蜘蛛女)、CENTAURS(萨托斯：半人马)、HARPY(哈比：鸟身女妖)和魔人族
	 */
	['锡(拉|菈)|斯(库|庫|卡)(拉|菈)|斯卡拉|斯基拉|庫斯拉|スキュラ|拉庫斯|SCYLLA', '斯庫拉', 'ig'],

	['旧的?斯庫拉領地', '旧斯庫拉領地'],

	['奧爾(比|莉)(雅|亞|亚|娅)|奥莉薇(雅|亞|亚|娅)|奧利維亞|奥尔维亚|オルビア|奧魯比雅', '奧爾比雅'],
	['梅雷彼貝爾|梅烈貝伊尔|梅雷佩貝爾|梅勒貝貝魯|梅勒貝貝依爾|メレベベイル|梅里維尔|甲基貝貝|梅里维尔|梅萊貝貝|梅烈貝貝伊爾|梅雷貝貝伊魯', '梅烈貝伊爾'],
	['佩莉貝爾|佩莉貝尔|ペリベール', '佩莉貝爾'],
	['普莉貝爾|プリベル|普莉貝斯|露普莉贝尔|普莉貝魯', '普莉貝爾'],

	['(汙|汚)泥與觸手之神|汚泥と触腕の神', '汙泥與觸手之神'],

	// スキュラ + オリジン + (ハイ + ドルイド)
	['斯庫拉拉德海德(尔德)?|スキュラオリジンハイドルイド|斯庫拉(起|始)源高(階|等)德魯伊|斯庫拉始源高等德魯伊', '斯庫拉始源高等德魯伊'],

	/**
	 * @todo 蜥人
	 */
	//傳奇蜥人戰士（リザードマンジェロニモ），夏咻加

	['勇士', '勇者'],

	['傳奇蜥人戰士|リザードマンジェロニモ', '傳奇蜥人戰士'],
	['夏咻加?|シャシュージャ', '夏咻加'],

	['蜥蜴?人|リザードマン', '蜥人'],

	/**
	 * 哥布林
	 */
	['祖戈|ゾーゴ|宗贡', '祖戈'],

	/**
	 * @todo 阿剌克涅
	 *
	 * 《甲壳与復眼的邪恶神》札納魯帕多那
	 *
	 * 《甲壳的邪神》札纳尔和《复眼的恶神》帕多娜这两柱神
	 * 和她们信奉的神明相同的名字《扎纳尔帕多娜》
	 *
	 * 庫涅莉亞公主
	 * 吉札尼亚
	 * 慕莎
	 * 多娜涅莉斯女王
	 *
	 *
	 **/
	['库内莉[亞亚]|庫涅莉[亞亚]|柯涅莉婭|庫内利亞|庫塔利亞|クーネリア|庫内亞|克亞涅侍|克内利亞|克里尼利亞', '庫涅莉亞'],
	['吉劄尼亞|吉札尼亞|吉札尼亞|吉萨亞|吉薩尼婭|ギザニア|基萨尼亞|吉蕯亞|吉萨尼亞|吉紮尼亞|吉薩妮亞', '吉札尼亞'],

	['甲殻(和|与)複眼的邪惡神|甲殻と複眼の邪悪神', '甲殻與複眼的邪惡神'],

	['多娜涅莉斯?|ドナネリス|多娜莉亞|多納奈斯|德納奈斯|德耐纳絲', '多娜涅莉斯'],

	['扎纳爾帕多娜|劄納爾帕多娜|札納魯帕多那|扎纳爾帕多娜|扎纳爾帕多娜|帕爾帕多娜|札納魯帕多納|ザナルパドナ|萨納帕多納|扎克巴德納|扎克斯|扎納爾巴多納|帕尔萨克斯|紮納魯帕多娜', '扎納爾帕多娜'],
	['扎纳尔', '扎納爾'],
	['帕多那', '帕多娜'],

	['扎納爾帕多娜的保佑|扎納爾帕多娜的加護|扎納爾帕多娜的庇護', '扎納爾帕多娜的加護'],

	['阿剌克涅|阿拉喀涅|阿拉克拉|アラクネ|阿拉克奈|阿拉尼尔|阿拉克納|ARACHNE', '阿剌克涅', 'ig'],

	['亲愛的饰品|亲密的饰品|親愛首飾|親愛的飾品', '親密的飾品'],

	['亲爱的|ダーリン', '親愛的'],

	/**
	 * @todo 安普莎
	 *
	 * 慕莎
	 **/
	['慕莎|ミューゼ|梅泽|缪泽|慕澤', '慕莎'],

	['Crystal Empasa|水晶安普莎|クリスタルエンプーサ|クリスタルエンプーサ', '水晶安普莎'],

	['安普莎|エンプーサ|恩浦萨|阿普莎|安普沙|恩普莎|恩普薩', '安普莎'],

	['伽奧尔|ガオル|加欧諾', '伽奧爾'],

	/**
	 * @todo 鬼人国
	 *
	 * 「老爺，奧迪华克叫是鬼人王的第一个孩子，据說是令人尊敬的名字的幼名。是勇者希爾維洛留下的记录中有那个名字，以为是有名的鬼人族的始祖就给孩子起了那名字了。」
	 「顺便說一下，本名是优瑪」
	 */
	['六角戦鬼衆', '六角戰鬼衆'],
	['戦士の神', '戰士之神'],
	_word_jp1('ガレス|加勒斯|嘎里斯|加瑞斯', '加勒斯'),

	_word_jp1('奧迪华克|オニワカ|奧迪华卡|歐尼瓦卡|奧爾華卡', '歐尼瓦卡'),
	_word_jp1('优瑪|ユーマ', '优瑪'),
	_word_jp1('テンマ|提恩瑪|天瑪', '天瑪'),

	['斯多瑪|奇多瑪魯', '奇多瑪魯'],

	_word_jp1('优拉|ユラ', '优拉'),

	/**
	 * @todo 竜人国
	 */
	_word_jp1('ローエン|罗恩', '羅恩'),

	/**
	 *
	 */
	['ケンタウロス|半人馬|健塔洛斯|健塔斯洛斯|CENTAURS|薩托斯', '半人馬', 'ig'],
	['哈比|ハーピィー|HARPY', '哈比', 'ig'],

	['威尔德|ヴェルド', '威爾德'],

	/**
	 *
	 */
	['ギラバット|茲拉毕度', '茲拉畢度'],
	['ゴゾロフ|哥索羅夫', '哥索羅夫'],
	['鬣狗|ハイエナ', '鬣狗'],

	/**
	 *
	 */
	['アルクレム|阿魯庫雷姆|阿爾克姆|阿爾克勒姆', '阿魯庫雷姆'],

	['尤莉亞娜|ユリアーナ', '尤莉亞娜'],

	_word_jp1('ミリアム|米莉亞姆', '米莉亞姆'),
	_word_jp1('波魯佐佛伊|ボルゾフォイ', '波魯佐佛伊'),
	_word_jp1('卡麗妮亞|カリニア', '卡麗妮亞'),
	_word_jp1('亞瑟|アーサー', '亞瑟'),
	_word_jp1('娜塔孃|ナターニャ', '娜塔孃'),
	_word_jp1('サイモン|賽門', '賽門'),
	_word_jp1('モークシー|摩庫希', '摩庫希'),

	_word_jp1('ゴルディ|戈爾迪', '戈爾迪'),

	_word_jp1('タッカード|塔卡多', '塔卡多'),

	_word_jp1('モークシー|摩庫希', '摩庫希'),
	_word_jp1('ポーラ|寶菈', '寶菈'),

	_word_jp1('鍵開け', '開鎖'),

	// ヴィダル魔帝国
	_word_jp1('ヴィダル|維達魯', '維達魯'),

	['顔剝ぎ魔|剝臉魔', '剝臉魔'],


	/**
	 * @todo 第八引导
	 *
	 * 布魯托（プルートー）
	 */
	['第八指引|第八引导|第八引導|第八の導き', '第八引導'],

	['克洛諾斯|克罗諾斯', '克羅諾斯'],

	['村上淳平', '村上淳平'],

	['ムラカミ|穆拉姆|穆拉卡米', '穆拉卡米'],

	['(?:ジュンペイ|朱烈拉|顺平)・(?:ムラカミ|穆拉卡米)', '朱烈拉・穆拉卡米'],

	['德島|ゴトウダ', '德島'],

	['超感覚', '超感覺'],
	['後藤田薫', '後藤田薫'],

	['バーバヤガー|巴巴亞卡|芭芭亞卡|巴巴卡亞|班巴亞伽', '芭芭亞卡'],

	['プルートー|布魯托|普魯托|普魯特', '布魯托'],

	['謝德|シェイド', '謝德'],

	['イザナミ|依佐娜美|(?:佐佐|(?:伊|依)(?:邪|佐))(?:娜|那)美|伊邪那美', '伊邪那美'],
	['ベルセルク|貝尔賽尔克', '貝爾賽爾克'],

	['艾斯基德|艾露西奇卡爾|エレシュキガル|埃列什基伽勒', '艾露西奇卡爾'],

	['閻魔|阎王', '閻魔'],

	['ワルキューレ|瓦爾基裡|瓦爾基里|瓦爾基利|女武神', '瓦爾基里'],

	['イシス|伊西絲|伊西斯', '伊西絲'],

	['シルフィード|希爾菲德', '希爾菲德'],
	_word_jp1('ミサ|米薩|美佐', '美佐'),
	['安德森|アンダーソン', '安德森'],

	['オーディン|奧丁', '奧丁'],
	_word_jp1('阿基拉|アキラ', '阿基拉'),
	_word_jp1('ハザマダ|哈萨玛', '哈薩瑪'),
	['狭間田彰|窄間田彰', '狭間田彰'],

	_word_jp1('ジャック|杰克|傑克', '傑克'),

	['維納斯|ヴィーナス', '維納斯'],
	['ヘカトンケイル|百臂巨人', '百臂巨人'],
	_word_jp1('達古|大古|ダグ', '達古'),
	['安德拉斯|阿特拉斯|アトラス', '阿特拉斯'],

	_word_jp1('艾吉斯|宙斯盾|アイギス', '宙斯盾'),
	[`梅麗莎${sp}J${sp}早乙女`, '梅麗莎・J・早乙女'],
	[`梅麗莎`, '梅麗莎'],

	['土屋', '土屋'],
	['加奈子|卡娜可', '加奈子'],

	['人偶|マリオネッター', '人偶'],
	_word_jp1('哈迪米|哈迪姆|ハジメ', '哈迪姆'),
	['伊諾伊', '伊諾伊'],
	['干初|乾初', '乾初'],

	/**
	 *
	 */
	['鮫島悠里', '鮫島悠里'],
	['鮫島', '鮫島'],
	['ペルセウス|佩尔塞斯|柏修斯|比尔塞斯', '柏修斯'],

	// 田中
	['韋駄天|韋驮天', '韋駄天'],

	_word_jp1('兀魯斯|ウルズ|乌魯斯|烏爾德', '烏爾德'),
	['麦肯齐|マッケンジー', '麥肯齊'],

	/**
	 * @todo Bravers
	 */
	[/Bravers|布萊巴斯|百人众|ブレイバーズ|格雷巴斯|布雷瓦斯/ig, 'Bravers'],
	[/《(布雷伯斯|勇者們)》/ig, '《Bravers》'],

	//海藤卡纳塔(彼方)
	['海腾|海藤', '海藤'],
	['海藤カナタ|海藤加塔納?|海藤卡纳塔|海藤加塔納|海藤加特納|海藤加達納', '海藤卡納塔'],

	['永恒之槍|古古尼尔|グングニル', '永恒之槍'],

	//《演算》男
	['町田|町田', '町田'],
	['亞亂|亜乱', '亜乱'],

	['瑪奧|馬奧|馬魯', '瑪奧'],
	[`瑪奧${sp}史密斯`, '瑪奧・史密斯'],

	['ヘルメス|赫爾墨斯', '赫爾墨斯'],
	['物体創造', '物体創造'],
	['ベイカー|貝克(?:茉秋)?', '貝克'],

	['海卡丘海尔|海卡丘凱尔', '海卡丘凱爾'],

	//《監察官》女
	['島田泉|島田泉|岛田泉', '島田泉'],
	['監察官', '監察官'],

	['オラクル|神諭', '神諭'],
	['圆藤硬弥|圓藤硬彌|円藤硬弥', '円藤硬弥'],
	['硬弥', '硬弥'],

	['狮方院真理|狮子院真理', '獅方院真理'],

	['变形', '變形'],
	['变质', '變質'],

	['METAMOR变质|METAMOR', '變質'],
	['【(メタモル|变质|变形)】(?:（变质|变形）)?', '【變形】'],

	['成濑成美', '成瀬成美'],

	['千里眼', '千里眼'],
	['天道', '天道'],
	['達也', '達也'],
	_word_jp1('タツヤ|它之亞|泰達', '達也'),
	['テンドウ|倎多|天道', '天道'],

	['イフリータ|伊芙利特', '伊芙利特'],
	['ショウコ|苏菲|晶子|修可', '晶子'],
	_word_jp1('アカギ|阿卡奇|赤城', '赤城'),
	['赤城晶子', '赤城晶子'],
	//['シアカギ', '修可'],

	['退魔師|退魔师|メイジマッシャー', '退魔師'],
	['三波', '三波'],
	['浅黄', '浅黄'],
	_word_jp1('アサギ|阿沙茲|阿沙奇|浅黄', '浅黄'),
	_word_jp1('ミナミ|三波|米納美', '三波'),

	['寛人|宽人', '寛人'],
	['博人', '博人'],

	_word_jp1('ゲイザ―|凝視者', '凝視者'),
	['見沼瞳|沼见瞳|见澤瞳', '見沼瞳'],

	['死镰|死亡尺距', '死鐮'],
	['近衛宮司', '近衛宮司'],

	/**
	 *
	 */

	['別名|二つ名|第二名稱', '別名'],
	['两名：', '別名：'],

	[`^${sp}((?:独特|主动|被动)技能)`, '$1・$2', 'mg'],

	['レベル|等級', '等級'],
	['パッシブスキル|被动技能', '被動技能'],
	['アクティブスキル|主动技能|主動的技能', '主動技能'],
	['ユニークスキル|独特技能', '獨特技能'],

	[/(\n・?)独特的?技能/g, '$1獨特技能'],

	[/^((?:独特|主动|被动)技能)$/gm, '・$1', 'mg'],

	['忌讳之名|忌み名|忌名', '忌名'],

	['前世経験値持越し不能|前世経験値不能持有|不能继承前世经验值|無法繼承前世經驗值|无法获得前世经验值|前世经验值不能继承|前世経験値持越し不能', '無法繼承前世經驗值'],
	[
		'既存ジョブ不能|不能取得已有職業|既存職業不能取得|无法就职已存在的職業|不能就职既有職業|既存職業不能|無法就職已存在職業取得|無法就職已存在職業取得|既存職業不能|無法就職已存在職業取得|现有職業不能|無法就職已存在職業',
		'無法就職已存在職業',
	],
	['経験値自力取得不能|不能自力获取经验值|无法由自身获得经验值|無法自行取得經驗值|不能自力取得经验值|经验值不能自行取得|经验值不能自力获得|経験値自力取得不能', '無法自行取得經驗值'],

	/**
	 * 組合詞
	 */

	/**
	 *
	 */
	['サイクロプス|塞克罗山|賽克洛斯|賽克罗山', '賽克洛斯'],
	['拉米亞|ラミア|LAMIA', '拉米亞', 'ig'],

	/**
	 *
	 **/

	['ダンピール|丹彼尔|丹皮尔', '丹皮爾'],
	['矮人|多华夫|多尔夫|侏儒|ドワーフ', '矮人'],

	['魔羯|カプリコーン', '魔羯'],
	['連鎖骸骨|ユニオンボーン', '連鎖骸骨'],

	['[复]眼', '複眼'],

	['(戰士|勇者|皇家衛士|騎兵)(蜥人|斯库拉)', '$2$1'],

	[`威尔迪哥|ウェンディゴ|威伦迪哥|溫迪戈`, '溫迪戈'],
	[`铁城威尔迪哥|ポイズンウェンディゴ|劇毒威尔迪哥|ポイズン威尔迪哥|铁城韦迪哥|毒性溫迪戈`, '毒性溫迪戈'],

	[`ジャックフロスト|冰霜傑克|傑克弗洛斯`, '冰霜傑克'],

	['(職業改变|職業變更|(職業)?轉職|ジョブチェンジ)(房間|部屋)|ジョブチェンジ部屋', '轉職房間'],

	//鎗

	[/GOLEM/ig, 'GOLEM'],
	['(魔(像|象)|哥雷姆|哥雷魯|GOLEM)(?!\\(?(?:魔(像|象)|哥雷姆|GOLEM))|ゴーレム', '魔像'],

	_word_jp1('テイマー', '馴獸師'),

	/**
	 *
	 **/

	//['精靈', '精灵'],
	['(?:暗黑|黑暗|闇|暗)(?:精(?:灵|靈)|艾尔芙)|(?:黑?暗|暗?黑|黑暗|闇)精靈|ダークエルフ', '暗黑艾爾芙'],
	['(混血|半)精[灵靈]', '$1艾爾芙'],

	['艾尔夫|艾尔芙|愛尔夫|エルフ', '艾爾芙'],

	['オッドアイ|異色双眼|異色双?瞳', '異色瞳'],

	['シアの実|牛油果', '牛油果'],
	['シアバター|乳木果', '乳木果'],
	_word_jp1('アサイー|阿萨', '阿薩'),
	['食品原料|食材', '食材'],
	['ランブータン|红毛丹', '紅毛丹'],


	['スキュラオリジンハイドルイドマスター|斯庫拉始源高等德魯伊大師|斯庫拉ORIGINハイドルイド大師|斯庫拉ORIGIN高等德魯伊大師', '斯庫拉始源高等德魯伊大師'],

	['ハイドルイド|高等德魯伊', '高等德魯伊'],

	['高斯特|幽灵', '幽靈'],

	['武士|サムライ', '武士'],
	['女忍者マスター|クノイチマスター', '女忍者大師'],
	['女忍者|クノイチ', '女忍者'],

	['王|キング', '王'],

	['竜人', '竜人'],
	['ハイゴブリン|高等哥布林|高等?哥布林', '高等哥布林'],

	['ヒュージボア|hubibor', 'ヒュージボア', 'ig'],
	['ホーンラビット|霍金比特', '霍金比特', 'ig'],

	['暗黒哥布林忍者絕對大師|ブラックゴブリンニンジャアブソリュートマスター', '暗黒哥布林忍者'],
	['ヴィザードソードアデプト|巫師劍術高手', '巫師劍術高手'],

	['女僕鎧甲|女佣鎧甲|女佣装甲|女仆装甲|メイドアーマー', '女僕鎧甲'],
	['女僕長|メイドチーフ', '女僕長'],

	['リビングキラーメイドアーマー|憑靈殺手女僕鎧甲|活杀手女仆詛咒鎧甲', '憑靈殺手女僕鎧甲'],
	['憑靈女僕鎧甲|リビングメイドアーマー', '憑靈女僕鎧甲'],
	['リビングアーマー|憑靈鎧甲', '憑靈鎧甲'],
	['CURSE ARMOR|詛咒鎧甲', '詛咒鎧甲'],

	['スケルトンブレイドデューク|骸骨刀刃公爵', '骸骨刀刃公爵'],

	['火焰幽靈|フレイムゴースト|FIRE GHOST', '火焰幽靈', 'ig'],

	['低階惡魔|レッサーデーモン', '低階惡魔'],
	['ストームドラゴン|暴風龍', '暴風龍'],
	['大地龍|アースドラゴン', '大地龍'],
	['巨大狂龍|グレートマッドドラゴン', '巨大狂龍'],

	['翼龍|ワイバーン', '翼龍'],

	['(食屍鬼|グール)(アマゾネス|亞馬遜)(リーダー|隊長)|亞馬遜隊長食屍鬼', '亞馬遜隊長食屍鬼'],

	['亞馬遜女王|アマゾネスクイーン', '亞馬遜女王'],

	['究級暴君巨獸食屍鬼|(食屍鬼|グール)グレート(タイラント|暴君)', '究級暴君巨獸食屍鬼'],
	['(食屍鬼|グール)(天穹|アーク)(タイラント|暴君)|暴君天穹食屍鬼|天穹暴君食屍鬼', '食屍鬼天穹暴君'],

	['食屍鬼之?王|グールキング', '食屍鬼王'],

	['(イモータル|不朽)(エント|樹人|樹魔)', '不朽樹魔'],

	['(?:天穹|アーク)(?:惡魔|デーモン)', '天穹惡魔'],

	['閃電幽靈|ブリッツゴースト', '閃電幽靈'],

	['(混沌|カオス)(艾爾芙|エルフ|精靈)', '混沌$2'],

	['飛行克拉肯|フライングクラーケン', '飛行克拉肯'],

	/**
	 *
	 */

	['牛鬼|ウシオニ', '牛鬼'],

	['水豚|ヒュージカピバラ', '水豚'],

	['哥布哥布|ゴブゴブ', '哥布哥布'],

	['公営カジノド|公營賭場|公営カジノ', '公營賭場'],

	['ロイヤルガード|皇家衛士', '皇家衛士'],

	['公會|ギルド', '公會'],

	['アマゾネス|亞馬遜', '亞馬遜'],

	['食屍鬼|グール', '食屍鬼'],
	['ウィザード|巫師', '巫師'],

	['ハーフ|混血兒?', '混血'],

	['騎兵|ライダー', '騎兵'],

	['タイラント|暴君', '暴君'],
	['イモータル|不朽', '不朽'],

	['エント|樹人|樹魔', '樹魔'],
	['ドラゴン|龍', '龍'],

	['アンデッド|不死者|不死製者|布死者', '不死者'],

	['ダンジョン|迷宮', '迷宮'],

	['多頭蛇|ヒュドラ', '多頭蛇'],

	['ゴブリン|哥布林', '哥布林'],
	['野蠻人|バーバリアン', '野蠻人'],
	['ソルジャー|士兵', '士兵'],

	['惡魔|デーモン', '惡魔'],

	['ゾンビ|僵屍', '僵屍'],
	['ヒーロー|英雄', '英雄'],

	['忍者|ニンジャ', '忍者'],
	['幽靈|ゴースト', '幽靈'],
	['マスター', '大師'],

	['タルタロス', '塔爾塔洛斯'],

	['鎧甲|アーマー', '鎧甲'],
	['女僕|メイド', '女僕'],

	_word_jp1('アブソリュート', '絕對'),

	_word_jp1('鱷魚人|アーマーン', '鱷魚人'),

	_word_jp1('始祖|ソース', '始祖'),

	['彌諾陶洛斯|ミノタウロス', '彌諾陶洛斯'],

	/**
	 *
	 */

	//['(?:アーク|阿珂|婭克|婭珂)(?!デーモン)', '婭珂'],

	/**
	 *
	 */
	['商業吉爾德|商業基德', '商業公會'],
	['吉爾德大師', '公會長'],
	['吉爾德', '公會'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = sublib._word_zh_all([

	...words_source,

	['気配感知|氣息感知', '氣息感知'],
	['狀態異常耐性|異常狀態耐性', '異常狀態耐性'],

	_word_jp1('手製品|アーティファクト|神器', '神器'),

	['BLACK GOBLIN SCOUT|暗黒哥布林偵察兵', '暗黒哥布林偵察兵', 'ig'],
	['BLACK GOBLIN NINJA|暗黒哥布林忍者', '暗黒哥布林忍者', 'ig'],
	['BLACK GOBLIN ASSASSIN|暗黒哥布林刺客', '暗黒哥布林刺客', 'ig'],

	['HIGH GOBLIN|高等哥布林', '高等哥布林', 'ig'],
	['GOBLIN KILLER|哥布林殺手', '哥布林殺手', 'ig'],
	['GOBLIN KNIGHT|哥布林騎士', '哥布林騎士', 'ig'],
	['哥布林士兵|GOBLIN SOLDIER', '哥布林士兵', 'ig'],
	['GOBLIN KING|哥布林王', '哥布林王', 'ig'],
	['GOBLIN MAGE|哥布林術師', '哥布林術師', 'ig'],
	['GOBLIN ARCHER|哥布林弓手', '哥布林弓手', 'ig'],
	['GOBLIN BARBARIAN|哥布林野蠻人', '哥布林野蠻人', 'ig'],
	['GOBLIN SKELETON|哥布林骸骨', '哥布林骸骨', 'ig'],

	['BLACK GOBLIN|暗黒哥布林', '暗黒哥布林', 'ig'],
	['哥布林|GOBLIN', '哥布林', 'ig'],

	[`光${sp}生命属性`, '$1・$2'],
	[`神${sp}(?:魯|菲|瑪|巴|裘|梅|魯|沛)`, '$1・$2'],
	[`勇者${sp}(?:寨|娑)`, '$1・$2'],

	['(晉|進)階(?!梯)', '晉階'],
	['(階位|位階|階級|ランク)(?!社会)', '位階'],
	['位階社会', '階級社會'],

	[
		/(位階|Rank) *(\d+) */ig, function (..._m)
	{
		return _m[1] + StrUtil.toFullNumber(_m[2]);
	},
	],

	[
		/ *([a-z]) *(級)/ig, function (..._m)
	{
		return StrUtil.toFullEnglish(_m[1]) + _m[2];
	},
	],

	[
		/(級) *([a-z]) *(?![a-z0-9])/ig, function (..._m)
	{
		return _m[1] + StrUtil.toFullEnglish(_m[2]);
	},
	],

	//[/BOSS/ig, 'BOSS'],
	[/Rank/ig, 'Rank'],
	//[/GHOUL/ig, 'GHOUL'],
	[
		/Dampire|GHOUL|ELF|BOSS|DARK|undead|status/ig, function (...m)
	{
		return m[0].toUpperCase();
	},
	],

	['[魔魔]王[之的の][碎肉欠残殘]片|魔王の欠片|魔王殘片|魔王的碎片', '魔王の欠片'],
	['[魔魔]王[之的の]墨[袋汁]?', '魔王の墨'],
	['魔王の甲羅|魔王的甲殼', '魔王の甲殻'],
	['魔王の?吸盤', '魔王の吸盤'],
	['魔王の角', '魔王の角'],
	['魔王の血', '魔王の血'],
	['魔王の?臭腺', '魔王の臭腺'],
	['魔王の発光器官', '魔王の發光器官'],
	['魔王の脂肪', '魔王の脂肪'],
	['魔王の牙', '魔王の牙'],
	['魔王の顎|魔王的下巴', '魔王の顎'],
	['魔王の眼球', '魔王の眼球'],
	['魔王の口吻', '魔王の口吻'],
	['魔王の体毛', '魔王の体毛'],
	['魔王の外骨格', '魔王の外骨格'],
	['魔王の節足', '魔王の節足'],
	['魔王の触角', '魔王の触角'],
	['魔王の鼻子?', '魔王の鼻'],
	['魔王の胸毛', '魔王の胸毛'],

	['導士', '導士'],
	['鞭舌禍', '鞭舌禍'],

	/**
	 *
	 */

	['悪の女幹部|惡质女干部', '悪の女幹部'],

	['水平(?!面)', '等級'],

	[
		[
			'^',
			'(?:',
			[
				'所有未潤色的',
			].join('|'),
			')?',
			'(?:',
			[
				'，',
			].join('|'),
			')?',
			'(?:',
			[
				'若?有',
			].join('|'),
			')?',
			'[\\d０-９]+',
			'\\s*',
			'(?:',
			[
				'個真正觀眾',
				'個真正的觀眾',
				'個以上的觀眾',
				'個真正的讀者',
				'個真正有感想的觀眾',
			].join('|'),
			')',
			'(?:',
			[
				'，',
			].join('|'),
			')?',
			'(?:',
			[
				'发完全',
				'发完整的話',
				'便发完整板',
				'就潤色沒潤色的全話',
				'发完整板',
				'就发完整板',
				'我才潤色回那話未潤色的話',
			].join('|'),
			')',
			'$',
		].join(''),
		'',
		'igm',
	],

	[`二米半`, '兩米半'],

	['畜力', '蓄力'],

	['成保', '城堡'],
	['成強', '城牆'],

	//['成原', '成員'],

	['死亡?属性', '死属性'],

	['死属性魅了', '死属性魅惑'],

	['甄别', '徵選'],

	['炮術', '砲術'],
	['炮', '砲'],

	['原種', '原種'],
	['貴施?種吸血鬼', '貴種吸血鬼'],

	['巨人族|巨人种族?', '巨人種'],
	['大的肉的洞|大肉洞', '大肉洞'],
	['肉婦', '肉婦'],

	['活行?屍', '活屍'],

	['父亲祖', '父祖'],

	['<-', '←'],

	//['板金', '板金'],
	['的種板金', '的重板金'],

	['女將屍', '女殭屍'],
	['占领君', '占领军'],

	[`^${sp}(名前|種族|年齢|二つ名|ジョブ|レベル|ジョブ履歴|能力値|パッシブスキル|アクティブスキル|ユニークスキル|魔王の欠片|呪い)`, '$1・$2', 'mg'],
	['选举王国', '选王国'],

	['首相', '宰相'],
	['維目包', '為目的'],

	['統合人', '統管者'],

	[/\n+(\(￣▽￣\)"?|（￣）￣）↗|\(\*\/ω＼\*\))\n+/g, '\n\n$1\n\n'],

	['付上', '附上'],

	['壹', '一'],

	['禦使', '御使'],

	['level', 'LV', 'ig'],

	['開拓地の?守護者', '開拓地の守護者'],

	['簒奪者|篡夺者', '簒奪者'],

	['(僵|殭)屍', '僵屍'],
	['(僵|殭)屍制造(者|商)', '僵屍制造者'],

	['樹術士|树斗士', '樹術士'],
	['滅導士', '滅導士'],

	['連携', '連携'],

	['城市国家|都市国家', '都市国家'],

	['無属性', '無属性'],

	['馮依|憑依', '憑依'],

	['维基感知|危险感知|危机感知', '危机感知'],
	['魔道引诱|魔道诱引', '魔道誘引'],
	['導き：魔道|引导：魔道', '引導：魔道'],

	['疑似導き', '疑似引導'],

	['魔王の(再|在)(?:临|来|世|来)', '魔王再世'],
	['炼成|錬成', '錬成'],
	['创成|創成', '創成'],
	['创|創', '創'],
	['炼|錬', '錬'],

	['顎|颚|鄂', '顎'],

	//['WYVERN}|双足飞龍', '飛龍'],

	['(轮|輪)(回|廻)|輪廻', '輪廻'],
	['(?:(轮|輪)(回|廻)|輪廻)转生|輪廻転生', '輪廻転生'],
	['転生', '転生'],

	['自動不死(者|族)化魔術陣', '自動不死者化魔術陣'],

	['作业履历|職業履歴', '職業履歴'],

	['輪廻神の幸運', '輪廻神の幸運'],

	['掠夺|プランダー|略奪', '掠奪'],

	['(名字|名前|名称|姓名)：', '名字：'],
	[/(\S)\n+(・?)名字：/gm, '$1\n\n\n$2名字：'],

	['英霊|英靈', '英靈'],

	['地下通路|地下交通網絡', '地下通路'],

	['呪い|詛咒', '詛咒'],

	['禦子|御子|禦子', '御子'],
	['国|國', '国'],
	['印像壁', '印象'],

	['境界山脈|境界山脉|边界山脉|边界山脈', '境界山脈'],

	['属性|屬性', '属性'],
	['ジョブ|職業', '職業'],
	['職業等級|職業水平', '職業等級'],

	['(魅了|魅惑?|魅或)の?魔眼', '魅惑魔眼'],

	['法之樁|法之桩', '法之樁'],

	['スキル', '技能'],
	['\n+・?魔物解說：', '\n\n\n・魔物解說：'],
	['\n+・?技能的?解說：', '\n\n\n・技能解說：'],
	['\n+・?稱號的?解說：', '\n\n\n・稱號解說：'],
	['\n+・?職業的?解說：', '\n\n\n・職業解說：'],

	['解説', '解說'],
	['job解説|ジョブ解説|職業解說', '職業解說'],

	['沼沢|沼澤', '沼澤'],

	[/^◎/gm, '・'],

	_word_jp1('メンバー', '成員'),
	_word_jp1('パーティー', '隊伍'),
	_word_jp1('ギルド', '公會'),
	_word_jp1('(公會|ギルド)(マスター|大師)', '公會長'),
	_word_jp1('タイプ', '種'),
	_word_jp1('カード', '卡'),
	_word_jp1('マジックアイテム|MAGIC ITEM', '魔法道具', 'ig'),
	_word_jp1('メートル', '米'),
	_word_jp1('ステータス|Status|狀態', '狀態', 'ig'),
	_word_jp1('キャラクター|人物', '人物', 'ig'),
	_word_jp1('スキャンダル', '醜聞', 'ig'),
	_word_jp1('リーダー', '首領', 'ig'),
	_word_jp1('チート', '作弊', 'ig'),
	_word_jp1('アイドル', '偶像', 'ig'),

	_word_jp1('テロリストグループ', '恐怖組織', 'ig'),

	['職業改变|職業轉职|職業轉換|職業變更|職業チェンジ', '職業變更'],

	['偵查|スカウト', '偵查'],
	['エージェント|代理', '代理'],

	/**
	 *
	 */

	[`《([^『「《》』」“”‘’\n]+?)[》』」]`, '《$1》'],

	[/^\?/gm, '・'],

	[/^[ \t　]+/gm, ''],
	[/^_+\n/g, ''],
	[/\n,\n/g, '\n\n'],
	[/([・：]) /g, '$1'],

	[/“([^\n“”]+?)‘’/gm, '“$1”'],

	[/^‘’/gm, '“'],
	[/‘’$/gm, '”'],

	[/\n+\(￣▽￣\)"\n+/g, '\n\n\n\n'],

	[/\<\-/g, '←'],

	//[/([」』）])[ ]*\[([^\[\]\n]+)\]$/gm, '$1《$2》'],

	[/〔([^\n〔〕（）\(\)]+)〕/g, '（$1）'],

	[/^【([^【】\n]+)】$/gm, '「$1」'],

	[/^\*(?!\*)/gm, '＊'],

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	...sublib.lazymarks['class'],

	['蟲', '蟲'],
	['術', '術'],
	['屍', '屍'],
	['護', '護'],
	['悪', '惡'],

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

	[/(\n[^・\n][^\n]+)\n(・)/g, '$1\n\n$2'],
	[/(\n[^：\n]+：[^\n]+)\n{2}([^：\n]+：)/g, '$1\n$2'],
	[/(\S)\n{1,2}(・(?:名稱|職業解說|魔物解說)|名稱)/g, '$1\n\n\n$2'],
	[/^(・(?:職業|魔物|技能)解說[^\n]*)\n(\S)/gm, '$1\n\n$2'],

	[/(（NEW！）)\n{2,}(?=[^\n]+（NEW！）)/igm, '$1\n'],

]);

// 需要人工確認的屏蔽字或錯字用語等等
export const words_maybe = [
	// 將對主角用的用語改為 小家伙
	//'小.?子',

	//'亞斯',

];

export const value = {
	chapter_id: '{{0, num2zh}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,
};

import * as self from './四度目は嫌な死属性魔術師';

export default self;
