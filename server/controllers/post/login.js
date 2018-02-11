const User = require('../../models/users')

exports.login = function (req, res) {
  var data = JSON.parse(req.body.data)
  if (!data.username || !data.password) {
    return res.status(500).send({ 'empty': true })
  }
  User.findOne({
    '$or': [
      { 'fullname': data.username },
      { 'phone': data.username },
      { 'email': data.username }
    ],
    'password': data.password
  }, 'fullname prid email phone gender').lean().exec((err, user) => {
    if (err) {
      return res.status(501).send(err)
    }
    if (!user) {
      return res.status(404).send({ 'userNotFound': true })
    }
    req.session.user = user
    res.status(200).send({ 'user': user })
  })
}
