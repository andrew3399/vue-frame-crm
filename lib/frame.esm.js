(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = uuid;
exports.getQuery = getQuery;
exports.transData = transData;
exports.getQueryData = getQueryData;
function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  var i = void 0;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r = void 0;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

function getQuery(name) {
  var result = window.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
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
function transData(original, idField, pidField, childrenField) {
  if (original && original.length) {
    /* 做升序处理 */
    original.sort(function (a, b) {
      return a[idField] - b[idField];
    });
  } else {
    return [];
  }
  var result = [];
  var hash = {};
  var id = idField;
  var pid = pidField;
  var children = childrenField;
  var i = 0;
  var j = 0;
  var len = original.length;
  /**
   * 第一层将对象数组转化成JSON数据
   */
  for (; i < len; i++) {
    if (!hash[original[i][id]]) {
      hash[original[i][id]] = original[i];
    }
  }
  for (; j < len; j++) {
    var aVal = original[j];
    var hashVP = hash[aVal[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(aVal);
    } else {
      result.push(aVal);
    }
  }
  /* 做升序处理 */
  result.sort(function (a, b) {
    return a[idField] - b[idField];
  });
  return result;
}

/**
 * 拿到当前路由数据的总值.
 *
 * @param      {<array>}  original       The original
 * @param      {<string>}  idField        The identifier field
 * @param      {<string>}  pidField       The pid field
 * @param      {<type>}  childrenField  The children field
 */
function getQueryData(original, idField, pidField, path, name) {
  if (original && original.length) {
    /* 做升序处理 */
    original.sort(function (a, b) {
      return a[idField] - b[idField];
    });
  } else {
    return [];
  }
  var hash = {};
  var id = idField;
  var pid = pidField;
  var fName = name;
  var i = 0;
  var len = original.length;
  var fieldName = '';
  var names = [];
  /**
   * 第一层将对象数组转化成JSON数据
   */
  for (; i < len; i++) {
    if (!hash[original[i][id]]) {
      hash[original[i][id]] = original[i];
    }
  }

  /* 将path的这一条数据找出来 */
  for (var k = 0; k < len; k++) {
    if (path === original[k].menuUrl) {
      fieldName = original[k][fName];
      var item = original[k];
      while (item[pid] !== -1) {
        var hashVP = hash[original[k][pid]];
        if (hashVP) {
          names.push(hashVP[fName]);
        }
        item = hashVP;
      }
    }
  }

  return {
    name: fieldName,
    names: names
  };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this.storageProxy = window.localStorage;
    this.defaultLiftTime = 30 * 24 * 60 * 60 * 1000;
    this.keyCache = 'MVNO_KEY_TIMEOUT_MAP';
  }

  _createClass(Storage, [{
    key: 'init',
    value: function init() {
      if (!this.storageProxy) {
        throw new Error('not override storageProxy property');
      }
    }
    /*
      新增localstorage
      数据格式需要转化成string,所以先要判断数据的类型，所以需要转化成JSON.stringify、JSON.parse
      每一条存储的信息需要
    */

  }, {
    key: 'set',
    value: function set(key, value, expire) {
      var _that = this;
      key = typeof key !== 'string' ? String(key) : key;
      value = this.serializer(value, expire);
      if (!_that.isSupport()) {
        console.error("your brower doesn't support localStorage");
        return false;
      }
      try {
        _that.unEffectiveItem(); // 删除失效的localStorage
        this.storageProxy.setItem(key, value);
        var keyCode = this.storageProxy.getItem(this.keyCache);
        if (keyCode) {
          var keyArr = keyCode.split(',');
          var keySet = new Set(keyArr);
          keySet.add(key);
          this.storageProxy.setItem(this.keyCache, Array.from(keySet).join(','));
        } else {
          this.storageProxy.setItem(this.keyCache, key);
        }
      } catch (e) {
        if (_that.isQuotaExceeded(e)) {
          console.error('Not enough storage is available to complete this operation.');
        }
      }
    }
  }, {
    key: 'get',
    value: function get(key) {
      key = typeof key !== 'string' ? String(key) : key;
      var cacheItem = this.storageProxy.getItem(key);
      if (cacheItem) {
        try {
          cacheItem = this.unSerializer(this.storageProxy.getItem(key));
        } catch (e) {
          return null;
        }
      }
      var _now = new Date().getTime();
      if (cacheItem && _now < new Date(cacheItem.t).getTime()) {
        return cacheItem.v;
      } else {
        this.remove(key);
      }
      return null;
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var localStorages = [];
      var _that = this;
      if (!this.storageProxy && !this.storageProxy.length) return '';
      var keys = Object.keys(this.storageProxy);
      keys.forEach(function (k) {
        var n = {};
        var cacheItem = _that.unSerializer(_that.storageProxy[k]);
        n.id = k;
        n.st = cacheItem.st;
        n.v = cacheItem.v;
        localStorages.push(n);
      });
      return localStorages;
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      key = typeof key !== 'string' ? String(key) : key;
      this.storageProxy.removeItem(key);
    }
  }, {
    key: 'unEffectiveItem',
    value: function unEffectiveItem() {
      var _now = new Date().getTime();
      var _that = this;
      if (!_that.storageProxy && !_that.storageProxy.length) return;
      var keyCode = this.storageProxy.getItem(this.keyCache);
      var keys = keyCode ? keyCode.split(',') : [];
      if (keys && keys.length) {
        keys.forEach(function (key) {
          var cacheItem = _that.unSerializer(_that.storageProxy[key]);
          if (cacheItem && _now > new Date(cacheItem.t).getTime()) _that.remove(key);
        });
      }
    }
  }, {
    key: 'isSupport',
    value: function isSupport() {
      var _supported = false;
      var _that = this;
      if (this.storageProxy && this.storageProxy.setItem) {
        _supported = true;
        var _key = '__' + Math.round(Math.random() * 1e7);
        _that.storageProxy.setItem(_key, _that.keyCache);
        _that.storageProxy.removeItem(_key);
      }

      return _supported;
    }
  }, {
    key: 'isQuotaExceeded',
    value: function isQuotaExceeded(e) {
      var _isQuotaExceeded = false;
      if (e) {
        if (e.code) {
          // storage full
          switch (e.code) {
            case 22:
              _isQuotaExceeded = true;
              break;
            case 1014:
              /*
                  for Firefox
                  {
                    code: 1014,
                    name: 'NS_ERROR_DOM_QUOTA_REACHED',
                    message: 'Persistent storage maximum size reached',
                    // …
                  }
              */
              if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                _isQuotaExceeded = true;
              }
              break;
          }
        } else if (e.number === -2147024882) {
          /*
              lt IE8, there is no code in return message
              {
                  number: -2147024882,
                  message: 'Not enough storage is available to complete this operation.',
                  // …
              }
          */
          _isQuotaExceeded = true;
        }
      }

      return _isQuotaExceeded;
    }
  }, {
    key: 'serializer',
    value: function serializer(value, expire) {
      var _now = new Date().getTime();
      expire = expire || this.defaultLiftTime;
      var _expires = typeof expire === 'number' ? new Date(_now + expire) : typeof expire === 'string' ? new Date(expire) : new Date();
      var _val = {};
      _val.v = value;
      _val.t = _expires;
      _val.st = new Date().getTime();
      return this.handleJSON(_val);
    }
  }, {
    key: 'unSerializer',
    value: function unSerializer(obj) {
      if (!obj) return '';
      return JSON.parse(obj);
    }
  }, {
    key: 'handleJSON',
    value: function handleJSON(obj) {
      var _type = this.getType(obj);
      var _result = '';
      switch (_type) {
        case 'boolean':
        case 'function':
        case 'undefined':
        case 'null':
          console.error('obj type(boolean | function | undefined | null) is illegal');
          break;
        default:
          _result = JSON.stringify(obj);
          break;
      }
      return _result;
    }
  }, {
    key: 'getType',
    value: function getType(obj) {
      var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Data]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
      };

      if (obj instanceof window.Element) {
        return 'element';
      }

      return map[Object.prototype.toString.call(obj)];
    }
  }]);

  return Storage;
}();

