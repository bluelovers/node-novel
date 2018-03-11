/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';
import { _word_en } from './lib/index';

/**
 * 改成小說名字
 */
export const lang = '物語の中の銀の髪';

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

	[`白崎${sp}陸`, '白崎　陸'],
	[`白崎`, '白崎'],
	[`陸`, '陸'],
	[`白崎?陸`, '白崎陸'],

	/**
	 * 希拉村
	 * 艾吾斯神父
	 *
	 * 首都海麓
	 *
	 * 雅露佳
	 * 莎拉
	 *
	 * 安德西亞卿
	 * 巴魯特恩・利維魯
	 */
	[`压里亞|亞里亞|亞莉亞`, '亞里亞'],
	[`(海納|海娜|高納)教国家?`, '海納教国'],
	[`(海納|海娜|高納)`, '海納'],

	[`狼之集会|狼群`, '狼之集会'],

	[`雅露佳|Aruka|亞路嘉`, '雅露佳'],
	[`莎拉|萨拉`, '莎拉'],

	[`(莎拉|雅露佳)先生`, '$1桑'],

	[`Hairuzu|海麓祖?|海露茲|海魯谷=?|ハイルズ`, '海麓'],

	['艾利都斯|亞魯托斯', '亞魯托斯'],
	['涅依|涅易', '涅依'],


	/**
	 * 奧路亞納王国首都亞魯諾
	 * 始祖神鳥在魯布的街
	 * 亞魯涅森林
	 */
	[`萊瓦恩|ライヴァン|萊伊維恩|萊伊威恩`, '萊伊維恩'],
	[`萊伊維恩(联盟|同盟)`, '萊伊維恩同盟'],

	/**
	 *
	 */
	['クルルシュム|克尔露西尤努|庫路路西姆', '庫路路西姆'],
	['拉茲|雷斯|ラズ', '雷斯'],

	['菲爾|菲露', '菲露'],


	/**
	 *
	 */
	[`Yayuenai|雅乐乃`, '雅乐乃'],
	[`庫兰|蔻兰`, '蔻兰'],

	/**
	 *
	 */
	['フェアリーライト|妖精之光', '妖精之光'],

	/**
	 *
	 */
	['斯摩夫|始祖神鳥', '始祖神鳥'],

	/**
	 * 西恩奧乌伽之森
	 */
	[`(?:Magic|魔術|マジック)${sp}(?:Tail|Teiru|テイル)`, 'Magic・Tail', 'ig'],

	['レベル|等級', '等級'],
	['工会|公会|行会', '公会'],
	['执事|管家', '执事'],
	[/(币\d+)张/, '$1枚'],
	['教堂|教会', '教会'],
	['旅館|旅店', '旅館'],
	['选手等待室|选手待机室', '选手等待室'],
	['高等精灵|高級精灵', '高等精灵'],
	['登陸|登錄', '登錄'],
	['魔道队|魔導隊', '魔導隊'],
	['先生|桑', '桑'],
	['五师匠|五宗師', '五師匠'],
	['侏儒|矮人', '矮人'],

	/**
	 *
	 */
	...sublib.lazymarks['class'],

	['视(角|点)(变|转)(换|更)|視点変更|视角变更', '視点變更'],

	//[/^(視点変更)[ 　]*([\u4E00-\u9FFF？\d０-９]+)[ 　]*[—→]+[ 　]*/gm, '$1　$2　→　'],
	[/^(視点変更)[ 　]*([^\n]+?)[ 　]*[—→]+[ 　]*/gm, function (...m)
	{
		return m[1] + '　' + StrUtil.trim(m[2]) + '　' + '→' + '　';
	}],
	[/\n+(視点変更[^\n]+)/gm, '\n\n\n$1'],
	[/^(視点変更[^\n]+)\n(?=\S)/gm, '$1\n\n'],
	[/(視点)\n(?=\S)/gm, '$1\n\n'],
	[/視/g, '視'],

	[/［/g, '「'],
	[/］/g, '」'],

	[/^【([^】\n]+)】$/gm, '「$1」'],

	[/(【魔法)[　 ]+/g, '$1　'],

	[/<|>/g, function (s)
	{
		return StrUtil.toFullWidth(s);
	}],

	_word_en(/LV|HP|MP|EXP|[a-z]|\d+|EDCBA/g, function (s)
	{
		return StrUtil.toFullWidth(s.toUpperCase());
	}),

	[/(。) (\S)/gm, '$1$2'],

	[/^[　 ]+/gm, ''],

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

	let r = _word_en(/\./g, '$1。');

	//console.log(r);

	text = text.replace(r[0], r[1]);

	return text;
}

export default exports;
