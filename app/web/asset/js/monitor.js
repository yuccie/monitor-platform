/**
 * Created by hanan on 17/11/14.
 */

var stackparser = require('./stackparser');
function Monitor() {
  // this._api = API_ROOT_URL + '/push';
  this._api = `/push?_csrf=${document.cookie.split('=')[1]}`;
  this._handlers = {};
  this._config = {
    ignore: {},
    interval: 1 * 1000,
    repeat: 5,
    email: false,
    defaulteValues: {
      errorType: 'js',
      errorLevel: 1,
      projectName: location.hostname || location.host,
    }
  };
}

var fn = Monitor.prototype;

/**
 * 配置信息
 * @param option.defaulteValues 异常字段默认值
 * @param option.ignore 忽略上报配置
 * @param option.interval 上报时间间隔
 * @param option.repeat 错误超过多少次时不上报
 * @param option.email 需要通知的邮箱
 */
fn.config = function (option) {
  option = option || {};
  for (var key in option) {
    if (key == 'ignore' || key == 'defaulteValues') {
      for (var key2 in option[key]) {
        this._config[key][key2] = option[key][key2];
      }
    }
    else {
      this._config[key] = option[key];
    }
  }
  return this;
}

/**
 * 上报异常
 * @param error.errorType 异常类型：js or http
 * @param error.errorLevel 异常级别 1-4，默认1
 * @param error.url 页面地址 默认为 loction.href
 * @param error.name 异常名称
 * @param error.message 详情
 * @param error.requestUrl 请求地址
 * @param error.requestMethod 请求方法
 * @param error.responseStatusCode 返回的状态码
 * @param error.responseStatusText 返回的statusText
 * @param error.response 请求返回body
 * @event beforePush 事件回调返回值为 false 时，取消推送，否则推送其返回值
 */
fn.push = function (error) {
  var ignore = false;
  // self就是fn，也就是Monitor实例
  var self = this;
  // 格式化错误
  error = this._parse(error);

  // 如果有错误，先过滤掉忽略项。
  if (error) {
    for (var key in this._config.ignore) {
      var field = this._config.ignore[key];
      if (typeof field === 'string') {
        if (field === error[key]) {
          ignore = true;
          break;
        }
      } else {
        if (field.test(error[key])) {
          ignore = true;
          break;
        }
      }
    }
    if (!ignore) {
      var event = 'beforePush';
      if (this._handlers[event] && this._handlers[event].length) {  
        this.emit(event, [error, function next(continueErrorInfo) {
          if (!next.__called) {
            self._request(self._setEmail(continueErrorInfo || error));
            next.__called = true;
          }
        }]);
      } else {
        self._request(this._setEmail(error));
      }
    }
  }
  return this;
}

/**
 * 监控一个函数，发生异常时自动上报
 * @param fun 需要监控的函数
 * @param context 函数执行时候的上下文
 * @returns {Function}
 */
fn.watch = function (fun, context) {
  var self = this;
  fun = fun || function () {
  };
  if (!fun.__wraper) {
    fun.__wraper = function () {
      try {
        fun.apply(context || this, arguments);
      }
      catch (e) {
        self.push(e);
        throw e;
      }
    }
  }
  return fun.__wraper;
}

fn._setEmail = function (error) {
  // 这里可以将传入的相关人的邮箱传入，然后再error对象上挂载这个email
  // 后续可以利用这个email，给相关人发送邮件。
  if (this._config.email) {
    error.email = typeof this._config.email === 'function'
      ? this._config.email(error)
      : this._config.email;
  }
  return error;
}

/**
 * 解析异常信息
 */
fn._parse = function (error) {
  var stack = error.stack ? stackparser.parse(error) : '';
  var defaulteValues = this._config.defaulteValues;
  var obj = {
    name: error.name,
    title: error.title || document.title,
    projectName: defaulteValues.projectName,
    host: location.hostname,
    message: error.message || error.description,
    content: error.message || error.description,
    errorType: error.errorType || 'js',
    url: error.url || location.href,
    errorLevel: error.errorLevel || defaulteValues.errorLevel,
    requestUrl: error.requestUrl,
    requestMethod: error.requestMethod,
    responseStatusCode: error.responseStatusCode,
    responseStatusText: error.responseStatusText,
    response: error.response,
    stack: stack,
    lineNumber: error.lineNumber || error.line || (stack && stack[0].lineNumber),
    columnNumber: error.columnNumber || error.column || (stack && stack[0].columnNumber),
    fileName: error.fileName || (stack && stack[0].fileName),
    recentClickEventList: error.recentClickEventList || null,
    recentAjaxList: error.recentAjaxList || null,
    cookies: document.cookie || null,
  }
  // for (var key in obj) {
  //   obj[key] = obj[key] || '';
  // }
  return obj;
}

/**
 * 发送异常信息到服务端
 * 利用原生ajax发送
 */
fn._request = function (error) {
  var self = this;
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    debugger
    if (xhr.readyState == 4) {
      if (xhr.status == 200 && xhr.response.code == '00000') {
        self.emit('pushSuccess', [error]);
      }
      else {
        self.emit('pushFailed', [error]);
      }
      self.emit('completePush', [error]);
    }
  }
  xhr.open('POST', this._api, true);
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  //   xsrfHeaderName: 'x-csrf-token',
  // xsrfCookieName: 'csrfToken'
  console.log(document.cookie.split('=')[1], 'cookies')
  debugger
  // xhr.setRequestHeader('xsrfHeaderName', 'x-csrf-token');
  // xhr.setRequestHeader('xsrfCookieName', 'csrfToken');
  // xhr.setRequestHeader('csrfToken', document.cookie.split('=')[1]);
  xhr.send(JSON.stringify(error));
}

// 绑定事件
fn.on = function (event, callback) {
  if (!this._handlers[event]) {
    this._handlers[event] = [];
  }
  var callbacks = this._handlers[event];
  for (let i = 0; i <= callbacks.length; i++) {
    if (callback == callbacks[i]) {
      return this;
    }
  }
  this._handlers[event].push(callback);
  return this;
}

// 触发事件
fn.emit = function (event, args) {
  if (this._handlers[event] && this._handlers[event].length) {
    var callbacks = this._handlers[event];
    for (var i = 0; i <= callbacks.length; i++) {
      if (typeof callbacks[i] == 'function') {
        callbacks[i].apply(this, args);
      }
    }
  }
  return this;
}

// 解除事件绑定
fn.off = function (event, callback) {
  if (!this._handlers[event] || !this._handlers[event].length) {
    return this;
  }
  if (callback) {
    var callbacks = this._handlers[event];
    for (var i = 0; i <= callbacks.length; i++) {
      if (callbacks[i] == callback) {
        callbacks.splice(i, 1);
        return this;
      }
    }
  }
  return this;
}

module.exports = Monitor;
