var express = require('express');
var routes = require('./routes');

// Use express.
var app = express();

// Set up routing for express.
app.get('/', routes.handleIndex);

app.listen(3000);
