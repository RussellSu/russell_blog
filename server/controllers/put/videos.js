const Video = require('../../models/videos.js')

exports.updateVideoAsset = (req, res) => {
  const videoId = req.params.id
  const source = req.body.source || ''
  Video.update({ _id: videoId }, { 'source': source }, (err, result) => {
    if (err) {
      return res.status(500).send({ 'error': err })
    }
    res.status(200).send({ 'source': source })
  })
}
