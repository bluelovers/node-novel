"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazymarks = void 0;
const helper_1 = require("../helper");
const word_1 = require("../word");
const str_util_1 = require("str-util");
const debug_color2_1 = require("debug-color2");
const cjk_conv_1 = require("regexp-helper/lib/cjk-conv");
const const_1 = require("../const");
/**
 * 預設的修正樣式
 */
exports.lazymarks = {};
exports.lazymarks['0'] = [
    [/([\u4E00-\u9FFF])\[([^\n【】<>\[\]\{\}『』「」“”'"]+)\]/g, '$1【$2】'],
];
{
    //
    // UNICODE RANGE : DESCRIPTION
    //
    // 3000-303F : punctuation
    // 3040-309F : hiragana
    // 30A0-30FF : katakana
    // FF00-FFEF : Full-width roman + half-width katakana
    // 4E00-9FAF : Common and uncommon kanji
    //
    // Non-Japanese punctuation/formatting characters commonly used in Japanese text
    // 2605-2606 : Stars
    // 2190-2195 : Arrows
    // u203B     : Weird asterisk thing
    //〖号〗
    let word = const_1.ZH_WORD_CHAR_REGEXP;
    let word1 = (0, cjk_conv_1._re_cjk_conv)().source;
    let word2 = (0, cjk_conv_1._re_cjk_conv)().source.replace(/^\[|\]$/g, '');
    exports.lazymarks['1'] = [
        [/，(?=。)$/gm, ''],
        [/(?<=[「」【】《》“”‘’『』（）\[\]"])。$/gm, ''],
        [
            /"([^\n"']*)'([^'"\n]+)'/gm,
            '"$1『$2』',
        ],
        [
            /"([^\n"']*)'([^'"\n]+)'/gm,
            '"$1『$2』',
        ],
        [/^([“])([^\n"“”‘’「」『』'\[\]［］]+)\1$/gm, '$1$2”'],
        [/^([‘])([^\n"“”‘’「」『』'\[\]［］]+)\1$/gm, '$1$2’'],
        [/^([”])([^\n"“”‘’「」『』'\[\]［］]+)[“”]$/gm, '“$2”'],
        [/^([「])([^\n"“”‘’「」『』'\[\]［］]+)["]$/gm, '「$2」'],
        [/^(["])([^\n"“”‘’「」『』'\[\]［］]+)\1$/gm, '「$2」'],
        [/^\[([^\n\[\]]+)\]$/gm, '「$1」'],
        [/(?<=＜[^\n]+＞)\n(?=(?:[\u3000 ]*)[^＜\n])/ugm, "\n\n"],
        [/(?<=[^＞\s][！？?!。]*)\n(?=＜[^\n]+＞)/ugm, "\n\n"],
        [
            /^("{2,})([^\n"']+)("{2,})$/gm,
            function (...m) {
                if (m[1].length == m[3].length) {
                    return [
                        '「'.repeat(m[1].length),
                        m[2],
                        '」'.repeat(m[3].length),
                    ].join('');
                }
                return m[0];
            },
        ],
        [
            /("{2,})([^\n"']+)("{2,})/gm,
            function (...m) {
                if (m[1].length == m[3].length) {
                    return [
                        '「'.repeat(m[1].length),
                        m[2],
                        '」'.repeat(m[3].length),
                    ].join('');
                }
                return m[0];
            },
        ],
        /**
         * 總算到達了目的地白銀喇叭的街道，米菈一邊像門衛揮手一邊通過了敞開的們，街道發生的變化讓米菈的視線一瞬間模糊了。
         「三十年過去了，不是我記得的那樣也是當然的。」
         */
        [/(?<=[^\n「」【】《》“”‘’『』（）\[\]"](?:[！？?!。]+)|[^\n「」【】《》“”‘’『』（）\[\]"！？?!。])\n(?=(?:[—]+)?[「」“”【】《》（）『』])/ug, '\n\n'],
        //[/(?<=[「」【】《》“”『』（）―\[\]"](?:[！？?!。]*)?)\n(?=(?:\u3000*)[^\n「」“”【】《》（）『』])/ug, "\n\n"],
        [
            /**
             * 此函數來處理複雜一點的
             * [/(?<=[「」【】《》“”『』（）―\[\]"](?:[！？?!。]*)?)\n(?=(?:\u3000*)[^\n「」“”【】《》（）『』])/ug, "\n\n"],
             *
             * 讓段落能更加依照前後文來判斷
             */
            function (source) {
                //[/(?<=[「」【】《》“”『』（）―\[\]"](?:[！？?!。]*)?)\n(?=(?:\u3000*)[^\n「」“”【】《》（）『』])/ug, "\n\n"],
                let bool = false;
                let re3 = new RegExp(`^${word1}+(?:[：:])?[「」【】《》“”‘’『』（）―\\[\\]"][^\n]+[「」【】《》“”‘’『』（）―\\[\\]"]$`, 'u');
                let re4 = /^(?:\u3000*)[^\\n「」“”‘’【】《》（）『』]/u;
                let re5 = /[「」【】《》“”‘’『』（）―\[\]"](?:[！？?!。]*)$/u;
                let lines = source
                    .split('\n');
                let re_not_empty = /[^\s　]/;
                let i = lines.length - 1;
                let prev_line = lines[i];
                let debug;
                //debug = /早會被你嚇停的/;
                i--;
                while (i > -1) {
                    let line = lines[i];
                    let add = false;
                    if (re_not_empty.test(line)
                        && re_not_empty.test(prev_line)
                        && re5.test(line)) {
                        let b0 = re3.test(line);
                        if (debug && line.match(debug)) {
                            debug_color2_1.console.log('1===========');
                            debug_color2_1.console.log(b0, line);
                            debug_color2_1.console.log(re3.test(prev_line), prev_line);
                            debug_color2_1.console.log(re4.test(prev_line));
                            debug_color2_1.console.log('===========');
                        }
                        if (b0) {
                            if (!re3.test(prev_line)) {
                                add = true;
                            }
                        }
                        else if (re4.test(prev_line)) {
                            add = true;
                        }
                    }
                    else {
                        if (debug && line.match(debug)) {
                            debug_color2_1.console.log('2----------');
                            debug_color2_1.console.red.dir(line);
                            debug_color2_1.console.red.dir(prev_line);
                            debug_color2_1.console.log('----------');
                        }
                    }
                    if (add) {
                        if (debug && line.match(debug)) {
                            debug_color2_1.console.log('3----------');
                            debug_color2_1.console.red.dir(lines.slice(i - 2, i + 2));
                            //console.red.dir(line);
                            //console.red.dir(prev_line);
                            debug_color2_1.console.log('----------');
                        }
                        lines.splice(i + 1, 0, '');
                        bool = true;
                    }
                    i--;
                    prev_line = line;
                }
                if (bool) {
                    let source_new = lines.join('\n');
                    source = source_new;
                }
                return source;
            },
        ],
        [/(?<=[^\n「」【】《》“”『』（）\[\]"≪≫](?:[！？?!。]*)?)\n(?=(?:[—]+)?[≪≫「」“”【】《》（）『』])/ug, "\n\n"],
        [/(?<=）(?:[！？?!。]*)?)\n(?=[「」【】《》『』“”])/ug, "\n\n"],
        [/^\t+/gm, ''],
        [/ +$/gm, ''],
        [
            [
                `^([^\\n"“”「」'\\[\\]［］]*)`,
                `[“\\[［]`,
                [
                    '(',
                    `[ ]*[${word}][^\\n"“”「」'\\[\\]［］]*`,
                    `(?:\\n[^\\n"“”「」'\\[\\]［］]*)?`,
                    ')',
                ].join(''),
                `[”\\]］]`,
            ].join(''),
            '$1「$2」',
            'gm',
        ],
        [
            [
                `^([^\\n"“”「」'\\[\\]［］]*)`,
                `["“\\[［]`,
                [
                    '(',
                    `[ ]*[${word}][^\\n"“”「」'\\[\\]［］]*`,
                    ')',
                ].join(''),
                `["”\\]］]`,
            ].join(''),
            '$1「$2」',
            'gm',
        ],
        [
            [
                `^([^\\n"“”「」'\\[\\]［］]*)`,
                `[']`,
                [
                    '(',
                    `[ ]*[${word}][^\\n"“”「」'\\[\\]［］]*`,
                    ')',
                ].join(''),
                `[']`,
            ].join(''),
            '$1「$2」',
            'gm',
        ],
        [
            // 嘗試修正 「杀」『杀』
            `(「[^「」『』\\n]+」(?:[^\\n"“”「」『』'\\[\\]［］]*))["“]([ ]*[${word}][^\\n"“”「」『』'‘’]*)["”]`,
            '$1「$2」',
            'gm',
        ],
        [
            `^([^\\n"“”『』'‘’]*)["“‘]([ ]*[${word}][^\\n"“”『』'‘’]*)["”’]`,
            '$1『$2』',
            'gm',
        ],
        [
            `^([^\\n"“”『』'‘’]*)[']([ ]*[${word}][^\\n"“”『』'‘’]*)[']`,
            '$1『$2』',
            'gm',
        ],
        /*
        // 取消轉換 <> 來支援 html 格式語法
        [
            `^([^\\n【】<>]*)[<]([ ]*[${word}][^\\n【】<>]*)[>]`,
            '$1【$2】',
            'gm',
        ],
         */
        [
            `^([^\\n【】<>]*)[<]([ ]*[${word}][^\\n【】<>]*)[>]`,
            '$1＜$2＞',
            'gm',
        ],
        [
            `(『[^『』\\n]+』[^\\n"“”『』'‘’]*)["“'‘]([ ]*[${word}][^\\n"“”『』'‘’]*)["”'’]`,
            '$1『$2』',
            'gm',
        ],
        [
            `(「[^「」\\n]+」[^\\n"“”「」'‘’]*)["“'‘]([ ]*[${word}][^\\n"“”「」'‘’]*)["”'’]`,
            '$1「$2」',
            'gm',
        ],
        [
            `^([^「」\\n【】\\[\\]［］\\{\\}]*)[\\[［\\{]([ ]*[${word}][^\\n【】\\[\\]］\\{\\}]*)[\\]］\\}]`,
            '$1【$2】',
            'gm',
        ],
        [
            `(「[^「」\\n【】\\[\\]［］]*)[\\[［]([ ]*[${word}][^\\n【】\\[\\]］]*)[\\]］]`,
            '$1【$2】',
            'gm',
        ],
        [
            `(【[^【】\\n<>\\[\\]\\{\\}]+】[^\\n【】<>\\[\\]\\{\\}]*)[<\\[\\{]([ ]*[${word}][^\\n【】<>\\[\\]\\{\\}]*)[\\]\\}>]`,
            '$1【$2】',
            'gm',
        ],
        [/^\.$/gm, ''],
        [/(?<=[」』])\n(?=[《【＜〈])/g, '\n\n'],
        [new RegExp(`(?<=^${word1}[^\\n]+[「『][^\\n]+[」』])\\n(?=[「『][^\\n]+[」』]$)`, 'ugm'), '\n\n'],
        [new RegExp(`(?<=^[「『][^\\n]+[」』])\\n(?=[「『][^\\n「『」』]+[」』]${word1}[^\\n」』]+$)`, 'ugm'), '\n\n'],
        [new RegExp(`(?<=^[「『][^\\n]+[」』])\\n(?=[(（][^\\n]+[）)])`, 'ugm'), '\n\n'],
        [new RegExp(`(?<=^《[^\\n]+》)\\n(?=${word1})`, 'gmu'), '\n\n'],
        [new RegExp(`(?<=^${word1}[^\\n]+)\\n(?=《)`, 'gmu'), '\n\n'],
        [new RegExp(`(?<=^〖[^\\n]+〗)\\n(?!〖|\\s)`, 'gmu'), '\n\n'],
    ];
}
exports.lazymarks['2'] = [
    [/[“]/g, '「'],
    [/[”]/g, '」'],
    [/[‘]/g, '『'],
    [`[’](?![a-zＡ-Ｚａ-ｚ${const_1.EN_REGEXP}])`, '』'],
    [/\[/g, '「'],
    [/\]/g, '」'],
    [/﹃/g, '『'],
    [/﹄/g, '』'],
];
/**
 * 無差別將 【】 轉為對話符號
 */
exports.lazymarks['7'] = [
    [/[【]/g, '「'],
    [/[】]/g, '」'],
];
/**
 * 將 【】 轉為對話符號 (對於看起來像對話的)
 */
exports.lazymarks['8'] = [
    [/^【【([^\n【】]+)】】$/gm, '「「$1」」'],
    [/^【([^\n【】]+)】$/gm, '「$1」'],
    [/^【([^\n【】 ]+)(\n[^【】]+)】/gm, '「$1$2」'],
    [/^【([^\n【】 ]+[，。！…⋯？][^\n【】]*)(\n[^【】\n]+)】/gm, '「$1$2」'],
    [/^【([^\n【】 ]+[，。！…⋯？～][^\n【】]*)】/gm, '「$1」'],
];
exports.lazymarks['33'] = [
    [
        /([「『]{2,})([^「『\n』」]+)([』」]{2,})/g, function (...m) {
            if (m[1].length == m[3].length) {
                //console.log(m[1].length, m[3].length);
                m[1] = m[1]
                    .replace(/[「『]/g, '『')
                    .replace(/^[「『]/, '「');
                m[3] = m[3]
                    .replace(/[』」]/g, '』')
                    .replace(/[』」]$/, '」');
                return m[1] + m[2] + m[3];
            }
            return m[0];
        },
    ],
];
exports.lazymarks['3'] = [
    /**
     * 雖然這裡有BUG 但是這個BUG反而可以幫忙發現沒有正確對應的引號
     */
    [/(「[^」]*)「([^」]*)」/g, '$1『$2』'],
    //[/(?<=「[^」]*)「([^」]*)」/gu, '『$1』'],
    ...exports.lazymarks['33'],
];
exports.lazymarks['4'] = [
    [/^[。，]$/gm, '\n'],
    [
        /[\!\(\):~∞&%]+/g, function (...m) {
            return (0, str_util_1.toFullWidth)(m[0], {
                skip: {
                    space: true,
                },
            });
        },
    ],
    [
        /([^\d０-９])(,)(?![\d０-９])/ig, function (...m) {
            return m[1] + (0, str_util_1.toFullWidth)(m[2], {
                skip: {
                    space: true,
                },
            });
        },
    ],
    /*
    [/([^\d０-９])(,)(?![\d０-９])/g, function (...m)
    {
        return m[1] + toFullWidth(m[2], {
            skip: {
                space: true,
            },
        });
    }, 'g', {
        useNativeRegExp: true,
    }],
    */
    [
        /([\d０-９])([\/\-~\+])([\d０-９])/g, function (...m) {
            return m[1] + (0, str_util_1.toFullWidth)(m[2], {
                skip: {
                    space: true,
                },
            }) + m[3];
        },
    ],
    [/([\d０-９\u4E00-\u9FFF])([xX])([\d０-９])/g, '$1×$3'],
    [/([\u4E00-\u9FFF\w\d０-９])\*([\d０-９]+)/g, '$1×$2'],
    [
        /(?<=[\u4E00-\u9FFF！？…⋯－—])([a-z])(?=[\u4E00-\u9FFF])/ig, function (...m) {
            return (0, str_util_1.toFullWidth)(m[1].toUpperCase(), {
                skip: {
                    space: true,
                },
            });
        },
    ],
    [
        /\?+(?=[』」\n])/g, function (...m) {
            return (0, str_util_1.toFullWidth)(m[0], {
                skip: {
                    space: true,
                },
            });
        },
    ],
    [
        /([\u4E00-\u9FFF])(\?+)(?=[』」\n ][^\u4E00-\u9FFF])/g, function (...m) {
            return m[1] + (0, str_util_1.toFullWidth)(m[2], {
                skip: {
                    space: true,
                },
            });
        },
    ],
    [/(？) (！)/g, '$1$2'],
    [/([^\.\n])\.$/gm, '$1。'],
    [/([・，。、！？]) (?=\S)/g, '$1'],
    [/(\S) (?=[・，。、！？])/g, '$1'],
    ['○', '◯'],
    [
        '([\\u4E00-\\u9FFF])([Oo]+)(?=[\\u4E00-\\u9FFF])', function (...m) {
            return m[1] + '◯'.repeat(m[2].length);
        },
    ],
];
exports.lazymarks['5'] = [
    [/ ?([』」》）】]) ?/g, '$1'],
    [/ ?([【《（「『]) ?/g, '$1'],
];
let ckear_hr = '\n\n======================\n\n';
exports.lazymarks['clear_001'] = [
    [/^(第[^\n]+話[^\n]*)\n+/g, '$1\n\n'],
    [/^[═=]+\n|\n[\.…⋯]+$/g, ''],
    [/\n[──＝=═]+$/g, ''],
    [/\n+[\(（\[_]*(?:完毕?|FIN)[\)）\]]*[。\-_]\s*$/ig, ''],
    [/^\s*[~【《（「『〈<─\-－=＝…⋯\.]*\s*(?:始)\s*[~〉』」》）】>─\-－=＝…\.]*\s*/ig, ''],
    [/\n+\s*[~【《（「『〈<─\-－一=＝…⋯\._]*\s*(?:(?:本|\d+)話.?)?(?:完毕?|fin|END|終わり)\s*[~〉』」》）】>─\-－一=＝…⋯\._]*\s*$/ig, ''],
    [/(?<=[^\n]\n+)(fin|\<完\>)(?=\n|$)/ig, "\n"],
    [/(?<=！)[　 ]+/g, ''],
];
exports.lazymarks['clear_002'] = [
    [/^[　 ]+/gm, ''],
];
exports.lazymarks['replace_001'] = [
    //[/(.+)[「【\<《（\(【〈]\1[）\)】》\>】」〉]/g, '$1'],
    //[/([「『《](.+)[』」》])[（\(【]\2[）\)】]/g, '$1'],
    [/([^「【\<《（\(【〈）\)】》\>】」〉\n]+)[「【\<《（\(【〈]\1[）\)】》\>】」〉]/g, '$1'],
    [/([「『《]([^「【\<《（\(【〈）\)】》\>】」〉\n]+)[』」》])[（\(【]\2[）\)】]/g, '$1'],
];
/**
 * 適用於具有大量長段 而只縮減對話之間的空行使用
 */
exports.lazymarks['ln_talk'] = [
    /**
     * 修正 當 配對內容出現在檔案開頭時 導致沒有成功配對的問題
     */
    //[/(?<=^[「『][^\n]+[』」])\n\n(?=[「『][^\n]+[』」](?:\n|$))/, '\n'],
    [/(^[「『][^\n]+[』」])\n\n(?=[「『][^\n]+[』」](?:\n|$))/, '$1\n'],
    //[/(?<=^[「『][^\n]+[』」])\n\n(?=[「『][^\n]+[』」]$)/gm, '\n'],
    [/(^[「『][^\n]+[』」])\n\n(?=[「『][^\n]+[』」]$)/gm, '$1\n'],
];
exports.lazymarks['ln'] = [
    [/^([　 ]*[‐\-\=＝－─＊◇◆☆◊\*─＝=══－～\-─—\*＊＊↣◇◆★■□☆◊]+[‐\-\=＝－─＊◇◆☆◊\*─＝=══－\-─—\*＊＊◇◆■□☆◊　 ]*)。$/g, '$1'],
    //['([。”])\n+[,，﹑]\n+', '$1\n\n'],
    [/^[,，﹑]$/gm, ''],
    [/^(「[^\n」]+)\n*((?:\n[^\n「」]+)*)\n*(\n[^\n「]+」)/gm, '$1$2$3'],
    [/([』」》）】])(\n{2})\n+([【《（「『])/g, '$1$2$3'],
    [/(\S)(\──n{2})\n+([【《（「『])/g, '$1$2$3'],
    [/([』」》）】])(\n{2})\n+(\S)/g, '$1$2$3'],
    [/([─—])\n([\u4E00-\u9FFF])(?![^\n]*?[─—]|[^\n]*\n\n)/g, '$1\n\n$2'],
    [
        /\n{1,2}([　 ]*[\-\=＝－─＊§◇▲◆☆◊\*─＝=══－～\-─—\*＊＊↣◇★◆■□☆◊※]+[\-\=＝－─＊◇◆§☆◊\*─＝=══－\-─—\*＊＊◇◆■□☆◊　 ※]*)\n+/g,
        '\n\n$1\n\n',
    ],
    [
        /\n{3,}([　 ]*[\-\=＝§－─＊◇▲◆☆◊\*─＝=══－～\-─—\*＊＊↣◇★◆■□☆◊]+[\-\=＝－─＊◇§◆☆◊\*─＝=══－\-─—\*＊＊◇◆■□☆◊　 ]*)\n+/g,
        '\n\n\n$1\n\n',
    ],
    [/\n+([　 ]*[＊◇§◆☆◊\*～\*＊＊↣◇★◆■□☆◊＝＝=══▼]+[§＊◇◆☆◊\*～　\*＊＊↣◇★◆■□☆◊＝＝=══▼ 　]*)\n+/g, '\n\n\n$1\n\n'],
    [/(?<=[◆◇■□★▼＊☆◊]\n|^[◆◇■□★▼＊☆◊][^\n]*\n)(?=[^◆◇■□★▼＊☆◊\n])/gmu, '\n'],
    [
        /(?<=[^↓\s]\n)(?=↓)/gm,
        '\n',
    ],
    [
        /(?<=↓)(?=\n[^↓\s])/gm,
        '\n',
    ],
    [
        /(?<=^(?:△|▽))(?=\n\S)/gm,
        '\n',
    ],
    [
        /(?<=\S)\n{1,2}(?=(?:△|▽)\n)/gm,
        '\n\n\n',
    ],
    [
        /(?<=^[^\n◇][^\n]+)\n{1,2}(?=◇)/gmu,
        '\n\n\n',
    ],
    [
        /(?<=[^\s†])\n{1,2}(?=†)/gmu,
        '\n\n\n',
    ],
    [
        /(?<=†)(?=\n[^\s†])/gmu,
        '\n',
    ],
];
// [！？?!。]
exports.lazymarks['ln_0010'] = [
    //[/(?<=^[─⋯…]+[^\n]+)(?=\n[^\s─⋯…])/gm, '\n'],
    //[/(?<=[^\s─⋯…]\n)(?=[─⋯…]+)/gm, '\n'],
    //[/(?<=^[─⋯…][^\n]+)(?=\n[^\s─⋯…])/gm, '\n'],
    [/(?<=[─⋯…][！？?!。]*)\n(?![\s─⋯…]|[^\n]+[─⋯…][！？?!。]*$|\n)/gmu, '\n\n'],
    [/(?<=^[─⋯…][^\n]+)\n(?![\s─⋯…]|[^\n]+[─⋯…][！？?!。]*$|\n)/gmu, '\n\n'],
    [/^([─⋯…][^\n]+)\n(?![\s─⋯…]|[^\n]+[─⋯…][！？?!。]*$|\n)/u, '$1\n\n'],
    [/(?<!^[─⋯…][^\n]+|[─⋯…][！？?!。]*|\n)\n(?=[─⋯…]+)/gmu, '\n\n'],
];
exports.lazymarks['ln_0020'] = [
    [/(?<![〉）\s])\n(?=〈|（)/g, '\n\n'],
    [/(?<=〉|）)\n(?![（\s〈])/g, '\n\n'],
];
exports.lazymarks['ltrim'] = [
    [/^[ \t　]+/gm, ''],
];
let _en = [
    'RPG',
    'BOSS',
    'Cosplay',
    'RAID',
    'Fantasy',
    'OK',
    'CG',
    'SM',
    'FLAG',
    'MMORPG',
    'MMO',
    'UFO',
    'NEET',
    'BGM',
    'SF',
    'NETA',
    'GALGAME',
    'Golem',
    'Rank',
    'MAX',
    'UP',
    'Lv',
    'HP',
    'H',
    'SP',
    'MP',
    'AI',
    'BL',
    'SAN',
    'Ｈ',
    'My',
    'Lord',
    'Gay',
    'cm',
    'km',
    'DVD',
    'PT',
    'SOS',
    'USB',
    'CM',
    'PC',
    'OFF',
    'S',
    'Ｓ',
    'YouTuber',
    'NG',
];
exports.lazymarks['en'] = [
    //	_word_en(/[a-z][a-z']*/, function (...m)
    //	{
    //		if (m[2].match(/([a-z]{2,})(?:\1)|([a-z])\2{2,}/i))
    //		{
    //			return m[0];
    //		}
    //
    //		return m[1] + m[2].replace(/^[a-z]/, function (s)
    //		{
    //			return s.toUpperCase();
    //		});
    //	}, 'g'),
    (0, word_1._word_en3)(`[a-z${const_1.EN_REGEXP2}][a-z'${const_1.EN_REGEXP}]*`, function (...m) {
        let re = new RegExp(`([a-z${const_1.EN_REGEXP}]{2,})(?:\\1)|([a-z])\\2{2,}`, 'i');
        if (m[1].match(re)) {
            return m[0];
        }
        return m[1].replace(/^[a-z]/, function (s) {
            return s.toUpperCase();
        });
    }, 'g'),
    ..._en.map(function (value) {
        return (0, word_1._word_en)(value);
    }),
];
//console.log(lazymarks['en']);
exports.lazymarks['en2'] = [
    (0, word_1._word_en)(/[a-z]+/, function (...m) {
        if (m[2].match(/([a-z]{2,})(?:\1)/i)) {
            return m[0];
        }
        return m[1] + m[2].replace(/^[a-z]/, function (s) {
            return s.toUpperCase();
        });
    }, 'g'),
    ..._en.map(function (value) {
        return (0, word_1._word_en)(value, /[a-z]/.test(value) ? function (...m) {
            if (!/[a-z]/.test(m[2])) {
                return m[0];
            }
            return m[1] + value;
        } : null);
    }),
];
exports.lazymarks['zh'] = (0, word_1._word_zh_all)([
    /**
     * 難以辨認的簡繁日 字替換
     */
    ['话|話', '話'],
    ['絲|丝', '絲'],
    ['賈|贾', '賈'],
    ['庫|库', '庫'],
    ['奥|奧', '奧'],
    ['鳞|鱗', '鱗'],
    ['爱|愛', '愛'],
    ['茲|兹', '茲'],
    ['連|连', '連'],
    ['蚀|蝕', '蝕'],
    ['锻|鍛', '鍛'],
    ['铠|鎧', '鎧'],
    ['渊|淵', '淵'],
    ['鲁|魯', '魯'],
    ['温|溫', '溫'],
    ['維|维', '維'],
    ['残|殘', '殘'],
    ['猪|豬', '豬'],
    //['[复]', '復'],
    ['莲|蓮', '蓮'],
    ['级|級', '級'],
    ['納|纳', '納'],
    ['缇|緹', '緹'],
    ['盗|盜', '盜'],
    ['剑|剣|劍|劍', '劍'],
    ['酱|醬', '醬'],
    ['团|団', '團'],
    ['绪|緒', '緒'],
    ['黑|黒', '黑'],
    ['価|價', '價'],
    ['祿|禄', '祿'],
    ['凱|凯', '凱'],
    ['談', '談'],
    ['聖', '聖'],
    ['強', '強'],
    ['賢', '賢'],
    ['紙', '紙'],
    ['馬', '馬'],
    ['[证]', '証'],
    ['貫|贯', '貫'],
    //['[觉覚覺]', '覺'],
    ['[鸠鳩]', '鳩'],
    ['獣|獸', '獸'],
    ['騎', '騎'],
    ['亞', '亞'],
    ['师|師', '師'],
    ['調', '調'],
    ['鮮', '鮮'],
    ['討', '討'],
    ['諾|诺', '諾'],
    ['場', '場'],
    ['贝|貝', '貝'],
    ['国|國', '国'],
    ['围|圍|囲', '圍'],
    ['階|阶', '階'],
    /*
    ['薩|萨', '薩'],
    ['爾|尔', '爾'],
    ['烏|乌', '烏'],

    ['战|戦', '戦'],
    ['创|創', '創'],
    //['炼|錬', '錬'],
    ['术|術', '術'],
    */
    ['熱', '熱'],
    ['諸', '諸'],
    ['绝|絶', '絶'],
    ['异|異', '異'],
    ['謎|谜', '謎'],
    ['氷|冰', '冰'],
    //['[处]', '処'],
    ['義|义', '義'],
    ['飾|饰', '飾'],
    ['與|与', '與'],
    ['虧|亏', '虧'],
    ['語', '語'],
    ['間', '間'],
    ['俢|修', '修'],
    ['渉', '渉'],
    ['魅', '魅'],
    ['陣', '陣'],
    ['貪', '貪'],
    ['別', '別'],
    ['[枪]', '槍'],
    ['詛|诅', '詛'],
    ['宮|宫', '宮'],
    ['赛|賽', '賽'],
    ['[恶悪]', '惡'],
    ['[龙]', '龍'],
    ['兎|兔', '兔'],
    ['铃|鈴', '鈴'],
    ['岗|崗', '崗'],
    ['对|対|對', '對'],
    [`脳|脑`, '腦'],
    [`殻|殼|壳`, '殻'],
    [`骂`, '罵'],
    [`驾`, '駕'],
    [`妈`, '媽'],
    ['館', '館'],
    ['鳥', '鳥'],
    ['備', '備'],
    ['領', '領'],
    ['約', '約'],
    ['銃', '銃'],
    ['嬰', '嬰'],
    ['貶', '貶'],
    ['緋', '緋'],
    ['遺', '遺'],
    ['説', '說'],
    ['視', '視'],
    ['薬', '藥'],
    ['婭', '婭'],
    ['險', '險'],
    ['師', '師'],
    ['銀', '銀'],
    ['紡', '紡'],
    ['紗', '紗'],
    ['紋', '紋'],
    ['[霊]', '靈'],
    ['貧', '貧'],
    ['軍', '軍'],
    ['簒|篡', '簒'],
    ['貴', '貴'],
    ['萊', '萊'],
    ['岡|[冈]', '岡'],
    ['書', '書'],
    ['螞', '螞'],
    ['数|數', '數'],
    ['戦', '戰'],
    ['魚', '魚'],
    ['陸', '陸'],
    ['玛', '瑪'],
    ['爺', '爺'],
    ['長', '長'],
    ['鷲', '鷲'],
    //['説', '說'],
    // 岁歲歳
    ['歳', '歳'],
    ['[泽]', '澤'],
    ['爾', '爾'],
    ['羅', '羅'],
    ['車', '車'],
    ['樹', '樹'],
    ['麗', '麗'],
    ['術', '術'],
    ['頓', '頓'],
    ['頭', '頭'],
    ['風', '風'],
    ['監', '監'],
    ['獄', '獄'],
    ['倫', '倫'],
    ['療', '療'],
    ['薩', '薩'],
    ['歐', '歐'],
    ['蘭', '蘭'],
    ['謝', '謝'],
    ['夢', '夢'],
    ['壊|壞', '壊'],
    ['紅', '紅'],
    ['执|執', '執'],
    ['[门]', '門'],
    ['姬|姫', '姫'],
    ['費|费', '費'],
    ['達', '達'],
    ['[种]', '種'],
    ['[卢]', '盧'],
    ['[决]', '決'],
    ['[麪麵麺]', '麵'],
    ['戰', '戰'],
    ['刹|剎', '刹'],
    ['実|實', '實'],
    ['買', '買'],
    ['賣', '賣'],
    ['劳', '勞'],
    ['结', '結'],
    ['[觉]', '覺'],
    ['蘿', '蘿'],
    ['蓋', '蓋'],
    ['願', '願'],
    ['独', '獨'],
    ['衛', '衛'],
    ['[当]', '當'],
    ['護', '護'],
    ['華', '華'],
    ['躶', '裸'],
    ['關', '關'],
    ['[齐]', '齊'],
    ['線|綫', '線'],
    ['隨', '隨'],
    ['單', '單'],
    ['[逊]', '遜'],
    ['[莱]', '萊'],
    ['[风]', '風'],
    ['隶', '隷'],
    ['桜', '櫻'],
    ['[圏]', '圈'],
    ['[图]', '圖'],
    ['[优]', '優'],
    ['[东]', '東'],
    ['[钱]', '錢'],
    ['陰', '陰'],
    ['陽', '陽'],
    ['緣', '緣'],
    ['賭', '賭'],
    ['[转]', '轉'],
    ['[顾]', '顧'],
    ['[问]', '問'],
    ['[细]', '細'],
    ['[乐]', '樂'],
    ['[杀]', '殺'],
    ['[刚]', '剛'],
    ['[见]', '見'],
    ['廢|廃', '廢'],
    ['気', '氣'],
    ['学', '學'],
    ['衆|众', '眾'],
    ['邊', '邊'],
    ['拔|抜', '拔'],
    ['鴯', '鴯'],
    ['鶓', '鶓'],
    ['[爲]', '為'],
    ['[祕秘]', '秘'],
    ['迸', '進'],
    ['弾', '彈'],
    ['軽', '輕'],
    ['[択]', '擇'],
    ['図', '圖'],
    ['満', '滿'],
    ['暁', '曉'],
    ['霸|覇', '霸'],
    ['応', '應'],
    ['総', '總'],
    ['[発]', '發'],
    ['[舎]', '舍'],
    ['様', '樣'],
    ['専', '專'],
    ['涙', '淚'],
    ['撃', '擊'],
    ['晚', '晚'],
    ['[髪]', '髮'],
    ['[广]', '廣'],
    ['温', '溫'],
    ['覚', '覺'],
    ['関', '關'],
    ['猟', '獵'],
    ['営', '營'],
    ['圧', '壓'],
    ['犧', '犧'],
    ['[𫗭]', '餵'],
    ['[麽]', '麼'],
    ['[徴]', '徵'],
    ['稅', '稅'],
    ['[倶]', '俱'],
    ['粽|糉|糭', '粽'],
    ['[繋]', '繫'],
    ['[曏]', '嚮'],
    ['[児]', '兒'],
    ['册', '冊'],
    ['顔', '顏'],
    ['牆', '牆'],
    ['従', '從'],
    ['読', '讀'],
    ['[糸]', '絲'],
    ['[穀糓]', '穀'],
    ['[両两]', '兩'],
    ['[俩]', '倆'],
    ['藤', '藤'],
    ['顕', '顯'],
    ['黙', '默'],
    ['駆', '驅'],
    ['齒', '齒'],
    ['売', '賣'],
    ['検', '檢'],
    ['査', '查'],
    ['変', '變'],
    ['徳', '德'],
    ['舗', '舖'],
    ['脱', '脫'],
    ['[刴剁]', '剁'],
    ['効', '效'],
    ['[巻]', '卷'],
    ['鉱', '礦'],
    ['銳鋭', '銳'],
    ['亜', '亞'],
    ['権', '權'],
    ['[伝]', '傳'],
    ['経', '經'],
    ['験', '驗'],
    ['歓', '歡'],
    ['[嬢]', '孃'],
    ['済', '濟'],
    ['収', '收'],
    ['転', '轉'],
    ['緑', '綠'],
    ['広', '廣'],
    ['勦', '剿'],
    ['続', '續'],
    ['厳', '嚴'],
    ['栄', '榮'],
    ['産', '產'],
    ['[查査]', '查'],
    ['継', '繼'],
    ['絵', '繪'],
    ['釈', '釋'],
    ['蔵', '藏'],
    ['娯', '娛'],
    ['楽', '樂'],
    ['焼', '燒'],
    ['拡', '擴'],
    ['[帰]', '歸'],
    ['賎', '賤'],
    ['銭', '錢'],
    ['営', '營'],
    ['剤', '劑'],
    ['[斉]', '齊'],
    ['雑', '雜'],
    ['聴', '聽'],
    ['庁', '廳'],
    ['曽', '曾'],
    ['帯', '帶'],
    ['剰', '剩'],
    ['涜', '瀆'],
    ['[拠]', '據'],
    ['挙', '舉'],
    ['进', '進'],
    ['励', '勵'],
    ['覇|霸', '霸'],
    ['[晕]', '暈'],
    ['[窓]', '窗'],
    ['[⾏]', '行'],
    ['[⻢]', '馬'],
    ['[⻋]', '車'],
    ['[⾯]', '面'],
    ['[⽽]', '而'],
    ['[⾃]', '自'],
    ['[⼰]', '己'],
    ['[⾄]', '至'],
    ['[⾼]', '高'],
    ['[⾥]', '里'],
    ['[⼜]', '又'],
    ['[⾎]', '血'],
    ['[⾦]', '金'],
    ['[⽤]', '用'],
    ['[⾊]', '色'],
    ['[⾐]', '衣'],
    ['[⼒]', '力'],
    ['[⼈]', '人'],
    ['[⾁]', '肉'],
    ['[⽪]', '皮'],
    ['[勐]', '猛'],
    ['[吿]', '告'],
    ['[刄]', '刃'],
    ['[敎]', '教'],
    ['[毎]', '每'],
    ['[抜]', '拔'],
    ['[収]', '收'],
]);
exports.lazymarks['zh_cht'] = (0, word_1._word_zh_all)([
    ['國', '國'],
    ['姫|姬', '姬'],
    ['壞', '壞'],
    ['學', '學'],
    ['險', '險'],
    //['證', '證'],
    ['剎', '剎'],
    ['殼', '殼'],
    ['歲', '歲'],
    ['隸', '隸'],
    ['靈', '靈'],
    ['[歴]', '歷'],
    ['屬', '屬'],
    ['樂', '樂'],
    ['絕', '絕'],
]);
exports.lazymarks['zh2'] = (0, word_1._word_zh_all)([
    [/([两一-十])只(手)/g, '$1隻$2'],
    ['娼婦|娼婦', '娼婦'],
    ['飯餸|飯餚', '飯餚'],
    ['証[拠]', '証據'],
    //['复合', '複合'],
    ['复数', '複數'],
    ['训练', '訓練'],
    ['索敵', '索敵'],
    ['冒険', '冒険'],
    ['英雄', '英雄'],
    ['女僕', '女僕'],
    [/赤果果|赤裸裸/g, '赤裸裸'],
    ['鍛冶', '鍛冶'],
    ['竞技场|競技場', '競技場'],
    ['(闘|斗|鬥)技場', '闘技場'],
    ['遺産', '遺産'],
    [/夢魘/g, '夢魘'],
    [/奴隶|奴隷/g, '奴隷'],
    ['(凱|凯|鎧)甲', '鎧甲'],
    ['進化', '進化'],
    ['隷属', '隷属'],
    ['试炼|試練', '試練'],
    ['后続|後續', '後續'],
    ['复製|複製', '複製'],
    ['遺迹|遺跡', '遺跡'],
    ['美丑|美醜', '美醜'],
    ['鍛鍊|鍛煉', '鍛鍊'],
    ['女昌妇', '娼婦'],
    ['誘拐', '誘拐'],
    ['絶頂', '絶頂'],
    ['治(愈|癒)', '治癒'],
    ['(学)園', '$1園'],
    ['冒険者(?:公|工|行)(会)', '冒険者公$1'],
    ['思想準備', '心理準備'],
    ['宿驛|旅館', '旅館'],
    ['煉獄', '煉獄'],
    ['鑑定|鉴定|鉴别', '鑑定'],
    ['補正', '補正'],
    ['加護', '加護'],
    ['妖精乡', '妖精郷'],
    ['幼馴染', '幼馴染'],
    ['職業', '職業'],
    ['履歴|履历', '履歴'],
    ['降臨', '降臨'],
    ['將軍|将軍', '將軍'],
    ['図書', '圖書'],
    ['恩寵', '恩寵'],
    ['(?:粽|糉|糭)(子|葉)', '粽$1'],
    ['(肉)(?:粽|糉|糭)', '$1粽'],
    ['気圧', '氣壓'],
    ['前仆後繼', '前仆後繼'],
]);
exports.lazymarks['jp1'] = (0, word_1._word_zh_all)([
    (0, word_1._word_jp1)('プロローグ|序章', '序章'),
    (0, word_1._word_jp1)('パーティ|隊伍', '隊伍'),
    (0, word_1._word_jp1)('スキル|技能', '技能'),
    (0, word_1._word_jp1)('ステータス|狀態', '狀態'),
    (0, word_1._word_jp1)('ギルド', '公會'),
    (0, word_1._word_jp1)('ゴブリン|哥布林', '哥布林'),
    (0, word_1._word_jp1)('プレイヤー|玩家', '玩家'),
    (0, word_1._word_jp1)('ゲーム|遊戲', '遊戲'),
    (0, word_1._word_jp1)('レベル|等級', '等級'),
    (0, word_1._word_jp1)('任務|クエスト', '任務'),
    (0, word_1._word_jp1)('矮人|ドワーフ', '矮人'),
    (0, word_1._word_jp1)('キャラクター', '角色'),
    (0, word_1._word_jp1)('キャラ', '角色'),
    (0, word_1._word_jp1)('ダンジョン', '迷宮'),
    (0, word_1._word_jp1)('スライム', '史萊姆'),
    (0, word_1._word_jp1)('ヤンデレ', '病嬌'),
    (0, word_1._word_jp1)('アーティファクト', '神器'),
    (0, word_1._word_jp1)('さん', '桑'),
    (0, word_1._word_jp1)('ちゃん', '醬'),
    (0, word_1._word_jp1)('メイド', '女僕'),
    (0, word_1._word_jp1)('ほら', '嚯啦'),
    (0, word_1._word_jp1)('ええっと', '誒哆'),
    (0, word_1._word_jp1)('マスケット', '鳥銃'),
    (0, word_1._word_jp1)('マッチロック', '火縄銃'),
    (0, word_1._word_jp1)('フリントロック', '燧發槍'),
    (0, word_1._word_jp1)('オリハルコン', '奧里哈鋼'),
    (0, word_1._word_jp1)('フォン', '馮'),
    (0, word_1._word_jp1)('ムービー', '電影'),
    (0, word_1._word_jp1)('バンパイア', '吸血鬼'),
    (0, word_1._word_jp1)('チョコ', '巧克力'),
    (0, word_1._word_jp1)('システム', '系統'),
    (0, word_1._word_jp1)('ハーフリング', '半身人'),
    (0, word_1._word_jp1)('ワイバーン', '飛竜'),
    (0, word_1._word_jp1)('キメラ', '奇美拉'),
    (0, word_1._word_jp1)('ヒヒイロカネ', '緋緋色金'),
    (0, word_1._word_jp1)('ケルベロス', '刻耳柏洛斯'),
    (0, word_1._word_jp1)('ガーゴイル', '石像鬼'),
    (0, word_1._word_jp1)('ふふ', '呋呋'),
    (0, word_1._word_jp1)('やれ', '呀咧'),
    (0, word_1._word_jp1)('マンティコア', '蠍尾獅'),
    (0, word_1._word_jp1)('ヨルムンガンド', '耶夢加得'),
    (0, word_1._word_jp1)('ペット', '寵物'),
    (0, word_1._word_jp1)('キーボード', '鍵盤'),
]);
exports.lazymarks['class'] = (0, word_1._word_zh_all)([
    ['(錬|炼)金術', '錬金術'],
    ['術(师|師)', '術師'],
    ['賢者', '賢者'],
    ['術士', '術士'],
    ['剣聖', '剣聖'],
    ['勇者', '勇者'],
    ['魔導', '魔導'],
    ['(?:闘技|斗技)大(会)', '闘技大$1'],
    ['武(斗|闘|鬥)', '武闘'],
    ['格(闘|斗|鬥)術', '格闘術'],
    ['角(斗|闘|鬥)', '角闘'],
    ['劍斗士', '劍闘士'],
    ['魔法陣', '魔法陣'],
    ['(魔|禁)術', '$1術'],
    ['術式', '術式'],
    ['結界', '結界'],
    ['樞機卿|枢機卿', '樞機卿'],
]);
exports.lazymarks['class_002'] = (0, word_1._word_zh_all)([
    ['哥雷姆|格雷姆', '格雷姆'],
    ['阿[拉剌]克[尼涅涅妮捏]|阿剌克涅|阿剌克捏', '阿剌克涅'],
    //['拉米[亚亞娅雅]|阿米拉米亚克|拉米亚克|拉米那克', '拉米亞'],
]);
exports.lazymarks['c000'] = (0, word_1._word_zh_all)([
    [/\uFEFF/g, ''],
    [/[ \u00a0\xA0\t]/g, ' '],
    //[/[　\u3000]/g, '　'],
    [/[·‧・···•˙●‧﹒]/g, '・'],
    [/[．]/g, '・'],
    ['[∶:]', ':'],
    [/[：：︰﹕：]/ug, '：'],
    [/[〔［]/g, '［'],
    [/[〕］]/g, '］'],
    [/﹖/g, '？'],
    // 單一橫線
    [/[―—﹘‐]/ug, '—'],
    [
        /(?<=[\u4E00-\u9FFF])(ー+)/g, function (...m) {
            return '─'.repeat(m[1].length);
        },
    ],
    [
        /(?<![ァ-ヴーｱ-ﾝﾞｰ])(ー+)(?=[\u4E00-\u9FFF」！])/g, function (...m) {
            return '─'.repeat(m[1].length);
        },
    ],
    [/([^ぁ-んァ-ヴーｱ-ﾝﾞｰ])ー(?=[\u4E00-\u9FFF])/g, '$1─'],
    // 無視線之間的空白
    ['— —', '——'],
    //['｜', '｜'],
]);
exports.lazymarks['c050'] = (0, word_1._word_zh_all)([
    [/[\.・。]{3}/g, '…'],
    [/(?<=…)[\.・。]{1,2}|[\.・]{1,2}(?=[…⋯])/g, '…'],
    [/[\.・。]{2}/g, '…'],
    ['…', '⋯'],
    [
        /([…⋯─師賴法也額吗么近錢只是得嗎處備了題色組激生来本由謊幣币麼思伙人君呵恩呣中嗯樣噢喏个容子嘞跑聊咧話的蛤哦技哎掉喵狂熱要地系勒毒妹誒暑呀萬笑者雄办喔我營恋道心帥變會則女害做個族策車號吧桑後兒王啦拉蹈具哈对事破偶娘令嗯手鼻槍辦喲襲嘛欸著咦船家留貓到能呢來啊冊數阿用喬牲辈何誰國裡忙勢涉好場吶加裏吧了哟趣里做样前桶诶谁物量見醬在係～！？][\?!]+|[\?!]+[」…⋯）！])/ug,
        function (...m) {
            return (0, str_util_1.toFullWidth)(m[0], {
                skip: {
                    space: true,
                },
            });
        },
    ],
    [/(?<=[呢吧嗎吗了的握好有此你家])\.(?=[ \u4E00-\u9FFF\u{20000}-\u{2FA1F}])/ug, '。'],
    [/(?<=[ \u4E00-\u9FFF\u{20000}-\u{2FA1F}])\.(?=[ ])/ug, '。'],
    [
        /(?<=[\u4E00-\u9FFF\u{20000}-\u{2FA1F}])([?+])(?=[\u4E00-\u9FFF\u{20000}-\u{2FA1F}])/ug,
        s => (0, str_util_1.toFullWidth)(s),
    ],
    [/(?<=[\u4E00-\u9FFF\u{20000}-\u{2FA1F}])\.(?=[\u4E00-\u9FFF\u{20000}-\u{2FA1F}])/ug, '・'],
    [/[\.．・]([』」》）】])/g, '。$1'],
    [/([』」》）】])[\.．・](?![\.．・])/g, '$1。'],
    [/([^\n．・\.　])[．・]$/gm, '$1。'],
    [/　。$/gm, '。'],
    [/(?<=[\u4E00-\u9FFF])\?(?=\s|$)/g, '？'],
    [/#/g, '＃'],
    [/(?<!\/)\/(?!\/)/g, '／'],
    [/[｛]([^\n]+?)[}]/g, '｛$1｝'],
    [/[{]([^\n]+?)[｝]/g, '｛$1｝'],
]);
exports.lazymarks['c100'] = (0, word_1._word_zh_all)([
    [
        /^[ ]*([─＝═=══－一‐\-─—\*＊＊◇◆☆◊▃\.…⋯\.─＾]+)(?:(?:原文自帶)?分(?:割|隔)線|這?是?作者的?分隔線|我?是?分(?:隔|割)线|以下正文|場景線|华丽+分割线|分割|華麗+分割線|作者自加的分割線|正文|作者的話|這是原文的?分隔線|代表小節結束的分割線)+([──＝═=══－一‐\-─—\*＊＊◇◆☆◊▃…⋯\.＾]+)[ ]*$/gm,
        '$1$2',
    ],
    [
        /^([─＝═=══－‐\-─—\*＊＊◇◆☆◊▃…＾]+)分([─＝═=══－‐\-─—\*＊＊◇◆☆◊▃…⋯＾]*)割([─＝═=══－\-─—\*＊＊◇◆☆◊▃…⋯＾]*)线([─＝═=══－‐\-─—\*＊＊◇◆☆◊▃…⋯＾]*)$/gm,
        '$1$2$3$4',
    ],
    // 無間斷的 -
    [
        /[－‐\-─—–]{2,}|[－‐\-─—–](?=[』」》）])/g, function (...m) {
            //return m[0].replace(/[－\-─—]/g, '─');
            return '─'.repeat(m[0].length);
        },
    ],
    [
        /^([_]+)$/gm, function (...m) {
            //return m[0].replace(/[－\-─—]/g, '─');
            return '─'.repeat(m[0].length);
        },
    ],
    [
        /([─＝=══－‐\-─—\*＊＊◇◆☆◊▃–＾_＾])\1{9,}/g, function (...m) {
            //return m[0].replace(/[－\-─—]/g, '─');
            return m[1].repeat(20 || 51);
        },
    ],
    // 無間斷的等號
    [
        /([＝=══]){4,}/g, function (...m) {
            //return m[0].replace(/[－\-─—]/g, '─');
            return '═'.repeat(m[0].length);
        },
    ],
    [
        /^(\/+)$/gm, function (...m) {
            //return m[0].replace(/[－\-─—]/g, '─');
            return '═'.repeat(m[0].length);
        },
    ],
    [/([\u4E00-\u9FFF])[－–](?=[！。？\s』」》）】\u4E00-\u9FFF……－，])/g, '$1─'],
    [/([\u4E00-\u9FFF])[—–](?=[！。？』」》）】〉……⋯－，])/g, '$1─'],
    [/([\u4E00-\u9FFF])\-(?![\w\-+])/g, '$1─'],
    [/([ 　])\-([\u4E00-\u9FFF])/g, '$1─$2'],
    [/(?<=[\u4E00-\u9FFF])=(?=[\u4E00-\u9FFF])/g, '＝'],
    [/^\s*(?=[─－‐\-─—–]+)/, ''],
]);
exports.lazymarks['unit'] = (0, word_1._word_zh_all)([
    [
        /(?<!\w)[\d０-９]+(?:px|ｐｘ)(?!\w)/ig, function (...m) {
            let s = (0, helper_1.killBadPx)(m[0]);
            return (0, str_util_1.toFullWidth)(s || m[0]);
        },
    ],
]);
exports.lazymarks['full_width_001'] = (0, word_1._word_zh_all)([
    (0, word_1._word_en)(/\d+(?:(?:,|\.)\d+)*/g, function (...m) {
        return m[1] + (0, str_util_1.toFullNumber)(m[2]);
    }),
]);
exports.lazymarks['full_width_002'] = (0, word_1._word_zh_all)([
    (0, word_1._word_en3)(/[a-z]/ig, function (...m) {
        return (0, str_util_1.toFullEnglish)(m[1]);
    }),
    (0, word_1._word_en3)(/(?:s|x){2,3}/ig, function (...m) {
        return (0, str_util_1.toFullEnglish)(m[1]);
    }),
]);
exports.default = exports.lazymarks;
//# sourceMappingURL=index.js.map