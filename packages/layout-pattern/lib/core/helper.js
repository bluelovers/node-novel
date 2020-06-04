"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.killBadPx = void 0;
const str_util_1 = require("str-util");
/**
 * 修正翻譯機將單位換算成px
 */
function killBadPx(str) {
    let m = str_util_1.toHalfWidth(str).match(/^(\d+)(px)$/i);
    if (m) {
        let i = (parseInt(m[1]) / 25);
        if (i > 0) {
            return i + 'cm';
        }
    }
    return null;
}
exports.killBadPx = killBadPx;
//# sourceMappingURL=helper.js.map