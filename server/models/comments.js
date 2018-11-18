const mongoose = require('mongoose')
const Schema = mongoose.Schema

var repliesSubSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'userModel' },
  to: { type: Schema.Types.ObjectId, ref: 'userModel' },
  text: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
})
var commentSchema = new Schema({
  // title: { type: String, default: '', index: true },
  article: { type: Schema.Types.ObjectId, ref: 'articleModel', index: true },
  user: { type: Schema.Types.ObjectId, ref: 'userModel' },
  replies: { type: [repliesSubSchema], default: [] }, // 楼中楼
  text: { type: String, default: '', index: true },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now, index: true },
}, {
  collection: 'comments'
})

commentSchema.pre('save', next => {
  var _this = this
  _this.updateTime = Date.now()
  next()
})

commentSchema.pre("update", function (next) {
  this.update({}, { $set: { updateTime: new Date() } })
  next()
})

module.exports = mongoose.model('commentModel', commentSchema)
