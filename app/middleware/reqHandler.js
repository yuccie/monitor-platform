'use strict';

const errMap = {
  '-1': 'fail',
  0: 'success',
  401: 'Unauthorized',
  403: 'Forbidden',
  500: 'Internal Server Error',
}

module.exports = (opts, app) => {
  return async function (ctx, next) {
    ctx.reqHandler = {
      success(data = {}, msg = '操作成功') {
        console.log('data111', data[1]);
        ctx.body = {
          code: 0,
          msg,
          data
        }
      },
      fail(code, msg, data = {}) {
        ctx.body = {
          code: code || -1,
          msg: msg || errMap[code],
          data
        }
      }
    }
    await next();
  }
};