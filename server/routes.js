var path = require('path')
const { isLogin } = require('./utils/index')

// var Utils = require('./utils')
// var users = require('./routes/users.js')

module.exports = (express, app, config, apiRouter) => {
  app.all('/', function (req, res, next) {
    console.log('■req.originalUrl■', req.originalUrl)
    if (req.originalUrl === '/') {
      res.sendFile('web.html', { root: path.join(__dirname, '../dist') })
    }
    else {
      next()
    }
  })
  app.get([
    '^/articles',
    '^/links',
    '^/movies',
    '^/author',
    '^/me'
  ], function (req, res) {
    res.sendFile('web.html', { root: path.join(__dirname, '../dist') })
  })
  app.get([
    '^/cms',
    '^/cms/users',
    '^/cms/articles',
    '^/cms/movies',
  ], isLogin, function (req, res) {
    res.sendFile('cms.html', { root: path.join(__dirname, '../dist') })
  })
  app.get('/login', function (req, res) {
    if (req.user) {
      res.redirect('/')
    }
    else {
      res.sendFile('login.html', { root: path.join(__dirname, '../dist') })
    }
  })
  app.get('/signup', function (req, res) {
    if (req.session && req.session.user) {
      res.redirect('/')
    }
    else {
      res.sendFile('signup.html', { root: path.join(__dirname, '../dist') })
    }
  })

  require('./routes/get')(app, config, apiRouter)
  require('./routes/post')(app, config, apiRouter)
  require('./routes/put')(app, config, apiRouter)
  require('./routes/delete')(app, config, apiRouter)
  // app.get('/homepage', function (req, res) {
  //   // res.send('hello world!');
  //   res.sendFile('cmsApp.html', { root: path.join(__dirname, './public') })
  // })
  app.get('/logout', (req, res) => {
    // req.logout()
    req.session.destroy(() => {
      res.redirect('/login')
    })
  })
  // 所有api 接口托管到apiRouter， 这样就以类似 apiRouter.get('/users')代替 app.get('/api/users')
  app.use('/api', apiRouter)
  // 托管静态文件， dis目录下面的文件就可以访问了
  app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')))
  app.use(express.static('./dist'))
  app.get('*', function (req, res) {
    res.status(404).send({ error: 'not Found!!!!!!' })
    // res.sendFile('404.html', { root: path.join(__dirname, '../dist') })
  })
}
