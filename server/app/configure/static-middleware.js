/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';

export default app => {
    let root = app.getValue('projectRoot');
    let npmPath = path.join(root, './node_modules');
    let publicPath = path.join(root, './public');
    let browserPath = path.join(root, './browser');

    app.use(favicon(app.getValue('faviconPath')));
    app.use(express.static(npmPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));
};
