/**
 * Created by user on 2019/5/29.
 */
import { EnumLF, IRegExpCallback } from '@node-novel/layout/lib/types';

interface IDataRow
{
	[0]: [string | RegExp, string | IRegExpCallback],
	[1]: string,
	[2]: string | RegExp | ((input: string, conf: IDataRow) => boolean),
}

const testCaseList = [

	[
		[/(\n(?:[^\u3000\n][^\n]+))\n([\u3000])/g, '$1\n\n$2'],
		`\n住手，住手，我就是我。不是其他的任何人。\n　表示出要必死地进行抵抗的意志，但是侵入脑内的这个『什么东西』，并不能被阻止。不能被，阻止……`,
		EnumLF.LF2,
	],

	[
		[/(?<=[^\n「」【】《》“”『』（）\[\]"](?:[！？?!。]+)|[^\n「」【】《》“”『』（）\[\]"！？?!。])\n(?=(?:[—]+)?[「」“”【】《》（）『』])/ug, '\n\n'],
		`總算到達了目的地白銀喇叭的街道，米菈一邊像門衛揮手一邊通過了敞開的們，街道發生的變化讓米菈的視線一瞬間模糊了。\n「三十年過去了，不是我記得的那樣也是當然的。」`,
		/。\n\n「/,
	],

].filter(v => v) as unknown as IDataRow[];

export default testCaseList
