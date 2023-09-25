/**
 * Created by user on 2018/1/7/007.
 */

import novelText from 'novel-text';
import path from 'upath2';
import * as projectConfig from '../../project.config';
//import txtSplit, { IOptions } from '../../lib/fs/txt-split';
import * as StrUtil from 'str-util';
import { zhRegExp } from 'regexp-cjk';
import { isRegExp } from 'regexp-helper-core';
import { cn2tw_min } from 'cjk-conv/lib/zh/convert/min';
import { trimFilename, regex_str } from '../../lib/func';
import novelFilename from 'cjk-conv/lib/novel/filename';
import { console } from 'debug-color2';

import * as txtSplit from '@node-novel/txt-split';
import { IOptionsRequiredUser } from '@node-novel/txt-split';

console.enabledColor = true;

console.inspectOptions = console.inspectOptions || {};
console.inspectOptions.colors = true;

let _zh_num = '一二三四五六七八九十';
let _full_num = '０-９';
let _space = ' 　\\t';

let inputFile = path.join(projectConfig.dist_novel_root,
	'mirronight',
	'只有無職是不會辭掉的',
	'z.raw',
	'7df93fc84425affc.txt',
);

const c = '　';

let options: IOptionsRequiredUser = {

	useRegExpCJK: true,

	// @ts-ignore
	volume: {

		ignoreRe: /第一章结束时的状态栏|第二章我是完全未看/,

		r: new zhRegExp([
			//`(?:^|\\n)[${_space}]*(第?(?:[序终]|[${_zh_num}]+|\\d+)章)([^\\n]*)`,

			`(?:^)[${_space}]*`,
			`(`,
			[
				`(?:第?(?:序|终)|第[${_zh_num}\\d]+)章`,
			].join('|'),
			`)`,
			`[${_space}\\-]*`,
			`([^\\n]*)`,
			`[${_space}]*`,
			`$`,

		].join(''), 'igm'),
		cb({
			i,
			id,
			name,
			m,
			m_last,
			_files,
			idx,
		})
		{
			if (m_last)
			{
				let src = m_last.match;
				let [ido, desc] = m_last.sub;

//				console.log(m_last);

				let id = StrUtil.zh2num(ido)
					.toString()
					.replace(/^\D+/, '')
					.replace(/\D+$/, '')
					.trim()
				;

				let idn: string;
				let ids = ido;

				if (/^\d+$/.test(id))
				{
					idn = StrUtil.toFullNumber(id.toString());
				}

				if (idn)
				{
					ids = `第${idn}章`;
				}
				else
				{
					ids = ido;
				}

				desc = novelText.trim(desc, {
					trim: '；：：~～　 .',
				});

				desc = StrUtil.toFullNumber(desc);

				name = [
					ids,
					desc,
				].filter(v => v !== '').join(c);

//				name = novelFilename.filename(name);
				//name = trimFilename(name);

				name = cn2tw_min(name);

				name = replaceName(name);

				name = novelText.trim(name, {
					trim: true,
				});
			}

			//console.log(id, name);

			return {
				name,
				id,
				idx,
			};
		},
	},

	readFileAfter(txt)
	{
		return txt
			.replace(/(?<=^\d+ *(?:[^\n]+))(?=（岚)/gm, '\n')
			;
	},

	chapter: {

		ignoreRe: /1.伊普斯郞王國的西北方領土會割讓給鈴木宇田|2.作為賠償，會馬上支付金幣50萬|3.國民一萬人作為奴隸支付給鈴木宇田|58是、58歲？還真看不出呀|1小時後|13個魔人が全員四肢著地|13人一體化し大量的手腳|10个雪人完成了|3人的笑声扩散在万|10人合力将水|10岁不到的孩子们向|100多架巨人踏响地面，|58是、58歲？/,

		//r: new RegExp(`[${_space}]*(第?(?:[序终]|[${_zh_num}]+)节)([^\\n]*)`, 'igm'),
		r: new zhRegExp([
			//`[${_space}]*(第?(?:(?:序|终)|[${_zh_num}\\d]+)话)([^\\n]*)`,
			//`(?:^|\\n)[${_space}]*(\\d+\\-\\d+)([^\\n]*)`,

			`(?:^)[${_space}]*`,
			//`(?:WEB[ ]*)?`,

			`(?:`,
			[
				`\\[google姐\\+(?:度娘\\+)?(?:腦補)?\\+渣翻(?:plus)?(?:腦補)?\\]`,
				`\\[google姐\\+度娘\\+渣翻plus腦補\\]`,
				`\\[google姐\\+腦補\\+渣翻\\]`,
				`\\[google姐\\+度娘\\+腦補\\+渣翻\\]`,
				`\\[google姐\\+度娘\\+渣翻plus腦補\\]`,

				`\\[google姐\\+度娘\\+渣翻plus腦補\\]`,

			].join('|'),
			`)?`,
			`[${_space}]*`,
			`(`,
			[
				`(?:(?:第|最)?(?:序|终)|第[${_zh_num}\\d]+)话`,
				//`幕间`,

//				`WEB[ ]*\\d+`,
//				`#?\\d+(?:\\.\\d+)?\\.?[ ]*(?=(?:元|原)勇者?)`,
//				`\\d{2,}、[ ]*`,
//				`\\d{2,}[ ]+(?!\\:)`,
//				`#?\\d{3,}[\\.。 ：]`,
//				`\\d{2,}(?=\\n)`,
//				`番外`,
//				`原(?:勇|者)\\d{3,}`,
//				`（web\\d+）`,

				//`(?:第(?:[\\d${_zh_num}${_full_num}]+|\\d+|[${_full_num}\\d]+)(?:话|集|章))`,

				//`\\d{2,} `,

				//`序曲`,

				//'序章',

				//'序幕',

				//'\\d+',

				//`[${_full_num}\\d]+[．.]`,

				//`\\d+话：`,

				`\\d+(?= ?【)`,

			].join('|'),
			`)`,
			`[${_space}\\-]*`,
			`([^\\n]*)`,
			`[${_space}]*`,
			`$`,
		].join(''), 'igm'),
		cb({
			i,
			id,
			name,
			m,
			m_last,
			_files,
			idx,
		})
		{
			if (m_last)
			{
				let src = m_last.match;
				let [ido, desc] = m_last.sub;

				//console.log(ido, desc);

//				console.log(m_last);

				let id = StrUtil.zh2num(StrUtil.toHalfWidth(ido))
					.toString()
					.replace(/^\D+/, '')
					.replace(/\D+$/, '')
					.trim()
				;

				let idn: string;
				let ids = ido;

				if (/^\d+$/.test(id))
				{
					idn = id.toString().padStart(3, '0');
				}

				if (idn)
				{
					ids = `${idn}`;
				}
				else
				{
					ids = ido;
				}

				desc = novelText.trim(desc, {
					trim: '；：：~～　 .',
				});

				desc = StrUtil.toFullNumber(desc);

				if (1)
				{
					let c = '．';
					c = '　';

					name = [
						ids,
						desc,
					].filter(v => v !== '').join(c);
				}

//				name = novelFilename.filename(name);
//				name = trimFilename(name);

				name = cn2tw_min(name);

				name = replaceName(name);

				name = novelText.trim(name, {
					trim: true,
				});

//				console.dir({
//					id,
//					idn,
//					ids,
//					name,
//				});

//				process.exit();

				idx += m_last.match.length;
			}

			//console.log(id, name);

			return {
				name,
				id,
				idx,
			};
		},
	},
};

console.dir(options);

txtSplit.autoFile(inputFile, options)
	.then(ret => {

		delete ret.options.txt;

		console.dir(ret.options);
	})
;

function replaceName(name: string)
{
	return name
		.replace(new zhRegExp(/最後/g), '最後')
		.replace(new zhRegExp(/後記/g), '後記')
		;
}
