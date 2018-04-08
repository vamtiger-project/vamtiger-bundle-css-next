"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XRegExp = require("xregexp");
exports.default = XRegExp(`
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
    $`, 'gmsnix');
//# sourceMappingURL=index.js.map