import getFileData from 'vamtiger-get-file-data';
import createFile from 'vamtiger-create-file';
import copyFile from'vamtiger-copy-file';
import getFileText from 'vamtiger-get-file-text';
import { MainParams as Params, ErrorMessage } from './types';

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
    const bundleFilePath = entryFilePath && params.bundleFilePath;
    const copyBundleFilePath = bundleFilePath && params.copyBundleFilePath;
    const bundleParams = entryFilePath && {
        from: entryFilePath,
        map: {
            inline: false
        }
    };
    const css = await getFileText(entryFilePath);
    const bundle = await postcss(bundleProcessors)
        .process(css, bundleParams);
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    let result = false;

    if (!entryFilePath) throw new Error(ErrorMessage.noEntryFile);
    else if (!bundleFilePath) throw new Error(ErrorMessage.noBundleFile);

    await createFile(bundleFilePath, bundle.css);

    if (copyFileParams) await copyFile(copyFileParams);

    result = true;

    return result;
}