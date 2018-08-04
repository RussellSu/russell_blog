let Article = require('../../models/articles')
let Comment = require('../../models/comments')

exports.articleList = (req, res) => {
  Article.find({}).lean().exec((err, articles) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json({'articles': articles})
  })
}

exports.articleItem = (req, res) => {
  Promise.all([
    Article.findOne({_id: req.params.id}).lean(),
    Comment.find({article: req.params.id}).lean(),
  ]).then(data => {
    let article = data[0]
    if (!article) {
      return res.status(500).send({error: 'not found article'})
    }
    article.comments = data[1]
    res.status(200).send({'article': article})
  }, err => {
    res.status(500).send({error: err})
  })
}
