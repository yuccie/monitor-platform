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
export function getSqlErr(data) {
  return request({
    url: `/getSqlErr`,
    method: 'get',
    params: data,
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

