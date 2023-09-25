"use strict";
/**
 * Created by user on 2019/7/13.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._word_zh_all = exports._word_jp1 = exports._word_en3 = exports._word_en2 = exports._word_en = void 0;
const util_1 = require("../util");
const const_1 = require("./const");
const lib_1 = require("regexp-cjk/lib");
const regexp_helper_core_1 = require("regexp-helper-core");
/**
 * @deprecated
 */
function _word_en(search, ret = null, flag = 'ig') {
    return [new RegExp(`(^|[^\\w'’])(${(0, util_1.regex_str)(search)})(?![\\w'’])`, flag), ((ret !== null) ? ret : '$1' + search)];
}
exports._word_en = _word_en;
/**
 * @deprecated
 */
function _word_en2(search, ret = null, flag = 'ig') {
    return [
        new RegExp(`(^|[^\\w'’${const_1.EN_REGEXP}])(${(0, util_1.regex_str)(search)})(?![\\w'’${const_1.EN_REGEXP}])`, flag),
        ((ret !== null) ? ret : '$1' + search),
    ];
}
exports._word_en2 = _word_en2;
/**
 * 配對英文單字
 */
function _word_en3(search, ret = null, flag = 'ig') {
    return [
        new RegExp(`(?<![\\w'’${const_1.EN_REGEXP}])(${(0, util_1.regex_str2)(search)})(?![\\w'’${const_1.EN_REGEXP}])`, flag),
        ((ret !== null) ? ret : search),
    ];
}
exports._word_en3 = _word_en3;
/**
 * 配對日文片假名
 */
function _word_jp1(search, ret = null, flag = 'ig') {
    return [new RegExp(`(?<![ァ-ヴーｱ-ﾝﾞｰ])(${(0, util_1.regex_str2)(search)})(?![ァ-ヴーｱ-ﾝﾞｰ])`, flag), ((ret !== null) ? ret : search)];
}
exports._word_jp1 = _word_jp1;
/**
 * 自動配對簡繁日漢字
 *
 * 最好只用在全新腳本內
 */
function _word_zh_all(arr) {
    return arr.slice().map(function (value, index, array) {
        if (Array.isArray(value) && ((typeof value[0] == 'string') || (0, regexp_helper_core_1.isRegExp)(value[0]))) {
            let [s, ...a] = value.slice();
            if (0 && a.length > 2) {
                // @ts-ignore
                if (a[2].useNativeRegExp) {
                    return [s, ...a];
                }
            }
            s = (0, lib_1._word_zh)(s, null)[0];
            return [s, ...a];
        }
        return value;
    });
}
exports._word_zh_all = _word_zh_all;
exports.default = _word_zh_all;
//# sourceMappingURL=word.js.map