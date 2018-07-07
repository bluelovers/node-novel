/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '';

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


	/**
	 * 馬尔蓮族
	 */
	['亞伯|アベル|亞貝尔|亞貝魯|阿貝爾|亞貝儿|亜貝爾', '亞貝魯'],
	['貝雷克|ベレーク', '貝雷克'],
	['瑪雷家|ベレーク家', '貝雷克家'],

	['亞貝魯・(馬|瑪)雷', '亞貝魯・貝雷克'],

	['ヤマサン・マウンテン|山先生・摩恩特恩', '山先生・摩恩特恩'],

	['姬澤露|ジゼル|姬塞露|吉赛尔', '姬澤露'],
	['ゼレルート|泽列特|澤列魯特|澤利特|澤雷路', '澤列魯特'],
	['澤列|澤利', '澤列'],

	['マーレン|馬尔蓮?(?!科|澤)|瑪雷|馬雷|瑪爾(?!科|澤)|瑪連|馬蓮', '瑪雷'],

	['阿德|アーディー|阿迪', '阿迪'],
	['ガリア|加里奧', '加里奧'],
	['シビィ|西碧', '西碧'],

	['菲羅|フィロ|菲洛|菲萝', '菲蘿'],

	['瑪雷科|カルコ|馬爾科|卡爾科', '卡爾科'],
	['洛茲艾魯|ノズウェル|諾茲威爾|诺兹维尔', '洛茲艾魯'],

	['麗葉塔|リエッタ|丽叶特', '麗葉塔'],

	['艾力吉奥|エリジオ', '艾力吉奥'],

	['莉露|リル', '莉露'],
	['リーフェル|莉芙艾爾', '莉芙艾爾'],

	/**
	 * シム
	 */
	['西姆', '西姆'],

	/**
	 *
	 */
	['ロマーヌ|洛馬努|諾馬努|羅馬奴|羅瑪奴', '諾馬努'],

	['メア|梅亞|美亞|美亜|梅艾', '梅亞'],
	['詹姆斯|ジェーム|傑姆|戒姆', '詹姆斯'],

	['嘎斯通|ガストン|加斯頓|加斯通|哥斯通', '加斯頓'],
	['貝拉姆洛|デッケェ|バイラブロウ|拜拿布羅', '貝拉姆洛'],
	['新・貝拉姆洛|新。貝拉姆洛', '新・貝拉姆洛'],

	['キメラの尾|奇美拉的尾巴|奇美拉之尾', '奇美拉之尾'],

	// ----------

	['リーシャ|莉夏|莉莎', '莉莎'],
	['ティーダ|緹达', '緹達'],

	['瑪伊澤恩|マイゼン|马伊泽恩|马因泽恩|瑪因澤恩|瑪音澤恩|瑪爾澤恩|瑪雷澤恩', '瑪伊澤恩'],

	['エリア|艾麗雅|艾莉亞|艾丽娅', '艾莉亞'],

	// ----------

	['ホモ|賀摩', '賀摩'],
	['アレン|艾倫', '艾倫'],

	['エベルハイド|艾伯海德|エベルハイト|玉宝海德|艾貝爾海德|艾貝爾德|亞貝魯海德', '艾貝爾海德'],

	['ウェゲナー|維盖納|維格納|韦格納', '維格納'],
	['ウルコック|乌爾克庫|乌爾科克', '乌爾克庫'],

	['レジーノ|雷吉諾|rejino|Rejino', '雷吉諾'],

	// -----------

	['ゴードン|哥顿', '哥頓'],
	['モードン|莫顿', '莫頓'],

	// ------------

	['ロウディオ|羅乌迪奧', '羅乌迪奧'],

	// ----------

	['ナタリ|娜塔莉', '娜塔莉'],
	['メリッサ|梅莉莎', '梅莉莎'],

	['スイ|修伊', '修伊'],
	['スードニア|修多尼亞', '修多尼亞'],
	['修伊。修多尼亞', '修伊・修多尼亞'],

	['克里夫', '克里夫'],

	/**
	 *
	 */
	['シャルロット|夏洛特', '夏洛特'],
	['蘭斯洛特', '蘭斯洛特'],
	['阿爾馮斯|亞魯佛斯|アルフォンス', '阿爾馮斯'],

	['ブライアン|布萊恩', '布萊恩'],
	['ボンド|邦德', '邦德'],
	['布萊恩。邦德', '布萊恩・邦德'],

	/**
	 *
	 */
	['シェイム|塞依姆|水暮', '塞依姆'],

	['ラルク|拉爾克|拉路古|拉魯庫', '拉爾克'],
	['ファージ|珐基|琺基', '琺基'],

	['ユーリス|尤莉斯|尤里斯', '尤莉斯'],
	['マヤ|瑪雅', '瑪雅'],

	['納路加魯|ナルガルン|纳尔加仑|納爾加倫', '納路加魯'],

	['イカロス|伊卡洛斯', '伊卡洛斯'],
	['イーザイダ|伊澤爾達', '伊澤爾達'],
	['伊卡洛斯。伊澤爾達', '伊卡洛斯・伊澤爾達'],

	['リングス|尼恩古修', '尼恩古修'],
	['マリアス|瑪麗阿斯|瑪利亞絲|瑪麗亞絲', '瑪麗亞絲'],

	/**
	 *
	 */
	['マーグス|瑪古修', '瑪古修'],
	['マルグノア|瑪魯古羅亞', '瑪魯古羅亞'],
	['瑪古修。瑪魯古羅亞', '瑪古修・瑪魯古羅亞'],

	['ヨルゼス|約魯森斯', '約魯森斯'],

	/**
	 *
	 */
	['庫多爾|クゥドル|庫乌多爾|庫多魯', '庫多爾'],
	['伽爾迦|ガルージャ', '伽爾迦'],
	['利維依?|リーヴァイ', '利維'],
	['瑪哈爾卜|マハルボ', '瑪哈爾卜'],
	['希爾菲姆|シルフェイム', '希爾菲姆'],



	['ゾロモニア|佐羅莫妮亞', '佐羅莫妮亞'],
	['知恵と破滅の大?悪魔|智慧及破滅的大?惡魔|智慧和破滅的大?惡魔|智慧與破滅的大?惡魔', '智慧與破滅的大惡魔'],


	/**
	 *
	 */
	['廃城エルトネナ|废都艾魯特涅納', '废都艾魯特涅納'],
	['ゼシュム遺跡|澤舒姆遺跡', '澤舒姆遺跡'],
	['ゼシュム|澤舒姆|zeshumu', '澤舒姆', 'ig'],

	['阿爾芙海姆|阿爾弗海姆|アルフヘイム', '阿爾芙海姆'],

	['ディンラート|迪恩那多|迪恩拉特', '迪恩那多'],
	['艾爾克西亞|エルクシア|艾路古絲亞', '艾爾克西亞'],

	['アッシム|阿西姆', '阿西姆'],

	['オルディー|歐魯迪', '歐魯迪'],

	['リーヴァラス|利維拉絲', '利維拉絲'],

	['ルーガート|盧戈哈特', '盧戈哈特'],
	['マルフィリア|瑪露菲莉亞', '瑪露菲莉亞'],

	['路卡托|卢卡多|ルーガート', '盧卡多'],

	/**
	 *
	 */
	['エドナ|艾德納|埃伯纳|艾德娜', '艾德納'],
	['エルバータ|埃爾伯特|艾尔伯特|艾爾巴塔', '埃爾伯特'],

	['ベレニス|貝雷尼斯', '貝雷尼斯'],
	['ベルモンド|貝爾蒙德', '貝爾蒙德'],

	['アルタミア|雅爾塔米亞', '雅爾塔米亞'],

	/**
	 *
	 */
	['オーテム|歐特魯|欧特姆|歐姆特', '歐特魯'],
	['神託札|神諭牌', '神諭牌'],

	['亞貝魯饮料|亞貝魯藥水', '亞貝魯藥水'],

	['歐特魯台車|歐特魯卡車', '歐特魯台車'],

	['福特爾|フーテル', '福特爾'],
	['香煙葉|香火因叶', '香煙葉'],
	['香煙草', '香煙草'],
	['火因袋|煙袋', '煙袋'],

	['ベノル銅|貝羅爾銅', '貝羅爾銅'],
	['アコレ銅|奧克利铜', '奧克利銅'],

	['ヒョットル|休特爾', '休特爾'],

	['魔導携帯電話|マギフォン|魔導攜帶電話|魔道手机', '魔導携帯電話'],

	['イッサ草|以撒草', '以撒草'],

	/**
	 *
	 */
	['ドゥーム|多姆', '多姆'],
	['諾瓦爾', '諾瓦爾'],
	['精靈|エルフ', '精靈'],

	['諾庫斯|ノークス|諾克斯', '諾克斯'],

	['ピーグ|グリフォン', '匹戈'],

	['達爾德瓦夫|ダルドワーフ', '達爾德瓦夫'],

	/**
	 *
	 */
	['爾古木|ニグム', '爾古木'],
	['イベン|易典', '易典'],
	['博亞|ボア', '博亞'],

	['グレーターベア|巨型熊|大熊|Great Bear|green bear', '巨型熊', 'ig'],

	['希姆帕咯特|格里芬|シムパロット|格利芬', '格里芬'],

	['キメラ|基美拉|奇美拉|吉美拉', '奇美拉'],

	['ガルム|吉美拉', '奇美拉'],

	['ノークス|地狱犬', '地獄犬'],
	['ハウンド|狩獵犬', '狩獵犬'],

	['クロックバード|時鐘鳥', '時鐘鳥'],

	['哥布島|哥布岛|哥布刀|哥布Dao', '哥布島'],

	[`(?:伊貝爾|イベール)${sp}(?:巴雲|バウン)`, '伊貝爾・巴雲'],
	[`伊貝爾。巴雲`, '伊貝爾・巴雲'],

	[`三首龍|三頭龍`, '三頭龍'],

	[`フィフニーグ|菲芙尼格`, '菲芙尼格'],

	/**
	 *
	 */
	['结构結界|構造結界', '構造結界'],

	['小和尚|小子', '小子'],

	// --------------

	[/^　/gm, ''],

	[/【/g, '「'],
	[/】/g, '」'],

	_word_en(/\d+g/ig, function (...m: string[])
	{
		return m[1] + StrUtil.toFullWidth(m[2].toUpperCase());
	}),

	_word_en(/\d+/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	_word_en(/[a-z]/ig, function (...m)
	{
		return m[1] + StrUtil.toFullEnglish(m[2]);
	}),

	...sublib.lazymarks['class'],

	...sublib.lazymarks[4],

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

export default exports;
