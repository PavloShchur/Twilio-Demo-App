var path = require('path');
var express = require('express');

var app = express();

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));