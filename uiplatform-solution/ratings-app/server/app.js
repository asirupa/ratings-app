const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const url = require('url');
const nocache = require('nocache');
const app = express();

// routes
const index = require('./routes/index');
const api = require('./routes/api');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json()); //parse POST requests with body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(nocache());

app.use('/', index);
app.use('/api', api);
app.use(express.static(path.resolve(__dirname, '..', 'build')));

module.exports = app;
