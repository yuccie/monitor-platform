const fs = require('fs');
const Controller = require('egg').Controller;

class ErrDbsController extends Controller {
  async getSdk() {
    const { app, ctx } = this;
    console.log(ctx.request, '/app/web/asset/js/');
  }

  // 操作mongoose里的数据
  async pushErr() {
    const { app, ctx } = this;

    // 关于浏览器的数据，请求就可以直接拿到，不需要单独调接口
    // user-agent：https://www.jianshu.com/p/c5cf6a1967d1
    // let errData = {
    //   request: ctx.request,
    //   body: ctx.request.body
    // };
    let errInfo = ctx.request.body;
    errInfo.userAgent = ctx.request.header['user-agent'];

    await ctx.model.ErrDbs.create(errInfo);
    // let res = await ctx.model.ErrDbs.find({});
    // console.log(res, 'res');

    // const errMonitor = new ctx.model.ErrDbs({
    //   name: 'jesse',
    //   age: 25,
    //   date: new Date(),
    //   // 如果schema里没有定义，这里即使传入也不会生效
    //   a: 21
    // })
    // const errMonitor = new ctx.model.ErrDbs(errInfo)
    // errMonitor.save();
    // let res = await ctx.model.ErrDbs.find({});
    // console.log('res', res);

    // console.log('process.cwd()', process.cwd());
    // /Users/mac/missfresh/workSpace/engineer/egg/monitor-platform

    // 获取post请求入参：https://eggjs.org/zh-cn/basics/controller.html
    // 将入参格式化，并写入到本地文件
    // https://javascript.ruanyifeng.com/nodejs/fs.html#toc0
    // 这里的相对路径，其实是相当于 process.cwd() ，因此写到了根目录。而不是相对于当前脚本所在的路径。
    fs.writeFileSync('./errData.js', JSON.stringify(errInfo, null, 2), err => {
      // 回调是最后一个参数，而且只有写入异常时才会执行。
      if (err) throw err;
    });

    // 返回成功标识，如果全局？
    ctx.body = {
      code: 0,
      message: '操作成功',
      data: {}
    };
    // ctx.status = 200;
  }
  async delErr() {
    // 支持删除多条或单条，要想删除某条或多条数据，
    // 需要一定的过滤条件，也就是如何给每项数据添加一个id？
    const { ctx } = this;
    // let opts = {
    //   name: 'jesse'
    // }
    let opts = {
      // _id: "5eb7c6fc95040d060636ee51"
      name: 'ReferenceError'
    };

    await ctx.model.ErrDbs.remove(opts, err => {
      if (err) throw err;
    });
    ctx.body = {
      code: 0,
      message: '操作成功',
      data: {}
    };
  }
  async getErr() {
    const { app, ctx } = this;
    // 环境变量设置
    console.log(app.config.EGG_SERVER_ENV, 'app.config', app.config.env);

    let { errType } = ctx.request.body;
    let query = [ { $match: {} } ];

    switch (errType) {
      // 如果是异常类型，则找出数据库中同类异常的占比，前5名
      // 如果是异常日期，则找出相同日期里异常的占比，前5名
      case 'errType':
        query = [
          // 只需找出所有数据库中，所有name不为空的项
          {
            $match: {
              name: { $ne: null }
            }
          },
          // 统计每种类型的数量
          {
            $group: {
              // 必须用_id，表示主键
              _id : '$name',
              count: { $sum: 1 },
              // 分组后如何，如何在分好组的数据里增加字段呢？
              name: { $addToSet: '$name' },
              // name: { $push: '$name' },
            }
          }
        ];
        break;
    }
    console.log('query', query.name);

    let res = await ctx.model.ErrDbs.aggregate(query);
    await ctx.reqHandler.success(res);
  }
  async updateErr() {
    const { ctx } = this;
    let query = {
      _id: '5eb7c743c83b48065550ab6f'
    };
    await ctx.model.ErrDbs.update(query, {
      cookies: '这是更新的cookies'
    });

    ctx.body = {
      code: 0,
      message: '操作成功',
      data: {}
    };
  }

  // 操作mysql里的数据
  async getSqlErr() {
    const { ctx } = this;

    let res = await ctx.sqlModel.ErrDbs.findAll({});
    await ctx.reqHandler.success(res);
  }
  async delSqlErr() {
    const { ctx } = this;

    let res = await ctx.sqlModel.ErrDbs.findAll({});

    await ctx.reqHandler.success(res);
  }
  async updateSqlErr() {
    const { ctx } = this;

    let res = await ctx.sqlModel.ErrDbs.findAll({});
    await ctx.reqHandler.success(res);
  }

  // 操作redis里的数据
  async setRedisErr(newVal) {
    const { ctx, app } = this;
    await app.redis.set('redisErr', '这是redis里的默认error');
    await ctx.reqHandler.success('更新redis成功');
  }
  async getRedisErr() {
    const { ctx, app } = this;
    let res = await app.redis.get('redisErr');
    if (!res) return ctx.reqHandler.fail(-1, '获取异常');

    await ctx.reqHandler.success(res);
  }
  async delRedisErr() {
    const { ctx, app } = this;
    await app.redis.del('redisErr');
    await ctx.reqHandler.success();
  }
}

module.exports = ErrDbsController;
