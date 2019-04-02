/**
 * @module permission
 * @description 权限管理
 * @example
 * 1.调用方法鉴权
 * import perm from '@/directives/permission'
 * perm.check('Article$Add') return true or false
 * 2.移除dom
 * <button v-perm="$p('Article$Add')">add</button>
 * 3.禁用
 * <button v-perm="$p('Article$Add?btn')">add</button>
 * 4.自定义
 * <button v-if="$p('Article$Add')">add</button>
 */

import Vue from 'vue'
import store from '@/store'
let foo = function () {
}
/**
 * @param {string} value 权限码
 */
const check = function (value = '') {
  const permFlag = store.state.app.permission[value]
  return permFlag
}

const updateEl = function (el, binding, vnode) {
  const flag = binding.value
  const expression = binding.expression
  const type = /\?/.test(expression) ? 'disable' : 'remove'
  if (flag && el) {
    if (type === 'disable') {
      el.className = 'perm-disabled disabled'
      el.setAttribute('disabled', true)
    }
    else if (type === 'remove') {
      el.remove()
    }
  }
}

const perm = {
  bind: updateEl,
  inserted: updateEl,
  update (el, binding, vnode, oldVnode) {
  },
  // el, binding, vnode, oldVnode
  componentUpdated: updateEl,
  unbind (el, binding, vnode) {
  },
}

Vue.directive('perm', perm)

foo.check = check

export default foo
