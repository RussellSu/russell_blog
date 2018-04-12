const path = require('path')
var Utils = require('../utils')
const passport = require('passport')

module.exports = function (app, config, apiRouter) {
  const user = require('../controllers/get/users')
  apiRouter.get('/profile', user.profile)
  apiRouter.get('/auth/provider', passport.authenticate('basic', { session: true }), user.auth)
  // app.get('/api/users', user.userList) app '/api/users'  apiRouter.get '/users'
  apiRouter.get('/users', Utils.isLogin, user.userList)

  const articles = require('../controllers/get/articles')
  apiRouter.get('/articles', articles.articleList)
  apiRouter.get('/articles/:id', articles.articleItem)
}
