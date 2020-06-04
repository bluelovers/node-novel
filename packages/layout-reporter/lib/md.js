"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._mdStyle002 = exports._mdStyle001 = exports.stringify = exports.outputJa002 = exports.outputJa001 = exports.outputBlock002 = void 0;
const index_1 = require("../index");
/**
 * 待修正屏蔽字.md
 */
function outputBlock002(options) {
    let { inputData, title = '待修正屏蔽字', handled } = options;
    if (!handled) {
        inputData = index_1.handleBlock002(inputData);
    }
    return _mdStyle002({
        inputData: inputData,
        title: title,
    });
}
exports.outputBlock002 = outputBlock002;
/**
 * ja.md / 含有日文的章節段落
 */
function outputJa001(options) {
    let { inputData, title = '含有日文的章節段落', handled } = options;
    if (!handled) {
        inputData = index_1.handleJa001(inputData);
    }
    return _mdStyle001({
        inputData: inputData,
        title: title,
    });
}
exports.outputJa001 = outputJa001;
/**
 * ja2.md / 未加入整合的日文 / 待整合的日文
 */
function outputJa002(options) {
    let { inputData, title = '待整合的日文', handled } = options;
    if (!handled) {
        inputData = index_1.handleJa002(inputData);
    }
    return _mdStyle001({
        inputData,
        title: title,
    });
}
exports.outputJa002 = outputJa002;
function stringify(v) {
    return JSON.stringify(v).replace(/^"|"$/g, '');
}
exports.stringify = stringify;
function _mdStyle001(options) {
    return Object.entries(options.inputData)
        .reduce((a, [k, b]) => {
        a.push(`\n## ${k}`);
        a.push('');
        b.forEach(s => {
            a.push(`- ${stringify(s)}`);
        });
        a.push('');
        return a;
    }, [
        `# ${options.title}`,
        '',
        '[TOC]',
    ])
        .join("\n");
}
exports._mdStyle001 = _mdStyle001;
function _mdStyle002(options) {
    return Object.entries(options.inputData)
        .reduce((a, [k, b]) => {
        a.push(`\n## ${stringify(k)}`);
        for (let k in b) {
            a.push(`\n### ${stringify(k)}\n`);
            for (let m of b[k]) {
                a.push(`- ${stringify(m)}`);
            }
        }
        a.push('');
        return a;
    }, [
        `# ${options.title}`,
        '',
        '[TOC]',
    ])
        .join("\n");
}
exports._mdStyle002 = _mdStyle002;
//# sourceMappingURL=md.js.map