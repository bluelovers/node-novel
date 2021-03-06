/**
 * Created by user on 2017/12/8/008.
 */

import Bluebird from 'bluebird';
import prettyuse = require('prettyuse');
import { execall } from 'execall2';
import fs from 'fs-extra';
import { lazyAnalyzeReportAll, lazyAnalyzeAll } from '@node-novel/layout-reporter';

import iconv from 'iconv-jschardet';

import * as novelGlobby from 'node-novel-globby';
//import novelText from 'novel-text';
import novelText from '@node-novel/layout';
import path from 'upath2';

import yargs from 'yargs';
import { array_unique } from '../lib/func';
import { loadLocales, locales_def } from '../lib/i18n';
import { freeGC } from '../lib/util';
import * as projectConfig from '../project.config';
import { console } from 'debug-color2';
import { IStyles, IStylesColorNames } from 'debug-color2/lib/styles';
import { diffPatch, fsReadFile, getCwdPaths, getNovelMeta, handleContext, isEmptyFile, stringify } from './core';
import { cache_output4, create_pattern_md, ICache, make_meta_md } from './cache';
import { getLocales } from './util';
import { outputBlock002, outputJa001 } from '@node-novel/layout-reporter/lib/md';
import { gitDiffStagedFile } from '../lib/git';
import { fixGlobBug } from '../bin/lib/util';
import { defaultPatternsExclude } from 'node-novel-globby/lib/options';

console.enabledColor = true;

const DEBUG = true;

let cli = yargs
	.argv
;

console.log(cli);

let myLocalesID: string;
let pathMain: string;
let novelID: string;

if (cli.m == 'undefined')
{
	cli.m = undefined;
}
if (cli.n == 'undefined')
{
	cli.n = undefined;
}
if (cli.l == 'undefined')
{
	cli.l = undefined;
}

// @ts-ignore
myLocalesID = cli.l;
pathMain = (cli.m || 'user').toString();
novelID = (cli.n || '').toString();

if (!novelID)
{
	throw new Error();
}

let _cache: ICache = {
	rename: {},
	block: {},
	block2: {},
	eng: {},
	ja: {},
	ja2: {},
};

let { cwd, cwd_out } = getCwdPaths(pathMain, novelID, projectConfig);

let myLocales: ReturnType<typeof loadLocales>;

({ myLocales, myLocalesID, novelID } = getLocales(myLocalesID, novelID));

