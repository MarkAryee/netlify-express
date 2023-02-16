'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
var createError = require('http-errors');


const router = express.Router();
router.get('/', (req, res) => {
  //res.writeHead(200, { 'Content-Type': 'text/html' });
 // res.write('<h1>Hellxpress.js!</h1>');
 res.sendFile(path.join(__dirname, '../index.html'));
 // res.end();

});
router.get('/another', (req, res) => res.json({ router: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.use(function(req, res, next) {
  next(createError(404));
});

// error
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.handler = serverless(app);
