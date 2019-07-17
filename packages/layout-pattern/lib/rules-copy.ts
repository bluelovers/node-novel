/**
 * Created by user on 2019/7/13.
 */

import { readFileSync } from 'fs';
import { IRuleListKey, RULE_LIST } from './rules-keys';
import { IPatternRule } from './core/types';
import { existsBuildInRule, getBuildInRulePath } from './rules';

/**
 * 取得內建 規則範本內容 (typescript)
 */
export function getBuildInRuleFileContext<T extends string | IRuleListKey>(id: T): Buffer
{
	if (existsBuildInRule(id))
	{
		return readFileSync(getBuildInRulePath(id, true))
	}
}

export default getBuildInRuleFileContext
