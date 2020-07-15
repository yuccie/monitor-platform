import request from 'framework/utils/request';

// 获取首页列表
export function getArticleListPro(data) {
  return request({
    url: `/api/article/list`,
    method: 'get',
    data,
  });
}

// 获取异常信息
export function getErr(data) {
  return request({
    url: `/getErr`,
    data,
  });
}

// 获取异常信息
export function delErr(data) {
  return request({
    url: `/delErr`,
    method: 'get',
    params: data,
  });
}

// 更新异常信息
export function updateErr(data) {
  return request({
    url: `/updateErr`,
    method: 'get',
    params: data,
  });
}

// 测试连接不同的集合
export function getPerf(data) {
  return request({
    url: `/getPerf`,
    method: 'get',
    params: data,
  });
}

// 获取mysql里的异常数据
export function getTypeErr(data) {
  return request({
    url: `/getTypeErr`,
    data,
  });
}
export function getErrList(data) {
  return request({
    url: `/getErrList`,
    data,
  });
}

// 删除mysql里的异常数据
export function delSqlErr(data) {
  return request({
    url: `/delSqlErr`,
    method: 'get',
    params: data,
  });
}

// 更新mysql里的异常数据
export function updateSqlErr(data) {
  return request({
    url: `/updateSqlErr`,
    method: 'get',
    params: data,
  });
}

// 获取redis里的异常数据
export function getRedisErr(data) {
  return request({
    url: `/getRedisErr`,
    method: 'get',
    params: data,
  });
}

// 更新mysql里的异常数据
export function delRedisErr(data) {
  return request({
    url: `/delRedisErr`,
    method: 'get',
    params: data,
  });
}

// 更新mysql里的异常数据
export function setRedisErr(data) {
  return request({
    url: `/setRedisErr`,
    method: 'get',
    params: data,
  });
}

// 获取异常监控里的错误趋势图
export function getErrTrand(data) {
  return request({
    url: `/getErrTrand`,
    data,
  });
}

// 获取单条sql数据
export function getErrDetail(data) {
  return request({
    url: `/getErrDetail`,
    data,
  });
}

// 删除单条sql数据
export function delErrDetail(data) {
  return request({
    url: `/delErrDetail`,
    data,
  });
}

// 获取sourcemap 文件
export function getSourceMap(data) {
  return request({
    url: `/getSourceMap`,
    method: 'post',
    data: data
  });
}



// 获取 性能相关的接口
// 获取不同类型耗时最高的项
export function getTypePerf(data) {
  return request({
    url: `/getTypePerf`,
    method: 'post',
    data: data
  });
}
// 获取页面加载情况数据
export function getPerfList(data) {
  return request({
    url: `/getPerfList`,
    method: 'post',
    data: data
  });
}

