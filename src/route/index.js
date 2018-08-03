/**
 * 进入路由之前判断是否有token存在
 */
import LocalStorage from '../utils/localStorage.js'
import {getQuery, uuid} from '../utils/utils.js'
import {Base64} from 'js-base64'
import store from '../store/index.js'

export function beforeEach (to, from, next, authorization, requestInstance, cb) {
  let localStorage = new LocalStorage()
  let accessToken = localStorage.get('access_token')
  let refreshToken = localStorage.get('refresh_token')
  let sessionTime = localStorage.get('session_time')
    // 面包屑信息
  // if (to.path) {
  //   requestInstance.post(authorization.parentMenuUri, {
  //     'url': to.path,
  //     'params': to.params
  //   }).then(function (ret) {
  //     if (ret.data.success) {
  //       let parthMenuArray = ret.data.result
  //       if (parthMenuArray != null && parthMenuArray.length > 0 && authorization.getStaffMenuFunc !== undefined) {
  //         let currentMenu = parthMenuArray[parthMenuArray.length - 1]
  //         requestInstance.post(authorization.getStaffMenuFunc, {
  //           menuId: currentMenu.menuId
  //         }).then(function (res) {
  //           if (res != null && res !== '') {
  //             store.state.staffMenuFunc = res.data
  //           }
  //         })
  //       }
  //       store.state.breadcrumbArr.splice(0, store.state.breadcrumbArr.length)
  //       store.state.breadcrumbArr = ret.data.result
  //     }
  //   })
  // }
    // 路由拦截 根据路由配置中meta.requireAuth判断是否需要登录
  let locationHref = 'http://localhost:8080/mks?code=ihMYfW&code=GGruhS&state=8C180F&state=4B44FA';
  locationHref = locationHref.replace(/[?]{0,}code=\w*[&]{0,}/g, '');
  locationHref = locationHref.replace(/state=\w*[&]{0,}/g, '');
  if (to.meta.requireAuth) {
    if (accessToken && refreshToken && sessionTime) {
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
          let msg = {
            client_id: authorization.client_id,
            redirect_uri: encodeURIComponent(locationHref),
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
