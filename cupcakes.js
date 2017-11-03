var connect = require('connect');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require( 'body-parser' );
var nodemailer = require( 'nodemailer' );
var cors = require('cors');
var http = require("http").createServer(app);
//API
var order = require('./api/order.js');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));

//app = require('./api/api');
var http = require("http").createServer(app);

var www = connect();
www.use(serveStatic('www'));
app.use('/',www);

app.post('/api/addorder', order.addorder);
app.post('/api/addbankorder', order.addbankorder);

app.listen(5001, function () {
  console.log('CORS-enabled web server listening on port 5000')
})
console.log("Magic at 5001");