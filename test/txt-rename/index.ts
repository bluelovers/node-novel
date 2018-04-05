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
import novelFilename from 'cjk-conv/lib/novel/filename';

let myLocalesID: string;
let pathMain = 'user';
let novelID: string;

novelID = '天才魔法使與原娼婦新娘';
novelID = 'エルフ転生からのチート建国記';

novelID = '再臨勇者の復讐譚　～失望しました、勇者やめて元魔王と組みます～';

novelID = '物語の中の銀の髪';

novelID = '黒の創造召喚師';

novelID = '乙女ゲームの悪（中略）ヒロインが鬼畜女装野郎だったので、助けて下さい';

novelID = 'カルマの塔';

//novelID = '没落予定なので、鍛治職人を目指す';

//novelID = '誰にでもできる影から助ける魔王討伐';

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
		`(\\d{4,}[ _])?`,
		//`(?:【渣翻＋直译＋脑补】)?`,
		`(`,
		[
			//`[序终][曲章]`,
			//`(?:第?(?:[${_zh_num}]+|\\d+(?:\.\\d+)?|[${_full_num}]+(?:[\\.．][${_full_num}]+)?)(?:话|集|章))`,
			//`６[${_full_num}]+`,
			//`20`
			//`\\d+[${_space}\\-]`,
			'\\d{3}',
		].join('|'),
		`)`,
		`[${_space}]*`,
		//`[：~～]*`,
		`([^\\n]*)`,
		//`[：~～]*`,
		`[${_space}]*`,
		`$`,
	].join(''), 'ig');

	//r = new zhRegExp(`第?\\s*(\\d+)\\s*話\\s*(.+?)?\\s*$`);

//	r = new zhRegExp(`^(\\d{4,}[ _])()(.+)$`);

	//r = new zhRegExp(`^()(\\d{3}) (.+)$`);

	console.log(r);

	let ls = await Promise
		.mapSeries(globby([
			'**/*.txt',
			'!**/~*',
			'!**/*.raw.*',
			'!**/*.new.*',
			'!**/out/**/*',
			'!**/raw/**/*',
			'!**/*_out/**/*',
			'!*.raw',
			'!raw',
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
			//const c = ' ';
			const c = ' ';

			if (0 && m)
			{
				let id_str: string;

				let [src, ido, id, desc] = m;

				desc = novelText.trim(desc || '', {
					//trim: true,
					trim: '；：：~～　 .',
				});

				desc = StrUtil.toFullNumber(desc);

				let idn = id;
				if (typeof idn != 'undefined')
				{
					idn = idn.padStart(3, '0');
				}

				id_str = `${idn}`;

				name = '';

				name = `${id_str}`;
				if (desc)
				{
					name += c + `${desc}`;
				}

				if (typeof ido != 'undefined' && ido !== '')
				{
					name = ido + name;
				}
			}

			name = novelFilename.filename(name, {
				skip: '娘志',
				//safe: false,
				})
				.replace(/后(記|宮)/g, '後$1')
				.replace(/“/g, '『')
				.replace(/”/g, '』')

				.replace(/レポート/g, '記事')

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

//			console.log(name, m);

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
