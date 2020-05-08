const Model = require('../mocks/article/list');
const Controller = require('egg').Controller;
class AppController extends Controller {
  async index() {
    const {app, ctx} = this;
    const { mode } = ctx.query;
    if (mode === 'csr') {
      console.log(11)
      // 根据参数来定是否客户端渲染
      await ctx.renderClient('app.js', { url: ctx.url });
    } else  {
      
      // mongoose基本使用参考：https://www.cnblogs.com/wxw1314/p/10339775.html
      // 创建一条数据
      // await app.model.User.create({
      //   userName: 'dujc',
      //   password: 444,
      // })
      // 如何查看数据库里所有的表？
      // let dbs = await app.mongoose.connections
      // console.log(dbs, 'dbs');

      // let myDb = await app.model.User.find(); // egg是集合
      // console.log('myDb', myDb);

      // console.log('ctx.url', ctx.url);
      // ctx.body = 'aa'
      
      // 这里的app.js如何自定义？
      // app.js 是由 Webpack(target:node) 把 Vue 变成 Node 服务端运行的运行文件, 默认在 ${app_root}/app/view 目录下。
      // 没法改成别的名字
      await ctx.render('app.js', { url: ctx.url });
    }
  }

  async list() {
    const pageIndex = this.ctx.query.pageIndex;
    const pageSize = this.ctx.query.pageSize;
    this.ctx.body = Model.getPage(pageIndex, pageSize);
  }

  async detail() {
    const id = Number(this.ctx.params.id);

    console.log('id', typeof id);
    this.ctx.body = Model.getDetail(id);
  }
}

module.exports = AppController;