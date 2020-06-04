import { ICacheSource, ICacheOutput } from '../index';
/**
 * 待修正屏蔽字.md
 */
export declare function outputBlock002(options: {
    inputData: ICacheSource["block2"] | ICacheOutput["block2"];
    handled?: boolean;
    title?: string | unknown;
}): string;
/**
 * ja.md / 含有日文的章節段落
 */
export declare function outputJa001(options: {
    inputData: ICacheSource["ja"] | ICacheOutput["ja"];
    handled?: boolean;
    title?: string | unknown;
}): string;
/**
 * ja2.md / 未加入整合的日文 / 待整合的日文
 */
export declare function outputJa002(options: {
    inputData: ICacheSource["ja2"] | ICacheOutput["ja2"];
    handled?: boolean;
    title?: string | unknown;
}): string;
export declare function stringify(v: unknown): string;
export declare function _mdStyle001(options: {
    inputData: Record<string, string[]>;
    title: string;
}): string;
export declare function _mdStyle002(options: {
    inputData: Record<string, Record<string, string[]>>;
    title: string;
}): string;
