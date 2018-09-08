// const fs = require('fs')
const path = require('path')

module.exports = (app) => {
  app.get('/uploads/*', (req, res) => {
    let file = req.url
    // var mime = require("mime")
    var idx = file.lastIndexOf("?")
    if (idx > 0) {
      file = file.substr(0, idx)
    }
    file = decodeURI(file)
    // var target = "./public" + file
    var filename = path.basename(file)
    filename = encodeURI(filename)
    console.log('filename', filename)
    var decodedPath = file.replace(/^\//, "")
    console.log('decodedPath', decodedPath)

    res.status(404).send({error: file + " not found."})
    // res.status(200).sendFile(path.resolve(publicPath, decodedPath));
  })
}
