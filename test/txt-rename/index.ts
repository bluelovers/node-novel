/**
 * Created by user on 2018/3/7/007.
 */

import * as Promise from 'bluebird';
import { cn2tw_min } from 'cjk-conv/lib/zh/convert/min';
import * as crossSpawn from 'cross-spawn';
import * as fs from 'fs-extra';
import globby from 'node-novel-globby/g';
import novelText from 'novel-text';
import { zhRegExp } from 'regexp-cjk';
import * as StrUtil from 'str-util';
import path from 'upath2';
import { win32_move } from '../../lib/fs/move';
import { console, _getLoadLocales, diff_log, replace_name_list } from '../../lib/fs/txt-rename';
import { trimFilename } from '../../lib/func';
import { addResourceBundle, i18next, loadLocales } from '../../lib/i18n';
import * as projectConfig from '../../project.config';
import novelFilename from 'cjk-conv/lib/novel/filename';

let myLocalesID: string;
let pathMain = 'user';
let novelID: string;
let subPath: string = '';

novelID = '天才魔法使與原娼婦新娘';
novelID = 'エルフ転生からのチート建国記';

novelID = '再臨勇者の復讐譚　～失望しました、勇者やめて元魔王と組みます～';

novelID = '物語の中の銀の髪';

novelID = '黒の創造召喚師';

novelID = '乙女ゲームの悪（中略）ヒロインが鬼畜女装野郎だったので、助けて下さい';

novelID = 'カルマの塔';

//novelID = '没落予定なので、鍛治職人を目指す';

//novelID = '誰にでもできる影から助ける魔王討伐';

pathMain = 'dmzj';
novelID = '幻想世界的愛麗絲緹露';

novelID = '29歲單身漢在異世界想自由生活卻事與願違！？';

pathMain = 'user';
novelID = '異世界迷宮の最深部を目指そう';

pathMain = 'syosetu';
novelID = 'ロリータ・ガンバレット　～魔弾幼女の異世界戦記～';

pathMain = 'dmzj';
novelID = '吃掉死神的少女';

//pathMain = 'wenku8';
//novelID = '勇者、或いは化物と呼ばれた少女';

novelID = '蜘蛛ですが、なにか？';

//pathMain = 'zh';
//novelID = '如何在異世界殺死一個死宅';

//subPath = '00010_WEB';

pathMain = 'user';
novelID = '四度目は嫌な死属性魔術師';

pathMain = 'wenku8';
novelID = '不吉波普系列';

pathMain = 'dmzj';
novelID = '不是真正同伴的我被逐出了勇者隊伍，因此決定在邊境過上慢生活';

pathMain = 'wenku8';
novelID = '平凡職業造就世界最強';

//subPath = '01010_WEB';

pathMain = 'user';
novelID = '你這種傢伙別想打贏魔王';

let DEBUG_MODE = true;
//DEBUG_MODE = false;

if (!novelID)
{
	throw new Error();
}

let cwd = path.join(projectConfig.dist_novel_root, pathMain, novelID, subPath);
let cwd_out = path.join(projectConfig.dist_novel_root, `${pathMain}_out`, novelID, subPath);

console.dir({
	cwd,
	cwd_out,

	subPath,

	DEBUG_MODE,
});

({ myLocalesID } = _getLoadLocales(myLocalesID, novelID));

let _zh_num = '一二三四五六七八九十';
let _full_num = '０-９';
let _space = ' 　\\t \\s';

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
//			'\\d{3}',

			//`第[${_zh_num}\\d]+话`,
			//`第[${_zh_num}\\d]+章`,
			//`後記`,
			//`尾聲`,
			//'最终章',

			'\\d+-\\d+',

		].join('|'),
		`)`,
		`[${_space}]*`,
		//`[：~～]*`,
		`([^\\n]*?)`,
		//`[：~～]*`,
		`[${_space}]*`,
		`$`,
	].join(''), 'ig');

	//r = new zhRegExp(`第?\\s*(\\d+)\\s*話\\s*(.+?)?\\s*$`);

