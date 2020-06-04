"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.words_callback = exports.words_maybe = exports.words = exports.words_layout = exports.words_source = exports.lang = void 0;
const pattern_1 = require("@node-novel/layout-pattern/lib/core/pattern");
const word_1 = require("@node-novel/layout-pattern/lib/core/word");
const baidu_1 = __importDefault(require("@node-novel/layout-pattern/lib/core/helper/baidu"));
const maybe_1 = __importDefault(require("@node-novel/layout-pattern/lib/core/words/maybe"));
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
    // BOM
    ...pattern_1.lazymarks['c000'],
    ...baidu_1.default(),
    ...pattern_1.lazymarks['en'],
    ...pattern_1.lazymarks['replace_001'],
    ...pattern_1.lazymarks['jp1'],
    [/，([”』」])/g, '$1'],
    [/(.)（·）(.)/g, '$1$2'],
    ...pattern_1.lazymarks['c050'],
    [/\n[ ]*([^：\n【】]+：[^\n【】]*)\n{2,}([ ]*[^：\n【】]+：[^\n]{0,60}(?=\n|$))/ugm, '\n$1\n$2'],
    [/\n[ ]*([^：\n]+：[^\n]*)\n{2,}([ ]*[^：\n]+\n)/ug, '\n$1\n\n$2'],
    ...pattern_1.lazymarks['clear_001'],
    ...pattern_1.lazymarks['c100'],
    ...pattern_1.lazymarks['ln'],
];
/**
 * 實際使用的取代樣式
 */
exports.words = word_1._word_zh_all([
    ...exports.words_layout,
]);
/**
 * 需要人工確認的屏蔽字或錯字用語等等
 */
exports.words_maybe = [
    ...maybe_1.default,
];
/**
 * 分析取代完成後執行的代碼
 *
 * @param {string} text
 * @returns {string}
 */
function words_callback(text) {
    return text;
    /*
    let lightnovel_copy = '(?:图源|扫图|录入|翻译|翻译|作者|原名|插画|校对|日语原名|书名|转自|简介|目录)';

    // @fixme unknow bug
    text = text
        .toString()
        //.replace(new RegExp(`(^|\\n)((?:[ \\t　]*)${lightnovel_copy}：(?:[^\\n]*))\\n+(?!(?:[^\\n]+：|[＝－\=\\-]))`, 'ug'), '$1$2\n\n')
        .replace(new zhRegExp(`(^|\\n)((?:[ \\t　]*)${lightnovel_copy}：(?:[^\\n]*))\\n{2,}(?!(?:[^\\n]+：|[＝－\=\\-─]))`, 'ug'), '$1$2\n\n')

        .replace(new zhRegExp(`((?:[ \\t　]*)?${lightnovel_copy}：(?:[^\\n]*))\\n+(?=[^\\n：]+)`, 'ug'), '$1\n')

        .replace(new zhRegExp(`((?:[ \\t　]*)?${lightnovel_copy}：(?:[^\\n]*))\\n+(?=[＝－\\=\\-─])`, 'g'), '$1\n')

        .replace(new zhRegExp(`\\n([＝－\\=\\-─]+)\\n+((?:[ \\t　]*)?${lightnovel_copy}：)`, 'g'), '\n$1\n$2')
    ;

    //text = text.replace(/^(「[^\n」]+)\n*(\n[^\n「」]+)*\n*(\n[^\n「]+」)/gm, '$1$2$3');

    return text;
     */
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
//# sourceMappingURL=base-v2.js.map