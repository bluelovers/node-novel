/**
 * Created by user on 2018/1/7/007.
 */

import novelText from 'novel-text';
import path from 'upath2';
import { trimTxtLine } from '../../lib/util';
import * as projectConfig from '../../project.config';
import txtSplit, { IOptions } from '../../lib/fs/txt-split';
import * as StrUtil from 'str-util';
import { zhRegExp } from 'regexp-cjk';
import { isRegExp } from 'regexp-helper-core';
import { cn2tw_min } from 'cjk-conv/lib/zh/convert/min';
import { trimFilename, regex_str } from '../../lib/func';
import novelFilename from 'cjk-conv/lib/novel/filename';
import { console } from 'debug-color2';

console.enabledColor = true;

let _zh_num = '一二三四五六七八九十';
let _full_num = '０-９';
let _space = ' 　\\t';

let inputFile = path.join(projectConfig.dist_novel_root,
	'user',
	'黑之魔王',
	'z.raw',
	'1-490.txt',
	//'黑魔1-499 粗校对简体字版.txt',
//	'黑魔第1-11章校润20181110.txt',

//	'黑魔1-518精校_20181208.txt'
);

const c = '　';

let _cache: any = {};

let options: IOptions = {

	readFileAfter(txt)
	{
		return txt
			.replace(/^　+/gm, '')
		;
	},

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

			`(?!第23章就此完結|361 END|第18章開始了|90話完|第5章開始羅~|第396話《転職為賢者》|第395話《可愛就是0義》|第6章結束)`,

			`(?:`,
			[
				`\\[google姐\\+(?:度娘\\+)?(?:腦補)?\\+渣翻(?:plus)?(?:腦補)?\\]`,
				`\\[google姐\\+度娘\\+渣翻plus腦補\\]`,
				`\\[google姐\\+腦補\\+渣翻\\]`,
				`\\[google姐\\+度娘\\+腦補\\+渣翻\\]`,
				`\\[google姐\\+度娘\\+渣翻plus腦補\\]`,

				`\\[google姐\\+度娘\\+渣翻plus腦補\\]`,
				'WEB',

				`4-1苹果箱之谜 +`,
				`4-2夏天的开始 +`,

				`【渣翻】`,

				`圣夜决战 其一 骚乱的开幕`,

				`【永恒的花火】`,

			].join('|'),
			`)?`,
			`[${_space}]*`,

			`(?!第23章就此完結|361 END|第18章開始了|90話完|第5章開始羅~|第396話《転職為賢者》|第395話《可愛就是0義》|第6章結束)`,

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

				`\\d{2,}[ 　]+(?!日)`,
				`\\d{2,}话`,
				//`\\d{2,}话 `,
				`第\\d{2,}回[ 　]+`,

				`[${_full_num}]+话`,

				`序曲`,

				'282|292|310',

				`（449）`,

				`第472 `,

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

				let is_vol = zhRegExp.create(/章/).test(ido);
				let is_num = /^\d+$/.test(id);

				_cache.last = _cache.last || {};

				if (is_num)
				{
					// @ts-ignore
					id = id | 0;

					if (is_vol && is_num)
					{
						// @ts-ignore
						if (_cache.last.vol && _cache.last.vol != (id - 1))
						{
							is_vol = false;
						}

						if (is_vol)
						{
							_cache.last.vol = id;
						}
					}

					if (!is_vol)
					{
						if (_cache.last.ch && (_cache.last.ch+1) != id)
						{
							console.red(id, name, _cache.last);
						}

						_cache.last.ch = id;
					}

					if (is_num)
					{
						idn = id.toString().padStart(is_vol ? 2 : 3, '0');
					}

					_cache.last.name = name
				}

				if (idn)
				{
					if (is_vol)
					{
						ids = `第${StrUtil.toFullNumber(idn)}章`;
					}
					else
					{
						ids = `第${StrUtil.toFullNumber(idn)}話`;
					}
				}
				else
				{
					ids = ido.trim();
				}

				desc = novelText.trim(desc, {
					trim: '；：：~～　 .',
				});

				desc = StrUtil.toFullNumber(desc);

				let c = '　';

				name = [
					ids,
					desc,
				].filter(v => v !== '').join(c);

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
	//.then(ret => console.log(ret))
;

function replaceName(name: string)
{
	return name
		.replace(new zhRegExp(/最後/g), '最後')
		.replace(new zhRegExp(/後記/g), '後記')
		;
}
