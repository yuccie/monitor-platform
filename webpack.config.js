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
   ],
  loaders:{
    scss: {
      options: {
        includePaths: [
          path.resolve(process.cwd(), 'app/web/page')
        ]
      }
    }
  },
  plugins: [{
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
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js' 
  //   }
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
  // }
};