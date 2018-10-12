var mongoose = require('mongoose')
var Schema = mongoose.Schema

var secretSchema = new Schema({
  keygen: { type: String, default: '' },
  cookieSecret: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
},
{
  collection: 'secret'
}
)

secretSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

module.exports = mongoose.model('secretModel', secretSchema)
