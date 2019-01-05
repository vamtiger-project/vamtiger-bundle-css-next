/// <reference types="node" />
import { PathLike } from 'fs';
export interface MainParams {
    entryFilePath: PathLike;
    bundleFilePath: PathLike;
    copyBundleFilePath?: PathLike;
    ts?: boolean;
}
export interface LogParams {
    eventType: string;
    fileName: string;
}
