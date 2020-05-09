import request from 'framework/utils/request';

// 获取首页列表
export function getArticleListPro(data) {
  return request({
    url: `/api/article/list`,
    method: 'get', // 默认post
    data,
  });
}

// 获取异常信息
export function getErr(data) {
  return request({
    url: `/getErr`,
    method: 'get', // 默认post
    params: data,
  });
}

// 获取异常信息
export function delErr(data) {
  return request({
    url: `/delErr`,
    method: 'get', // 默认post
    params: data,
  });
}

