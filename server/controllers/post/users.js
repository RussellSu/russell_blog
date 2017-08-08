exports.users = (req, res) => {
  const fullname = req.body.fullname
  console.log('post users get:', fullname)
  res.status(200).send('OK')
}
