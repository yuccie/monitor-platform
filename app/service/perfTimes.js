const Service = require('egg').Service;

class PerfTimesService extends Service {
  async updatePerfTimes(reqData) {
    const { ctx } = this;
    // const perfTimesData = ctx.request.body;
    // perfTimesData.userAgent = ctx.request.header['user-agent'];
    // console.log(perfTimesData, perfTimesData.userAgent);
    // sql原生插入语句比较繁琐
    let res = await ctx.sqlModel.models.perf_times_dbs.create(reqData);
    return res;
  }

  // 获取
  async getTypePerf(reqData) {
    const { ctx } = this;
    const { perfType, timeRange } = reqData;

    let sqlPerfType = '';
    switch (perfType) {
      case 'appCache':
        sqlPerfType = 'domain_lookup_start';
        break;
      case 'request':
        sqlPerfType = 'response_start';
        break;
      default:
        sqlPerfType = `${perfType.replace(/([A-Z])/g, '_$1').toLowerCase()}_end`;
    }

    const sequelize = ctx.sqlModel.models.perf_times_dbs.sequelize;

    let sqlQuery = `
      select p.*, date_format(p.created_at, '%Y-%m-%d') date
      from perf_times_dbs p
      where date_sub(curdate(), interval 7 day) <= date(p.created_at) && date(p.created_at) <= curdate()
      and p.${sqlPerfType} is not NULL
      order by date_format(p.created_at, '%Y-%m-%d'), p.${sqlPerfType} desc
      limit 5
    `;

    // 查询库
    let res = await sequelize.query(sqlQuery).spread((results, metadata) => results);

    return res.map(item => ctx.helper.objKeyToHump(item));
  }

  // 获取性能列表
  async getPerfList(reqData) {
    const { ctx } = this;
    const { timeRange, pageSize, pageNo, order, orderProp } = reqData;
    const sequelize = ctx.sqlModel.models.perf_times_dbs.sequelize;

    let sqlQuery = `
      select p.unload_event_end - p.unload_event_Start unloadDur, p.redirect_end - p.redirect_start redirectDur, 
        p.domain_lookup_start - p.fetch_start appCacheDur, p.domain_lookup_end - p.domain_lookup_start dnsDur,
        p.connect_end - p.connect_start tcpDur, p.response_start - p.request_start requestDur, 
        p.response_end - p.response_start responseDur, p.dom_content_loaded_event_end - p.dom_content_loaded_event_start domContentLoadedDur,
        p.load_event_end - p.load_event_start loadDur, p.created_at date, name
      from perf_times_dbs p
      where date_sub(curdate(), interval ${timeRange} day) <= date(p.created_at) && date(p.created_at) <= curdate()
      and name is not null
      order by ${orderProp} ${order}
      limit ${pageSize}
      offset ${pageSize * (pageNo - 1)}
    `;

    // 查询库
    let res = await sequelize.query(sqlQuery).spread((results, metadata) => results);

    let list = res.map(item => ctx.helper.objKeyToHump(item));

    let totalQuery = `
      select count(*) total from perf_times_dbs p
      where date_sub(curdate(), interval ${timeRange} day) <= date(p.created_at) && date(p.created_at) <= curdate()
    `;
    let total = await sequelize.query(totalQuery).spread((results, metadata) => results[0].total);

    return {
      list, total
    }
  }
}

module.exports = PerfTimesService;
