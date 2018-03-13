/**
 * Created by user on 2018/3/7/007.
 */

import globby from 'node-novel-globby/g';
import * as fs from 'fs-extra';
import novelText from 'novel-text';
import path from 'upath2';
import * as projectConfig from '../../project.config';
import * as Promise from 'bluebird';
import * as StrUtil from 'str-util';
import * as JsDiff from 'diff';
import { i18next, loadLocales, addResourceBundle, locales_def } from '../../lib/i18n';
import * as execall from 'execall';
import * as JSON from 'json5';
import * as iconv from 'iconv-jschardet';

import * as zhtext from 'novel-text/zhjp';
import * as locales_lib from '../../lib/locales/lib';
import { trimFilename, regex_str } from '../../lib/func';
import { zhRegExp } from 'regexp-cjk';

let myLocalesID: string;
let pathMain = 'user';
let novelID: string;

novelID = '天才魔法使與原娼婦新娘';
novelID = 'エルフ転生からのチート建国記';

novelID = '再臨勇者の復讐譚　～失望しました、勇者やめて元魔王と組みます～';

novelID = '物語の中の銀の髪';

novelID = '黒の創造召喚師';

if (!novelID)
{
	throw new Error();
}

let cwd = path.join(projectConfig.dist_novel_root, pathMain, novelID);
let cwd_out = path.join(projectConfig.dist_novel_root, `${pathMain}_out`, novelID);

myLocalesID = myLocalesID || novelID;

let myLocales = loadLocales(myLocalesID);
if (myLocales)
{
	addResourceBundle(myLocales);
}
else
{
	myLocales = {
		lang: myLocalesID,
	};
}

i18next.changeLanguage(myLocales.lang);
i18next.setDefaultNamespace('i18n');

let _zh_num = '一二三四五六七八九十';
let _full_num = '０-９';
let _space = ' 　\\t';

(async () =>
{

	let r: RegExp;

	r = new zhRegExp([
		`(?:^)[${_space}]*`,
		//`(?:【渣翻＋直译＋脑补】)?`,
		`(`,
		[
			//`[序终][曲章]`,
			`(?:第?(?:[${_zh_num}]+|\\d+(?:\.\\d+)?|[${_full_num}]+(?:[\\.．][${_full_num}]+)?)(?:话|集|章))`,
			//`６[${_full_num}]+`,
			//`20`
			//`\\d+[${_space}\\-]`,
		].join('|'),
		`)`,
		`[${_space}]*`,
		//`[：~～]*`,
		`([^\\n]*)`,
		//`[：~～]*`,
		`[${_space}]*`,
		`$`,
	].join(''), 'igm');

	r = new zhRegExp(`第?\\s*(\\d+)\\s*話\\s*(.+?)?\\s*$`);

	let ls = await Promise
		.mapSeries(globby([
			'**/*.txt',
			'!**/~*',
			'!**/*.raw.*',
			'!**/*.new.*',
			'!**/out/**/*',
			'!**/raw/**/*',
			'!**/*_out/**/*',
		], {
			cwd: cwd,
			absolute: true,
		}), async function (file, index, len)
		{
			let ext = '.txt';

			let name = path.basename(file, ext);
			const name_old = name;
			let file_dir = path.dirname(file);

			let m = r.exec(name);

			//const c = '　';
			const c = ' ';

			if (m)
			{
				let id_str: string;

				let [src, id, desc] = m;

				desc = novelText.trim(desc || '', {
					//trim: true,
					trim: '；：：~～　 .',
				});

				let idn = id;
				idn = idn.padStart(3, '0');

				id_str = `第${idn}話`;

				name = `${id_str}`;
				if (desc)
				{
					name += c + `${desc}`;
				}
			}

			name = zhtext.filename(name, {
				skip: '娘志',
				//safe: false,
				})
				.replace('后記', '後記')
				.replace(/“/g, '『')
				.replace(/”/g, '』')

				/*
				.replace(/(\d+)/g, function (...m)
				{
					return StrUtil.toFullNumber(m[1]);
				})
				*/
			;

			name = novelText.trim(name, {
				trim: true,
			});

			name = trimFilename(name);

			if (name_old != name)
			{
				//await fs.move(file, path.join(file_dir, name + ext));

				await console.log(`${index}, "${name_old}"\n=> "${name}"`);
			}
			else
			{
				await console.error(`${index}, skip`, name_old);
			}
		})
	;

})();
