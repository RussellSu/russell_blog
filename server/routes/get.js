module.exports = function (app, config, apiRouter) {
  const user = require('../controllers/get/users')
  apiRouter.get('/users', user.userList)
}
