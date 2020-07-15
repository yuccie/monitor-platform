'use strict';
const path = require('path');
// 配置参考：https://www.yuque.com/easy-team/easywebpack/config
module.exports = {
  egg: true,
  // framework 支持 `js`,`html`, `vue`, `react`, `weex`
  framework: 'vue',

  // template: 'src/view/layout.html',

  entry: {
    // 项目的入口，
    app: 'app/web/page/app/index.js'
  },

  // 如何设置出口文件
  // output: {
  //   index: "app/view/index.js" 
  // },

  // 需要开启rules并添加loaders
  rules: [
    { scss: true },
    {
      test: /\.map$/,
      use: ["source-map-loader"],
      enforce: "pre"
    }
  ],
  loaders: {
    scss: {
      options: {
        sassOptions: {
          includePaths: [
            path.resolve(process.cwd(), 'app/web/page')
          ]
        }
      }
    },
  },
  plugins: [{
    // 这里可以直接拷贝，相当于静态文件
    copy: [{
      from: 'app/web/asset/css/bootstrap.min.css',
      to: 'asset/css/bootstrap.min.css'
    }]
  }],
  // customize(webpackConfig){ // 非必须
  //   // 此处 webpackConfig 为原生的 webpackconfig, 你可以进行加工处理
  //   return webpackConfig;
  // },
  // 设置别名
  // resolve: {
  alias: {
    '@apis': 'app/web/framework/vue/apis/',
    'asset': 'app/web/asset',
    '@utils': 'app/web/framework/utils/',
    '@layoutApp': 'app/web/component/layout/app',
  },
  // },
  // deploy: {
  //   mode: "npm", // 支持 npm, cnpm, yarn, tnpm ,
  //   nodejs: false, // 是否把 node 打进 node_modules, 默认 false
  //   filename: `${new Date().toLocaleString()}`,
  //   // source: ['dist', 'package.json'],
  //   target: "./zip",
  //   done(filepath) {
  //     console.log("打包完成，路径为：", filepath);
  //   },
  // },
  // done(){
  //   // Webpack 编译完成回调, 默认可以不用配置,当你需要编译完成做某某事情(比如上传cdn)才需要配置
  // },

  // Egg 服务端渲染项目时，devServer 配置是无需的，即使配置了也无效。
  // 代理和historyApiFallback通过项目的 Node 服务处理。
  devServer: {
    open: false,
    // open: 'http://127.0.0.1:8888',

    // https://webpack.js.org/configuration/dev-server/#devserver-before
    before: before => {
      // register koa middleware
    },

    // https://webpack.js.org/configuration/dev-server/#devserver-after
    after: app => {
      // register koa middleware
    },

    // https://webpack.js.org/configuration/dev-server/#devserver-proxy
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' }
    //   }
    // },

    // https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
    historyApiFallback: {
      index: '/app.html' // 默认 index.html
    }
  }
}