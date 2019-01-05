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
const path_1 = require("path");
const XRegExp = require("xregexp");
const vamtiger_create_file_1 = require("vamtiger-create-file");
const vamtiger_copy_file_1 = require("vamtiger-copy-file");
const vamtiger_get_file_text_1 = require("vamtiger-get-file-text");
const types_1 = require("./types");
const regex_1 = require("./regex");
const postcss = require('postcss');
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
exports.default = (params) => __awaiter(this, void 0, void 0, function* () {
    const { ts, entryFilePath, bundleFilePath } = params;
    const bundleMapFilePath = `${bundleFilePath}.map`;
    const bundleTsFilePath = ts && `${bundleFilePath.replace(/css$/, 'ts')}`;
    const bundleMapFileRelativePath = path_1.basename(bundleMapFilePath);
    const copyBundleFilePath = bundleFilePath && params.copyBundleFilePath;
    const copyBundleMapFilePath = copyBundleFilePath && `${copyBundleFilePath}.map`;
    const bundleParams = entryFilePath && {
        from: entryFilePath,
        map: {
            inline: false
        }
    };
    const css = yield vamtiger_get_file_text_1.default(entryFilePath);
    const bundle = yield postcss(bundleProcessors)
        .process(css, bundleParams);
    const bundleMatch = XRegExp.exec(bundle.css, regex_1.sourceMap);
    const bundleCss = bundleMatch && `${bundleMatch.css}${bundleMatch.sourcMapPrefix}${bundleMapFileRelativePath}${bundleMatch.sourcMapSuffix}`
        || bundle.css;
    const bundleTs = bundleTsFilePath && `export default \`${bundleCss}\`;`;
    const bundleText = bundleTs && bundleTs
        || bundleCss;
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    const copyMapFileParams = copyBundleFilePath && {
        source: bundleMapFilePath,
        destination: copyBundleMapFilePath
    };
    let result = false;
    if (!entryFilePath)
        throw new Error(types_1.ErrorMessage.noEntryFile);
    else if (!bundleFilePath)
        throw new Error(types_1.ErrorMessage.noBundleFile);
    yield Promise.all([
        vamtiger_create_file_1.default(bundleFilePath, bundleText),
        vamtiger_create_file_1.default(bundleMapFilePath, bundle.map),
        bundleTsFilePath && bundleTs && vamtiger_create_file_1.default(bundleTsFilePath, bundleTs) || Promise.resolve()
    ]);
    if (copyFileParams && copyMapFileParams) {
        yield Promise.all([
            yield vamtiger_copy_file_1.default(copyFileParams),
            yield vamtiger_copy_file_1.default(copyMapFileParams)
        ]);
    }
    result = true;
    return result;
});
//# sourceMappingURL=index.js.map