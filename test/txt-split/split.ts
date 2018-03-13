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
	'俺の死亡フラグが留まるところを知らない',
	'raw/不知我的死亡flag将于何处停止1-88.txt',
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
				`(?:第?(?:[${_zh_num}]+|\\d+(?:\.\\d+)?|[${_full_num}]+(?:[\\.．][${_full_num}]+)?)(?:话|集|章))`,
				//`６[${_full_num}]+`,
				//`20`
				`\\d+`,
			].join('|'),
			`)`,
			//`[${_space}]*`,
			//`[：~～]*`,
			//`([^\\n]*)`,
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
			const c = ' ';

			if (m_last)
			{
				let [id, desc] = m_last.sub;
				let id_str: string;
				let idn: string;

				id = novelText.trim(id, {
					trim: true,
				});

				idn = StrUtil.zh2num(StrUtil.toHalfWidth(id).trim())
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

				if (/^(\d+(?:\.\d+)?)$/.test(idn2))
				{
					idn = RegExp.$1;

					//idn = StrUtil.num2zh(idn);
					idn = StrUtil.toFullWidth(idn);

					id_str = `第${idn}話`;

					name = `${id_str}`;
					if (desc)
					{
						name += c + `${desc}`;
					}

					_ok = true;
				}
				else if (0)
				{
					id_str = id;
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
