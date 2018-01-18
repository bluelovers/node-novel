/**
 * Created by user on 2018/1/17/017.
 */

import * as deepmerge from 'deepmerge';
import { array_unique } from '../func';
import * as moment from 'moment-timezone';

export function json2md(json_data, options: {
	tags?: string[],
	contribute?: string[],
} = {})
{
	let data;

	{
		data = deepmerge({}, json_data);
		data.data = data.data || {};

		if (json_data.novel_date)
		{
			data.novel_date = json_data.novel_date;
		}
	}

	data.tags = data.tags || [];
	data.contribute = data.contribute || [];

	if (options.tags)
	{
		data.tags = data.tags.concat(options.tags);
	}
	if (data.data.type)
	{
		data.tags = data.tags.concat(data.data.type);
	}

	data.tags.push('node-novel');

	if (options.contribute)
	{
		data.contribute = data.contribute.concat(options.contribute);
	}

	data.tags = array_unique(data.tags);
	data.contribute = array_unique(data.contribute);

	data.tags.sort();

	if (data.novel_date && typeof data.novel_date !== 'string')
	{
		if (data.novel_date.format)
		{
			data.novel_date = data.novel_date.format();
		}
		else if (data.novel_date.toJSON)
		{
			data.novel_date = data.novel_date.toJSON();
		}
		else if (data.novel_date._a)
		{
			data.novel_date = moment(data.novel_date._a).local().format();
		}
		else
		{
			data.novel_date = data.novel_date.toString();
		}
	}

	let md = `
# novel

- title: ${data.novel_title || data.data.g_lnovel_name}
- author: ${data.novel_author || data.data.author}
- source: ${data.url || ''}
- publisher: ${data.novel_publisher || ''}
- cover: ${data.novel_cover || data.data.cover_pic || ''}
- date: ${data.novel_date || ''}
- status: ${data.novel_status || ''}

## preface

\`\`\`
${(data.novel_desc || data.data.desc || '').replace(/\`/g, '\\`')}
\`\`\`

## tags

- ${data.tags.join('\n- ')}

# contribute

- ${data.contribute.join('\\n- ')}

`;

	return md;
}

import * as self from './metamd';
export default self;
//export default exports;
