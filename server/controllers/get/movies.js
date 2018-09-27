const Movie = require("../../models/movies.js")

exports.movieList = (req, res) => {
  Movie.find({}).exec((err, movies) => {
    if (err) {
      return res.status(501).send(err)
    }
    res.json({ 'movies': movies })
  })
}

exports.movieDetail = (req, res) => {
  Movie.findOne({ _id: req.params.id }).lean().exec((err, movie) => {
    if (err) {
      return res.status(501).send(err)
    }
    if (!movie) {
      return res.status(500).send({ 'error': 'not found this movie' })
    }
    res.json({ 'movie': movie })
  })
}
