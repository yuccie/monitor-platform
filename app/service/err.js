const Service = require('egg').Service;

// 操作什么范围内的数据库
// https://blog.csdn.net/ls1645/article/details/79118464

class ErrService extends Service {
  async getErrTrand(query) {
    const { ctx, app } = this;
    const { fn, col, where, SELECT } = app.Sequelize;

    let sequelize = ctx.sqlModel.models.err_dbs.sequelize;

    // 近7天
    let sqlQuery = `
      select date_format(created_at, '%Y-%m-%d') date,count(*) count from err_dbs
      where date_sub(CURDATE(),INTERVAL ${query.timeRange} DAY) <= DATE(created_at)
      group by date_format(created_at, '%Y-%m-%d')
      order by date_format(created_at, '%Y-%m-%d')
    `;

    // res 数组元素怎么是两个，而且两个完全一样?
    // 默认情况下，该query函数会返回两个参数 - 一个包含结果的数组和一个包含原数据对象
    let res = await sequelize.query(sqlQuery).spread((results, metadata) => results);

    return res;
  }
}

module.exports = ErrService;
