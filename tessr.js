#!/usr/bin/env node

// Requires:
var express = require('express');
var path = require('path');
var routes = require('./routes');

// Constants
var ENV = process.env.NODE_ENV || 'development';
var PORT = 3000;
var VIEWS_DIR = path.join(__dirname, 'views');

// Use express and export it as well.
var app = module.exports = express();

// Settings for express.
app.set('views', VIEWS_DIR);
app.set('view engine', 'jade');

// Set up routing for express.
app.get('/', routes.index);

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
