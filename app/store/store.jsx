/*eslint-env browser*/

"use strict";

var Redux   = require('redux');
var reducer = require("../reducers/reducers.jsx");

///////////////////////////////////////////////////////////////////////////////////////////////////////

var __DEV__    = true;
var middleware = [];

// Extra middleware for redux, only for DEVELOPMENT
if (__DEV__) {
    var freeze = require('redux-freeze');
    middleware.push(freeze);
}

// Create store with configured middleware
module.exports = Redux.createStore(
   reducer,
    Redux.applyMiddleware.apply(this, middleware)
);


