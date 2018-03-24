/**
 * Created by user on 2018/1/7/007.
 */

import novelText from 'novel-text';
import path from 'upath2';
import * as projectConfig from '../../project.config';
import txtSplit, { IOptions } from '../../lib/fs/txt-split';
import * as StrUtil from 'str-util';
import { zhRegExp } from 'regexp-cjk';
import * as zhtext from 'novel-text/zhjp';

let _zh_num = '一二三四五六七八九十';
let _full_num = '０-９';
let _space = ' 　\\t';

let inputFile = path.join(projectConfig.dist_novel_root,
	'user',
	'没落予定なので、鍛治職人を目指す',
	'z.raw/没落预定.txt',
);

let options: IOptions = {
	chapter: {
		//r: new RegExp(`[${_space}]*(第?(?:[序终]|[${_zh_num}]+)节)([^\\n]*)`, 'igm'),
		r: new zhRegExp([
			`(?:^)[${_space}]*`,
			`(?:【渣翻＋直译＋脑补】)?`,
			`(`,
			[
				//`[序终][曲章]`,
				//`(?:第?(?:[${_zh_num}]+|\\d+(?:\.\\d+)?|[${_full_num}]+(?:[\\.．][${_full_num}]+)?)(?:话|集|章))`,
				//`６[${_full_num}]+`,
				//`20`
				//`\\d+`,

				`第[${_zh_num}${_full_num}0-9]+章[${_space}]*第[${_zh_num}${_full_num}0-9]+话`,

			].join('|'),
			`)`,
			`[${_space}]*`,
			//`[：~～]*`,
			`([^\\n]*)`,
			//`[：~～]*`,
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
				let [idd, desc] = m_last.sub;

				let idn: string;
				idn = StrUtil.zh2num(StrUtil.toHalfWidth(idd).trim(), {
					unsafe: true,
					})
					.toString()
				;

				idn = idn
					.replace(/第/g, ' ')
					.replace(/\s+/g, ' ')
					.trim()
				;

				let _ok = true;

				if (_ok)
				{
					name = idn;
					idx += m_last.match.length;
					id = '';
				}
			}

			if (0 && m_last)
			{
				let [idd, desc] = m_last.sub;
				let id_str: string;
				let idn: string;

				idd = novelText.trim(idd, {
					trim: true,
				});

				idn = StrUtil.zh2num(StrUtil.toHalfWidth(idd).trim())
					.toString()
				;

				let idn2 = idn
					.replace(/[^\d\.]+/g, '')
				;

				desc = novelText.trim(desc || '', {
					//trim: true,
					trim: '；：：~～　 ',
				});

				let _ok = true;

				const c = ' ';

				if (/^(\d+(?:\.\d+)?)$/.test(idn2))
				{
					idn = RegExp.$1;

					//idn = StrUtil.num2zh(idn);
//					idn = StrUtil.toFullWidth(idn);

					//id_str = `${idn.padStart(3, '0')}話`;
					id_str = `${idn.padStart(3, '0')}`;

					name = `${id_str}`;
					if (desc)
					{
						name += c + `${desc}`;
					}

					id = '';

					_ok = true;
				}
				else if (0)
				{
					id_str = idd;
					name = `${id_str}`;
					if (desc)
					{
						name += c + `${desc}`;
					}

					_ok = true;
				}

				if (_ok)
				{
					idx += m_last.match.length;
				}
			}

			console.log(id, name, m_last);

			return {
				name,
				id,
				idx,
			};
		},
	},
};

console.log(options);

txtSplit.autoFile(inputFile, options)
	.then(ret => console.log(ret))
;
