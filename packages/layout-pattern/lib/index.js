"use strict";
/**
 * Created by user on 2019/7/13.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex_str2 = exports.regex_str = exports._word_zh_all = exports._word_jp1 = exports._word_en3 = exports._word_en = exports.killBadPx = exports.lazymarks = exports.sp2 = exports.sp = exports._zh_num2 = exports._zh_num = exports._full_num = exports.EN_REGEXP = void 0;
const pattern_1 = require("./core/pattern");
Object.defineProperty(exports, "lazymarks", { enumerable: true, get: function () { return pattern_1.lazymarks; } });
const helper_1 = require("./core/helper");
Object.defineProperty(exports, "killBadPx", { enumerable: true, get: function () { return helper_1.killBadPx; } });
const word_1 = require("./core/word");
Object.defineProperty(exports, "_word_en", { enumerable: true, get: function () { return word_1._word_en; } });
Object.defineProperty(exports, "_word_en3", { enumerable: true, get: function () { return word_1._word_en3; } });
Object.defineProperty(exports, "_word_jp1", { enumerable: true, get: function () { return word_1._word_jp1; } });
Object.defineProperty(exports, "_word_zh_all", { enumerable: true, get: function () { return word_1._word_zh_all; } });
const const_1 = require("./core/const");
Object.defineProperty(exports, "EN_REGEXP", { enumerable: true, get: function () { return const_1.EN_REGEXP; } });
Object.defineProperty(exports, "_full_num", { enumerable: true, get: function () { return const_1._full_num; } });
Object.defineProperty(exports, "_zh_num", { enumerable: true, get: function () { return const_1._zh_num; } });
Object.defineProperty(exports, "_zh_num2", { enumerable: true, get: function () { return const_1._zh_num2; } });
Object.defineProperty(exports, "sp", { enumerable: true, get: function () { return const_1.sp; } });
Object.defineProperty(exports, "sp2", { enumerable: true, get: function () { return const_1.sp2; } });
const util_1 = require("./util");
Object.defineProperty(exports, "regex_str", { enumerable: true, get: function () { return util_1.regex_str; } });
Object.defineProperty(exports, "regex_str2", { enumerable: true, get: function () { return util_1.regex_str2; } });
//# sourceMappingURL=index.js.map