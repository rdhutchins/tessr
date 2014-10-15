#!/usr/bin/env node

// Requires:
var express = require('express');
var routes = require('./routes');
var browserSync = require('browser-sync');

// Constants
var ENV = process.env.NODE_ENV || 'development';
var PORT = 3000;

// Use express and export it as well.
var app = module.exports = express();

// Set up routing for express.
app.get('/', routes.index);

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);

  // Since the server is up, start a browser-sync instance for development
  // purposes.
  if (ENV === 'development') {
    browserSync({
      proxy: 'localhost:' + PORT,
      files: ['routes/*.js'],
      port: 8080
    });
  }
});
