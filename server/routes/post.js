const { isLogin } = require('../utils/index')

module.exports = function(app, config, apiRouter) {
  const login = require('../controllers/post/login.js')
  apiRouter.post('/login', login.login)

  const user = require('../controllers/post/users.js')
  apiRouter.post('/users', user.addUser)
  apiRouter.post('/users/register', user.register)

  const articles = require('../controllers/post/articles.js')
  apiRouter.post('/articles', articles.addArticle)
}
