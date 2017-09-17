const mongoose = require('mongoose')
const Schema = mongoose.Schema

var articleSchema = new Schema({
  title: { type: String, default: '' },
  author: { type: Schema.Types.ObjectId, ref: 'userModel', index: true },
  text: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
}, {
  collection: 'articles'
})

articleSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

module.exports = mongoose.model('articleModel', articleSchema)
