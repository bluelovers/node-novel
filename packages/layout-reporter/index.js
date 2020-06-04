"use strict";
/**
 * Created by user on 2019/7/18.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyAnalyzeReportAll = exports.lazyAnalyzeAll = exports.handleBlock002 = exports.analyzeBlock002 = exports.handleJa002 = exports.analyzeJa002 = exports.handleJa001 = exports.analyzeJa001 = exports.dummyCache = void 0;
const execall2_1 = require("execall2");
const string_natural_compare_1 = __importDefault(require("string-natural-compare"));
const array_hyper_unique_1 = require("array-hyper-unique");
const array_chunk_split_1 = require("array-chunk-split");
const util_1 = require("./lib/util");
const MAX = 5;
function dummyCache(data) {
    const ret = {
        block2: {},
        ja: {},
        ja2: {},
    };
    if (data != null) {
        return Object.assign(ret, data);
    }
    return ret;
}
exports.dummyCache = dummyCache;
function analyzeJa001(data) {
    const RE_JA_001 = new RegExp(`^[^\\nぁ-んァ-ヴーｱ-ﾝﾞ]*?([『「]*[ぁ-んァ-ヴーｱ-ﾝﾞｰ]{2,}[」』]*(?:[『「？、…。＋０-９Ａ-Ｚａ-ｚ（）！]*[ぁ-んァ-ヴーｱ-ﾝﾞｰ]*[」』]*)*)[^\\n]*?$`, 'uigm');
    let _m = execall2_1.execall(RE_JA_001, data.input, {
        removeHiddenData: true,
    });
    if (_m && _m.length) {
        const { _cache_key_, _cache } = data;
        _m = _m
            .filter(function (m) {
            return (m.sub[1] != 'の' && m.sub[0].length >= 2);
        })
            .map(function (m, index) {
            m.order = index;
            return m;
        })
            .sort(function (a, b) {
            return 0 - (a.sub[0].length - b.sub[0].length);
        });
        _m = array_chunk_split_1.arrayChunkMap({
            inputArray: _m,
            maxChunkLength: MAX,
        })
            .sort(function (a, b) {
            return a.order - b.order;
        });
        if (_m.length) {
            if (_cache.ja[_cache_key_]) {
                _cache.ja[_cache_key_].push(..._m);
            }
            else {
                _cache.ja[_cache_key_] = _m;
            }
            return data;
        }
    }
}
exports.analyzeJa001 = analyzeJa001;
function handleJa001(_data) {
    return Object.keys(_data)
        .reduce((a, b) => {
        a[b] = a[b] || [];
        for (let m of _data[b]) {
            a[b].push(m.match);
        }
        return a;
    }, {});
}
exports.handleJa001 = handleJa001;
function analyzeJa002(data) {
    const RE_JA_002 = new RegExp(/(?<![ァ-ヴーｱ-ﾝﾞｰ])([ァ-ヴーｱ-ﾝﾞｰ]{2,}(?:[・＝=＝]+[ァ-ヴーｱ-ﾝﾞｰ]+)*)(?![ァ-ヴーｱ-ﾝﾞｰ])/iug, 'uig');
    let _m = execall2_1.execall(RE_JA_002, data.input, {
        leftContext: true,
        rightContext: true,
        removeHiddenData: true,
    });
    const LIMIT = MAX * 2;
    if (_m && _m.length) {
        const { _cache_key_, _cache } = data;
        const _temp = {};
        for (let m of _m) {
            let k = util_1.fixJaKey(m[1]);
            if (!k) {
                continue;
            }
            _temp[k] = _temp[k] || [];
            if (_temp[k].length > LIMIT) {
                continue;
            }
            let line = [
                m.leftContext
                    .split('\n')
                    .pop(),
                k,
                m.rightContext
                    .split('\n')
                    .shift(),
            ].join('')
                .replace(/^\s+|\s+$/g, '');
            _temp[k].push(line);
        }
        Object.entries(_temp)
            .forEach(([k, v]) => {
            if (_cache.ja2[k]) {
                _cache.ja2[k].push(...v);
            }
            else {
                _cache.ja2[k] = v;
            }
        });
        return data;
    }
}
exports.analyzeJa002 = analyzeJa002;
function handleJa002(_data) {
    return Object.entries(_data)
        .sort(function (a, b) {
        return string_natural_compare_1.default(a[0], b[0]);
    })
        .reduce((a, b) => {
        let arr = array_hyper_unique_1.array_unique(b[1]);
        if (arr.length > MAX * 2) {
            let c0 = arr.shift();
            let c2 = arr.pop();
            let ret = [c0];
            let j = Math.floor(arr.length / (MAX));
            let j2 = MAX - 2;
            for (let i = j; i < arr.length; i++) {
                ret.push(arr[i]);
                if (--j2 <= 0) {
                    break;
                }
                else {
                    i += j;
                }
            }
            ret.push(c2);
            arr = ret;
        }
        a[b[0]] = array_chunk_split_1.arrayChunkMap({
            inputArray: arr,
            maxChunkLength: MAX,
        });
        return a;
    }, {});
}
exports.handleJa002 = handleJa002;
function analyzeBlock002(data) {
    const RE_BLOCK_002 = /([^\n\*]{0,3})?([^\n\*]\*{2,}[^\n\*])([^\n\*]{0,3})?/uig;
    let _m = execall2_1.execall(RE_BLOCK_002, data.input, {
        removeHiddenData: true,
    });
    if (_m && _m.length) {
        const { _cache_key_, _cache } = data;
        if (_cache.block2[_cache_key_]) {
            _cache.block2[_cache_key_].push(..._m);
        }
        else {
            _cache.block2[_cache_key_] = _m;
        }
        return data;
    }
}
exports.analyzeBlock002 = analyzeBlock002;
function handleBlock002(_data) {
    _data = Object.keys(_data)
        .reduce(function (a, b) {
        let cache_ab = a[b] || {};
        for (let m of _data[b]) {
            if (!m.match) {
                continue;
            }
            let key = m.sub[1]
                .replace(/^[ 　・\.\'\"\:\-\+\=]+|[ 　・\.\'\"\:\-\+\=]+$/g, '')
                .toLowerCase();
            if (/^\d+(?:\.\d+)?$|^([a-z])\1+$/i.test(key) || key.length == 1) {
                continue;
            }
            cache_ab[key] = cache_ab[key] || [];
            cache_ab[key].push(m.match);
        }
        let bool;
        for (let m in cache_ab) {
            cache_ab[m].sort();
            bool = true;
        }
        if (bool) {
            a[b] = cache_ab;
        }
        return a;
    }, {});
    return Object.keys(_data)
        .reduce((a, b) => {
        a[b] = a[b] || {};
        for (let k in _data[b]) {
            a[b][k] = a[b][k] || [];
            for (let m of _data[b][k]) {
                a[b][k].push(m);
            }
        }
        return a;
    }, {});
}
exports.handleBlock002 = handleBlock002;
function lazyAnalyzeAll(data) {
    data._cache = dummyCache(data._cache);
    analyzeJa001(data);
    analyzeJa002(data);
    analyzeBlock002(data);
    return data;
}
exports.lazyAnalyzeAll = lazyAnalyzeAll;
function lazyAnalyzeReportAll(data) {
    data = lazyAnalyzeAll(data);
    let _cache_output = {
        block2: handleBlock002(data._cache.block2),
        ja: handleJa001(data._cache.ja),
        ja2: handleJa002(data._cache.ja2),
    };
    return {
        ...data,
        _cache_output,
    };
}
exports.lazyAnalyzeReportAll = lazyAnalyzeReportAll;
exports.default = lazyAnalyzeReportAll;
//# sourceMappingURL=index.js.map