//	r = new zhRegExp(`^(\\d{4,}[ _])()(.+)$`);

	//r = new zhRegExp(`^()(\\d{3}) (.+)$`);

	console.log(r);

	if (0)
	{
		let m = r.exec('00960_第87話 奇妙的委託和庭園廣場');

		console.log(m);

		process.exit();
	}

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

			r.lastIndex = 0;

			let m = r.exec(name);

			const c = '　';
			//const c = ' ';
//			const c = ' ';

			if (0 && m)
			{
				let id_str: string;

				let [src, ido, id, desc] = m;

				//console.log(m);

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
					if (1)
					{
						desc = novelFilename.filename(desc, {
								skip: '娘志里卷發處說氣圍',
								//safe: false,
							})
							.replace(/“/g, '『')
							.replace(/”/g, '』')
						;

						desc = replace_name_list().reduce(function (name, data)
						{
							// @ts-ignore
							return name.replace(...data);
						}, desc)
						;
					}

					name += c + `${desc}`;
				}

				if (typeof ido != 'undefined' && ido !== '')
				{
					name = ido + name;
				}
			}
			else if (0 && m)
			{
				let [src, ido, id, desc] = m;

				id = StrUtil.toFullNumber(id);

				name = `${id}`;

				let c = '　';

				if (desc)
				{
					name += c + `${desc}`;
				}
			}
			else if (0 && m)
			{
				let [src, ido, id, desc] = m;

				//id = StrUtil.toFullNumber(id);

				name = ido + `${id}`;

				//console.log(m);

				let c = '　';

				if (desc)
				{
					name += c + `${desc}`;
				}
			}
			else if (0 && m)
			{
				console.debug(m);
			}

//			name = (index + 2)
//				.toString()
//				.padStart(4, '0')
//				+ '0'
//				+ '_'
//				+ name
//			;

			if (1)
			{
				name = novelFilename.filename(name, {
						skip: '娘志里卷發處說氣圍藏經廳輕碎',
						//safe: false,
					})
					.replace(/“/g, '『')
					.replace(/”/g, '』')
				;

				name = replace_name_list().reduce(function (name, data)
				{
					// @ts-ignore
					return name.replace(...data);
				}, name)
				;
			}

			name = novelText.trim(name, {
				trim: true,
			});

			name = trimFilename(name);

			name = cn2tw_min(name);

//			console.log(name, m);

			if (name_old != name)
			{
				let name_new = path.join(file_dir, name + ext);

				if (!DEBUG_MODE)
				{
					let e1 = fs.pathExistsSync(file);
					let e2 = fs.pathExistsSync(name_new);

					if (file != name_new)
					{
						if (e1 || e2)
						{
							await crossSpawn.sync('git', [
								'mv',
								'-f',
								'-v',
								file,
								name_new,
							], {
								cwd,
								stdio: 'inherit',
							});

							e1 = fs.pathExistsSync(file);
							e2 = fs.pathExistsSync(name_new);
						}

						if (e2 && !e1)
						{

						}
						else if (e1)
						{
							await win32_move(file, name_new, {
								overwrite: false,
							});
						}
					}

					{
						let base1 = path.relative(cwd, file);
						let base2 = path.relative(cwd, name_new);

						let from = path.join(cwd_out, base1);
						let to = path.join(cwd_out, base2);

						if (fs.pathExistsSync(cwd_out) && from != to)
						{
							let e1 = fs.pathExistsSync(from);
							let e2 = fs.pathExistsSync(to);

							if (e1 || e2)
							{
								await crossSpawn.sync('git', [
									'mv',
									'-f',
									'-v',
									from,
									to,
								], {
									cwd: cwd_out,
									stdio: 'inherit',
								});

								e1 = fs.pathExistsSync(from);
								e2 = fs.pathExistsSync(to);
							}

							if (e2 && !e1)
							{

							}
							else if (e1)
							{
								await win32_move(from, to, {
									overwrite: false,
								});
							}
						}
					}
				}

				console.log(`${index}, "${name_old}"`);
				console.log(`=>`, diff_log(name_old, name));
			}
			else
			{
				await console.red(`${index}, skip`, name_old);
			}
		})
	;

})();

