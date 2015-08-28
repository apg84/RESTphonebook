'use strict'

var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
properties = require('./properties.js');

var mongoUri;

//We check the properties to ensure we are running in the correct mode,
//also set the database to either the provided URI or the test one.

if(properties.test)
    mongoUri = 'mongodb://localhost/phonebooktest';
else
    mongoUri = properties.dbURI;

//Very basic validation, just to ensure user did not forget to add the URI on the properties file
mongoose.connect(mongoUri, function(err) {
    if(mongoUri === undefined) throw new Error('DB\'s URI must be provided'); 
});

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

var app = express();

app.use(bodyParser.json());

require('./models/pbentry');
require('./routes')(app);

app.listen(3001);

module.exports = app;
console.log('Listening on port 3001...');

