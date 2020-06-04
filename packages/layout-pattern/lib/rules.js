"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuildInRule = exports.getBuildInRulePath = exports.existsBuildInRule = void 0;
/**
 * Created by user on 2019/7/13.
 */
const rules_keys_1 = require("./rules-keys");
function existsBuildInRule(id) {
    return rules_keys_1.RULE_LIST.includes(id);
}
exports.existsBuildInRule = existsBuildInRule;
function getBuildInRulePath(id, source) {
    if (existsBuildInRule(id)) {
        if (source) {
            return require.resolve(`./rules/${id}.ts`);
        }
        return require.resolve(`./rules/${id}`);
    }
}
exports.getBuildInRulePath = getBuildInRulePath;
function getBuildInRule(id) {
    if (existsBuildInRule(id)) {
        let m = require(`./rules/${id}`);
        return m.default == null ? m : m.default;
    }
}
exports.getBuildInRule = getBuildInRule;
exports.default = getBuildInRule;
//# sourceMappingURL=rules.js.map