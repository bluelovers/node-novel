/**
 * Created by user on 2019/7/13.
 */
import { IRuleListKey, RULE_LIST } from './rules-keys';
import { IPatternRule } from './core/types';

type IModuleLike<T> = {
	default: T
} & T

export function existsBuildInRule<T extends string | IRuleListKey>(id: T): id is Extract<T, IRuleListKey>
{
	return RULE_LIST.includes(id as Extract<T, IRuleListKey>)
}

export function getBuildInRulePath<T extends string | IRuleListKey>(id: T): string
{
	if (existsBuildInRule(id))
	{
		return require.resolve(`./rules/${id}`);
	}
}

export function getBuildInRule<T extends string | IRuleListKey>(id: T): IPatternRule
{
	if (existsBuildInRule(id))
	{
		let m: IModuleLike<IPatternRule> = require(`./rules/${id}`);

		return m.default == null ? m : m.default
	}
}

export default getBuildInRule