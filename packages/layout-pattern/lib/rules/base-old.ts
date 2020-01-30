import lazymarks from '@node-novel/layout-pattern/lib/core/pattern';
import { _word_en3, _word_jp1, _word_zh_all } from '@node-novel/layout-pattern/lib/core/word';
import { IWords, vMaybe, IWordsAll } from '@node-novel/layout-pattern/lib/core/word';
import { sp } from '@node-novel/layout-pattern/lib/core/const';
import getBaiduTable from '@node-novel/layout-pattern/lib/core/helper/baidu';
import { zhRegExp } from 'regexp-cjk';
import { IPatternRule } from '@node-novel/layout-pattern/lib/core/types';
import { EnumLazyMarkKeys } from '@node-novel/layout-pattern/lib/core/pattern-keys';
import WORDS_MAYBE from '@node-novel/layout-pattern/lib/core/words/maybe';

/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
export const lang = '' as const;

/**
 * 在這裡放此小說專屬的取代樣本
 */
export const words_source: IPatternRule["words_source"] = [

	//['要取代的字', '取代後的字'],
	//_word_jp1('日文原名專用', '日文原名專用'),
	//_word_en3('英文專用', '英文專用'),

];

/**
 * @private
 */
export const words_layout: IPatternRule["words_layout"] = [
	// BOM
	...lazymarks['c000'],

	...getBaiduTable(),
	...lazymarks['zh'],
	...lazymarks['zh2'],

	//['(不死者?)[話话]', '$1化'],
	//['而后在', '之後在'],

	//['多余', '多餘'],

	//['解開實，', '解開時，'],
	//['四肢成現', '四肢呈現'],
	//['看來身前', '看來生前'],
	//['進化灰飛', '進化會飛'],
	//['馬車行不死', '馬車型不死'],

	//['回來的之後', '回來之後'],

	[/混\+蛋/g, '混蛋'],

	[/\*\*[纵縱]/g, '操縱'],

	['敲si', '敲死'],
	['弓虽', '強'],
	//['女干(?!部)', '奸'],
	['強女干(?!部)', '強奸'],

	//['強奸', '強姦'],

	//['捋军', '将军'],

	//['很方面', '很方便'],

	['壹([声身])', '一$1'],

	//['就事就', '就是就'],
	//['(困難)就事', '$1就是'],

	//[/([^\w]|^)boss(?!\w)/ig, '$1BOSS'],
	...lazymarks['en'],

	['咀咒', '詛咒'],

	//['詳細其況', '詳細況'],

	//['之配者', '支配者'],

	//['範圍得大小', '範圍的大小'],

	//['肉體語言', '肢體語言'],

	//['后坐力', '後座力'],

	//['元(玩家|随从)', '原$1'],

	// @todo 擊
	//['(不斷擊|暈|昏)到', '$1倒'],
	//['一樣擊到的', '一樣擊倒的'],
	//['被擊到', '被擊倒'],

	//[`前現(${sp}|[，、。也\n]|$)`, '前線$1'],
	//[`選像(${sp}|[，、。也\n]|$)`, '選項$1'],

	//['社會行像', '社會形象'],

	//['哥雷魯|哥雷姆|格雷姆', '哥雷姆'],
	//['阿[拉剌]克[尼涅涅妮捏]|阿剌克涅|阿剌克捏', '阿剌克涅'],
	//['被首再', '被守在'],
	//['拉米[亚亞娅雅]|阿米拉米亚克|拉米亚克|拉米那克', '拉米亞'],

	//['卻時是', '確實是'],
	//['不负责人', '不负责任'],

	//['也受(露出)', '野獸$1'],

	//['(能)就值(跟)?', '$1確實就職$2'],

	//['攻擊範為', '攻擊範圍'],

	//['(工|女王|墓園|兵隊)綘', '$1蜂'],

	//['多於(的)', '多餘$1'],
	//['(太)多於', '$1多餘'],

	//['發案者', '提案者'],
	//['(教學|贈與|信仰)(對像|對相|對象)', '$1對象'],

	//['好象', '好像'],

	//[/情[ ]?se[ ]?小说/, '情色小说'],

	//['方變活動', '方便活動'],

	//['初新者', '初心者'],

	//['待再(?!次)', '待在'],
	//['感知道', '感知到'],

	//['成為裡想', '成為理想'],
	//['掉以輕新', '掉以輕心'],
	//['全原的', '全員的'],
	//['用興鍛鍊', '用心鍛鍊'],
	//['這麼用興', '這麼用心'],
	//['輕意', '輕易'],
	//['與背其他', '與被其他'],

	// @todo 已/以
	//['已經受入', '已經收入'],
	//['已([你一自班是]|不堪)', '以$1'],
	//['还已权', '还以权'],
	//['我已那', '我以那'],
	//['要已公', '要以公'],
	//['，已阿', '，以阿'],

	//['玩全部一樣', '完不一樣'],

	//['在[裡裏里](社會|社会)', '在裏社會'],

	//['不[觉覚覺]的', '不覺得'],

	// @todo 复覆復
	//['([反答])[复覆復]', '$1覆'],
	//['重[復复](着|这道|了几遍|同样|回想)', '重覆$1'],
	//['恢覆', '恢復'],
	//['多次重[復复]', '多次重覆'],
	//['[復复]活', '復活'],

	//['沒發絕', '沒發覺'],

	//['哪里', '哪裡'],
	//['那里后', '那裡後'],

	//['傍([边觀])', '旁$1'],

	//['简直向就是', '简直像就是'],

	//[/^([^\s　]*)師附/mg, '$1師父'],
	//[/^([^\s　]*)指少/mg, '$1至少'],

	//['從新編篡', '重新編篡'],
	//['將這先經驗', '將這些經驗'],
	//['時代得我', '時代的我'],
	//['不要對決果抱', '不要對結果抱'],
	//['獲得任合', '獲得任何'],
	//['自身其忘的', '自身期望的'],
	//['中為發現的', '中未發現的'],
	//['的人重、', '的人種、'],
	//['一邊盡型', '一邊進行'],
	//['(.)性課人', '$1性客人'],
	//['是故問，', '是顧問，'],
	//['或者缺發', '或者缺乏'],
	//['個話做', '個化作'],

	//['凯凯而谈', '侃侃而谈'],
	//['为止却步', '为之却步'],
	//['不止步与村内', '不止步于村内'],
	//['将渡逢舟', '绝渡逢舟'],

	//['至始至终', '自始至终'],

	//['真是可啪', '真是可怕'],

	//['[觉覚覺]察', '察覺'],

	//['某者意義', '某種意義'],

	//['冷茎|冷靜', '冷靜'],

	//[/樣阿([\?？])/g, '樣啊$1'],

	//['奴隶|奴隷', '奴隷'],

	['圌', ''],

	...lazymarks['replace_001'],

	...lazymarks['jp1'],

	[/，([”』」])/g, '$1'],

	[/(.)（·）(.)/g, '$1$2'],

	...lazymarks['c050'],

	[/\n[ ]*([^：\n【】]+：[^\n【】]*)\n{2,}([ ]*[^：\n【】]+：[^\n]{0,60}(?=\n|$))/ugm, '\n$1\n$2'],

	[/\n[ ]*([^：\n]+：[^\n]*)\n{2,}([ ]*[^：\n]+\n)/ug, '\n$1\n\n$2'],

	...lazymarks['clear_001'],

	...lazymarks['c100'],

	...lazymarks['ln'],
];

