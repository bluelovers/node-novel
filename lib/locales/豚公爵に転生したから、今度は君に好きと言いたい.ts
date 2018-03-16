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
	['史諾|斯諾|斯洛', '史諾'],
	['夏洛特', '夏洛特'],

	/**
	 * 愛莉西亞・布拉・迪亞・薩奇斯塔
	 */
	['維杰|維傑', '維傑'],
	[`維傑・格雷特・洛德`, '維傑・格雷特洛德'],
	[`維傑${sp}格雷特洛德`, '維傑・格雷特洛德'],

	[`修亞${sp}紐傑倫`, '修亞・紐傑倫'],

	/**
	 * 洛克莫科老師
	 * 阿魯魯老師
	 */
	['洛克莫科|洛克莫可', '洛克莫科'],
	['雅露露|阿魯魯', '雅露露'],

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

	['巴爾德羅伊|巴尔德罗伊', '巴爾德羅伊'],
	['亞魯特安傑|亞魯多安傑|アルトアンジュ|雅尔特安琪', '亞魯多安傑'],
	['瑪魯尼|瑪魯狄?尼|瑪魯狄寧|馬尔迪尼', '瑪魯狄尼'],
	['卡莉娜|卡麗娜', '卡莉娜'],
	['埃雅利斯|埃雅莉絲', '埃雅莉絲'],
	['娜塔黎雅|娜塔莉亞', '娜塔黎雅'],
	['庫梅爾', '庫梅爾'],

	['シルバ|席爾巴|希尔瓦', '希尔瓦'],

	['溫德路|溫路德|溫德爾', '溫德爾'],

	['巨體豪傑|巨体豪杰', '巨體豪傑'],

	/**
	 * 優雷姆
	 * 格爾修魔法学園
	 */
	['格爾修|克魯修', '格爾修'],
	['德斯托魯|多斯托魯?', '德斯托魯'],
	['達利斯|達利絲|达里斯', '達利斯'],
	['優雷姆', '優雷姆'],

	/**
	 *
	 */
	['魔法学院|魔法学園', '魔法学園'],
	['学院|学園', '学園'],
	['王女|公主', '王女'],

	['水豬騎士|水豚騎士', '水豚騎士'],

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
