import { ICacheSource, ICacheOutput, handleJa002, handleJa001, handleBlock002 } from '../index';
import * as JSON5 from 'json5';

/**
 * 待修正屏蔽字.md
 */
export function outputBlock002(options: {
	inputData: ICacheSource["block2"] | ICacheOutput["block2"],
	handled?: boolean,
	title?: string | unknown,
})
{
	let { inputData, title = '待修正屏蔽字', handled } = options;

	if (!handled)
	{
		inputData = handleBlock002(inputData as ICacheSource["block2"]);
	}

	return _mdStyle002({
		inputData: inputData as ICacheOutput["block2"],
		title: title as string,
	})
}

/**
 * ja.md / 含有日文的章節段落
 */
export function outputJa001(options: {
	inputData: ICacheSource["ja"] | ICacheOutput["ja"],
	handled?: boolean,
	title?: string | unknown,
})
{
	let { inputData, title = '含有日文的章節段落', handled } = options;

	if (!handled)
	{
		inputData = handleJa001(inputData as ICacheSource["ja"]);
	}

	return _mdStyle001({
		inputData: inputData as ICacheOutput["ja"],
		title: title as string,
	})
}

/**
 * ja2.md / 未加入整合的日文 / 待整合的日文
 */
export function outputJa002(options: {
	inputData: ICacheSource["ja2"] | ICacheOutput["ja2"],
	handled?: boolean,
	title?: string | unknown,
})
{
	let { inputData, title = '待整合的日文', handled } = options;

	if (!handled)
	{
		inputData = handleJa002(inputData);
	}

	return _mdStyle001({
		inputData,
		title: title as string,
	})
}

export function stringify(v: unknown): string
{
	return JSON.stringify(v).replace(/^"|"$/g, '');
}

export function _mdStyle001(options: {
	inputData: Record<string, string[]>,
	title: string,
})
{
	return Object.entries(options.inputData)
		.reduce((a, [k, b]) => {

			a.push(`\n## ${k}`);
			a.push('');

			b.forEach(s => {
				a.push(`- ${stringify(s)}`);
			});

			a.push('');

			return a;
		}, [
			`# ${options.title}`,
			'',
			'[TOC]',
		])
		.join("\n")
		;
}

export function _mdStyle002(options: {
	inputData: Record<string, Record<string, string[]>>,
	title: string,
})
{
	return Object.entries(options.inputData)
		.reduce((a, [k, b]) => {

			a.push(`\n## ${stringify(k)}`);

			for (let k in b)
			{
				a.push(`\n### ${stringify(k)}\n`);

				for (let m of b[k])
				{
					a.push(`- ${stringify(m)}`);
				}
			}

			a.push('');

			return a;
		}, [
			`# ${options.title}`,
			'',
			'[TOC]',
		])
		.join("\n")
		;
}