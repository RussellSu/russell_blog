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

module.exports = function (app, passport, config) {
  process.env.ENV = process.env.ENV || 'dev'
  console.log(`■■■process.env.ENV:${process.env.ENV}`)

  // 非生产环境CORS
  if (process.env.ENV !== 'production') {
    console.log('CORS ENABLED.')
    app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:3007'],
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }))
    app.disable('etag')
  }

  app.enable('trust proxy')
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
      secure: process.env.ENV === 'production',
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

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

}
