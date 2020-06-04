#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const lib_1 = require("../lib");
const update_notifier_1 = __importDefault(require("@yarn-tool/update-notifier"));
update_notifier_1.default([__dirname, '..']);
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
    .argv;
lib_1.handleGlob(argv.cwd, argv._, {
    ruleName: argv.ruleName,
});
//# sourceMappingURL=novel-layout-cli.js.map