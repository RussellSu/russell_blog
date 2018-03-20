const path = require('path')

exports.isLogin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    console.error('missing session!')
    // res.setHeader('Content-type', 'text/html');
    res.cookie('originalUrl', req.originalUrl)
    res.status(500).send({ 'notLogin': true})
  }
  else {
    next()
  }
}
