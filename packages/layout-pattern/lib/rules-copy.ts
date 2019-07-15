/**
 * Created by user on 2019/7/13.
 */

import { readFileSync } from 'fs';
import { IRuleListKey, RULE_LIST } from './rules-keys';
import { IPatternRule } from './core/types';
import { existsBuildInRule, getBuildInRulePath } from './rules';

export function getBuildInRuleFileContext<T extends string | IRuleListKey>(id: T)
{
	if (existsBuildInRule(id))
	{
		return readFileSync(getBuildInRulePath(id))
	}
}

export default getBuildInRuleFileContext
