#!/usr/bin/env node

import yargs = require('yargs');
import { handleGlob } from '../lib';
import isNpx = require("is-npx");
import PACKAGE_JSON = require('../package.json');
import updateNotifier = require('update-notifier');

if (!isNpx() && !__dirname.includes('_npx'))
{
	updateNotifier({
		pkg: PACKAGE_JSON,
	}).notify();
}

const argv = yargs
	.version()
	.help()
	.argv
;

handleGlob(process.cwd(), argv._);
