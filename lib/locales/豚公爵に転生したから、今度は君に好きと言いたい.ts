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
export const lang = '豚公爵に転生したから、今度は君に好きと言いたい';

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

	['豬(公爵)', '豚$1'],
	['(史諾|白|暗?黑)豬', '$1豚'],
	['豚?豬史諾', '史諾豚'],
	['史諾|斯諾|斯洛', '史諾'],
	['夏洛特', '夏洛特'],

	['史諾噗|スローブ', '史諾噗'],

	/**
	 * 愛莉西亞・布拉・迪亞・薩奇斯塔
	 *
	 * 夏洛特・莉莉・休捷克
	 */
	_word_jp1('維杰|維傑|維森|毕久|ビジョン|維遜', '維傑'),

	['格雷特罗德|格雷特洛德|古雷多罗德|グレイトロード|格罗尔巴特', '格雷特洛德'],

	[`維傑・格雷特・洛德`, '維傑・格雷特洛德'],
	[`維傑${sp}格雷特洛德`, '維傑・格雷特洛德'],

	[`修亞|修耶`, '修亞'],

	[`修亞${sp}紐傑倫`, '修亞・紐傑倫'],

	['雅莉西婭|愛莉西亞|亞里希亞|アリシア|艾麗西亞', '愛莉西亞'],

	[`${sp}(?:布拉|布菈)${sp}(?:迪亞|蒂婭)${sp}薩奇斯塔`, '・布拉・迪亞・薩奇斯塔'],

	/**
	 * 洛克莫科老師
	 * 阿魯魯老師
	 *
	 * 莫洛佐夫学園长
	 */
	['洛克莫科|洛克莫可', '洛克莫科'],
	['海蘭德', '海蘭德'],

	['雅露露|阿魯魯|亞露露', '雅露露'],
	['莫洛澤夫|莫洛佐夫|莫罗佐夫', '莫洛佐夫'],

	/**
	 * 巴爾德羅伊・丹寧古
	 * 風之大精靈亞魯特安傑
	 *
	 * 皮克西
	 * 埃雅利斯
	 * 黑龍賽克梅特
	 *
	 * 達利絲
	 *
	 * 希尔瓦所挥动的闪耀的付與劍（Enchant Sword）
	 */
	['丹寧古|丹尼古|丹尼尔|丹尼斯', '丹寧古'],

	['巴爾德羅伊|巴尔德罗伊|伯爾德萊', '巴爾德羅伊'],
	['亞魯特安傑|亞魯多安傑|アルトアンジュ|雅尔特安琪|亞爾托安傑|阿魯德安吉|阿爾特安祖', '亞爾托安傑'],
	['瑪魯尼|瑪魯狄?尼|瑪魯狄寧|馬尔迪尼|馬魯丁尼|馬尔蒂尼|瑪爾蒂尼', '瑪魯狄尼'],

	['芙蘭達|フレンダ', '芙蘭達'],
	['PIXIE|皮克西|ピクシー|小妖精', '皮克西'],
	['埃雅利斯|埃雅莉絲|艾瑞絲|艾尔丽絲|エアリス|艾阿麗絲|艾爾麗斯', '埃雅莉絲'],

	['娜塔黎雅|娜塔莉亞', '娜塔黎雅'],
	['庫梅爾', '庫梅爾'],

	['賽克梅特|塞赫麥特|セクメト', '賽克梅特'],
	['サイクロプス|賽克洛斯|獨眼巨人|塞克罗斯', '獨眼巨人'],

	['シルバ|席爾巴|希尔瓦|希爾巴|席爾瓦', '希爾瓦'],

	['卡莉娜|卡麗娜', '卡莉娜'],
	//卡莉娜・莉托爾・達利斯
	[`${sp}(?:莉托爾|利特尔)${sp}達利斯`, '・莉托爾・達利斯'],

	['溫德路|溫路德|溫德爾|溫德禄', '溫德爾'],

	['巨體豪傑|巨体豪杰|巨人豪傑', '巨體豪傑'],

	['娜娜托莉潔|納納托利傑|ナナトリージュ|娜娜托麗潔', '娜娜托莉潔'],
	['娜娜莉|納納利', '娜娜莉'],


	/**
	 * 優雷姆
	 * 格爾修魔法学園
	 */
	['格爾修|克魯修|格魯修|库尔什', '格爾修'],
	['德斯托魯爾?|多斯托魯?|ドストル', '德斯托魯'],
	['達利斯|達利絲|达里斯|达丽斯|達莉斯', '達利斯'],
	['優雷姆|由雷姆', '優雷姆'],

	['迷いの森|謎之森|迷惑的森林', '迷惑的森林'],


	['驍扎庫|修捷克|休捷克|修傑克|ヒュージャック|休傑克', '修捷克'],

	['米涅爾瓦|密涅瓦|米涅奴?瓦|米涅瓦', '密涅瓦'],

	/**
	 *
	 */
	['林肯|リンカーン', '林肯'],
	['フランベルジュ|弗蘭貝爾洁|FLAMBERGE', 'FLAMBERGE'],

	['哈爾巴多|ハルバード', '哈爾巴多'],
	['涅梅西斯|ネメシス', '涅梅西斯'],



	['ガット—|加特|ガットー', '加特'],

	/**
	 *
	 */
	['巴利多', '巴利多'],

	/**
	 *
	 */
	['布希塔|噗嘻塔|ブヒータ|布黑塔', '布希塔'],

	/**
	 *
	 */
	['蒂斯梅露露|デスメルル', '蒂斯梅露露'],
	['闇の大精霊|暗之大精靈', '闇之大精靈'],

	['埃爾多雷特|エルドレッド', '埃爾多雷特'],

	/**
	 *
	 */
	['ドライバック|多萊巴克|托萊巴克', '多萊巴克'],
	['修泰貝爾特|シュタイベルト', '修泰貝爾特'],
	['德帕', '德帕'],

	/**
	 *
	 */
	_word_jp1('ユニバース|優尼維斯|悠尼巴斯', '悠尼巴斯'),

	_word_jp1('レングラム|蓮古拉姆|雷古拉姆|蘭格朗姆', '蘭格朗姆'),


	/**
	 *
	 */
	['水豬騎士|水豚騎士|水豬頭騎士', '水豚騎士'],

	['夢魔|サキュバス', '夢魔'],

	['アタックリザード|阿塔庫里澤塔|ATTACKLIZARD|特攻蜥蜴|Attack Lizard|进击的?巨蜥|進攻蜥蜴', '特攻蜥蜴'],

	['CYCLOPS', '獨眼巨人', 'ig'],
	['ORC|奧克', '奧克', 'ig'],
	['豬頭?人', '豬人', 'ig'],

	['ガール＆シューヤ|女孩＆修亞|Girl＆修亞', '女孩＆修亞'],
];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	_word_en3('Royal ?Knights?', 'Royal Knight', 'ig'),

	['DUNGEON MASTER', '迷宮主', 'ig'],
	['DUNGEON CORE', '迷宮核', 'ig'],
	['DUNGEON', '迷宮', 'ig'],

	['魔法学院|魔法学園', '魔法学園'],
	['学院|学園', '学園'],
	['王女|公主', '王女'],

	_word_en3('Enchant ?Sword', 'ENCHANT SWORD', 'ig'),
	_word_en3('ELEMENTAL ?MASTER', 'ELEMENTAL MASTER', 'ig'),
	_word_en3('CONTINUES?', 'CONTINUE', 'ig'),
	_word_en3('DRAGON ?SLAYER', 'DRAGON SLAYER', 'ig'),
	_word_en3('SECOND ?RUNNER', 'SECOND RUNNER', 'ig'),
	_word_en3('TOP ?RUNNER', 'TOP RUNNER', 'ig'),
	_word_en3('WHITE ?LILY', 'WHITE LILY', 'ig'),
	_word_en3('PRINCESS', 'PRINCESS', 'ig'),

	[/([^\n]+)(?:（譯：\1）)/g, '$1', 'ig'],

	...lazymarks['class'],

	_word_en3('eelemental', 'Elemental', 'ig'),

	[/(\S)\n{1,2}(?=　+●)/gm, '$1\n\n\n'],
	[/^(　+●[^\n]*)\n{1}(?=\S)/gm, '$1\n\n'],

	[/^　(?![　\s●])/gm, ''],

	[/(([^\n“”「」『』])(」|”))\1{1,}(?!$)/gm, function (...m)
	{
		return m[2].repeat((m[0].length / m[1].length));
	}],

	_word_en(/\d+/g, function (...m)
	{
		if (m[1] == '─')
		{
			m[1] = '—';
		}

		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	[/“([^\n“”「」『』]+)“/g, '「$1」'],

	...lazymarks['4'],

	...lazymarks['0'],
	...lazymarks['1'],

	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

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
