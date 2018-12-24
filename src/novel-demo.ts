/**
 * Created by user on 2017/12/8/008.
 */

import * as Promise from 'bluebird';
import * as deepmerge from 'deepmerge-plus';
import * as JsDiff from 'diff';
//import * as execall from 'execall';
//import execall = require('execall2');
import { execall } from 'execall2';
import * as fs from 'fs-extra';

import * as iconv from 'iconv-jschardet';
import * as JSON from 'json5';

import * as novelGlobby from 'node-novel-globby';
import novelInfo, { IMdconfMeta, mdconf_parse } from 'node-novel-info';

import novelText from 'novel-text';
import path from 'upath2';

import * as yargs from 'yargs';
import { array_unique } from '../lib/func';
import { addResourceBundle, i18next, loadLocales, locales_def } from '../lib/i18n';
import { freeGC } from '../lib/util';
import * as projectConfig from '../project.config';
import { load_pattern, make_pattern_md } from './pattern_output';
//import Promise = require('bluebird');
import prettyuse = require('prettyuse');
import { console } from 'debug-color2';

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

myLocalesID = cli.l;
pathMain = (cli.m || 'user').toString();
novelID = (cli.n || '').toString();

if (!novelID)
{
	throw new Error();
}

interface ICache
{
	rename: {},
	block: {},
	block2: {},
	eng: {},
	ja: {},
	ja2: {
		[key: string]: string[],
	},
}

let _cache: ICache = {
	rename: {},
	block: {},
	block2: {},
	eng: {},
	ja: {},
	ja2: {},
};

let cwd = path.join(projectConfig.dist_novel_root, pathMain, novelID);
let cwd_out = path.join(projectConfig.dist_novel_root, `${pathMain}_out`, novelID);

// 利用 i18next 來達到根據小說切換翻譯模板
myLocalesID = myLocalesID || novelID;

let myLocales = loadLocales(myLocalesID);

if (!myLocales)
{
	console.red(`load default demo`);
	myLocales = loadLocales('demo');
}

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

// @ts-ignore
i18next.changeLanguage(myLocales.lang);
// @ts-ignore
i18next.setDefaultNamespace('i18n');

(async () =>
{
	if (cli.patternOnly)
	{
		console.log(`本次僅生成 整合樣式`);
		await create_pattern_md();

		return;
	}

	await make_meta_md();

	let meta: IMdconfMeta;

	if (fs.existsSync(path.join(cwd_out, 'meta.md')))
	{
		meta = await fs.readFile(path.join(cwd_out, 'meta.md'))
			.then(mdconf_parse)
	}
	else if (fs.existsSync(path.join(cwd_out, 'README.md')))
	{
		meta = await fs.readFile(path.join(cwd_out, 'README.md'))
			.then(mdconf_parse)
	}

	meta = deepmerge({
		options: {
			textlayout: {},
		},
	}, meta);

	//console.log(meta.options);

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
		], globby_options)
		.then(ls =>
		{
			if (ls.length)
			{
				return Promise.map(ls, function (file: string)
				{
					return fs.copy(file, path.join(cwd_out, path.relative(globby_options.cwd, file)));
				})
			}
		})
	;

	//console.log(globby_patterns);

	let _last_empty: string[] = [];

	let ls = await Promise
		.mapSeries(novelGlobby
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

					//process.exit();
				}

			}), async function (file, index, len)
		{
			let ext = '.txt';

			let name = path.basename(file, ext);
			let file_dir = path.relative(cwd, path.dirname(file));

			let currentFile = path.join(file_dir, name);

			const _cache_key_ = path.join(file_dir, name);

			const _t_old = await fs.readFile(file);

			if (_t_old.toString() === '')
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

			let _t = novelText.toStr(_t_old);

			_t = my_words(_t);
			_t = novelText.textlayout(_t, meta.options.textlayout || {});
			_t = my_words(_t);

			_t = novelText.replace(_t, {
				words: true,
			});

			_t = novelText.trim(_t);

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

				v = new RegExp(`(\\S{1,2})(@|（·?）|\\\.{2,}|%|￥|#|\\$|（和谐）)(\\S{1,2})`, 'g');
				if ((_m = execall(v, _t)) && _m.length)
				{
					let k = v.toString();
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k] || [];
					_cache.block[_cache_key_][k] = _cache.block[_cache_key_][k].concat(_m);
				}

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

				v = new RegExp(/([^ァ-ヴーｱ-ﾝﾞｰ]{0,3})([ァ-ヴーｱ-ﾝﾞｰ]{2,}(?:[・＝=＝]+[ァ-ヴーｱ-ﾝﾞｰ]+)*)([^ァ-ヴーｱ-ﾝﾞｰ]{0,3})/iug, 'uigm');
				if ((_m = execall(v, _t)) && _m.length)
				{
					(_m as ReturnType<typeof execall>)
						.forEach(function (m)
						{
							let k = m[2];
							_cache.ja2[k] = _cache.ja2[k] || [];
							_cache.ja2[k].push(m[0])
						})
					;
				}

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
				await fs.outputFile(path.join(cwd_out, currentFile) + '.patch', JsDiff.createPatch(name, novelText.toStr(_t_old), _t, {
					newlineIsToken: true,
				}));
			}

			if (_t.replace(/\s+/g, ''))
			{
				//console.log('save', currentFile);
				//await fs.outputFile(path.join(cwd_out, currentFile) + '.txt', novelText.toStr(_t, "\r\n"));
				await fs.outputFile(path.join(cwd_out, currentFile) + '.txt', novelText.toStr(_t, "\n"));
			}

			if (_cache.block[_cache_key_] && !Object.keys(_cache.block[_cache_key_]).length)
			{
				delete _cache.block[_cache_key_];
			}

			console[changed ? 'log' : 'red'](currentFile, index, len);

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

				let out = await cache_output3(_cache.ja, '');
				await fs.outputFile(path.join(cwd_out, 'ja.md'), out);
			}

			if (Object.keys(_cache.ja2).length)
			{
				//console.log(3);

				let out = await cache_output4(_cache.ja2, '');
				await fs.outputFile(path.join(cwd_out, 'ja2.md'), out);
			}

			if (Object.keys(_cache.block2).length)
			{
				//console.log(4);

				let out = await cache_output2(_cache.block2, '待修正屏蔽字');

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
			await create_pattern_md()
		})
		.tap(function ()
		{
			console.debug(prettyuse());
		})
	;

	//console.log(ls);

})();

