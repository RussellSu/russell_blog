const path = require('path')
var Utils = require('../utils')

module.exports = function (app, config, apiRouter) {
  // apiRouter.get('login', (req, res) => {
  //   res.sendFile('login.html', { root: path.join(__dirname, '../dist') })
  // })
  
  const user = require('../controllers/get/users')
  apiRouter.get('/profile', user.profile)
  // app.get('/api/users', user.userList) app '/api/users'  apiRouter.get '/users'
  apiRouter.get('/users', Utils.isLogin, user.userList)

  const articles = require('../controllers/get/articles')
  apiRouter.get('/articles', articles.articleList)
  apiRouter.get('/articles/:id', articles.articleItem)
}
