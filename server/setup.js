// var http = require('http')
var Path = require('path')
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

const distPath = Path.resolve(__dirname, '..', 'dist')
const cwdPath = process.cwd()
const tempPath = Path.resolve(cwdPath, 'temp')
const uploadPath = Path.resolve(cwdPath, 'uploads')

console.log("distPath:", distPath)
console.log("cwdPath:", cwdPath)
console.log("tempPath:", tempPath)
console.log("uploadPath:", uploadPath)

module.exports = function (app, passport, config) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev123'
  console.log(`■■■process.env.NODE_ENV■${process.env.NODE_ENV}`)
  console.log(`■■■process.env■`, JSON.parse(process.env))
  console.log(`■■■process.env.secret01■${process.env.secret01}`)
  console.log(`■■■process.env.AWESOME_SERVICE_API_TOKEN■${process.env.AWESOME_SERVICE_API_TOKEN}`)

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
  app.options("*", (req, res) => {
    res.status(404).sendfile("./public/404.html")
  })

  app.head("*", (req, res) => {
    res.status(404).sendfile("./public/404.html")
  })

  app.trace("*", (req, res) => {
    res.status(404).sendfile("./public/404.html")
  })

  app.use(morgan('dev'))
  app.use(errorHandler())
  // parse application/json
  app.use(bodyParser.json({ limit: '50mb' }))
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))
  console.log('■■■secret.cookieSecret■', secret.cookieSecret)
  app.use(cookieParser(secret.cookieSecret))
  app.use(session({
    resave: true, // 强制保存session, 无论是否修改， 默认为 true
    saveUninitialized: false, // 强制将未初始化的 session 存储 默认为 true
    name: 'russell.cookie', // 生成session 的key名 ,即浏览器中cookie的name，默认cookie的name是：connect.sid
    secret: secret.cookieSecret, // 签名，与cookie-parse中设置的签名字符串一致
    rolling: false, // 动态刷新页面cookie存放时间,在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
    cookie: {
      // secure: process.env.NODE_ENV === 'production', // 一旦true, 若无https 连接， cookie不会再发送给server
      httpOnly: true, // 只有server可读写cookie(防止client修改伪造cookie) Default: true
      maxAge: 60 * 60 * 1000 // 1 小时失效
    },
    store: new MongoStore({
      // db: "avatarz"
      mongooseConnection: mongoose.connection,
      // ttl: 14 * 24 * 60 * 60, // Default 14days, if above session cookie has an expire date(cookie maxAge), this will follow, Otherwise, set ttl option
    }),
    auto_reconnect: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user123, done) => {
    console.log('passport.serializeUser')
    // 序列化： 将环境中的user.id序列化到session中，即sessionID，同时它将作为凭证存储在用户cookie中。
    done(null, user123._id) // 绑到 req.session.passport.user
  })

  passport.deserializeUser((userId, done) => {
    console.log('passport.deserializeUser', userId)
    // 反序列化： 从session反序列化，参数为用户提交的sessionID，若存在则从数据库中查询user并存储与req.user中。
    // userId来源 req.session.passport.user
    // 通过req.session.passport.user 实时查询user 更新req.user
    User.findOne({ '_id': userId }, "fullname email phoneNumber").lean().exec((err, user) => {
      if (user) {
        user.gaga = "gaga"
      }
      done(err, user) // 置为  req.user req.session.passport.user
    })
  })
  passport.use(new PassportHttp.BasicStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  }, (username, password, done) => {
    console.log('BasicStrategy', username, password)
    // 每次走中间件 passport.authenticate('basic', { session: true }) 都会执行此部分
    User.findOne({
      '$or': [
        { 'fullname': username },
        { 'phoneNumber': username },
        { 'email': username }
      ]
    }).exec((err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect username or password.' })
      }
      let userObj = {
        '_id': user._id,
        'fullname': user.fullname,
        'email': user.email,
        'phoneNumber': user.phoneNumber,
        'gender': user.gender,
      }
      return done(null, userObj) // 会把此对象 传给 passport.serializeUser 第一个参数
    })
  }))
  global.appConfig = {
    distPath,
    cwdPath,
    tempPath,
    uploadPath,
  }
}
