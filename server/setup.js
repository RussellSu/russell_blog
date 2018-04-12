var http = require('http')
var path = require('path')
var errorHandler = require('errorhandler')
var morgan = require('morgan') // express 默认log midware
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var cors = require('cors')
var mongoose = require('mongoose')
var secret = require('../secret/secret.js')
var User = require('./models/users.js')
var PassportHttp = require("passport-http")

module.exports = function (app, passport, config) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
  console.log(`■■■process.env.NODE_ENV:${process.env.NODE_ENV}`)

  // 非生产环境CORS
  if (process.env.NODE_ENV !== 'production') {
    console.log('CORS ENABLED.')
    app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:3007'],
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }))
    app.disable('etag')
  }

  app.enable('trust proxy')
  app.disable('x-powered-by')
  app.use(morgan('dev'))
  app.use(errorHandler())
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true, limit: '80mb' }))
  // parse application/json
  app.use(bodyParser.json({ limit: '50mb' }))
  console.log('■■■secret.cookieSecret■', secret.cookieSecret)
  app.use(cookieParser(secret.cookieSecret))
  app.use(session({
    resave: true,
    saveUninitialized: false,
    name: 'russell.cookie',// 浏览器中cookie的name，默认cookie的name是：connect.sid
    secret: secret.cookieSecret, // 签名，与cookie-parse中设置的签名字符串一致
    rolling: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true, // 只有server可读写cookie(防止client修改伪造cookie)
      maxAge: 60 * 60 * 1000 // 1 小时失效
    },
    store: new MongoStore({
      // db: "avatarz"
      mongooseConnection: mongoose.connection
    }),
    auto_reconnect: true
  }))
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user123, done) {
    done(null, user123._id); // 绑到 req.session.passport.user
  });

  passport.deserializeUser(function (userId, done) { //userId来源 req.session.passport.user
    //通过req.session.passport.user 实时查询user 更新req.user
    User.findOne({ '_id': userId }, "fullname email phoneNumber").lean().exec((err, user) => {
      user.gaga = "gaga"
      done(err, user); //置为  req.user req.session.passport.user
    })
  });
  passport.use(new PassportHttp.BasicStrategy(
    function (username, password, done) {
      User.findOne({
        '$or': [
          { 'fullname': username },
          { 'phoneNumber': username },
          { 'email': username }
        ]
      }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        let userObj = {
          '_id': user._id,
          'fullname': user.fullname,
          'email': user.email,
          'phoneNumber': user.phoneNumber,
          'gender': user.gender,
        }
        return done(null, userObj);  // 会把此对象 传给 passport.serializeUser 第一个参数
      });
    }
  ))
}
