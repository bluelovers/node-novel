/**
 * Created by user on 2019/7/13.
 */

import { readFileSync } from 'fs';
import { IRuleListKeys, RULE_LIST } from './rules-keys';
import { IPatternRule } from './core/types';
import { existsBuildInRule, getBuildInRulePath } from './rules';

export function getBuildInRuleFileContext<T extends string | IRuleListKeys>(id: T)
{
	if (existsBuildInRule(id))
	{
		return readFileSync(getBuildInRulePath(id))
	}
}

export default getBuildInRuleFileContext