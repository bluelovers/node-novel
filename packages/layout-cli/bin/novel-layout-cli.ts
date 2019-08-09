#!/usr/bin/env node

import yargs = require('yargs');
import { handleGlob } from '../lib';
//import isNpx = require("is-npx");
import PACKAGE_JSON = require('../package.json');
import updateNotifier = require('update-notifier');
import { isNpx } from '@yarn-tool/is-npx';
import { IRuleListKey } from '@node-novel/layout-pattern/lib/rules-keys';

if (!isNpx({
	__dirname,
}))
{
	updateNotifier({
		pkg: PACKAGE_JSON,
	}).notify();
}

const argv = yargs
	.option('cwd', {
		desc: `搜尋檔案的基準資料夾`,
		normalize: true,
		default: process.cwd(),
		requiresArg: true,
	})
	.option('ruleName', {
		desc: `更換使用其他內建樣式集來進行排版`,
		string: true,
		requiresArg: true,
	})
	.version()
	.help()
	.argv
;

handleGlob(argv.cwd, argv._, {
	ruleName: argv.ruleName as any as IRuleListKey,
});
