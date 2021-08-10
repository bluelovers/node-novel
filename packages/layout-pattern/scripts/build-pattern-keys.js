"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseConstant = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2019/7/13.
 */
const pattern_1 = (0, tslib_1.__importDefault)(require("../lib/core/pattern"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const bluebird_1 = (0, tslib_1.__importDefault)(require("@bluelovers/fast-glob/bluebird"));
const Case = (0, tslib_1.__importStar)(require("case"));
const __root = (0, path_1.join)(__dirname, '..');
{
    //const keys = Object.keys(lazymarks).map(v => `"${v}"`).join(' | ');
    const keys = [];
    const keys2 = [];
    const _enum = Object.keys(pattern_1.default).reduce((a, id) => {
        let name = CaseConstant(id);
        keys.push(`EnumLazyMarkKeys.${name}`);
        keys2.push(`"${id}"`);
        a.push(`\t${name} = "${id}",`);
        return a;
    }, []);
    const out = `
export const enum EnumLazyMarkKeys
{
${_enum.join('\n')}
}

export type ILazyMarkKey = ${keys.concat(keys2).join(' | ')};

export type ILazyMarkKey2 = ${keys.join(' | ')}

export type ILazyMarkKey3 = ${keys2.join(' | ')};

export const LAZY_MARK_KEY_LIST = [${keys.join(', ')}] as const;
`;
    (0, fs_extra_1.outputFile)((0, path_1.join)(__root, 'lib/core', 'pattern-keys.ts'), out);
}
(0, bluebird_1.default)([
    '*.ts',
    '!*.d.ts',
], {
    cwd: (0, path_1.join)(__root, 'lib/rules'),
})
    .tap((ls) => {
    //const keys = ls.map(v => `"${parse(v).name}"`);
    const keys = [];
    const keys2 = [];
    const _enum = ls.reduce((a, v) => {
        let id = (0, path_1.parse)(v).name;
        let name = CaseConstant(id);
        keys.push(`EnumRuleListKeys.${name}`);
        keys2.push(`"${id}"`);
        a.push(`\t${name} = "${id}",`);
        return a;
    }, []);
    const out = `
export const enum EnumRuleListKeys
{
${_enum.join('\n')}
}

export type IRuleListKey = ${keys.concat(keys2).join(' | ')};

export type IRuleListKey2 = ${keys.join(' | ')};

export type IRuleListKey3 = ${keys2.join(' | ')};

export const RULE_LIST = [${keys.join(', ')}] as const;
`;
    return (0, fs_extra_1.outputFile)((0, path_1.join)(__root, 'lib', 'rules-keys.ts'), out);
});
function CaseConstant(id) {
    return Case.constant(/^\d+$/.test(id) ? '_' + id : id);
}
exports.CaseConstant = CaseConstant;
//# sourceMappingURL=build-pattern-keys.js.map