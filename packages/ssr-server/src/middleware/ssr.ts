/*
 * @Date: 2020-03-21 12:51:03
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 00:44:54
 */
import { Request, Response, NextFunction } from 'express';
import * as webpack from 'webpack';
import { RenderOptions } from '../render';
import mfs from 'memory-fs';

export interface Middleware<T> {
  (options: T): {
    (req: Request, res: Response, next: NextFunction): void;
  };
}

export interface SsrOptions {
  render: Middleware<RenderOptions>;
  multiCompiler: webpack.MultiCompiler;
}

const ssr: Middleware<SsrOptions> = ({ multiCompiler, render }) => (
  req,
  res,
  next,
) => {
  const [clientCompiler, serverCompiler] = multiCompiler.compilers;

  function readMfsFile(compiler: webpack.Compiler, filename: string) {
    const { path } = compiler.options.output as webpack.Output;
    return (compiler.outputFileSystem as mfs).readFileSync(
      `${path}/${filename}`,
      'utf-8',
    );
  }

  const serverbundle = readMfsFile(serverCompiler, 'serverbundle.js');
  const clientManifest = JSON.parse(
    readMfsFile(clientCompiler, 'client-manifest.json'),
  );

  render({ clientManifest, serverbundle })(req, res, next);
};

export default ssr;
