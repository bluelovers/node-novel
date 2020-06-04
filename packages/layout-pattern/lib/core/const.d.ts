/**
 * Created by user on 2019/7/13.
 */
/**
 * 一二三四五六七八九十
 */
export declare let _zh_num: string;
/**
 * 百十
 */
export declare let _zh_num2: string;
/**
 * ０１２３４５６７８９
 */
export declare let _full_num: string;
/**
 * 英文數字
 */
export declare const EN_REGEXP: string;
/**
 * 英文
 */
export declare const EN_REGEXP2: string;
/**
 * 判斷是否為中文字與相關符號 作為排版偵測用
 */
export declare const ZH_WORD_CHAR_REGEXP = "\uFF01\uFF1F\u2026\u22EF\uFF0D\u2500\u2014\\w\uFF10-\uFF19\uFF41-\uFF5A\uFF21-\uFF3A\u300E\u300F\u00B7\uFF1D\\u4E00-\\u9FFF\\u4E00-\\u9FAF\\u3000-\\u30FF\\u2200-\\u22FF\\u2e80-\\u33ffh";
/**
 * 用來代表性名中間的符號
 * 例如
 * @example [`露娜${sp}巴菈多`, `露娜・巴菈多`]
 */
export declare const sp = "#_@_#";
/**
 * 用來代表性名中間的符號 簡化版
 */
export declare const sp2 = "[\u30FB\u3002\\?]";
