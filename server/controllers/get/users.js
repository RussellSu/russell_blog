let User = require('../../models/users.js')

exports.profile = (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(400).send({'missingUser': true})
  }
  User.findOne({ '_id': req.session.user._id }).lean().exec((err, user) => {
    if (err) return res.status(501).send(err)
    res.json({'user': user})
  })
}


exports.userList = (req, res) => {
  console.log('get userList api')
  User.find({}).exec((err, users) => {
    if (err) {
      return res.json(err)
    }
    res.json({'users': users})
  })
}
