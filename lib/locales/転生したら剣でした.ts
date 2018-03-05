/**
 * Created by user on 2017/12/21/021.
 */

import { sp, IWords, vMaybe, sublib } from './index';
import * as StrUtil from 'str-util';

/**
 * 改成小說名字
 */
export const lang = '転生したら剣でした';

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
	['赛里托|賽裡托', '賽里托'],
	['加留斯|加盧斯', '加留斯'],
	[`克魯斯${sp}琉澤魯`, '克魯斯・琉澤魯'],
	['歐雷魯|歐賴爾', '歐雷魯'],

	/**
	 *
	 */
	['(格|古|哥)魯迪西亞|戈迪婭', '格魯迪西亞'],
	['Jirubado|吉露伯德|西魯巴德', '吉露伯德'],
	['Chrome|庫洛姆', '庫洛姆'],
	['Burodin|布羅汀', '布羅汀'],

	['貝斯提亞|Besutia', '貝斯提亞'],
	['アルジェントラパン|阿爾堅朵拉潘', '阿爾堅朵拉潘'],

	/**
	 *
	 */
	['Berserk(?:er)?', 'Berserker'],
	['Diablos?|Diaborosu', 'Diablo'],
	['Igunisu|Ignis', 'Ignis'],

	['始神劍(阿爾法（Alpha）|Alpha（阿爾法）)', '始神劍阿爾法（Alpha）'],
	['狂神劍(狂暴（Berserker）|Berserker（(英語，狂戰士|霸薩卡：狂戰士)）)', '狂神劍狂暴（Berserker）'],
	['(煌|火)炎劍(伊格尼斯（Ignis）|Ignis(?:（伊格尼斯(?:，火精靈)）)?)(?:（伊格尼斯）)?', '煌炎劍伊格尼斯（Ignis）'],
	['大地劍(Gaia(（希臘神話的地母蓋亞）)?|蓋亞（Gaia）)', '大地劍蓋亞（Gaia）'],
	['魔王?劍(Diablo|迪亞波羅(（Diablo）)?)(?:（Diabolo Su？）)?(（迪亞布羅）)?', '魔王劍迪亞波羅（Diablo）'],

	/**
	 *
	 */
	['阿魯吉艾巴|阿爾基艾巴', '阿爾基艾巴'],

	/**
	 *
	 */

	...sublib.lazymarks['class'],

	['(料理|飯菜)王?(比|競)技?賽|料理競賽|料理王競技賽|料理王比賽|料理大賽', '料理競賽'],
	['(料理|飯菜)', '料理'],

	['工会|公会|行会', '公會'],
	['(料理|飯菜)公会', '料理公會'],

	['妖怪|怪物', '怪物'],
	['(鑒|鑑)(定|別)', '鑑定'],

	['浮游島|天空島|浮遊島', '浮游島'],

	['排位元?|等級|位元元', '等級'],

	['時間和空間魔法', '時空魔法'],

	['宿驛|宿舍|旅館', '旅館'],
	['合同|契約', '契約'],

	['([^使])魔發', '$1魔法'],

	[/\/\//, ''],

	['魔力導電率|魔力傳導率', '魔力傳導率'],

	[/(迷宮|洞窟)(大師|主人?)/g, '洞窟主'],
	[/(迷宮|洞窟)(核|core)/ig, '洞窟核'],
	//['洞窟|迷宮', '迷宮'],

	[`古雷多${sp}護牆`, '古雷多・護牆'],
	[`火焰${sp}標槍`, '火焰・標槍'],
	[`火焰${sp}箭頭?`, '火焰・箭'],
	[`召喚${sp}瑪瑙狼`, '召喚・瑪瑙狼'],
	[`黑夜${sp}一閃`, '黑夜・一閃'],
	[`岩石${sp}野牛`, '岩石・野牛'],
	[`劍王技${sp}天斷`, '劍王技・天斷'],
	[`暴龍劍${sp}林德烏魯姆`, '暴龍劍・林德烏魯姆'],
	[`魔槍${sp}大螺旋槍`, '魔槍・大螺旋槍'],

	[`(?:秘傳|絶招)${sp}(?:韋馱天|毗沙門墮)`, '秘傳・$2'],

	[`${sp}納拉辛哈`, '・納拉辛哈'],
	[`${sp}迪爾${sp}菲力亞斯`, '・迪爾・菲力亞斯'],

	[/(技)\?([a-z]{2,})/ig, '$1・$2'],

	[/(米諾陶斯)\?/g, '$1・'],
	[/^(魔力傳導率|個體名|代償)[\?、]/gm, '$1：'],

	[/(：[^\?\n]+)\?(?!\?)/gm, '$1・'],

	[/([a-z]) (\+)/ig, '$1$2'],

	[/([\u4E00-\u9FFF\s])(\d+)(?=[\u4E00-\u9FFF\s]|$)/g, function (...m)
	{
		return m[1] + StrUtil.toFullNumber(m[2]);
	}],

	[/([^\w\u00C0-\u017F\.μ・·?‧•―-])([a-z])(?![\w\u00C0-\u017F\.μ・·?‧•―-])/ig, function (...m)
	{
		return m[1] + StrUtil.toFullWidth(m[2]);
	}],

	[
		`[《（「『]\\w+[ ]?${sp}[ ]?\\w+[』」》）]`, function (...m)
	{
		return m.slice(1, 3).map(function (s)
		{
			return s.replace(/^([^\w]*)([a-z])/, function (...m)
			{
				return m[1] +m[2].toUpperCase();
			});
		}).join('・');
	}],

	[/([a-z]+)\?([a-z]+)/ig, '$1・$2'],

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
	if (!/迷宮/.test(text))
	{
		text = text.replace(/洞窟/g, '迷宮');
	}

	text = text
		.replace(/(迷宮|洞窟)(大師|主人?)/g, '迷宮主')
		.replace(/(迷宮|洞窟)(核|core)/ig, '迷宮核')
	;

	return text;
}

export default exports;
