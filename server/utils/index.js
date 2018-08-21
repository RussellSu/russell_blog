// const Path = require('path')
const Crypto = require('crypto')

exports.isLogin = (req, res, next) => {
  if (!req.user) {
    console.error('not login!')
    // res.setHeader('Content-type', 'text/html');
    res.cookie('originalUrl', req.originalUrl)
    res.status(500).send({ 'notLogin': true })
  }
  else {
    next()
  }
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
};
