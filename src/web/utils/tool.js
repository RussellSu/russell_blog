import axios from 'axios'

const trim = function (str) {
  if (typeof str !== 'string') {
    console.warn('this variable is not a String')
    return str
  }
  return str.replace(/(^\s+)|(\s+$)/g, '')
}
const isEmptyObj = function (data) {
  return Object.keys(data).length === 0
}
const isStringify = data => typeof data === 'string'
  && (
    (data.startsWith('[') && data.endsWith(']'))
  || (data.startsWith('{') && data.endsWith('}'))
  )

const judgeType = function (data) {
  const typeMap = {
    '[object String]': 'string',
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object Object]': 'object',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
  }
  return typeMap[Object.prototype.toString.call(data)]
}

const deepClone = function (data) {
  let _this = this
  const type = judgeType(data)
  let temp
  if (type === 'array') {
    temp = []
  }
  else if (type === 'object') {
    temp = {}
  }
  else {
    return data
  }
  if (type === 'array') {
    for (let i = 0; i < data.length; i++) {
      temp.push(_this.deepCopy(data[i]))
    }
  }
  else if (type === 'object') {
    for (let [key, value] of data) {
      temp[key] = _this.deepCopy(value)
    }
  }
  return temp
}

const timeFormat = function (data, formatStr = 'yyyy-MM-dd') {
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var map = {
    'M+': data.getMonth() + 1,
    'd+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds(),
    'q+': Math.floor((data.getMonth() + 3) / 3), // 季度 quarter
    'S': data.getMilliseconds(), // 毫秒
  }
  const year = data.getFullYear().toString
  if ((/(y+)/).test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, year.subStr(4 - RegExp.$1.length)) // 根据y个数  决定切割几位y(贪婪模式)并替换成年
  }
  var flg = /MMM/.test(formatStr)
  if (flg) {
    delete map['M+']
  }
  for (let [key, value] in Object.entries(map)) {
    if (key && new RegExp(`(${key})`).test(formatStr)) {
      let tempStr = ''
      if (RegExp.$1.length === 1) {
        tempStr = value
      }
      else {
        tempStr = `00${value}`.substr(('' + value).length)
      }
      formatStr = formatStr.replace(RegExp.$1, tempStr)
    }
  }
  if (flg) {
    formatStr = formatStr.replace('MMM', monthList[data.getMonth()])
  }
  return formatStr
}

const moneyFormat = function (data) {

}

const NumberFormat = function (data, decimalPlace = 0) {
  if (data === undefined) {
    return data
  }
  return Math.round(data * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace)
}

// base64转换成二进制图片（Blob）
const dataURI2Blob = function (base64Data) {
  // base64 is like        data:image/png;base64,iVBORw0KGgoAAAAN..........
  let byteStr
  if (/base64/.test(base64Data.split(',')[0])) {
    byteStr = window.atob(base64Data.split(',')[1])
  }
  else {
    byteStr = unescape(base64Data.split(',')[1])
  }
  let mimeStr = base64Data.split(',')[0] // data:image/png;base64
  mimeStr = mimeStr.split(':')[1] // image/png;base64
  mimeStr = mimeStr.split(';')[0] // image/png
  // 处理异常,将ascii码小于0的转换为大于0
  // Uint8Array类型数组表示的8位无符号整数数组。内容被初始化为0, new in ES2017
  let u8Arr = new Uint8Array(byteStr.length)
  for (let i = 0; i < byteStr.length; i++) {
    u8Arr[i] = byteStr.charCodeAt(i)
  }
  return new Blob([u8Arr], { type: mimeStr })
}

// base64转换成File
const dataURI2File = function (base64Data, fileName) {
  // base64 is like        data:image/png;base64,iVBORw0KGgoAAAAN..........
  let byteStr
  if (/base64/.test(base64Data.split(',')[0])) {
    byteStr = window.atob(base64Data.split(',')[1])
  }
  else {
    byteStr = unescape(base64Data.split(',')[1])
  }
  let mimeStr = base64Data.split(',')[0] // data:image/png;base64
  mimeStr = mimeStr.split(':')[1] // image/png;base64
  mimeStr = mimeStr.split(';')[0] // image/png
  // 处理异常,将ascii码小于0的转换为大于0
  // Uint8Array类型数组表示的8位无符号整数数组。内容被初始化为0, new in ES2017
  let u8Arr = new Uint8Array(byteStr.length)
  for (let i = 0; i < byteStr.length; i++) {
    u8Arr[i] = byteStr.charCodeAt(i)
  }
  return new File([u8Arr], fileName, { type: mimeStr })
}

const dataURI2FormData = function (base64Data) {
  let blob = dataURI2Blob(base64Data) // 上一步中的函数
  // let canvas = document.createElement('canvas')
  // let dataURL = canvas.toDataURL('image/jpeg', 0.5)
  let fd = new FormData()
  fd.append("the_file", blob, 'image.png')
  // the_file为这个文件的key，等效于input中的name，
  // image.png则是文件名，由于base64的图片信息是不带文件名的，所以可以手动指定一个，这个参数是可选的
}

const axiosSendFormData = function (uploadUrl, file) {
  var fd = new FormData()
  // fd.append('file', files[0])
  fd.append('file', file)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  axios.post(uploadUrl, fd, config).then(res => {
    console.log(res)
  }).catch(res => {
    console.log(res)
  })
}

export default {
  trim,
  isEmptyObj,
  isStringify,
  judgeType,
  deepClone,
  timeFormat,
  moneyFormat,
  NumberFormat,
  dataURI2Blob,
  dataURI2File,
  dataURI2FormData,
  axiosSendFormData,
}
