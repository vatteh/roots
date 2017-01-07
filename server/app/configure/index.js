/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import appVariables from './app-variables';
import staticMiddleware from './static-middleware';
import parsingMiddleware from './parsing-middleware';

export default app => {
    app.setValue = app.set.bind(app);
    app.getValue = path => {
        return app.get(path);
    };

    appVariables(app);
    staticMiddleware(app);
    parsingMiddleware(app);

    app.use(app.getValue('log'));
};
