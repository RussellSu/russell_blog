const Video = require('../../models/videos.js')

exports.createVideo = (req, res) => {
  let dataBody = req.body
  const name = (dataBody.name || '').toString().replace(/(^\s+)|(\s+$)/g, '')
  if (!name) {
    return res.status(400).send({ 'missingName': true })
  }
  let createObj = {
    'name': name,
    'creator': req.user._id,
  }

  Video.create(createObj, (err, updated) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.send({ 'video': updated })
  })
}
