/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import path from 'path';
import chalk from 'chalk';
import util from 'util';

let rootPath = path.join(__dirname, '../../../');
let indexPath = path.join(rootPath, './server/app/views/index.html');
let faviconPath = path.join(rootPath, './server/app/views/favicon.ico');

let logMiddleware = (req, res, next) => {
    util.log(('---NEW REQUEST---'));
    console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
    next();
};

export default app => {
    app.setValue('projectRoot', rootPath);
    app.setValue('indexHTMLPath', indexPath);
    app.setValue('faviconPath', faviconPath);
    app.setValue('log', logMiddleware);
};
