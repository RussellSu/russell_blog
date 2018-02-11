const path = require('path')

exports.isLogin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    console.error('missing session!')
    // res.setHeader('Content-type', 'text/html');
    res.cookie('originalUrl', req.originalUrl)
    res.redirect('../login')
    // res.location('/login')
    // res.sendFile('login.html', { root: path.join(__dirname, '../../dist') })
    // next('/login')
  }
  else {
    next()
  }
}
