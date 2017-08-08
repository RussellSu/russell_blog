var path = require('path')

module.exports = (express, app, config) => {
  console.log('routes.js require success!')
  require('./routes/users')
  app.get('/', function (req, res, next) {
    if (req.originalUrl === '/') {
      res.sendFile('index.html', { root: path.join(__dirname, '../dist') })
    } else {
      next()
    }
  })
  // app.get('/homepage', function (req, res) {
  //   // res.send('hello world!');
  //   res.sendFile('cmsApp.html', { root: path.join(__dirname, './public') })
  // })
  // app.get('/login', function (req, res) {
  //   res.sendFile('login.html', { root: path.join(__dirname, '../public') })
  // })
  app.get('/users' + '| /articles', function (req, res) {
    res.sendFile('cmsApp.html', { root: path.join(__dirname, '../public') })
  })
  console.log(45678)
  // 托管静态文件， dis目录下面的文件就可以访问了
  app.use(express.static('./dist'))
  // app.get('*', (req, res) => {
  //   console.log(req.originalUrl)
  //   res.status(200).send('OK')
  // })
}
