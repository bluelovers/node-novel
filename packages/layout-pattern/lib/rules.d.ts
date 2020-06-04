/**
 * Created by user on 2019/7/13.
 */
import { IRuleListKey } from './rules-keys';
import { IPatternRule } from './core/types';
declare type IExtractPlus<T, U, D = never> = T extends U ? T : D;
export declare function existsBuildInRule<T extends string | IRuleListKey>(id: T | IRuleListKey): id is IExtractPlus<T, IRuleListKey, IRuleListKey>;
export declare function getBuildInRulePath<T extends string | IRuleListKey>(id: T, source?: boolean): string;
export declare function getBuildInRule<T extends string | IRuleListKey>(id: T): IPatternRule;
export default getBuildInRule;
