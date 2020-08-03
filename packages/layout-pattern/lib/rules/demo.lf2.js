"use strict";
/**
 * Created by user on 2019/7/13.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.words = exports.words_layout = exports.words_source = void 0;
const pattern_1 = require("@node-novel/layout-pattern/lib/core/pattern");
__exportStar(require("@node-novel/layout-pattern/lib/rules/demo"), exports);
const demoRule = __importStar(require("@node-novel/layout-pattern/lib/rules/demo"));
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
exports.words = word_1._word_zh_all([
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