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

  // 插入和更新一条数据可以是一个接口吗？
  async updatePerfTimes() {
    const { ctx } = this;

    const perfTimesData = ctx.request.body;
    perfTimesData.userAgent = ctx.request.header['user-agent'];

    // sql原生插入语句比较繁琐
    const res = await ctx.service.perfTimes.updatePerfTimes(perfTimesData);

    await ctx.reqHandler.success(res);
  }

  async getTypePerf() {
    const { ctx } = this;

    const reqData = ctx.request.body;

    const res = await ctx.service.perfTimes.getTypePerf(reqData);

    await ctx.reqHandler.success(res);
  }

  async getPerfList() {
    const { ctx } = this;

    const reqData = ctx.request.body;

    const res = await ctx.service.perfTimes.getPerfList(reqData);

    await ctx.reqHandler.success(res);
  }
}

module.exports = PerfController