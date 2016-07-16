/*
This file allows ES2015 syntax to be used on the server-side, and serves as the
entry point for the server code. Babel compiles server.js dependencies to ES5.
ES2015 is used on the server for initializing the Redux state and sending the
index page to the client. It uses the .babelrc file for its configuration.
https://babeljs.io/docs/usage/require/
http://stackoverflow.com/questions/30773756/is-it-okay-to-use-babel-node-in-production
*/

require('babel-register');
var massdropApp = require('./server/index.js');
