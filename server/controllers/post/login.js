const User = require('../../models/users')

exports.login = function (req, res) {
  var data = JSON.parse(req.body.data)
  if (!data.username || !data.password) {
    return res.status(500).send({ 'empty': true })
  }
  User.findOne({
    '$or': [
      { 'fullname': data.username },
      { 'phoneNumber': data.username },
      { 'email': data.username }
    ]
  }, 'hash salt fullname prid email phoneNumber gender').exec((err, user) => {
    if (err) {
      return res.status(501).send(err)
    }
    if (!user) {
      return res.status(404).send({ 'validFailed': true })
    }
    const passwordRight = user.validPassword(data.password)
    if (!passwordRight) {
      return res.status(404).send({ 'validFailed': true })
    }
    delete user.salt
    delete user.hash
    req.session.user = user
    res.status(200).send({ 'user': user })
  })
}
