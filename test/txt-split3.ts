/**
 * Created by user on 2018/1/7/007.
 */

import { novelText } from '../lib/novel/text';
import path from 'upath2';
import * as projectConfig from '../project.config';
import txtSplit from '../lib/fs/txt-split';
import * as StrUtil from 'str-util';

let _zh_num = '一二三四五六七八十';
let _space = ' 　\\t';

let inputFile = path.join(projectConfig.dist_novel_root,
	'user',
	'魔拳のデイドリーマー',
	'raw/魔拳的妄想者(1-97.5).txt',
);

let options = {
	volume: {
		r: new RegExp(`(?:^|\\n)[${_space}]*(第?(?:[序终]|[${_zh_num}]+)章)([^\\n]*)`, 'igm'),
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
				name = novelText.trim(m_last.sub[0], {
					trim: true,
				}) + '　' + novelText.trim(m_last.sub[1], {
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
		r: new RegExp(`(?:^|\\n)[${_space}]*(第?(?:[序终]|[${_zh_num}]+|\\d+[ \\d\\+\\.]*)[話话；]+)([^\\n]*)`, 'igm'),
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
				let id = StrUtil.zh2num(m_last.sub[0])
					.toString()
					.replace(/^\D+/, '')
					.replace(/\D+$/, '')
				;

				id = novelText.trim(id, {
					trim: true,
				});

				name = `第${id}話` + '　' + novelText.trim(m_last.sub[1], {
					trim: '；',
				});

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

txtSplit.autoFile(inputFile, options)
	.then(ret => console.log(ret))
;
