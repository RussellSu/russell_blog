const Movie = require('../../models/movies.js')

exports.createMovie = (req, res) => {
  let dataBody = req.body
  const name = (dataBody.name || '').toString().replace(/(^\s+)|(\s+$)/g, '')
  if (!name) {
    return res.status(400).send({ 'missingName': true })
  }
  let createObj = {
    'name': name,
    'creator': req.user._id,
  }

  Movie.create(createObj, (err, updated) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.send({ 'movie': updated })
  })
}
