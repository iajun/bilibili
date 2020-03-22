"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minifier = require("html-minifier");
const util_1 = require("../util/util");
function minifyHtml(html, options) {
    const defaultMinifyOptions = {
        removeAttributeQuotes: true,
        removeComments: true,
        removeOptionalTags: true,
        collapseInlineTagWhitespace: true,
        removeTagWhitespace: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
    };
    const minifyOptions = Object.assign(defaultMinifyOptions, options);
    return minifier.minify(html, minifyOptions);
}
async function parseTemplate(template, data, options) {
    let html = await util_1.readFile(template);
    html = html.replace(/<%(.*?)%>/g, (matchedPattern, matchedString) => {
        const key = matchedString.trim();
        if (data[key] === void 0) {
            throw new Error(`You need to parse ${key} in your data to replace template!`);
        }
        return data[key];
    });
    if (options.minify) {
        if (typeof options.minify === 'boolean') {
            html = minifyHtml(html);
        }
        else {
            html = minifyHtml(html, options.minify);
        }
    }
    return html;
}
exports.parseTemplate = parseTemplate;
