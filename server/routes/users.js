module.exports = (app, config) => {
  const usersGet = require('../controllers/get/users')
  const usersPost = require('../controllers/post/users')

  app.get('/api/user', usersGet.users)
  app.post('/api/user', usersPost.users)
}
