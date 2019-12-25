/**
 * Created by user on 2019/7/7.
 */
import { findTargetPattern } from './lib/util';
import novelText, { IWordsRuntime } from '@node-novel/layout';
import { console } from 'debug-color2';

let pathMain = 'record';
let novelID = '翼の帰る処シリーズ';
let targetFile = '00080_第五卷 去往蒼穹的盡頭 上/00030_第一章.txt';

console.enabledColor = true;

findTargetPattern(pathMain, novelID, targetFile, {
	cb(_t_new: string, value: IWordsRuntime, index, words)
	{
		console.log(`current`, index, value);
		console.log(`next`, words[index+1]);

//		if (!/^在意別人的眼光吧/gm.test(_t_new))
//		{
//			console.dir(value);
//
//			return true;
//		}
	}
});
