const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const readFile = require('fs').readFile;
// const mapFile = require('../mocks/map/bundle.js.map');

// 操作什么范围内的数据库
// https://blog.csdn.net/ls1645/article/details/79118464

class ErrService extends Service {
  async getErrTrand(query) {
    const { ctx, app } = this;
    const { fn, col, where, SELECT } = app.Sequelize;
    const { timeRange } = query;

    let sequelize = ctx.sqlModel.models.err_dbs.sequelize;

    // 近7天
    // let sqlQuery = `
    //   select date_format(created_at, '%Y-%m-%d') date,count(*) count from err_dbs
    //   where date_sub(CURDATE(),INTERVAL ${timeRange} DAY) <= DATE(created_at)
    //   group by date_format(created_at, '%Y-%m-%d')
    //   order by date_format(created_at, '%Y-%m-%d')
    // `;
    // left outer join date_dbs d

    // 暂时都默认30天
    let sqlQuery = `
      select date_format(e.created_at, '%Y-%m-%d') date, count(*) count from err_dbs e
      where e.created_at >= date_sub(curdate(), interval 30 day)
      group by date_format(e.created_at, '%Y-%m-%d')
      order by date_format(e.created_at, '%Y-%m-%d')
    `;

    // res 数组元素怎么是两个，而且两个完全一样?
    // 默认情况下，该query函数会返回两个参数 - 一个包含结果的数组和一个包含原数据对象
    let res = await sequelize.query(sqlQuery).spread((results, metadata) => results);

    return res;
  }

  // 获取单条异常信息
  async getErrDetail(query) {
    const { ctx, app } = this;
    let { id } = query;
    let sequelize = ctx.sqlModel.models.err_dbs.sequelize;

    let sqlQuery = `
      select * from err_dbs e
      where e.id = ${id}
    `;
    let res = await sequelize.query(sqlQuery).spread((results, metadata) => {
      let temp = {};

      // results[0] is not iterable
      // for (let [key, val] of results[0]) {
      //   key = ctx.helper.toHump(key);
      //   temp[key] = val;
      // }
      temp = ctx.helper.objKeyToHump(results[0]);
      temp.stack = JSON.parse(temp.stack)
      return temp;
    });

    return res;
  }

  // 删除单条异常信息
  async delErrDetail(query) {
    const { ctx, app } = this;
    let sequelize = ctx.sqlModel.models.err_dbs.sequelize;

    console.log('query.id', query);

    let sqlQuery = `
      delete from err_dbs e
      where e.id = ${query.id}
    `;
    let res = await sequelize.query(sqlQuery).spread((results, metadata) => results);

    return res;
  }

  // 获取source map文件
  async getSourceMap(query) {
    const { ctx, app } = this;
    // let sequelize = ctx.sqlModel.models.err_dbs.sequelize;

    // console.log('query.id', query);

    // let sqlQuery = `
    //   select * from err_dbs e
    //   where e.id = ${query.id}
    // `;
    // let res = await sequelize.query(sqlQuery).spread((results, metadata) => results);
    console.log('pwd', __dirname);
    let str = '';

    // promise也需要返回才行
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, `../mocks/map/bundle.js.map`), { encoding: 'utf-8' }, function(err, fr) {
        //readFile回调函数
        if (err) {
          reject(err)
        } else {
          str = JSON.parse(fr);
        }
        resolve(str);
        // return str;
      });
    })

  }
}

module.exports = ErrService;
