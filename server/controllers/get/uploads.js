// const path = require('path')
// const fse = require("fs-extra")
const { checkChunkExisted } = require('../../utils/upload.js')

exports.checkUploadMovie = (req, res) => {
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
