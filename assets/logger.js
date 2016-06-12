var log4js = require('log4js');
var path = require('path');
var fs = require('fs');

var config = require('../config');

// 日志目录
var logpath = config.logpath;

// 创建目录
if (!fs.existsSync(logpath)) {
  fs.mkdirSync(logpath);
  console.log('create folder ' + logpath);
}


// 配置log4js
log4js.configure({
  "appenders": [{
    "type": "console"
  }, {
    "type": "file",
    "absolute": true,
    "filename": path.join(logpath, 'log.log'),
    "maxLogSize": 20480,
    "backups": 3
  }, {
    "type": "logLevelFilter",
    "level": "error",
    "appender": {
      "type": "file",
      "absolute": true,
      "filename": path.join(logpath, 'error.log'),
      "maxLogSize": 204800,
      "backups": 3
    }
  }]
});

module.exports = log4js.getLogger();