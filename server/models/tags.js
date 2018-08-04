const mongoose = require('mongoose')
const Schema = mongoose.Schema

var tagSchema = new Schema({
  name: { type: String, default: '', index: true },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now, index: true },
}, {
  collection: 'tags'
})

tagSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

module.exports = mongoose.model('tagModel', tagSchema)
