const mongoose = require('mongoose')
const Schema = mongoose.Schema

var articleSchema = new Schema({
  title: { type: String, default: '', index: true },
  // author: { type: Schema.Types.ObjectId, ref: 'userModel', index: true },
  author: { type: Schema.Types.ObjectId, ref: 'userModel' },
  tags: {type: [{type: Schema.Types.ObjectId, ref: "tagModel"}], default: []},
  text: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now, index: true },
}, {
  collection: 'articles'
})

articleSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

module.exports = mongoose.model('articleModel', articleSchema)
