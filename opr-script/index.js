const Crypto = require('crypto')

const passwordSalt = Crypto.randomBytes(64).toString('hex')
console.log(passwordSalt)
const key = Crypto.pbkdf2Sync('suxiao', passwordSalt, 100000, 64, 'sha512')
console.log(key.toString('hex'))
