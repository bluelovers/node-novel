/**
 * Created by user on 2019/7/13.
 */
import { IRuleListKey, IRuleListKey2, RULE_LIST } from './rules-keys';
import { IPatternRule } from './core/types';

type IModuleLike<T> = {
	default: T
} & T

type IExtractPlus<T, U, D = never> = T extends U ? T : D;

export function existsBuildInRule<T extends string | IRuleListKey>(id: T | IRuleListKey) : id is IExtractPlus<T, IRuleListKey, IRuleListKey>
{
	return RULE_LIST.includes(id as any as Extract<T, IRuleListKey2>)
}

export function getBuildInRulePath<T extends string | IRuleListKey>(id: T, source?: boolean): string
{
	if (existsBuildInRule(id))
	{
		if (source)
		{
			return require.resolve(`./rules/${id}.ts`);
		}

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