const { isLogin } = require('../utils')

module.exports = function (app, config, apiRouter) {
  const user = require('../controllers/delete/users.js')
  apiRouter.delete('/users', isLogin, user.deleteUser)
}
