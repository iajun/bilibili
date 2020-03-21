/*
 * @Date: 2020-03-21 21:52:50
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-21 21:53:24
 */
import * as fs from 'fs';
import * as util from 'util';

const { promisify } = util;

export const readFile = (path: string) => promisify(fs.readFile)(path, 'utf-8');
