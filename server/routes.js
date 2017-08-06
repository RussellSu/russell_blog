var path = require('path')

module.exports = (app, config) => {
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
  // app.get('/users' +
  //   '| /articles', function (req, res) {
  //     res.sendFile('cmsApp.html', { root: path.join(__dirname, '../public') })
  //   })
  console.log(45678)
  app.get('*', (req, res) => {
    console.log(req.originalUrl)
    res.status(200).send('OK')
  })
}
