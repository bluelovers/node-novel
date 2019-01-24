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

			'子宮',
			'催淫',
			'隂道',
			'隂蒂',
			'隂唇',
			'雌性',
			'小穴',
			'乳房',
			'乳頭',

			'內褲',
			'全裸',

		],
	});

	return sublib._word_zh_all(tiebaHarmony.getTable(options));
}

export default exports as typeof import('./baidu');
