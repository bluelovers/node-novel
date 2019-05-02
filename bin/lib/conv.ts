/**
 * Created by user on 2019/5/2.
 */

import { tw2cn_min, cn2tw_min, tableCn2TwDebug, tableTw2CnDebug } from 'cjk-conv/lib/zh/convert/min';

export function do_cn2tw_min(...argv: Parameters<typeof cn2tw_min>): string
{
	return cn2tw_min(...argv)
		.replace('麽', '麼')
}
