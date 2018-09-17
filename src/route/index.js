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
  let accessToken = localStorage.get('access_token')
  let refreshToken = localStorage.get('refresh_token')
  let sessionTime = localStorage.get('session_time')
  // 路由拦截 根据路由配置中meta.requireAuth判断是否需要登录
  let locationHref = window.location.href;
  locationHref = locationHref.replace(/[?]{0,}code=\w*[&]{0,}/g, '');
  locationHref = locationHref.replace(/state=\w*[&]{0,}/g, '');
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
          if (showMenuHead !== ''){
            locationHref = locationHref + '&showMenuHead=' + showMenuHead
          }
          if (mpId !== ''){
            locationHref = locationHref + '&mpId=' + mpId
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
                      if (showMenuHead !== ''){
                        locationHref = locationHref + '&showMenuHead=' + showMenuHead
                      }
                      if (mpId !== ''){
                        locationHref = locationHref + '&mpId=' + mpId
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
            let redirectUri = authorization.redirect_uri
            if (showMenuHead !== ''){
              redirectUri = redirectUri + '&showMenuHead=' + showMenuHead
            }
            if (mpId !== ''){
              redirectUri = redirectUri + '&mpId=' + mpId
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
