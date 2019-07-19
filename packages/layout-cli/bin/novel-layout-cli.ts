#!/usr/bin/env node

import yargs = require('yargs');
import { handleGlob } from '../lib';
//import isNpx = require("is-npx");
import PACKAGE_JSON = require('../package.json');
import updateNotifier = require('update-notifier');
import { isNpx } from '@yarn-tool/is-npx';

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
		normalize: true,
		default: process.cwd(),
		requiresArg: true,
	})
	.version()
	.help()
	.argv
;

handleGlob(argv.cwd, argv._);
