// const Path = require('path')
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
  apiRouter.get('/articles/:id', articles.articleDetail)

  const videos = require('../controllers/get/videos')
  apiRouter.get('/videos', videos.videoList)
  apiRouter.get('/videos/:id', videos.videoDetail)

  const songs = require('../controllers/get/songs')
  apiRouter.get('/songs', songs.songList)
  apiRouter.get('/songs/:id', songs.songDetail)

  const uploads = require('../controllers/get/uploads.js')
  apiRouter.get('/uploads/md5/:md5', uploads.checkMD5Exist)
  apiRouter.get('/uploads/video', uploads.checkUploadVideo)
  apiRouter.get('/uploads/song', uploads.checkUploadSong)
}
