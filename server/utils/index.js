// const Path = require('path')
const Crypto = require('crypto')
const User = require("../models/users.js")
const AccessLog = require('../models/accessLog.js')

exports.isLogin = (req, res, next) => {
  if (!req.user) {
    console.error('not login!')
    if (/text\/html/.test(req.headers.accept)) {
      res.cookie('originalUrl', req.originalUrl)
      res.redirect('/login')
      return
    }
    // res.setHeader('Content-type', 'text/html')
    res.status(401).send({ 'notLogin': true })
  }
  else {
    next()
  }
}

exports.afterLoginSuccess = (req, res, next) => {
  const now = new Date()
  User.update({ _id: req.user._id }, { 'lastLogin': now }, (err, updated) => {
    if (err) {
      return console.log(err)
    }
  })
  AccessLog.create({
    'fullname': req.user.fullname,
    'user': req.user,
    'accessTime': now,
    'ua': req.headers['user-agent'],
  }, (err, updated) => {
    if (err) {
      return console.log(err)
    }
  })
  res.status(200).send('OK')
}

exports.encrypt = (originStr, secretKey, algorithm = 'aes192') => {
  if (!secretKey) {
    throw new Error('encrypt: secreKey(second parameter) can not be empty!')
  }
  let cip = Crypto.createCipher(algorithm, secretKey)
  let encrypted = cip.update(originStr, 'binary', 'hex')
  encrypted += cip.final('hex')
  return encrypted
}

// 解密
exports.decrypt = (encryptedStr, secretKey, algorithm = 'aes192') => {
  if (!secretKey) {
    throw new Error('encrypt: secreKey(second parameter) can not be empty!')
  }
  let decipher = Crypto.createDecipher(algorithm, secretKey)
  let decrypted = ""
  decrypted += decipher.update(encryptedStr, 'hex', 'binary')
  decrypted += decipher.final('binary')
  return decrypted
}

exports.judgeType = function (data) {
  const typeMap = {
    '[object String]': 'string',
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object Object]': 'object',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
  }
  return typeMap[Object.prototype.toString.call(data)]
}
