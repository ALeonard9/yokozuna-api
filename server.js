// Dependencies
var express = require('express');

// Variables
var port = process.env.port || 3000;

// Express
var app = express();

// Routes
app.use('/api', require('./routes/api'));


app.listen(port);
console.log('API is running on port '+port);
