/**
 * @module clickoutside
 * @description 点击节点意外其他区域
 */
import Vue from 'vue'

const clickoutside = {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  inserted (el, binding, vnode) {
  },
  update (el, binding, vnode, oldVnode) {

  },
  componentUpdated (el, binding, vnode, oldVnode) {

  },
  unbind (el, binding, vnode) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
}

Vue.directive('clickoutside', clickoutside)

export default clickoutside
