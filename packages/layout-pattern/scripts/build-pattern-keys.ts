/**
 * Created by user on 2019/7/13.
 */
import lazymarks from '../lib/core/pattern';
import { outputFile } from 'fs-extra';
import { join } from 'path';

const keys = Object.keys(lazymarks).map(v => `"${v}"`).join(' | ');

const out = `
export type ILazyMarkKeys = ${keys}
`;

outputFile(join(__dirname, '..', 'lib/core', 'pattern-keys.ts'), out);
