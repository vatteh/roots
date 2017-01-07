/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default app => {
    // Important to have this before any session middleware
    // because what is a session without a cookie?
    // No session at all.
    app.use(cookieParser());

    // Parse our POST and PUT bodies.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

};
