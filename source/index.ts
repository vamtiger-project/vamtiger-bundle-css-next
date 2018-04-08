import { basename as getFileName } from 'path';
import * as XRegExp from 'xregexp';
import getFileData from 'vamtiger-get-file-data';
import createFile from 'vamtiger-create-file';
import copyFile from'vamtiger-copy-file';
import getFileText from 'vamtiger-get-file-text';
import { MainParams as Params, ErrorMessage } from './types';
import { sourceMap as regex, SouceMapMatch as Match } from './regex';

const postcss = require('postcss')
const atImport = require('postcss-import')();
const cssNext = require('postcss-cssnext')();
const cssnano = require('cssnano')({
    autoprefixer: false
});
const apply = require('postcss-apply');
const bundleProcessors = [
    atImport,
    apply,
    cssNext,
    cssnano
];

export default async (params: Params) => {
    const entryFilePath = params.entryFilePath;
    const bundleFilePath = entryFilePath && params.bundleFilePath as string;
    const bundleMapFilePath = `${bundleFilePath}.map`;
    const bundleMapFileRelativePath = getFileName(bundleMapFilePath);
    const copyBundleFilePath = bundleFilePath && params.copyBundleFilePath;
    const copyBundleMapFilePath = copyBundleFilePath && `${copyBundleFilePath}.map`;
    const bundleParams = entryFilePath && {
        from: entryFilePath,
        map: {
            inline: false
        }
    };
    const css = await getFileText(entryFilePath);
    const bundle = await postcss(bundleProcessors)
        .process(css, bundleParams);
    const bundleMatch = XRegExp.exec(bundle.css, regex) as Match;
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    const copyMapFileParams = copyBundleFilePath && {
        source: bundleMapFilePath,
        destination: copyBundleMapFilePath as string
    };
    let result = false;

    if (!entryFilePath) throw new Error(ErrorMessage.noEntryFile);
    else if (!bundleFilePath) throw new Error(ErrorMessage.noBundleFile);

    bundleMatch ?
        await createFile(bundleFilePath, `${bundleMatch.css}${bundleMatch.sourcMapPrefix}${bundleMapFileRelativePath}${bundleMatch.sourcMapSuffix}`)
        :
        await createFile(bundleFilePath, bundle.css);

    await createFile(bundleMapFilePath, bundle.map);

    if (copyFileParams && copyMapFileParams) {
        await copyFile(copyFileParams);
        await copyFile(copyMapFileParams);
    }

    result = true;

    return result;
}