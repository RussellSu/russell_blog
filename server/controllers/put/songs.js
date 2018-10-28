const Song = require('../../models/songs.js')

exports.updateSongAsset = (req, res) => {
  const songId = req.params.id
  const source = req.body.source || ''
  Song.update({ _id: songId }, { 'source': source }, (err, result) => {
    if (err) {
      return res.status(500).send({ 'error': err })
    }
    res.status(200).send({ 'source': source })
  })
}
