import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import './vue/filter';
import './vue/directive';

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI, { Message } from 'element-ui';
Vue.use(ElementUI);
Vue.prototype.$message = Message;


import '../asset/js/sdk';
// 服务端渲染时没有window，会尝试客户端渲染
Vue.use(window.monitor.vuePlugin);

// Vue.config.errorHandler = (err, vm, info) => {
//   // throw new Error(err);
//   let { message, name, script, line, column, stack } = err;
//   debugger
//   let stackStr = stack ? stack.toString() : `${name}:${message}`;
//     debugger
//   console.log(stackStr); 
//   console.log(`cusError: ${err.toString()}\nInfo: ${info}\nvm：${Object.keys(vm)}`);
// }

export default class App {
  constructor(config) {
    this.config = config;
  }

  bootstrap() {
    if (EASY_ENV_IS_NODE) {
      return this.server();
    }
    return this.client();
  }

  create(initState) {
    const { index, options, createStore, createRouter } = this.config;
    const store = createStore(initState);
    const router = createRouter();
    sync(store, router);
    return {
      ...index,
      ...options,
      router,
      store
    };
  }

  client() {
    Vue.prototype.$http = require('axios');
    const options = this.create(window.__INITIAL_STATE__);
    const { router, store } = options;
    console.log(store.state.origin);
    router.beforeEach((route, redirec, next) => {
      next();
    });
    router.afterEach((route, redirec) => {
      console.log('>>afterEach', route);
      if (route.matched && route.matched.length) {
        const asyncData = route.matched[0].components && route.matched[0].components.default.asyncData;
        if (asyncData) {
          asyncData(store);
        }
      }
    });
    const app = new Vue(options);
    const root = document.getElementById('app');
    const hydrate = root.childNodes.length > 0;
    app.$mount('#app', hydrate);
    return app;
  }

  server() {
    return context => {
      const options = this.create(context.state);
      const { store, router } = options;
      router.push(context.state.url);
      return new Promise((resolve, reject) => {
        router.onReady(() => {
          const matchedComponents = router.getMatchedComponents();
          if (!matchedComponents) {
            return reject({ code: '404' });
          }
          return Promise.all(
            matchedComponents.map(component => {
              if (component.asyncData) {
                return component.asyncData(store);
              }
              return null;
            })
          ).then(() => {
            context.state = {
              ...store.state,
              ...context.state
            };
            return resolve(new Vue(options));
          });
        });
      });
    };
  }
}