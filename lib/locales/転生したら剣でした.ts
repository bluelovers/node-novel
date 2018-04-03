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

	['芙蘭', '芙蘭'],
	//['師傅|師匠|師父', '師匠'],

	['赛里托|賽裡托', '賽里托'],
	['加留斯|加盧斯', '加留斯'],
	[`克魯斯${sp}琉澤魯`, '克魯斯・琉澤魯'],
	['歐雷魯|歐賴爾|奧雷爾', '歐雷魯'],

	['穆蕾莉亞|繆列莉亞|繆蕾利亞|繆蕾莉亞', '繆蕾莉亞'],

	['魯米娜|露米娜', '露米娜'],
	['克(裡|里)希納|庫林休納|庫利修納', '克里希納'],

	['艾爾莎|艾麗莎', '艾爾莎'],

	['艾曼達|阿曼达', '艾曼達'],

	['艾滋萊斯|艾茲萊斯', '艾茲萊斯'],

	['瑪古諾裡亞|馬格諾裡亞|瑪格諾利亞', '瑪古諾里亞'],

	[`納拉辛哈|那拉辛哈`, '納拉辛哈'],
	[`${sp}納拉辛哈`, '・納拉辛哈'],
	[`${sp}迪爾${sp}菲力亞斯`, '・迪爾・菲力亞斯'],

	['萊西阿斯|留西阿斯|劉西亞斯', '萊西阿斯'],
	['羅蘭西亞|洛倫西亞', '洛倫西亞'],

	['裏穀達魯法|利古達魯法|林穀達魯法', '利古達魯法'],
	['哥多達魯法|古德達爾夫', '古德達爾夫'],

	['烏魯希|烏魯斯|乌鲁西', '烏魯希'],

	['巴拉巴拉姆|巴拉貝拉姆', '巴拉貝拉姆'],

	['裡德', '里德'],
	['傑拉斯尼多|澤羅斯(裡|里)德|杰羅斯利德', '澤羅斯里德'],

	['阿(裡|里)斯蒂亞|阿裏斯提亞', '阿里斯蒂亞'],

	['米婭諾阿|米婭諾亞', '米婭諾亞'],

	['吉安|約翰', '約翰'],

	['歐魯梅斯|欧魯梅斯', '歐魯梅斯'],

	['斯特利亞|斯忒莉亞|斯特里亞|ステリア', '斯忒莉亞'],
	['伊利安提|伊莉安忒|伊利安忒', '伊莉安忒'],

	['白路梅裡亞|白路梅裏亞', '白路梅里亞'],
	['弗雷德裏克|弗雷德里克', '弗雷德里克'],

	['貝魯利茲|貝魯裡茲|貝魯里斯', '貝魯利茲'],

	['亞歷山大|阿魯賽德', '亞歷山大'],

	['庫魯貝魯多|格魯貝魯多', '庫魯貝魯多'],

	['狄米奇|迪米特里斯', '狄米奇'],

	[`佛隆德${sp}亞安古魯`, '佛隆德・亞安古魯'],

	['艾瓦斯|エイワース', '艾瓦斯'],

	['(ゼフィルド|賽飞魯铎)', '賽飞魯铎'],
	['天壁の(ゼフィルド|賽飞魯铎)', '天壁的賽飞魯铎'],

	/**
	 *
	 */
	['(格|古|哥)魯迪西亞|戈迪婭', '格魯迪西亞'],
	['Jirubado|吉露伯德|西魯巴德|修魯巴德|ジルバード', '吉露伯德'],
	['Chrome|庫洛姆|格羅姆', '庫洛姆'],
	['Burodin|布羅汀', '布羅汀'],

	['貝斯提亞|Besutia', '貝斯提亞'],
	['アルジェントラパン|阿爾堅朵拉潘|阿根托拉龐', '阿爾堅朵拉潘'],

	['羅斯拉庫恩|羅茲拉庫恩', '羅茲拉庫恩'],

	['古林格德|古林格特', '古林格特'],
	['古列希爾|格雷希爾', '古列希爾'],

	['達茲|達斯', '達斯'],

	['雷多斯|雷德斯|レイドス', '雷多斯'],

	['亞雷薩|亞雷萨', '亞雷薩'],

	['庫蘭賽魯|格蘭德魯|格兰賽尔', '庫蘭賽魯'],

	['维鲁穆特|維爾穆特', '維爾穆特'],

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

	['歐雷加盧克斯|奧雷佳盧克斯', '歐雷加盧克斯'],

	['神聖秩序|ホーリー・オーダー', '神聖秩序'],

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

	['冒險(島|者)(公|协)會', '冒険者公会'],
	['(盜贼)(公|协)會', '$1公会'],

	['工会|公会|行会|协会', '公會'],
	['(料理|飯菜)公会', '料理公會'],

	['海港(都市|城市)|港口(都市|城市)', '港口都市'],

	['妖怪|怪物', '怪物'],
	['(鑒|鑑)(定|別)', '鑑定'],

	['浮游島|天空島|浮遊島', '浮游島'],

	['排位元?|等級|位元元', '等級'],

	['劍身化|劍神化', '劍神化'],

	['時間和空間魔法', '時空魔法'],

	['宿驛|宿舍|旅館', '旅館'],
	['合同|契約', '契約'],

	['([^使從])魔發', '$1魔法'],

	['(播音員|廣播桑|廣播先生)(的大人)?', '廣播桑'],

	['讚成', '贊成'],
	['幻像|幻象', '幻象'],
	['能力值|Status', '能力值', 'ig'],

	[/\/\/|\|/g, ''],

	['禦意|御意', '御意'],

	['魔力導電率|魔力傳導率', '魔力傳導率'],

	[/(迷宮|洞窟)(大師|主人?)/g, '洞窟主'],
	[/(迷宮|洞窟)(核|core)/ig, '洞窟核'],
	//['洞窟|迷宮', '迷宮'],

	['SKILL|技能', '技能', 'ig'],

	['瓦爾基(裡|里)', '瓦爾基里'],
	['米諾陶諾?斯', '米諾陶諾斯'],

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

	[/(技)\?([a-z]{2,})/ig, '$1・$2'],

	[/(米諾陶諾?斯|高級強獸人)\?/g, '$1・'],
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

	[/^　/gm, ''],

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
