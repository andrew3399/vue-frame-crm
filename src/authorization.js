export default {
  client_id: 'cmiConfidentialWeb',
  clientSecret: 'cmiConfidentialWeb%mvno$SixLou',
  authorizeUri: 'http://192.168.1.186:8081/oauth/authorize',
  tokenUri: 'http://192.168.1.186:8081/oauth/token',
  menuUri: 'http://192.168.1.186:8082/api/getStaffMenue',
  redirect_uri: 'http://localhost:8080',
  logout_uri: 'http://192.168.1.186:8081/logout',
  bulletinListUri: 'http://192.168.1.186:8082/api/getBulletinList',
  bulletinByIdUri: 'http://192.168.1.186:8082/api/getBulletinById'
}
