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

	{
		title: null as string,
		pathMain: 'girl',
		novelID: '「「神と呼ばれ、魔王と呼ばれても」」',
		targetFile: '00000_null/00650_065　殘酷的現實.txt',

		match: /＞\n\n一隻耳/,

	},

	{
		title: null as string,
		pathMain: 'girl',
		novelID: '「「神と呼ばれ、魔王と呼ばれても」」',
		targetFile: '00000_null/00840_084　志願進入地球軍.txt',

		match: [
			/差別⋯⋯⋯\n⋯⋯不/,
			/參軍」⋯⋯⋯\n地球軍就是由這些士兵支撐起來的組織⋯⋯⋯/,
			/只有一條路⋯⋯⋯\n而我實在是不想選那條路⋯⋯⋯/,
		],

	},

	{
		title: null as string,
		pathMain: 'girl',
		novelID: '「「神と呼ばれ、魔王と呼ばれても」」',
		targetFile: '00000_null/00850_085　地獄.txt',

		match: [
			/時候。\n\n⋯⋯沒錯/,
		],

	},

	{
		title: null as string,
		pathMain: 'girl',
		novelID: '「「神と呼ばれ、魔王と呼ばれても」」',
		targetFile: 'dist_novel/girl_out/「「神と呼ばれ、魔王と呼ばれても」」/00000_null/00870_087　擴大的戰線.txt',

		match: [
			/⋯⋯這樣想來，被調往前線的前輩真的是女神一樣的人啊。\n在各個方面，她都一直都很照顧關心我⋯⋯⋯/,
			/⋯⋯縱使這樣淡然寫下來，看起來仿彿很簡單，不過這實際上這是相當少有的事情。\n\n原本/,
		],

	},

	{
		title: null as string,
		pathMain: 'girl',
		novelID: '「「神と呼ばれ、魔王と呼ばれても」」',
		targetFile: 'dist_novel/girl_out/「「神と呼ばれ、魔王と呼ばれても」」/00000_null/00890_089　黃昏時代的開端.txt',

		match: [
			/⋯⋯好了⋯⋯，開始了⋯⋯，開始吧。\n⋯⋯已經不得不開始了⋯⋯⋯\n地獄的終結⋯⋯⋯\n以及，⋯⋯的開始⋯⋯⋯/,
		],

	},

];

export default ITestTargetNovelFileCaseArray
