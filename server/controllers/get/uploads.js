// const path = require('path')
// const fse = require("fs-extra")
const { checkChunkExisted } = require('../../utils/upload.js')
const Assets = require('../../models/assets')

exports.checkMD5Exist = (req, res) => {
  const md5 = req.params.md5
  Assets.findOne({ identifier: md5 }, 'filePath fileType fileSize').lean().exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send({ 'result': result })
  })
}

exports.checkUploadVideo = (req, res) => {
  const chunk = {
    identifier: req.query.identifier,
    chunkNumber: req.query.chunkNumber,
    filename: req.query.filename,
  }
  checkChunkExisted(chunk, (err, existFlag) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(existFlag ? 200 : 404).send({ 'exists': existFlag })
  })
}

exports.checkUploadSong = (req, res) => {
  const chunk = {
    identifier: req.query.identifier,
    chunkNumber: req.query.chunkNumber,
    filename: req.query.filename,
  }
  checkChunkExisted(chunk, (err, existFlag) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(existFlag ? 200 : 404).send({ 'exists': existFlag })
  })
}
