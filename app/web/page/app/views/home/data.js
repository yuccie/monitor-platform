
// 异常监控错误类型
exports.errTypes = [
  {value: 4, label: '异常浏览器'},
  {value: 3, label: '异常内容'},
  {value: 2, label: '异常日期'},
  {value: 1, label: '异常类型'},
]

// 性能监控指标
exports.perfTypes = [
  {value: 'unloadEvent', label: '页面卸载'},
  {value: 'redirect', label: '重定向'},
  {value: 'appCache', label: '缓存查询'},
  {value: 'domainLookup', label: 'DNS查询'},
  {value: 'connect', label: 'TCP握手'},
  {value: 'request', label: 'request建立'},
  {value: 'response', label: 'response响应'},
  {value: 'domContentLoadedEvent', label: 'dom加载'},
  {value: 'loadEvent', label: '页面资源加载'},
]