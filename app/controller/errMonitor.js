const Controller = require('egg').Controller;

class ErrMonitorController extends Controller {
  async getSdk() {
    const {app, ctx} = this;
    console.log(ctx.request, '/app/web/asset/js/');
  }
}

module.exports = ErrMonitorController;