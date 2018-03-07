/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '魔王様、リトライ！';

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
	 *
	 */
	[`(?:霧|雾)雨`, '霧雨'],
	[`零`, '零'],
	[`悠`, '悠'],

	...[
		'桐野　悠',
		'霧雨　零',
		'宮王子　蓮',
		'的場　静',
		'加藤　勝',
		'近藤　友哉',
		'田原　勇',
		'野村　武文',
	].reduce(function (a, b)
	{
		let c = b.split('　');

		a.push([c.join(''), b]);
		a.push([c.join(sp), b]);

		return a;
	}, []),

	/**
	 *
	 */
	[`托路|托珑|托泷|托拢`, '托珑'],
	[`琼恩|裘恩`, '琼恩'],

	/**
	 *
	 */
	[`露娜${sp}愛蕾岗特`, '露娜・愛蕾岗特'],
	[`(?:琪拉|琪菈)`, '琪菈'],
	[`(?:琪拉|琪菈)古依`, '琪菈・古依'],
	[`(?:琪拉|琪菈)${sp}古依`, '琪菈・古依'],

	[`安洁露霍瓦伊特`, '安洁露・霍瓦伊特'],
	[`安洁露${sp}霍瓦伊特`, '安洁露・霍瓦伊特'],

	/**
	 *
	 */
	[`玛乌托福吉`, '玛乌托・福吉'],
	[`玛乌托${sp}福吉`, '玛乌托・福吉'],
	[`多納${sp}多納`, '多納・多納'],


	[`玛夏魯|玛夏露`, '玛夏魯'],
	[`玛夏魯${sp}安茨`, '玛夏魯・安茨'],

	[`比利茨${sp}兰克`, '比利茨・兰克'],
	[`欧${sp}文古魯`, '欧・文古魯'],

	[`艾比福莱伊|艾比富莱特|艾比富莱依`, '艾比福莱依'],

	[`艾比福莱依${sp}巴塔福莱依`, '艾比福莱依・巴塔福莱依'],

	[`玛妲穆|MADAME`, '瑪妲穆'],

	[`玛妲穆${sp}巴塔福莱依`, '玛妲穆・巴塔福莱依'],
	[`(?:夫人|玛妲穆)${sp}艾比福莱依`, '玛妲穆・艾比福莱依'],

	[`卡其福莱依${sp}巴塔福莱依`, '卡其福莱依・巴塔福莱依'],
	[`玛妲穆卡其福莱依`, '玛妲穆・卡其福莱依'],
	[`玛妲穆${sp}卡其福莱依`, '玛妲穆・卡其福莱依'],

	[`兰迪${sp}玛涅`, '兰迪・玛涅'],

	[`兰波|萨波`, '萨波'],
	[`科曼多${sp}萨波`, '科曼多・萨波'],

	[`米利岗|米利崗`, '米利崗'],

	[`雪風|雪风`, '雪风'],
	[`蜜柑|蜜康`, '蜜康'],

	/**
	 *
	 */
	['兔子之?村|拉比之?村', '拉比村'],
	[`Love${sp}Prison`, 'Love・Prison', 'ig'],

	['城镇路奇|路奇城', '路奇城'],

	/**
	 *
	 */
	['红斑的?蛇|赤链蛇|赤斑の?蛇|赤煉蛇', '赤煉蛇'],
	['拉姆达聖货|拉姆达聖币', '拉姆达聖币'],

	['兔[儿]', '兔耳'],
	['野戦病院|野戰醫院', '野戰病院'],
	['冷水浴|冷泉浴', '冷泉浴'],

	[/对冰\.魔防/g, '对冰・魔防'],
	['記録改竄|記錄竄改', '記錄竄改'],

	['素体', '素体'],
	['讀才者|独裁者', '独裁者'],

	[/W?usa/ig, 'Wusa'],
	[/(\W)maa(?!\w)/ig, '$1嘛'],

	['情報の一部が公開されました。|一部份的情報已公開。', '一部份的情報已公開。'],

	['悪', '惡'],
	[`玛`, '瑪'],
	[`戦`, '戰'],

	[`【`, '「'],
	[`】`, '」'],

	[/^\.$/gm, ''],

	[/^　+/gm, ''],

	...sublib.lazymarks['class'],

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
