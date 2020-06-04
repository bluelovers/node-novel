/**
 * Created by user on 2019/7/18.
 */
import { IMatchesRow } from 'execall2';
import { ITSOverwrite, ITSPartialWith } from 'ts-type';
export interface ICacheSource {
    /**
     * 待修正屏蔽字
     */
    block2: Record<string, IMatchesRow[]>;
    /**
     * ja.md / 含有日文的章節段落
     */
    ja: Record<string, IMatchesRow[]>;
    /**
     * ja2.md / 未加入整合的日文 / 待整合的日文
     */
    ja2: Record<string, string[]>;
}
export interface ICacheOutput {
    /**
     * 待修正屏蔽字
     */
    block2: Record<string, Record<string, string[]>>;
    /**
     * ja.md / 含有日文的章節段落
     */
    ja: Record<string, string[]>;
    /**
     * ja2.md / 未加入整合的日文 / 待整合的日文
     */
    ja2: Record<string, string[]>;
}
export interface IOptions {
    input: string;
    _cache: ICacheSource;
    _cache_key_: string;
}
export interface IOptionsOutput extends IOptions {
    _cache_output: ICacheOutput;
}
export declare function dummyCache<T extends Partial<ICacheSource>>(data: T): ITSOverwrite<T, ICacheSource>;
export declare function dummyCache(data?: any): ICacheSource;
export declare function analyzeJa001(data: IOptions): IOptions;
export declare function handleJa001(_data: ICacheSource["ja"]): ICacheOutput["ja"];
export declare function analyzeJa002(data: IOptions): IOptions;
export declare function handleJa002(_data: ICacheSource["ja2"]): ICacheOutput["ja2"];
export declare function analyzeBlock002(data: IOptions): IOptions;
export declare function handleBlock002(_data: ICacheSource["block2"]): ICacheOutput["block2"];
export declare function lazyAnalyzeAll(data: ITSPartialWith<IOptions, '_cache'> | IOptions): IOptions;
export declare function lazyAnalyzeReportAll(data: ITSPartialWith<IOptions, '_cache'> | IOptions): IOptionsOutput;
export default lazyAnalyzeReportAll;
