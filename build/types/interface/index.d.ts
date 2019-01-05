/// <reference types="node" />
import { PathLike } from 'fs';
export interface MainParams {
    entryFilePath: PathLike;
    bundleFilePath: PathLike;
    copyBundleFilePath?: PathLike;
}
export interface LogParams {
    eventType: string;
    fileName: string;
}
