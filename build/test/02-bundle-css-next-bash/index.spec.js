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
const chai_1 = require("chai");
const vamtiger_bash_1 = require("vamtiger-bash");
const vamtiger_get_directory_content_1 = require("vamtiger-get-directory-content");
const vamtiger_get_file_data_1 = require("vamtiger-get-file-data");
const XRegExp = require("xregexp");
const types_1 = require("../../types");
const projectPath = path_1.resolve(__dirname, '../../..');
const build = XRegExp('/build/');
const source = '/source/';
const mockData = 'mock-data';
const cssFile = 'index.css';
const cssFileCopy = 'index-copy.css';
const encoding = 'utf-8';
const mockDataFolderPath = path_1.resolve(__dirname, mockData);
const sourceEntryFolder = path_1.resolve(XRegExp.replace(mockDataFolderPath, build, source));
const copySource = `cp -rfv ${sourceEntryFolder}/* ${mockDataFolderPath}/`;
const entryFilePath = path_1.resolve(mockDataFolderPath, cssFile);
const bundleFilePath = path_1.resolve(mockDataFolderPath, 'bundle', cssFile);
const copyBundleFilePath = path_1.resolve(mockDataFolderPath, 'bundle', cssFileCopy);
const createMockDataFolder = `mkdir ${mockDataFolderPath}`;
const createBundlePath = path_1.resolve(__dirname, '../../bin/index.js');
const createCssBundle = [
    `node ${createBundlePath}`,
    `--${types_1.CommandlineArgs.entryFilePath} ${entryFilePath}`,
    `--${types_1.CommandlineArgs.bundleFilePath} ${bundleFilePath}`,
    `--${types_1.CommandlineArgs.copyBundleFilePath} ${copyBundleFilePath}`
].join(' ');
describe('vamtiger-bundle-css-next should', function () {
    it('bundle html into a single CSS file', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const directoryContent = yield vamtiger_get_directory_content_1.default(projectPath);
            const copySourceFiles = directoryContent.includes('source') ?
                yield vamtiger_bash_1.default(copySource).catch(() => { })
                :
                    this.skip();
            const createFolder = vamtiger_bash_1.default(createMockDataFolder).catch(ignore);
            const copy = yield vamtiger_bash_1.default(copySource).catch(() => { });
            const createdBundle = yield vamtiger_bash_1.default(createCssBundle);
            const cssBundle = yield vamtiger_get_file_data_1.default(bundleFilePath, encoding);
            const cssBundleCopy = yield vamtiger_get_file_data_1.default(copyBundleFilePath, encoding);
            chai_1.expect(cssBundle).to.be.ok;
            chai_1.expect(cssBundleCopy).to.be.ok;
            chai_1.expect(cssBundle).to.equal(cssBundleCopy);
        });
    });
});
function ignore() { }
//# sourceMappingURL=index.spec.js.map