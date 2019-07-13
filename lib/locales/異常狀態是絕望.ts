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
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '';

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IWords[] = [

	['根鷺|跟鷺', '根鷺'],
	['灰斗|Kite', '灰斗'],

	_word_jp1('カイト', '灰斗'),
	_word_jp1('ネサギ', '根鷺'),

	/**
	 *
	 */
	_word_jp1('ハヤト', '隼人'),
	_word_jp1('ミナミ', '南'),

	_word_jp1('ルリ', '琉璃'),
	_word_jp1('アンジョウ', '安城'),

	_word_jp1('リサ', '梨紗'),
	_word_jp1('オカモト', '岡本'),

	/**
	 *
	 */
	_word_jp1('娜魯夏爾|ナルシエル|娜露夏爾', '娜露夏爾'),
	_word_jp1('阿梅魯都鐵|アメルドーテ|阿梅爾多特', '阿梅爾多特'),

	_word_jp1('夏爾|シエル', '夏爾'),

	[`娜露夏爾${sp}阿梅爾多特`, '娜露夏爾＝阿梅爾多特'],

	/**
	 *
	 */
	_word_jp1('帕斯蒂爾|パステル', '帕斯蒂爾'),

	/**
	 *
	 */
	['信仰と救済の街|信仰和救濟之城', '信仰和救濟之城'],
	_word_jp1('サーメルン|桑梅倫|サーメ蓮', '桑梅倫'),

	_word_jp1('リズリル|利茲里爾|莉茲莉露|莉絲莉露', '莉茲莉露'),
	_word_jp1('リズ|莉茲|莉絲', '莉茲'),
	_word_jp1('リル|莉露', '莉露'),

	['猫の隠れ家|貓的藏身處?', '貓的藏身處'],

	_word_jp1('希凡蜜思|シーファミス|希法蜜絲', '希法蜜絲'),
	_word_jp1('馬盧克森|マルクセン', '馬盧克森'),

	[`希法蜜絲${sp}馬盧克森`, '希法蜜絲＝馬盧克森'],

	/**
	 *
	 */
	_word_jp1('アルフコッチ|阿雷斯', '阿雷斯'),

	/**
	 *
	 */

	_word_jp1('海密力斯|ヘイミリィース', '海密力斯'),



	_word_jp1('剛涅魯|カンネル', '剛涅魯'),
	_word_jp1('強杜魯多|キャンドルッド', '強杜魯多'),
	_word_jp1('芙雷|フーレイ', '芙雷'),
	_word_jp1('米庫|ミク', '米庫'),

	_word_jp1('穆魯希|ムルヒ', '米庫'),
	_word_jp1('伊庫希里亞|イクシリア', '伊庫希里亞'),
	_word_jp1('蘭沙齊|ランサッチ', '蘭沙齊'),


	_word_jp1('塔裡木|タリム', '塔裡木'),



	/**
	 *
	 */
	_word_jp1('畢爾姆魯斯|ピルムルス', '畢爾姆魯斯'),

	_word_jp1('傾かない天秤|從不傾斜的天平', '從不傾斜的天秤'),
	_word_jp1('紐坦德|ノータンド', '紐坦德'),
	_word_jp1('利布拉|リブラ', '利布拉'),

	_word_jp1('イクシル|伊庫西露', '伊庫西露'),

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	_word_jp1('特殊技能|スペシャルスキル', '特殊技能'),

	[/^[　 ]+/gm, ''],

	[/\n+(＾+)\n+/g, '\n\n\n$1\n\n'],

	[
		/^(ー+)$/gm, function (...m)
	{
		return '─'.repeat(m[1].length)
	},
	],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	...lazymarks['unit'],

	...lazymarks[4],

	...lazymarks['full_width_001'],
	//...lazymarks['full_width_002'],

	...lazymarks[0],
	...lazymarks[1],
	...lazymarks[2],
	...lazymarks[3],
	...lazymarks[5],

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

/**
 * 其他用途
 *
 * @deprecated
 * @type {{chapter_id: string; chapter_title: string; volume_id: string; volume_title: string}}
 */
export const value = {
	chapter_id: '第{{0}}話',
	chapter_title: `$t(chapter_id, [{{0}}])　{{title}}`,

	volume_id: '第{{0}}章',
	volume_title: `$t(chapter_id, [{{0}}])：{{title}}`,
};

export default exports;
