"use strict";
/**
 * Created by user on 2019/7/13.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.words = exports.words_layout = exports.words_source = void 0;
const tslib_1 = require("tslib");
const pattern_1 = require("@node-novel/layout-pattern/lib/core/pattern");
(0, tslib_1.__exportStar)(require("@node-novel/layout-pattern/lib/rules/demo"), exports);
const demoRule = (0, tslib_1.__importStar)(require("@node-novel/layout-pattern/lib/rules/demo"));
const demo_1 = require("@node-novel/layout-pattern/lib/rules/demo");
const word_1 = require("@node-novel/layout-pattern/lib/core/word");
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
    ...demoRule.words_layout,
    ...pattern_1.lazymarks['ln_talk'],
];
exports.words = (0, word_1._word_zh_all)([
    ...exports.words_source,
    ...exports.words_layout,
]);
exports.default = {
    lang: demo_1.lang,
    words_source: exports.words_source,
    words_layout: exports.words_layout,
    words: exports.words,
    words_maybe: demo_1.words_maybe,
    words_callback: demo_1.words_callback,
};
//# sourceMappingURL=demo.lf2.js.map