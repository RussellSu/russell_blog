const path = require('path')
// const formidable = require("formidable")
const fse = require("fs-extra")
const fs = require("fs")
const Assets = require('../models/assets')

// module.exports = (app) => {
//   app.get('/uploads/*', (req, res) => {
//     let file = req.url
//     // var mime = require("mime")
//     var idx = file.lastIndexOf("?")
//     if (idx > 0) {
//       file = file.substr(0, idx)
//     }
//     file = decodeURI(file)
//     // var target = "./public" + file
//     var filename = path.basename(file)
//     filename = encodeURI(filename)
//     console.log('filename', filename)
//     var decodedPath = file.replace(/^\//, "")
//     console.log('decodedPath', decodedPath)

//     res.status(404).send({ error: file + " not found." })
//     // res.status(200).sendFile(path.resolve(publicPath, decodedPath));
//   })
//   app.post('/uploads/*', (req, res) => {
//     let file = req.url
//     // var mime = require("mime")
//     var idx = file.lastIndexOf("?")
//     if (idx > 0) {
//       file = file.substr(0, idx)
//     }
//     file = decodeURI(file)
//     // var target = "./public" + file
//     var filename = path.basename(file)
//     filename = encodeURI(filename)
//     console.log('filename', filename)
//     var decodedPath = file.replace(/^\//, "")
//     console.log('decodedPath', decodedPath)

//     res.status(404).send({ error: file + " not found." })
//     // res.status(200).sendFile(path.resolve(publicPath, decodedPath));
//   })
//   app.put('/uploads/*', (req, res) => {
//     let file = req.url
//     // var mime = require("mime")
//     var idx = file.lastIndexOf("?")
//     if (idx > 0) {
//       file = file.substr(0, idx)
//     }
//     file = decodeURI(file)
//     // var target = "./public" + file
//     var filename = path.basename(file)
//     filename = encodeURI(filename)
//     console.log('filename', filename)
//     var decodedPath = file.replace(/^\//, "")
//     console.log('decodedPath', decodedPath)

//     res.status(404).send({ error: file + " not found." })
//     // res.status(200).sendFile(path.resolve(publicPath, decodedPath));
//   })
// }

exports.checkChunkExisted = (chunk, cb) => {
  // chunk: { identifier, chunkNumber, filename }
  const chunkFilePath = path.join(global.appConfig.tempPath, chunk.identifier, chunk.chunkNumber, chunk.filename)
  fse.pathExists(chunkFilePath, (err, exists) => {
    if (err) {
      cb(err)
    }
    else {
      cb(null, exists)
    }
  })
}

exports.storeChunk = (fileInfo, fields, cb) => {
  const chunkFileDir = path.join(global.appConfig.tempPath, fields.identifier, fields.chunkNumber)
  const chunkFilePath = path.join(chunkFileDir, fileInfo.name)
  fse.mkdirs(chunkFileDir, err => {
    if (err) {
      cb(err)
      return
    }
    // 将文件从temp移动到指定目录
    fse.rename(fileInfo.path, chunkFilePath, err => {
      if (err) {
        cb(err)
      }
      else {
        cb(null, { 'msg': 'chunk upload success' })
      }
    })
  })
}

exports.mergeChunk = (mergeInfo, cb) => {
  const { chunks, filename, fileSize, identifier, mimeType, user } = mergeInfo
  const totalChunkDir = path.join(global.appConfig.tempPath, identifier)
  const totalChunkPath = path.join(totalChunkDir, filename)
  const chunkPathList = chunks.map(item => path.join(totalChunkDir, item.chunkNum, filename))

  const createAsset = (chunkPath) => {
    Assets.create({
      'name': filename,
      // 'filePath': fileInfo.path,
      'fileType': mimeType,
      'filesize': fileSize,
      'user': user._id,
      'type': 'movie',
    }, (err, result) => {
      if (err) {
        cb(err)
        return
      }
      const targetFileDir = path.join(global.appConfig.uploadPath, result._id.toString())
      const targetFilePath = path.join(targetFileDir, filename)
      const relativePath = path.join(path.sep, 'uploads', result._id.toString(), filename)
      // const septer = path.sep + 'uploads' + path.sep
      // const relativePath = "/uploads/" + targetFilePath.split("uploads/")[1]
      console.log('newFileDir', targetFileDir)
      console.log('newFilePath', targetFilePath)
      console.log('relativePath', relativePath)
      // 创建目录
      fse.mkdirs(targetFileDir, err => {
        if (err) {
          cb(err)
          return
        }
        // 将文件从temp移动到指定目录
        fse.rename(chunkPath, targetFilePath, err => {
          if (err) {
            cb(err)
            return
          }
          // 更新asset的filePath
          Assets.update({ _id: result._id }, { 'filePath': relativePath, 'identifier': identifier }, (err, updateData) => {
            if (err) {
              cb(err)
              return
            }
            cb(null, { 'filePath': relativePath })
          })
        })
      })
    })
  }
  const readStreamFoo = (chunkList) => {
    const path = chunkList.shift()
    let originStream = fs.createReadStream(path)
    originStream.pipe(targetStream, { end: false })
    originStream.on('end', () => {
      // fs.unlinkSync(path)
      if (chunkList.length === 0) {
        console.log('all chunks merge done')
        createAsset(totalChunkPath)
      }
      else {
        readStreamFoo(chunkList)
      }
    })
    originStream.on('error', (err) => {
      cb(err)
    })
  }
  fse.ensureFileSync(totalChunkPath)
  const targetStream = fs.createWriteStream(totalChunkPath)
  readStreamFoo(chunkPathList)
}
