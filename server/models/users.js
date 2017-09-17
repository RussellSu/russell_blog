var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  fullname: { type: String, default: '', index: true },
  prid: { type: String, default: '', index: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  gender: { type: String, default: 'M', enum: ['M', 'F'] },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
}, {
  collection: 'users'
})

userSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

module.exports = mongoose.model('userModel', userSchema)
