import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: require('./index.vue'),
      children: [
        {
          path: '',
          name: 'notice-list',
          component: require('../src/views/notice-list.vue')
        },
        {
          path: '/notice',
          name: 'notice',
          component: require('../src/views/notice.vue')
        },
        // 修改密码
        {
          path: '/change',
          name: 'change',
          component: require('../src/views/change.vue')
        },
        // {
        //   path: '/unHandle',
        //   name: 'unHandle',
        //   component: require('../src/views/unHandle.vue')
        // }
      ]
    }
  ]
})
