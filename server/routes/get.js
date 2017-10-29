const path = require('path')
module.exports = function (app, config, apiRouter) {
  const user = require('../controllers/get/users')
  apiRouter.get('/users', user.userList)

  const articles = require('../controllers/get/articles')
  apiRouter.get('/articles', articles.articleList)
  apiRouter.get('/articles/:id', articles.articleItem)

  apiRouter.get('login', (req, res) => {
    res.sendFile('login.html', { root: path.join(__dirname, '../dist') })
  })
}
