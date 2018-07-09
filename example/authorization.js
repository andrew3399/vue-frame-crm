export default {
  client_id: 'cmiConfidentialWeb', // 客户段id
  clientSecret: 'cmiConfidentialWeb%mvno$SixLou', // 客户端代码
  authorizeUri: '/oauth/authorize', // 用户认证的链接, 此时是测试机地址，生产环境需要将其改成正式环境地址
  tokenUri: '/oauth/token', // 获取token地址，是测试机地址，生产环境需要将其改成正式环境地址
  menuUri: '/api/getStaffMenue', // 获取左侧导航的接口，是测试机地址，生产环境需要将其改成正式环境地址
  redirect_uri: 'http://localhost:8080', // 返回的地址，需要将其改成项目的地址
  logout_uri: '/logout', // 退出登录地址，是测试机地址，生产环境需要将其改成正式环境地址
  bulletinListUri: '/api/getBulletinList', // 获取右侧消息列表的接口，是测试机地址，生产环境需要将其改成正式环境地址
  bulletinByIdUri: '/api/getBulletinById', // 获取消息详情的接口，是测试机地址，生产环境需要将其改成正式环境地址
  changePWD: '/api/changePWD',
  getStaffName: '/api/getStaffName',
  getStaffMenuFunc: '/api/v1/getStaffMenueFunc',
  // queryUnhandle: '/api/unHandleQuery',
  // queryHandle:'/api/handleQuery',
}
