#!/usr/bin/env node
import { PathLike, FSWatcher, watch as watchFolder } from 'fs';
import { dirname, extname as getExtension, resolve as resolvePath } from 'path';
import Args = require('vamtiger-argv');
import bundleHtml from '..';
import log from '../log';
import { CommandlineArgs, ErrorMessage, FileExtension } from '../types';

const workingDirectory = process.cwd();
const args = new Args();
const relativePath = args.has(CommandlineArgs.relativePath);
const entryFilePath = relativePath && 
    resolvePath(
        workingDirectory,
        args.get(CommandlineArgs.entryFilePath) as string
    )
    ||
    args.get(CommandlineArgs.entryFilePath) as PathLike;
const entryFolderPath = entryFilePath && dirname(entryFilePath as string);
const bundleFilePath = relativePath && 
    resolvePath(
        workingDirectory,
        args.get(CommandlineArgs.bundleFilePath) as string
    )
    ||
    args.get(CommandlineArgs.bundleFilePath) as PathLike;
const copyBundleFilePath = args.get(CommandlineArgs.copyBundleFilePath) as PathLike;
const watch = args.has(CommandlineArgs.watch);
const watchOptions = {
    recursive: true
};
const ts = args.has(CommandlineArgs.ts);
const bundleHtmlParams = {
    entryFilePath,
    bundleFilePath,
    copyBundleFilePath,
    ts
};

if (!entryFilePath) 
    throw new Error(ErrorMessage.noEntryFile);
else if(!bundleFilePath) 
    throw new Error(ErrorMessage.noBundleFile);
else if(watch)
    watchFolder(entryFolderPath, watchOptions, createBundle);
else
    createBundle();

async function createBundle(eventType?: string, fileName?: string) {
    const fileType = fileName && getExtension(fileName)
        .substring(1)
        .toLowerCase();
    const logParams = eventType && fileName && {
        eventType,
        fileName
    };
    const generateHtmlBundle = 
        (!eventType && !fileName)
        ||
        fileType === FileExtension.css;

    if (logParams)
        log(logParams);
    
    if (generateHtmlBundle)
        await bundleHtml(bundleHtmlParams);
}