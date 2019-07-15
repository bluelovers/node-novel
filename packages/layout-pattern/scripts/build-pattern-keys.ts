/**
 * Created by user on 2019/7/13.
 */
import lazymarks from '../lib/core/pattern';
import { outputFile } from 'fs-extra';
import { join, parse } from 'path';
import fg from '@bluelovers/fast-glob/bluebird';
import * as Case from 'case';

const __root = join(__dirname, '..');

{
	//const keys = Object.keys(lazymarks).map(v => `"${v}"`).join(' | ');

	const keys: string[] = [];
	const keys2: string[] = [];

	const _enum = Object.keys(lazymarks).reduce((a, id) =>
	{
		let name = CaseConstant(id);

		keys.push(`EnumLazyMarkKeys.${name}`);
		keys2.push(`"${id}"`);

		a.push(`\t${name} = "${id}",`);

		return a;
	}, []);

	const out = `
export const enum EnumLazyMarkKeys
{
${_enum.join('\n')}
}

export type ILazyMarkKey = ${keys.concat(keys2).join(' | ')};

export type ILazyMarkKey2 = ${keys.join(' | ')}

export type ILazyMarkKey3 = ${keys2.join(' | ')};

export const LAZY_MARK_KEY_LIST = [${keys.join(', ')}] as const;
`;

	outputFile(join(__root, 'lib/core', 'pattern-keys.ts'), out);
}

fg([
	'*.ts',
	'!*.d.ts',
], {
	cwd: join(__root, 'lib/rules'),
})
	.tap((ls) =>
	{
		//const keys = ls.map(v => `"${parse(v).name}"`);

		const keys: string[] = [];
		const keys2: string[] = [];

		const _enum = ls.reduce((a, v) =>
		{

			let id = parse(v).name;

			let name = CaseConstant(id);

			keys.push(`EnumRuleListKeys.${name}`);
			keys2.push(`"${id}"`);

			a.push(`\t${name} = "${id}",`);

			return a;
		}, []);

		const out = `
export const enum EnumRuleListKeys
{
${_enum.join('\n')}
}

export type IRuleListKey = ${keys.concat(keys2).join(' | ')};

export type IRuleListKey2 = ${keys.join(' | ')};

export type IRuleListKey3 = ${keys2.join(' | ')};

export const RULE_LIST = [${keys.join(', ')}] as const;
`;

		return outputFile(join(__root, 'lib', 'rules-keys.ts'), out);

	})
;

export function CaseConstant(id: string)
{
	return Case.constant(/^\d+$/.test(id) ? '_' + id : id)
}