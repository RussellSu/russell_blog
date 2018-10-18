const Movie = require('../../models/movies.js')

exports.updateMovieAsset = (req, res) => {
  const movieId = req.params.id
  const source = req.body.source || ''
  Movie.update({ _id: movieId }, { 'source': source }, (err, result) => {
    if (err) {
      return res.status(500).send({ 'error': err })
    }
    res.status(200).send({ 'source': source })
  })
}
