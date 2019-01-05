import { resolve as resolvePath, dirname } from 'path';
import { expect } from 'chai';
import createFile from 'vamtiger-create-file';
import bash from 'vamtiger-bash';
import getFileData from 'vamtiger-get-file-data';
import getDirectoryContent from 'vamtiger-get-directory-content';
import * as XRegExp from 'xregexp';
import createBundle from '../..';

const projectPath = resolvePath(
    __dirname,
    '../../..'
);
const build = XRegExp('/build/');
const source = '/source/';
const mockData =  'mock-data';
const cssFile = 'index.css';
const cssFileCopy = 'index-copy.css';
const encoding = 'utf-8';
const mockDataFolderPath = resolvePath(
    __dirname,
    mockData
);
const sourceEntryFolder = resolvePath(
    XRegExp.replace(mockDataFolderPath, build, source)
);
const copySource = `cp -rfv ${sourceEntryFolder}/* ${mockDataFolderPath}/`;
const entryFilePath = resolvePath(
    mockDataFolderPath,
    cssFile
);
const bundleFilePath = resolvePath(
    mockDataFolderPath,
    'bundle',
    cssFile
);
const copyBundleFilePath = resolvePath(
    mockDataFolderPath,
    cssFileCopy
);
const createMockDataFolder = `mkdir ${mockDataFolderPath}`;
const bundleCssParams = {
    entryFilePath,
    bundleFilePath,
    copyBundleFilePath,
    ts: true
};

describe('vamtiger-bundle-css-next should', function () {
    it('bundle html into a single CSS file', async function () {
        const directoryContent = await getDirectoryContent(projectPath);
        const copy = directoryContent.includes('source') ? 
            await bash(copySource).catch(() => {})
            :
            this.skip();
        const createFolder = bash(createMockDataFolder).catch(ignore);
        const createdBundle = await createBundle(bundleCssParams);
        const cssBundle = await getFileData(bundleFilePath, encoding);
        const cssBundleCopy = await getFileData(copyBundleFilePath, encoding);

        expect(createdBundle).to.be.ok;
        expect(cssBundle).to.be.ok;
        expect(cssBundleCopy).to.be.ok;
        expect(cssBundle).to.equal(cssBundleCopy);
    })
});

function ignore() {}