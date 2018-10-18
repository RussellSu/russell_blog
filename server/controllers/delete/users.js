let User = require("../../models/users.js")

exports.deleteUser = (req, res) => {
  User.remove({ _id: req.query._id }).exec((err, result) => {
    if (err) {
      return res.status(500).send({ error: err })
    }
    res.status(200).send(result)
  })
}
