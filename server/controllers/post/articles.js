const Article = require('../../models/articles')

exports.addArticle = (req, res) => {
  const article = JSON.parse(req.body.data)
  if (!article.title) {
    return res.status(400).send({ 'missingTitle': true })
  }
  if (!article.text) {
    return res.status(400).send({ 'missingText': true })
  }
  let createObj = {
    'title': article.title,
    'author': req.user._id,
    'text': article.text,
  }

  Article.create(createObj, (err, updated) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.send({ 'article': updated })
  })
}
