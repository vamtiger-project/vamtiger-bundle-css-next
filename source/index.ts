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
    const { ts, entryFilePath, bundleFilePath } = params;
    const bundleMapFilePath = `${bundleFilePath}.map`;
    const bundleTsFilePath = ts && `${(bundleFilePath as string).replace(/css$/, 'ts')}`;
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
    const bundleCss = bundleMatch && `${bundleMatch.css}${bundleMatch.sourcMapPrefix}${bundleMapFileRelativePath}${bundleMatch.sourcMapSuffix}`
        || bundle.css;
    const bundleTs = bundleTsFilePath && `export default \`${bundleCss}\`;`;
    const bundleText = bundleTs && bundleTs
        || bundleCss
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

    await Promise.all([
        createFile(bundleFilePath, bundleText),
        createFile(bundleMapFilePath, bundle.map),
        bundleTsFilePath && bundleTs && createFile(bundleTsFilePath, bundleTs) || Promise.resolve()
    ]);

    if (copyFileParams && copyMapFileParams) {
        await Promise.all([
            await copyFile(copyFileParams),
            await copyFile(copyMapFileParams)
        ]);
    }

    result = true;

    return result;
}