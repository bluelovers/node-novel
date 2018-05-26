/**
 * Created by user on 2017/8/13/013.
 */

import * as path from 'path';

export const project_root = path.join(__dirname);

export const dist_root = path.join(project_root, 'dist');
export const temp_root = path.join(project_root, 'test/temp');

export const dist_novel_root = path.join(project_root, 'dist_novel');

import * as ProjectConfig from './project.config'
export default ProjectConfig;
