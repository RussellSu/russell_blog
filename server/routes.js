var path = require('path')
// var Utils = require('./utils')
// var users = require('./routes/users.js')

module.exports = (express, app, config, apiRouter) => {
  console.log(`■${process.env.NODE_ENV}`)
  app.all('/', function (req, res, next) {
    console.log('■req.originalUrl■', req.originalUrl)
    if (req.originalUrl === '/') {
      res.sendFile('cms.html', { root: path.join(__dirname, '../dist') })
    }
    else if (req.originalUrl === '/login') {
      console.log('login!!!')
      res.sendFile('cms.html', { root: path.join(__dirname, '../dist') })
    }
    else {
      next()
    }
  })
  app.get('/users'
    + '| /articles'
    + '| /links', function (req, res) {
    res.sendFile('cms.html', { root: path.join(__dirname, '../dist') })
  })
  app.get('/login', function (req, res) {
    req.session.destroy(() => {
      res.sendFile('login.html', { root: path.join(__dirname, '../dist') })
    })
  })
  // app.use('/', (req, res) => {
  //   res.sendFile('cmsApp.html', { root: path.join(__dirname, '../dist') })
  // })

  require('./routes/get')(app, config, apiRouter)
  require('./routes/post')(app, config, apiRouter)
  // app.get('/homepage', function (req, res) {
  //   // res.send('hello world!');
  //   res.sendFile('cmsApp.html', { root: path.join(__dirname, './public') })
  // })

  app.get('/logout', (req, res) => {
    res.redirect('/login')
  })
  // 所有api 接口托管到apiRouter， 这样就以类似 apiRouter.get('/users')代替 app.get('/api/users')
  app.use('/api', apiRouter)
  // 托管静态文件， dis目录下面的文件就可以访问了
  app.use(express.static('./dist'))
  // app.get('*', (req, res) => {
  //   console.log(req.originalUrl)
  //   res.status(200).send('OK')
  // })
  app.get('*', function (req, res) {
    res.sendStatus(404)
    // res.sendFile('404.html', { root: path.join(__dirname, '../dist') })
  })
}
