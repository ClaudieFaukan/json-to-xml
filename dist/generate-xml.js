"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateXml = void 0;
const js2xmlparser_1 = require("js2xmlparser");
function generateXml(obj, options) {
    const keys = Object.keys(obj);
    const mainKey = keys[0];
    let declaration;
    const pretty = options && options.pretty || false;
    if (options) {
        declaration = typeof options.declaration === 'boolean' ? {
            include: options.declaration
        } : options.declaration;
    }
    return js2xmlparser_1.parse(mainKey, obj[mainKey], {
        attributeString: '__attributes',
        declaration: declaration,
        format: {
            doubleQuotes: true,
            pretty: pretty
        }
    });
}
exports.generateXml = generateXml;
