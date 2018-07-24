/**
 * Created by user on 2018/1/31/031.
 */

import { IWords } from '../index';

export * from 'tieba-harmony';
import tiebaHarmony from 'tieba-harmony';
import * as deepmerge from 'deepmerge-plus';
import sublib from './index';

//console.log(tiebaHarmony.SP_REGEXP);

export function getTable(options: tiebaHarmony.IOptions = {}): IWords[]
{
	options = deepmerge(options, {
		tables: [

			'毒妇',
			'傻瓜',
			'厮杀',


		],
	});

	return sublib._word_zh_all(tiebaHarmony.getTable(options));
}

import * as self from './baidu';
export default self;
