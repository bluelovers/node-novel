/**
 * Created by user on 2019/7/13.
 */
import { IWordsAll, IWordsArray2, IWordsArray, IWordsUser, IWordsFunction, IWordsRuntime } from '@node-novel/layout';
import { IRegExpCallback } from '@node-novel/layout/lib/types';
export declare type IWords = IWordsAll;
export { IWordsAll, IWordsArray2, IWordsArray, IWordsUser, IWordsFunction, IWordsRuntime };
export declare type vMaybe = Array<string | RegExp | Function | Array<string | RegExp>>;
/**
 * @deprecated
 */
export declare function _word_en(search: string | RegExp, ret?: string | IRegExpCallback, flag?: string): [RegExp, string | any];
/**
 * @deprecated
 */
export declare function _word_en2(search: string | RegExp, ret?: string | IRegExpCallback, flag?: string): [RegExp, string | any];
/**
 * 配對英文單字
 */
export declare function _word_en3(search: string | RegExp, ret?: string | IRegExpCallback, flag?: string): [RegExp, string | any];
/**
 * 配對日文片假名
 */
export declare function _word_jp1(search: string | RegExp, ret?: string | IRegExpCallback, flag?: string): [RegExp, string | any];
/**
 * 自動配對簡繁日漢字
 *
 * 最好只用在全新腳本內
 */
export declare function _word_zh_all(arr: IWords[]): IWords[];
export default _word_zh_all;
