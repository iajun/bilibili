/*
 * @Date: 2020-03-21 20:30:25
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 00:47:30
 */

import * as minifier from 'html-minifier';
import { readFile } from '../util/util';

function minifyHtml(html: string, options?: minifier.Options) {
  const defaultMinifyOptions: minifier.Options = {
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

export interface ParseOptions {
  minify: boolean | minifier.Options;
}

export async function parseTemplate(
  template: string,
  data: Record<string, string>,
  options: ParseOptions,
) {
  let html = await readFile(template);
  html = html.replace(/<%(.*?)%>/g, (matchedPattern, matchedString) => {
    const key = matchedString.trim();
    if (data[key] === void 0) {
      throw new Error(
        `You need to parse ${key} in your data to replace template!`,
      );
    }
    return data[key];
  });

  // options.minify
  if (options.minify) {
    if (typeof options.minify === 'boolean') {
      html = minifyHtml(html);
    } else {
      html = minifyHtml(html, options.minify);
    }
  }

  return html;
}
