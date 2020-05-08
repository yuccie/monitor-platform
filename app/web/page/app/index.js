'use strict';
// 二次封装了Vue
// import Vue from 'vue';
import App from 'framework/app.js';
import index from './index.vue';
import createStore from './store';
import createRouter from './router';

import '../../asset/js/sdk';
// 服务端渲染时没有window，会尝试客户端渲染
// Vue.use(window.monitor.vuePlugin);




console.log(d)

const options = { base: '/' };

export default new App({
  index,
  options,
  createStore,
  createRouter,
}).bootstrap();
