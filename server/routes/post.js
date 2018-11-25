const { isLogin } = require('../utils/index')
// const passport = require('passport')

module.exports = function (app, config, apiRouter) {
  const login = require('../controllers/post/login.js')
  apiRouter.post('/login', login.login)

  const user = require('../controllers/post/users.js')
  apiRouter.post('/users', user.addUser)
  apiRouter.post('/users/register', user.register)

  const articles = require('../controllers/post/articles.js')
  apiRouter.post('/articles', isLogin, articles.addArticle)

  const movies = require('../controllers/post/movies.js')
  apiRouter.post('/movies', isLogin, movies.createMovie)

  const songs = require('../controllers/post/songs.js')
  apiRouter.post('/songs', isLogin, songs.createSong)

  const comments = require('../controllers/post/comments.js')
  apiRouter.post('/comments', isLogin, comments.addComment)

  const uploads = require('../controllers/post/uploads.js')
  apiRouter.post('/uploads/avatar', isLogin, uploads.uploadAvatar2)
  apiRouter.post('/uploads/movie', isLogin, uploads.uploadMovie)
  apiRouter.post('/uploads/song', isLogin, uploads.uploadSong)
  apiRouter.post('/uploads/mergeChunk', isLogin, uploads.mergeChunk)
}
