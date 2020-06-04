"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.words_callback = exports.words_maybe = exports.words = exports.words_layout = exports.words_source = exports.lang = void 0;
const pattern_1 = require("@node-novel/layout-pattern/lib/core/pattern");
const word_1 = require("@node-novel/layout-pattern/lib/core/word");
/**
 * 改成小說名字 (可留白 則自動設定為檔案名稱)
 */
exports.lang = '';
/**
 * 在這裡放此小說專屬的取代樣本
 */
exports.words_source = [
//['要取代的字', '取代後的字'],
//_word_jp1('日文原名專用', '日文原名專用'),
//_word_en3('英文專用', '英文專用'),
];
/**
 * @private
 */
exports.words_layout = [
    ...pattern_1.lazymarks['clear_002'],
    ...pattern_1.lazymarks['class'],
    ...pattern_1.lazymarks['class_002'],
    //...lazymarks['zh_cht'],
    //...lazymarks['unit'],
    ...pattern_1.lazymarks['ln_0010'],
    ...pattern_1.lazymarks['4'],
    ...pattern_1.lazymarks['full_width_001'],
    ...pattern_1.lazymarks['full_width_002'],
    ...pattern_1.lazymarks['0'],
    ...pattern_1.lazymarks['1'],
    ...pattern_1.lazymarks['2'],
    ...pattern_1.lazymarks['3'],
    ...pattern_1.lazymarks['5'],
];
/**
 * 實際使用的取代樣式
 */
exports.words = word_1._word_zh_all([
    ...exports.words_source,
    ...exports.words_layout,
]);
/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
exports.words_maybe = [
//'需要偵測的字',
];
/**
 * 分析取代完成後執行的代碼
 *
 * @param {string} text
 * @returns {string}
 */
function words_callback(text) {
    return text;
}
exports.words_callback = words_callback;
exports.default = {
    lang: exports.lang,
    words_source: exports.words_source,
    words_layout: exports.words_layout,
    words: exports.words,
    words_maybe: exports.words_maybe,
    words_callback,
};
//# sourceMappingURL=demo.js.map