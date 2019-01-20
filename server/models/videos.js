const mongoose = require('mongoose')
const Schema = mongoose.Schema

var videoSchema = new Schema({
  name: { type: String, default: '', index: true },
  // author: { type: Schema.Types.ObjectId, ref: 'userModel', index: true },
  source: { type: String, default: '' },
  creator: { type: Schema.Types.ObjectId, ref: 'userModel' },
  types: { type: Array, default: [] },
  description: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now, index: true },
}, {
  collection: 'videos'
})

videoSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

module.exports = mongoose.model('videoModel', videoSchema)
