import 'babel-polyfill'
import Vue from 'vue'

import taurus from 'aid-taurus-desktop'

import VueI18n from 'vue-i18n'

import { TFrame, locals } from '../src'
import store from './store'

// import { TFrame } from '../src'
// import { TFrame } from '../lib/frame.js'
import App from './app.vue'

import router from './routers'

// require('../lib/frame.css')

// Vue.component(TFrame.name, TFrame)
Vue.use(TFrame)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en-US', // 设置当前语言
  messages: { // 设置本地化资源
    'en-US': {
      ...locals.US
    },
    'zh-CN': {
      ...locals.CN
    }
  }
})

Vue.use(taurus, {
  i18n: (path, options) => {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) return value
    return ''
  }
})

new Vue({
  store,
  router,
  i18n,
  render (h) {
    return h(App)
  }
}).$mount('#app')
