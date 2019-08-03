/**
 * Created by user on 2019/7/13.
 */

/**
 * 一二三四五六七八九十
 */
export let _zh_num = '一二三四五六七八九十';
/**
 * 百十
 */
export let _zh_num2 = '百十';
/**
 * ０１２３４５６７８９
 */
export let _full_num = '０１２３４５６７８９';

/**
 * 英文數字
 */
export const EN_REGEXP = /\w\u0100-\u017F\u0400-\u04FF\u00A1-\u00FF\u0180-\u024f/.source;

/**
 * 判斷是否為中文字與相關符號 作為排版偵測用
 */
export const ZH_WORD_CHAR_REGEXP = `！？…⋯－─—\\w０-９ａ-ｚＡ-Ｚ『』·＝\\u4E00-\\u9FFF\\u4E00-\\u9FAF\\u3000-\\u30FF\\u2200-\\u22FF\\u2e80-\\u33ffh`;

/**
 * 用來代表性名中間的符號
 * 例如
 * @example [`露娜${sp}巴菈多`, `露娜・巴菈多`]
 */
export const sp = '#_@_#';

/**
 * 用來代表性名中間的符號 簡化版
 */
export const sp2 = '[・。\\\?]';

