#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const lib_1 = require("../lib");
const update_notifier_1 = require("@yarn-tool/update-notifier");
(0, update_notifier_1.updateNotifier)([__dirname, '..']);
const argv = yargs_1.default
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
    .parseSync();
(0, lib_1.handleGlob)(argv.cwd, argv._, {
    ruleName: argv.ruleName,
});
//# sourceMappingURL=novel-layout-cli.js.map