exports.default = Storage;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * $Id: base64.js,v 2.15 2014/04/05 12:58:57 dankogai Exp dankogai $
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */

(function(global) {
    'use strict';
    // existing version for noConflict()
    var _Base64 = global.Base64;
    var version = "2.3.2";
    // if node.js, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        try {
            buffer = __webpack_require__(22).Buffer;
        } catch (err) {}
    }
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                                + fromCharCode(0x80 | (cc & 0x3f)))
                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                   + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                   + fromCharCode(0x80 | ( cc         & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                    + fromCharCode(0x80 | ( cc         & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
        chars = [
            b64chars.charAt( ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b);
    } : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ?
        buffer.from && buffer.from !== Uint8Array.from ? function (u) {
            return (u.constructor === buffer.constructor ? u : buffer.from(u))
                .toString('base64')
        }
        :  function (u) {
            return (u.constructor === buffer.constructor ? u : new  buffer(u))
                .toString('base64')
        }
        : function (u) { return btoa(utob(u)) }
    ;
    var encode = function(u, urisafe) {
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function(u) { return encode(u, true) };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function(cccc) {
        switch(cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                |    ((0x3f & cccc.charCodeAt(1)) << 12)
                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
                |     (0x3f & cccc.charCodeAt(3)),
            offset = cp - 0x10000;
            return (fromCharCode((offset  >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
        case 3:
            return fromCharCode(
                ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    |  (0x3f & cccc.charCodeAt(2))
            );
        default:
            return  fromCharCode(
                ((0x1f & cccc.charCodeAt(0)) << 6)
                    |  (0x3f & cccc.charCodeAt(1))
            );
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function(cccc) {
        var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
        chars = [
            fromCharCode( n >>> 16),
            fromCharCode((n >>>  8) & 0xff),
            fromCharCode( n         & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var atob = global.atob ? function(a) {
        return global.atob(a);
    } : function(a){
        return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
    var _decode = buffer ?
        buffer.from && buffer.from !== Uint8Array.from ? function(a) {
            return (a.constructor === buffer.constructor
                    ? a : buffer.from(a, 'base64')).toString();
        }
        : function(a) {
            return (a.constructor === buffer.constructor
                    ? a : new buffer(a, 'base64')).toString();
        }
        : function(a) { return btou(atob(a)) };
    var decode = function(a){
        return _decode(
            String(a).replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64;
    };
    // export Base64
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    // if ES5 is available, make Base64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function(v){
            return {value:v,enumerable:false,writable:true,configurable:true};
        };
        global.Base64.extendString = function () {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function () {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function (urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function () {
                    return encode(this, true)
                }));
        };
    }
    //
    // export Base64 to the namespace
    //
    if (global['Meteor']) { // Meteor.js
        Base64 = global.Base64;
    }
    // module.exports and AMD are mutually exclusive.
    // module.exports has precedence.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports.Base64 = global.Base64;
    }
    else if (true) {		
        // AMD. Register as an anonymous module.	
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){ return global.Base64 }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    // that's it!
})(   typeof self   !== 'undefined' ? self
    : typeof window !== 'undefined' ? window
    : typeof global !== 'undefined' ? global
    : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v2.5.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (false) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (false) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (false) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (false) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (false) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    false
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (false) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (false) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (false) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (false) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (false) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (false) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (false) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.5.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_INSTANCE = exports.SET_INSTANCE = 'setInstance';
var SET_AUTHORIZATION = exports.SET_AUTHORIZATION = 'setAuthorization';

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeModule = exports.views = exports.locals = exports.httpHandle = exports.route = exports.TFrame = undefined;

var _frame = __webpack_require__(12);

var _frame2 = _interopRequireDefault(_frame);

var _route = __webpack_require__(18);

var route = _interopRequireWildcard(_route);

var _http = __webpack_require__(13);

var httpHandle = _interopRequireWildcard(_http);

var _locals = __webpack_require__(15);

var locals = _interopRequireWildcard(_locals);

var _notices = __webpack_require__(17);

var _notices2 = _interopRequireDefault(_notices);

var _store = __webpack_require__(19);

var _store2 = _interopRequireDefault(_store);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import EventHub from './eventHub'

var TFrame = function TFrame(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Vue.component(_frame2.default.name, _frame2.default);
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  TFrame(window.Vue);
}

exports.TFrame = TFrame;
exports.route = route;
exports.httpHandle = httpHandle;
exports.locals = locals;
exports.views = _notices2.default;
exports.storeModule = _store2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import SessionStorage from '../utils/sessionStorage.js'


var _clickoutside = __webpack_require__(11);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

var _localStorage = __webpack_require__(1);

var _localStorage2 = _interopRequireDefault(_localStorage);

var _utils = __webpack_require__(0);

var _constant = __webpack_require__(5);

var Constant = _interopRequireWildcard(_constant);

var _vuex = __webpack_require__(4);

var _jsBase = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import EventHub from '../eventHub'
// let sessionStorage = new SessionStorage ()
var localStorage = new _localStorage2.default();

var timeout = null;

var throttle = function throttle(func, wait, options) {
	var context = void 0;
	var args = void 0;
	var result = void 0;
	// 上次执行时间点
	var previous = 0;
	if (!options) options = {};
	// 延迟执行函数
	var later = function later() {
		// 若设定了开始边界不执行选项，上次执行时间始终为0
		previous = options.leading === false ? 0 : new Date().getTime();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function () {
		var now = new Date().getTime();
		// 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
		if (!previous && options.leading === false) previous = now;
		// 延迟执行时间间隔
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		// 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
		// remaining大于时间窗口wait，表示客户端系统时间被调整过
		if (remaining <= 0 || remaining > wait) {
			clearTimeout(timeout);
			timeout = null;
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
			// 如果延迟执行不存在，且没有设定结尾边界不执行选项
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};

exports.default = {
	name: 'TFrame',
	props: {
		img: {
			type: String
		},
		imgMin: {
			type: String
		},
		// logo 路由
		logoRouter: {
			type: Object,
			default: function _default() {
				return {
					path: '/'
				};
			}
		},
		// 当前展开的menu
		activeMenu: {
			type: [String, Number]
		},
		openNames: {
			type: [Array]
		},
		/**
   * 渲染menu菜单
   * {
   * 	iconType, 一级菜单的右侧icon的type，对应的是aidesign的图标库
   * 	name, 当前菜单的名称
   * 	path, 路由的path对象
   * 	link  非本项目的链接
   * }
   */
		menuList: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		/**
   * 渲染头部menu
   * {
   * 	type, 'icon'| 'dropdown' | 'avatar'
   * 	icon, 图标icon的type，对应的是aidesign的图标库
   * 	children, 如果是dropdown时需要提供dropdownitem
   * }
   */
		navs: {
			type: Array,
			default: []
		},
		/**
   * 服务调用实例
   */
		instance: {
			type: Function
		},
		/**
   * 登录相关的设置
   */
		authorization: {
			type: Object
		},
		/**
   * 当前服务的
   */
		tag: {
			type: String
		}
	},
	data: function data() {
		return {
			isOpen: true,
			isOpenOnMinWin: true,
			openPosition: 'down',
			clientWidth: 1200,
			showMenu: true,
			needBackDrop: false,
			hideSlip: true,
			hideSlideWrapSlip: true,
			accordion: true,
			isActive: 0,
			menu: [],
			count: 10,
			notices: [],
			queryActiveMenu: '',
			queryOpenName: [],
			lang: 'EN'
		};
	},

	computed: {
		treeData: function treeData() {
			if (this.menuList && this.menuList.length) {
				return this.menuList;
			} else if (this.menu && this.menu.length) {
				return this.menu;
			}
			return [];
		},
		ins: function ins() {
			this.setInstance(this.instance);
			return this.instance;
		},
		auth: function auth() {
			this.setAuthorization(this.authorization);
			return this.authorization;
		}
	},
	directives: {
		ClickoutSide: _clickoutside2.default
	},
	filters: {
		format: function format(param) {
			if (!param || param < 0) return '';
			var crt = new Date(param);
			function Format(format) {
				var fmt = format;
				if (!fmt) fmt = 'yyyy/MM/dd HH:mm:ss';
				var o = {
					"M+": crt.getMonth() + 1, //月份
					"d+": crt.getDate(), //日
					"h+": crt.getHours(), //小时
					"m+": crt.getMinutes(), //分
					"s+": crt.getSeconds(), //秒
					"q+": Math.floor((crt.getMonth() + 3) / 3), //季度
					"S": crt.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (crt.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o) {
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}return fmt;
			}

			return Format('yyyy/MM/dd');
		}
	},
	methods: _extends({
		/* 消息点击触发 */
		handleNoticeClick: function handleNoticeClick(index, item) {
			this.isActive = index;
			// this.hideSlideWrapSlip = false
			this.hideSlip = true;
			var bulletinId = item.bulletinId;
			this.$router.push({ name: 'notice', params: { bulletinId: bulletinId } });
			// this.$router.push({ path: `/notice/${item.bulletinId}` })
			// this.$router.push({ path: '/notice', query: { bulletinId: item.bulletinId } })
		},

		/* 页面存在点击操作、keyUp操作, 将sessionTime更新 */
		handleRefreshSessionTime: function handleRefreshSessionTime(that) {
			/**
    *  在存数据之前需要判断一下当前 sessionTime 是否生效
    *  如果已经失效，则不需要存数据
    *  如果没失效，这里需要判断accsstoken 是否存在，不存在的话，需要重新请求token
    */
			var accessToken = localStorage.get('access_token');
			var refreshToken = localStorage.get('refresh_token');
			var sessionTime = localStorage.get('session-time');
			var currentTime = new Date().getTime();
			/**
    * sessionTime 存在,需要重新设置sessiontime的过期时间
    */
			if (sessionTime) {
				var time = new Date().getTime() + 30 * 60 * 1000;
				throttle(function () {
					localStorage.set('session-time', time, 30 * 60 * 1000);
				}, 5 * 1000, { leading: false, trailing: true })();
				/**
     * accessToken 不存在，需要根据refreshToken，获取并设置accessToken、refreshToken
     */
				if (!accessToken) {
					that.instance.post(that.authorization.tokenUri + '?grant_type=refresh_token' + '&refresh_token=' + encodeURIComponent(refreshToken) + '&scope=read').then(function (res) {
						localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000);
						localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32));
					});
				}
			} else {
				var alink = document.createElement('a');
				alink.href = window.location.href;
				var path = alink.pathname.replace(/^([^\/])/, '/$1');
				localStorage.set('aid-path', decodeURIComponent(path));
				// let msg = {
				//      client_id: that.authorization.client_id,
				//      redirect_uri: encodeURIComponent(window.location.href),
				//      state: uuid(6, 16)
				//    }
				//    window.location.href = that.authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
				that.logoutAndRemoveSession();
			}
		},

		/* 加载更多 */
		loadingMore: function loadingMore() {
			this.hideSlip = true;
			this.$router.push({ name: 'notice-list' });
		},
		handleClickClose: function handleClickClose() {
			this.hideSlideWrapSlip = true;
		},

		/* 点击图标触发 */
		handleLogout: function handleLogout(item) {
			if (item && item.handleType && item.handleType === 'logout') {
				/* 登出 */
				this.logoutAndRemoveSession();
			}
		},
		logoutAndRemoveSession: function logoutAndRemoveSession() {
			localStorage.remove('access_token');
			localStorage.remove('refresh_token');
			localStorage.remove('session-time');
			window.location.href = this.authorization.logout_uri;
		},
		closeMenuOnMinWin: function closeMenuOnMinWin() {
			this.isOpenOnMinWin = true;
		},
		openOrClose: function openOrClose() {
			this.isOpen = !this.isOpen;
			this.isOpenOnMinWin = false;
			if (this.clientWidth >= 1200 && !this.isOpen) {
				this.openPosition = 'right';
			} else {
				this.openPosition = 'down';
			}

			if (this.clientWidth >= 1200 && !this.isOpen) {
				this.showMenu = false;
			} else {
				this.showMenu = true;
			}
		},
		hdMenuClick: function hdMenuClick(name) {
			this.$emit('menu-click', name);
		},
		handleNavSelect: function handleNavSelect(name) {
			this.$emit('nav-menu-click', name);
		},
		getMenu: function getMenu(item) {
			this.$emit('on-click', item);
		},
		showSlipbox: function showSlipbox() {
			this.hideSlip = false;
		},
		hideSlipbox: function hideSlipbox() {
			this.hideSlip = true;
		},
		_ischild: function _ischild(child) {
			while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
				if (child === this.$el) {
					return true;
				}
				child = child.parentNode;
			}
			return false;
		},
		_isChildNode: function _isChildNode(child, parent) {
			while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
				if (child === this.$el.getElementsByClassName(parent)[0]) {
					return true;
				}
				child = child.parentNode;
			}
			return false;
		},
		handleClickoutSide: function handleClickoutSide(e) {
			if (this._ischild(e.target) && (!e.target.classList.contains('slipbox__content') || !this._isChildNode(e.target, 'slipbox__content')) && !this._isChildNode(e.target, 'slide-wrap-content')) {
				this.hideSlipbox();
				return true;
			}
			return false;
		},

		/* 切换语言 */
		handleChangeLang: function handleChangeLang() {
			var _this = this;

			if (this.lang === 'EN') {
				this.lang = 'CN';
				localStorage.set('aid-language', 'en-US');
				this.$i18n.locale = 'en-US';
			} else if (this.lang === 'CN') {
				this.lang = 'EN';
				localStorage.set('aid-language', 'zh-CN');
				this.$i18n.locale = 'zh-CN';
			}
			this.instance.post(this.authorization.changeLangUri, {
				language: this.lang === 'CN' ? 'en' : 'zh'
			}).then(function (res) {
				window.location.reload();
			}).catch(function (res) {
				/**
     * 处理相关错误的问题
     */
				if (res) {
					switch (res.status) {
						/**
       * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
       */
						case 401:
							var that = _this;
							var title = _this.$t('frame.systemInfo');
							var content = _this.$t('frame.systemInfoContent');
							_this.$Modal.warning({
								title: title,
								content: content,
								onOk: function onOk() {
									var accessToken = localStorage.get('access_token');
									var refreshToken = localStorage.get('refresh_token');
									if (!accessToken || !refreshToken) return;
									var msg = {
										client_id: that.authorization.client_id,
										redirect_uri: encodeURIComponent(that.authorization.redirect_uri),
										state: (0, _utils.uuid)(6, 16)
									};
									window.location.href = that.authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state;
								}
							});
							break;
					}
				}
			});
		},

		/* 跳出当前域，并将其 path 保存下来 */
		handleOtherRegin: function handleOtherRegin(url) {
			var alink = document.createElement('a');
			alink.href = url;
			var path = alink.pathname.replace(/^([^\/])/, '/$1');
			// localStorage.set('aid-path', path)
			window.location.href = url + '?path=' + path;
		}
	}, (0, _vuex.mapMutations)(['setInstance', 'setAuthorization'])),
	created: function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var _this2 = this;

			var path, routeArr, that, accessToken, refreshToken, fetchLang;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							/* 用于监测传过来的path */
							path = (0, _utils.getQuery)('path') || this.$route.path;
							routeArr = ['/res', '/cust', '/order', '/acct', '/'];

							if (path && !routeArr.includes(decodeURIComponent(path))) {
								localStorage.set('aid-path', decodeURIComponent(path));
							}
							/**
        * 用于监测用户点击和输入行为
        */
							that = this;

							document.body.onclick = function () {
								that.handleRefreshSessionTime(that);
							};
							document.body.onkeyup = function () {
								that.handleRefreshSessionTime(that);
							};
							// let path = getQuery('path')
							// localStorage.set('aid-path', path, 5 * 60 * 1000)
							accessToken = localStorage.get('access_token');
							refreshToken = localStorage.get('refresh_token');

							if (!(!accessToken || !refreshToken)) {
								_context.next = 10;
								break;
							}

							return _context.abrupt('return');

						case 10:
							if (!(this.menuList && this.menuList.length)) {
								_context.next = 12;
								break;
							}

							return _context.abrupt('return');

						case 12:
							_context.next = 14;
							return this.instance.get(this.authorization.langUri);

						case 14:
							fetchLang = _context.sent;

							if (fetchLang.data === 'zh') {
								this.lang = 'EN';
								localStorage.set('aid-language', 'zh-CN');
								this.$i18n.locale = 'zh-CN';
							} else if (fetchLang.data === 'en') {
								this.lang = 'CN';
								localStorage.set('aid-language', 'en-US');
								this.$i18n.locale = 'en-US';
							}

							// 获取menu数据
							this.instance.get(this.authorization.menuUri, {
								params: {
									language: fetchLang.data
								}
							}).then(function (res) {
								_this2.menu = (0, _utils.transData)(res.data, 'menuId', 'menuPid', 'children');
								/**
         * 设置自动展开
         */
								_this2.$nextTick(function () {
									var route = localStorage.get('aid-path') || _this2.$route.path || (0, _utils.getQuery)('path') || '/';
									var queryName = (0, _utils.getQueryData)(res.data, 'menuId', 'menuPid', decodeURIComponent(route), 'menuName');
									_this2.queryActiveMenu = queryName.name;
									_this2.queryOpenName = queryName.names;
									var routeArr2 = ['/res', '/cust', '/order', '/acct', '/'];
									if (route && !routeArr2.includes(decodeURIComponent(path))) {
										_this2.$router.push({ path: decodeURIComponent(route) });
										localStorage.remove('aid-path');
									}
								});
								/**
         * 先找出这一条数据，并将其 menuName 组成一个数组
         */
							}).catch(function (res) {
								/**
         * 处理相关错误的问题
         */
								if (res) {
									switch (res.status) {
										/**
          * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
          */
										case 401:
											/**
            * 增加错误判断，避免无限刷新
            */
											// let invalidCount = localStorage.get('token-invalid')
											// localStorage.set('token-invalid', parseInt(invalidCount) + 1)
											var _that = _this2;
											var title = _this2.$t('frame.systemInfo');
											var content = _this2.$t('frame.systemInfoContent');
											_this2.$Modal.warning({
												title: title,
												content: content,
												onOk: function onOk() {
													var accessToken = localStorage.get('access_token');
													var refreshToken = localStorage.get('refresh_token');
													if (!accessToken || !refreshToken) return;
													var msg = {
														client_id: _that.authorization.client_id,
														redirect_uri: encodeURIComponent(_that.authorization.redirect_uri),
														state: (0, _utils.uuid)(6, 16)
													};
													window.location.href = _that.authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state;
												}
											});
											break;
									}
								}
							});

							/* 获取10个最新的消息列表 */
							this.instance.get(this.authorization.bulletinListUri, {
								params: {
									pageNo: 1,
									pageSize: 10
								}
							}).then(function (res) {
								_this2.notices = res.data.result;
							}).catch(function (res) {
								/**
         * 处理相关错误的问题
         */
								if (res) {
									switch (res.status) {
										/**
          * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
          */
										case 401:
											var _that2 = _this2;
											var title = _this2.$t('frame.systemInfo');
											var content = _this2.$t('frame.systemInfoContent');
											_this2.$Modal.warning({
												title: title,
												content: content,
												onOk: function onOk() {
													var accessToken = localStorage.get('access_token');
													var refreshToken = localStorage.get('refresh_token');
													if (!accessToken || !refreshToken) return;
													var msg = {
														client_id: _that2.authorization.client_id,
														redirect_uri: encodeURIComponent(_that2.authorization.redirect_uri),
														state: (0, _utils.uuid)(6, 16)
													};
													window.location.href = _that2.authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state;
												}
											});
											break;
									}
								}
							});

						case 18:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function created() {
			return _ref.apply(this, arguments);
		}

		return created;
	}(),
	mounted: function mounted() {
		var _this3 = this;

		/* 设置 */
		this.$nextTick(function () {
			_this3.setInstance(_this3.instance);
			_this3.setAuthorization(_this3.authorization);
		});
		var that = this;
		var clientWidth = document.body.clientWidth || document.body.offsetWidth;
		that.clientWidth = clientWidth;
		if (this.clientWidth < 1200) {
			this.openPosition = 'down';
		}
		if (that.clientWidth >= 1200 && !that.isOpen) {
			that.showMenu = false;
		} else {
			that.showMenu = true;
		}
		window.addEventListener('resize', function () {
			var clientWidth = document.body.clientWidth || document.body.offsetWidth;
			that.clientWidth = clientWidth;
			if (that.clientWidth < 1200) {
				that.openPosition = 'down';
			}

			if (that.clientWidth >= 1200 && !that.isOpen) {
				that.showMenu = false;
			} else {
				that.showMenu = true;
			}
		});
	}
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _utils = __webpack_require__(0);

var _vuex = __webpack_require__(4);

exports.default = {
    data: function data() {
        return {
            total: 0,
            pageSize: 10,
            sizerRange: [10, 15, 20, 50],
            pageNo: 1,
            items: []
        };
    },

    filters: {
        format: function format(param) {
            if (!param || param < 0) return '';
            var crt = new Date(param);
            function Format(format) {
                var fmt = format;
                if (!fmt) fmt = 'yyyy/MM/dd HH:mm:ss';
                var o = {
                    "M+": crt.getMonth() + 1, //月份
                    "d+": crt.getDate(), //日
                    "h+": crt.getHours(), //小时
                    "m+": crt.getMinutes(), //分
                    "s+": crt.getSeconds(), //秒
                    "q+": Math.floor((crt.getMonth() + 3) / 3), //季度
                    "S": crt.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (crt.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }return fmt;
            }

            return Format('yyyy/MM/dd hh:mm:ss');
        }
    },
    computed: _extends({}, (0, _vuex.mapState)({
        instance: function instance(state) {
            return state.storeModule.instance;
        },
        authorization: function authorization(state) {
            return state.storeModule.authorization;
        }
    })),
    methods: {
        navToDetail: function navToDetail(item) {
            var bulletinId = item.bulletinId;
            this.$router.push({ name: 'notice', params: { bulletinId: bulletinId } });
            // this.$router.push({ path: `notice/${item.bulletinId}` })
            // this.$router.push({ path: '/notice', query: { bulletinId: item.bulletinId } })
        },
        handleOnPagerChange: function handleOnPagerChange(item) {
            this.pageNo = item;
            this.getBulletinList();
        },
        handleOnPagerSizeChange: function handleOnPagerSizeChange(item) {
            this.pageSize = item;
            this.pageNo = 1;
            this.getBulletinList();
        },
        getBulletinList: function getBulletinList(params) {
            var _this = this;

            this.$nextTick(function () {
                _this.instance.get(_this.authorization.bulletinListUri, {
                    params: {
                        pageNo: _this.pageNo,
                        pageSize: _this.pageSize
                    }
                }).then(function (res) {
                    var data = res.data;
                    _this.total = data.count;
                    _this.pageSize = data.pageSize;
                    _this.pageNo = data.pageNo;
                    if (data.result && data.result.length) {
                        _this.items = data.result.sort(function (a, b) {
                            return parseInt(a.topFlag) - parseInt(b.topFlag);
                        });
                    }
                }).catch(function (res) {
                    _this.$Message.warning(_this.$t('frame.warning'));
                });
            });
        }
    },
    mounted: function mounted() {
        var _this2 = this;

        /**
         * 等待首次加载生效
         */
        setTimeout(function () {
            _this2.getBulletinList();
        }, 300);
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _utils = __webpack_require__(0);

var _vuex = __webpack_require__(4);

exports.default = {
	data: function data() {
		return {
			bullet: {}
		};
	},

	filters: {
		format: function format(param) {
			if (!param || param < 0) return '';
			var crt = new Date(param);
			function Format(format) {
				var fmt = format;
				if (!fmt) fmt = 'yyyy/MM/dd HH:mm:ss';
				var o = {
					"M+": crt.getMonth() + 1, //月份
					"d+": crt.getDate(), //日
					"h+": crt.getHours(), //小时
					"m+": crt.getMinutes(), //分
					"s+": crt.getSeconds(), //秒
					"q+": Math.floor((crt.getMonth() + 3) / 3), //季度
					"S": crt.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (crt.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o) {
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}return fmt;
			}

			return Format('yyyy/MM/dd hh:mm:ss');
		}
	},
	computed: _extends({}, (0, _vuex.mapState)({
		instance: function instance(state) {
			return state.storeModule.instance;
		},
		authorization: function authorization(state) {
			return state.storeModule.authorization;
		}
	})),
	watch: {
		'$route': function $route(to, from) {
			// 对路由变化作出响应...
			this.getBulletinById();
		}
	},
	methods: {
		getBulletinById: function getBulletinById() {
			var _this = this;

			var bulletinId = this.$route.params.bulletinId || (0, _utils.getQuery)('bulletinId');
			this.instance.get(this.authorization.bulletinByIdUri, {
				params: {
					bulletinId: bulletinId
				}
			}).then(function (res) {
				_this.bullet = res.data;
			}).catch(function (res) {
				_this.$Message.warning(_this.$t('frame.warning'));
			});
		}
	},
	mounted: function mounted() {
		var _this2 = this;

		/**
   * 做延时处理
   */
		setTimeout(function () {
			_this2.getBulletinById();
		}, 300);
	}
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  bind: function bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }

    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler, true);
  },
  update: function update() {},
  unbind: function unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _frame = __webpack_require__(28);

var _frame2 = _interopRequireDefault(_frame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _frame2.default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestInterceptor = requestInterceptor;
exports.handleResponseError = handleResponseError;

var _localStorage = __webpack_require__(1);

var _localStorage2 = _interopRequireDefault(_localStorage);

var _jsBase = __webpack_require__(2);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { TModal } from 'aid-taurus-desktop'

var localStorage = new _localStorage2.default();

/***
  sessionTime 设置来实现单点登录设置
  1. 设置sessionTime的localStorage
  2. 设置全局的带有截流的click事件
  3. 如果sessionTime存在时，且accesstoken 不存在，需要重新取token，然后更新token
  4. 重新获取token 可在用户操作中直接请求
  4. 如果sessionTime不存在，重新登录
*/

/**
 * 服务调用的拦截器，用于服务头添加token，及相关的逻辑判断
 */
function requestInterceptor(config, authorization, tokenUri) {
  var accessToken = localStorage.get('access_token');
  var refreshToken = localStorage.get('refresh_token');
  // let sessionTime = localStorage.get('session-time')
  if (accessToken && refreshToken) {
    if (config.url && config.url.indexOf(tokenUri) !== -1) {
      config.headers.Authorization = 'Basic ' + _jsBase.Base64.encode(authorization.client_id + ':' + authorization.clientSecret);
    } else {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
  } else {
    var code = (0, _utils.getQuery)('code');
    var state = (0, _utils.getQuery)('state');
    if (code && state) {
      config.headers.Authorization = 'Basic ' + _jsBase.Base64.encode(authorization.client_id + ':' + authorization.clientSecret);
    } else {
      var msg = {
        client_id: authorization.client_id,
        redirect_uri: encodeURIComponent(authorization.redirect_uri),
        state: (0, _utils.uuid)(6, 16)
      };
      window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state;
    }
  }

  return config;
}

function handleResponseError(error, authorization) {
  if (error.response) {
    switch (error.response.status) {
      /**
      * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
      */
      case 401:
        var accessToken = localStorage.get('access_token');
        var refreshToken = localStorage.get('refresh_token');
        var sessionTime = localStorage.get('session-time');
        if (!accessToken && !refreshToken) break;
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
        break;
    }
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  frame: {
    sysInform: 'System Informs',
    loadingMore: 'Loading more ...',
    doc: 'Detail docs',
    warning: 'The server is busy, please try again later ...',
    top: 'Top',
    expiryDate: 'Expiry Date',
    to: 'to',
    relatedFiles: 'Related Files',
    home: 'Home',
    list: 'Notice List',
    title: 'Notice List',
    listDetail: 'Notice Detail',
    systemInfo: 'System Info',
    systemInfoContent: 'Your token is invalid, please try login again'
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.US = exports.CN = undefined;

var _zhCN = __webpack_require__(16);

var _zhCN2 = _interopRequireDefault(_zhCN);

var _enUS = __webpack_require__(14);

var _enUS2 = _interopRequireDefault(_enUS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CN = _zhCN2.default;
exports.US = _enUS2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  frame: {
    sysInform: '系统消息',
    loadingMore: '加载更多...',
    doc: '详细文档',
    warning: '服务器繁忙，请稍后再试 ...',
    top: '置顶',
    expiryDate: '有效周期',
    to: '至',
    relatedFiles: '相关附件',
    home: '首页',
    list: '消息列表',
    title: '消息列表',
    listDetail: '消息详情',
    systemInfo: '系统消息',
    systemInfoContent: '您的token已失效，请尝试重新登录！'
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  path: 'notice/:bulletinId',
  name: 'notice',
  component: __webpack_require__(30),
  meta: {
    requireAuth: true
  }
}, {
  path: '',
  name: 'notice-list',
  component: __webpack_require__(29),
  meta: {
    requireAuth: true
  }
}];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeEach = beforeEach;

var _localStorage = __webpack_require__(1);

var _localStorage2 = _interopRequireDefault(_localStorage);

var _utils = __webpack_require__(0);

var _jsBase = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function beforeEach(to, from, next, authorization, requestInstance, cb) {
  var localStorage = new _localStorage2.default();
  var accessToken = localStorage.get('access_token');
  var refreshToken = localStorage.get('refresh_token');
  var sessionTime = localStorage.get('session-time');
  // 路由拦截 根据路由配置中meta.requireAuth判断是否需要登录
  if (to.meta.requireAuth) {
    if (accessToken && refreshToken) {
      next();
    } else {
      var code = (0, _utils.getQuery)('code');
      var state = (0, _utils.getQuery)('state');
      if (code && state) {
        /**
         *  这里需要去请求token的值,并设置sessiion-time
         */
        // cb(code, state, next, localStorage, uuid(6, 16))
        requestInstance.post(authorization.tokenUri + '?code=' + code + '&state=' + state + '&grant_type=authorization_code' + '&client_id=' + authorization.client_id + '&redirect_uri=' + encodeURIComponent(authorization.redirect_uri)).then(function (res) {
          var time = new Date().getTime() + 30 * 60 * 1000;
          localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000);
          localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32));
          localStorage.set('session-time', time, 30 * 60 * 1000);
          next();
        }).catch(function (res) {
          var msg = {
            client_id: authorization.client_id,
            redirect_uri: encodeURIComponent(authorization.redirect_uri),
            state: (0, _utils.uuid)(6, 16)
          };
          window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state;
          next();
        });
      } else {
        /**
         * 需要判断页面sessionTime是否生效，如果失效，需要重新去登录
         */
        if (sessionTime && !accessToken) {
          /**
           * 如果生效，且accessToken 失效，
           * 需要重新获取accessToken
           */
          requestInstance.post(authorization.tokenUri + '?grant_type=refresh_token' + '&refresh_token=' + refreshToken + '&scope=read', {
            headers: {
              Authorization: 'Basic ' + _jsBase.Base64.encode(authorization.client_id + ':' + authorization.clientSecret)
            }
          }).then(function (res) {
            localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000);
            localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32));
          }).catch(function (res) {
            var msg = {
              client_id: authorization.client_id,
              redirect_uri: encodeURIComponent(authorization.redirect_uri),
              state: (0, _utils.uuid)(6, 16)
            };
            window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state;
          });
        } else {
          var msg = {
            client_id: authorization.client_id,
            redirect_uri: encodeURIComponent(authorization.redirect_uri),
            state: (0, _utils.uuid)(6, 16)
          };
          window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state;
        }
      }
    }
  } else {
    next();
  }
} /**
   * 进入路由之前判断是否有token存在
   */

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutation = __webpack_require__(20);

var _mutation2 = _interopRequireDefault(_mutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = {
  state: {
    instance: null, // 用于记录传入到frame中的服务调用实例
    authorization: null // 用于记录相关的参数问题
  },
  mutations: _mutation2.default
};

exports.default = store;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Constant$SET_INSTANC;

var _constant = __webpack_require__(5);

var Constant = _interopRequireWildcard(_constant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_Constant$SET_INSTANC = {}, _defineProperty(_Constant$SET_INSTANC, Constant.SET_INSTANCE, function (state, payload) {
  state.instance = payload;
}), _defineProperty(_Constant$SET_INSTANC, Constant.SET_AUTHORIZATION, function (state, payload) {
  state.authorization = payload;
}), _Constant$SET_INSTANC);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(21)
var ieee754 = __webpack_require__(26)
var isArray = __webpack_require__(27)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(24)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(32),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(25)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(33),
  /* scopeId */
  "data-v-b5145d9e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(23)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(31),
  /* scopeId */
  "data-v-12a8e00a",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "crm-wrapper"
  }, [_c('div', {
    staticClass: "bread-crumbs"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
  }, [_c('t-breadcrumb', {
    attrs: {
      "separator": ">"
    }
  }, [_c('t-breadcrumb-item', {
    attrs: {
      "href": "/"
    }
  }, [_vm._v(_vm._s(_vm.$t('frame.home')))]), _vm._v(" "), _c('t-breadcrumb-item', [_vm._v(_vm._s(_vm.$t('frame.listDetail')))])], 1)], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "enquiries mt-10"
  }, [_c('p', {
    staticClass: "text-center"
  }, [_vm._v(_vm._s(_vm.bullet.bulletinTitle))]), _vm._v(" "), _c('div', {
    staticClass: "text-left text-in",
    domProps: {
      "innerHTML": _vm._s(_vm.bullet.bulletinContent)
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "text-right"
  }, [_vm._v(_vm._s(_vm.bullet.bulletinPublisher))]), _vm._v(" "), _c('p', {
    staticClass: "text-right"
  }, [_vm._v(_vm._s(_vm._f("format")(_vm.bullet.createTime)))])]), _vm._v(" "), (_vm.bullet.files) ? _c('div', {
    staticClass: "enquiries mt-10"
  }, [_c('div', {
    staticClass: "enquiries-title"
  }, [_c('span'), _vm._v(_vm._s(_vm.$t('frame.relatedFiles')) + "\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "enquiries-form"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-12 user-lst"
  }, [_c('ul', {
    staticClass: "menu"
  }, [_c('li', {
    staticClass: "lt"
  }, [_vm._v(_vm._s(_vm.$t('frame.relatedFiles')) + ":")]), _vm._v(" "), _c('li', {
    staticClass: "rt"
  }, [_c('a', {
    attrs: {
      "href": _vm.bullet.files,
      "target": "_self"
    }
  }, [_c('t-icon', {
    attrs: {
      "type": "aid-menu aid-file-document"
    }
  }), _vm._v(_vm._s(_vm.$t('frame.doc')))], 1)])])])])])])])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "layout layout--one-screen bg-gray-lightest-5"
  }, [_c('div', {
    class: ['menu-backdrop d-xl-none', {
      'show': _vm.isOpenOnMinWin === false
    }],
    on: {
      "click": _vm.closeMenuOnMinWin
    }
  }), _vm._v(" "), _c('div', {
    class: ['layout-sidebar', {
      'layout-sidebar--folded': _vm.isOpen === false
    }, {
      'show': _vm.isOpenOnMinWin === false
    }]
  }, [_c('div', {
    staticClass: "layout-logo-left"
  }, [_vm._t("frame-header", [(_vm.logoRouter) ? _c('span', [_c('router-link', {
    attrs: {
      "to": _vm.logoRouter
    }
  }, [_c('img', {
    staticClass: "layout-logo-img",
    attrs: {
      "src": _vm.img,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "layout-logo-min-img",
    attrs: {
      "src": _vm.imgMin,
      "alt": ""
    }
  })])], 1) : _c('span', [_c('img', {
    staticClass: "layout-logo-img",
    attrs: {
      "src": _vm.img,
      "alt": ""
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "layout-logo-min-img",
    attrs: {
      "src": _vm.imgMin,
      "alt": ""
    }
  })])]), _vm._v(" "), (_vm.showMenu) ? _c('a', {
    staticClass: "d-none d-xl-block thumb-icon",
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('t-icon', {
    staticClass: "text-xxl text-black",
    attrs: {
      "type": "menu"
    },
    nativeOn: {
      "click": function($event) {
        _vm.openOrClose($event)
      }
    }
  })], 1) : _vm._e()], 2), _vm._v(" "), _c('div', {
    class: ['layout-menu', {
      'menu--folded': _vm.isOpen === false
    }, {
      'menu--fold--show': _vm.clientWidth > 1200
    }, {
      'menu--fold--min': _vm.clientWidth <= 1199
    }]
  }, [_vm._t("frame-menu", [_c('t-menu', {
    ref: "sidebarMenu",
    class: [{
      'menu--folded': _vm.isOpen === false && _vm.clientWidth > 1200
    }],
    attrs: {
      "type": "light",
      "active-name": _vm.queryActiveMenu,
      "open-names": _vm.queryOpenName,
      "open-position": _vm.openPosition,
      "accordion": _vm.accordion
    },
    on: {
      "on-select": _vm.hdMenuClick
    }
  }, [_vm._l((_vm.treeData), function(item1, x) {
    return [(item1.children && item1.children.length) ? _c('t-submenu', {
      attrs: {
        "name": item1.menuName
      }
    }, [_c('template', {
      slot: "title"
    }, [(item1.iconType) ? _c('t-icon', {
      attrs: {
        "type": item1.iconType
      }
    }) : _c('t-avatar', {
      attrs: {
        "size": "sm",
        "bg-state": "success",
        "text": item1.rightTag,
        "dot": false
      }
    }), _vm._v(" "), (item1.rightTag === _vm.tag && item1.menuUrl) ? _c('router-link', {
      attrs: {
        "to": {
          path: item1.menuUrl
        }
      }
    }, [_c('span', {
      staticClass: "sub-text",
      attrs: {
        "title": item1.menuName
      }
    }, [_vm._v(_vm._s(item1.menuName))])]) : (item1.systemUrl && item1.menuUrl && item1.rightTag !== _vm.tag) ? _c('a', {
      attrs: {
        "href": "javascript:;",
        "target": "_self"
      },
      on: {
        "click": function($event) {
          _vm.handleOtherRegin(item1.systemUrl + item1.menuUrl)
        }
      }
    }, [_c('span', {
      staticClass: "sub-text",
      attrs: {
        "title": item1.menuName
      }
    }, [_vm._v(_vm._s(item1.menuName))])]) : _c('span', {
      staticClass: "sub-text",
      attrs: {
        "title": item1.menuName
      }
    }, [_vm._v(_vm._s(item1.menuName))])], 1), _vm._v(" "), _vm._l((item1.children), function(item2, y) {
      return [(item2.children && item2.children.length) ? _c('t-submenu', {
        staticClass: "second-submenu",
        attrs: {
          "name": item2.menuName
        }
      }, [_c('template', {
        slot: "title"
      }, [(item2.rightTag === _vm.tag && item2.menuUrl) ? _c('router-link', {
        attrs: {
          "to": {
            path: item2.menuUrl
          }
        }
      }, [_c('span', {
        staticClass: "sub-text",
        attrs: {
          "title": item2.menuName
        }
      }, [_vm._v(_vm._s(item2.menuName))])]) : (item2.systemUrl && item2.menuUrl && item2.rightTag !== _vm.tag) ? _c('a', {
        attrs: {
          "href": "javascript:;",
          "target": "_self"
        },
        on: {
          "click": function($event) {
            _vm.handleOtherRegin(item2.systemUrl + item2.menuUrl)
          }
        }
      }, [_c('span', {
        staticClass: "sub-text",
        attrs: {
          "title": item2.menuName
        }
      }, [_vm._v(_vm._s(item2.menuName))])]) : _c('span', {
        staticClass: "sub-text",
        attrs: {
          "title": item2.menuName
        }
      }, [_vm._v(_vm._s(item2.menuName))])], 1), _vm._v(" "), _vm._l((item2.children), function(item3, z) {
        return [(item3.children && item3.children.length) ? _c('t-submenu', {
          staticClass: "second-submenu",
          attrs: {
            "name": item3.menuName,
            "id": x + '' + y
          }
        }, _vm._l((item3.children), function(item4, w) {
          return _c('t-menu-item', {
            key: w,
            staticClass: "sec-item",
            attrs: {
              "name": item4.menuName
            },
            nativeOn: {
              "click": function($event) {
                _vm.getMenu(item4)
              }
            }
          }, [(item4.rightTag === _vm.tag && item4.menuUrl) ? _c('router-link', {
            attrs: {
              "to": {
                path: item4.menuUrl
              }
            }
          }, [_c('span', {
            staticClass: "sub-text",
            attrs: {
              "title": item4.menuName
            }
          }, [_vm._v(_vm._s(item4.menuName))])]) : (item4.systemUrl && item4.menuUrl && item4.rightTag !== _vm.tag) ? _c('a', {
            attrs: {
              "href": "javascript:;",
              "target": "_self"
            },
            on: {
              "click": function($event) {
                _vm.handleOtherRegin(item4.systemUrl + item4.menuUrl)
              }
            }
          }, [_c('span', {
            staticClass: "sub-text",
            attrs: {
              "title": item4.menuName
            }
          }, [_vm._v(_vm._s(item4.menuName))])]) : _c('span', {
            staticClass: "sub-text",
            attrs: {
              "title": item4.menuName
            }
          }, [_vm._v(_vm._s(item4.menuName))])], 1)
        })) : _c('t-menu-item', {
          key: z,
          staticClass: "sec-item",
          attrs: {
            "name": item3.menuName
          },
          nativeOn: {
            "click": function($event) {
              _vm.getMenu(item3)
            }
          }
        }, [(item3.rightTag === _vm.tag && item3.menuUrl) ? _c('router-link', {
          attrs: {
            "to": {
              path: item3.menuUrl
            }
          }
        }, [_c('span', {
          staticClass: "sub-text",
          attrs: {
            "title": item3.menuName
          }
        }, [_vm._v(_vm._s(item3.menuName))])]) : (item3.systemUrl && item3.menuUrl && item3.rightTag !== _vm.tag) ? _c('a', {
          attrs: {
            "href": "javascript:;",
            "target": "_self"
          },
          on: {
            "click": function($event) {
              _vm.handleOtherRegin(item3.systemUrl + item3.menuUrl)
            }
          }
        }, [_c('span', {
          staticClass: "sub-text",
          attrs: {
            "title": item3.menuName
          }
        }, [_vm._v(_vm._s(item3.menuName))])]) : _c('span', {
          staticClass: "sub-text",
          attrs: {
            "title": item3.menuName
          }
        }, [_vm._v(_vm._s(item3.menuName))])], 1)]
      })], 2) : _c('t-menu-item', {
        attrs: {
          "name": item2.menuName
        }
      }, [(item2.rightTag === _vm.tag && item2.menuUrl) ? _c('router-link', {
        attrs: {
          "to": {
            path: item2.menuUrl
          }
        }
      }, [_c('span', {
        staticClass: "sub-text",
        attrs: {
          "title": item2.menuName
        }
      }, [_vm._v(_vm._s(item2.menuName))])]) : (item2.systemUrl && item2.menuUrl && item2.rightTag !== _vm.tag) ? _c('a', {
        attrs: {
          "href": "javascript:;",
          "target": "_self"
        },
        on: {
          "click": function($event) {
            _vm.handleOtherRegin(item2.systemUrl + item2.menuUrl)
          }
        }
      }, [_c('span', {
        staticClass: "sub-text",
        attrs: {
          "title": item2.menuName
        }
      }, [_vm._v(_vm._s(item2.menuName))])]) : _c('span', {
        staticClass: "sub-text",
        attrs: {
          "title": item2.menuName
        }
      }, [_vm._v(_vm._s(item2.menuName))])], 1)]
    })], 2) : _c('t-menu-item', {
      attrs: {
        "name": item1.menuName
      }
    }, [(item1.iconType) ? _c('t-icon', {
      attrs: {
        "type": item1.iconType
      }
    }) : _c('t-avatar', {
      attrs: {
        "size": "sm",
        "bg-state": "success",
        "text": item1.rightTag,
        "dot": false
      }
    }), _vm._v(" "), (item1.rightTag === _vm.tag && item1.menuUrl) ? _c('router-link', {
      attrs: {
        "to": {
          path: item1.menuUrl
        }
      }
    }, [_c('span', {
      staticClass: "sub-text",
      attrs: {
        "title": item1.menuName
      }
    }, [_vm._v(_vm._s(item1.menuName))])]) : (item1.systemUrl && item1.menuUrl && item1.rightTag !== _vm.tag) ? _c('a', {
      attrs: {
        "href": "javascript:;",
        "target": "_self"
      },
      on: {
        "click": function($event) {
          _vm.handleOtherRegin(item1.systemUrl + item1.menuUrl)
        }
      }
    }, [_c('span', {
      staticClass: "sub-text",
      attrs: {
        "title": item1.menuName
      }
    }, [_vm._v(_vm._s(item1.menuName))])]) : _c('span', {
      staticClass: "sub-text",
      attrs: {
        "title": item1.menuName
      }
    }, [_vm._v(_vm._s(item1.menuName))])], 1)]
  })], 2)])], 2)]), _vm._v(" "), _c('div', {
    staticClass: "layout-content"
  }, [_c('div', {
    staticClass: "layout-nav navbar navbar-expand-lg bg-white align-items-center layout-nav--top"
  }, [_c('div', {
    staticClass: "row nav-row"
  }, [_c('div', {
    staticClass: "col col-6 nav-col"
  }, [_c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.showMenu),
      expression: "!showMenu"
    }],
    staticClass: "d-xm-block thumb-icon",
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('t-icon', {
    staticClass: "text-xxl text-black",
    attrs: {
      "type": "menu"
    },
    nativeOn: {
      "click": function($event) {
        _vm.openOrClose($event)
      }
    }
  })], 1), _vm._v(" "), _vm._t("frame-nav-left")], 2), _vm._v(" "), _c('div', {
    staticClass: "col col-6 nav-col nav-col--right"
  }, [_vm._t("frame-nav", [_c('t-menu', {
    staticClass: "menu-span",
    attrs: {
      "mode": "horizontal",
      "type": "light"
    },
    on: {
      "on-select": _vm.handleNavSelect
    }
  }, [_vm._l((_vm.navs), function(item, x) {
    return [(item.children) ? _c('t-submenu', {
      attrs: {
        "name": x
      }
    }, [_c('template', {
      slot: "title"
    }, [(item.icon) ? _c('t-icon', {
      attrs: {
        "type": item.icon
      }
    }) : _vm._e(), _vm._v(" "), (item.name) ? _c('span', {
      staticClass: "sub-text"
    }, [_vm._v(_vm._s(item.name))]) : _vm._e()], 1), _vm._v(" "), _vm._l((item.children), function(item1, index) {
      return _c('t-menu-item', {
        key: index + 'item',
        attrs: {
          "name": x + '' + index
        }
      }, [(item1.icon) ? _c('t-icon', {
        attrs: {
          "type": item1.icon
        }
      }) : _vm._e(), _vm._v(" "), (item1.name) ? _c('span', {
        staticClass: "sub-text"
      }, [_vm._v(_vm._s(item1.name))]) : _vm._e()], 1)
    })], 2) : _c('t-menu-item', {
      attrs: {
        "name": x
      }
    }, [(item.icon === 'bell' && _vm.count) ? _c('t-badge', {
      attrs: {
        "dot": "",
        "state": "danger"
      }
    }, [_c('span', {
      on: {
        "click": _vm.showSlipbox
      }
    }, [(item.icon) ? _c('t-icon', {
      attrs: {
        "type": item.icon
      }
    }) : _vm._e(), _vm._v(" "), (item.name) ? _c('span', {
      staticClass: "sub-text"
    }, [_vm._v(_vm._s(item.name))]) : _vm._e()], 1)]) : (item.icon === 'bell') ? [_c('span', {
      on: {
        "click": _vm.showSlipbox
      }
    }, [(item.icon) ? _c('t-icon', {
      attrs: {
        "type": item.icon
      }
    }) : _vm._e(), _vm._v(" "), (item.name) ? _c('span', {
      staticClass: "sub-text"
    }, [_vm._v(_vm._s(item.name))]) : _vm._e()], 1)] : [(item.handleType && item.handleType === 'logout') ? _c('a', {
      attrs: {
        "href": "javascript:;",
        "target": "_self"
      },
      on: {
        "click": function($event) {
          _vm.handleLogout(item)
        }
      }
    }, [(item.icon) ? _c('t-icon', {
      attrs: {
        "type": item.icon
      }
    }) : _vm._e(), _vm._v(" "), (item.name) ? _c('span', {
      staticClass: "sub-text"
    }, [_vm._v(_vm._s(item.name))]) : _vm._e()], 1) : _c('span', [(item.icon) ? _c('t-icon', {
      attrs: {
        "type": item.icon
      }
    }) : _vm._e(), _vm._v(" "), (item.name) ? _c('span', {
      staticClass: "sub-text"
    }, [_vm._v(_vm._s(item.name))]) : _vm._e()], 1)]], 2)]
  })], 2)]), _vm._v(" "), _c('t-button', {
    staticClass: "btn-lang",
    attrs: {
      "type": "outline-secondary",
      "size": "sm"
    },
    on: {
      "click": _vm.handleChangeLang
    }
  }, [_vm._v(_vm._s(_vm.lang))])], 2)])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "clickout-side",
      rawName: "v-clickout-side",
      value: (_vm.handleClickoutSide),
      expression: "handleClickoutSide"
    }],
    staticClass: "slipbox__container"
  }, [_c('div', {
    staticClass: "slipbox__content",
    class: [{
      'close': _vm.hideSlip
    }]
  }, [_c('div', {
    staticClass: "slipbox__close",
    on: {
      "click": _vm.hideSlipbox
    }
  }, [_c('a', {
    attrs: {
      "href": "javascript:;",
      "target": "_self"
    }
  }, [_c('t-icon', {
    attrs: {
      "type": "close"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "slipbox__body"
  }, [_vm._t("slipbox-body", [_c('t-tabs', [_c('t-tab-panel', {
    attrs: {
      "label": _vm.$t('frame.sysInform'),
      "name": "tab-1"
    }
  }, [_vm._l((_vm.notices), function(item, index) {
    return _c('div', {
      staticClass: "notice-wrap",
      class: {
        'notice-active': _vm.isActive === index
      },
      on: {
        "click": function($event) {
          _vm.handleNoticeClick(index, item)
        }
      }
    }, [_c('span', {
      staticClass: "nw-l"
    }, [_c('t-tag', {
      attrs: {
        "state": "info"
      }
    }, [_vm._v("info")])], 1), _vm._v(" "), _c('span', {
      staticClass: "nw-r"
    }, [_c('p', {
      staticClass: "nw-r-title"
    }, [_vm._v(_vm._s(item.bulletinTitle))]), _vm._v(" "), _c('p', {
      staticClass: "nw-r-time"
    }, [_vm._v(_vm._s(_vm.$t('frame.expiryDate')) + "：" + _vm._s(_vm._f("format")(item.activeTime)) + " " + _vm._s(_vm.$t('frame.to')) + " " + _vm._s(_vm._f("format")(item.inactiveTime)))])])])
  }), _vm._v(" "), _c('p', {
    staticClass: "notice__loading"
  }, [_c('a', {
    attrs: {
      "href": "javascript:;",
      "target": "_self"
    },
    on: {
      "click": _vm.loadingMore
    }
  }, [_vm._v(_vm._s(_vm.$t('frame.loadingMore')))])])], 2)], 1)])], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "layout-main"
  }, [_c('div', {
    staticClass: "layout-main--content"
  }, [_c('router-view'), _vm._v(" "), _vm._m(0, false, false)], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "slide-wrap-content",
    class: [{
      'slideWrapClose': _vm.hideSlideWrapSlip
    }]
  }, [_c('t-icon', {
    staticClass: "icon-close mr-5 mt-3",
    attrs: {
      "type": "close",
      "size": "36"
    },
    nativeOn: {
      "click": function($event) {
        _vm.handleClickClose($event)
      }
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pager-footer"
  }, [_c('p', [_vm._v("©️ 2017 China Mobile International Limited. All rights reserved.")])])
}]}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "crm-wrapper"
  }, [_c('div', {
    staticClass: "bread-crumbs"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
  }, [_c('t-breadcrumb', {
    attrs: {
      "separator": ">"
    }
  }, [_c('t-breadcrumb-item', {
    attrs: {
      "href": "/"
    }
  }, [_vm._v(_vm._s(_vm.$t('frame.home')))]), _vm._v(" "), _c('t-breadcrumb-item', [_vm._v(_vm._s(_vm.$t('frame.list')))])], 1)], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "enquiries mt-10",
    staticStyle: {
      "padding": "0px 0px 20px 0px"
    }
  }, [_c('div', {
    staticClass: "enquiries-title"
  }, [_c('span'), _vm._v(_vm._s(_vm.$t('frame.title')) + "\n        ")]), _vm._v(" "), _vm._l((_vm.items), function(item) {
    return _c('div', {
      staticClass: "notice-list-wrap",
      on: {
        "click": function($event) {
          _vm.navToDetail(item)
        }
      }
    }, [_c('div', {
      staticClass: "n-l-title"
    }, [_c('span', [_vm._v(_vm._s(item.bulletinTitle))]), _vm._v(" "), (parseInt(item.topFlag) === 1) ? _c('i', {
      staticClass: "tips-top"
    }, [_vm._v(_vm._s(_vm.$t('frame.top')))]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "n-l-content"
    }, [_c('p', {
      staticClass: "text-right n-l-time"
    }, [_vm._v(_vm._s(item.bulletinPublisher) + " "), _c('em', [_vm._v(_vm._s(_vm._f("format")(item.createTime)))])])])])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "notice-pager"
  }, [_c('t-pager', {
    attrs: {
      "total": _vm.total,
      "page-size": _vm.pageSize,
      "sizer-range": _vm.sizerRange,
      "show-elevator": "",
      "show-sizer": ""
    },
    on: {
      "on-change": _vm.handleOnPagerChange,
      "on-size-change": _vm.handleOnPagerSizeChange
    }
  })], 1)])
},staticRenderFns: []}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);
});
//# sourceMappingURL=frame.esm.js.map