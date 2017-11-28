<template>
	<div>
		<t-frame :logo-router="logoRouter" :navs="navs" :count="count" :authorization="authorization" :tag="tag" :menu-list="menuList"></t-frame>
	</div>
</template>
<script>
  import authorization from '../src/authorization.js'
  export default {
    data () {
      return {
        logoRouter: { path: '/'},
        authorization: authorization,
        tag: 'CRM',
        menuList: [],
        navs: [
          {
            type: 'icon',
            icon: 'bell'
          },
          {
            type: 'dropdown',
            icon: 'account-circle',
            children: [
              {
                name: 'icon1'
              },
              {
                name: 'icon2'
              },
              {
                name: 'icon3'
              }
            ]
          },
          {
            type: 'icon',
            icon: 'arrow-right-bold-box-outline',
            handleType: 'logout'
          }
        ],
        count: 6
      }
    }
  }
</script>
