var mongoose = require('mongoose')
var Schema = mongoose.Schema

const Crypto = require('crypto')

var userSchema = new Schema({
  fullname: { type: String, default: '', index: true },
  nickname: { type: String, default: '', trim: true },
  hash: { type: String, default: '', trim: true },
  salt: { type: String, default: '', trim: true },
  prid: { type: String, default: '', index: true },
  email: { type: String, default: '', unique: true },
  phoneNumber: { type: String, default: '' },
  gender: { type: String, default: 'M', enum: ['M', 'F'] },
  avatar: { type: String, default: '/img/avatar-placeholder.png' },
  thumbnail: { type: String, default: '/img/avatar-placeholder.png' },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
},
{
  collection: 'users'
}
)

userSchema.methods.setPassword = function(password) {
  this.salt = Crypto.randomBytes(64).toString('hex')
  // 100000代表迭代次数 64代表长度
  this.hash = Crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex')
}

userSchema.methods.validPassword = function(password) {
  var hash = Crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex')
  return this.hash === hash
}

userSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

module.exports = mongoose.model('userModel', userSchema)
