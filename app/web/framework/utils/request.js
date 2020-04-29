import axios from 'axios';
import { Message } from 'element-ui';
// import store from '@/store';
// import router from '@/router';
// import { redirectAutoLogin, removeSessionJson } from '@/utils/auth';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有登录或登录信息过期',
  403: '无权限，请联系管理员开通。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  if (~String(error).indexOf('timeout')) {
    return {
      message: '请求超时'
    };
  }

  const { response = {} } = error;
  const { status, data, statusText } = response;
  const errortext = (data && data.message) || codeMessage[response.status] || statusText;

  if (status === 401 || errortext === '401 Unauthorized') {
    // Message(errortext);
    // removeSessionJson('accessToken');
    // removeSessionJson('userInfo');
    // redirectAutoLogin();

    return false;
  } else if (status === 403 || errortext === 'Forbidden') {
    // router.replace({ name: 'Error'});
    return false;
  }

  return {
    code: status || 0,
    message: errortext || '请求出错'
  };
};

const service = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  method: 'POST',
  timeout: 60000,
  withCredentials: false,
  xsrfHeaderName: 'x-csrf-token',
  xsrfCookieName: 'csrfToken'
});

service.interceptors.request.use(
  config => {
    Message({
      message: '加载中...',
      type: 'info'
    })
    debugger
    // Message.loading({
    //   message: '处理中...',
    //   forbidClick: true,
    //   duration: 0,
    //   loadingType: 'spinner'
    // });

    // config.headers['Authorization'] = store.getters.token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    // debugger
    // Message.close();
    let res = response.data;
    // if (Number(res.code) !== 200) {
    //   // Message(res.message);
    //   // eslint-disable-next-line prefer-promise-reject-errors
    //   return Promise.reject(res);
    // }
    // debugger
    return res;
  },
  error => {
    // Message.clear();

    // httpCode 非2xx系列
    const res = errorHandler(error);
    res && Message(res.message);
    if (res) {
      return Promise.reject(res);
    }
  }
);

export default service;



// export default {
//   post(url, json, store = {}) {
//     const { state = { origin: '' } } = store;
//     const headers = {};
//     if (EASY_ENV_IS_NODE) {
//       headers['x-csrf-token'] = state.csrf;
//       headers.Cookie = `csrfToken=${state.csrf}`;
//     }
//     return axios.post(`${state.origin}${url}`, json, { headers });
//   },
//   get(url, store = {}) {
//     const { state = { origin: '' } } = store;
//     return axios.get(`${state.origin}${url}`);
//   }
// };