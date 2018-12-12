/**
 * Created by user on 2017/8/13/013.
 */

import * as path from 'path';
import * as fs from 'fs-extra';
import { IProjectConfig } from './project.config.base';

export { IProjectConfig }

export const ProjectConfig = loadProjectConfig();

export const project_root = ProjectConfig.project_root;

export const dist_root = ProjectConfig.dist_root;
export const temp_root = ProjectConfig.temp_root;

export const dist_novel_root = ProjectConfig.dist_novel_root;

export default ProjectConfig;

function loadProjectConfig(): Readonly<IProjectConfig>
{
	let b = require('./project.config.base').default;

	let conf: IProjectConfig = Object.assign({}, b);

	try
	{
		let m = require('./project.config.local');

		if (m && m.default && Object.keys(m.default).length)
		{

			Object.entries(m.default)
				.forEach(([k, v]) =>
					{
						if (v && typeof v === 'string')
						{
							conf[k] = v;
						}
					})
			;
		}
	}
	catch (e)
	{

	}

	return Object.freeze(conf);
}

Object.freeze(exports);
