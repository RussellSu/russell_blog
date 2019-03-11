var mongoose = require('mongoose')
var Schema = mongoose.Schema

var accessLogSchema = new Schema({
  fullname: { type: String, default: '', index: true },
  user: { type: Schema.Types.ObjectId, ref: 'userModel', index: true },
  accessTime: { type: Date, default: Date.now },
  ua: { type: String, default: '' },
}, {
  collection: 'accessLog',
})

module.exports = mongoose.model('accessLogModel', accessLogSchema)
