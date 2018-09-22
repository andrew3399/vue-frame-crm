/**
 * 进入路由之前判断是否有token存在
 */
import LocalStorage from '../utils/localStorage.js'
import {getQuery, uuid} from '../utils/utils.js'
import {Base64} from 'js-base64'
import store from '../store/index.js'

export function beforeEach (to, from, next, authorization, requestInstance, cb) {
  let localStorage = new LocalStorage()
  let sessionStorage = window.sessionStorage
  let redirectUri = authorization.redirect_uri
  // 路由拦截 根据路由配置中meta.requireAuth判断是否需要登录
  let locationHref = window.location.href;
  locationHref = locationHref.replace(/[?]{0,}code=\w*[&]{0,}/g, '');
  locationHref = locationHref.replace(/state=\w*[&]{0,}/g, '');
  locationHref = locationHref.replace(/acd=\w*[&]{0,}/g, '');
  // 从EIP跳转过来的菜单需要携带参数信息
  console.log('======================= from ========================')
  console.log(from)
  console.log('======================= from end ========================')
  let fromQuery = from.query;
  let toAcd = to.query.acd;
  let fromShowMenuHead = fromQuery.showMenuHead;
  let fromMpId = fromQuery.mpId;
  if (toAcd){
    redirectUri = locationHref
  }
  if (toAcd && toAcd !== undefined && toAcd !== '' && toAcd === '1'){
    localStorage.remove('access_token')
    localStorage.remove('refresh_token')
    localStorage.remove('session_time')
    sessionStorage.clear()
    to.query.acd = 0
  }
  let loginUserName = to.query.user
  if (loginUserName && loginUserName !== ''){
    sessionStorage.setItem('loginUserName',loginUserName)
  }
  if(fromShowMenuHead && fromShowMenuHead !== '' && fromMpId && fromMpId !== '' && !to.query.showMenuHead && !to.query.mpId){
    to.query.showMenuHead = fromShowMenuHead
    to.query.mpId = fromMpId
    next({
      path: to.path,
      query: to.query
    })
    return;
  } else if(!to.query.showMenuHead && !to.query.mpId){
    let documentReferrer = document.referrer
    let refShowMenuHead = '';
    let refMpId = '';
    let referShowMenuHeadQuery = documentReferrer.match(new RegExp('[\?\&]showMenuHead=([^\&]+)', 'i'));
    let referMpIdQuery = documentReferrer.match(new RegExp('[\?\&]mpId=([^\&]+)', 'i'));
    if (referShowMenuHeadQuery !== null && referShowMenuHeadQuery.length > 1){
      refShowMenuHead = referShowMenuHeadQuery[1]
    }
    if (referMpIdQuery !== null && referMpIdQuery.length > 1){
      refMpId = referMpIdQuery[1]
    }
    if ( refShowMenuHead && refShowMenuHead !== '' && refMpId && refMpId !== '' ){
      to.query.showMenuHead = refShowMenuHead
      to.query.mpId = refMpId
      next({
        path: to.path,
        query: to.query
      })
      return;
    }
  }

  console.log('======================= to ========================')
  console.log(to)
  console.log('======================= to end ========================')
  let accessToken = localStorage.get('access_token')
  let refreshToken = localStorage.get('refresh_token')
  let sessionTime = localStorage.get('session_time')
  //校验是否有菜单权限信息
  let authorMenuArray = JSON.parse(sessionStorage.getItem('authorMenuArray'))
  let routeArr = ['/res', '/cust', '/order', '/acct','/mks', '/rpt', '/prod', '/odp', '/base', '/']
  let toPath = to.path
  if (to.meta && to.meta.requireAuth ) {
      if (accessToken && refreshToken && sessionTime) {
        if (authorMenuArray === null || to.meta.permission === null ||  to.meta.permission === undefined || !to.meta.permission ){
          next()
          return;
        }
        if (to.meta.permission && authorMenuArray && authorMenuArray.length > 0 && (authorMenuArray.indexOf(toPath) > -1 || routeArr.indexOf(toPath) > -1 )){
          next()
        } else{
          if (authorMenuArray == null || authorMenuArray.length <= 0) {
            next()
          }
          if (to.matched != null && to.matched.length > 0){
            next({
              path: to.matched[0].path
            })
          } else {
            next({
              path: authorization.redirect_uri
            })
          }
        }

      } else {
        sessionStorage.clear()
        let code = getQuery('code')
        let state = getQuery('state')
        let showMenuHead = getQuery("showMenuHead");
        let mpId = getQuery("mpId");
        if (code && state) {
          /**
           *  这里需要去请求token的值,并设置sessiion-time
           *  oauth2
           */
          // cb(code, state, next, localStorage, uuid(6, 16))
          if (showMenuHead !== '' && locationHref.indexOf('showMenuHead=') < 0){
            if (locationHref.indexOf('?') > -1){
              locationHref = locationHref + '&showMenuHead=' + showMenuHead
            } else{
              locationHref = locationHref + '?showMenuHead=' + showMenuHead
            }
          }
          if (mpId !== '' && locationHref.indexOf('mpId=') < 0){
            if (locationHref.indexOf('?') > -1){
              locationHref = locationHref + '&mpId=' + mpId
            } else {
              locationHref = locationHref + '?mpId=' + mpId
            }
          }
          requestInstance.post(authorization.tokenUri + '?code=' + code + '&state=' + state +
            '&grant_type=authorization_code' + '&client_id=' + authorization.client_id + '&redirect_uri=' + encodeURIComponent(locationHref))
            .then(res => {
              let time = new Date().getTime() + 8 * 60 * 60 * 1000
              localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
              localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
              localStorage.set('session_time', time, 8 * 60 * 60 * 1000)
              next()
            }).catch(res => {
            let msg = {
              client_id: authorization.client_id,
              redirect_uri: encodeURIComponent(locationHref),
              state: uuid(6, 16)
            }
            window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
          })
        } else {
          /**
           * 需要判断页面sessionTime是否生效，如果失效，需要重新去登录
           */
          if (sessionTime && !accessToken && refreshToken) {
            /**
             * 如果生效，且accessToken 失效，
             * 需要重新获取accessToken
             */
            requestInstance.post(authorization.tokenUri + '?grant_type=refresh_token' + '&refresh_token=' + encodeURIComponent(refreshToken) + '&scope=read', '', {
              headers: {
                Authorization: 'Basic ' + Base64.encode(authorization.client_id + ':' + authorization.clientSecret)
              }
            }).then(res => {
              localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
              // localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
              next()
            }).catch(res => {
              if (res && res.response) {
                switch (res.response.status) {
                  case 401:
                    requestInstance.post(authorization.tokenUri + '?grant_type=refresh_token' + '&refresh_token=' + refreshToken + '&scope=read', '', {
                      headers: {
                        Authorization: 'Basic ' + Base64.encode(authorization.client_id + ':' + authorization.clientSecret)
                      }
                    }).then(res => {
                      localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
                      // localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
                      next()
                    }).catch(res => {
                      if (showMenuHead !== '' && locationHref.indexOf('showMenuHead=') < 0){
                        if (locationHref.indexOf('?') > -1){
                          locationHref = locationHref + '&showMenuHead=' + showMenuHead
                        } else{
                          locationHref = locationHref + '?showMenuHead=' + showMenuHead
                        }
                      }
                      if (mpId !== '' && locationHref.indexOf('mpId=') < 0){
                        if (locationHref.indexOf('?') > -1){
                          locationHref = locationHref + '&mpId=' + mpId
                        } else {
                          locationHref = locationHref + '?mpId=' + mpId
                        }
                      }
                      let msg = {
                        client_id: authorization.client_id,
                        redirect_uri: encodeURIComponent(locationHref),
                        state: uuid(6, 16)
                      }
                      window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
                    })
                    break
                }
              }
            })
          } else {
            if (showMenuHead !== '' && redirectUri.indexOf('showMenuHead=') < 0){
              if (redirectUri.indexOf('?') > -1){
                redirectUri = redirectUri + '&showMenuHead=' + showMenuHead
              } else {
                redirectUri = redirectUri + '?showMenuHead=' + showMenuHead
              }
            }
            if (mpId !== '' && redirectUri.indexOf('mpId=') < 0){
              if (redirectUri.indexOf('?') > -1 ){
                redirectUri = redirectUri + '&mpId=' + mpId
              } else {
                redirectUri = redirectUri + '?mpId=' + mpId
              }
            }
            let msg = {
              client_id: authorization.client_id,
              redirect_uri: encodeURIComponent(redirectUri),
              state: uuid(6, 16)
            }
            window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
          }
        }
      }
    } else {
      if (authorMenuArray === null || to.meta.permission === null ||  to.meta.permission === undefined || !to.meta.permission){
        next()
        return;
      }
      if (to.meta.permission && authorMenuArray && authorMenuArray.length > 0 && (authorMenuArray.indexOf(toPath) > -1 || routeArr.indexOf(toPath) > -1 )){
         next()
      } else {
        if (to.matched != null && to.matched.length > 0 && to.matched[0].path ){
          next({
            path: to.matched[0].path
          })
        } else {
          next({
            path: authorization.redirect_uri
          })
        }
      }
    }
}
