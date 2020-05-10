const fs = require('fs');
const Controller = require('egg').Controller;

class ErrMonitorController extends Controller {
  async getSdk() {
    const {app, ctx} = this;
    console.log(ctx.request, '/app/web/asset/js/');
  }
  async pushErr() {
    const {app, ctx} = this;

    // 关于浏览器的数据，请求就可以直接拿到，不需要单独调接口
    // user-agent：https://www.jianshu.com/p/c5cf6a1967d1
    // let errData = {
    //   request: ctx.request,
    //   body: ctx.request.body
    // };
    let errInfo = ctx.request.body;
    console.log('errInfo', errInfo);
    errInfo.userAgent = ctx.request.header['user-agent'];

    // await ctx.model.ErrMonitor.create(errInfo);
    // let res = await ctx.model.ErrMonitor.find({});
    // console.log(res, 'res');

    // const errMonitor = new ctx.model.ErrMonitor({
    //   name: 'jesse',
    //   age: 25,
    //   date: new Date(),
    //   // 如果schema里没有定义，这里即使传入也不会生效
    //   a: 21
    // })
    // const errMonitor = new ctx.model.ErrMonitor(errInfo)
    // errMonitor.save();
    // let res = await ctx.model.ErrMonitor.find({});
    // console.log('res', res);

    // console.log('process.cwd()', process.cwd());
    // /Users/mac/missfresh/workSpace/engineer/egg/monitor-platform

    // 获取post请求入参：https://eggjs.org/zh-cn/basics/controller.html
    // 将入参格式化，并写入到本地文件
    // https://javascript.ruanyifeng.com/nodejs/fs.html#toc0
    // 这里的相对路径，其实是相当于 process.cwd() ，因此写到了根目录。而不是相对于当前脚本所在的路径。
    fs.writeFileSync('./errData.js', JSON.stringify(errInfo, null, 2), (err) => {
      // 回调是最后一个参数，而且只有写入异常时才会执行。
      if (err) throw err;
    })

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
      _id: "5eb7c6fc95040d060636ee51"
    }

    await ctx.model.ErrMonitor.remove(opts, err => {
      if (err) throw err;
    })
    ctx.body = {
      code: 0,
      message: '操作成功',
      data: {}
    }
  }
  async getErr() {
    const { ctx } = this;

    let res = await ctx.model.ErrMonitor.find({});
    // console.log('res', res);
    await ctx.reqHandler.success(res);

    // ctx.body = {
    //   code: 0,
    //   message: '操作成功',
    //   data: res
    // };
  }
  async updateErr() {
    const { ctx } = this;
    let query = {
      _id: '5eb7c743c83b48065550ab6f'
    }
    await ctx.model.ErrMonitor.update(query, {
      cookies: '这是更新的cookies'
    });

    ctx.body = {
      code: 0,
      message: '操作成功',
      data: {}
    };
  }
}

module.exports = ErrMonitorController;