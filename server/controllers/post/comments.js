const Comment = require('../../models/comments')

exports.addComment = (req, res) => {
  let articleId = req.body.article
  if (!articleId) {
    return res.status(400).send({ 'missingArticle': true })
  }
  let createObj = {
    // 'title': req.body.text,
    'article': articleId,
    'user': req.user._id,
    'text': req.body.text,
  }
  Comment.create(createObj, (err, updated) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.send({ 'article': updated })
  })
}
