let User = require('../../models/users.js')

exports.userList = (req, res) => {
  console.log('get userList api')
  User.find({}).exec((err, users) => {
    if (err) {
      return res.json(err)
    }
    res.json({'users': users})
  })
}
