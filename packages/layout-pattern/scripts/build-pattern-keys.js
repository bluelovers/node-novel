"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseConstant = void 0;
/**
 * Created by user on 2019/7/13.
 */
const pattern_1 = __importDefault(require("../lib/core/pattern"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const bluebird_1 = __importDefault(require("@bluelovers/fast-glob/bluebird"));
const Case = __importStar(require("case"));
const __root = path_1.join(__dirname, '..');
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
    fs_extra_1.outputFile(path_1.join(__root, 'lib/core', 'pattern-keys.ts'), out);
}
bluebird_1.default([
    '*.ts',
    '!*.d.ts',
], {
    cwd: path_1.join(__root, 'lib/rules'),
})
    .tap((ls) => {
    //const keys = ls.map(v => `"${parse(v).name}"`);
    const keys = [];
    const keys2 = [];
    const _enum = ls.reduce((a, v) => {
        let id = path_1.parse(v).name;
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
    return fs_extra_1.outputFile(path_1.join(__root, 'lib', 'rules-keys.ts'), out);
});
function CaseConstant(id) {
    return Case.constant(/^\d+$/.test(id) ? '_' + id : id);
}
exports.CaseConstant = CaseConstant;
//# sourceMappingURL=build-pattern-keys.js.map