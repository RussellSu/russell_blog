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

export default {
  trim,
  isEmptyObj,
  isStringify,
  judgeType,
  deepClone,
  timeFormat,
  moneyFormat
}
