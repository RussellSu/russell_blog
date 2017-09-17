var mongoose = require('mongoose')
var Schema = mongoose.Schema

var accessLogSchema = new Schema({
  fullname: { type: String, default: '', index: true },
  user: { type: Schema.Types.ObjectId, ref: 'userModel', index: true },
  access: {type: [{type: Date}], default: Date.now}
}, {
  collection: 'accessLog'
})

module.exports = mongoose.model('accessLogModel', accessLogSchema)
