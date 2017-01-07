/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import chalk from 'chalk';
import Promise from 'bluebird';
import http from 'http';
import app from './app';

let server = http.createServer();

let createApplication = () => {
    server.on('request', app);
};

let startServer = () => {
    let PORT = process.env.PORT || 1337;

    server.listen(PORT, () => {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });
};

Promise.try(createApplication).then(startServer).catch(err => {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
