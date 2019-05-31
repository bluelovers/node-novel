import { ITestTargetNovelFileCaseArray } from '../lib/util';

export const testCaseArray: ITestTargetNovelFileCaseArray = [

	{
		pathMain: 'syosetu',
		novelID: '乙女ゲー世界はモブに厳しい世界です',
		targetFile: '00040_第五章/00350_幕間　歐尼醬.txt',

		match: /莉維亞：「歐、歐尼醬？」\n安潔：「──歐尼桑嘛」/,

	},

	{
		title: null as string,
		pathMain: 'syosetu',
		novelID: '乙女ゲー世界はモブに厳しい世界です',
		targetFile: '00030_第四章/00010_序章.txt',

		match: /這樣的事件」\n「是特典嗎/,

	},

	{
		title: null as string,
		pathMain: 'syosetu',
		novelID: '乙女ゲー世界はモブに厳しい世界です',
		targetFile: '00040_第五章/00220_爆破.txt',

		match: /那樣子──」\n『勝了會高興嗎/,

	},

];

export default ITestTargetNovelFileCaseArray
