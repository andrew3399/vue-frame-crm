/**
 * 生成随机数的功能函数
 * @param {number} len
 * @param {number} radix
 */
export function uuid (len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
/**
 * 获取url内的参数
 * @param {String} name
 */
export function getQuery (name) {
  let result = window.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

/**
 * 先将数组转化成有序数组
 * json格式转树状结构
 * @param   {json}      json数据
 * @param   {String}    id的字符串
 * @param   {String}    父id的字符串
 * @param   {String}    children的字符串
 * @return  {Array}     数组
 */
export function transData (original, idField, pidField, childrenField, orderField) {
  if (original && original.length) {
    /* 做升序处理 Array.sort() */
    original.sort((a, b) => {
      return a[idField] - b[idField]
    })
  } else {
    return []
  }
  let result = []
  let hash = {}
  const id = idField
  const pid = pidField
  const children = childrenField
  const menuOrder = orderField
  let i = 0
  let j = 0
  let len = original.length
  /**
   * 第一层将对象数组转化成JSON数据
   */
  for (; i < len; i++) {
    if (!hash[original[i][id]] && original[i].treeDisplay === 'Y' && original[i].menuType !== '5' ) {
      hash[original[i][id]] = original[i]
    }
  }
  for (; j < len; j++) {
    let aVal = original[j]
    let hashVP = hash[aVal[pid]]
    if (hashVP && 'Y' === aVal.treeDisplay && aVal.menuType !== '5') {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(aVal)
      hashVP[children].sort((a, b) => {
        return a[menuOrder] - b[menuOrder]
      })
    } else if ('Y' === aVal.treeDisplay && aVal.menuType !== '5') {
      result.push(aVal)
    }
  }
  /* 做升序处理 */
  result.sort((a, b) => {
    return a[menuOrder] - b[menuOrder]
  })
  return result
}

/**
 * 拿到当前路由数据的总值.
 *
 * @param      {<array>}  original       The original
 * @param      {<string>}  idField        The identifier field
 * @param      {<string>}  pidField       The pid field
 * @param      {<type>}  childrenField  The children field
 */
export function getQueryData (original, idField, pidField, path, name) {
  if (original && original.length) {
    /* 做升序处理 */
    original.sort((a, b) => {
      return a[idField] - b[idField]
    })
  } else {
    return []
  }
  let hash = {}
  const id = idField
  const pid = pidField
  const fName = name
  let i = 0
  let len = original.length
  let fieldName = ''
  let names = []
  /**
   * 第一层将对象数组转化成JSON数据
   */
  for (; i < len; i++) {
    if (!hash[original[i][id]]) {
      hash[original[i][id]] = original[i]
    }
  }

  /* 将path的这一条数据找出来 */
  for (let k = 0; k < len; k++) {
    if (path === original[k].menuUrl) {
      fieldName = original[k][fName]
      let item = original[k]
      while (item !== null && item[pid] !== -1) {
        let tempPid = item[pid]
        let hashVP = hash[tempPid]
        if (hashVP) {
          names.push(hashVP[fName])
        }
        item = hashVP
      }
    }
  }

  return {
    name: fieldName,
    names: names
  }
}

/**
 * 先将数组转化成有序数组
 * json格式转树状结构
 * @param   {json}      json数据
 * @param   {String}    id的字符串
 * @param   {String}    父id的字符串
 * @param   {String}    children的字符串
 * @return  {Array}     数组
 */
export function transDataToJson (original, idField) {
  if (original && original.length) {
    /* 做升序处理 Array.sort() */
    original.sort((a, b) => {
      return a[idField] - b[idField]
    })
  } else {
    return {}
  }
  let hash = {}
  const id = idField
  let i = 0
  let j = 0
  let len = original.length
  /**
   * 第一层将对象数组转化成JSON数据
   */
  for (; i < len; i++) {
    if (!hash[original[i][id]]) {
      hash[original[i][id]] = original[i]
    }
    if (!hash[original[i]['menuUrl']]){
      hash[original[i]['menuUrl']] = original[i]
    }
  }
  return hash
}


/**
 * 先将数组转化成有序数组
 * json格式转树状结构
 * @param   {json}      json数据
 * @param   {String}    id的字符串
 * @param   {String}    父id的字符串
 * @param   {String}    children的字符串
 * @return  {Array}     数组
 */
export function translateMpMenuData (original, idField, pidField, childrenField, orderField) {
  if (original && original.length) {
    /* 做升序处理 Array.sort() */
    original.sort((a, b) => {
      return a[idField] - b[idField]
    })
  } else {
    return {}
  }
  let result = []
  let hash = {}
  const id = idField
  const pid = pidField
  const children = childrenField
  const menuOrder = orderField
  let i = 0
  let j = 0
  let len = original.length
  /**
   * 第一层将对象数组转化成JSON数据
   */
  for (; i < len; i++) {
    if (!hash[original[i][id]] && original[i].treeDisplay === 'Y' && original[i].menuType === '5') {
      hash[original[i][id]] = original[i]
    }
  }
  for (; j < len; j++) {
    let aVal = original[j]
    let hashVP = hash[aVal[pid]]
    if (hashVP && 'Y' === aVal.treeDisplay && aVal.menuType === '5') {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(aVal)
      hashVP[children].sort((a, b) => {
        return a[menuOrder] - b[menuOrder]
      })
    } else if ('Y' === aVal.treeDisplay && aVal.menuType === '5') {
      result.push(aVal)
    }
  }
  /**
   * 遍历结果 切换成对象的形式进行保存
   */
  let resultMap = {}
  for(let k = 0; k < result.length; k++){
    let tempResult = result[k]
    let menuKey = tempResult[pid]
    if (!resultMap[menuKey]) {
      resultMap[menuKey] = new Array()
    }
    resultMap[menuKey].push(tempResult)
    resultMap[menuKey].sort((a, b) => {
      return a[menuOrder] - b[menuOrder]
    })
    let tempMenuUrl = tempResult.menuUrl
    if (tempMenuUrl && tempMenuUrl.indexOf('?') >= 0) {
      tempMenuUrl = tempMenuUrl.substring(0,tempMenuUrl.indexOf('?'))
    }
  }
  return resultMap
}

