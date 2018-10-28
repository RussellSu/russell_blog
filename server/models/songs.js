const mongoose = require('mongoose')
const Schema = mongoose.Schema

var songSchema = new Schema({
  name: { type: String, default: '', index: true },
  // author: { type: Schema.Types.ObjectId, ref: 'userModel', index: true },
  source: { type: String, default: '' },
  creator: { type: Schema.Types.ObjectId, ref: 'userModel' },
  types: { type: Array, default: [] },
  description: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now, index: true },
}, {
  collection: 'songs'
})

songSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

const songModel = mongoose.model('songModel', songSchema)

module.exports = songModel
