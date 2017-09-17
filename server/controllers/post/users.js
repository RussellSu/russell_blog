const User = require('../../models/users')

exports.addUser = (req, res) => {
  const fullname = req.body.fullname
  const email = req.body.email
  const phone = req.body.phone
  let createObj = {
    'fullname': fullname,
    'email': email,
    'phone': phone,
  }
  User.findOne({ $or: [{ 'email': email }, { 'phone': phone }] }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (user) {
      if (user.emai === email) {
        return res.json({ 'emailRepeated': true })
      } else {
        return res.json({ 'phoneRepeated': true })
      }
    }
    User.create(createObj, (err, updated) => {
      if (err) {
        return res.send(err)
      }
      res.send({ 'user': updated })
    })
  })
}
