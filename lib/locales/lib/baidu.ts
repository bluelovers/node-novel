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
			'较高',
			'不要',
			'体位',
			'出改',
			'善再',
			'谄媚',

			//

			'尼玛',
			'阿尼玛',
			'断頭',
			'断頭台',
			'虐杀',

			'麻藥',

			'反国家',
			'殺戮',

			'白色',

		],
	});

	return sublib._word_zh_all(tiebaHarmony.getTable(options));
}

import * as self from './baidu';
export default self;
