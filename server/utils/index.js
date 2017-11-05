exports.isLogin = (req, res, next) => {
  if (!req.session) {
    console.error('missing session!')
    // res.redirect('/login')
    next()
  }
  else {
    next()
  }
}
