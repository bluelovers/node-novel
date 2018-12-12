/**
 * Created by user on 2017/8/13/013.
 */

import { ITSPickNot } from 'ts-type';
import * as path from 'path';

const project_root = path.join(__dirname);

export interface IProjectConfig
{
	readonly project_root: string;
	readonly dist_root: string;
	readonly temp_root: string;
	readonly dist_novel_root: string;
}

const baseProjectConfig: Readonly<IProjectConfig> = Object.freeze({
	project_root,
	dist_root: path.join(project_root, 'dist'),
	temp_root: path.join(project_root, 'test/temp'),
	dist_novel_root: path.join(project_root, 'dist_novel'),
});

export default baseProjectConfig;
Object.freeze(exports);
