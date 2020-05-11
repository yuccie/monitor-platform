const Controller = require('egg').Controller;

class PerfController extends Controller {
  async index() {
    const { ctx } = this;

    await ctx.model.PerfDbs.create({
      downloadTime: new Date()
    })
    let res = await ctx.model.PerfDbs.find()
    // 如果接口没有返回会出现错误 message: "Not Found"，
    // 有一种说法，await也会导致，这里是同步，暂时没有出现
    await ctx.reqHandler.success(res);
  }
}

module.exports = PerfController