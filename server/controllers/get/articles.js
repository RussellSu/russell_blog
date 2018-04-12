let Article = require('../../models/articles')

exports.articleList = (req, res) => {
  Article.find({}).lean().exec((err, articles) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json({'articles': articles})
  })
}

exports.articleItem = (req, res) => {
  Article.findOne({_id: req.params.id}).exec((err, article) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send({'article': article})
  })
}
