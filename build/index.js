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
const vamtiger_create_file_1 = require("vamtiger-create-file");
const vamtiger_copy_file_1 = require("vamtiger-copy-file");
const vamtiger_get_file_text_1 = require("vamtiger-get-file-text");
const types_1 = require("./types");
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
    const entryFilePath = params.entryFilePath;
    const bundleFilePath = entryFilePath && params.bundleFilePath;
    const copyBundleFilePath = bundleFilePath && params.copyBundleFilePath;
    const bundleParams = entryFilePath && {
        from: entryFilePath,
        map: true
    };
    const css = yield vamtiger_get_file_text_1.default(entryFilePath);
    const bundle = yield postcss(bundleProcessors)
        .process(css, bundleParams);
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    let result = false;
    if (!entryFilePath)
        throw new Error(types_1.ErrorMessage.noEntryFile);
    else if (!bundleFilePath)
        throw new Error(types_1.ErrorMessage.noBundleFile);
    yield vamtiger_create_file_1.default(bundleFilePath, bundle.css);
    if (copyFileParams)
        yield vamtiger_copy_file_1.default(copyFileParams);
    result = true;
    return result;
});
//# sourceMappingURL=index.js.map