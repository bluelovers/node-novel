/// <reference types="node" />
import { IRuleListKey } from '@node-novel/layout-pattern/lib/rules-keys';
import { IMdconfMeta } from 'node-novel-info';
import Bluebird from 'bluebird';
export declare function loadPatternRule<T extends IRuleListKey>(id?: T): {
    rule_tpl: {
        __id: "demo" | T;
        words_arr: string[];
        __file: string;
        lang?: string;
        words_source: import("@node-novel/layout").IWordsAll[];
        words_layout?: import("@node-novel/layout").IWordsAll[];
        words: import("@node-novel/layout").IWordsAll[];
        words_maybe: import("@node-novel/layout-pattern").vMaybe;
        words_callback?(text: string): string;
    };
    rule_base: {
        __id: "base-v2";
        words_arr: string[];
        __file: string;
        lang?: string;
        words_source: import("@node-novel/layout").IWordsAll[];
        words_layout?: import("@node-novel/layout").IWordsAll[];
        words: import("@node-novel/layout").IWordsAll[];
        words_maybe: import("@node-novel/layout-pattern").vMaybe;
        words_callback?(text: string): string;
    };
};
export declare function getRule<T extends IRuleListKey>(id: T): {
    __id: T;
    words_arr: string[];
    __file: string;
    lang?: string;
    words_source: import("@node-novel/layout").IWordsAll[];
    words_layout?: import("@node-novel/layout").IWordsAll[];
    words: import("@node-novel/layout").IWordsAll[];
    words_maybe: import("@node-novel/layout-pattern").vMaybe;
    words_callback?(text: string): string;
};
export declare function _my_words(ruleData: ReturnType<typeof loadPatternRule>): import("@node-novel/layout").IWordsRuntime[];
export declare function my_words(html: Buffer | string, ruleData: ReturnType<typeof loadPatternRule>): {
    _t: string;
};
export declare function dummyMeta(): IMdconfMeta;
export declare function handleGlob(cwd: string, globby_patterns?: string[], options?: {
    ruleName?: IRuleListKey;
}): Bluebird<{
    currentFile: string;
    changed: boolean;
}[]>;
export declare function printNum(index: string | number, len: string | number): string;
export declare function handleContext(input: {
    _t_old: Buffer | string;
    meta: IMdconfMeta;
    ruleData: ReturnType<typeof loadPatternRule>;
}): {
    _t_old: string | Buffer;
    meta: IMdconfMeta;
    ruleData: {
        rule_tpl: {
            __id: IRuleListKey;
            words_arr: string[];
            __file: string;
            lang?: string;
            words_source: import("@node-novel/layout").IWordsAll[];
            words_layout?: import("@node-novel/layout").IWordsAll[];
            words: import("@node-novel/layout").IWordsAll[];
            words_maybe: import("@node-novel/layout-pattern").vMaybe;
            words_callback?(text: string): string;
        };
        rule_base: {
            __id: "base-v2";
            words_arr: string[];
            __file: string;
            lang?: string;
            words_source: import("@node-novel/layout").IWordsAll[];
            words_layout?: import("@node-novel/layout").IWordsAll[];
            words: import("@node-novel/layout").IWordsAll[];
            words_maybe: import("@node-novel/layout-pattern").vMaybe;
            words_callback?(text: string): string;
        };
    };
    _t: string;
};
export declare function fsReadFile(file: string, cb?: (_t_old: Buffer) => unknown): Promise<{
    _t_old: Buffer;
    _cb_ret: unknown;
}>;
export declare function isEmptyFile(_t_old: Buffer | string): boolean;
export declare function diffPatch(name: string, _t_old: Buffer | string, _t: string): string;
export declare function freeGC(): void;
export declare function isGCMode(): boolean;
export declare function getNovelMeta(paths: string[] | string): IMdconfMeta;
