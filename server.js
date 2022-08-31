var path = require('path');
var express = require('express');
var pg = require('pg');

var app = express();

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/twilio-demo-app';

if (process.env.DATABASE_URL !== undefined) {
  pg.defaults.ssl = true;
}

var client = new pg.Client(connectionString);
client.connect();

var port = process.env.PORT || 8200;

app.listen(port);