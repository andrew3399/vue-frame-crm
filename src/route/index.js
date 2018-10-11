/**
 * 进入路由之前判断是否有token存在
 */
import LocalStorage from '../utils/localStorage.js'
import {getQuery, uuid} from '../utils/utils.js'
import {Base64} from 'js-base64'
import store from '../store/index.js'

export async function beforeEach (to, from, next, authorization, requestInstance, cb) {
  let routeArr = ['/res', '/cust', '/order', '/acct','/mks', '/rpt', '/prod', '/odp', '/base', '/']
  let localStorage = new LocalStorage()
  let sessionStorage = window.sessionStorage
  let accessToken = localStorage.get('access_token')
  let refreshToken = localStorage.get('refresh_token')
  let sessionTime = localStorage.get('session_time')
  let redirectUri = authorization.redirect_uri
  // 路由拦截 根据路由配置中meta.requireAuth判断是否需要登录
  let locationHref = window.location.href;
  locationHref = decodeURIComponent(locationHref)
  locationHref = locationHref.replace(/[?]{1}code=\w*[&]{1,}/g, '?');
  locationHref = locationHref.replace(/[?]{1}state=\w*[&]{1,}/g, '?');
  locationHref = locationHref.replace(/[?,&]{1,}code=\w*/g, '');
  locationHref = locationHref.replace(/[?,&]{1,}state=\w*/g, '');
  // 从EIP跳转过来的菜单需要携带参数信息
  console.log('======================= from ========================')
  console.log(from)
  console.log('======================= from end ========================')
  let fromQuery = from.query;
  let toAcd = to.query.acd;
  let fromShowMenuHead = fromQuery.showMenuHead;
  let fromMpId = fromQuery.mpId;
  if (toAcd && toAcd !== undefined && toAcd !== null){
    redirectUri = locationHref
  }
  if (toAcd && toAcd !== undefined && toAcd !== ''){
    if (toAcd === '1') {
      localStorage.remove('access_token')
      localStorage.remove('refresh_token')
      //localStorage.remove('session_time')
      sessionStorage.clear()
      to.query.acd = 0
      locationHref = locationHref.replace(/[&]{1}acd=\w*/g,'&acd=0')
      let msg = {
        client_id: authorization.client_id,
        redirect_uri: encodeURIComponent(locationHref),
        state: uuid(6, 16)
      }
      window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
      return
    } else if(toAcd === '0' && !accessToken){
      let tokenRes =  await  requestInstance.post(authorization.tokenUri + '?code=' + to.query.code + '&state=' + to.query.state +
        '&grant_type=authorization_code' + '&client_id=' + authorization.client_id + '&redirect_uri=' + encodeURIComponent(locationHref));
      let time = new Date().getTime() + 8 * 60 * 60 * 1000
      accessToken = tokenRes.data.access_token
      localStorage.set('access_token', accessToken, tokenRes.data.expires_in * 1000)
      refreshToken = tokenRes.data.refresh_token
      localStorage.set('refresh_token', refreshToken, Math.pow(2, 32))
      localStorage.set('session_time', time, 8 * 60 * 60 * 1000)
    }
  }
  console.log(' ================  locationHref :   ' + locationHref)
  let loginUserName = to.query.user
  if (loginUserName && loginUserName !== ''){
    sessionStorage.setItem('loginUserName',loginUserName)
  }
  let mustChangePage = false;
  let documentReferrer = document.referrer
  let apMenu = sessionStorage.getItem('apMenu')
  if (apMenu && apMenu === '0') {
    apMenu = to.query.apMenu
  }
  let fromMpType = fromQuery.mpType
  let fromMenuId = fromQuery.menuId
  console.log('======================= toApMenu =================')
  console.log(apMenu)
  console.log('======================= toApMenu end =================')
  if (fromMpType && fromMpType !== '' && fromMenuId && fromMenuId !== ''
    && !to.query.mpType && !to.query.menuId && (!apMenu || apMenu === '0')
    && routeArr.indexOf(to.path) < 0){
    to.query.mpType = fromMpType
    to.query.menuId = fromMenuId
    mustChangePage = true
  } else if(!to.query.mpType && !to.query.menuId && (!apMenu || apMenu === '0') && routeArr.indexOf(to.path) < 0){
    let referMpTypeQuery = documentReferrer.match(new RegExp('[\?\&]mpType=([^\&]+)', 'i'));
    let referMenuIdQuery = documentReferrer.match(new RegExp('[\?\&]menuId=([^\&]+)', 'i'));
    if (referMpTypeQuery && referMpTypeQuery !== '' && referMpTypeQuery.length
      && referMenuIdQuery && referMenuIdQuery !== '' && referMenuIdQuery.length){
      to.query.mpType = referMpTypeQuery[1]
      to.query.menuId = referMenuIdQuery[1]
      mustChangePage = true
    }
  }

  //去除切换参数
  locationHref = locationHref.replace(/[?]{1}apMenu=\w*[&]{1}/g, '?');
  locationHref = locationHref.replace(/[?,&]{1}apMenu=\w*/g, '');
  let showMenuHeadArray = ['1','2','3','4','5']
  if(fromShowMenuHead && fromShowMenuHead !== '' && !to.query.showMenuHead
        && showMenuHeadArray.indexOf(fromShowMenuHead) > -1){
    if ( fromMpId && fromMpId !== '' && !to.query.mpId) {
      to.query.mpId = fromMpId
    }
    to.query.showMenuHead = fromShowMenuHead
    mustChangePage = false
    next({
      path: to.path,
      query: to.query,
      params: to.params,
      meta: to.meta,
      name: to.name
    })
    return;
  } else if(!to.query.showMenuHead){
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
    if ( refShowMenuHead && refShowMenuHead !== '' &&  showMenuHeadArray.indexOf(refShowMenuHead) > -1 ){
      mustChangePage = false
      to.query.showMenuHead = refShowMenuHead
      if (refMpId && refMpId !== '' && !to.query.mpId){
        to.query.mpId = refMpId
      }
      next({
        path: to.path,
        query: to.query,
        params: to.params,
        meta: to.meta,
        name: to.name
      })
      return;
    }
  }
  if (mustChangePage){
    next({
      path: to.path,
      query: to.query,
      params: to.params,
      meta: to.meta,
      name: to.name
    })
    return

  }
  console.log('======================= to ========================')
  console.log(to)
  console.log('======================= to end ========================')
  //校验是否有菜单权限信息
  let authorMenuArray = JSON.parse(sessionStorage.getItem('authorMenuArray'))
  let toPath = to.path
  if (to.meta && to.meta.requireAuth ) {
    console.log('333333333333333333333333')
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
          if (showMenuHead !== '' && locationHref.indexOf('showMenuHead=') < 0 && showMenuHeadArray.indexOf(showMenuHead) > -1){
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
                      if (showMenuHead !== '' && locationHref.indexOf('showMenuHead=') < 0  && showMenuHeadArray.indexOf(showMenuHead) > -1){
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
            if (showMenuHead !== '' && redirectUri.indexOf('showMenuHead=') < 0  && showMenuHeadArray.indexOf(showMenuHead) > -1){
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
