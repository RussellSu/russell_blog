const { afterLoginSuccess } = require('../../utils/index.js')
const User = require("../../models/users.js")
// const AccessLog = require('../../models/accessLog.js')

exports.auth = (req, res) => {
  console.log('auth')
  if (!req.user) {
    return res.status(400).send({ missingUser: true })
  }
  afterLoginSuccess(req, res)
}

exports.profile = (req, res) => {
  if (!req.user) {
    return res.json({ user: {} })
  }
  User.findOne({ _id: req.user._id }, "fullname prid email phoneNumber thumbnail avatar gender roles")
    .lean()
    .exec((err, user) => {
      if (err) return res.status(501).send(err)
      res.json({ user: user })
    })
}

exports.userList = (req, res) => {
  console.log("get userList api")
  User.find({}).exec((err, users) => {
    if (err) {
      return res.status(501).send(err)
    }
    res.json({ users: users })
  })
}
