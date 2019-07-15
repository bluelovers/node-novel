/**
 * Created by user on 2019/7/15.
 */

import { IPatternRule } from '../types';

/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
export const WORDS_MAYBE: Readonly<IPatternRule["words_maybe"]> = [

	'\\*{2,}',

	'&(gt|lt|amp|nbsp);?',
	//'&(gt|lt|amp);?',

	'\n+[^\n・…◆]{1,2}\n+',

	//'成保',
	//'[裡裏里]社[會会]',
	//'叫說',
	//'成強',
	//'成原',
	//'首再',
	//'裡想',
	//'受入',
	//'為發現',
	//'故問',

	//'借口',

	//'加增',
	//'選擇肢',

	//'[镜景][像象]',

	//['[只指][是示]', /只是因/],

	//'一[直只]',

	//'坐(?!着)',
	//'座(?!位)',

	//['[目墓][的地]', /的目的/],

	//'[仅紧]{2,}',

	//'[勿无]论',
	//'[勿]论',

	//'某者',
	//'尽然',

	//'莫种',

	//'只道',
	//'先带',

	//'穿戴者',

	'女[支昌]',

	//'指少',

	//'得我',
	//'任合',
	//'課人',

	/**
	 * @todo 不常見的用字
	 */
	//'傍',

	//'既得',

	//'原[意因]',

	//'代表[着者]',

	//'[以一][来为位]',

	//'血[清亲]',

	//'巨[汗汉]',

	//'把[我握]',
	//'[接借]住',
	//['这[件间]', /这件事/],
	//'[出除]去',

	//'正[式是]',

	//'当方面',

	//'大工(?!程)',
	//'枪械',
	//'不呱',
	//'就值',
	//'進話',
	//'就事',
	//'慢生活',

	//'從新',

	//'尋問',

	//'玩全',
	//'全部(?!人)',

	//['已(?![经經。喔])', /早已被/],

	// @todo 那哪
	//['那(?=[里能有])', ],
	//['哪(?=[里能有])', ],

	//'时期|士气',
	//'[伸身]长',

	'赤果|果体',

	'\\<(?!img)',

	///(.{1,3})?((?:勇者|神)\?)(.{1,3})?/g,

	//'之巢|巢穴',

	//'[覆](?![盖盖])',
	//'[复復](?![讐前中兴杂数])',
	//'受命(?!令)',
	//'期理',
	//'身前',
	//'具集',
	//'在世(?!界)',
	//'行像',

	//'灰飛',
	//'也受(?!到)',

	//'也事',
	//'是为(?!了)',

	//'壹',

	//'草者',
	//'大加',
	//['限在', /极限在/],
	//'是實',
	//'後辦',
	//'成为',

	//'越有',

	//'關西',

	//'维和',

	//'甄别',

	//'維目包',

	//'龙杀',

	//'魅了',

	//'選像',
	//'前現',

	// @todo 再在
	//'再(?!次)',
	//['在(?!床|物理|[那意此眼刚他身脑前这第店内我显泥头地其海腹体效脖影了远日])', /(?:[现刻倒滴坐杵站存装])在|不在的|就在这/],

	//'刚在',

	//'强先',

	//'送开',

	//'向往',

	//'制服',

	//'女[心性]',

	//'应为',
	//'常识',

	//sublib._word_zh('回.举报', '回复举报')[0],

	//'[×]',
	/.{1,3}?[^a-z][x][^a-z].{1,3}?/ig,

	//'另',
	//'令(?!人)',

	// @todo 道到倒
	//['道', /[街知]道|法道具/],
	//['到(?![那达])', /[不觉搁虑做撞碰感受回直想但类看上说入解认听]到|到(?:昨天|底)/],
	//'擊到',
	//'成現(?!金)',

	///^([^“”\n]+)([“”])([^“”\n]+)(\2|“).{1,3}?/umg,
	///^.{1,3}?([^“”\n]+)([”])([^“”\n]+)[“”].{1,3}?/mg,

	//'[奥奧歐][克格]',

	//'',
	'丶',

	'好[象]',

	///[\u4E00-\u9FFF]{1,3}[\?＝\=\-][\u4E00-\u9FFF]{1,3}/ig,

];

export default WORDS_MAYBE