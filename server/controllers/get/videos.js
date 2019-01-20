const Video = require("../../models/videos.js")

exports.videoList = (req, res) => {
  Video.find({}).exec((err, videos) => {
    if (err) {
      return res.status(501).send(err)
    }
    res.json({ 'videos': videos })
  })
}

exports.videoDetail = (req, res) => {
  Video.findOne({ _id: req.params.id }).lean().exec((err, video) => {
    if (err) {
      return res.status(501).send(err)
    }
    if (!video) {
      return res.status(500).send({ 'error': 'not found this video' })
    }
    res.json({ 'video': video })
  })
}
