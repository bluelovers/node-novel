/**
 * Created by user on 2018/1/7/007.
 */

import novelText from 'novel-text';
import path from 'upath2';
import * as projectConfig from '../../project.config';
import txtSplit, { IOptions } from '../../lib/fs/txt-split';
import * as StrUtil from 'str-util';

let _zh_num = '一二三四五六七八十';
let _space = ' 　\\t';

let inputFile = path.join(projectConfig.dist_novel_root,
	'user',
	'暗黒騎士物語　～勇者を倒すために魔王に召喚されました～',
	'raw/暗黒騎士物語 1.1-4.7.txt',
);

let options: IOptions = {
	volume: {
		r: new RegExp(`(?:^|\\n)[${_space}]*(第?(?:[序终]|[${_zh_num}]+|\\d+)章)([^\\n]*)`, 'igm'),
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
				let id = novelText.trim(StrUtil.zh2num(m_last.sub[0]) as string, {
					trim: true,
				});

				if (/\d+/.test(id))
				{
					id = id
						.replace(/^\D+/, '')
						.replace(/\D+$/, '')
					;

					name = `第${StrUtil.toFullNumber(id)}章`;
				}
				else
				{
					name = novelText.trim(m_last.sub[0], {
						trim: true,
					})
				}

				name = name + '　' + novelText.trim(m_last.sub[1], {
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
		r: new RegExp(`(?:^|\\n)[${_space}]*(\\d+\\-\\d+)([^\\n]*)`, 'igm'),
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

				name = `${id}` + '　' + novelText.trim(m_last.sub[1], {
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

console.log(options);

txtSplit.autoFile(inputFile, options)
	.then(ret => console.log(ret))
;
