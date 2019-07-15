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
export const lang = '破壊の御子';

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
export const words: IWords[] = _word_zh_all([

	['蒼馬|ソーマ|Soma', '蒼馬'],
	['木崎|キサキ|Kisaki', '木崎'],
	['木崎蒼馬', '木崎蒼馬'],
	[`蒼馬${sp}木崎`, '蒼馬・木崎'],

	/**
	 * 法古路・加路古索・謝姆路
	 * ファグル・ガルグズ・シェムル
	 *
	 * 法古路・加路古索・葛拉姆
	 *
	 * 加路古索族長
	 */
	[`謝姆路|シェムル|榭姆露|謝姆露|謝姓路`, '謝姆露'],
	[`葛拉姆|ガラム`, '葛拉姆'],

	[`(?:法古路|ファグル)${sp}(?:加路古索|ガルグズ)${sp}`, '法古路・加路古索・'],


	[`ガルグズ|加路古索`, '加路古索'],
	[`プシュカ|普斯卡`, '普斯卡'],
	[`法古路|ファグル`, '法古路'],
	[`古拉卡卡|クラガッカ`, '古拉卡卡'],
	[`ガジェタ|加傑塔`, '加傑塔'],

	[`ヂェタ|德塔`, '德塔'],
	[`シェポマ|謝波瑪`, '謝波瑪'],
	[`ヂェタ|德塔`, '德塔'],

	[`烏努卡|ウヌカ`, '烏努卡'],

	/**
	 * 塞提烏斯
	 * 馬克羅尼中隊長輔佐
	 *
	 * 米爾達斯神官
	 */
	['セティウス|塞提烏斯', '塞提烏斯'],
	['マルクロニス|馬克羅尼', '馬克羅尼'],
	['ミルダス|米爾達斯', '米爾達斯'],

	/**
	 * 《愚断帝》卡苏那魯
	 * 《剧毒貴妇人》玛丽・瑟伦那魯
	 * 《斩首公》巴甘杨
	 * 《暴虐帝》古拉・古密斯苏
	 * 天才科学家《死神》オットー・ザイデンベッヒャーに
	 *
	 * 在聖教中，作為聖教的鼻祖，被頌讚為神之子的救世主英諾森。他的弟子的一人奧古斯都，將與英諾森的對話紀錄成書。
	 */
	['破壊の御子', '破壊の御子'],
	['御子', '御子'],
	['イノセント|英諾森', '英諾森'],
	['アウグスト|奧古斯都', '奧古斯都'],

	['ジュピデクス|朱庇提克斯', '朱庇提克斯'],
	['バグルダッカ|巴古魯達卡', '巴古魯達卡'],
	['アウストラビス|奧斯特拉維斯', '奧斯特拉維斯'],
	['パルフェナ|芭露菲娜', '芭露菲娜'],

	['気高き牙|高尚之牙', '高尚之牙'],
	['牙の氏族', '牙の氏族'],
	['猛き牙|勇猛之牙', '勇猛之牙'],

	['落とし子|落子|Otoshigo|おとしご', '落子'],

	[`ゲノバンダ|蓋諾班達`, '蓋諾班達'],
	[`たてがみの氏族|鬃の氏族`, '鬃の氏族'],
	[`爪の氏族`, '爪の氏族'],

	[`聖乙女|聖少女`, '聖少女'],

	[`人類之神|人間の神|人神`, '人類之神'],

	['奧菈|Aura|アウラ', '奧菈'],
	['死と破壊の女神|死亡與破壞之女神', '死亡與破壞之女神'],

	/**
	 *
	 */
	['アウグストの覚書|奧古斯都的備忘錄', '奧古斯都的備忘錄'],

	/**
	 *
	 */
	['ツタ|蔦', '蔦'],

	/**
	 * 賽尔代亞斯（セルデアス）大陆
	 *
	 * 公用語所使用的迪亞茲語，也不是神官們使用的神聖語。但是和森精靈與矮人等亞人的語言似乎也不相同
	 *
	 * 索爾比安托平原
	 * 賀爾梅亞国
	 * 平原北方的多納斯山脈
	 *
	 * カシュルカ公国
	 */
	['賽尔代亞斯|セルデアス|瑟魯蒂亞斯|瑟鲁得亚斯', '賽爾代亞斯'],
	['ホルメア|賀爾梅亞', '賀爾梅亞'],
	['ソルビアント|索爾比安托', '索爾比安托'],
	['ドーナス|多納斯', '多納斯'],
	['デアス|迪亞茲', '迪亞茲'],
	['ドーナス|多納斯', '多納斯'],
	['カシュルカ|卡斯路加', '卡斯路加'],
	['シュパムール|斯帕馬爾', '斯帕馬爾'],



	/**
	 *
	 */
	['蜥蜴人|ディノサウリアン|Dinosaurian|龍人', '龍人'],
	['人鱼|マーマン(?:Merman)?|Mamann|人魚', '人魚'],
	['矮人|ドワーフ(?:Dwarf)?|Dwarf', '矮人'],
	['森精靈?|エルフ(?:Elf)?|Elf', '森精靈'],
	['獸人|ゾアン(?:Zoan)?|Zoan', '獸人'],
	['鳥人|ハーピュアン|Harpyan', '鳥人'],
	['騎竜', '騎竜'],
	['人類', '人類'],

	...lazymarks['class'],

	[/(\S)\n{1,2}(?=　{2,})/gm, '$1\n\n\n\n'],
	[/^[　 ]+/gm, ''],

	[/^-([\u4E00-\u9FFF])/gm, '─$1'],

	_word_en(/\d+/g, function (...m)
	{
		if (m[1] == '─')
		{
			m[1] = '—';
		}

		return m[1] + StrUtil.toFullNumber(m[2]);
	}),

	...lazymarks['4'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

	//...lazymarks['ln'],
	//[/\n+([◆◇]+)\n+/g, '\n\n\n$1\n\n'],

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
