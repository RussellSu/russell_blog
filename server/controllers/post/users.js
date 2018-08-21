const User = require('../../models/users')
const Crypto = require('crypto')

exports.addUser = (req, res) => {
  const fullname = req.body.fullname
  const email = req.body.email
  const phoneNumber = req.body.phoneNumber
  let createObj = {
    'fullname': fullname,
    'email': email,
    'phoneNumber': phoneNumber,
  }
  User.findOne({ $or: [{ 'email': email }, { 'phoneNumber': phoneNumber }] }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (user) {
      if (user.emai === email) {
        return res.status(500).send({ 'emailRepeated': true })
      }
      else {
        return res.status(500).send({ 'phoneRepeated': true })
      }
    }
    User.create(createObj, (err, updated) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.send({ 'user': updated })
    })
  })
}

exports.register = (req, res) => {
  let dataBody = JSON.parse(req.body.data)
  const email = (dataBody.email || '').trim()
  const phoneNumber = (dataBody.phoneNumber || '').trim()
  const username = (dataBody.username || '').trim()
  const password = (dataBody.password || '').trim()
  const password2 = (dataBody.password2 || '').trim()
  let emailRegExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z_-]+)+$/g // xiao.su-russell_su@xiao_su-russell.xiao-su.com
  let phoneNumberRegExp = /^[0-9]{11}$/g // 11位 数字
  let usernameRegExp = /^[a-zA-Z0-9_\.\-]{6,16}$/g  // 6-16位 字母 数字 英文点号 下划线 中划线
  let passwordExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@$])[0-9a-zA-Z!@$]{8,20}$/g // 8-20位 字母 数字 特殊符号 
  if (!email) {
    return res.status(500).send({'emailEmpty': true})
  }
  if (!phoneNumber) {
    return res.status(500).send({'phoneNumberEmpty': true})
  }
  if (!username) {
    return res.status(500).send({'usernameEmpty': true})
  }
  if (!password) {
    return res.status(500).send({'passwordEmpty': true})
  }
  if (password !== password2) {
    return res.status(500).send({'passwordNotSame': true})
  }
  if (!emailRegExp.test(email)) {
    return res.status(500).send({'invalidEmail': true})
  }
  if (!phoneNumberRegExp.test(phoneNumber)) {
    return res.status(500).send({'invalidPhoneNumber': true})
  }
  if (!usernameRegExp.test(username)) {
    return res.status(500).send({'invalidfullname': true})
  }
  if (!passwordExp.test(password)) {
    return res.status(500).send({'invalidPassword': true})
  }
  const passwordSalt = Crypto.randomBytes(64).toString('hex')
  const key = Crypto.pbkdf2Sync(password, passwordSalt, 100000, 64, 'sha512').toString('hex')

  let createObj = {
    'fullname': username,
    'email': email,
    'phoneNumber': phoneNumber,
    'hash': key,
    'salt': passwordSalt
  }
  User.findOne({ $or: [{ 'email': email }, { 'phoneNumber': phoneNumber }] }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (user) {
      if (user.email === email) {
        return res.status(500).send({ 'emailRepeated': true })
      }
      else {
        return res.status(500).send({ 'phoneRepeated': true })
      }
    }
    User.create(createObj, (err, updated) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.send({ 'user': updated })
    })
  })
}
