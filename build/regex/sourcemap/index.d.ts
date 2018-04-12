declare const _default: RegExp;
export default _default;
export interface Match extends RegExpExecArray {
    css: string;
    sourcMapLine: string;
    sourcMapPrefix: string;
    sourcFilePath: string;
    sourcMapSuffix: string;
}
