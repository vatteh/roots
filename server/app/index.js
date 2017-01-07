/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import path from 'path';
import express from 'express';
import config from './configure';
import routes from './routes';

let app = express();

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
config(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', routes);

/*
    This middleware will catch any URLs resembling a file extension
    for example: .js, .html, .css
    This allows for proper 404s instead of the wildcard '/*' catching
    URLs that bypass express.static because the given file does not exist.
*/
app.use((req, res, next) => {
    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }
});

app.get('/*', (req, res) => {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use((err, req, res, next) => {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

export default app;
