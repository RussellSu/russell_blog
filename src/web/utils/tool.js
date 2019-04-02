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
/**
 * @description 时间格式转换成指定格式
 * @param {Date} data 需要转换的时间
 * @param {String} formatStr 转换格式
 * @return {String} 转换后的时间字符串
 */
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
/**
 * @description number --> 三位分节法 & 指定保留小数位
 * @param {Number} data 需要转换的数字
 * @param {Number} decimalLength 保留小数位数
 * @return {String} 转换后的值
 */
const moneyFormat = function (data, decimalLength = 2) {
  if (['', null, undefined].includes(data)) {
    return '0.'.padEnd(2 + decimalLength, '0')
  }
  const NUM_POWER_OF_TEN = Math.pow(10, decimalLength)
  let num = Math.round(parseFloat(data) * NUM_POWER_OF_TEN) / NUM_POWER_OF_TEN // 四舍五入且保留最多decimalLength位小数
  let numStr = num.toString()
  let integerPart = numStr.split('.')[0]
  let decimalPart = numStr.split('.')[1] || ''
  let part1 = integerPart.replace(/(?=((?!\b)\d{3})+$)/g, ',')
  let part2 = ''
  if (decimalPart.length === decimalLength) {
    part2 = decimalPart
  }
  else {
    part2 = decimalPart + ''.padEnd(decimalLength - decimalPart.length, '0')
  }
  let finalStr = part1 + '.' + part2
  return finalStr
}

/**
 * @description 数字保留最多指定位小数并四舍五入
 * @param {Number} data 需要转换的数字
 * @param {Number} decimalLength 保留小数位数
 * @return {Number} 转换后的值
 */
const NumberFormat = function (data, decimalLength = 0) {
  if (data === undefined) {
    return data
  }
  const NUM_POWER_OF_TEN = Math.pow(10, decimalLength)
  return Math.round(data * NUM_POWER_OF_TEN) / NUM_POWER_OF_TEN
}
/**
 * @example formatUrl('xxxxx{0}xxxx{1}'， 'AAA', 'BBB') ---> 'xxxxxAAAxxxxBBB'
 */
const StringFormat = function () {
  let url = arguments[0]
  let params = []
  let ary = [...arguments]
  ary.forEach((item, index) => {
    if (item > 0) {
      params.push(item)
    }
  })
  return url.replace(/\{(\d+)\}/g, (c, d) => {
    if (params[d] === null) {
      return ''
    }
    else {
      return params[d]
    }
  })
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
      'Content-Type': 'multipart/form-data',
    },
  }
  axios.post(uploadUrl, fd, config).then(res => {
    console.log(res)
  }).catch(res => {
    console.log(res)
  })
}
/**
 *
 * @param {string} cookieName
 * @return {string}
 */
const getCookie = function (cookieName) {
  // 注： cookie 字符串是以【;+space】分隔，最后一个无分号
  //  'username=russell; fullname=suxiao; gender=M'
  const COOKIE = document.cookie
  const startIndex = COOKIE.indexOf(`${cookieName}=`)
  if (startIndex === -1) {
    return ''
  }
  let endIndex = COOKIE.indexOf(';', startIndex)
  if (endIndex === -1) {
    endIndex = COOKIE.length - 1
  }
  return decodeURIComponent(COOKIE.substring(startIndex, endIndex))
}

const setCookie = function (cookieDic) {
  for (let [key, value] of Object.entries(cookieDic)) {
    let item = key + encodeURIComponent(value.content) // 1. document.cookie 新增非全覆盖 2. 注： cookie值可存中文,但最好转一下
    if (value.expire) { // expire 时间戳
      const expireTime = `;expires=${value.expire.toGMTString()}` // 添加过期时间，但expires 不会体现先cookie字符串中
      item += expireTime
    }
    document.cookie = item
  }
}

let cbIndex = 0
let noop = function () {}
const DEFAULT_TIMEOUT = 60 * 1000
/**
 *
 * @param {String} url
 * @param {Object} options
 * @param {Function} okCB
 * @description JSONP 跨域
 * @example
 * options: {
 *   prefix: '', name place
 *   name: 'jsonpName', jsonpName in window
 *   params: {}, queryString
 *   timeout: 6000, timeout
 *   cbName: '', jsonp callback name in url
 * }
 */
const jsonp = function (url, options = {}, okCB) {
  if (typeof options === 'function') {
    okCB = options
    options = {}
  }
  let prefix = options.prefix || '__cn'
  let id = options.name || (prefix + (cbIndex++))
  let cbName = options.cbName || 'callback'
  let timeout = options.timeout || DEFAULT_TIMEOUT
  let target = document.getElementsByTagName('script')[0] || document.head
  let script
  let timer
  if (timeout) {
    timer = setTimeout(function () {
      cleanup()
      if (okCB) {
        okCB(new Error('jsonp timeout!'))
      }
    })
  }
  function cleanup () {
    if (script.parentNode) {
      script.parentNode.removeChild(script)
      window[id] = noop
      if (timer) {
        clearTimeout(timer)
      }
    }
  }
  function cancel () {
    if (window[id]) {
      cleanup()
    }
  }
  window[id] = function (data) {
    cleanup()
    if (okCB) {
      okCB(null, data)
    }
  }
  url += '?'
  if (options.params) {
    for (let [key, value] of Object.entries(options.params)) {
      url += `&${key}=${encodeURIComponent(value)}`
    }
  }
  url += cbName

  script = document.createElement('script')
  script.src = url
  target.parentNode.insertBefore(script, target)

  return cancel
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
  StringFormat,
  dataURI2Blob,
  dataURI2File,
  dataURI2FormData,
  axiosSendFormData,
  getCookie,
  setCookie,
  jsonp,
}
