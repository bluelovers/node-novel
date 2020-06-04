"use strict";
/**
 * Created by user on 2019/7/20.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixJaKey = void 0;
function fixJaKey(input) {
    if (/^(?:(.|ー)\1+|[ァアッ]+)$/.test(input)) {
        return null;
    }
    return input;
}
exports.fixJaKey = fixJaKey;
//# sourceMappingURL=util.js.map