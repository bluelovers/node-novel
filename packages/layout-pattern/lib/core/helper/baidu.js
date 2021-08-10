"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTable = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2018/1/31/031.
 */
const word_1 = require("../word");
(0, tslib_1.__exportStar)(require("tieba-harmony"), exports);
const tieba_harmony_1 = require("tieba-harmony");
const deepmerge_plus_1 = require("deepmerge-plus");
function getTable(options = {}) {
    options = (0, deepmerge_plus_1.deepmerge)(options, {
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
    return (0, word_1._word_zh_all)((0, tieba_harmony_1.getTable)(options));
}
exports.getTable = getTable;
exports.default = getTable;
//# sourceMappingURL=baidu.js.map