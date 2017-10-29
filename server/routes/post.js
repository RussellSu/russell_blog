const { isLogin } = require('../utils/index')

module.exports = function (app, config, apiRouter) {
  const user = require('../controllers/post/users.js')
  apiRouter.post('/users', user.addUser)

  const articles = require('../controllers/post/articles.js')
  apiRouter.post('/articles', isLogin, articles.addArticle)
}
