var express = require('express');
var util = require('util');
var config = require('../config');

module.exports = function (app) {

  setCross(app);

  // demo
  app.use('/demo', require('./demo'));

  // end
}

//设置跨域访问
function setCross(app) {

  app.options('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1')
    next();
  });

}