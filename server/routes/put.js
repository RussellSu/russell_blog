// const { isLogin } = require('../utils')

module.exports = function (app, config, apiRouter) {
  // const user = require('../controllers/put/users')
  // apiRouter.put('/users', user.updateUser)

  // const articles = require('../controllers/put/articles')
  // apiRouter.put('/articles', isLogin, articles.modifyArticle)
  const movies = require('../controllers/put/movies')
  apiRouter.put('/movies/:id/asset', movies.updateMovieAsset)

  const songs = require('../controllers/put/songs')
  apiRouter.put('/songs/:id/asset', songs.updateSongAsset)
}
