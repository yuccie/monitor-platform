var win = window;
var Monitor = require('./monitor');
var monitor = new Monitor();
var oldOnErrorHandler = win.onerror;
var oldOnBeforeUnloadHandler = win.onbeforeunload;
var queue = [];
var pushCount = {}
var pushTimer = null;

var recentClickEventList = []; // 最近的10条点击事件；
var recentAjaxList = []; // 最近10条ajax接口请求；
win.monitor = monitor;

// 注册vue的插件，先搜集错误，再调用应用配置的错误处理，再抛出错误
monitor.vuePlugin = {
  install: function (Vue, options) {
    // 先缓存，再调用，防止覆盖
    var errorHandler = Vue.config.errorHandler;
    Vue.config.errorHandler = function (error) {
      // console.log('vue_error', _getValType(error)); // Error类型
      error = error || {};

      error.stack = error.stack;
      error.message = error.message;
      error.recentClickEventList = JSON.stringify(recentClickEventList);
      error.recentAjaxList = JSON.stringify(recentAjaxList);
      // 搜集错误
      collect(error, error.message + JSON.stringify(error.stack));
      // 继续调用之前的错误处理程序
      call(errorHandler, arguments, win);
      throw error;
    }
  }
};


// 记录点击事件发生时的信息
win.onclick = function (e) {
  let onClickEvent = Object.assign({}, {
    innerText: e.target.innerText,
    pageX: e.pageX,
    pageY: e.pageY,
    type: e.type,
    outerHTML: e.target.outerHTML,
    timestamp: new Date().toLocaleString(),
    url: location.href || '',
    title: document.title || '',
  });
  if (recentClickEventList.length > 10) {
    recentClickEventList.shift();
  }

  recentClickEventList.push(onClickEvent);
};

win.onerror = function (message, fileName, lineNumber, columnNumber, error) {
  // 搜集错误因为不太紧急，可以放在队列里
  setTimeout(() => {
    error = error || {};
    error.message = error.message || message || '';

    // error对象原本只有message和stack属性，下面是修改原有error对象
    error.fileName = fileName.split(' ')[0];
    error.lineNumber = lineNumber || null;
    error.columnNumber = columnNumber || null;
    error.recentClickEventList = recentClickEventList;
    error.recentAjaxList = recentAjaxList;

    collect(error, '' + error.message + error.fileName + error.lineNumber + error.columnNumber);
    call(oldOnErrorHandler, arguments, win);
  }, 0);
};

// 捕获阶段捕获资源加载异常，比如img,script
win.addEventListener('error', error => {
  setTimeout(() => {
    error = error || {};
    const { target, path } = error;

    error.message = target.outerHTML;
    error.url = target.baseURI
    error.name = target.localName
    error.fileName = _getElePath(path)
    error.errorType = _getValType(error) || '';
    error.recentClickEventList = JSON.stringify(recentClickEventList);
    error.recentAjaxList = JSON.stringify(recentAjaxList);
    collect(error, `${error.url}-${error.fileName}`);
  }, 0);
}, true)

// 捕获promise异常
win.addEventListener('unhandledrejection', error => {
  setTimeout(() => {
    error = error || {};
    const { type, reason } = error;

    error.message = reason;
    error.url = location.href
    error.name = type
    error.errorType = _getValType(error) || '';
    error.recentClickEventList = JSON.stringify(recentClickEventList);
    error.recentAjaxList = JSON.stringify(recentAjaxList);
    collect(error, `${error.url}-${reason}`);
  }, 0);
}, true)

// 页面卸载前，推送错误
win.onbeforeunload = function () {
  push();
  call(oldOnBeforeUnloadHandler, arguments, win);
}

go();

//============== function ===================//
function _getValType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

function _getElePath(path) {
  let str = ''
  Object.values(path).forEach(item => {
    if (item.localName) {
      str += `${item.localName},`;
    }
  });
  return str.replace(/,$/, '');
}

// 采集
function collect(error, key) {
  // 没有次数，则赋值为0，其实就是统计次数
  pushCount[key] = pushCount[key] || 0;

  // 如果同一个错误次数小于 配置项，则累加
  if (pushCount[key] < monitor._config.repeat) {
    pushCount[key]++;
    // 同时添加进错误队列
    queue.push(error);
  }
}

// 推送，将队列里的错误推到远程
function push() {
  for (var i = 0; i < queue.length; i++) {
    monitor.push(queue[i]);
  }
  queue = [];
}

// 定时推送，循环嵌套，推一次就会再次设定定时器
function go() {
  pushTimer = setTimeout(function () {
    push();
    go();
  }, monitor._config.interval);
}

// 自定义函数调用
function call(fun, args, context) {
  if (typeof fun === 'function') {
    fun.apply(context, args);
  }
}

//============== 监听网络请求 ===================//

var open = window.XMLHttpRequest.prototype.open,
  send = window.XMLHttpRequest.prototype.send,
  onReadyStateChange;

function openReplacement(method, url, async, user, password) {
  var syncMode = async !== false ? 'async' : 'sync';
  // console.warn(
  //     'Preparing ' +
  //     syncMode +
  //     ' HTTP request : ' +
  //     method +
  //     ' ' +
  //     url
  // );
  return open.apply(this, arguments);
}

function sendReplacement(data) {
  //console.log('Sending HTTP request data : ', data);
  if (this.onreadystatechange) {
    this._onreadystatechange = this.onreadystatechange;
  }
  this.onreadystatechange = onReadyStateChangeReplacement;

  return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {
  // 增加请求异常监控
  let error = {};
  if (this.status !== 200 && this.readyState === 4) {
    error.message = this.responseText;
    error.url = this.responseURL
    error.name = this.status
    error.errorType = _getValType(this) || '';
    error.recentClickEventList = JSON.stringify(recentClickEventList);
    error.recentAjaxList = JSON.stringify(recentAjaxList);
    if (recentAjaxList.length && recentAjaxList[0].api.indexOf('sockjs-node/info') === -1 ) {
      collect(error, `${error.url}-${error.message}`);
    }
    return false;
  }

  //console.warn('HTTP request ready state changed : ' + this.readyState);
  //console.info('http response data:', this.responseText);
  if (this.readyState === 4 && this.responseURL !== monitor._api) {
    if (recentAjaxList.length === 10) {
      recentAjaxList.shift();
    }

    recentAjaxList.push({
      api: this.responseURL,
      title: document.title,
      url: location.href,
      time: new Date().toLocaleString(),
    });
  }
  if (this._onreadystatechange) {
    return this._onreadystatechange.apply(this, arguments);
  }
}

window.XMLHttpRequest.prototype.open = openReplacement;
window.XMLHttpRequest.prototype.send = sendReplacement;

