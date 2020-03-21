/*
 * @Date: 2020-03-22 09:49:01
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 10:16:30
 */

import * as express from 'express';
import * as path from 'path';
import render from './render';

const LISTEN_PORT = 3020;

const app = express();

app.use(express.static(path.resolve('../dist')));

app.use(render());

app.listen(LISTEN_PORT, function() {
  console.log('prod server is running at port 3020');
});
