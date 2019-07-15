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

	_word_jp1('ユキ|优纪', '優紀'),

	_word_jp1('レフィ|雷菲|蕾菲', '蕾菲'),
	_word_jp1('レフィシオス|(蕾|雷)菲亚斯|(蕾|雷)菲西奧斯', '蕾菲亞斯'),
	_word_jp1('イルーナ|依露娜', '依露娜'),
	_word_jp1('レイエス|雷亚斯', '雷亞斯'),

	_word_jp1('ルローレ|露罗菈', '露羅菈'),
	_word_jp1('グリファ|格利法', '格利法'),

	_word_jp1('レイラ|蕾拉|雷拉', '蕾拉'),

	_word_jp1('リューイン|蕾茵', '蕾茵'),
	_word_jp1('ギロル|吉洛尔', '吉洛爾'),

	[`蕾茵${sp}吉洛爾`, '蕾茵＝吉洛爾'],

	_word_jp1('汐|シィ', '汐'),
	_word_jp1('莫弗利爾|モフリル', '莫弗利爾'),
	_word_jp1('利爾|リル', '利爾'),

	_word_jp1('イグ|伊格', '伊格'),
	_word_jp1('ドラジール|優基爾', '優基爾'),

	[`伊格${sp}優基爾`, '伊格＝優基爾'],

	_word_jp1('ネル|涅爾', '涅爾'),

	/**
	 *
	 */
	_word_jp1('レイド|雷德', '雷德'),
	_word_jp1('グローリオ|格罗里奥', '格羅里奧'),
	_word_jp1('アーリシア|亚利西亚', '亞利西亞'),

	_word_jp1('リュート|雷特', '雷特'),

	[`${sp}格羅里奧${sp}亞利西亞`, '＝格羅里奧＝亞利西亞'],

	_word_jp1('ガムディア|卡姆迪亞', '卡姆迪亞'),
	_word_jp1('ロストン|羅斯頓', '羅斯頓'),

	[`卡姆迪亞${sp}羅斯頓`, '卡姆迪亞＝羅斯頓'],

	/**
	 *
	 */
	_word_jp1('艾爾菲羅|アルフィーロ|阿爾費羅', '艾爾菲羅'),

	_word_jp1('レイロー|雷洛', '雷洛'),
	_word_jp1('ルルービア|勒魯維亞', '勒魯維亞'),

	[`雷洛${sp}勒魯維亞`, '雷洛＝勒魯維亞'],

	/**
	 *
	 */

	_word_jp1('蝙蝠|コウモリ', '蝙蝠'),
	_word_jp1('龍|ドラゴン', '龍'),

	_word_jp1('アーク ?デーモン', '惡魔'),

	_word_jp1('芬里爾|フェンリル', '芬里爾'),

	_word_jp1('角虎|ホーンタイガー', '角虎'),
	_word_jp1('吉夫提希兔|ギフティヒラビット', '吉夫提希兔'),

	/**
	 *
	 */
	_word_jp1('謝魯米|シェルミ', '謝魯米'),
	_word_jp1('爆炸蘑菇|バクテングダケ', '爆炸蘑菇'),

	/**
	 *
	 */
	_word_jp1('クリエイト・ブルーム', 'Create・Bloom'),

	/**
	 *
	 */
	_word_jp1('ダンジョンポイント|迷宮點數', '迷宮點數'),
	_word_jp1('スキルポイント', '技能點'),

	_word_jp1('菜單|メニュー|選單', '選單'),
	_word_jp1('扭蛋|ガチャ', '扭蛋'),

	_word_jp1('(ＤＰ|dp)(カタログ|目錄)', 'ＤＰ目錄'),

	_word_jp1('分析(?:アナライズ)?|アナライズ', '分析'),

	_word_jp1('アイテムボックス|道具箱', '道具箱'),

	_word_jp1('階級|クラス', '階級'),

	['言語翻訳|語言翻譯', '語言翻譯'],

	_word_jp1('タメィゴッチ', 'タメィゴッチ'),

	['固有唯一技能|固有獨特技能|固有技能|固有ユニークスキル', '固有技能'],

];

/**
 * 實際使用的取代樣式
 */
export const words: IWords[] = _word_zh_all([

	...words_source,

	['覇龍', '覇龍'],
	['錬成', '錬成'],
	['錬', '錬'],

	_word_en3('DP', (s) => StrUtil.toFullEnglish(s.toUpperCase())),
	_word_en3('\\d+DP', (s) => StrUtil.toFullEnglish(s)),

	_word_en3('([a-z]) *[\\+\\+＋]', function (...m)
	{
		return StrUtil.toFullEnglish(m[2].toUpperCase()) + '＋'
	}),

	[/(?<![\u4E00-\u9FFF])一+(?![\u4E00-\u9FFF])/g, function (s)
	{
		return '─'.repeat(s.length)
	}],

	[/^[　 ]+/gm, ''],

	[/(?<=\S)\n{1,2}(?=姓?名：)/gm, '\n\n\n'],
	[/(?<=\S)\n(?=──)/gm, '\n\n'],

	[/(?<=^──[^\n]+)\n(?![^\n]+──$|\n)/gm, '\n\n'],

	[/^名：/gm, '姓名：'],

	[/(?<=姓名：[^\n]*)\n+(?=種族：)/gm, '\n'],

	...lazymarks['class'],
	//...lazymarks['zh_cht'],

	//...lazymarks['unit'],

	...lazymarks['4'],

	...lazymarks['full_width_001'],
	...lazymarks['full_width_002'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	['>', (s) => StrUtil.toFullWidth(s)],

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
