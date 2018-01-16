/**
 * 进入路由之前判断是否有token存在
 */
import LocalStorage from '../utils/localStorage.js'
import { getQuery, uuid } from '../utils/utils.js'
import { Base64 } from 'js-base64'

export function beforeEach (to, from, next, authorization, requestInstance, cb) {
  let localStorage = new LocalStorage()
  let accessToken = localStorage.get('access_token')
  let refreshToken = localStorage.get('refresh_token')
  let sessionTime = localStorage.get('session_time')
  // 路由拦截 根据路由配置中meta.requireAuth判断是否需要登录
  if (to.meta.requireAuth) {
    if (accessToken && refreshToken) {
      next()
    } else {
      let code = getQuery('code')
      let state = getQuery('state')
      if (code && state) {
        /**
         *  这里需要去请求token的值,并设置sessiion-time
         *  oauth2
         */
        // cb(code, state, next, localStorage, uuid(6, 16))
        requestInstance.post(authorization.tokenUri + '?code=' + code + '&state=' + state +
          '&grant_type=authorization_code' + '&client_id=' + authorization.client_id + '&redirect_uri=' + encodeURIComponent(authorization.redirect_uri))
        .then(res => {
          let time = new Date().getTime() + 30 * 60 * 1000
          localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
          localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
          localStorage.set('session_time', time, 30 * 60 * 1000)
          next()
        }).catch(res => {
          let msg = {
            client_id: authorization.client_id,
            redirect_uri: encodeURIComponent(authorization.redirect_uri),
            state: uuid(6, 16)
          }
          window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
          next()
        })
      } else {
        /**
         * 需要判断页面sessionTime是否生效，如果失效，需要重新去登录
         */
        if (sessionTime && !accessToken) {
          /**
           * 如果生效，且accessToken 失效，
           * 需要重新获取accessToken
           */
          requestInstance.post(authorization.tokenUri + '?grant_type=refresh_token' + '&refresh_token=' + refreshToken + '&scope=read', '', {
            headers: {
              Authorization: 'Basic ' + Base64.encode(authorization.client_id + ':' + authorization.clientSecret)
            }
          }).then(res => {
            localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
            // localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
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
                  }).catch(res => {
                    let msg = {
                      client_id: authorization.client_id,
                      redirect_uri: encodeURIComponent(authorization.redirect_uri),
                      state: uuid(6, 16)
                    }
                    window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
                  })
                  break
              }
            }
          })
        } else {
          let msg = {
            client_id: authorization.client_id,
            redirect_uri: encodeURIComponent(authorization.redirect_uri),
            state: uuid(6, 16)
          }
          window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
        }
      }
    }
  } else {
    next()
  }
}
