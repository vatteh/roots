'use strict';
var chalk = require('chalk');
var Promise = require('bluebird');
var server = require('http').createServer();

var createApplication = function() {
    var app = require('./app');
    server.on('request', app);
};

var startServer = function() {
    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function() {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });
};

Promise.try(createApplication).then(startServer).catch(function(err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
