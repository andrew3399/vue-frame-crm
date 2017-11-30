import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('./index.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      component: require('../src/views/notice.vue')
    },
    {
      path: '/notice-list',
      name: 'notice-list',
      component: require('../src/views/notice-list.vue')
    }
  ]
})
