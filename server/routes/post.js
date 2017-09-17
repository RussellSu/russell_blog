module.exports = function (app, config, apiRouter) {
  const user = require('../controllers/post/users.js')
  apiRouter.post('/users', user.addUser)
}
