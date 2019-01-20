const path = require('path')
const formidable = require("formidable")
const { judgeType } = require("../../utils")
const { storeChunk, mergeChunk } = require('../../utils/upload.js')
const fse = require("fs-extra")
const fs = require("fs")

const User = require('../../models/users')
const Assets = require('../../models/assets')

exports.uploadAvatar = (req, res) => {
  let form = new formidable.IncomingForm()
  let post = {}
  let fileDic = {}
  form.uploadDir = global.appConfig.tempPath // 文件上传 临时文件存放路径
  form.on('error', function (err) {
    console.log('error', err)
  }).on('field', function (field, value) { // POST 普通数据 不包含文件 field 表单name value 表单value
    if (form.type === 'multipart') { // 有文件上传时 enctype="multipart/form-data"
      if (field in post) { // 同名表单 checkbox 返回array 同get处理
        if (judgeType(post[field]) === 'array') {
          post[field] = [post[field]]
        }
        post[field].push(value)
        return
      }
    }
    post[field] = value
  }).on('file', function (field, file) {
    // 上传文件
    console.log(file)
    file[field] = file
    fileDic = file
  }).on('end', function (fff) {
    console.log('end', fileDic)
    createAsset(fileDic)
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send({ 'error': err })
    }
    console.log('fields', fields)// 表单传递的input数据
    // res.status(200).send({ file: files })
  })
  function createAsset (fileInfo) {
    Assets.create({
      'name': fileInfo.name,
      // 'filePath': fileInfo.path,
      'fileType': fileInfo.type,
      'user': req.user._id,
      'type': 'avatar',
    }, (err, result) => {
      if (err) {
        console.log('asset.create err', err)
        return res.status(500).send({ 'error': err })
      }
      const newFileDir = global.appConfig.uploadPath + '/' + req.user._id + '/' + result._id
      const newFilePath = newFileDir + '/' + fileDic.name
      const relativePath = "/uploads/" + newFilePath.split("uploads/")[1]
      console.log('newFileDir', newFileDir)
      console.log('newFilePath', newFilePath)
      console.log('relativePath', relativePath)
      // 创建目录
      fse.mkdirs(newFileDir, err => {
        if (err) {
          console.log('fse.mkdirs', err)
          return res.status(500).send({ 'error': err })
        }
        // 将文件从temp移动到指定目录
        fse.rename(fileDic.path, newFilePath, err => {
          if (err) {
            console.log('fse.rename callback err', err)
            return res.status(500).send({ 'error': err })
          }
          console.log('fse.rename callback')
          // 更新asset的filePath
          Assets.update({ _id: result._id }, { 'filePath': relativePath }, (err, updateData) => {
            if (err) {
              console.log('assets.update err', err)
              return res.status(500).send({ 'error': err })
            }
            console.log('updateData', updateData)
            // 更新用户的头像
            User.update({ _id: req.user._id }, { 'thumbnail': relativePath, 'avatar': relativePath }, (err, userResult) => {
              if (err) {
                console.log('user update err', err)
                return res.status(500).send({ 'error': err })
              }
              res.status(200).send({ result: userResult })
            })
          })
        })
      })
    })
  }
}

exports.uploadAvatar2 = (req, res) => {
  let form = new formidable.IncomingForm()
  form.uploadDir = global.appConfig.tempPath // 文件上传 临时文件存放路径
  form.encoding = "utf-8"
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send({ error: err })
    }
    createAsset(files.avatar)
    // res.status(200).send({ file: files })
  })
  function createAsset (fileInfo) {
    Assets.create({
      'name': fileInfo.name,
      // 'filePath': fileInfo.path,
      'fileType': fileInfo.type,
      'user': req.user._id,
      'type': 'avatar',
    }, (err, result) => {
      if (err) {
        console.log('asset.create err', err)
        return res.status(500).send({ 'error': err })
      }
      const newFileDir = global.appConfig.uploadPath + '/' + req.user._id + '/' + result._id
      const newFilePath = newFileDir + '/' + fileInfo.name
      const relativePath = "/uploads/" + newFilePath.split("uploads/")[1]
      console.log('newFileDir', newFileDir)
      console.log('newFilePath', newFilePath)
      console.log('relativePath', relativePath)
      // 创建目录
      fse.mkdirs(newFileDir, err => {
        if (err) {
          console.log('fse.mkdirs', err)
          return res.status(500).send({ 'error': err })
        }
        // 将文件从temp移动到指定目录
        fse.rename(fileInfo.path, newFilePath, err => {
          if (err) {
            console.log('fse.rename callback err', err)
            return res.status(500).send({ 'error': err })
          }
          console.log('fse.rename callback')
          // 更新asset的filePath
          Assets.update({ _id: result._id }, { 'filePath': relativePath }, (err, updateData) => {
            if (err) {
              console.log('assets.update err', err)
              return res.status(500).send({ 'error': err })
            }
            // 更新用户的头像
            User.update({ _id: req.user._id }, { 'thumbnail': relativePath, 'avatar': relativePath }, (err, userResult) => {
              if (err) {
                console.log('user update err', err)
                return res.status(500).send({ 'error': err })
              }
              res.status(200).send({ result: relativePath })
            })
          })
        })
      })
    })
  }
}

exports.uploadVideo = (req, res) => {
  let form = new formidable.IncomingForm()
  form.uploadDir = global.appConfig.tempPath // 文件上传 临时文件存放路径
  form.encoding = "utf-8"
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send(err)
    }
    storeChunk(files.file, fields, (err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.status(200).send({ 'msg': 'chunk upload success' })
    })
  })
}

exports.uploadSong = (req, res) => {
  let form = new formidable.IncomingForm()
  form.uploadDir = global.appConfig.tempPath // 文件上传 临时文件存放路径
  form.encoding = "utf-8"
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send(err)
    }
    storeChunk(files.file, fields, (err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.status(200).send({ 'msg': 'chunk upload success' })
    })
  })
}

exports.mergeChunk = (req, res) => {
  const mergeInfo = {
    chunks: req.body.chunks || [],
    filename: req.body.filename,
    fileSize: req.body.fileSize,
    identifier: req.body.identifier,
    mimeType: req.body.mimeType,
    assetType: req.body.assetType,
    user: req.user,
  }
  mergeChunk(mergeInfo, (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send({ 'filePath': result.filePath })
  })
}
