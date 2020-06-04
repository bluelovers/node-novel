/**
 * Created by user on 2019/7/13.
 */
/// <reference types="node" />
import { IRuleListKey } from './rules-keys';
/**
 * 取得內建 規則範本內容 (typescript)
 */
export declare function getBuildInRuleFileContext<T extends string | IRuleListKey>(id: T): Buffer;
export default getBuildInRuleFileContext;
