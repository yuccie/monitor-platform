'use strict';
// 二次封装了Vue
// import Vue from 'vue';
import App from 'framework/app.js';
import index from './index.vue';
import createStore from './store';
import createRouter from './router';

// console.log(d)

const options = { base: '/' };
const vm = new App({
  index,
  options,
  createStore,
  createRouter,
}).bootstrap();
window.vm = vm;
export default vm
