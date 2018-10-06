/**
 * Created by user on 2018/1/7/007.
 */

import novelText from 'novel-text';
import path from 'upath2';
import * as projectConfig from '../../project.config';
import txtSplit, { IOptions } from '../../lib/fs/txt-split';
import * as StrUtil from 'str-util';
import { isRegExp, zhRegExp } from 'regexp-cjk';
import { cn2tw_min } from 'cjk-conv/lib/zh/convert/min';
import { trimFilename, regex_str } from '../../lib/func';
import novelFilename from 'cjk-conv/lib/novel/filename';
import { console } from 'debug-color2';

console.enabledColor = true;

let _zh_num = '一二三四五六七八九十';
let _full_num = '０-９';
let _space = ' 　\\t';

let inputFile = path.join(projectConfig.dist_novel_root,
	'z.abandon',
	'邪竜転生',
	'z.raw/23-53.txt',
);

const c = '　';

let options: IOptions = {
	// @ts-ignore
	_volume: {
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

	chapter: {
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
				//`(?:(?:第|最)?(?:序|终)|第[${_zh_num}\\d]+)话`,
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

				`(?:第(?:[\\d${_zh_num}${_full_num}]+|\\d+|[${_full_num}\\d]+)(?:话|集|章))`,

				`\\d{2,} `,

				`序曲`,


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

				let c = '.';

//				name = [
//					ids,
//					desc,
//				].filter(v => v !== '').join(c);

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
	.then(ret => console.log(ret))
;

function replaceName(name: string)
{
	return name
		.replace(new zhRegExp(/最後/g), '最後')
		.replace(new zhRegExp(/後記/g), '後記')
		;
}
