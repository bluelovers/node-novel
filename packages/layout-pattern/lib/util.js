"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex_str2 = exports.regex_str = void 0;
const regexp_cjk_1 = require("regexp-cjk");
function regex_str(str) {
    if ((0, regexp_cjk_1.isRegExp)(str)) {
        return str.source;
    }
    return str
        .replace(/(\W)/g, '\\$1');
}
exports.regex_str = regex_str;
function regex_str2(str) {
    if ((0, regexp_cjk_1.isRegExp)(str)) {
        return str.source;
    }
    return str;
}
exports.regex_str2 = regex_str2;
//# sourceMappingURL=util.js.map