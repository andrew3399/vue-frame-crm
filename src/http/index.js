/**
 * 服务调用的拦截器，用于服务头添加token，及相关的逻辑判断
 */
import LocalStorage from '../utils/localStorage.js'
import { Base64 } from 'js-base64'
import { getQuery, uuid } from '../utils/utils.js'
// import { TModal } from 'aid-taurus-desktop'

let localStorage = new LocalStorage()

/***
  sessionTime 设置来实现单点登录设置
  1. 设置sessionTime的localStorage
  2. 设置全局的带有截流的click事件
  3. 如果sessionTime存在时，且accesstoken 不存在，需要重新取token，然后更新token
  4. 重新获取token 可在用户操作中直接请求
  4. 如果sessionTime不存在，重新登录
*/

export function requestInterceptor (config, authorization, tokenUri) {
  let accessToken = localStorage.get('access_token')
  let refreshToken = localStorage.get('refresh_token')
  // let sessionTime = localStorage.get('session-time')
  if (accessToken && refreshToken) {
    if (config.url && config.url.indexOf(tokenUri) !== -1) {
      config.headers.Authorization = 'Basic ' + Base64.encode(authorization.client_id + ':' + authorization.clientSecret)
    } else {
      config.headers.Authorization = 'Bearer ' + accessToken
    }
  } else {
    let code = getQuery('code')
    let state = getQuery('state')
    if (code && state) {
      config.headers.Authorization = 'Basic ' + Base64.encode(authorization.client_id + ':' + authorization.clientSecret)
    } else {
      let msg = {
        client_id: authorization.client_id,
        redirect_uri: encodeURIComponent(authorization.redirect_uri),
        state: uuid(6, 16)
      }
      window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
    }
  }

  return config
}

export function handleResponseError (error, authorization) {
  if (error.response) {
    switch (error.response.status) {
      /**
      * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
      */
      case 401:
        let accessToken = localStorage.get('access_token')
        let refreshToken = localStorage.get('refresh_token')
        let sessionTime = localStorage.get('session-time')
        if (!accessToken && !refreshToken) break
        /**
         * 此时需要加载判断
         */
        // if (!sessionTime) {
        //   TModal.error({
        //     content: '获取操作员信息异常，请重新登录',
        //     okText: '去登录',
        //     onOk: () => {
        //       let msg = {
        //         client_id: authorization.client_id,
        //         redirect_uri: encodeURIComponent(authorization.redirect_uri),
        //         state: uuid(6, 16)
        //       }
        //       window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
        //     }
        //   })
        // }
        break
    }
  }
}
