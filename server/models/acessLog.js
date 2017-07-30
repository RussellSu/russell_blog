var mongoose = require('mongoose')
var Schema = mongoose.Schema

var accessLogSchema = new Schema({
    fullname: { type: String, default: '', index: true },
    prid: { type: String, default: '', index: true },
    user: { type: Schema.Types.ObjectId, ref: "userModel", index: true },
    created: { type: Date, default: Date.now, index: true },
    updated: { type: Date, default: Date.now },
})

accessLogSchema.pre('save', next => {
    var _this = this
    _this.updated = Date.now()
    next()
})

module.exports = mongoose.model('accessLogModel', userSchema)
