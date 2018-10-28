const Song = require("../../models/songs.js")

exports.songList = (req, res) => {
  Song.find({}).exec((err, songs) => {
    if (err) {
      return res.status(501).send(err)
    }
    res.json({ 'songs': songs })
  })
}

exports.songDetail = (req, res) => {
  Song.findOne({ _id: req.params.id }).lean().exec((err, song) => {
    if (err) {
      return res.status(501).send(err)
    }
    if (!song) {
      return res.status(500).send({ 'error': 'not found this song' })
    }
    res.json({ 'song': song })
  })
}
