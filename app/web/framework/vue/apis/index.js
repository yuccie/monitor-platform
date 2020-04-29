import request from 'framework/utils/request';

// 登陆网关
export function getArticleListPro(data) {
  return request({
    url: `/api/article/list`,
    method: 'get', // 默认post
    data,
  });
}

