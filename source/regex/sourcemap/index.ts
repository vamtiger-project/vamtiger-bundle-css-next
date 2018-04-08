import * as XRegExp from 'xregexp';

export default XRegExp(
    `
        (?<css>
            .*?
            \\n
        )
        (?<sourcMapLine>
            (?<sourcMapPrefix>
                .*?sourceMappingURL=
            )
            (?<sourcFilePath>
                .*?
            )
            (?<sourcMapSuffix>
                \\s+.*?
            )
        )
    $`,
    'gmsnix'
);

export interface Match extends RegExpExecArray {
    css: string;
    sourcMapLine: string;
    sourcMapPrefix: string;
    sourcFilePath: string;
    sourcMapSuffix: string;
}