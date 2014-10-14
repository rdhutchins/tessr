#!/usr/bin/env node

// Requires:
var express = require('express');
var routes = require('./routes');

// Use express and export it as well.
var app = module.exports = express();

// Set up routing for express.
app.get('/', routes.index);

app.listen(3000);
