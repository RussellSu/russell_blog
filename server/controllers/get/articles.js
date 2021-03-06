let Article = require('../../models/articles')
let Comment = require('../../models/comments')

exports.articleList = (req, res) => {
  Article.find({}).lean().exec((err, articles) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json({ 'articles': articles })
  })
}

exports.articleDetail = (req, res) => {
  Promise.all([
    Article.findOne({ _id: req.params.id }).lean(),
    Comment.find({ article: req.params.id })
      .populate('user', 'fullname nickname email thumbnail')
      .populate('replies.user', 'fullname nickname email')
      .populate('replies.to', 'fullname nickname email').lean(),
  ]).then(data => {
    let article = data[0]
    if (!article) {
      return res.status(500).send({ error: 'not found article' })
    }
    article.comments = data[1]
    res.status(200).send({ 'article': article })
  }, err => {
    res.status(500).send({ error: err })
  })
}
