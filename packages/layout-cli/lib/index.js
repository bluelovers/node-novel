"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNovelMeta = exports.isGCMode = exports.freeGC = exports.diffPatch = exports.isEmptyFile = exports.fsReadFile = exports.handleContext = exports.printNum = exports.handleGlob = exports.dummyMeta = exports.my_words = exports._my_words = exports.getRule = exports.loadPatternRule = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2019/7/13.
 */
const rules_1 = tslib_1.__importStar(require("@node-novel/layout-pattern/lib/rules"));
const layout_1 = tslib_1.__importDefault(require("@node-novel/layout"));
const node_novel_info_1 = require("node-novel-info");
const fs_iconv_1 = tslib_1.__importDefault(require("fs-iconv"));
const JsDiff = tslib_1.__importStar(require("diff"));
const debug_color2_1 = require("debug-color2");
const upath2_1 = tslib_1.__importDefault(require("upath2"));
const novelGlobby = tslib_1.__importStar(require("node-novel-globby/g"));
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const deepmerge_plus_1 = tslib_1.__importDefault(require("deepmerge-plus"));
const prettyuse_1 = tslib_1.__importDefault(require("prettyuse"));
const layout_reporter_1 = require("@node-novel/layout-reporter");
const md_1 = require("@node-novel/layout-reporter/lib/md");
function loadPatternRule(id) {
    let rule_tpl = getRule(id || 'demo');
    const rule_base = getRule('base-v2');
    return {
        rule_tpl,
        rule_base,
    };
}
exports.loadPatternRule = loadPatternRule;
function getRule(id) {
    let rule = (0, rules_1.default)(id);
    return {
        ...rule,
        __id: id,
        words_arr: [],
        __file: (0, rules_1.getBuildInRulePath)(id),
    };
}
exports.getRule = getRule;
function _my_words(ruleData) {
    let words = [];
    let arr = [];
    words = words.concat(ruleData.rule_tpl.words || []);
    arr = arr.concat(ruleData.rule_tpl.words_arr || []);
    words = words.concat(ruleData.rule_base.words || []);
    arr = arr.concat(ruleData.rule_base.words_arr || []);
    words = words.concat(ruleData.rule_tpl.words || []);
    arr = arr.concat(ruleData.rule_tpl.words_arr || []);
    words = layout_1.default._words1(arr, words);
    return layout_1.default._words2(words);
}
exports._my_words = _my_words;
function my_words(html, ruleData) {
    html = html.toString();
    let words = _my_words(ruleData);
    let ret = layout_1.default.replace_words(html, words);
    html = ret.value;
    return {
        _t: html,
    };
}
exports.my_words = my_words;
function dummyMeta() {
    return {
        novel: {},
        options: {
            textlayout: {},
        },
    };
}
exports.dummyMeta = dummyMeta;
function handleGlob(cwd, globby_patterns = [], options = {}) {
    if (globby_patterns == null || globby_patterns.length === 0) {
        globby_patterns = globby_patterns || [];
        globby_patterns.push('**/*.txt');
    }
    let globby_options = {
        cwd,
        useDefaultPatternsExclude: true,
        absolute: true,
    };
    ([globby_patterns, globby_options] = novelGlobby.getOptions([
        ...globby_patterns,
        '!z.raw',
        '!**/z.raw',
    ], globby_options));
    cwd = upath2_1.default.resolve(cwd);
    const cwd_out = upath2_1.default.join(cwd, 'z.out');
    let meta;
    try {
        meta = getNovelMeta([
            cwd,
        ]);
    }
    catch (e) {
        debug_color2_1.console.warn(`README.md 不存在`);
        meta = dummyMeta();
        // @ts-ignore
        globby_options.deep = 0;
        globby_patterns.push('!*/*');
    }
    //	console.dir({
    //		globby_patterns,
    //		globby_options,
    //	});
    let ruleData = loadPatternRule(options.ruleName);
    let _last_empty = [];
    debug_color2_1.console.dir({
        cwd,
        cwd_out,
    });
    const _cache = (0, layout_reporter_1.dummyCache)();
    const _stat = {
        updated: 0,
        added: 0,
        empty: 0,
        files: 0,
        total: 0,
    };
    return bluebird_1.default.resolve(novelGlobby
        .globby(globby_patterns, globby_options))
        .tap((ls) => {
        _stat.total = ls.length;
    })
        .mapSeries(async (file, index, len) => {
        let name = upath2_1.default.parse(file).name;
        let file_dir = upath2_1.default.relative(cwd, upath2_1.default.dirname(file));
        let currentFile = upath2_1.default.join(file_dir, name);
        const _cache_key_ = upath2_1.default.join(file_dir, name);
        const { _t_old, _cb_ret } = await fsReadFile(file, (_t_old) => {
            if (isEmptyFile(_t_old)) {
                _last_empty.push(currentFile);
                return true;
            }
            else if (_last_empty.length) {
                _last_empty
                    .forEach(function (currentFile) {
                    debug_color2_1.console.red(currentFile, '此檔案無內容');
                });
                _last_empty = [];
            }
        });
        let changed = null;
        if (!_cb_ret) {
            let _t;
            ({ _t } = handleContext({
                _t_old,
                meta,
                ruleData,
            }));
            _t = layout_1.default.toStr(_t);
            changed = _t != layout_1.default.toStr(_t_old, {
                allow_nbsp: true,
                allow_bom: true,
            });
            (0, layout_reporter_1.lazyAnalyzeAll)({
                input: _t,
                _cache_key_,
                _cache,
            });
            let _updated = false;
            let _added = false;
            if (_t.replace(/\s+/g, '')) {
                let _out_file = upath2_1.default.join(cwd_out, currentFile) + '.txt';
                let buf_out = Buffer.from(layout_1.default.toStr(_t, "\n"));
                let buf_out_old = await fs_iconv_1.default.readFile(_out_file)
                    .catch(e => null);
                if (!buf_out_old || !buf_out.equals(buf_out_old)) {
                    _updated = true;
                    if (!buf_out_old) {
                        _added = true;
                        _stat.added++;
                    }
                    else {
                        _stat.updated++;
                    }
                    await fs_iconv_1.default.outputFile(_out_file, layout_1.default.toStr(_t, "\n"));
                }
            }
            let color = 'log';
            if (_added) {
                color = 'yellow';
            }
            else if (_updated) {
                color = 'success';
            }
            else if (!changed) {
                color = 'red';
            }
            _stat.files++;
            debug_color2_1.console[color](currentFile, printNum(index, len));
            debug_color2_1.console.debug((0, prettyuse_1.default)());
            freeGC();
        }
        else {
            _stat.empty++;
        }
        return {
            currentFile,
            changed,
        };
    })
        .tap(async (ls) => {
        if (_last_empty.length) {
            _last_empty
                .forEach(function (currentFile) {
                debug_color2_1.console.red(currentFile, '此檔案無內容');
            });
            _last_empty = [];
        }
        if (ls.length > 0) {
            await bluebird_1.default.all([
                fs_iconv_1.default.outputFile(upath2_1.default.join(cwd_out, 'ja2.md'), (0, md_1.outputJa002)({
                    inputData: _cache.ja2,
                })),
                fs_iconv_1.default.outputFile(upath2_1.default.join(cwd_out, 'ja.md'), (0, md_1.outputJa001)({
                    inputData: _cache.ja,
                })),
                fs_iconv_1.default.outputFile(upath2_1.default.join(cwd_out, '待修正屏蔽字.md'), (0, md_1.outputBlock002)({
                    inputData: _cache.block2,
                })),
            ]);
        }
        debug_color2_1.console.dir(_stat);
        //console.info(`length: ${ls.length}`);
        debug_color2_1.console.debug((0, prettyuse_1.default)());
    });
}
exports.handleGlob = handleGlob;
function printNum(index, len) {
    len = len.toString();
    index = (index + 1).toString();
    return `[${index.padStart(len.length, '0')}/${len}]`;
}
exports.printNum = printNum;
function handleContext(input) {
    let { _t_old, meta, ruleData } = input;
    let _t = layout_1.default.toStr(_t_old);
    if (meta.options.textlayout && !meta.options.textlayout.allow_lf2) {
        _t = layout_1.default.reduceLine(_t, meta.options.textlayout || {});
    }
    ({ _t } = my_words(_t, ruleData));
    _t = layout_1.default.textlayout(_t, meta.options.textlayout || {});
    ({ _t } = my_words(_t, ruleData));
    _t = layout_1.default.replace(_t, {
        words: true,
    });
    _t = layout_1.default.trim(_t);
    return {
        _t_old,
        meta,
        ruleData,
        _t,
    };
}
exports.handleContext = handleContext;
async function fsReadFile(file, cb) {
    const _t_old = await fs_iconv_1.default
        .loadFile(file, {
        autoDecode: true,
    })
        .then(v => Buffer.from(v));
    let _cb_ret = cb && await cb(_t_old);
    return {
        _t_old,
        _cb_ret,
    };
}
exports.fsReadFile = fsReadFile;
function isEmptyFile(_t_old) {
    return (!_t_old.length || _t_old.toString() === '');
}
exports.isEmptyFile = isEmptyFile;
function diffPatch(name, _t_old, _t) {
    return JsDiff.createPatch(name, layout_1.default.toStr(_t_old), _t, null, null, {
        newlineIsToken: true,
    });
}
exports.diffPatch = diffPatch;
function freeGC() {
    if (isGCMode()) {
        try {
            global.gc();
        }
        catch (e) {
            debug_color2_1.console.error(e);
        }
    }
}
exports.freeGC = freeGC;
function isGCMode() {
    return (global && typeof global.gc === 'function');
}
exports.isGCMode = isGCMode;
function getNovelMeta(paths) {
    if (!Array.isArray(paths)) {
        paths = [paths];
    }
    let meta;
    for (let cwd_out of paths) {
        if (fs_iconv_1.default.pathExistsSync(upath2_1.default.join(cwd_out, 'README.md'))) {
            meta = (0, node_novel_info_1.mdconf_parse)(fs_iconv_1.default.readFileSync(upath2_1.default.join(cwd_out, 'README.md')));
        }
        if (meta) {
            break;
        }
    }
    return (0, deepmerge_plus_1.default)({
        options: {
            textlayout: {},
        },
    }, meta);
}
exports.getNovelMeta = getNovelMeta;
//# sourceMappingURL=index.js.map