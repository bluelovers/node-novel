"use strict";
/**
 * Created by user on 2019/7/13.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuildInRuleFileContext = void 0;
const fs_1 = require("fs");
const rules_1 = require("./rules");
/**
 * 取得內建 規則範本內容 (typescript)
 */
function getBuildInRuleFileContext(id) {
    if ((0, rules_1.existsBuildInRule)(id)) {
        return (0, fs_1.readFileSync)((0, rules_1.getBuildInRulePath)(id, true));
    }
}
exports.getBuildInRuleFileContext = getBuildInRuleFileContext;
exports.default = getBuildInRuleFileContext;
//# sourceMappingURL=rules-copy.js.map