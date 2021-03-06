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
export const lang = '';

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

	['愛玩奴隷|玩赏用?奴隷|玩弄奴隷', '愛玩奴隷'],
	['鋼の女神亭', '鋼之女神亭'],

	['エルマー大陸|艾爾默大陸|埃爾默大陸', '艾爾默大陸'],

	['瑪德蘿拉|瑪德劳拉', '瑪德蘿拉'],
	['俾斯麥德|ビスマイト|俾斯麦得|俾斯默克', '俾斯麥德'],
	['布拉德爾|ブラッドール|布拉德諾|布拉得爾', '布拉德爾'],
	['孟德爾|メンデル|门德尔|孟戴尔', '孟德爾'],



	['刻印|印章', '刻印'],
	['ブランド|铭牌|品牌名?', '品牌'],

	['メンヒルト|蒙希尔特|蒙西尔特', '蒙希爾特'],

	['巴提斯|バティス', '巴提斯'],
	['哈博|哈勃|ハッブル', '哈博'],

	['卡米拉|カミラ', '卡米拉'],

	[`(?:卡米拉|カミラ)${sp}(?:布拉德爾|ブラッドール)`, '卡米拉＝布拉德爾'],

	['シャルル|夏露露', '夏露露'],
	['ドルトン|道尔顿', '道爾頓'],

	['妮可露露|ニコルル', '妮可露露'],

	['エリー|艾莉|艾利', '艾莉'],

	['ディラック|狄拉克', '狄拉克'],
	['イオ|伊諾|伊諾桑（伊諾）|優諾', '伊諾'],
	['ガレス|加雷斯', '加雷斯'],

	['蓮|レン', '蓮'],

	['女佣|女僕', '女僕'],

	['リビエラ|理維艾拉', '理維艾拉'],

	['メルク|梅露可|梅可露', '梅露可'],

	['福禄多|ヴルド|布魯多|乌魯特', '福禄多'],

	['ニールス|尼爾森|尼尔斯', '尼爾森'],

	['Vampire|吸血鬼', '吸血鬼'],
	['Monster|怪物', '怪物'],

	['エランド|愛蘭德|艾兰朵|埃兰德|艾蘭德', '愛蘭德'],
	['アリシア|艾莉西亞|艾丽西亞|艾丽茜亞', '艾莉西亞'],
	['アウスレーゼ|奧斯蕾賽|阿瓦斯雷泽', '奧斯蕾賽'],

	['アリシア＝アウスレーゼ＝エランド|艾莉西亞─奧斯蕾賽─(艾兰朵|愛蘭德)', '艾莉西亞＝奧斯蕾賽＝愛蘭德'],

	[`${sp}(?:アウスレーゼ|奧斯蕾賽)${sp}(?:エランド|愛蘭德)`, '＝奧斯蕾賽＝愛蘭德'],
	[`(?:アウスレーゼ|奧斯蕾賽)${sp}(?:エランド|愛蘭德)`, '奧斯蕾賽＝愛蘭德'],

	['卡蜜拉|カーミラ', '卡蜜拉'],
	['修妲貝兒庫|シュタインベルク', '修妲貝兒庫'],

	['工会|公会|行会', '公会'],

	['ボルタ|波尔多|波魯達', '波魯達'],
	['ボルン|波恩|玻恩', '波恩'],

	[/^[　 ]/gm, ''],

	['洛麗塔|ローリエッタ', '洛麗塔'],

	['米托米斯特|米德米斯|ミッドミスト', '米托米斯特'],

	['ボーエン|波文氏', '波文氏'],

	['哥布林|哥不林', '哥布林'],

	['卡尔|凱爾|カール', '凱爾'],
	['艾爾茲|エルツ|愛爾茲', '艾爾茲'],
	['索爾特|ソルト', '索爾特'],

	['神暦金貨|神曆金幣', '神暦金幣'],
	['神暦|神历', '神暦'],
	['暦法|历法', '暦法'],

	['露比雅|ルビア', '露比雅'],
	['露比昂|ルビオン', '露比昂'],

	['雷恩丽|蓮蕾', '蓮蕾'],

	['瓦爾基里亞|ヴァルキュリア', '瓦爾基里亞'],

	['ミスリル銀?|聖銀|秘銀|秘（聖銀）銀|秘（秘銀）銀', '秘銀'],

	['歌涅特|コーネット', '歌涅特'],

	['瑪格麗特|マーガレット', '瑪格麗特'],

	['ミカ|美香', '美香'],

	['法拉第|ファラデー', '法拉第'],

	['吉恩|ジャン', '吉恩'],
	['阿爾貝特|アルベルト', '阿爾貝特'],
	['ホイヘンス|惠亨斯', '惠亨斯'],

	['吉恩、惠亨斯、歌涅特', '吉恩＝惠亨斯＝歌涅特'],

	[`(?:ホイヘンス|惠亨斯)${sp}(?:歌涅特|コーネット)`, '惠亨斯＝歌涅特'],


	['メリリア|梅莉莉亞', '梅莉莉亞'],

	['亨利|ヘンリー', '亨利'],

	['接納體質|接受體質', '接納體質'],

	['サザ|沙薩', '沙薩'],
	['普莉茲|ブリッツ', '普莉茲'],
	['夏露蘿潔|シャルローゼ', '夏露蘿潔'],
	['エンディア|安迪亞', '安迪亞'],

	['バロール|巴羅爾|巴囉露', '巴羅爾'],
	['(バロール|巴羅爾)の?魔劍', '巴羅爾魔劍'],

	['杜邦|デュポン', '杜邦'],
	/**
	 * ※本來在煩惱イクリプス（ECLIPSE）
	 * 該直翻成日蝕，還是音譯翻成伊庫莉普絲好，
	 * 但既然下面文中有提到怕陽光這點，我就翻成日蝕了
	 */
	['日蝕|イクリプス|伊庫莉普絲', '日蝕'],

	['梅度沙|梅杜莎', '梅杜莎'],

	['傑特|ゼット', '傑特'],

	[/(\d+)/g, function (...m)
	{
		return StrUtil.toFullNumber(m[1]);
	}],

	...lazymarks['class'],

	...lazymarks['4'],

	...lazymarks['0'],
	...lazymarks['1'],
	...lazymarks['2'],
	...lazymarks['3'],
	...lazymarks['5'],

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
