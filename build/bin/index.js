#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const Args = require("vamtiger-argv");
const __1 = require("..");
const log_1 = require("../log");
const types_1 = require("../types");
const workingDirectory = process.cwd();
const args = new Args();
const relativePath = args.has(types_1.CommandlineArgs.relativePath);
const entryFilePath = relativePath &&
    path_1.resolve(workingDirectory, args.get(types_1.CommandlineArgs.entryFilePath))
    ||
        args.get(types_1.CommandlineArgs.entryFilePath);
const entryFolderPath = entryFilePath && path_1.dirname(entryFilePath);
const bundleFilePath = relativePath &&
    path_1.resolve(workingDirectory, args.get(types_1.CommandlineArgs.bundleFilePath))
    ||
        args.get(types_1.CommandlineArgs.bundleFilePath);
const copyBundleFilePath = args.get(types_1.CommandlineArgs.copyBundleFilePath);
const watch = args.has(types_1.CommandlineArgs.watch);
const watchOptions = {
    recursive: true
};
const bundleHtmlParams = {
    entryFilePath,
    bundleFilePath,
    copyBundleFilePath
};
if (!entryFilePath)
    throw new Error(types_1.ErrorMessage.noEntryFile);
else if (!bundleFilePath)
    throw new Error(types_1.ErrorMessage.noBundleFile);
else if (watch)
    fs_1.watch(entryFolderPath, watchOptions, createBundle);
else
    createBundle();
function createBundle(eventType, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileType = fileName && path_1.extname(fileName)
            .substring(1)
            .toLowerCase();
        const logParams = eventType && fileName && {
            eventType,
            fileName
        };
        const generateHtmlBundle = (!eventType && !fileName)
            ||
                fileType === types_1.FileExtension.css;
        if (logParams)
            log_1.default(logParams);
        if (generateHtmlBundle)
            yield __1.default(bundleHtmlParams);
    });
}
//# sourceMappingURL=index.js.map