/**
 * 實際使用的取代樣式
 */
export const words: IPatternRule["words"] = _word_zh_all([

	...words_layout,

] as IWords[]);

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const words_maybe: IPatternRule["words_maybe"] = [

	...WORDS_MAYBE,

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

	/*
	let lightnovel_copy = '(?:图源|扫图|录入|翻译|翻译|作者|原名|插画|校对|日语原名|书名|转自|简介|目录)';

	// @fixme unknow bug
	text = text
		.toString()
		//.replace(new RegExp(`(^|\\n)((?:[ \\t　]*)${lightnovel_copy}：(?:[^\\n]*))\\n+(?!(?:[^\\n]+：|[＝－\=\\-]))`, 'ug'), '$1$2\n\n')
		.replace(new zhRegExp(`(^|\\n)((?:[ \\t　]*)${lightnovel_copy}：(?:[^\\n]*))\\n{2,}(?!(?:[^\\n]+：|[＝－\=\\-─]))`, 'ug'), '$1$2\n\n')

		.replace(new zhRegExp(`((?:[ \\t　]*)?${lightnovel_copy}：(?:[^\\n]*))\\n+(?=[^\\n：]+)`, 'ug'), '$1\n')

		.replace(new zhRegExp(`((?:[ \\t　]*)?${lightnovel_copy}：(?:[^\\n]*))\\n+(?=[＝－\\=\\-─])`, 'g'), '$1\n')

		.replace(new zhRegExp(`\\n([＝－\\=\\-─]+)\\n+((?:[ \\t　]*)?${lightnovel_copy}：)`, 'g'), '\n$1\n$2')
	;

	//text = text.replace(/^(「[^\n」]+)\n*(\n[^\n「」]+)*\n*(\n[^\n「]+」)/gm, '$1$2$3');

	return text;
	 */
}

export default <IPatternRule>{
	lang,
	words_source,
	words_layout,
	words,
	words_maybe,
	words_callback,
}
