var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
var app = express();
/**
 * 全局变量
 * C 配置config
 * M 数据model
 * F 方法/变量
 */
global.C = require('./config');
global.U = require('./libs/utils');
global.M = {};//model初始化
global.D = __dirname;
global.F = require(path.join(C.dir.controller, C.exceptFolder, 'funcs'));
global.ObjectID = require('mongodb').ObjectID;
global.getUID = function(d){
  return F.encrypt(d+'_'+(new Date()).getTime())
}
global.moment = require('moment');
require(path.join(C.dir.model, C.exceptFolder,'index')); // model初始化入口

var routes = require('./libs/routes');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession(C.cookieSession));

// var identityKey = 'skey';
// app.use(session({
//   name: identityKey,
//   secret: 'chyingp', // 用来对session id相关的cookie进行签名
//   store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
//   saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
//   resave: false, // 是否每次都重新保存会话，建议false
//   cookie: {
//     maxAge: 10 * 1000 // 有效期，单位是毫秒
//   }
// }));

app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var htmlRouter = ['/index'];
for(r in routes){
  if(htmlRouter.indexOf(r) > -1){
    app.use(r, routes[r]);
  }else{
    app.use('/api'+r, routes[r]);

  }
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  //
  // // render the error page
  //
  // res.status(err.status || 500);
  res.type('html')
  res.header("Content-Type", "text/html");
  res.render('index', {title: "点滴"});
});
module.exports = app;
