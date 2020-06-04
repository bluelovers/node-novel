"use strict";
/**
 * Created by user on 2019/7/13.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sp2 = exports.sp = exports.ZH_WORD_CHAR_REGEXP = exports.EN_REGEXP2 = exports.EN_REGEXP = exports._full_num = exports._zh_num2 = exports._zh_num = void 0;
/**
 * 一二三四五六七八九十
 */
exports._zh_num = '一二三四五六七八九十';
/**
 * 百十
 */
exports._zh_num2 = '百十';
/**
 * ０１２３４５６７８９
 */
exports._full_num = '０１２３４５６７８９';
/**
 * 英文數字
 */
exports.EN_REGEXP = /\w\u0100-\u017F\u0400-\u04FF\u00A1-\u00FF\u0180-\u024f/.source;
/**
 * 英文
 */
exports.EN_REGEXP2 = /\u0041-\u007A\u0100-\u017F\u0400-\u04FF\u00A1-\u00FF\u0180-\u024f/.source;
/**
 * 判斷是否為中文字與相關符號 作為排版偵測用
 */
exports.ZH_WORD_CHAR_REGEXP = `！？…⋯－─—\\w０-９ａ-ｚＡ-Ｚ『』·＝\\u4E00-\\u9FFF\\u4E00-\\u9FAF\\u3000-\\u30FF\\u2200-\\u22FF\\u2e80-\\u33ffh`;
/**
 * 用來代表性名中間的符號
 * 例如
 * @example [`露娜${sp}巴菈多`, `露娜・巴菈多`]
 */
exports.sp = '#_@_#';
/**
 * 用來代表性名中間的符號 簡化版
 */
exports.sp2 = '[・。\\\?]';
//# sourceMappingURL=const.js.map