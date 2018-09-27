const mongoose = require('mongoose')
const Schema = mongoose.Schema

var movieSchema = new Schema({
  name: { type: String, default: '', index: true },
  // author: { type: Schema.Types.ObjectId, ref: 'userModel', index: true },
  creator: { type: Schema.Types.ObjectId, ref: 'userModel' },
  types: { type: Array, default: [] },
  description: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now, index: true },
}, {
  collection: 'movies'
})

movieSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

module.exports = mongoose.model('movieModel', movieSchema)