async function create_pattern_md()
{
	let id = myLocales.__file;

	let data = await make_pattern_md(id);

	if (data && data.md)
	{
		let data_source = load_pattern(id).words_source;

		let md = `__TOC__\n
[${data.novelID.replace(/[\[\]]/g, '\\$&')}](https://github.com/bluelovers/node-novel/blob/master/lib/locales/${encodeURIComponent(data.novelID)}.ts)  
總數：${data.data.length}／${data_source.length}
\n${data.md}\n\n`;

		await fs.outputFile(path.join(cwd_out, '整合樣式.md'), md);
	}
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

function my_words(html): string
{
	html = html.toString();

	let sp = locales_def.sp || '#_@_#';

	let words = [];
	let arr = [];

	words = words.concat(myLocales.words || []);
	arr = arr.concat(myLocales.words_arr || []);

	words = words.concat(locales_def.words || []);
	arr = arr.concat(locales_def.words_arr || []);

	if (!inited)
	{
		inited = true;

		/*
		fs.outputJSON(path.join(__dirname, './temp/words.json'), words, {
			spaces: "\t",
		});
		*/

		//console.log(novelText._words_r1);

		fs.outputFile(path.join(projectConfig.project_root, 'test', './temp/words.json'), JSON.stringify(words, function (k,
			v,
		)
		{
			if (v instanceof RegExp)
			{
				//return `/${v.source}/${v.flags}`;
				return v.toString();
			}
			else if (typeof v == 'function')
			{
				return v.toString();
			}

			return v;
		}, '\t'));
	}

	words = words.concat(myLocales.words || []);
	arr = arr.concat(myLocales.words_arr || []);

	words = novelText._words1(arr, words);
	words = novelText._words2(words);

	let ret = novelText.replace_words(html, words);

	html = ret.value;

	return html;
}

function make_meta_md()
{

	let globby_patterns: string[];
	let globby_options: novelGlobby.IOptions = {
		cwd: cwd,
		useDefaultPatternsExclude: true,
		absolute: true,
	};

	globby_patterns = [
		'**/meta.md',
		'**/README.md',
	];

	{
		[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
	}

	return Promise
		.mapSeries(novelGlobby.globby(globby_patterns, globby_options), async function (file: string, index, len)
		{
			let ext = path.extname(file);

			let name = path.basename(file);
			let file_dir = path.relative(cwd, path.dirname(file));

			await fs.copy(file, path.join(cwd_out, file_dir, name));

			return path.join(file_dir, name);
		})
		.then(async function (ls)
		{
			if (!ls.length
				&& !fs.existsSync(path.join(cwd_out, 'meta.md'))
				&& !fs.existsSync(path.join(cwd_out, 'README.md'))
			)
			{

				let globby_patterns: string[];
				let globby_options: novelGlobby.IOptions = {
					cwd: cwd,
					useDefaultPatternsExclude: true,
					absolute: true,
				};

				globby_patterns = [
					'*.json',
				];

				{
					[globby_patterns, globby_options] = novelGlobby.getOptions(globby_patterns, globby_options);
				}

				let ls = await novelGlobby.globby(globby_patterns, globby_options);

				if (!ls.length)
				{
					return;
				}

				//console.log(ls[0], cwd);

				let data = await fs.readJSON(ls[0]);
				data.data = data.data || {};

				//console.log(data);

				let tags = [
					'node-novel',
				];

				if (ls[0].match(/dmzj/))
				{
					tags.push('dmzj');
				}
				if (ls[0].match(/wenku8/))
				{
					tags.push('wenku8');
				}

				if (ls[0].match(/dist_novel\/([^\/]+)(?:_out)?/))
				{
					tags.push(RegExp.$1);
				}

//			let md = await json2md(data, {
//				tags: tags,
//			});

				let md = novelInfo.stringify({}, data, {
					tags: tags,
				});

				await fs.outputFile(path.join(cwd_out, 'README.md'), md);
			}
		})
		;
}

function cache_output4(_block: ICache["ja2"], title): string
{
	let out =Object.entries(_block)
		.sort(function (a, b)
		{
			// @ts-ignore
			return a[0] - b[0]
		})
		.reduce(function (a, b)
		{
			a.push(`\n## ${b[0]}`);

			a.push('');

			array_unique(b[1])
				.slice(0, 4)
				.forEach(function (s)
				{
					a.push(`- ${stringify(s)}`);
				})
			;

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

function cache_output5(_block, title): string
{
	let out =Object.entries(_block)
		.sort(function (a, b)
		{
			// @ts-ignore
			return a[0] - b[0]
		})
		.reduce(function (a, b)
		{
			a.push(`- ${stringify(b[0])}`);

			//a.push('');

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

function stringify(v)
{
	return JSON.stringify(v).replace(/^"|"$/g, '');
}

