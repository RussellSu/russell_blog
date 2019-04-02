import SparkMD5 from 'spark-md5'

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
      temp.push(_this.deepClone(data[i]))
    }
  }
  else if (type === 'object') {
    for (let [key, value] of Object.entries(data)) {
      temp[key] = _this.deepClone(value)
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

// 获得文件md5
const getFileMD5 = function (file, callback) {
  const fileReader = new FileReader()
  const chunkSize = 2097152 // 2M
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0

  // 创建md5对象（基于SparkMD5）
  const spark = new SparkMD5()

  // 每块文件读取完毕之后的处理
  fileReader.onload = function (e) {
    // 每块交由sparkMD5进行计算
    spark.appendBinary(e.target.result)
    currentChunk++

    // 如果文件处理完成计算MD5，如果还有分片继续处理
    if (currentChunk < chunks) {
      loadNext()
    }
    else {
      callback(spark.end())
    }
  }
  // 处理单片文件的上传
  function loadNext () {
    let start = currentChunk * chunkSize
    let end = start + chunkSize >= file.size ? file.size : start + chunkSize

    fileReader.readAsBinaryString(file.slice(start, end))
  }

  loadNext()
}

export default {
  trim,
  isEmptyObj,
  isStringify,
  judgeType,
  deepClone,
  timeFormat,
  moneyFormat,
  getFileMD5,
}
