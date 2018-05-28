/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '人喰い転移者の異世界復讐譚　～無能はスキル『捕食』で成り上がる～';

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

	//['要取代的字', '取代後的字'],

	['anima(?=\\b|[^\\w\\u00C0-\\u017F])', '阿尼瑪', 'ig'],
	['(Animus|Animes)(?=\\b|[^\\w\\u00C0-\\u017F])', '阿尼瑪斯', 'ig'],

	['断一头', '断頭'],

	['白诘', '白詰'],
	['诘', '詰'],
	['岬|美崎', '岬'],


	['乌尔条克|乌尔提欧|乌璐緹欧', '乌璐緹欧'],

	['馬力提亞|馬里蒂阿|瑪里提亞', '瑪里提亞'],
	['雷斯雷庫提欧|雷斯雷克迪欧', '雷斯雷庫提欧'],
	['伊利加拉斯|伊利卡斯', '伊利卡斯'],

	['シノロ|希諾罗', '希諾罗'],

	['霧に消える悪意|(消失在)?雾中的惡意|消失于雾的惡意', '消失在雾中的惡意'],

	['希瓦吉|西卜西斯|シヴァージーッ|西瓦基', '希瓦吉'],

	['王之城墙|王の城壁', '王の城壁'],

	['ガーンデーヴァ|甘狄拔|崗德尔', '甘狄拔'],

	['金刚杵|瓦酋拉|瓦朱拉|ヴァジュラ', '金刚杵'],

	['阿勒内亞|阿勒亞亞', '阿勒内亞'],

	['伊莉提姆|丽丽特姆|伊丽特姆|伊丽提姆', '伊莉提姆'],

	['普拉納斯|普拉娜斯|白白納斯|拉普納斯', '普拉娜斯'],

	['茵赫利亞|恩海利亞', '茵赫利亞'],

	['太阳能槍|魔法槍', '魔法槍'],

	['苏萨利槍|魔法槍', '魔法槍'],
	['苏萨利佩带|魔法軍刀', '魔法軍刀'],

	['阿格尼|阿耆尼', '阿耆尼'],
	['手臂部|腕部', '腕部'],

	['火炎放射槍|火焰放射槍', '火焰放射槍'],

	['親愛なる友|亲愛的朋友|亲密的朋友', '親愛的朋友'],
	['卑劣なる俯瞰者|卑劣的俯瞰者|卑鄙的俯瞰者', '卑劣的俯瞰者'],
	['虚像丢弃|虚像破棄', '虚像破棄'],

	['雷古納托利科斯|レグナトリクス|雷格納特克', '雷古納托利科斯'],

	['基希尼亞|キシニア', '基希尼亞'],

	['ヴァニタス|巴尼特斯', '巴尼特斯'],

	['拉姆布|布魯姆', '布魯姆'],

	['霜巨人|弗里弗姆斯', '霜巨人'],

	['エルレア・フラウクロック|艾尔萊亞・弗兰克|艾尔萊亞・克弗兰克', '艾尔萊亞・弗兰克'],

	['エルレア|艾尔萊亞|艾露雷亞|艾露維亞', '艾尔萊亞'],

	['奧利涅斯|奧利尼斯', '奧利涅斯'],

	['迪拜|宾登', '宾登'],

	['築城|城筑', '築城'],

	['印地照|印古拉斯|イングラトゥス', '印古拉斯'],

	[/([^\w\u00C0-\u017F\.])([\w])(?![\w\u00C0-\u017F\.])/g, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}],

	['^　技能[ 　]+(?![ 　]|$)', '　技能　　', 'gm'],
	[/(　+) (?=\S)/g, '$1　'],

	[/^(　{2,}[^\n]+)\n\n(　{2,}|　[^　\n]+　{2,})/gm, '$1\n$2'],
	[/^(　[^\n　]+　{2,}[^\n]*)\n\n(　{2,}|　[^　\n]+　{2,})/gm, '$1\n$2'],

	[/^[　 ]+([\-◆◇]+)[　 ]*$/gm, '$1'],

	['𪚥', ''],

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
