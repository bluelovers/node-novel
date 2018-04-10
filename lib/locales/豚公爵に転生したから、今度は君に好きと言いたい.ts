/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

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
export const words: IWords[] = sublib._word_zh_all([

	['豬(公爵)', '豚$1'],
	['(史諾|白|黑)豬', '$1豚'],
	['豬史諾', '史諾豚'],
	['史諾|斯諾|斯洛', '史諾'],
	['夏洛特', '夏洛特'],

	['驍扎庫|休捷克', '休捷克'],

	/**
	 * 愛莉西亞・布拉・迪亞・薩奇斯塔
	 *
	 * 夏洛特・莉莉・休捷克
	 */
	['維杰|維傑|維森|毕久|ジョン', '維傑'],
	['格雷特罗德|格雷特洛德|古雷多罗德|グレイトロード', '格雷特洛德'],

	[`維傑・格雷特・洛德`, '維傑・格雷特洛德'],
	[`維傑${sp}格雷特洛德`, '維傑・格雷特洛德'],

	[`修亞${sp}紐傑倫`, '修亞・紐傑倫'],

	['雅莉西婭|愛莉西亞|亞里希亞|アリシア', '愛莉西亞'],

	/**
	 * 洛克莫科老師
	 * 阿魯魯老師
	 *
	 * 莫洛佐夫学園长
	 */
	['洛克莫科|洛克莫可', '洛克莫科'],
	['雅露露|阿魯魯', '雅露露'],
	['莫洛澤夫|莫洛佐夫', '莫洛佐夫'],

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
	['丹寧古', '丹寧古'],

	['巴爾德羅伊|巴尔德罗伊|伯爾德萊', '巴爾德羅伊'],
	['亞魯特安傑|亞魯多安傑|アルトアンジュ|雅尔特安琪|亞爾托安傑|阿魯德安吉', '亞爾托安傑'],
	['瑪魯尼|瑪魯狄?尼|瑪魯狄寧|馬尔迪尼', '瑪魯狄尼'],
	['卡莉娜|卡麗娜', '卡莉娜'],
	['埃雅利斯|埃雅莉絲|艾瑞絲', '埃雅莉絲'],
	['娜塔黎雅|娜塔莉亞', '娜塔黎雅'],
	['庫梅爾', '庫梅爾'],

	['賽克梅特|塞赫麥特', '賽克梅特'],

	['シルバ|席爾巴|希尔瓦|希爾巴', '希尔瓦'],

	['溫德路|溫路德|溫德爾', '溫德爾'],

	['巨體豪傑|巨体豪杰', '巨體豪傑'],

	/**
	 * 優雷姆
	 * 格爾修魔法学園
	 */
	['格爾修|克魯修', '格爾修'],
	['德斯托魯|多斯托魯?', '德斯托魯'],
	['達利斯|達利絲|达里斯|达丽斯', '達利斯'],
	['優雷姆|由雷姆', '優雷姆'],

	['迷いの森|謎之森|迷惑的森林', '迷惑的森林'],


	['修捷克|休捷克', '修捷克'],

	['米涅爾瓦|密涅瓦|米涅奴?瓦|米涅瓦', '密涅瓦'],

	/**
	 *
	 */
	['魔法学院|魔法学園', '魔法学園'],
	['学院|学園', '学園'],
	['王女|公主', '王女'],

	['水豬騎士|水豚騎士', '水豚騎士'],

	['CYCLOPS', '獨眼巨人', 'ig'],
	['ORC|豬頭人|奧克', '奧克', 'ig'],

	['Royal Knights?', 'Royal Knight', 'ig'],

	['DUNGEON MASTER', '迷宮主', 'ig'],
	['DUNGEON CORE', '迷宮核', 'ig'],
	['DUNGEON', '迷宮', 'ig'],

	[/([^\n]+)(?:（譯：\1）)/g, '$1', 'ig'],

	['ガール＆シューヤ|女孩＆修亞|Girl＆修亞', '女孩＆修亞'],

	...sublib.lazymarks['class'],

	[/(\S)\n{1,2}(?=　+●)/gm, '$1\n\n\n'],
	[/^(　+●[^\n]*)\n{1}(?=\S)/gm, '$1\n\n'],

	[/^　(?![　\s●])/gm, ''],

	_word_en(/\d+/g, function (...m)
	{
		if (m[1] == '─')
		{
			m[1] = '—';
		}

		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	...sublib.lazymarks[4],

	...sublib.lazymarks[0],
	...sublib.lazymarks[1],
	...sublib.lazymarks[2],
	...sublib.lazymarks[3],
	...sublib.lazymarks[5],

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
