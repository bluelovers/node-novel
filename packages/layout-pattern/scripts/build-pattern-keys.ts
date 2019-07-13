/**
 * Created by user on 2019/7/13.
 */
import lazymarks from '../lib/core/pattern';
import { outputFile } from 'fs-extra';
import { join, parse } from 'path';
import fg from '@bluelovers/fast-glob/bluebird';

const __root = join(__dirname, '..');

const keys = Object.keys(lazymarks).map(v => `"${v}"`).join(' | ');

const out = `
export type ILazyMarkKeys = ${keys}
`;

outputFile(join(__root, 'lib/core', 'pattern-keys.ts'), out);

fg([
	'*.ts',
	'!*.d.ts',
], {
	cwd: join(__root, 'lib/rules'),
})
.tap((ls) => {
	const keys = ls.map(v => `"${parse(v).name}"`);

	const out = `
export type IRuleListKeys = ${keys.join(' | ')};

export const RULE_LIST = [${keys.join(', ')}] as const;
`;

	return outputFile(join(__root, 'lib', 'rules-keys.ts'), out);

})
;