(async () =>
{
	if (cli.patternOnly)
	{
		console.log(`本次僅生成 整合樣式`);
		await create_pattern_md(myLocales, cwd_out);

		return;
	}

	await make_meta_md(cwd, cwd_out);

	let meta = getNovelMeta([
		cwd_out,
	]);

	const TXT_PATH = cwd;

	let globby_patterns: string[];
	let globby_options: novelGlobby.IOptions = {
		cwd: TXT_PATH,
		useDefaultPatternsExclude: true,
		absolute: true,
	};

	{
		[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
	}

	await novelGlobby.globby([
			'cover.*',
			'**/ATTACH.md',
		], globby_options)
		.then(ls =>
		{
			if (ls.length)
			{
				return Bluebird.map(ls, function (file: string)
				{
					return fs.copy(file, path.join(cwd_out, path.relative(globby_options.cwd, file)));
				})
			}
		})
	;

	//console.log(globby_patterns);

	let _last_empty: string[] = [];

	let _stat = {
		updated: 0,
		added: 0,
		empty: 0,
		files: 0,
		total: 0,
	};

	let _ls_ = await Bluebird.resolve()
		.then(async () => {

			if (cli.diff)
			{
				let cwd_path = globby_options.cwd;

				let files = gitDiffStagedFile(cwd_path);

				let ls2 = fixGlobBug(files, {
					cwd: cwd_path,
					exclude: [
						...defaultPatternsExclude,
						'!**/*.md',
						'!*.md',
					]
				});

				return ls2.map(v => path.resolve(cwd_path, v))
			}

			return novelGlobby
				.globbyASync(globby_patterns, globby_options)
				.tap(async function (ls)
				{
					if (DEBUG)
					{
						await fs.writeJSON(path.join(projectConfig.temp_root, 'log.1.json'), ls, {
							spaces: "\t",
						});
					}
				})
				.then(novelGlobby.returnGlobList)
				.tap(async function (ls)
				{
					//console.log(globby_patterns, globby_options);

					if (DEBUG)
					{
						ls = ls.map(function (p)
						{
							return path.relative(TXT_PATH, p);
						});

						await fs.writeFile(path.join(projectConfig.temp_root, 'log.2.txt'), ls.join("\n"));
					}

					_stat.total = ls.length;

				})
		})
	;

	let ls = await Bluebird
		.mapSeries(_ls_, async function (file, index, len)
		{
			let ext = '.txt';

			let name = path.basename(file, ext);
			let file_dir = path.relative(cwd, path.dirname(file));

			let currentFile = path.join(file_dir, name);

			const _cache_key_ = path.join(file_dir, name);

			const { _t_old, _cb_ret } = await fsReadFile(file, (_t_old) => {

				if (isEmptyFile(_t_old))
				{
					_last_empty.push(currentFile);

					//console.gray(currentFile, '此檔案無內容');

					return currentFile;
				}
				else
				{
					if (_last_empty.length)
					{
						_last_empty
							.forEach(function (currentFile)
							{
								console.red(currentFile, '此檔案無內容');
							})
						;

						_last_empty = [];
					}

					let chk = iconv.detect(_t_old);

					if (chk.encoding != 'UTF-8' && chk.encoding != 'ascii')
					{
						console.red(currentFile, '此檔案可能不是 UTF8 請檢查編碼或利用 MadEdit 等工具轉換', chk);
					}
				}

			});

			if (_cb_ret)
			{
				_stat.empty++;

				return _cb_ret
			}

			let _t: string;

			({ _t, inited } = handleContext({ _t_old, inited, meta, myLocales }));

			{
				/**
				 * 檢測容易產生錯誤的文字
				 */

				_cache.block[_cache_key_] = {};

				/*
				[]
					.concat(myLocales.words_maybe || [])
					.concat(locales_def.words_maybe || [])
					.map(function (v)
					{
						if (typeof v == 'string')
						{
							return new RegExp('(.{1,3})?(' + v + ')(.{1,3})?', 'gi');
						}

						return v;
					})
					.forEach(function (v, index)
					{
						let _m;
						if ((_m = execall(v, _t)) && _m.length)
						{
							//_cache.block[_cache_key_] = _cache.block[_cache_key_].concat(_m);

							_cache.block[_cache_key_][v] = _cache.block[_cache_key_][v] || [];

							_cache.block[_cache_key_][v] = _cache.block[_cache_key_][v].concat(_m);

							//console.log(v);
						}
					})
				;
				*/

				_cache.block[_cache_key_] = chk_words_maybe(_t, []
					.concat(myLocales.words_maybe || [])
					.concat(locales_def.words_maybe || []),
					_cache.block[_cache_key_] = {},
				)
					.cache
				;

				let _m;
				let v: RegExp;

				/*
				v = /(\S{1,2}(?![\?\*]))?(\?{3,}(?:[\s\?]+[\?])?|\S\*S|\*{2,})((?![\?\*])\S{1,2})?/g;
				if ((_m = execall(v, _t)) && _m.length)
				{


					//_cache.block[_cache_key_] = _cache.block[_cache_key_].concat(_m);

					let k = v.toString();
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k] || [];
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k].concat(_m);

					//await console.error(name, _m);
				}
				*/

				//v = /([^\w]{1,3})?((?:\d*[a-z]+\w*)[ 　\w・\.\'\"\:\-\+\=]*)([^\w]{1,3})?/ig;

				const EN_REGEXP2 = /\u0100-\u017F\u0400-\u04FF\u00A1-\u00FF\u0370-\u03FF/.source;

				v = new RegExp([
					`([^\\w]{1,3})?`,

					`(`,
					[
						`(?:\\d*[a-z${EN_REGEXP2}]+[\\w${EN_REGEXP2}]*)[ 　\\w${EN_REGEXP2}・\\.\\'\\"\\:\\-\\+\\=]*`,
					].join('|'),
					`)`,

					`([^\\w]{1,3})`,
				].join(''), 'ig');

				if ((_m = execall(v, _t)) && _m.length)
				{
					let k = v.toString();

					if (_cache.eng[_cache_key_])
					{
						_cache.eng[_cache_key_] = _cache.eng[_cache_key_].concat(_m);
					}
					else
					{
						_cache.eng[_cache_key_] = _m;
					}
				}

				lazyAnalyzeAll({
					input: _t,
					_cache,
					_cache_key_,
				});

				/*
				v = /([^\n\*]{0,3})?([^\n\*]\*{2,}[^\n\*])([^\n\*]{0,3})?/ig;
				if ((_m = execall(v, _t)) && _m.length)
				{
					let k = v.toString();

					if (_cache.block2[_cache_key_])
					{
						_cache.block2[_cache_key_] = _cache.block2[_cache_key_].concat(_m);
					}
					else
					{
						_cache.block2[_cache_key_] = _m;
					}
				}

				 */

				v = new RegExp(`(\\S{1,2})(@|（·?）|\\\.{2,}|%|￥|#|\\$|（和谐）)(\\S{1,2})`, 'g');
				if ((_m = execall(v, _t)) && _m.length)
				{
					let k = v.toString();
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k] || [];
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k].concat(_m);
				}

				/*
				v = new RegExp(`^[^\\nぁ-んァ-ヴーｱ-ﾝﾞ]*?([『「]*[ぁ-んァ-ヴーｱ-ﾝﾞｰ]{2,}[」』]*(?:[『「？、…。＋０-９Ａ-Ｚａ-ｚ（）！]*[ぁ-んァ-ヴーｱ-ﾝﾞｰ]*[」』]*)*)[^\\n]*?$`, 'uigm');
				if ((_m = execall(v, _t)) && _m.length)
				{
					let k = v.toString();

					_m = _m
						.map(function (m, index)
						{
							m.order = index;

							return m;
						})
						.sort(function (a, b)
						{
							return 0 - (a.sub[0].length - b.sub[0].length);
						})
						.filter(function (m)
						{
							//console.log(m);

							return (m.sub[1] != 'の' && m.sub[0].length >= 2);
						})
						.slice(0, 5)
						.sort(function (a, b)
						{
							return a.order - b.order;
						})
					;

					if (_m.length)
					{
						if (_cache.ja[_cache_key_])
						{
							_cache.ja[_cache_key_] = _cache.ja[_cache_key_].concat(_m);
						}
						else
						{
							_cache.ja[_cache_key_] = _m;
						}
					}
				}

				v = new RegExp(/(?<![ァ-ヴーｱ-ﾝﾞｰ])([ァ-ヴーｱ-ﾝﾞｰ]{2,}(?:[・＝=＝]+[ァ-ヴーｱ-ﾝﾞｰ]+)*)(?![ァ-ヴーｱ-ﾝﾞｰ])/iug, 'uig');
				if ((_m = execall(v, _t, {
					leftContext: true,
					rightContext: true,
				})) && _m.length)
				{
					(_m as ReturnType<typeof execall>)
						.forEach(function (m)
						{
							let k = m[1];

							_cache.ja2[k] = _cache.ja2[k] || [];

							let line = [
									m.leftContext
										.split('\n')
										.pop(),
									k,
									m.rightContext
										.split('\n')
										.shift(),
								].join('')
								.replace(/^\s+|\s+$/g, '')
							;

							_cache.ja2[k].push(line)
						})
					;
				}

				 */

			}

			if (typeof myLocales.words_callback == 'function')
			{
				_t = myLocales.words_callback(_t);
			}

			if (typeof locales_def.words_callback == 'function')
			{
				_t = locales_def.words_callback(_t);
			}

			_t = novelText.toStr(_t);

			let changed = _t != novelText.toStr(_t_old, {
				allow_nbsp: true,
				allow_bom: true,
			});

			if (0 && changed)
			{
				// 不再生成 .patch 檔案
				await fs.outputFile(path.join(cwd_out, currentFile) + '.patch', diffPatch(name, _t_old, _t));
			}

			let _updated = false;
			let _added = false;

			if (_t.replace(/\s+/g, ''))
			{
				let _out_file = path.join(cwd_out, currentFile) + '.txt';

				let buf_out = Buffer.from(novelText.toStr(_t, "\n"));
				let buf_out_old = await fs.readFile(_out_file)
					.catch(e => null)
				;

				if (!buf_out_old || !buf_out.equals(buf_out_old))
				{
					_updated = true;

					if (!buf_out_old)
					{
						_added = true;
						_stat.added++;
					}
					else
					{
						_stat.updated++;
					}

					await fs.outputFile(_out_file, novelText.toStr(_t, "\n"));
				}
			}

			if (_cache.block[_cache_key_] && !Object.keys(_cache.block[_cache_key_]).length)
			{
				delete _cache.block[_cache_key_];
			}

			let color: keyof typeof console | IStylesColorNames = 'log';

			if (_added)
			{
				color = 'yellow';
			}
			else if (_updated)
			{
				color = 'success';
			}
			else if (!changed)
			{
				color = 'red';
			}

			_stat.files++;

			console[color](currentFile, index, len);

			console.debug(prettyuse());
			freeGC();

			return currentFile;

			//return rename(file, index, len);
		})
		.then(function (ls)
		{
			if (_last_empty.length)
			{
				_last_empty
					.forEach(function (currentFile)
					{
						console.grey(currentFile, '此檔案無內容');
					})
				;

				_last_empty = [];
			}

			//console.log(-1);

			return ls;
		})
		.tap(async function (ls)
		{
			if (cli.diff)
			{
				return;
			}

			//console.log(0);

			if (Object.keys(_cache.block).length)
			{
				//console.log(1);

				let md = await cache_output1(_cache.block, '待確認文字');

				await fs.outputFile(path.join(cwd_out, '待確認文字.md'), md);
			}

			if (Object.keys(_cache.eng).length)
			{
				//console.log(2);

				let out = await cache_output2(_cache.eng, 'English');

				await fs.outputFile(path.join(cwd_out, '英語.md'), out);
			}

			if (Object.keys(_cache.ja).length)
			{
				//console.log(3);

				let out = await cache_output3(_cache.ja, '含有日文的章節段落');
				await fs.outputFile(path.join(cwd_out, 'ja.md'), out);
			}

			if (Object.keys(_cache.ja2).length)
			{
				//console.log(3);

				let out = await cache_output4(_cache.ja2, '未加入整合的日文');
				await fs.outputFile(path.join(cwd_out, 'ja2.md'), out);
			}

			if (Object.keys(_cache.block2).length)
			{
				//console.log(4);

				let out = await cache_output22(_cache.block2, '待修正屏蔽字');

				await fs.outputFile(path.join(cwd_out, '待修正屏蔽字.md'), out);
			}
			else
			{
				//console.log(5);

				//await fs.remove(path.join(cwd_out, '待修正屏蔽字.md'));
				await fs.outputFile(path.join(cwd_out, '待修正屏蔽字.md'), '');
			}
		})
		.tap(async function ()
		{
			await create_pattern_md(myLocales, cwd_out);
		})
		.tap(function ()
		{
			console.dir(_stat);

			console.debug(prettyuse());
		})
	;

	//console.log(ls);

})();

