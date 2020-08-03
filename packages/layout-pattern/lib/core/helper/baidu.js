"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTable = void 0;
/**
 * Created by user on 2018/1/31/031.
 */
const word_1 = require("../word");
__exportStar(require("tieba-harmony"), exports);
const tieba_harmony_1 = require("tieba-harmony");
const deepmerge_plus_1 = require("deepmerge-plus");
function getTable(options = {}) {
    options = deepmerge_plus_1.deepmerge(options, {
        tables: [
            '毒妇',
            '傻瓜',
            '厮杀',
            '子宮',
            '催淫',
            '隂道',
            '隂蒂',
            '隂唇',
            '雌性',
            '小穴',
            '乳房',
            '乳頭',
            '內褲',
            '全裸',
        ],
    });
    return word_1._word_zh_all(tieba_harmony_1.getTable(options));
}
exports.getTable = getTable;
exports.default = getTable;
//# sourceMappingURL=baidu.js.map