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
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['カイヴォン|凱馮|馮凱', '凱馮'],

	_word_jp1('露耶|リュエ', '露耶'),
	['賽彌耶魯|セミエール', '賽彌耶魯'],

	_word_jp1('蕾絲|レイス', '蕾絲'),
	_word_jp1('雷斯特|レスト|蕾絲忒', '雷斯特'),

	['庫洛姆威魯|クロムウェル', '庫洛姆威魯'],
	['艾索德|アイソード', '艾索德'],
	_word_jp1('理希德|リヒト', '理希德'),

	_word_jp1('伊月|イツキ', '伊月'),
	_word_jp1('レン|蓮', '蓮'),

	_word_jp1('吉田|ヨシダ', '吉田'),
	_word_jp1('イグゾウ|伊久造', '伊久造'),

	_word_jp1('イル|伊魯|依琉', '依琉'),

	['伊久造・吉田', '伊久造・吉田'],
	['吉田・伊久造', '吉田・伊久造'],

	['普雷希德龍|プレシードドラゴン', '普雷希德龍'],
	['普雷希德|プレシード', '普雷希德'],

	[`(プレシード|預種|普雷希德)・(ドラゴン|龍)`, '預種・龍'],

	['萊拉|蕾拉', '蕾拉'],
	['布萊特', '布萊特'],

	['露庫斯貝露|リュクスベル|露庫絲貝露', '露庫絲貝露'],
	['依庫絲貝露|イクスペル', '依庫絲貝露'],
	['愛露絲貝露|エルスペル', '愛露絲貝露'],

	['愛露絲|エルス', '愛露絲'],
	['依庫絲|イクス', '依庫絲'],
	['絲貝露|スペル|斯貝露', '絲貝露'],

	['達利亞|ダリア', '達利亞'],
	['布萊特|ブライト', '布萊特'],

	['歐因克|オインク', '歐因克'],
	_word_jp1('アール|婭露', '婭露'),
	_word_jp1('アキミヤ|阿基米婭', '阿基米婭'),

	['索魯托伯古', '索魯托伯古'],

	['蘭特', '蘭特'],

	['斯蒂麗亞|スティリア', '斯蒂麗亞'],
	['シェザード|謝扎德', '謝扎德'],

	['藍堂|ランドウ', '藍堂'],
	_word_jp1('那央|ナオ', '那央'),

	['フォレスト|佛雷斯特|フォ雷斯特', '佛雷斯特'],
	['麥肯齊|マッケンジー', '麥肯齊'],

	['アーカム|阿卡姆', '阿卡姆'],
	_word_jp1('フィナル|菲納魯', '菲納魯'),
	['蘭德希魯特|ランドシルト', '蘭德希魯特'],

	['柯尼希|ケーニッヒ', '柯尼希'],

	['リシャル|里夏爾', '里夏爾'],
	['利茲洛特|リーズロート', '利茲洛特'],

	_word_jp1('ヴィオ|薇奧', '薇奧'),

	['雷尼|レイニー|蕾妮', '蕾妮'],
	['利涅艾丽斯|リネアリス|莉涅艾丽絲', '莉涅艾麗絲'],

	['戈爾多', '戈爾多'],

	/**
	 *
	 */
	['職業☆Miss少女|職業乙女', '職業乙女'],
	['利布拉里|リブラリー', '利布拉里'],
	['セカン達利亞|セカンダリア|塞坎達利亞|塞坎達里亞', '塞坎達利亞'],
	['サーディス|薩迪斯', '薩迪斯'],
	['阿紀達魯|アキダル', '阿紀達魯'],

	['ガルデウス|迦魯迪烏斯', '迦魯迪烏斯'],

	['瑪英茲穀|瑪英茲谷|マインズバレー', '瑪英茲谷'],
	['ファストリア|法斯特利亞|法斯托利亞', '法斯特利亞'],

	['エンドレシア|恩德雷希亞|恩格雷希亞|恩德雷西亞|エンドレ西亞', '恩德雷希亞'],
	['瑟彌法那爾|セミフィナル|塞米菲爾|塞西菲爾|セミ菲納魯|瑟彌菲那爾', '瑟彌法那爾'],

	['ウィング雷斯特|ウィングレスト|溫古・?雷斯特|溫古斯特|ウィング・?レスト', '溫古・雷斯特'],

	['恩迪亞|エンディア', '恩迪亞'],

	['サイエス|塞耶斯', '塞耶斯'],

	['シンデリア|辛蒂利亞', '辛蒂利亞'],

	['サーズガルド|薩茲加魯德|薩茲迦魯德', '薩茲迦魯德'],
	['亞爾維斯|アルヴィース', '亞爾維斯'],

	['ソルトバーグ|塞爾托巴博|索魯托伯古', '索魯托伯古'],

	['ブライトネスアーチ|布萊特涅斯亞奇', '布萊特涅斯亞奇'],

	/**
	 *
	 */
	_word_jp1('亞莉娜|アリナ|亞麗娜|アイナ', '亞莉娜'),

	/**
	 *
	 */

	_word_jp1('阿魯巴|アルバ', '阿魯巴'),
	_word_jp1('道森|ドーソン', '道森'),
	_word_jp1('ゴルド|多戈爾|戈爾多', '戈爾多'),
	_word_jp1('レイラ|蕾拉', '蕾拉'),
	_word_jp1('シュン|修因', '修因'),

	_word_jp1('シシル|希露露|シルル', '希露露'),
	_word_jp1('レイナ|蕾娜', '蕾娜'),

	_word_jp1('ゴトー|梧桐', '梧桐'),

	/**
	 *
	 */
	_word_jp1('アールアス|亞爾阿斯', '亞爾阿斯'),
	_word_jp1('塞琉|セリュー', '塞琉'),

	/**
	 *
	 */
	_word_jp1('レゾーネ|雷佐內', '雷佐內'),
	_word_jp1('艾露|エル', '艾露'),

	/**
	 *
	 */
	_word_jp1('ディスラート|蒂斯拉特', '蒂斯拉特'),
	_word_jp1('クレア|克蕾雅', '克蕾雅'),

	_word_jp1('ロブス|羅布斯', '羅布斯'),


	/**
	 *
	 */
	['大媽媽|偉大母親|グランドマザー|伟大之母|偉大なる母|偉大的母親|GrandMother|Grandmother', '偉大母親', 'ig'],

	['GRANDIA SEED|グランディアシード', 'GRANDIA SEED', 'ig'],
	['Online Game|線上遊戲', '線上遊戲', 'ig'],

	_word_jp1('盧庫斯|ルクス', '盧庫斯'),



	['Kujata|庫亞塔', '庫亞塔'],

	['Meister|大師|マイスター', '大師'],

	['サクリファイス|犧牲', '犧牲'],

	['港口都市|港口城市|港口城鎮', '港口都市'],

	['フォースドコレクション|強制收集', '強制收集'],

	['波動斬|WaveMotion', '波動斬'],

	_word_jp1('カースギフト|借贷礼物|詛咒禮物', '詛咒禮物'),
	['能給對象賦予自身所持有的任意一個技能|対象に自身の所持するアビリティを任意で一つ付与する', '能給對象賦予自身所持有的任意一個技能'],
	['一旦賦予，會持續到對像被消滅才會解除|一度付与したアビリティは解除するか対象が消滅するまで持続する', '一旦賦予，會持續到對像被消滅才會解除'],
	['可以將賦予的任意技能的效果反轉|付与するアビリティは任意で効果を反転させる事が可能', '可以將賦予的任意技能的效果反轉'],

	['Creature|生物', '生物'],

	['ニブルヘイム|尼福爾海姆', '尼福爾海姆'],

	['InsanityPhoenix|狂亂不死鳥', '狂亂不死鳥'],

	['洞窟蝙蝠|CaveBad|ケイブバッド', '洞窟蝙蝠', 'ig'],
	['AshPhoenix|灰燼不死鳥|灰盡不死鳥', '灰燼不死鳥', 'ig'],
	['Phoenix|不死鳥', '不死鳥', 'ig'],

	['Chronos・Eater|時空・吞噬', '時空・吞噬', 'ig'],
	['AbsoluteZero|絶對零度', '絶對零度', 'ig'],
	['Charge|充能', '充能', 'ig'],

	['指鎧|ArmourRing', '指鎧', 'ig'],

	['路線|Course', '路線', 'ig'],

	_word_jp1('フリューゲル', '天翼'),
	_word_en3('Flugel', '天翼'),

	/**
	 *
	 */
	['精靈|Efl|Elf', '精靈'],

	['等級|Level|レベル', '等級'],
	['技能|Skill|スキル', '技能'],
	['Status|狀態', '狀態'],
	['(Weapon|武器) ?(特性|Ability)', '武器特性'],
	['Ability|特性|アビリティ', '特性'],

	['elder ?精靈|高等精靈', '高等精靈', 'ig'],

	_word_jp1('ハーフエルフ', '半精靈'),

	_word_jp1('ドルディア|多爾蒂亞', '多爾蒂亞'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['回復魔法', '回復魔法'],

	['公會卡片', '公會卡'],

	_word_jp1('ヒロイン', '女主角'),
	_word_jp1('セクシー', '性感'),
	_word_jp1('ゲームプレイヤー', '遊戲玩家'),
	_word_jp1('ゲーム', '遊戲'),
	_word_jp1('ギルド', '公會'),
	_word_jp1('バランス', '平衡'),
	_word_jp1('ステータス', '狀態'),
	_word_jp1('サポート', '支援'),

	['回[复]', '回復'],

	['對象', '對象'],
	['印像', '印象'],

	['詳細鑑定', '詳細鑑定'],

	['选单', '選單'],
	['職業', '職業'],

	['註意|注意', '注意'],

	['藍', '藍'],
	['達', '達'],
	['彌', '彌'],
	['馮', '馮'],

	['闘士|斗士', '闘士'],

	/**
	 *
	 */

	[
		/([\u4E00-\u9FFF。，…]|\n)(\d+)(?=[\u4E00-\u9FFF。…，])/g, function (...m)
	{
		m[2] = StrUtil.toFullNumber(m[2]);
		return m[1] + StrUtil.toFullNumber(m[2]);
	},
	],

	[/　 /g, '　　'],
	['──── ────', '────────'],

	[/^(  )+/gm, function (s)
	{
		return '　'.repeat(s.length / 2)
	}],

	...lazymarks['class'],

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	...lazymarks['4'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	[/^(【[^\n]+)\n{2}(?=【[^\n]+】[^\n]+)/gm, '$1\n'],
	[/^(【[^\n]+)\n{2}(?=　)/gm, '$1\n'],
	[/^(　[^\n]+)\n{2}(?=　{2,})/gm, '$1\n'],
	[/^(　『[^\n]+)\n{2}(?=　『)/gm, '$1\n'],

	[/^(　[\u4E00-\u9FFF]+『[^\n]+』)\n{2}(?=　[\u4E00-\u9FFF]+『)/gm, '$1\n'],

	[/([^\s\-─])\n{1,2}(?=【Name】)/gm, '$1\n\n\n'],

] as IWords[]);

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