function cache_output22(_block, title)
{
	return outputBlock002({
		inputData: _block,
		title,
	})
}

function cache_output1(_block, title): string
{
	let md = Object.keys(_block)
		.reduce(function (a, file)
		{
			let values = _block[file];

			a.push(``);
			a.push(`## ${file}`);
			a.push(``);

			let ret = Object.keys(values)
				.reduce(function (a, r)
				{
					let ms = values[r];

					//console.log(r);

					a.push(`### ${stringify(r)}`);
					a.push(``);

					let ret = ms.reduce(function (a, m)
					{

						a.push(`- ${stringify(m.match)}`);

						return a;
					}, []);

					a = a.concat(ret);

					a.push(``);
					//a.push(``);

					return a;
				}, []);

			a = a.concat(ret);

			a.push(``);
			//a.push(``);

			return a;
		}, [
			`# ${title}`,
			'',
			'[TOC]',
		])
		.join("\n")
		.replace(/\n{3,}/g, '\n\n\n')
		.replace(/^\n+|\n+$/g, '')
		+ "\n";
	;

	return md;
}

function cache_output2(_block, title): string
{
	let _fillter_1 = array_unique([
		'cg',
		'ok',
		'rpg',
		'play',
		'max',
		'cosplay',
		'cos',
		'loli',
		'golem',
		'xl',
		'lv',
		'ice',
		'boss',
		'xdd',
		'xd',
		'vs',
		'party',
		'fate',
		'hentai',
		'shadow', 'gate',
		'high',
		'monster',
		'player',
		'killer',
		'kill',
		'solo',
		'gl',
		'gay',
		'by',
		'black', 'box',
		'power',
		'wall',
		'auto',
		'angel',
		'unlock',
		'skill',
		'cm',
		'mode',
		'ku',
		'flag',
		'tm',
		'no',
		'lucky',
		'luck',
		'kiss',
		'elf',
		'level',
		'cool',
		'buff',
		'magic', 'item',
		'bad', 'status',
		'summon',

		'lz',
		'extra',
		'life',
		'heal',
		'the',
		'reply',
		'dark',
		'healer',
		'evil',
		'chaos',
		'debuff',
		'go',
		'show',
		'call',
		'full',
		'ai',
		'orz',
		'here',
		'spell', 'book',
		'undead',
		'dead',
		'silver',
		'bgm',
		'nice',
		'in',
		'potion',
		'yes',
		'ps',
		'party', 'member',
		'over', 'live',
		'all',
		'up',
		'rank',
		'open',
		'sorry',
		'my', 'lord',
		'princess',
		'pro',
		'items',
		'priest',
		'last', 'rose',
		'nightmare',
		'elemental',
		'sf',
		'sex',
		'berserker',
		'pose',
		'poi',
		'eye',
		'go', 'away',
		'you',
		'shit',
		'holy',
		'ng',
		'hey',
		'fight',
		'mpk',
		'maybe',
		'sir',
		'wait',
		'allright',
		'right',
		'wait',
		'original',
		'ntr',
		'tnt',
		'arena',
		'hound',
		'order', 'made',
		'monks',
		'monk',
		'and',
		'full',
		'boost',
		'shadow', 'space',
		'enemy',
		'desu',
		'morning', 'call',
		'super',
		'ice', 'zero', 'field',
		'world',
		'fall',
		'face',
		'fulu',
		'kyu',
		'sama',
		'right', 'hand',
		'mp',
		'sp',
		'hp',
		'exp',
		'xp',
		'dp',
		'desu',
		'oak',
		'gun',
		'fire',
		'ball',
		'ice', 'shield',
		'fuck',
		'ogc',
		'boom',
		'charge',
		'guard',
		'break',
		'angel', 'ring',

		'states',
		'cure',
		'fantasy',
		'game',
		'kg',
		'jpg',
		'pet',

		'nico',
		'qaq',
		'case',
		'sm',
		'km',
		'knight',
		'web',
		'bad', 'end',
		'ky',
		'wyvern',
		'get',
		'aoe',
		'ing',
		'bug',
		'event',
		'love',
		'ha',
		'hard',
		'oh',
		'str',
		'vit',
		'agi',
		'dex',
		'pow',
		'oh',
		'fps',
		'stop',
		'new',
		'ya',
		'full', 'burst',
		'come', 'on',
		'welcome',
		'steam',
		'mad',
		'clover',
		'cyberpunk',
		'skype',
		'go', 'back', 'home',
		'san',
		'please',
		'stop',
		'hurry', 'up',
		'out',
		'steam',
		'vr',
		'menu',
		'plan',
		'safe',
		'ex',
		'ooxx',
		'xxoo',
		'sorry',
		'double',
		'jojo',
		'pass',
		'bt',
		'trpg',

		'or',
		'id',
		'mother',
		'doctor',
		'or',
		'origin',

		'gps',
		'king',

		'sns',

		'dungeon',
		'earth',
		'ghost',
		'iron',

		'bbq',

		'cd',
		'km',

		'numbers',
		'hit',
		'am',
		'3rd',
		'body',
		'follower',
		'children',
		'2nd',
		'1st',
		'named',
		'tpo',
		'place',
		'fashion',

		'mission', 'complete',
		'vip',
		'byebye',
		'bye',
		're',
		'time',

		'wind', 'dance',

		'master',

		'knight',
		'tree',
		'top',
		'miss',
		'yaho',
		'water', 'doll',

		'no', 'sound',
		'guardian',
		'sword',
		'wind',
		'elemental',

		'ko',
		'continue',

		'dragon',
		'cloud',
		'arrow',
		'enchanted',
		'slayer',
		'god',
		'hot',
		'poison',

		'neta',

		'test',

		'living', 'dead',
		'yeah',
		'mvp',
		'heal',
		'lich',
		'zombie', 'soldier',
		'general',
		'demon', 'land',
		'vampire',
		'ultra', 'red',
		'flame',
		'stone',
		'heal',
		'no', 'touch', 'blue', 'light',

		'second', 'runner',
		'arc',
		'wind', 'air', 'bind',
		'hyper',
		'change',
		'guild', 'master',
		'sleep',
		'girl',
		'clear',
		'triple', 'master',
		'ring',
		'alright',
		'royal',
		'diviner',
		'mix',
		'bind',
		'giant', 'man',
		'explosion',
		'quadruple', 'master',
		'gold',

		'rock',
		'succubus',
		'real',

		'we', 'are',
		'hero',
		'boot',
		'nb',
		'girls', 'talk',
		'pain',
		'eye', 'contact',
		'kong',
		'buster',

		'dive', 'to', 'game',

		'pc',
		'npc',
		'hdd',
		'hard', 'disk', 'drive',
		'administrator',
		'admin',
		'first', 'skill',
		'third',
		'fin',
		'rpg',
		'element',
		'queen',
		'white',
		'fire', 'bird',
		'or',
		'mmo',
		'cp',
		'star', 'player',
		'command',
		'normal',
		'unique',
		'legend',
		'gal',
		'tv',
		'love', 'prison',
		'special', 'end',
		'item', 'file',
		'level',
		'neet',
		'big', 'eye',
		'snow', 'kiss',
		'jack',
		'milk',
		'rpg-7',
		'rpg-29',
		'sand', 'wolf',
		'final', 'judgement',
		'kozi',
		'maker',
		'an',
		'curse', 'tool',
		'skeleton',
		'living', 'bone',
		'beast',
		'archer',
		'zombie', 'warrior',
		'bravers',
		'off',
		'ice', 'circle',
		'okay',
		'pk',
		'kitty',
		'leader',
		'come', 'on', 'boy',
		'mana',
		'when',
		'dragon', 'tail',
		'rune',
		'card',
		'start',
		'fx',
		'boyfriend',
		'boy',
		'friend',
		'happy',
		'mr',
		'is', 'justice',
		'don\'t', 'touch',
		'nice',
		'fan',
		'google',
		'number',
		'wiki',
		'speed',
		'dt',
		'led',
		'ps3',
		'ps2',
		'so',
		'good', 'job',
		'bl',
		'rmb',
		'city',
		'sos',
		'holiday',
		'out', 'of',
		'ptsd',
		'one', 'man', 'play',
		'ova',
		'ancient', 'dragon',

		'online',
		'close',
		'spa',
		'class',
		'1v1',
		'quest',
		'doll',
		'bra',
		'get',
		'green',
		'pink',
		'yellow',
		'purple',
		'rabbit',
		'alive', 'or',
		'sexy',
		'thank', 'you',
		'iris',
		'key',
		'eye', 'of', 'the', 'sun',
		'xv',
		'raid',
		'flower', 'star',
		'myhome',
		'pos',
		'pv',
		'two',
		'three',
		'baby',
		'view',
		'finish',
		'marry', 'gift',
		'real', 'time', 'arpg',
		'cloth', 'out', 'saber',
		'ep',
		'dark', 'soul',
		'storm',
		'body', 'line',
		'spider', 'girl',
		'may',
		'mayday',
		'marvel',

		'easy',
		'body', 'blow',
		'perfect',
		'stylish',
		'faction',
		'monter',
		'name',
		'´・ω',
		'http',
		'html',
		'´', 'ω',
		'enter',
		'tb',
		'ver',
		'pig',
		'otz',
		'pm',
		'pvp',
		'style',
		'goodjob',
		'https',
		'en',
		'ja',
		'url',
		'girl\'s', 'talk',
		'badend',
		'ending',
		'cooking',

		'ready',
		'chance',

		'win',
		'mag',
		'size',

		'empty',
		'if',
		'reaper',
		'ol',
		'help',
		'pet', 'system',
		'default',
		'drop',
		'will',
		'overlord',
		'perfect', 'sister',
		'poker', 'face',
		'ace',
		'remove',
		'zone',
		'area',
		'simple', 'is', 'the', 'best',
		'main',
		'room',

		'character',
		'made', 'in', 'japan',
		'spy',
		'email',

	]);

	function _fillter_2(key: string)
	{
		return /^(ku|fu|no|hu|ki|gi|ka|em+|nico|um+|ok|pa|kyu+|ha+|ma+|kya+|yaho+|heal|sa+|gya+|hei+|ho+|ta|shi*|[bd]oo+m|wo+|ao+|ga+|hi+|poi|mu|kunu|yo+|no+|goo+d|go+|§)+$/i.test(key)
			|| /^(\w)\1*$/i.test(key)
			|| /^\d+$/i.test(key)
			|| /^(\d+(?:lv|km|kg|m|mm|[hsm]p|x+|p|no|\+|[a-z]|level)|(?:lv|km|kg|m|mm|[hsm]p|x+|p|no|\+|[a-z]|level)\d+)$/.test(key)
			|| _fillter_1.includes(key)
			;
	}

	_block = Object.keys(_block)
		.reduce(function (a, b)
		{
			let cache_ab = a[b] || {};

			//a[b] = a[b] || {};

			for (let m of _block[b])
			{
				if (!m.match)
				{
					continue;
				}

				let key: string = m.sub[1]
					.replace(/^[ 　・\.\'\"\:\-\+\=]+|[ 　・\.\'\"\:\-\+\=]+$/g, '')
					.toLowerCase()

				;

				if (
					_fillter_2(key)
					|| key.split(/[\s・\.　\-]+/).every(v => _fillter_1.includes(v) || _fillter_2(v))
				)
				{
					continue;
				}

				if (/^\d+(?:\.\d+)?$|^([a-z])\1+$/i.test(key) || key.length == 1)
				{
					continue;
				}

				cache_ab[key] = cache_ab[key] || [];

				cache_ab[key].push(m.match);
			}

			let bool: boolean;

			for (let m in cache_ab)
			{
				cache_ab[m].sort();
				bool = true;
			}

			if (bool)
			{
				a[b] = cache_ab;
			}

			return a;
		}, {})
	;

	let out = Object.keys(_block)
		.reduce(function (a, b)
		{
			a.push(`\n## ${b}`);

			for (let k in _block[b])
			{
				a.push(`\n### ${stringify(k)}\n`);

				for (let m of _block[b][k])
				{
					a.push(`- ${stringify(m)}`);
				}
			}

			a.push('');

			return a;
		}, [
			`# ${title}`,
			'',
			'[TOC]',
		])
		.join("\n")
	;

	return out;
}

function cache_output3(_block, title): string
{
	let out = outputJa001({
		inputData: _block,
		title,
	});

	/*
	let out = Object.keys(_block)
		.reduce(function (a, b)
		{
			a.push(`\n## ${b}`);

			a.push('');

			for (let m of _block[b])
			{
				a.push(`- ${stringify(m.match)}`);
			}

			a.push('');

			return a;
		}, [
			`# ${title}`,
			'',
			'[TOC]',
		])
		.join("\n")
	;
	 */

	return out;
}

function chk_words_maybe(text, list, cache = {})
{
	let ls = []
		.concat(list || [])
		.map(function (v)
		{
			let ret = {
				m: null,
				not: null,
				and: null,
			};

			if (typeof v == 'string')
			{
				ret.m = v;
			}
			else if (v instanceof RegExp)
			{
				ret.m = v;
			}
			else if (Array.isArray(v))
			{
				ret.m = v[0];

				ret.not = v[1];
				ret.and = v[2];

				//console.log(ret);
			}
			else if (v.m)
			{
				Object.assign(ret, v);
			}
			else
			{
				return null;
			}

			if (typeof ret.m == 'string')
			{
				ret.m = new RegExp('(.{1,3})?(' + ret.m + ')(.{1,3})?', 'gi');
			}

			return ret;
		})
		.filter(v => v && v.m)
		.forEach(function (v, index)
		{
			let _m;
			if ((_m = execall(v.m, text)) && _m.length)
			{
				//_cache.block[_cache_key_] = _cache.block[_cache_key_].concat(_m);

				if (v.not || v.and)
				{
					_m = _m.filter(function (m: {
						match: string,
						sub: string[],
						index: number,
					})
					{
						if (v.not && v.not.test(m.match))
						{
							return false;
						}

						if (v.and && !v.and.test(m.match))
						{
							return false;
						}

						return true;
					});
				}

				if (_m.length)
				{
					cache[v.m] = cache[v.m] || [];
					cache[v.m] = cache[v.m].concat(_m);
				}

				//console.log(v);
			}
		})
	;

	return {
		list: ls,
		cache: cache,
	};
}

let inited = false;

